const promptStrip = document.getElementById("promptStrip");
const promptCount = document.getElementById("promptCount");
const template = document.getElementById("promptCardTemplate");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalCopyBtn = document.getElementById("modalCopyBtn");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

let currentModalPrompt = null;

async function loadPrompts() {
  try {
    const response = await fetch("prompts.json");
    if (!response.ok) {
      throw new Error("Could not load prompts.json");
    }

    const prompts = await response.json();

    if (!Array.isArray(prompts)) {
      throw new Error("prompts.json must contain an array");
    }

    renderPrompts(prompts);
  } catch (error) {
    promptStrip.innerHTML = `
      <div class="loading-card">
        Failed to load prompts.<br />
        <small>${escapeHtml(error.message)}</small>
      </div>
    `;
    promptCount.textContent = "0 prompts";
    console.error(error);
  }
}

function renderPrompts(prompts) {
  promptStrip.innerHTML = "";
  promptCount.textContent = `${prompts.length} prompt${prompts.length === 1 ? "" : "s"}`;

  prompts.forEach((prompt) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".prompt-card");
    const title = node.querySelector(".prompt-title");
    const preview = node.querySelector(".prompt-preview");
    const copyBtn = node.querySelector(".copy-btn");

    const promptTitle = prompt.title || "Untitled Prompt";
    const promptText = prompt.text || "";

    title.textContent = promptTitle;
    preview.textContent = makePreview(promptText);

    card.addEventListener("click", () => {
      openModal(promptTitle, promptText);
    });

    copyBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      await copyText(promptText, copyBtn);
    });

    promptStrip.appendChild(node);
  });
}

function makePreview(text) {
  const clean = text.replace(/\s+\n/g, "\n").trim();

  if (clean.length <= 220) {
    return clean;
  }

  return clean.slice(0, 220).trim() + "...";
}

function openModal(title, text) {
  currentModalPrompt = text;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentModalPrompt = null;
}

async function copyText(text, buttonEl = null) {
  try {
    await navigator.clipboard.writeText(text);
    if (buttonEl) {
      const original = buttonEl.textContent;
      buttonEl.textContent = "Copied";
      setTimeout(() => {
        buttonEl.textContent = original;
      }, 1200);
    } else {
      showToast("Prompt copied");
    }
  } catch (error) {
    console.error("Copy failed:", error);
    showToast("Copy failed");
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1600);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("promptShelfTheme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("promptShelfTheme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(nextTheme);
});

modalBackdrop.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

modalCopyBtn.addEventListener("click", async () => {
  if (currentModalPrompt) {
    await copyText(currentModalPrompt);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

initTheme();
loadPrompts();