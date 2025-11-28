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

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.getElementById("world-container"),
      engine: engine,
      options: {
        width: cameraInstance.viewPort.width,
        height: cameraInstance.viewPort.height,
      },
    });

    this.camera = cameraInstance;
    this.size = size;
    this.engine = engine;
    this.render = render;
  }

  init = () => {
    Matter.Runner.run(this.engine);
    Matter.Render.run(this.render);
  };

  createObnject = (type) => {
    switch (type) {
      case "rectangle":
        if (this.engine && this.render) {
          const box = Matter.Bodies.rectangle(400, 200, 80, 80);

          Matter.Composite.add(this.engine.world, [box]);
        }
        break;
      case "circle":
        console.log("Creating a circle object");
        break;
      default:
        console.log(`Unknown object type: ${type}`);
    }
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
