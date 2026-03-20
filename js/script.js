document.addEventListener('DOMContentLoaded', () => {

    // Карусель блока "Что такое ДИТ"
    const marquee = document.querySelector('.marquee__inner');
    if (marquee) {
        // Клонируем содержимое
        marquee.innerHTML += marquee.innerHTML;
    }

    // Блок "Часто задаваемые вопросы"
    const faqItem = document.querySelectorAll('.faq__item'),
        btnFaqItem = document.querySelectorAll('.js-faq-trigger');

    btnFaqItem.forEach((item, key) => {
        item.addEventListener('click', () => {
            let questionWrap = faqItem[key];

            if (questionWrap) {
                if (questionWrap.classList.contains('active')) {
                    questionWrap.classList.remove('active');
                } else {
                    questionWrap.classList.add('active');
                }
            }
        });
    });

    // Блок Как попасть на стажировку
    const cards = document.querySelectorAll('.steps__item');

    cards.forEach(card => {
        const triggers = card.querySelectorAll('.js-flip-trigger');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); // Чтобы клик не срабатывал на родителе
                card.classList.toggle('steps__item--flipped');
            });
        });
    });

});