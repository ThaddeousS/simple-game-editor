export class Toolbar {
  constructor(parent) {
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
    container.appendChild(title);

    this.container = container;
    this.title = title;

    if (parent) {
      parent.appendChild(container);
    }
  }
}
