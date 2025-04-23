// Функция для загрузки Markdown файла в зависимости от выбранного языка
function loadMarkdown(lang) {
    fetch(`${lang}.md`)
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

// Функция для переключения языка
function switchLang(lang) {
    loadMarkdown(lang);
    document.documentElement.lang = lang;  // Меняем атрибут lang в теге <html>
}

// Автозагрузка контента при загрузке страницы в зависимости от URL
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'ru';  // По умолчанию 'ru'
    switchLang(lang);
});