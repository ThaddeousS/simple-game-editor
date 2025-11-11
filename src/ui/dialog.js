export class Dialog {
    constructor() {
        this.overlay = null;
        this.dialog = null;
        this.createOverlay();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'dialog-overlay';
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
            this.close();
            }
        });
        document.body.appendChild(this.overlay);
    }

    open(config) {
        this.dialog = document.createElement('div');
        this.dialog.className = 'dialog';

        const header = `
            <div class="dialog-header">
            <h2 class="dialog-title">${config.title || 'Dialog'}</h2>
            </div>
        `;

        let body = '<div class="dialog-body">';
        if (config.message) {
            body += `<p class="dialog-message">${config.message}</p>`;
        }

        if (config.inputs) {
            config.inputs.forEach((input, index) => {
            if (input.type === 'checkbox') {
                body += `
                <div class="dialog-input-group dialog-checkbox-group">
                    <label class="dialog-checkbox-label">
                    <input 
                        type="checkbox"
                        class="dialog-checkbox"
                        id="dialog-input-${index}"
                        ${input.checked ? 'checked' : ''}
                    >
                    <span>${input.label}</span>
                    </label>
                </div>
                `;
            } else {
                body += `
                <div class="dialog-input-group">
                    <label class="dialog-label">${input.label}</label>
                    <${input.type === 'textarea' ? 'textarea' : 'input'} 
                    class="dialog-input ${input.type === 'textarea' ? 'dialog-textarea' : ''}"
                    type="${input.type || 'text'}"
                    id="dialog-input-${index}"
                    placeholder="${input.placeholder || ''}"
                    ${input.required ? 'required' : ''}
                    ${input.value ? `value="${input.value}"` : ''}
                    >${input.type === 'textarea' ? (input.value || '') + '</textarea>' : ''}
                </div>
                `;
            }
            });
        }
        body += '</div>';

        let footer = '<div class="dialog-footer">';
        if (config.buttons) {
            config.buttons.forEach((btn, index) => {
            const btnClass = btn.type ? `dialog-btn-${btn.type}` : 'dialog-btn-primary';
            footer += `
                <button class="dialog-btn ${btnClass}" data-action="${index}">
                ${btn.label}
                </button>
            `;
            });
        }
        footer += '</div>';

        this.dialog.innerHTML = header + body + footer;
        this.overlay.appendChild(this.dialog);

        const buttons = this.dialog.querySelectorAll('[data-action]');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
            const actionIndex = parseInt(btn.getAttribute('data-action'));
            const button = config.buttons[actionIndex];
            
            if (button.action) {
                const values = this.getInputValues(config.inputs);
                button.action(values);
            }
            
            if (button.close !== false) {
                this.close();
            }
            });
        });

        setTimeout(() => this.overlay.classList.add('active'), 10);

        if (config.inputs && config.inputs.length > 0) {
            setTimeout(() => {
            const firstInput = this.dialog.querySelector('.dialog-input');
            if (firstInput) firstInput.focus();
            }, 300);
        }
    }

    getInputValues(inputs) {
        if (!inputs) return null;
        
        const values = {};
        inputs.forEach((input, index) => {
            const element = document.getElementById(`dialog-input-${index}`);
            if (element) {
            if (input.type === 'checkbox') {
                values[input.name || `input${index}`] = element.checked;
            } else {
                values[input.name || `input${index}`] = element.value;
            }
            }
        });

        return values;
    }

    close() {
        this.overlay.classList.remove('active');
        setTimeout(() => {
            if (this.dialog) {
            this.dialog.remove();
            this.dialog = null;
            }
        }, 300);
    }

    destroy() {
        if (this.overlay) {
            this.overlay.remove();
        }
    }
}