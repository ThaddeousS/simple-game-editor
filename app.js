import { World } from "./src/world/world.js";
import game_config from "./public/game_config.json";
import { Editor } from "./src/editor/editor.js";

class App {
  constructor() {}

  init = () => {
    const world = World.create({
      size: game_config.world.size,
      camera: game_config.world.camera,
    });

    world.init();

    const editor = Editor.create({
      parent: document.body,
      onCreateObject: this.onCreateObject,
    });

    editor.init();

    this.world = world;
    this.editor = editor;
  };

  onCreateObject = (type) => {
    if (this.world) {
      this.world.createObnject(type);
    }
  };
}

const app = new App();
app.init();
export default app;
