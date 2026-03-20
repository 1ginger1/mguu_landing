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
});