import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

/**
 * store for control data that frequently change 
 */
export const useControlStore = create(
  subscribeWithSelector((set) => ({

    actualAngles_q: {},

    gripDistance: 50,
    increaseGripDistance:(number) => set((state)=>{

      if (state.gripDistance + number > 100) return {gripDistance: 100}
      
      if (state.gripDistance + number < 5) return {gripDistance: 5}

      return {gripDistance: state.gripDistance + number}
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

    spatialVideo: {
      position:[-0.88, 1.02, -0.28],
      rotation:[0, -61 * Math.PI/180, 0,"YXZ"],
      scale:1,
      // rotation:[0, -61*THREE.MathUtils.DEG2RAD, 0,"YXZ"]
    },

    remoteGroup: {
      position:[-0.3,-0.4,0.3],
      rotation:[0,0,0,"XYZ"],
      scale:1.5,
    }
  }))
);
// export const useControlStore = create((set) => ({
//   actualAngles_q: {},
//   // updateActualAngles_q: (angles) => set({actualAngles_q: angles}),

// }))