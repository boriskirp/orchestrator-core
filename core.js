(function() {
    const saltSenses = {
        "пропозиції": { title: "Пропозиції", description: "<b>АКТИВАЦІЯ:</b> Пропозиція має бути такою, від якої неможливо відмовитися." },
        "клієнта": { title: "Клієнт", description: "<b>АКТИВАЦІЯ:</b> Клієнт — це не гаманець, а партнер у вашому потоці." },
        "стратегію": { title: "Стратегія", description: "<b>АКТИВАЦІЯ:</b> Функціональний план перемоги, зрозумілий кожному." },
        "маркетингу": { title: "Маркетинг", description: "<b>АКТИВАЦІЯ:</b> Система донесення цінності Промислу до людей." },
        "seo-оптимізації": { title: "SEO-оптимізація", description: "<b>АКТИВАЦІЯ:</b> Мова, якою сайт спілкується з алгоритмами пошуку." },
        "рекламним кампаніям": { title: "Рекламні кампанії", description: "<b>АКТИВАЦІЯ:</b> Посилювачі вашого голосу в цифровому просторі." },
        "сайт": { title: "Сайт", description: "<b>АКТИВАЦІЯ:</b> Ваше цифрове представництво, де сенс стає дією." },
        "мобільний трафік": { title: "Мобільний трафік", description: "<b>АКТИВАЦІЯ:</b> Свобода доступу до інформації в будь-якому місці." },
        "платіжними системами": { title: "Платіжні системи", description: "<b>АКТИВАЦІЯ:</b> Органи обміну енергією (коштами) у системі." },
        "клієнтом": { title: "Клієнт", description: "<b>АКТИВАЦІЯ:</b> Взаємодія, заснована на довірі та результаті." },
        "email-маркетинг": { title: "Email-маркетинг", description: "<b>АКТИВАЦІЯ:</b> Прямий канал глибокого зв'язку з аудиторією." },
        "контент-маркетинг": { title: "Контент-маркетинг", description: "<b>АКТИВАЦІЯ:</b> Завоювання авторитету через реальну користь." },
        "контент": { title: "Контент", description: "<b>АКТИВАЦІЯ:</b> Тіло інформації, наповнене вашим сенсом." },
        "соціальні мережі": { title: "Соціальні мережі", description: "<b>АКТИВАЦІЯ:</b> Екосистема, де бренди стають живими людьми." },
        "google ads": { title: "Google Ads", description: "<b>АКТИВАЦІЯ:</b> Точне залучення тих, хто вже шукає ваш сенс." },
        "аналітика": { title: "Аналітика", description: "<b>АКТИВАЦІЯ:</b> Очі Оркестратора. Бачення цифр за емоціями." },
        "трафіку": { title: "Трафік", description: "<b>АКТИВАЦІЯ:</b> Жива кров вашої цифрової вирви." },
        "візуал": { title: "Візуал", description: "<b>АКТИВАЦІЯ:</b> Образ, який миттєво синхронізує око з мозком." },
        "брендинг": { title: "Брендинг", description: "<b>АКТИВАЦІЯ:</b> Створення унікального відбитка душі бізнесу." },
        "онбординг": { title: "Онбординг", description: "<b>АКТИВАЦІЯ:</b> М'яке введення людини в потік вашого продукту." },
        "crm-систему": { title: "CRM-система", description: "<b>АКТИВАЦІЯ:</b> Пам'ять бізнесу про кожного клієнта." },
        "метрики": { title: "Метрики", description: "<b>АКТИВАЦІЯ:</b> Показники здоров'я вашого бізнес-потоку." },
        "інтернет-просування оркестратор": { title: "Інтернет-Просування Оркестратор", description: "<b>АКТИВАЦІЯ:</b> Цілісна методологія управління простором." },
        "seo оркестратор": { title: "SEO Оркестратор", description: "<b>АКТИВАЦІЯ:</b> Управління видимістю сенсів у пошуку." },
        "smm оркестратор": { title: "SMM Оркестратор", description: "<b>АКТИВАЦІЯ:</b> Гармонізація спільнот навколо ідеї бренду." },
        "реклама оркестратор": { title: "Реклама Оркестратор", description: "<b>АКТИВАЦІЯ:</b> Контроль потужності рекламного потоку." }
    };

    function autoHighlight() {
        // Шукаємо текст тільки в основних секціях, щоб не пошкодити скрипти
        const sections = document.querySelectorAll('p, li, h1, h2, h3');
        sections.forEach(section => {
            let html = section.innerHTML;
            for (let term in saltSenses) {
                const regex = new RegExp(`\\b(${term})\\b`, 'gi');
                html = html.replace(regex, `<strong class="orchestrator-term" style="color: #0645ad; cursor: pointer; border-bottom: 1px dashed;">$1</strong>`);
            }
            section.innerHTML = html;
        });
    }

    function sync() {
        if (typeof knowledgeBase !== 'undefined') {
            Object.assign(knowledgeBase, saltSenses);
            autoHighlight();
            
            // Додаємо обробник кліку для нових підсвічених слів
            document.querySelectorAll('.orchestrator-term').forEach(el => {
                el.onclick = function(e) {
                    const term = this.innerText.toLowerCase();
                    const rect = this.getBoundingClientRect();
                    if (typeof showOrchestratorPopup === 'function') {
                        showOrchestratorPopup(term, rect);
                    }
                };
            });
            
            console.log("Оркестратор: База синхронізована, слова підсвічені.");
        } else {
            setTimeout(sync, 200);
        }
    }
    sync();
})();
