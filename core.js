(function() {
    const saltSenses = {
        "пропозиці": { title: "Пропозиція", description: "Пропозиція має бути такою, від якої неможливо відмовитися." },
        "маркетинг": { title: "Маркетинг", description: "Система донесення цінності Промислу до людей." },
        "стратегі": { title: "Стратегія", description: "Функціональний план перемоги, зрозумілий кожному." },
        "seo": { title: "SEO", description: "Мова спілкування з алгоритмами пошуку." },
        "реклам": { title: "Реклама", description: "Посилювачі вашого голосу в цифровому просторі." },
        "сайт": { title: "Сайт", description: "Ваше цифрове представництво." },
        "клієнт": { title: "Клієнт", description: "Партнер у вашому потоці." },
        "брендинг": { title: "Брендинг", description: "Унікальний відбиток душі бізнесу." },
        "google ads": { title: "Google Ads", description: "Точне залучення тих, хто вже шукає ваш сенс." }
    };

    function autoHighlight() {
        const sections = document.querySelectorAll('p, li, h1, h2, h3');
        sections.forEach(section => {
            // Очищення від Markdown-зірочок
            section.innerHTML = section.innerHTML.replace(/\*\*/g, '');

            let html = section.innerHTML;
            const sortedTerms = Object.keys(saltSenses).sort((a, b) => b.length - a.length);

            sortedTerms.forEach(term => {
                // Регулярний вираз для пошуку кореня слова
                const regex = new RegExp(`(${term}[a-zа-яієїґ]*)`, 'gi');
                
                // Уникаємо повторного обгортання
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
        if (typeof window.showOrchestratorPopup === 'function') {
            autoHighlight();
            
            document.querySelectorAll('.orchestrator-term').forEach(el => {
                el.onclick = function(e) {
                    const text = this.innerText.toLowerCase();
                    // Знаходимо ключ у базі за коренем
                    const key = Object.keys(saltSenses).find(k => text.includes(k));
                    const data = saltSenses[key];
                    const rect = this.getBoundingClientRect();
                    
                    if (data && window.showOrchestratorPopup) {
                        // ПЕРЕДАЄМО: Назву, Координати та Опис
                        window.showOrchestratorPopup(data.title, rect, data.description);
                    }
                };
            });
            console.log("Оркестратор активовано успішно!");
        } else {
            // Чекаємо поки index.html завантажить свою функцію
            setTimeout(sync, 100);
        }
    }
    sync();
})();
