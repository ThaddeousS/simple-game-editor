import { Toolbar } from "./toolbar";

export class UI {
  constructor(parent = null) {
    const container = document.createElement("div");
    container.id = "ui-container";
    container.style.width = `100vw`;
    container.style.height = `100vh`;
    container.style.position = "relative";
    container.style.backgroundColor = "transparent";

    const leftToolbar = new Toolbar(container);
    this.leftToolbar = leftToolbar;

    if (parent) {
      parent.appendChild(container);
    }
  }

  static create({ parent = null }) {
    const ui = new UI(parent);
    return ui;
  }
}
