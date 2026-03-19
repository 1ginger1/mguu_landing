document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.querySelector('.marquee__inner');
    if (marquee) {
        // Клонируем содержимое
        marquee.innerHTML += marquee.innerHTML;
    }
});