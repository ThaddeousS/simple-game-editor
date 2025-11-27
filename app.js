import { World } from "./src/world/world.js";
import game_config from "./public/game_config.json";
import { Editor } from "./src/editor/editor.js";

const init = () => {
  const editor = Editor.create({ parent: "body" });
  editor.init();

  /*const world = World.create({
    size: game_config.world.size,
    camera: game_config.camera,
  });

  world.init();*/
};

init();
