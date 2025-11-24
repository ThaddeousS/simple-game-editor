import { Game } from "../game/game";
import { MENU_CONFIG } from "./ui/configs/menu-bar-config";
import { MenuBar } from "./ui/menu-bar";

export class Editor {
    constructor() {}

    static init = ({ debug }) => {
        const menuContainer = document.createElement('div');
        menuContainer.id = 'menu-bar';
        menuContainer.className = 'menubar';
        document.body.appendChild(menuContainer);

        new MenuBar(MENU_CONFIG, 'menu-bar');
        Game.init({
            size: {
                width: screen.availWidth,
                height: screen.availHeight
            },
            debug: debug,
        });
    };
}