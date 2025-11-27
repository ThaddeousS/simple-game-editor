export class Camera {
  constructor(
    viewPort = { width: 800, height: 600 },
    position = { x: 0, y: 0 },
    rotation = { x: 0, y: 0 },
    fov = 75,
  ) {
    this.position = position;
    this.rotation = rotation;
    this.viewPort = viewPort;
    this.fov = fov; // Field of view
  }

  static create({
    viewPort = { width: 800, height: 600 },
    position = { x: 0, y: 0 },
    rotation = { x: 0, y: 0 },
    fov = 75,
  }) {
    const camera = new Camera(viewPort, position, rotation, fov);
    return camera;
  }
}
