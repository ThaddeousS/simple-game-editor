import { World } from "./src/world/world.js";

const init = () => {
  const world = World.create({
    size: { width: 2000, height: 2000 },
    camera: {
      viewPort: { width: 1024, height: 768 },
      position: { x: 100, y: 100 },
      rotation: { x: 0, y: 0 },
    },
  });

  world.init();
};

init();
