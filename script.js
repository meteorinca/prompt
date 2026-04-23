// Initialize Icons
lucide.createIcons();

const container = document.getElementById('prompt-container');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// 1. Fetch and Display Prompts
async function loadPrompts() {
    try {
        const response = await fetch('prompts.json');
        const prompts = await response.json();
        
        container.innerHTML = prompts.map(item => `
            <div class="prompt-card">
                <div>
                    <h3>${item.title}</h3>
                    <p class="prompt-content">${item.prompt}</p>
                </div>
                <button class="copy-btn" onclick="copyPrompt('${item.prompt.replace(/'/g, "\\'")}')">
                    <i data-lucide="copy" size="18"></i> Copy Prompt
                </button>
            </div>
        `).join('');
        
        lucide.createIcons(); // Re-run for dynamic content
    } catch (err) {
        console.error("Error loading prompts:", err);
    }
}

// 2. Copy Functionality
function copyPrompt(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

// 3. Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Update Icon
    if (newTheme === 'dark') {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
});

// Run on load
loadPrompts();