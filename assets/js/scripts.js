document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');
    const content = document.querySelector('.container');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');

            // Добавление класса анимации fade-out
            content.classList.remove('fade-in');
            content.classList.add('fade-out');

            // Загрузка нового контента после анимации
            setTimeout(() => {
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(data => {
                        // Извлечение нужной части контента
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(data, 'text/html');
                        const newContent = doc.querySelector('.container').innerHTML;

                        // Обновление контента
                        content.innerHTML = newContent;

                        // Добавление класса fade-in и удаление fade-out
                        content.classList.remove('fade-out');
                        content.classList.add('fade-in');

                        // Прокрутка к началу
                        window.scrollTo(0, 0);
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке контента:', error);
                    });
            }, 500); // Длительность анимации fade-out
        });
    });
});