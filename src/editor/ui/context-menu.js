export class ContextMenu {
      constructor(options = {}) {
        this.menu = null;
        this.options = options;
        this.isVisible = false;
        this.createMenu();
        this.attachEvents();
      }

      createMenu() {
        if (this.menu) {
          this.menu.remove();
        }

        this.menu = document.createElement('div');
        this.menu.className = 'context-menu';
        this.menu.id = 'contextMenu';
        document.body.appendChild(this.menu);
      }

      attachEvents() {
        document.addEventListener('click', () => this.hide());
        document.addEventListener('contextmenu', (e) => {
          if (this.options.target && !e.target.closest(this.options.target)) {
            return;
          }
          e.preventDefault();
          this.show(e.pageX, e.pageY);
        });
        window.addEventListener('resize', () => this.hide());
        window.addEventListener('scroll', () => this.hide());
      }

      setItems(items) {
        this.menu.innerHTML = '';
        items.forEach(item => {
          if (item.separator) {
            const separator = document.createElement('div');
            separator.className = 'context-menu-separator';
            this.menu.appendChild(separator);
          } else {
            const menuItem = this.createMenuItem(item);
            this.menu.appendChild(menuItem);
          }
        });
      }

      createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'context-menu-item';
        
        if (item.disabled) menuItem.classList.add('disabled');
        if (item.danger) menuItem.classList.add('danger');
        if (item.submenu) menuItem.classList.add('context-menu-submenu');

        const icon = item.icon ? `<span class="context-menu-icon">${item.icon}</span>` : '';
        menuItem.innerHTML = `${icon}${item.label}`;

        if (!item.disabled && item.action) {
          menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            item.action();
            this.hide();
          });
        }

        if (item.submenu) {
          const submenu = document.createElement('div');
          submenu.className = 'submenu';
          item.submenu.forEach(subItem => {
            const subMenuItem = this.createMenuItem(subItem);
            submenu.appendChild(subMenuItem);
          });
          menuItem.appendChild(submenu);
        }

        return menuItem;
      }

      show(x, y) {
        this.menu.classList.add('active');
        this.isVisible = true;

        const menuWidth = this.menu.offsetWidth;
        const menuHeight = this.menu.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let posX = x;
        let posY = y;

        if (x + menuWidth > windowWidth) {
          posX = windowWidth - menuWidth - 10;
        }

        if (y + menuHeight > windowHeight) {
          posY = windowHeight - menuHeight - 10;
        }

        this.menu.style.left = `${posX}px`;
        this.menu.style.top = `${posY}px`;
      }

      hide() {
        this.menu.classList.remove('active');
        this.isVisible = false;
      }

      destroy() {
        if (this.menu) {
          this.menu.remove();
        }
      }
    }