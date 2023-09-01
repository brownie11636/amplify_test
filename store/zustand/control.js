import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"
// import { grip } from "../../components/PortalXR/PortalArm/Gripper"

/**
 * store for control data that frequently change 
 */
export const useControlStore = create(
  subscribeWithSelector((set) => ({

    actualAngles_q: {},

    minGripDistance: 0.042,   // 42mm for grip KARI nozzle
    maxGripDistance: 0.115,    // 
    gripDistance: 0.05,   // 0~115mm (0 ~ 0.115)
    increaseGripDistance:(number) => set((state)=>{
      let newDistance;
      if (state.gripDistance + number > state.maxGripDistance) {
        newDistance = state.maxGripDistance;

      } else if (state.gripDistance + number < state.minGripDistance) {
        newDistance = state.minGripDistance;

      } else {
        newDistance = state.gripDistance + number;
      }
      // let newRatio = grip.distanceToRatio(newDistance);
      return {gripDistance: newDistance}
      // return {gripDistance: newDistance, gripRatio: newRatio}
    }),

    // gripRatio is set by gripper component subscribing gripDistance
    gripRatio: 500,  // 0 (opened) ~ 740 (closed)  angle -> -4.024064 ~ 59.277210 
    // increaseGripRatio:(number) => set((state)=>{
    //   let newRatio
    //   if (state.gripRatio + number > 740) {
    //     newRatio = 740;
    //   } else if (state.gripRatio + number < 0) {
    //     newRatio = 0;
    //   } else {
    //     newRatio = state.gripDistance + number;
    //   }
    //   let newDistance = grip.ratioToDistance(newRatio);
    //   return {gripDistance: newDistance, gripRatio: newRatio}
    // }),
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