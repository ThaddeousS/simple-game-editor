import { UI } from "../editor/ui/ui.js";

export class Editor {
  constructor() {
    const container = document.createElement("div");
    container.id = "editor-container";
    container.style.width = `100vw`;
    container.style.height = `100vh`;
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.right = "0";
    container.style.backgroundColor = "#14e00dff";
    container.style.overflow = "hidden";

    const ui = UI.create({ parent: container });

    this.container = container;
    this.ui = ui;
  }

  init = () => {
    document.body.appendChild(this.container);
  };

  static create() {
    const editor = new Editor();
    return editor;
  }
}
