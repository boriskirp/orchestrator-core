(function() {
    const saltSenses = {
        "пропозиці": { title: "Пропозиція", description: "Пропозиція має бути такою, від якої неможливо відмовитися." },
        "маркетинг": { title: "Маркетинг", description: "Система донесення цінності вашого Промислу." },
        "стратегі": { title: "Стратегія", description: "Функціональний план перемоги, зрозумілий кожному." },
        "seo": { title: "SEO", description: "Мова спілкування з алгоритмами пошуку." },
        "реклам": { title: "Реклама", description: "Посилювачі вашого голосу в цифровому просторі." },
        "сайт": { title: "Сайт", description: "Ваше цифрове представництво." },
        "клієнт": { title: "Клієнт", description: "Партнер у вашому бізнес-потоці." },
        "брендинг": { title: "Брендинг", description: "Унікальний відбиток душі вашого бізнесу." },
        "google ads": { title: "Google Ads", description: "Точне залучення тих, хто вже шукає ваш сенс." }
    };

    function autoHighlight() {
        const sections = document.querySelectorAll('p, li, h1, h2, h3');
        sections.forEach(section => {
            section.innerHTML = section.innerHTML.replace(/\*\*/g, ''); // Видаляємо зірочки
            let html = section.innerHTML;
            const sortedTerms = Object.keys(saltSenses).sort((a, b) => b.length - a.length);

            sortedTerms.forEach(term => {
                const regex = new RegExp(`(${term}[a-zа-яієїґ]*)`, 'gi');
                html = html.replace(regex, (match, p1, offset, string) => {
                    const prevPart = string.substring(0, offset);
                    if (prevPart.lastIndexOf('<strong') > prevPart.lastIndexOf('</strong>')) return match;
                    return `<strong class="orchestrator-term" style="color: #0645ad; cursor: pointer; border-bottom: 1px dashed;">${match}</strong>`;
                });
            });
            section.innerHTML = html;
        });
    }

    function sync() {
        // Чекаємо, поки в index.html з'явиться функція showOrchestratorPopup
        if (typeof window.showOrchestratorPopup === 'function') {
            autoHighlight();
            document.querySelectorAll('.orchestrator-term').forEach(el => {
                el.onclick = function(e) {
                    const text = this.innerText.toLowerCase();
                    const key = Object.keys(saltSenses).find(k => text.includes(k));
                    const data = saltSenses[key];
                    const rect = this.getBoundingClientRect();
                    
                    if (data) {
                        // Передаємо 3 аргументи: Заголовок, Координати, Опис
                        window.showOrchestratorPopup(data.title, rect, data.description);
                    }
                };
            });
        } else {
            setTimeout(sync, 100);
        }
    }
    sync();
})();
