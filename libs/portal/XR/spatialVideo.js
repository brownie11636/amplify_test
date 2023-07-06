"use strict";

import * as THREE from "three";
/*
  sourceType can be "img"(HTML image element) or "video"(HTML video element)
*/
const TAG = "SpatialVideo:"

export class SpatialVideo{
  constructor( rgbSource, depthSource, mode ){        //source: HTML element, mode: rendering mode ("points" or "meshes")
    this.rgbSource = rgbSource;
    this.depthSource = depthSource;
    this.renderingMode = mode

    this.threeObject = null;

  }

  async setup(){

    let rgbTexture = await this.getTexture(this.rgbSource);
    let depthTexture = await this.getTexture(this.depthSource);

    let height, width, numPoints, buffIndices, buffPointIndicesAttr, geometry, material;

    if (toString(this.getSize(this.rgbSource)) === toString(this.getSize(this.depthSource))){

      // height = this.rgbSource.height;
      // width = this.rgbSource.width;
      console.log({height, width})

    } else console.error(TAG,"mismatched rgb and depth sizes")
    height = 720;
    width = 1280;

    numPoints = height * width;

    if (this.renderingMode === "points"){

      buffIndices = new Uint32Array(numPoints);
      buffPointIndicesAttr = new Float32Array(numPoints);
  
      for (let ptIdx = 0; ptIdx < numPoints; ptIdx++) {
        buffIndices[ptIdx] = ptIdx;
        buffPointIndicesAttr[ptIdx] = parseFloat(ptIdx);
      }

    } else if (this.renderingMode === "meshes") {
      console.log(TAG,"meshes rendering mode is not developed yet");
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('vertexIdx', new THREE.Float32BufferAttribute(buffPointIndicesAttr, 1));
    geometry.setIndex(new THREE.Uint32BufferAttribute(new Uint32Array(buffIndices), 1));

    material = getPointCloudShaderMaterial();    
    material.uniforms.texSize.value = [height, width];
    material.uniforms.rgbImg.value = rgbTexture;
    material.uniforms.depthImg.value = depthTexture;


    if (this.renderingMode === "points"){
      this.threeObject = new THREE.Points(geometry, material);

    } else if (this.renderingMode === "meshes") {
      console.log(TAG,"meshes rendering mode is not developed yet");
      return
      this.threeObjects = new THREE.Mesh(geometry, material);
    }

    this.threeObject.frustumCulled = false;
    // mesh.position.set(0,1.2,-0.25)
    // mesh.add(new THREE.AxesHelper());
    rgbTexture.needsUpdate = true;
    depthTexture.needsUpdate = true;

  }

  getSize(source){

    let height = source.height;
    let width = source.width;

    return {height, width};
  }

  async getTexture(source){ //source: HTML element
    console.log(source.tagName)
    if (source.tagName === "IMG"){
        
        return new THREE.Texture(source);

    } else if (source.tagName === "VIDEO"){

        return new THREE.VideoTexture(source);
    }
  }
}


function getPointCloudShaderMaterial()
{
    // language=shader
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

    return new THREE.ShaderMaterial({
        uniforms: {
            rgbImg: { type: 't', value: new THREE.Texture() },
            depthImg: { type: 't', value: new THREE.Texture() },
            texSize: { type: 'i2', value: [0, 0] },
            iK: { type: 'f4', value: [0, 0, 0, 0] },
            scale: { type: 'f', value: 6.0 },
            ptSize: { type: 'f', value: 1.6 },
        },
        side: THREE.DoubleSide,
        transparent: false,
        vertexShader: vertShaderSrc,
        fragmentShader: fragShaderSrc
    });
}