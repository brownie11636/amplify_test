import { create } from "zustand";

export const useModeStore = create((set) => ({
  
  controllerMode: "default",
  switchMode: (modeStr) => set((state) => {
    if ( modeStr === "default" 
    || modeStr === "operating"
    || modeStr === "setting") {

      return {controllerMode: modeStr};
    }
    else if (modeStr === null || modeStr === undefined){
      switch (state.controllerMode) {
        case "default": return {controllerMode: "operating"};
        case "operating": return {controllerMode: "setting"};
        case "setting": return {controllerMode: "default"};
        // default: return {controllerMode: "default"}
      }
    } else {
      console.log("wrong command for switchMode()")
      return {controllerMode: state.controllerMode}
    }
  }),

  isSync: false,

  coordinate: "base",
  updateCoordinate: (coordStr) => set((state) => {
    if ( coordStr === "base" || coordStr === "TCP"){

        return {coordinate: coordStr}

    } else {
      console.log("wrong command for updateCoordinate()")
      return {coorindate: state.coordinate}
    }
  }),

  translatingAxes: [true,true,true],  // true is released
  updateTranslatingAxes: (axisStr) => set((state) => {
    
    let i = axisStr.charCodeAt([0]) - 88;  //88: ASCII code of "X", axisStr shoud be "X"||"Y"||"Z"
    
    let axes = [...state.translatingAxes];
    axes[i] = !axes[i];
    // console.log(axes)
    return {translatingAxes: axes};
  }),

  rotatingAxes:[true,true,true],  //  true is free axis
  updateRotatingAxes: (axisStr) => set((state) => {

    let axes = [...state.rotatingAxes];
    let aligneds = [...state.alignedAxes];

    if ( axisStr === "X" || axisStr === "Y" || axisStr === "Z" ) {
      
      let i = axisStr.charCodeAt([0]) - 88;  // 88: ASCII code of "X", axisStr shoud be "X"||"Y"||"Z"
      
      axes.forEach((v,index) => {
        i === index ? axes[index] = true : axes[index] = false
      })
      // axes[i] = !axes[i];

      if (axes[i] === true){  // releasing rotatingAxis relaese alignment condition of others
        aligneds = aligneds.map((v,i_a) => {
          if(i_a !== i) return false;
          else return v
        })
      }
    }

    if ( axisStr === "XYZ" ) {
      axes = [true, true, true];
      aligneds = [false,false,false];
    }

    if ( axisStr === "FIX\nALL") {
      axes = [false, false, false];
    }

  
    return {rotatingAxes: axes, alignedAxes: aligneds};
  }),

  /**
   * alignedAxes
   *  (false -> true) updating is only resulting from updateAlignedAxes.
   *  Also, it fixes rotating axes.
   * 
   *  (true -> false) updating is only resulting from updateRotatingAxes.
   *  so, AlignAxes button only be capable to set alignment, 
   *  but the alignment is released by appropriate modification of rotating condition.  
   */
  alignedAxes: [false, false, false], //only false -> true
  updateAlignedAxes: (axisStr) => set((state) => {

    let i = axisStr.charCodeAt([0]) - 88;  //88: ASCII code of "X", axisStr shoud be "X"||"Y"||"Z"
    
    let aligneds = [...state.alignedAxes];
    // aligneds[i] = true;
    aligneds[i] = !aligneds[i];

    let alignIndex = aligneds.reduce((a,c) => a+c)

    if (alignIndex > 0) {

      let rotatings= [false,false,false];

      if (alignIndex === 1) rotatings[i] = state.rotatingAxes[i];

      return {alignedAxes: aligneds, rotatingAxes: rotatings}

    } else{

      return {alignedAxes: aligneds}
    } 

  }),

  settingMode: {
    target: "spatialVideo",
    type: null,   // position, rotation, scale
    axis: null,   // X Y Z
    index: null,  // 0 for X, 1 for Y, 2 for Z
  },


  // translateAxes: "XYZ",
  // updateTranslateAxes: (geoStr) => set((state) => {
  //   if(geoStr === "X"
  //   || geoStr === "Y"
  //   || geoStr === "Z"
  //   || geoStr === "XY"
  //   || geoStr === "YZ"
  //   || geoStr === "ZX"
  //   || geoStr === "XYZ"){
  //     return {translateAxes: geoStr};
  //   }else {
  //     console.log("wrong fixed geometry:" + geoStr);
  //     return {translateAxes: state.translateAxes};
  //   }
  // }),
  // rotateAxes:[true,true,true],
  // updateRotateAxes: (axisStr) => set((state) => {
  //   let axes = state.rotateAxes;
  //   if ( axisStr === "X" ) axes[0] = !axes[0];
  //   if ( axisStr === "Y" ) axes[1] = !axes[1];
  //   if ( axisStr === "Z" ) axes[2] = !axes[2];
  //   // console.log(axes)
  //   return {rotateAxes: axes};
  // }),

  
}))