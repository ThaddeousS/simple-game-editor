import { Properties } from "./properties";
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

    const rightToolbar = new Properties(container);
    this.rightToolbar = rightToolbar;

    if (parent) {
      parent.appendChild(container);
    }
  }

  update = () => {
    this.leftToolbar.update();
    this.rightToolbar.update();
  };

  destroy = () => {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.rightToolbar.destroy();
    this.leftToolbar.destroy();
  };

  static create({ parent = null }) {
    const ui = new UI(parent);
    return ui;
  }
}
