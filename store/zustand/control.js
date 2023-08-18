import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

/**
 * store for control data that frequently change 
 */
export const useControlStore = create(
  subscribeWithSelector((set) => ({

    actualAngles_q: {},

    gripDistance: 50,   //0~105
    increaseGripDistance:(number) => set((state)=>{

      if (state.gripDistance + number > 100) return {gripDistance: 100}
      
      if (state.gripDistance + number < 5) return {gripDistance: 5}

      return {gripDistance: state.gripDistance + number}
    }),

    gripAngleRatio: 500,  // 0 (opened) ~ 1000 (closed)  angle -> -4.03 ~ 58.3 
    increaseGripAngleRatio:(number) => set((state)=>{

      if (state.gripAngleRatio + number > 998) return {gripAngleRatio: 998}
      
      if (state.gripAngleRatio + number < 2) return {gripAngleRatio: 2}

      return {gripAngleRatio: state.gripAngleRatio + number}
    }),
    // updateActualAngles_q: (angles) => set({actualAngles_q: angles}),

    consoleLogs: [],
    consoleNumLines: 5, 
    pushConsoleLog: (log) => set((state) => {

      let index = state.consoleLogs.length === state.consoleNumLines? 1 : 0;
      let logs = consoleLogs.slice(index);
      logs.push(log);

      return {consoleLogs: logs}
    }),
    newLog:"",
    updateNewLog: (log) => set((state) => {
      console.log(state.newLog)
      if (log === state.newLog) return{newLog: log.slice(".")}
      else return {newLog: log}
    }),

    // consoleLogs: [],
    // consoleNumLines: 5, 
    // pushConsoleLog: (log) => set((state) => {

    //   let index = state.consoleLogs.length === state.consoleNumLines? 1 : 0;
    //   let logs = consoleLogs.slice(index);
    //   logs.push(log);

    //   return {consoleLogs: logs}
    // }),
    visibleRange: {},
    // updateDepthMax: (number) => set((state) => {
    //    return {depthMax: 10}
      
    // })
    sliderData:3,

    rgbdProperty: {
      min: 0.2,
      max: 3,
      bitDepth: 8.0,
    },

    spatialVideo: {
      // position:[-0.88, 1.14, -0.05],                 // portal Set
      // rotation:[0, -61 * Math.PI/180, 0,"YXZ"],      // portal Set
      position:[-0.62, 1.53, 0.01],                     // KARI set
      rotation:[ -0.29 * Math.PI/180, -23.02 * Math.PI/180,  -0 * Math.PI/180,"YXZ"],         // KARI set
      scale:1,
      // rotation:[0, -61*THREE.MathUtils.DEG2RAD, 0,"YXZ"]
    },

    remoteGroup: {
      position:[0.3,0,0.3],
      rotation:[0,0,0,"XYZ"],
      scale:1,
    }
  }))
);
// export const useControlStore = create((set) => ({
//   actualAngles_q: {},
//   // updateActualAngles_q: (angles) => set({actualAngles_q: angles}),

// }))