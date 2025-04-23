function loadMarkdown(lang) {
    fetch(`${lang}/index.md`)
        .then(res => {
            if (!res.ok) throw new Error("Файл не найден");
            return res.text();
        })
        .then(md => {
            document.getElementById("markdown-content").innerHTML = marked.parse(md);
        })
        .catch(() => {
            document.getElementById("markdown-content").innerText = "Ошибка загрузки контента.";
        });
}

function switchLang(lang) {
    loadMarkdown(lang);
    document.documentElement.lang = lang;
}

// Загрузка по умолчанию
window.addEventListener("DOMContentLoaded", () => {
    const defaultLang = navigator.language.startsWith("ru") ? "ru" : "en";
    switchLang(defaultLang);
});