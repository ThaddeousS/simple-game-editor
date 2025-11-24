import "./src/styles/context-menu.scss";
import "./src/styles/dialog.scss";
import "./src/styles/menu-bar.scss";
import { MenuBar } from "./src/ui/menu-bar";
import { Game } from "./src/game";
import { MENU_CONFIG } from "./src/ui/configs/menu-bar-config";

const menuContainer = document.createElement('div');
menuContainer.id = 'menu-bar';
menuContainer.className = 'menubar';
document.body.appendChild(menuContainer);

const menuBar = new MenuBar(MENU_CONFIG, 'menu-bar');
Game.init({
    size: {
        width: screen.availWidth,
        height: screen.availHeight
    },
    debug: false,
});

/*const dialog = new Dialog();
dialog.open({
    title: 'Hello',
    message: 'Welcome to Game Editor',
    buttons: [
        {
            label: 'Create',
            type: 'primary',
            action: () => {
                const menu = new MenuBar(menuConfig, 'game-content');
            },
        }
    ],
});*/