"use strict"

import * as THREE from "three";

import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "/jsm/libs/stats.module.js";
import { VRButton } from "/jsm/webxr/VRButton.js";
import { HTMLMesh } from "/jsm/interactive/HTMLMesh.js";
// import { GUI } from "/jsm/interative/InteractiveGroup.js";
import { getXRControllers, getGamepadInputs } from "/js/portal/XR/controllers.js";


/*
TODO: 
  fix framerate
  https://discoverthreejs.com/book/first-steps/animation-loop/
  get controller pos and rot
*/

/*
  PortalXR (world)
    ⎿ Scene
      ⎿ remoteStage
      ⎟ ⎿ portalArm
      ⎟ 
      ⎿ user (only in XR)
      ⎟ ⎿ camera
      ⎟ ⎿ controllers
      ⎟ ⎿ hands
      ⎟
      ⎿ devBoard
*/


const DEG2RAD = THREE.MathUtils.DEG2RAD;
export class PortalXR {
  constructor(container){
    this.scene = this.setScene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    this.user = new THREE.Group();
    // this.user.position.set(0, 0, 0);
    this.user.position.set(-0.5, 0, 0);
    this.user.updateMatrixWorld();

    this.controllers = [];
    this.hands = [];
    this.fps = 60;

    // this.renderer = this.setRenderer();
    this.renderer = this.setRenderer();
    container.appendChild(this.renderer.domElement);
    container.appendChild(VRButton.createButton(this.renderer));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    this.remoteStage = new THREE.Group();
    this.remoteStage.position.set(0.5,0,0)
    this.XRRatio = 0.5;
    this.scene.add(this.remoteStage);
    this.arm = null;

    [ 
      this.controllers, 
      this.controllerGrips, 
      this.hands
    ] = getXRControllers(this.renderer,this.user);

    this.gamepad = getGamepadInputs();

    this.monitoring = this.createDevBoard({width:600, height:900},{width:40,height:60}, [30, 1, -50]);
    this.scene.add(this.monitoring.board);

    this.posForRobot = new THREE.Vector3();

    this.test_i=0;
  }

  addRemoteArm(portalArm) {
    this.remoteStage.add(portalArm);
    console.log("addArm")
    this.arm = portalArm;
  }

  setScene(){
    let scene = new THREE.Scene();
  
    let loader = new THREE.CubeTextureLoader();
    let texture = loader.load([
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
      'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    ]);
    scene.background = texture;
  
    scene.add(new THREE.AxesHelper());
    
  
    scene.add(new THREE.HemisphereLight(0x606060, 0x404040));
    // let light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(10, 10, 10).normalize();
    // scene.add(light);
    let ambLight = new THREE.AmbientLight(0x404040,1);
    scene.add(ambLight);
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
  
    scene.add(ambientLight, pointLight);
    // console.log("setscene")

    return scene;
  }

  setRenderer(){

    let scene = this.scene;
    let camera = this.camera;
    let user = this.user

    let renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
  
    renderer.xr.enabled = true;
  
    renderer.xr.addEventListener("sessionstart", () => {
      scene.add(user);
      user.add(camera);
    })
  
    renderer.xr.addEventListener("sessionend", () => {
      scene.remove(user)
      user.remove(camera);
    })
    console.log("setRenderer")

    return renderer;
  }

  animate(){
    let renderer = this.renderer;
    renderer.setAnimationLoop(this.animate.bind(this));

    ///////////////
    this.remoteStage.scale.setScalar(1/this.XRRatio)

    if(renderer.xr.isPresenting) {
      this.gamepad = getGamepadInputs(renderer.xr.getSession());
      // console.log(this.controllers[0].position)
      this.posForRobot = 
        this.arm.armLinks[0].worldToLocal(
        this.user.localToWorld(
          this.controllers[1].position.clone()
          )
        )
        // .sub(new THREE.Vector3().fromArray(this.arm.armPos));
    }

    this.updateDevBoard();
    ////////////////////

    renderer.render(this.scene, this.camera);
  }

  createDevBoard(canvas_,mesh_,pos,rot){
    let canvas = document.createElement("canvas");
    canvas.width = canvas_.width;
    canvas.height = canvas_.height;
    let ctx = canvas.getContext("2d");
    let texture = new THREE.CanvasTexture(canvas);
    let canvasMat = new THREE.MeshBasicMaterial({ map: texture});
    
    // texture.needsUpdate = true;

    let board = new THREE.Mesh( new THREE.PlaneGeometry(mesh_.width,mesh_.height),canvasMat);
    board.position.fromArray(pos);
    board.rotation.setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1), board.position.clone().normalize()
      ));
    // this.scene.add(board);
    
    return { board, ctx, texture, width:canvas.width, height:canvas.height };
  }

  updateDevBoard(){
    let ctx = this.monitoring.ctx;
    let blank = this.monitoring.width * 0.03;
    let lineHeight = this.monitoring.height / 20;
    let str = "example";

    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0,0,this.monitoring.width, this.monitoring.height);
    ctx.fillStyle = 'black';
    ctx.font = "30px sans-serif";

    writeText( 0, "monitoring_dev_board", str );
    writeText( 1, "right_button[0]", this.gamepad.right.new.buttons[0] );
    writeText( 2, "right_button[1]", this.gamepad.right.new.buttons[1] );
    writeText( 3, "R cont X?", this.controllers[1].position.x );
    writeText( 4, "R cont Y?", this.controllers[1].position.y );
    writeText( 5, "R cont Z?", this.controllers[1].position.z );
    writeText( 19, "last line", this.test_i );
    this.test_i++;
    function writeText( idx, TAG, value){
      ctx.fillText(idx+"_"+TAG + ": " + value, blank, (idx + 0.7)*lineHeight);
    }
    // console.log(this.gamepad.right.new.buttons[0]);
    // console.log(this.gamepad.right.new.buttons[1]);
    this.monitoring.texture.needsUpdate = true;

    // console.log("devboardUpdate")
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }

  onWindowResize(event)
  {
      if (this.resizeRendererToDisplaySize()) {
          const canvas = this.renderer.domElement;
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
          this.camera.updateProjectionMatrix();
      }
  }

}