import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, useLayoutEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Line, Sphere, shaderMaterial } from '@react-three/drei'
import { useXR } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { textureLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { shallow } from 'zustand/shallow'

import { PortalCommContext } from '../../utils/contexts/portalComm';
import { PortalRTCContext, RgbdContext } from './XR.container';
import { useControlStore } from "../../store/zustand/control.js"

const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

//Euler {isEuler: true, _x: -0.0010090750180074188, _y: 0.02912233438379935, _z: 0.0043550970184092, _order: 'XYZ'}

export default function SpatialVideo({mode, ...props}) {
  // const portaRTCRef = useContext(PortalRTCContext)
  //const commClient = useContext(PortalCommContext);
  const {rgbSrcRef, depthSrcRef, visibleRangeRef} = useContext(RgbdContext);
  const portalRTCRef = useContext(PortalRTCContext);
  const groupRef = useRef();
  const pointsRef = useRef();
  const matRef = useRef();
  const controlRef = useRef(true)
  const rgbTexture = useRef(new THREE.Texture(rgbSrcRef.current))
  const depthTexture = useRef(new THREE.Texture(depthSrcRef.current))
  const [depthMax, setDepthMax] = useState(useControlStore.getState().depthMax);
  console.log("Spatial Video renedered!!!!")

  const vrLog = useControlStore.getState().updateNewLog;

  useEffect(()=>{
    rgbTexture.current.needsUpdate = true;
    depthTexture.current.needsUpdate = true;
    groupRef.current.position.fromArray(useControlStore.getState().spatialVideo.position)
    groupRef.current.rotation.fromArray(useControlStore.getState().spatialVideo.rotation)
    // matRef.current.needsUpdate = true;
    //visibleRangeRef.current.needsUpdate = true;
    
    const unsubSpatialVideo = useControlStore.subscribe(
      // (state)=>state.visibleRange,
      // (range,_range) => {        // _value is previous, range is not used yet 
      (state)=>[state.visibleRange,state.spatialVideo],
      ([range,video],[_range,_video]) => {        // _value is previous, range is not used yet 
        // console.log(range,_range) 
        // // console.log(video,_video) 
        console.log(range,video,_range,_video) 
        if (range !== _range){

        }
        if (video !== _video){
          groupRef.current.position.fromArray(video.position);
          groupRef.current.rotation.fromArray(video.rotation);
          groupRef.current.scale.setScalar(video.scale);
        }

      },
      { equalityFn: shallow }     //여러개의 selector 구독할때 필요
    );
    // const unsub

    return () => {
      unsubSpatialVideo();
    }
  },[])
  
  // let right;
  // let left;
  // let W
  let eulerData = new THREE.Euler();
  let quaternion = new THREE.Quaternion();
  quaternion.identity();

//  let i = 0


  useFrame((state, delta, XRFrame)=>{
    matRef.current.needsUpdate = true;

    matRef.current.uniforms.minRange.value = visibleRangeRef.current.min;
    matRef.current.uniforms.maxRange.value = visibleRangeRef.current.max;
    matRef.current.uniforms.bitDepth.value = visibleRangeRef.current.bitDepth;

    // right = gamepadRef.current.right;
    // left = gamepadRef.current.left
    // W = 0.005; 
    // if(controlRef.current){
    //   groupRef.current.position.z += W * right.new.axes[2];
    //   groupRef.current.position.x += W * right.new.axes[3];
    // } else {
    //   groupRef.current.rotation.y += W * right.new.axes[2];
    //   groupRef.current.position.y += W * right.new.axes[3];
    // }
    // groupRef.current.scale.x += 0.01 * left.new.axes[2];
    // groupRef.current.scale.y += 0.01 * left.new.axes[2];
    // groupRef.current.scale.z += 0.01 * left.new.axes[2];

    //let eulerData = portalRTC.quaternion;
    // if(true){
    if(portalRTCRef.current !== undefined){
      if (portalRTCRef.current.quaternion) {
        console.log("rtcRef:", portalRTCRef.current)
        // if (true) {
        ;
        eulerData.setFromQuaternion(
          quaternion.fromArray([
            portalRTCRef.current.quaternion.x,
            portalRTCRef.current.quaternion.y,
            portalRTCRef.current.quaternion.z,
            portalRTCRef.current.quaternion.w
          ]),
          "XYZ"
        );
        // console.log('portalRTCRef : ', portalRTCRef.current.quaternion)
        // console.log('eulerData : ', eulerData)
        // pointsRef.current.rotation.set( 0.030090750180074188, -0.02912233438379935, -0.0043550970184092, "XYZ")
        // pointsRef.current.rotation.set( -0.0010090750180074188, -0.02912233438379935, -0.0043550970184092, "XYZ")
        pointsRef.current.rotation.set(eulerData.x, -eulerData.y, -eulerData.z, "XYZ")

      } else {
        // console.log('not changed : ', portalRTCRef.current.quaternion);
      }
    }
    // if (right.new.buttons[3] && right.prev.buttons[3]!==right.new.buttons[3]){
    //   controlRef.current = !controlRef.current;
    // }

    if (rgbSrcRef.current.complete && depthSrcRef.current.complete){
      rgbTexture.current.needsUpdate=true
      depthTexture.current.needsUpdate=true;
    }
  })



  // const texture = useLoader(TexturesLoader)
  const uniforms = {
    rgbImg: { type: 't', value: rgbTexture.current },
    depthImg: { type: 't', value: depthTexture.current },
    maxRange: { type: 'f', value: 3 },
    minRange: { type: 'f', value: 0.2 },
    bitDepth: { type: 'f', value: 8.0 },
    texSize: { type: 'i2', value: [1280,720] },
    iK: { type: 'f4', value: [0, 0, 0, 0] },
    // scale: { type: 'f', value: 5.0 },
    ptSize: { type: 'f', value: 1.6 },
  }


  const numPoints = 720 * 1280

  const [buffIndices, buffPointIndicesAttr] = useMemo(() => {
    let buffIndices_ = new Uint32Array(numPoints);
    let buffPointIndicesAttr_ = new Float32Array(numPoints);

    for (let ptIdx = 0; ptIdx < numPoints; ptIdx++) {
      buffIndices_[ptIdx] = ptIdx;
      buffPointIndicesAttr_[ptIdx] = parseFloat(ptIdx);
    }
    return [buffIndices_, buffPointIndicesAttr_];
  },[])

  return (
    <group 
      ref={groupRef} 
      {...props}
      // position={props.position} 
      // rotation={[0,-0.5,0]} 
      // {...props} 
    >
      {/* <MyFrustrum far={5} near={0.1}/> */}

      <axesHelper args={[0.5]}/>

      <points ref={pointsRef} frustumCulled={false} >
        <shaderMaterial 
          ref={matRef}
          uniforms={uniforms}  
          side={THREE.DoubleSide}
          transparent={false}
          vertexShader={vertShader8bitSrc}
          fragmentShader={fragShaderSrc}
          // uniformsNeedUpdate={true}
        />
        <bufferGeometry>
          <bufferAttribute attach="attributes-vertexIdx" count={numPoints} array={buffPointIndicesAttr} itemSize={1}/>
          <bufferAttribute attach="index" count={numPoints} array={buffIndices} itemSize={1}/>
        </bufferGeometry> 

        <MyFrustrum far={5} near={0.1}/>

      </points>

      <Sphere args={[0.02]} material-color={"black"}/>
    </group>
  )
}

//zed mini fov={HD1080:{
//                fov_h:69,
//                fov_v:42
//                },
//              HD720:{
//                fov_h:85,
//                fov_v:54
//                } 
//              }
const MyFrustrum = ({far,near,fov,...props}) => {
  // const {fov_h, fov_v} = fov
  const fov_h = 85 * DEG2RAD;
  const fov_v = 54 * DEG2RAD;
  const w = Math.tan(fov_h/2)
  const h = Math.tan(fov_v/2)
  const points = [];
  points.push(new THREE.Vector3(w,h,-1));
  points.push(new THREE.Vector3(-w,h,-1));
  points.push(new THREE.Vector3(-w,-h,-1));
  points.push(new THREE.Vector3(w,-h,-1));
  const farPoints = points.map(val=>val.clone().multiplyScalar(far))
  const nearPoints = points.map(val=>val.clone().multiplyScalar(near))
  
  const farGeometry = new THREE.BufferGeometry().setFromPoints(farPoints);
  const nearGeometry = new THREE.BufferGeometry().setFromPoints(nearPoints);
  // console.log(nearRef.current)
  return(
    <group>
      <lineLoop geometry={nearGeometry} >
        <lineBasicMaterial attach="material" color={"blue"} lineWidth={10}/>
      </lineLoop>
      <lineLoop geometry={farGeometry}>
        <lineBasicMaterial attach="material" color={"blue"}/>
      </lineLoop>
      <Line segment={false} lineWidth={1.5} points={[farPoints[0],nearPoints[0]]} color={"blue"}/>
      <Line points={[farPoints[1],nearPoints[1]]} color={"blue"}/>
      <Line points={[farPoints[2],nearPoints[2]]} color={"blue"}/>
      <Line points={[farPoints[3],nearPoints[3]]} color={"blue"}/>
      
      {/* <Line points={[farPoints[0],nearPoints[1]]} color={"blue"}/>
      <Line points={[farPoints[1],nearPoints[2]]} color={"blue"}/>
      <Line points={[farPoints[2],nearPoints[3]]} color={"blue"}/>
      <Line points={[farPoints[3],nearPoints[0]]} color={"blue"}/>
      
      <Line points={[farPoints[0],nearPoints[3]]} color={"blue"}/>
      <Line points={[farPoints[1],nearPoints[0]]} color={"blue"}/>
      <Line points={[farPoints[2],nearPoints[1]]} color={"blue"}/>
      <Line points={[farPoints[3],nearPoints[2]]} color={"blue"}/> */}
    </group>
  )
}

async function getTexture(source){ //source: HTML element
  console.log(source.tagName)
  if (source.tagName === "IMG"){
      
      return new THREE.Texture(source);

  } else if (source.tagName === "VIDEO"){

      return new THREE.VideoTexture(source);
  }
}


const vertShader8bitSrc = `
    attribute float vertexIdx;
    
    varying float vVertexIdx; // 픽셀 포인트 인덱스
    varying vec2 vPtPos; // 계산할 점의 위치
    varying float vShouldDiscard;
    
    uniform ivec2 texSize; // 비디오 사이즈. (1280 x 720) or (2560 x 720)
    uniform sampler2D depthImg; // 데이터 어레이
    uniform sampler2D rgbImg; // 스트리밍 영상
    uniform float minRange;
    uniform float maxRange;
    uniform float bitDepth;

    uniform vec4 iK; // 인트린직스 매트릭스 계수
    uniform float ptSize; // 랜더링할 포인트 사이즈
    
    // Filtering constants
    const int filterSize = 1;
    const float depthThresholdFilter = 0.05; // In meters. Smaller values = more aggressive filtering
    const vec2 absoluteDepthRangeFilter = vec2(0.1, 2.8);
            
    float getPixelDepth(ivec2 pixel)
    {
        vec2 lookupPt = ( vec2(pixel) + vec2(0.5) ) / vec2(texSize);
        // float gray = (texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b)/3.0;


        //float gray;
        // float gray = texture2D(depthImg, lookupPt).r;
        // vec4 gray = texture(depthImg, lookupPt);
        //float gray = texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b + texture2D(depthImg, lookupPt).a;
        // float gray = (texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b)/3.0;
        // float gray = texture2D(depthImg, lookupPt).a/4096.0 + texture2D(depthImg, lookupPt).b/256.0 + texture2D(depthImg, lookupPt).g/16.0 + texture2D(depthImg, lookupPt).r;
        //float gray = (texture2D(depthImg, lookupPt).r * 16.0 + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b / 16.0) / 16.0;
        // float gray = (texture2D(depthImg, lookupPt).b * 16.0 + texture2D(depthImg, lookupPt).a)/16.0;
        // float gray = texture2D(depthImg, lookupPt).r / 256.0 + texture2D(depthImg, lookupPt).g / 16.0 + texture2D(depthImg, lookupPt).b ;
        // float gray = texture2D(depthImg, lookupPt).b;

        if (bitDepth == 8.0) {
          float gray = (texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b);
          float pixelDepth = gray * (maxRange)/3.0;
          return pixelDepth;
        }
        else if (bitDepth == 12.0) {
          float gray = texture2D(depthImg, lookupPt).r / 256.0 + texture2D(depthImg, lookupPt).g / 16.0 + texture2D(depthImg, lookupPt).b;
          float pixelDepth = gray * (maxRange);
          return pixelDepth;
        }
        float gray = (texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b)/3.0;

        float pixelDepth = gray * (maxRange - minRange) + minRange;
        
        //return float(pixel.y)/(100.0000);
        return pixelDepth;
    }
    
    bool shouldDiscard(ivec2 currPixel) // 일정 범위 밖의 뎁스는 제거
    {
        float centerPixelDepth = getPixelDepth(currPixel);
    
        for ( int i = -filterSize; i <= filterSize; i++ )
            for ( int j = -filterSize; j <= filterSize; j++ )
            {
                if ( i == 0 && j == 0 )
                    continue;

                float currDepth = getPixelDepth(currPixel + ivec2(j, i));
                
                if ( currDepth < absoluteDepthRangeFilter.x
                      || currDepth >= absoluteDepthRangeFilter.y
                      || abs(centerPixelDepth - currDepth) > depthThresholdFilter )
                {
                    return true;
                }
            }
            
        return false;
    }

    void main()
    {
        vShouldDiscard = 0.0;
        
        ivec2 frameSize = ivec2(texSize.x, texSize.y);
        int vertIdx = int(vertexIdx); 
  
        int actualNumPts = frameSize.x * frameSize.y; 

        if ( vertIdx >= actualNumPts ) // 프레임 픽셀 수 만큼 넘어가는 포인트는 디스카드.
        {
            vShouldDiscard = 1.0;
            gl_Position = vec4(0.0);
            return;
        }
        
        // int ptYr = int(frameSize.y) - (vertIdx / int(frameSize.x));
        // int ptY = (vertIdx / int(frameSize.x));
        // int ptX = vertIdx - ptY * int(frameSize.x);
        // ivec2 pt = ivec2(ptX, ptYr); // 포인트 좌표 지정
        int ptY = vertIdx / int(frameSize.x);
        int ptX = vertIdx - ptY * int(frameSize.x);
        ivec2 pt = ivec2(ptX, ptY);

        
        // if ( shouldDiscard( pt ) ) // 해당 포인트의 뎁스를 계산 후, 일정 범위 밖이라면 디스카드.
        // {
        //     vShouldDiscard = 1.0;
        //     gl_Position = vec4(0.0);
        //     return;
        // }
        
        float currDepth = getPixelDepth(pt); // 뎁스 계산

        vec3 ptPos = vec3(
            ((1.0000/699.0000) * float(ptX) - 646.8700/699.0000) * currDepth,
            ((1.0000/699.0000) * float(ptY) - 368.170/699.0000) * currDepth,
            -currDepth
        );
        
        vec4 mvPos = modelViewMatrix * vec4(ptPos, 1.0);
        gl_Position = projectionMatrix * mvPos;
        
        vPtPos = vec2( float(ptX), float(ptY) );
        vVertexIdx = vertexIdx;
        gl_PointSize = ptSize;
    }
`;

const vertShaderSrc = `
    attribute float vertexIdx;
    
    varying float vVertexIdx; // 픽셀 포인트 인덱스
    varying vec2 vPtPos; // 계산할 점의 위치
    varying float vShouldDiscard;
    
    uniform ivec2 texSize; // 비디오 사이즈. (1280 x 720) or (2560 x 720)
    uniform sampler2D depthImg; // 데이터 어레이
    uniform sampler2D rgbImg; // 스트리밍 영상

    uniform vec4 iK; // 인트린직스 매트릭스 계수
    uniform float ptSize; // 랜더링할 포인트 사이즈
    
    // Filtering constants
    const int filterSize = 1;
    const float depthThresholdFilter = 0.05; // In meters. Smaller values = more aggressive filtering
    const vec2 absoluteDepthRangeFilter = vec2(0.1, 2.8);
            
    float getPixelDepth(ivec2 pixel)
    {
        vec2 lookupPt = ( vec2(pixel) + vec2(0.5) ) / vec2(texSize);
        // float gray = (texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b)/3.0;


        // float gray = texture2D(depthImg, lookupPt).r;
        // vec4 gray = texture(depthImg, lookupPt);
        // float gray = texture2D(depthImg, lookupPt).r + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b + texture2D(depthImg, lookupPt).a;
        // float gray = texture2D(depthImg, lookupPt).a/4096.0 + texture2D(depthImg, lookupPt).b/256.0 + texture2D(depthImg, lookupPt).g/16.0 + texture2D(depthImg, lookupPt).r;
        //float gray = (texture2D(depthImg, lookupPt).r * 16.0 + texture2D(depthImg, lookupPt).g + texture2D(depthImg, lookupPt).b / 16.0) / 16.0;
        // float gray = (texture2D(depthImg, lookupPt).b * 16.0 + texture2D(depthImg, lookupPt).a)/16.0;
        float gray = texture2D(depthImg, lookupPt).r / 256.0 + texture2D(depthImg, lookupPt).g / 16.0 + texture2D(depthImg, lookupPt).b ;
        // float gray = texture2D(depthImg, lookupPt).b;
        float pixelDepth = gray;
        // float pixelDepth = gray.x;
        
        //return float(pixel.y)/(100.0000);
        return pixelDepth;
        // return 5.0000;
    }
    
    bool shouldDiscard(ivec2 currPixel) // 일정 범위 밖의 뎁스는 제거
    {
        float centerPixelDepth = getPixelDepth(currPixel);
    
        for ( int i = -filterSize; i <= filterSize; i++ )
            for ( int j = -filterSize; j <= filterSize; j++ )
            {
                if ( i == 0 && j == 0 )
                    continue;

                float currDepth = getPixelDepth(currPixel + ivec2(j, i));
                
                if ( currDepth < absoluteDepthRangeFilter.x
                      || currDepth >= absoluteDepthRangeFilter.y
                      || abs(centerPixelDepth - currDepth) > depthThresholdFilter )
                {
                    return true;
                }
            }
            
        return false;
    }

    void main()
    {
        vShouldDiscard = 0.0;
        
        ivec2 frameSize = ivec2(texSize.x, texSize.y);
        int vertIdx = int(vertexIdx); 
  
        int actualNumPts = frameSize.x * frameSize.y; 

        if ( vertIdx >= actualNumPts ) // 프레임 픽셀 수 만큼 넘어가는 포인트는 디스카드.
        {
            vShouldDiscard = 1.0;
            gl_Position = vec4(0.0);
            return;
        }
        
        // int ptYr = int(frameSize.y) - (vertIdx / int(frameSize.x));
        // int ptY = (vertIdx / int(frameSize.x));
        // int ptX = vertIdx - ptY * int(frameSize.x);
        // ivec2 pt = ivec2(ptX, ptYr); // 포인트 좌표 지정
        int ptY = vertIdx / int(frameSize.x);
        int ptX = vertIdx - ptY * int(frameSize.x);
        ivec2 pt = ivec2(ptX, ptY);

        
        // if ( shouldDiscard( pt ) ) // 해당 포인트의 뎁스를 계산 후, 일정 범위 밖이라면 디스카드.
        // {
        //     vShouldDiscard = 1.0;
        //     gl_Position = vec4(0.0);
        //     return;
        // }
        
        float currDepth = getPixelDepth(pt); // 뎁스 계산

        vec3 ptPos = vec3(
            ((1.0000/699.0000) * float(ptX) - 646.8700/699.0000) * currDepth,
            ((1.0000/699.0000) * float(ptY) - 368.170/699.0000) * currDepth,
            -currDepth
        );
        
        vec4 mvPos = modelViewMatrix * vec4(ptPos, 1.0);
        gl_Position = projectionMatrix * mvPos;
        
        vPtPos = vec2( float(ptX), float(ptY) );
        vVertexIdx = vertexIdx;
        gl_PointSize = ptSize;
    }
`;

// language=shader
const fragShaderSrc = `
    varying float vVertexIdx;
    varying vec2 vPtPos;
    varying float vShouldDiscard;

    uniform ivec2 texSize;
    uniform sampler2D rgbImg;
    uniform sampler2D depthImg;

    
    void main()
    {
        vec2 frameSizeF = vec2(texSize.x, texSize.y);
        ivec2 frameSize = ivec2(frameSizeF);
        
        int vertIdx = int(vVertexIdx);
        int actualNumPts = frameSize.x * frameSize.y;
        if ( vShouldDiscard != 0.0 || vertIdx >= actualNumPts )
        {
            discard;
        }
        
        vec2 lookupPt = ( vec2(vPtPos.x, vPtPos.y) + vec2(0.5) ) / vec2(texSize); 
        vec3 currColor = texture2D(rgbImg, lookupPt).rgb;

    
        gl_FragColor = vec4(currColor, 1.0);
        //gl_FragColor = vec4(gray.xxx, 1.0);
    }
`;
