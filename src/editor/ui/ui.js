import { Properties } from "./properties";
import { Toolbar } from "./toolbar";

export class UI {
  constructor(parent = null, onCreateObject = null) {
    const container = document.createElement("div");
    container.id = "ui-container";
    container.style.width = `100vw`;
    container.style.height = `100vh`;
    container.style.position = "relative";
    container.style.backgroundColor = "transparent";

    const toolbar = new Toolbar(container, onCreateObject);
    this.toolbar = toolbar;

    const properties = new Properties(container);
    this.properties = properties;

    this.container = container;

    if (parent) {
      parent.appendChild(container);
    }
  }

  update = () => {
    this.toolbar.update();
    this.properties.update();
  };

  destroy = () => {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.properties.destroy();
    this.toolbar.destroy();
  };

  static create({ parent = null, onCreateObject = null }) {
    const ui = new UI(parent, onCreateObject);
    return ui;
  }
}
