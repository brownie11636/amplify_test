import { create } from "zustand";

export const useModeStore = create((set) => ({
  controllerMode: "default",
  switchMode: (modeStr) => set((state) => {
    if (modeStr) {
      return {controllerMode: modeStr};
    }
    else {
      switch (state.controllerMode) {
        case "default": return {controllerMode: "operating"};
        case "operating": return {controllerMode: "setting"};
        case "setting": return {controllerMode: "default"};
        // default: return {controllerMode: "default"}
      }
    }
  }),

  translatingAxes: [true,true,true],
  updateTranslatingAxes: (axisStr) => set((state) => {
    let axes = state.translatingAxes;
    if ( axisStr === "X" ) axes[0] = !axes[0];
    if ( axisStr === "Y" ) axes[1] = !axes[1];
    if ( axisStr === "Z" ) axes[2] = !axes[2];
    // console.log(axes)
    return {translatingAxes: axes};
  }),
  rotatingAxes:[true,true,true],
  updateRotatingAxes: (axisStr) => set((state) => {
    let axes = state.rotatingAxes;
    if ( axisStr === "X" ) axes[0] = !axes[0];
    if ( axisStr === "Y" ) axes[1] = !axes[1];
    if ( axisStr === "Z" ) axes[2] = !axes[2];
    // console.log(axes)
    return {rotatingAxes: axes};
  }),

  translateAxes: "XYZ",
  updateTranslateAxes: (geoStr) => set((state) => {
    if(geoStr === "X"
    || geoStr === "Y"
    || geoStr === "Z"
    || geoStr === "XY"
    || geoStr === "YZ"
    || geoStr === "ZX"
    || geoStr === "XYZ"){
      return {translateAxes: geoStr};
    }else {
      console.log("wrong fixed geometry:" + geoStr);
      return {translateAxes: state.translateAxes};
    }
  }),
  rotateAxes:[true,true,true],
  updateRotateAxes: (axisStr) => set((state) => {
    let axes = state.rotateAxes;
    if ( axisStr === "X" ) axes[0] = !axes[0];
    if ( axisStr === "Y" ) axes[1] = !axes[1];
    if ( axisStr === "Z" ) axes[2] = !axes[2];
    // console.log(axes)
    return {rotateAxes: axes};
  }),
}))