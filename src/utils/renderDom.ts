import Block from "./Block";

export default function renderDom(block: Block, selector: string = "#app") {
    const root = document.querySelector(selector);

    root!.innerHTML = "";
    root!.appendChild(block.getContent());
}
