class PromptLibrary {
    constructor() {
        this.prompts = [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    async init() {
        await this.loadPrompts();
        this.setupEventListeners();
        this.applyTheme();
        this.renderPrompts();
    }

    async loadPrompts() {
        try {
            const response = await fetch('prompts.json');
            this.prompts = await response.json();
        } catch (error) {
            console.error('Failed to load prompts:', error);
            this.prompts = [];
        }
    }

    setupEventListeners() {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                this.copyPrompt(e.target.dataset.promptId);
            }
        });
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const icon = document.querySelector('#theme-toggle i');
        icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    copyPrompt(promptId) {
        const prompt = this.prompts.find(p => p.id === promptId);
        if (prompt) {
            navigator.clipboard.writeText(prompt.text).then(() => {
                this.showToast('Prompt copied!');
                const btn = document.querySelector(`[data-prompt-id="${promptId}"]`);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        }
    }

    showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `
                <i class="fas fa-check-circle"></i> ${message}
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    renderPrompts() {
        const grid = document.getElementById('prompt-grid');
        
        if (this.prompts.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h2>No prompts found</h2>
                    <p>Add prompts to prompts.json to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.prompts.map(prompt => `
            <div class="prompt-card">
                <h3>${this.escapeHtml(prompt.title)}</h3>
                <div class="prompt-preview">${this.truncateText(prompt.text, 120)}</div>
                <button class="copy-btn" data-prompt-id="${prompt.id}">
                    Copy
                </button>
            </div>
        `).join('');
    }

    truncateText(text, maxLength) {
        const words = text.split(' ');
        if (words.length <= maxLength / 8) return this.escapeHtml(text);
        
        let preview = words.slice(0, Math.floor(maxLength / 8)).join(' ');
        return this.escapeHtml(preview) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PromptLibrary();
});