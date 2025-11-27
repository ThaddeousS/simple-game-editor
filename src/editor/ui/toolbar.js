export class Toolbar {
  constructor(parent, onCreateObject) {
    const container = document.createElement("div");
    container.id = "toolbar-container";
    container.style.width = `10%`;
    container.style.height = `100%`;
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.top = "0";
    container.style.backgroundColor = "#050000ff";

    const title = document.createElement("h2");
    title.innerText = "Toolbar";
    title.style.color = "#ffffff";
    title.style.textAlign = "center";
    title.style.userSelect = "none";
    container.appendChild(title);

    const createRectangleButton = document.createElement("button");
    createRectangleButton.innerText = "Create Rectangle";
    createRectangleButton.style.display = "block";
    createRectangleButton.style.margin = "10px auto";

    createRectangleButton.addEventListener("click", () => {
      if (onCreateObject) {
        onCreateObject("rectangle");
      }
    });

    container.appendChild(createRectangleButton);

    const createCircleButton = document.createElement("button");
    createCircleButton.innerText = "Create Circle";
    createCircleButton.style.display = "block";
    createCircleButton.style.margin = "10px auto";

    createCircleButton.addEventListener("click", () => {
      if (onCreateObject) {
        onCreateObject("circle");
      }
    });

    container.appendChild(createCircleButton);

    this.container = container;
    this.title = title;
    this.createRectangleButton = createRectangleButton;
    this.createCircleButton = createCircleButton;

    if (parent) {
      parent.appendChild(container);
    }
  }

  update = () => {
    // Update toolbar elements if needed
  };

  destroy = () => {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  };
}
