import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, useLayoutEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useXR } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { textureLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { PortalCommContext } from '../../utils/contexts/portalComm';
import { PortalRTCContext, RgbdContext } from './XR.container';
import { GamepadContext } from "./GamepadContext"

const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;
export default function SpatialVideo(mode, ...props) {
  // const portaRTCRef = useContext(PortalRTCContext)
  const gamepadRef = useContext(GamepadContext)
  //const commClient = useContext(PortalCommContext);
  const {rgbSrcRef, depthSrcRef} = useContext(RgbdContext);
  const portalRTCRef = useContext(PortalRTCContext);
  const matRef = useRef();
  const pointsRef = useRef();
  const controlRef = useRef(true)
  const rgbTexture = useRef(new THREE.Texture(rgbSrcRef.current))
  const depthTexture = useRef(new THREE.Texture(depthSrcRef.current))

  useLayoutEffect(()=>{
    rgbTexture.current.needsUpdate = true;
    depthTexture.current.needsUpdate = true;
    console.log(rgbTexture.current);
  },[])

  useFrame((state, delta, XRFrame)=>{
    let right = gamepadRef.current.right;
    let W = 0.05; 
    if(controlRef.current){
      pointsRef.current.position.z += W * right.new.axes[2];
      pointsRef.current.position.x += W * right.new.axes[3];
    } else {
      pointsRef.current.rotation.y += W * right.new.axes[2];
      pointsRef.current.position.y += W * right.new.axes[3];
    }

    //let eulerData = portalRTC.quaternion;
    if (portalRTCRef.current.quaternion) {
      let eulerData = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion(
          portalRTCRef.current.quaternion.x,
          portalRTCRef.current.quaternion.y,
          portalRTCRef.current.quaternion.z,
          portalRTCRef.current.quaternion.w
        ),
        "XYZ"
      );
      // console.log('portalRTCRef : ', portalRTCRef.current.quaternion)
      // console.log('eulerData : ', eulerData)
      pointsRef.current.rotation.set(eulerData.x, -eulerData.y, -eulerData.z, "XYZ")

    } else {
      //console.log('not changed : ', portalRTCRef.current.quaternion);
    }
    if (right.new.buttons[3] && right.prev.buttons[3]!==right.new.buttons[3]){
      controlRef.current = !controlRef.current;
    }
  })



  // const texture = useLoader(TexturesLoader)
  const uniforms =     {
    rgbImg: { type: 't', value: rgbTexture.current },
    depthImg: { type: 't', value: depthTexture.current },
    texSize: { type: 'i2', value: [1280,720] },
    iK: { type: 'f4', value: [0, 0, 0, 0] },
    scale: { type: 'f', value: 6.0 },
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

  
  let tmp = rgbSrcRef.current.src;

  useFrame( () => {
    if (rgbSrcRef.current.complete && depthSrcRef.current.complete){
     
      rgbTexture.current.needsUpdate=true
      depthTexture.current.needsUpdate=true;
    }
  })

  return (
    <group rotation={[0,-45*DEG2RAD,0]} position={[-0.5,0.8,-0.4]}>
      <points ref={pointsRef} frustumCulled={false}>
        <shaderMaterial 
          ref={matRef}
          uniforms={uniforms}  
          side={THREE.DoubleSide}
          transparent={false}
          vertexShader={vertShaderSrc}
          fragmentShader={fragShaderSrc}
          // uniformsNeedUpdate={true}
        />
        <bufferGeometry>
          <bufferAttribute attach="attributes-vertexIdx" count={numPoints} array={buffPointIndicesAttr} itemSize={1}/>
          <bufferAttribute attach="index" count={numPoints} array={buffIndices} itemSize={1}/>
        </bufferGeometry> 
          
      </points>
    </group>
  )
}

function getSize(source){

  let height = source.height;
  let width = source.width;

  return {height, width};
}

async function getTexture(source){ //source: HTML element
  console.log(source.tagName)
  if (source.tagName === "IMG"){
      
      return new THREE.Texture(source);

  } else if (source.tagName === "VIDEO"){

      return new THREE.VideoTexture(source);
  }
}


const vertShaderSrc = `
    attribute float vertexIdx;
    
    varying float vVertexIdx; // 픽셀 포인트 인덱스
    varying vec2 vPtPos; // 계산할 점의 위치
    varying float vShouldDiscard;
    
    uniform ivec2 texSize; // 비디오 사이즈. (1280 x 720) or (2560 x 720)
    uniform sampler2D depthImg; // 데이터 어레이
    uniform sampler2D rgbImg; // 스트리밍 영상

    uniform vec4 iK; // 인트린직스 매트릭스 계수
    uniform float scale; // 객체의 스케일?
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

        vec3 ptPos = scale * vec3(
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
