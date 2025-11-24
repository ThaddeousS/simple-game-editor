const FILE_MENU_CONFIG = {
    label: 'File',
    items: [
        { label: 'New', shortcut: 'Ctrl+N', action: () => alert('New file') },
        { label: 'Open', shortcut: 'Ctrl+O', action: () => alert('Open file') },
        { label: 'Save', shortcut: 'Ctrl+S', action: () => alert('Save file') },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: () => alert('Save as...') },
        /*{ divider: true },
        { label: 'Exit', action: () => alert('Exit application') }*/
    ]
};

const EDIT_MENU_CONFIG = {
    label: 'Edit',
    items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: () => alert('Undo') },
        { label: 'Redo', shortcut: 'Ctrl+Y', action: () => alert('Redo') },
        { divider: true },
        { label: 'Cut', shortcut: 'Ctrl+X', action: () => alert('Cut') },
        { label: 'Copy', shortcut: 'Ctrl+C', action: () => alert('Copy') },
        { label: 'Paste', shortcut: 'Ctrl+V', action: () => alert('Paste') },
        /*{ divider: true },
        { label: 'Find', shortcut: 'Ctrl+F', action: () => alert('Find') }*/
    ]
};

const VIEW_MENU_CONFIG = {
    label: 'View',
    items: [
        { label: 'Zoom In', shortcut: 'Ctrl++', action: () => alert('Zoom in') },
        { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => alert('Zoom out') },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0', action: () => alert('Reset zoom') },
        { divider: true },
        { label: 'Full Screen', shortcut: 'F11', action: () => alert('Toggle full screen') }
    ]
};

const HELP_MENU_CONFIG = {
    label: 'Help',
    items: [
        { label: 'Documentation', action: () => alert('Open documentation') },
        { label: 'About', action: () => alert('About this application') }
    ]
};

export const MENU_CONFIG = [
    FILE_MENU_CONFIG,
    EDIT_MENU_CONFIG,
    VIEW_MENU_CONFIG,
    HELP_MENU_CONFIG,
];