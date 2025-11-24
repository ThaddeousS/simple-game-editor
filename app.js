import { Game } from "./src/game";
import "./src/styles/context-menu.scss";
import "./src/styles/dialog.scss";
import "./src/styles/menu-bar.scss";
import { Dialog } from "./src/ui/dialog";
import { MenuBar } from "./src/ui/menu-bar";

const menuConfig = [
    {
        label: 'File',
        items: [
            { label: 'New', shortcut: 'Ctrl+N', action: () => alert('New file') },
            { label: 'Open', shortcut: 'Ctrl+O', action: () => alert('Open file') },
            { label: 'Save', shortcut: 'Ctrl+S', action: () => alert('Save file') },
            { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: () => alert('Save as...') },
            { divider: true },
            { label: 'Exit', action: () => alert('Exit application') }
        ]
        },
        {
        label: 'Edit',
        items: [
            { label: 'Undo', shortcut: 'Ctrl+Z', action: () => alert('Undo') },
            { label: 'Redo', shortcut: 'Ctrl+Y', action: () => alert('Redo') },
            { divider: true },
            { label: 'Cut', shortcut: 'Ctrl+X', action: () => alert('Cut') },
            { label: 'Copy', shortcut: 'Ctrl+C', action: () => alert('Copy') },
            { label: 'Paste', shortcut: 'Ctrl+V', action: () => alert('Paste') },
            { divider: true },
            { label: 'Find', shortcut: 'Ctrl+F', action: () => alert('Find') }
        ]
        },
        {
        label: 'View',
        items: [
            { label: 'Zoom In', shortcut: 'Ctrl++', action: () => alert('Zoom in') },
            { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => alert('Zoom out') },
            { label: 'Reset Zoom', shortcut: 'Ctrl+0', action: () => alert('Reset zoom') },
            { divider: true },
            { label: 'Full Screen', shortcut: 'F11', action: () => alert('Toggle full screen') }
        ]
        },
        {
        label: 'Help',
        items: [
            { label: 'Documentation', action: () => alert('Open documentation') },
            { label: 'About', action: () => alert('About this application') }
        ]
    }
];

const menuContainer = document.createElement('div');
menuContainer.id = 'menu-bar';
menuContainer.className = 'menubar';
document.body.appendChild(menuContainer);

const menuBar = new MenuBar(menuConfig, 'menu-bar');

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