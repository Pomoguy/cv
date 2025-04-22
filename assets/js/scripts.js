document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('resume-content');
    const langLinks = document.querySelectorAll('.language-switcher a');

    // Функция для загрузки и отображения контента
    const loadContent = (url, targetLang) => {
        // 1. Начать анимацию исчезновения
        contentContainer.classList.add('content-fade-out');
        contentContainer.classList.remove('content-fade-in');

        // 2. Подождать завершения анимации исчезновения
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    // 3. Заменить контент
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newContent = doc.getElementById('resume-content').innerHTML;
                    contentContainer.innerHTML = newContent;

                    // 4. Установить язык для страницы (для скринридеров и т.д.)
                    document.documentElement.lang = targetLang;

                    // 5. Обновить активную ссылку
                    updateActiveLink(targetLang);

                    // 6. Начать анимацию появления
                    contentContainer.classList.remove('content-fade-out');
                    contentContainer.classList.add('content-fade-in');

                    // 7. Обновить URL в адресной строке без перезагрузки
                    history.pushState({ lang: targetLang }, '', url);
                })
                .catch(error => {
                    console.error("Ошибка загрузки контента:", error);
                    // Можно показать сообщение об ошибке пользователю
                    contentContainer.innerHTML = '<p>Ошибка загрузки контента. Пожалуйста, попробуйте позже.</p>';
                    // Возвращаем видимость в случае ошибки
                    contentContainer.classList.remove('content-fade-out');
                    contentContainer.classList.add('content-fade-in');
                });
        }, 500); // Должно совпадать с transition-duration в CSS
    };

    // Функция для обновления стиля активной ссылки
    const updateActiveLink = (activeLang) => {
        langLinks.forEach(link => {
            if (link.getAttribute('data-lang') === activeLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Добавить обработчики кликов на ссылки языков
    langLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвратить стандартный переход по ссылке
            const url = link.href;
            const targetLang = link.getAttribute('data-lang');
            // Загружаем контент только если язык не текущий
            if (document.documentElement.lang !== targetLang) {
                loadContent(url, targetLang);
            }
        });
    });

    // Обработка кнопок "Назад"/"Вперед" в браузере
    window.addEventListener('popstate', (event) => {
        // Определяем язык из URL или состояния
        const currentPath = window.location.pathname;
        let targetLang = 'ru'; // По умолчанию
        let url = '/ru/index.html';

        if (currentPath.startsWith('/en/')) {
            targetLang = 'en';
            url = '/en/index.html';
        }
        // Загружаем соответствующий контент без добавления в историю
        loadContent(url, targetLang);
    });

    // Инициализация при загрузке страницы
    const initialLang = document.documentElement.lang || 'ru';
    updateActiveLink(initialLang);
    // Убедимся, что контент видим при первой загрузке
    contentContainer.classList.add('content-fade-in');

});