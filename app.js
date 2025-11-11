import { Game } from "./src/game";
import "./src/styles/context-menu.scss";
import "./src/styles/dialog.scss";
import { Dialog } from "./src/ui/dialog";

const dialog = new Dialog();
dialog.open({
    title: 'Hello',
    message: 'Welcome to Game Editor',
    buttons: [
        {
            label: 'Create',
            type: 'primary',
            action: () => {
                Game.init({
                    size: {
                        width: 1024,
                        height: 768
                    }
                });
                Game.run();
                Game.createContextMenu();

                dialog.close();
                dialog.destroy();
            },
        }
    ],
});