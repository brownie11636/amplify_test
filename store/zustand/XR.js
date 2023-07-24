import { create } from "zustand";

export const useXRStore = create((set) => ({
  controllerMode: "normal",
  switchMode: () => set((state) => {
    switch (state.controllerMode) {
      case "normal": return {controllerMode: "operating"};
      case "operating": return {controllerMode: "setting"};
      case "setting": return {controllerMode: "normal"};
      // default: return {controllerMode: "default"}
    }
  }),
  triggerPressed_R: false,  //right.buttons[0]
  updateTriggerPressed_R: (isPressed) => set({triggerPressed_R: isPressed}),
  squeezePressed_R: false,  //right.buttons[1]
  updateSqueezePressed_R: (isPressed) => set({squeezePressed_R: isPressed}),
  touchpadPressed_R: false,  //right.buttons[2]
  updateTouchpadPressed_R: (isPressed) => set({touchpadPressed_R: isPressed}),
  stickPressed_R: false,  //right.buttons[3]
  updateStickPressed_R: (isPressed) => set({touchpadPressed_R: isPressed}),
  buttonAPressed_R: false,  //right.buttons[4]
  updateButtonAPressed_R: (isPressed) => set({buttonAPressed_R: isPressed}),
  buttonBPressed_R: false,  //right.buttons[5]
  updateButtonBPressed_R: (isPressed) => set({buttonBPressed_R: isPressed}),
  
  touchpadRight_R: false,  //right.axes[0]
  updateTouchpadRight_R: (bool) => set({touchpadRight_R: bool}),
  touchpadLeft_R: false,  //right.axes[0]
  updateTouchpadLeft_R: (bool) => set({touchpadLeft_R: bool}),
  touchpadUp_R: false,  //right.axes[1]
  updateTouchpadUp_R: (bool) => set({touchpadUp_R: bool}),
  touchpadDown_R: false,  //right.axes[1]
  updateTouchpadLeft_R: (bool) => set({touchpadDown_R: bool}),
  stickRight_R: false,  //right.axes[2]
  updateStickRight_R: (bool) => set({stickRight_R: bool}),
  stickLeft_R: false,  //right.axes[2]
  updateStickLeft_R: (bool) => set({stickLeft_R: bool}),
  stickUp_R: false,  //right.axes[3]
  updateStickUp_R: (bool) => set({stickUp_R: bool}),
  stickDown_R: false,  //right.axes[3]
  updateStickDown_R: (bool) => set({stickDown_R: bool}),

  triggerPressed_L: false,  //left.buttons[0]
  updateTriggerPressed_L: (isPressed) => set({triggerPressed_L: isPressed}),
  squeezePressed_L: false,  //left.buttons[1]
  updateSqueezePressed_L: (isPressed) => set({squeezePressed_L: isPressed}),
  touchpadPressed_L: false,  //left.buttons[2]
  updateTouchpadPressed_L: (isPressed) => set({touchpadPressed_L: isPressed}),
  stickPressed_L: false,  //left.buttons[3]
  updateStickPressed_L: (isPressed) => set({touchpadPressed_L: isPressed}),
  buttonXPressed_L: false,  //left.buttons[4]
  updateButtonAPressed_L: (isPressed) => set({buttonAPressed_L: isPressed}),
  buttonYPressed_L: false,  //left.buttons[5]
  updateButtonBPressed_L: (isPressed) => set({buttonBPressed_L: isPressed}),
  
  touchpadRight_L: false,  //left.axes[0]
  updateTouchpadRight_L: (bool) => set({touchpadRight_L: bool}),
  touchpadLeft_L: false,  //left.axes[0]
  updateTouchpadLeft_L: (bool) => set({touchpadLeft_L: bool}),
  touchpadUp_L: false,  //left.axes[1]
  updateTouchpadUp_L: (bool) => set({touchpadUp_L: bool}),
  touchpadDown_L: false,  //left.axes[1]
  updateTouchpadLeft_L: (bool) => set({touchpadDown_L: bool}),
  stickRight_L: false,  //left.axes[2]
  updateStickRight_L: (bool) => set({stickRight_L: bool}),
  stickLeft_L: false,  //left.axes[2]
  updateStickLeft_L: (bool) => set({stickLeft_L: bool}),
  stickUp_L: false,  //left.axes[3]
  updateStickUp_L: (bool) => set({stickUp_L: bool}),
  stickDown_L: false,  //left.axes[3]
  updateStickDown_L: (bool) => set({stickDown_L: bool}),

}))