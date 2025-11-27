export class Properties {
  constructor(parent) {
    const container = document.createElement("div");
    container.id = "properties-container";
    container.style.width = `10%`;
    container.style.height = `100%`;
    container.style.position = "absolute";
    container.style.right = "0";
    container.style.top = "0";
    container.style.backgroundColor = "#000505ff";

    const title = document.createElement("h2");
    title.innerText = "Properties";
    title.style.color = "#ffffff";
    title.style.textAlign = "center";
    container.appendChild(title);

    this.title = title;
    this.container = container;

    if (parent) {
      parent.appendChild(container);
    }
  }
}
