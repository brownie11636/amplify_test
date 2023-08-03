import * as color from "./colors.js"

export const button = {
  idle:{
    state: "idle",
    attributes: {
      backgroundColor: color.darkPurple,
      backgroundOpacity: 1,
    }
  },
  hovered:{
    state: "hovered",
    attributes: {        
      // backgroundColor: color.darkPurple,
      backgroundColor: color.hoveredPurple,
      backgroundOpacity: 1,
    }
  },
  selected:{
    state: "selected",
    attributes: {
      backgroundColor: color.pinkPurple,
      backgroundOpacity: 0.8,
    }
  },
  active:{
    state: "active",
    attributes: {
      backgroundColor: color.pinkPurple,
      backgroundOpacity: 1,
    }
  }
}

