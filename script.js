const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const systemLight = window.matchMedia("(prefers-color-scheme: light)");

function applyTheme(theme) {
    root.dataset.theme = theme;
    const next = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
}

function savedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (e) {
        return null;
    }
}

applyTheme(root.dataset.theme || "dark");

themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
        localStorage.setItem("theme", next);
    } catch (e) {
    }
});

systemLight.addEventListener("change", (event) => {
    if (!savedTheme()) {
        applyTheme(event.matches ? "light" : "dark");
    }
});

const copyButton = document.getElementById("copy-email");
const emailAddress = document.getElementById("email-addr");

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(emailAddress.textContent.trim());
        copyButton.textContent = "Copied!";
    } catch (e) {
        copyButton.textContent = "Failed";
    }
    setTimeout(() => {
        copyButton.textContent = "Copy";
    }, 1500);
});
