"use strict"

import * as THREE from 'three';
import { XRControllerModelFactory } from '/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from '/jsm/webxr/XRHandModelFactory.js';
import { InteractiveGroup } from '/jsm/interactive/InteractiveGroup.js';

export function getXRControllers(renderer, group, handShape = "mesh"){

  let controllers = [];
  let controllerGrips = [];
  
  let hands = [];

  const controllerModelFactory = new XRControllerModelFactory();
  const handModelFactory = new XRHandModelFactory();

  for ( let i = 0; i < 2; i++){
    let controller = renderer.xr.getController(i);
    
    // controller.addEventListener('selectstart', () => this.userData.isSelecting = true);
    // controller.addEventListener('selectend', () => this.userData.isSelecting = false);
    controller.addEventListener('connected', (event) => {
      // console.log(this)
      // console.log(event)
      event.target.add(buildController(event.data))
      // this.add(buildController(event.data))
    });
    controller.addEventListener('disconnected', () => this.remove(this.children[0]));

    let grip = renderer.xr.getControllerGrip(i);
    grip.add(controllerModelFactory.createControllerModel(grip));

    group.add(controller);
    group.add(grip);
    controllerGrips.push(grip);
    controllers.push(controller);

    let hand = renderer.xr.getHand(i);
    // hand.addEventListener('pinchstart', () => { });
    // hand.addEventListener('pinchend', () => { });
    hand.add(handModelFactory.createHandModel(hand, handShape)); //boxes, spheres, mesh

    group.add(hand);
    hands.push(hand);
  }
  return [controllers, controllerGrips, hands]
}

export function getGamepadInputs(session){
  const gamepad = {    //webXR standard
    buttons: [
      0,    // Trigger          -> right: end-effector control, left:
      0,    // Squeeze          -> right: , left:
      0,    // Touchpad Press   -> right: , left:
      0,    // Thumbstick Press -> right: , left:
      0,    // A Button         -> right: , left:
      0,    // B Button         -> right: record function on off, left:
    ],
    axes: [
      0,    // Touchpad X       -> right: , left:
      0,    // Touchpad Y       -> right: , left:
      0,    // Thumbstick X     -> right: robot position change, left:
      0,    // Thumbstick Y     -> right: robot position change, left:
    ],
  };

  let gamepadStr = JSON.stringify(gamepad);
  let gamepadR = JSON.parse(gamepadStr);
  let gamepadL = JSON.parse(gamepadStr);
  let prevGamepadR = JSON.parse(gamepadStr);
  let prevGamepadL = JSON.parse(gamepadStr);

  let handedness = "unknown";

  let input = {
    right: {
      new: gamepadR,
      prev: prevGamepadR,
    },
    left: {
      new: gamepadL,
      prev: prevGamepadL,
    },
  }

  // let session = renderer.xr.getSession();
  if (session && isIterable(session.inputSources)) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        handedness = source.handedness; //left or right controllers
      }
      if (!source.gamepad) continue;

      input[handedness].prev = {
        buttons: input[handedness].new.buttons.slice(),
        axes: input[handedness].new.axes.slice(0)
      }
      input[handedness].new = {
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0)
      };
    };
  };

  return input;
}


function buildController(data) {

  let geometry, material;

  switch (data.targetRayMode) {

    case 'tracked-pointer':

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, - 1], 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));

      material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });

      return new THREE.Line(geometry, material);

    case 'gaze':

      geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, - 1);
      material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true });
      return new THREE.Mesh(geometry, material);

  }

}

function isIterable(obj) {  //function to check if object is iterable
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}