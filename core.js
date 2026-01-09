(function() {
    const saltSenses = {
        "пропозиці": { title: "Пропозиція", description: "<b>АКТИВАЦІЯ:</b> Пропозиція має бути такою, від якої неможливо відмовитися." },
        "маркетинг": { title: "Маркетинг", description: "<b>АКТИВАЦІЯ:</b> Система донесення цінності Промислу до людей." },
        "стратегі": { title: "Стратегія", description: "<b>АКТИВАЦІЯ:</b> План перемоги, зрозумілий кожному." },
        "seo": { title: "SEO", description: "<b>АКТИВАЦІЯ:</b> Мова спілкування з алгоритмами пошуку." },
        "реклам": { title: "Реклама", description: "<b>АКТИВАЦІЯ:</b> Посилювачі вашого голосу в цифровому просторі." },
        "сайт": { title: "Сайт", description: "<b>АКТИВАЦІЯ:</b> Ваше цифрове представництво." },
        "клієнт": { title: "Клієнт", description: "<b>АКТИВАЦІЯ:</b> Партнер у вашому потоці." },
        "брендинг": { title: "Брендинг", description: "<b>АКТИВАЦІЯ:</b> Унікальний відбиток душі бізнесу." },
        "google ads": { title: "Google Ads", description: "<b>АКТИВАЦІЯ:</b> Точне залучення тих, хто вже шукає ваш сенс." }
        // Додайте інші корені слів сюди (без закінчень)
    };

    function autoHighlight() {
        const sections = document.querySelectorAll('p, li, h1, h2, h3');
        sections.forEach(section => {
            let html = section.innerHTML;
            
            // Сортуємо терміни від найдовших до найкоротших (щоб "SEO-оптимізація" не перебилася просто "SEO")
            const sortedTerms = Object.keys(saltSenses).sort((a, b) => b.length - a.length);

            sortedTerms.forEach(term => {
                // Регулярний вираз, який шукає корінь слова незалежно від регістру
                const regex = new RegExp(`(${term}[a-zа-яієїґ]*)`, 'gi');
                
                // Перевіряємо, щоб не підсвічувати те, що вже підсвічено
                html = html.replace(regex, (match, p1, offset, string) => {
                    // Якщо слово вже всередині тегу <strong> або <a>, пропускаємо його
                    const prevPart = string.substring(0, offset);
                    if (prevPart.lastIndexOf('<strong') > prevPart.lastIndexOf('</strong>')) return match;
                    
                    return `<strong class="orchestrator-term" style="color: #0645ad; cursor: pointer; border-bottom: 1px dashed;">${match}</strong>`;
                });
            });
            section.innerHTML = html;
        });
    }

    function sync() {
        if (typeof knowledgeBase !== 'undefined') {
            // Перетворюємо корені в повноцінну базу для попапів
            for (let root in saltSenses) {
                knowledgeBase[root] = saltSenses[root];
            }
            
            autoHighlight();
            
            document.querySelectorAll('.orchestrator-term').forEach(el => {
                el.onclick = function(e) {
                    const text = this.innerText.toLowerCase();
                    // Шукаємо, до якого ключа належить це слово
                    const key = Object.keys(saltSenses).find(k => text.includes(k));
                    const rect = this.getBoundingClientRect();
                    if (window.showOrchestratorPopup) {
                        window.showOrchestratorPopup(key, rect);
                    }
                };
            });
        } else {
            setTimeout(sync, 200);
        }
    }
    sync();
})();
