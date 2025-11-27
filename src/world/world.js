import { Engine, Render } from "matter-js";
import { Camera } from "../camera/camera";

export class World {
  constructor(
    size = { width: 1000, height: 1000 },
    camera = {
      viewPort: { width: 800, height: 600 },
      position: { x: 0, y: 0 },
      rotation: { x: 0, y: 0 },
      fov: 75,
    },
  ) {
    const cameraInstance = Camera.create(camera);

    this.camera = cameraInstance;
    this.size = size;
  }

  init = () => {
    const engine = Engine.create();
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: this.camera.viewPort.width,
        height: this.camera.viewPort.height,
      },
    });
  };

  static create({
    size = { width: 1000, height: 1000 },
    camera = {
      viewPort: { width: 800, height: 600 },
      position: { x: 0, y: 0 },
      rotation: { x: 0, y: 0 },
      fov: 75,
    },
  }) {
    const world = new World(size);
    return world;
  }
}
