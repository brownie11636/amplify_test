import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

/**
 * store for control data that frequently change 
 */
export const useControlStore = create(
  subscribeWithSelector((set) => ({
    actualAngles_q: {},
    gripDistance: 50,
    increaseGripDistance:(number) => set(
      (state)=>{
        if (state.gripDistance + number > 100) return {gripDistance: 100}
        if (state.gripDistance + number < 5) return {gripDistance: 5}
        return {gripDistance: state.gripDistance + number}
      }),
    // updateActualAngles_q: (angles) => set({actualAngles_q: angles}),
  }))
)
// export const useControlStore = create((set) => ({
//   actualAngles_q: {},
//   // updateActualAngles_q: (angles) => set({actualAngles_q: angles}),

// }))