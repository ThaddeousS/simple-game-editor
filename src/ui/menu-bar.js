export class MenuBar {
    constructor(config, containerId) {
        this.config = config;
        this.container = document.getElementById(containerId);
        this.activeMenu = null;
        this.init();
    }

    init() {
        this.render();
        this.attachListeners();
    }

    render() {
        this.container.innerHTML = '';

        this.config.forEach((menu, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.textContent = menu.label;
            menuItem.dataset.index = index;
            
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';
            dropdown.dataset.index = index;
            
            menu.items.forEach(item => {
            if (item.divider) {
                const divider = document.createElement('div');
                divider.className = 'dropdown-divider';
                dropdown.appendChild(divider);
            } else {
                const dropdownItem = document.createElement('div');
                dropdownItem.className = 'dropdown-item';
                if (item.disabled) dropdownItem.classList.add('disabled');
                
                const label = document.createElement('span');
                label.textContent = item.label;
                dropdownItem.appendChild(label);
                
                if (item.shortcut) {
                const shortcut = document.createElement('span');
                shortcut.className = 'shortcut';
                shortcut.textContent = item.shortcut;
                dropdownItem.appendChild(shortcut);
                }
                
                if (item.action && !item.disabled) {
                dropdownItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    item.action();
                    this.closeAllMenus();
                });
                }
                
                dropdown.appendChild(dropdownItem);
            }
            });
            
            menuItem.appendChild(dropdown);
            this.container.appendChild(menuItem);
        });
    }

    attachListeners() {
        const menuItems = this.container.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = item.dataset.index;
            this.toggleMenu(index);
            });
        });

        document.addEventListener('click', () => {
            this.closeAllMenus();
        });
    }

    toggleMenu(index) {
        const dropdown = this.container.querySelector(`.dropdown[data-index="${index}"]`);
        const menuItem = this.container.querySelector(`.menu-item[data-index="${index}"]`);

        if (this.activeMenu === index) {
            this.closeAllMenus();
        } else {
            this.closeAllMenus();
            dropdown.classList.add('show');
            menuItem.classList.add('active');
            this.activeMenu = index;
        }
    }

    closeAllMenus() {
        const dropdowns = this.container.querySelectorAll('.dropdown');
        const menuItems = this.container.querySelectorAll('.menu-item');

        dropdowns.forEach(d => d.classList.remove('show'));
        menuItems.forEach(m => m.classList.remove('active'));
        this.activeMenu = null;
    }
}