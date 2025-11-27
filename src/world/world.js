import Matter from "matter-js";
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
    const container = document.createElement("div");
    container.id = "world-container";
    container.style.width = `${size.width}px`;
    container.style.height = `${size.height}px`;
    document.body.appendChild(container);

    const cameraInstance = Camera.create(camera);

    this.camera = cameraInstance;
    this.size = size;
  }

  init = () => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.getElementById("world-container"),
      engine: engine,
      options: {
        width: this.camera.viewPort.width,
        height: this.camera.viewPort.height,
      },
    });

    Matter.Runner.run(engine);
    Matter.Render.run(render);
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
