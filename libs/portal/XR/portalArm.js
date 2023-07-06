"use strict";

import * as THREE from "three";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "/jsm/loaders/DRACOLoader.js";

/*
  PortalArm
  ⎿ table
  ⎿ armLinks[0]
  ⎟  ⎿ armLinks[1]
  ⎟       :
  ⎟       :
  ⎟     ⎿ armLinks[6]
  ⎟        ⎿ gripperLinks[]   gripperLinks configuration is described at loadModels();
*/

const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

export class PortalArm extends THREE.Group {
  constructor(type = "UR5e", path = "/3d_models/portalarm/UR5e_ver"){
    super();
    this.type = type
    // this.position.set(pos);

    this.armPos = [0, 0.717, 0]
    this.armGeometries = [
      [0, 0.0991, 0],
      [0, 0.0634, -0.0744],
      [0.425, 0, 0],
      [0.39225, 0, 0.0215],
      [0, -0.0463, -0.0804],
      [0, -0.0534, -0.0463],
    ];

    this.gripperGeometries = [
      [0, 0, -0.0533],
      [0.01861, 0, -0.04739],
      [0.008, 0, -0.058],
      [0, 0, -0.05694],
      [0, 0, 0],
    ];

    this.rotAxes = [
      [0, 1, 0],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, -1, 0],
      [0, 0, -1],
    ];

    this.gltfMatParams = { //basic, common parameters for all gltf models
      side: THREE.DoubleSide,
      flatShading: true,    //it is necessary for out gltf!! or everything is black!
    }

    this.tableMatParams = {
      color: 0xc5c5c5,
      transparent: true,
      opacity: 0.5,
      // emissive: new THREE.Color(0xb0bef0),
      // emissiveIntensity: 0.5,
      // metalness: 0.4,
    };
    
    this.robotMatParams = {
      color: 0xb0bef0,
      flatShading: true,    //it is necessary for out gltf!! or everything is black!
      transparent: true,
      opacity: 0.5,
    };

    this.path = path;
    // this.create = this.create();
    this.table = null;
    this.armLinks = [];
    this.gripperLinks = [];

    // this.endEffector = null;

  }

  controlJointAngles(angles){
    for ( let i = 0; i < 6; i++){
      let rot = this.rotAxes[i].map((val,idx) => val * angles[i] * DEG2RAD);
      // console.log(rot);
      this.armLinks[i+1].rotation.fromArray(rot);
      // this.links[i+1].rotation.y += 3;
      // console.log('aasdfa')
    }
  }

  grip(distance, type = "ROBOTIS_RH-P12-RN"){
    let gripperLinks = this.gripperLinks
    if ( type === "ROBOTIS_RH-P12-RN" ){
      if ( distance < 1 || distance > 105) {
        console.error("gripper: out of range");
        return;
      } else {
        let angle = RAD2DEG * Math.asin(( distance - 8 ) / 2 / 57);
        for (let i = 1; i < 8; i++ ){
          let j = Math.floor((i - 1)/4);
          let k = 1 + (i - 1)% 4
          let rot = 2 * (j - 0.5) * angle * DEG2RAD; 
          if ( k < 3) gripperLinks[i].rotation.y = rot; 
          else if (k === 3) gripperLinks[i].rotation.y = -rot;
        } 
      } 
    } else {
      console.error("not registed gripper");
      return;
    }
  }

  async loadModels(){
    // let arm = new THREE.Group();

    const path = this.path;
    const armLinks = this.armLinks;
    const gripperLinks = this.gripperLinks;
    let table = this.table;
    const gltfMatParams = this.gltfMatParams;
    const tableMatParams = this.tableMatParams;
    const robotMatParams = this.robotMatParams;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/jsm/libs/draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );

    let gltf = await loader.loadAsync(path + "/table/GLTFs/table.gltf");
    table = new THREE.Mesh(
      gltf.scene.children[0].geometry,
      new THREE.MeshPhongMaterial({
        ...gltfMatParams,
        ...tableMatParams,
      })
    );

    this.add(table);

    let mat = new THREE.MeshPhongMaterial({...gltfMatParams,...robotMatParams,});

    for (let i = 0; i < 7; i++ ){
      let linksPath = path + "/ALLZERO/UR5e/GLTFs/arm_" + i + ".gltf";
      let gltf = await loader.loadAsync(linksPath);
      let mesh = new THREE.Mesh(gltf.scene.children[0].geometry, mat)
      // console.log(mesh);
      armLinks.push(new THREE.Group);
      armLinks[i].add(mesh);
      if (i === 0 ) this.add(armLinks[i]);
      else {
        armLinks[i - 1].add(armLinks[i]);
        armLinks[i].position.set(
          this.armGeometries[i - 1][0],
          this.armGeometries[i - 1][1],
          this.armGeometries[i - 1][2]
        );
      }
    };

    let pos = this.armPos;
    armLinks[0].position.set(pos[0],pos[1],pos[2]);

    /*  
      gripperLinks configuration:
      ROBOTIS RH-P12-RN:    // ⎟,⎿ means grouping structure in THREEJS
      i   j   k   file  description      
      0   -1  0   0     (body)  body_on_bracket
      1   0   1   1-0   (right) ⎿ link_CLmirror_and_LR
      2   0   2   2     (right) ⎿ link_1_and_2
      3   0   3   3     (right) ⎟  ⎿ link_3
      4   0   4   4     (right) ⎟     ⎿ RUB_ASM
      5   1   1   1-1   (left)  ⎿ link_CL_and_LR
      6   1   2   2     (left)  ⎿ link_1_and_2
      7   1   3   3     (left)  ⎟  ⎿ link_3
      8   1   4   4     (left)  ⎟     ⎿ RUB_ASM
    */

    for (let i = 0; i < 9; i++){
      let linksPath, mesh;
      
      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4

      let pos = this.gripperGeometries;
      gripperLinks.push(new THREE.Group)
      
      if (i === 0) {
        linksPath = path + "/ALLZERO/RH-P12-RN/GLTFs/" + i + ".gltf";
        gltf = await loader.loadAsync(linksPath);
        mesh = new THREE.Mesh(gltf.scene.children[0].geometry, mat);
        
        armLinks[6].add(gripperLinks[i]);
        gripperLinks[i].position.set(pos[i][0], pos[i][1], pos[i][2]);
      
      } else { // (i !== 0)

        if (k < 3) gripperLinks[0].add(gripperLinks[i]);
        else gripperLinks[i - 1].add(gripperLinks[i]);

        if (k === 1) {
          linksPath = path + "/ALLZERO/RH-P12-RN/GLTFs/" + k + "-" + j  + ".gltf";
          gltf = await loader.loadAsync(linksPath);
          mesh = new THREE.Mesh(gltf.scene.children[0].geometry, mat);

        } else {
          linksPath = path + "/ALLZERO/RH-P12-RN/GLTFs/" + k + ".gltf";
          gltf = await loader.loadAsync(linksPath);
          mesh = new THREE.Mesh(gltf.scene.children[0].geometry, mat);
        }
      }

      if( j === 0 ){
        gripperLinks[i].position.set(pos[k][0], pos[k][1], pos[k][2]);
      } else {
        if ( k !== 1 ) mesh.rotation.set(0, 0, 180*DEG2RAD);
        gripperLinks[i].position.set( - pos[k][0], pos[k][1], pos[k][2]);
      }
          
      gripperLinks[i].add(mesh);
          
    }
    // this.links = links;
    // return arm;
  }
}