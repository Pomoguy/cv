function setLanguage(lang) {
    const ru = document.getElementById('ru');
    const en = document.getElementById('en');

    if (lang === 'ru') {
        if (en.style.display === 'block') {
            en.classList.remove('fade-in');
            en.classList.add('fade-out');
            setTimeout(() => {
                en.style.display = 'none';
                ru.style.display = 'block';
                ru.classList.remove('fade-out');
                ru.classList.add('fade-in');
            }, 500);
        }
    } else if (lang === 'en') {
        if (ru.style.display === 'block') {
            ru.classList.remove('fade-in');
            ru.classList.add('fade-out');
            setTimeout(() => {
                ru.style.display = 'none';
                en.style.display = 'block';
                en.classList.remove('fade-out');
                en.classList.add('fade-in');
            }, 500);
        }
    }
}