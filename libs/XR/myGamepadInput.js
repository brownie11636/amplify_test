export function get(session, gamepadInput) {

  var handedness = "unknown";
  let i = 0;

  //a check to prevent console errors if only one input source
    if (isIterable(session.inputSources)) {
      for (const source of session.inputSources) {
        if (source && source.handedness) {
            handedness = source.handedness; //left or right controllers
        }
        if (!source.gamepad) continue;
        // const controller = renderer.xr.getController(i++);
        // const old = prevGamePads.get(source);
        gamepadInput[handedness].prev = {
          buttons: gamepadInput[handedness].new.buttons.slice(),
          axes: gamepadInput[handedness].new.axes.slice(0)
        }
        gamepadInput[handedness].new = {
        // const data = {
          // handedness: handedness,
          buttons: source.gamepad.buttons.map((b) => b.value),
          axes: source.gamepad.axes.slice(0)
        };
        // params.gamepad[handedness] = {
        // // const data = {
        //   // handedness: handedness,
        //   buttons: source.gamepad.buttons.map((b) => b.value),
        //   axes: source.gamepad.axes.slice(0)
        // };
        // if ( i === 1 ){
        // if ( handedness === 'right' || handedness === 'left' ){
        //   // gamepadButtons = source.gamepad.buttons.map((b) => b.value);
        //   // gamepadAxes = source.gamepad.axes.slice(0);
        //   // params.gamepad[handedness].buttons = source.gamepad.buttons.map((b) => b.value);
        //   // params.gamepad[handedness].axes = source.gamepad.axes.slice(0)
        // }
      };
    };

    return gamepadInput;
}

function isIterable(obj) {  //function to check if object is iterable
  // checks for null and undefined
  if (obj == null) {
      return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

export function create() {

  const gamepadParams = {    //webXR standard
    buttons:[
      0,    // Trigger
      0,    // Squeeze
      0,    // Touchpad Press
      0,    // Thumbstick Press
      0,    // A Button
      0,    // B Button
    ],
    axes:[
      0,    // Touchpad X
      0,    // Touchpad Y
      0,    // Thumbstick X
      0,    // Thumbstick Y
    ],
  };

let gamepadStr = JSON.stringify(gamepadParams);
// let gamepadR = JSON.parse(gamepadStr); 
// let gamepadL = JSON.parse(gamepadStr); 
// let prevGamepadR = JSON.parse(gamepadStr); 
// let prevGamepadL = JSON.parse(gamepadStr); 

const gamepadInput = {
  right: {
    new: JSON.parse(gamepadStr),
    prev: JSON.parse(gamepadStr), 
  },
  left: {
    new: JSON.parse(gamepadStr),
    prev: JSON.parse(gamepadStr), 
  }, 
}

  return gamepadInput
}