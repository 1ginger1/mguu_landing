document.addEventListener('DOMContentLoaded', () => {
    // Шапка и кнопка вверх
    let lastScroll = 0;
    let upScrollAmount = 0;
    let countScroll = 0;
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.up-button__link');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll < 3) {
            if (header.classList.contains('header--visible')) {
                header.classList.remove('header--fixed', 'header--visible');
            }

            countScroll = 0;
        }

        if (currentScroll < 100) {
            if (backToTop.classList.contains('up-button__link--visible')) {
                backToTop.classList.remove('up-button__link--visible')
            }

            countScroll = 0;
        }

        if (upScrollAmount > currentScroll) {
            upScrollAmount = upScrollAmount - currentScroll;
            countScroll += upScrollAmount;

            if (countScroll > 600) {
                header.classList.add('header--fixed', 'header--visible');

                if (backToTop) {
                    backToTop.classList.add('up-button__link--visible');
                }

                countScroll = 0;
            }
        } else {
            upScrollAmount = currentScroll - upScrollAmount;
            countScroll += upScrollAmount;

            if (countScroll > 200) {
                if (backToTop.classList.contains('up-button__link--visible')) {
                    backToTop.classList.remove('up-button__link--visible')
                }

                if (header.classList.contains('header--visible')) {
                    header.classList.remove('header--fixed', 'header--visible');
                }

                countScroll = 0;
            }
        }


        upScrollAmount = currentScroll;
    });

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
        card.addEventListener('click', () => {
            card.classList.toggle('steps__item--flipped');
        });

        const triggers = card.querySelectorAll('.js-flip-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); 
                card.classList.toggle('steps__item--flipped');
            });
        });
    });
});