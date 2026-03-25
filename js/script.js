document.addEventListener('DOMContentLoaded', () => {
    // Шапка и кнопка вверх
    let lastScroll = 0;
    let upScrollAmount = 0;
    let countScroll = 0;
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.up-button__link');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll < 1) {
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
    }

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

    //Модально окно 
    const modal = document.querySelector('.modal'),
        modalOptions = document.querySelector('.modal__options'),
        modalIcon = document.querySelector('.modal__img'),
        closeBtns = document.querySelectorAll('.js-modal-close'),
        modalData = {
            "test": {
                "icon": "img/modal-icon-test.png",
                "content":
                    `
                    <h2 class="modal__title title">Тестирование</h2>
                    <p class= "modal__subtitle descr" >Выбирай направление, в котором хочешь развиваться.</p>
                    <div class="modal__tags">
                        <button class="tag modal__tag" data-modal-tag="test-1">Ручное тестирование</button>
                        <button class="tag modal__tag" data-modal-tag="test-2">Автотестирование</button>
                    </div>
                `
            },
            'business': {
                "icon": "img/modal-icon-business.png",
                "content":
                    `
                    <h2 class="modal__title title">Бизнес- и системный анализ</h2>
                    <p class= "modal__subtitle descr" >Выбирай направление, в котором хочешь развиваться.</p>
                    <div class="modal__tags">
                        <button class="tag modal__tag" data-modal-tag="business-1">Бизнес-анализ</button>
                        <button class="tag modal__tag" data-modal-tag="business-2">Системный анализ</button>
                    </div>
                `
            },
            'data': {
                "icon": 'img/modal-icon-data.png',
                "content":
                    `
                        <h2 class="modal__title title">Аналитика данных</h2>
                        <p class="modal__subtitle">Аналитик данных работает с большими объемами информации: собирает,
                            обрабатывает, анализирует и интерпретирует их. На основе его выводов принимаются важные решения,
                            например, о разработке новых проектов, внедрении инноваций, оптимизации бизнес-процессов и повышении
                            эффективности работы.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                            <ul class="modal__list">
                                <li class="modal__list-item">Работа с каталогом данных по описанию и разметке информационных
                                    активов</li>
                                <li class="modal__list-item">Поиск и разбор основных причин проблем в данных</li>
                                <li class="modal__list-item">Формализация, постановка и декомпозиция требований на разработку
                                </li>
                                <li class="modal__list-item">Разработка отчетов ad hoc</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Excel, SQL, плюсом будет знание
                                BI-инструмента,
                                Python, Git
                            </p>
                        </div>
                    `
            },
            'develop': {
                "icon": "img/modal-icon-develop.png",
                "content":
                    `
                    <h2 class="modal__title title">Бизнес- и системный анализ</h2>
                    <p class= "modal__subtitle descr" >Выбирай направление, в котором хочешь развиваться.</p>
                    <div class="modal__tags">
                        <button class="tag modal__tag" data-modal-tag="develop-1">Си</button>
                        <button class="tag modal__tag" data-modal-tag="develop-2">Frontend</button>
                        <button class="tag modal__tag" data-modal-tag="develop-3">BI</button>
                        <button class="tag modal__tag" data-modal-tag="develop-4">Fullstack</button>
                    </div>
                `
            },
            'project': {
                "icon": 'img/modal-icon-project.png',
                "content":
                    `
                        <h2 class="modal__title title">Аналитика данных</h2>
                        <p class="modal__subtitle">Администратор проектов отвечает за организационные вопросы и координирует работу проекта, контролирует сроки и занимается документальным сопровождением. Поменять на это описание.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Координация проекта по модернизации или сопровождению сервисов и услуг: согласование объема работ, бюджета, плана-графика и ресурсов, ролей, рисков и ответственностей участников проекта</li>
                                <li class="modal__list-item">Сбор и анализ требований на развитие услуг и сервисов, управление ожиданиями функционального заказчика</li>
                                <li class="modal__list-item">Составление планов‑графиков выполнения предпроектных и проектных работ</li>
                                <li class="modal__list-item">Постановка конкретных задач проектной команде и контроль качества их выполнения, определение и согласование сроков</li>
                                <li class="modal__list-item">Сопровождение и сдача проектной документации</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> плюсом будет опыт работы в Jira, Confluence, Gitlab
                            </p>
                        </div>
                    `
            },
            'admin': {
                "icon": 'img/modal-icon-admin.png',
                "content":
                    `
                        <h2 class="modal__title title">Системное администрирование</h2>
                        <p class="modal__subtitle">Системный администратор отвечает за все, что связано с сетевой инфраструктурой компании. Он следит за информационной безопасностью и бесперебойной работой сайтов, приложений, локальной сети и ПО.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Работа с системами мониторинга и оповещения, первичная диагностика обращений и инцидентов</li>
                                <li class="modal__list-item">Администрирование серверов и разработка технической документации</li>
                                <li class="modal__list-item">Анализ и прогнозирование сбоев</li>
                                <li class="modal__list-item">Администрирование платформенных решений и чат-ботов</li>
                                <li class="modal__list-item">Предоставление прав доступа пользователям</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> плюсом будет знание распространенных операционных систем и сетей, понимание комплексной диагностики и поиска проблем в функционировании ИТ-систем, знание основ работы с HTML/CSS
                            </p>
                        </div>
                    `
            },
            'support': {
                "icon": 'img/modal-icon-support.png',
                "content":
                    `
                        <h2 class="modal__title title">Техническая поддержка</h2>
                        <p class="modal__subtitle">Специалист техподдержки диагностирует неполадки и устраняет их, а также помогает сотрудникам решить проблемы с компьютерами, ПО и сетевой инфраструктурой.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Поддержка пользователей</li>
                                <li class="modal__list-item">Регистрация обращений и консультирование пользователей</li>
                                <li class="modal__list-item">Классификация и маршрутизация обращений на другие линии поддержки</li>
                                <li class="modal__list-item">Отслеживание хода решения инцидентов и актуализация статуса инцидента</li>
                                <li class="modal__list-item">Проведение диагностики, выявление и устранение неисправностей ИТ-систем, оборудования, прикладного ПО</li>
                                <li class="modal__list-item">Тестирование нового функционала перед релизом</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> плюсом будет понимание в области Linux, Windows
                            </p>

                            <p class="modal__skills">На направление «Техническая поддержка» мы готовы рассматривать студентов 3–4 курсов и выпускников колледжей и техникумов</p>
                        </div>
                    `
            },
            'safety': {
                "icon": 'img/modal-icon-safety.png',
                "content":
                    `
                        <h2 class="modal__title title">Информационная безопасность</h2>
                        <p class="modal__subtitle">Специалист по информационной безопасности выстраивает и поддерживает защиту ИТ-инфраструктуры компании от киберпреступников. Умеет анализировать информацию, оценивать риски и разбираться в вариантах защиты.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Техническая поддержка оборудования ИБ</li>
                                <li class="modal__list-item">Участие в анализе событий информационной безопасности веб-приложений</li>
                                <li class="modal__list-item">Мониторинг системы защиты</li>
                                <li class="modal__list-item">Изучение статистики работы сервисов, составление отчетов, инструкций</li>
                                <li class="modal__list-item">Обработка заявок на подключение к сервисам информационной безопасности</li>
                                <li class="modal__list-item">Тестирование систем информационной безопасности</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> плюсом будет образование в области защиты информации, информационной безопасности или цифрового права
                            </p>
                        </div>
                    `
            },
            'ml': {
                "icon": 'img/modal-icon-ml.png',
                "content":
                    `
                        <h2 class="modal__title title">Машинное обучение (ML)</h2>
                        <p class="modal__subtitle">ML-инженер занимается анализом данных, разработкой алгоритмов и созданием интеллектуальных систем.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Разработка и обучение ML-моделей</li>
                                <li class="modal__list-item">Разметка датасетов для машинного обучения</li>
                                <li class="modal__list-item">Работа с пайплайнами</li>
                                <li class="modal__list-item">Тестирование ИИ моделей</li>
                                <li class="modal__list-item">Интеграция и масштабирование: построение устойчивых сервисов, работа с API и инфраструктурой</li>
                                <li class="modal__list-item">Анализ существующих решений</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Python (Jupyter Notebook, NumPy, Pandas, PyTorch/TensorFlow), SQL, fine-tuning LLM, основы машинного обучения
                            </p>
                             <p class="modal__skills">
                                <span class="descr--green">Дополнительно:</span> Git, Airflow, Mlflow, Pyspark, понимание принципов масштабирования ML-сервисов 🚀
                            </p>
                        </div>
                    `
            },
            'design': {
                "icon": "img/modal-icon-design.png",
                "content":
                    `
                    <h2 class="modal__title title">Дизайн</h2>
                    <p class= "modal__subtitle descr" >Выбирай направление, в котором хочешь развиваться.</p>
                    <div class="modal__tags">
                        <button class="tag modal__tag" data-modal-tag="design-2">Графический дизайн</button>
                        <button class="tag modal__tag" data-modal-tag="design-1">UX/UI-дизайн</button>
                    </div>
                `
            },
            'test-1': {
                "icon": 'img/modal-icon-test.png',
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Ручное тестирование</h2>
                        <p class="modal__subtitle">Специалист по тестированию проверяет ПО на соответствие требованиям, помогает в отладке, повышает качество продукта и удобство пользования</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Разработка и проведение ручных тестов.</li>
                                <li class="modal__list-item">Разработка тест-кейсов и поддержание их в актуальном состоянии.</li>
                                <li class="modal__list-item">Организация мероприятий по обеспечению качества: планирование стратегии тестирования, контрольные примеры, обзор и т. д.</li>
                                <li class="modal__list-item">Проведение code review и многое другое.</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> SQL, API, REST, Postman.
                            </p>
                        </div>
                    `
            },
            'test-2': {
                "icon": 'img/modal-icon-test.png',
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Автотестирование</h2>
                        <p class="modal__subtitle">Специалист по тестированию проверяет ПО на соответствие требованиям, помогает в отладке, повышает качество продукта и удобство пользования.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Разработка, проведение и анализ результатов автоматизированных, регрессионных и нагрузочных тестов.</li>
                                <li class="modal__list-item">Совершенствование инструментария автоматизированного тестирования.</li>
                                <li class="modal__list-item">Участие в разработке пайпланов для QA.</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Java (Selenium, Selenide), SQL, API, REST, Git.
                            </p>
                        </div>
                    `
            },
            'business-1': {
                "icon": "img/modal-icon-business.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Бизнес и системный анализ</h2>
                        <p class="modal__subtitle">Бизнес-аналитик выясняет реальные потребности заказчика и на базе этих знаний принимает решения по изменению ИТ-системы и отдельных процессов.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Анализ, описание и моделирование бизнес-процессов, а также формирование предложений по их оптимизации.</li>
                                <li class="modal__list-item">Сбор и структурирование требований со стороны заказчика на изменение процесса или продукта.</li>
                                <li class="modal__list-item">Разработка и обновление проектной и технической документации (например, технических заданий).</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> SQL, UML, BPMN, Jira, Confluence, Excel, PowerPoint, DrawIO, БД.  
                            </p>
                        </div>
                    `
            },
            'business-2': {
                "icon": "img/modal-icon-business.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Системный анализ</h2>
                        <p class="modal__subtitle">Системный аналитик — это переводчик технических заданий на привычный язык ИТ-специалистов.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Сбор и анализ требований к новому функционалу, их актуализация и отрисовка UML.</li>
                                <li class="modal__list-item">Подготовка технической документации и пользовательских сценариев.</li>
                                <li class="modal__list-item">Проверка соответствия реализованного функционала требованиям.</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> SSQL, UML, BPMN, REST, SOAP, XML, JSON, API, БД. 
                            </p>
                        </div>
                    `
            },
            'develop-1': {
                "icon": "img/modal-icon-develop.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Си</h2>
                        <p class="modal__subtitle">Разработчик С (Си) — это программист, который отвечает за создание ПО, высокопроизводительных приложений, используя в своей работе язык программирования C.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Реализацией приложений с использованием С++</li>
                                <li class="modal__list-item">Разработка UI-приложений при помощи Qt</li>
                                <li class="modal__list-item">Применение различных систем сборок и компиляторов (make, cmake, gcc и др.)</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Linux, C++, Qt
                            </p>
                        </div>
                    `
            },
            'develop-2': {
                "icon": "img/modal-icon-develop.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Frontend</h2>
                        <p class="modal__subtitle">Frontend-разработчик отвечает за создание интерфейса сайта, приложения или ПО.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Реализация и развитие клиентской логики</li>
                                <li class="modal__list-item">Разработка интерактивных аналитических панелей с графическим интерфейсом</li>
                                <li class="modal__list-item">Поддержание работоспособности разработанных дашбордов</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> React, HTML, CSS, SQL, Git, JS
                            </p>
                        </div>
                    `
            },
            'develop-3': {
                "icon": "img/modal-icon-develop.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">BI</h2>
                        <p class="modal__subtitle">BI-разрабочик занимается созданием инструментов для анализа данных и помогает оптимизировать бизнес-процессы. Поменять на это</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Разработка бизнес-логики приложений</li>
                                <li class="modal__list-item">Разработка телеграм-ботов (для выдачи статистических данных)</li>
                                <li class="modal__list-item">Разработка скриптов, автоматизирующих процессы сбора данных из социальных сетей и мессенджеров</li>
                                <li class="modal__list-item">Разработка и отладка ETL-процессов по поступающим данным из внешних источников</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Python, Django, SQL, PostgreSQL, Git, Знание API
                            </p>
                        </div>
                    `
            },
            'develop-4': {
                "icon": "img/modal-icon-develop.png",
                "content":
                    `
                    <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Fullstack</h2>
                        <p class="modal__subtitle">Fullstack-разработчик — универсальный специалист, который использует «полный стек» инструментов для создания веб-приложений.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Участие в разработке MVP</li>
                                <li class="modal__list-item">Подготовка демонстрационной версии для презентации заказчику</li>
                                <li class="modal__list-item">Исследование и документирование технических решений</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Python, Django, SQL, PostgreSQL, Git, Знание API
                            </p>
                        </div>
                    `
            },
            'design-1': {
                "icon": "img/modal-icon-design.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">UX/UI-дизайн</h2>
                        <p class="modal__subtitle">UX/UI-дизайнер отвечает за то, чтобы взаимодействие пользователя с интерфейсом было понятным, удобным и логичным.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Проектирование и тестирование интерфейсов приложений.</li>
                                <li class="modal__list-item">Доработка существующих интерфейсов и логики их работы.</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Figma, HTML, CSS.
                            </p>
                        </div>
                    `
            },
            'design-2': {
                "icon": "img/modal-icon-design.png",
                "content":
                    `
                        <button class="modal__back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12L5 12M5 12L11 18M5 12L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <h2 class="modal__title title">Графический дизайн</h2>
                        <p class="modal__subtitle">Графический дизайнер — это художник в мире цифры и печати, он создает визуальный контент для решения задач связанных с маркетингом и коммуникациями.</p>

                        <div class="modal__section">
                            <div class="descr--green">Примеры задач:</div>
                           <ul class="modal__list">
                                <li class="modal__list-item">Подготовка коммуникационных материалов в рамках заданного стиля (ресайзы, адаптация под форматы носителей).</li>
                                <li class="modal__list-item">Поддержка внутренних запросов: верстка презентаций, инструкций.</li>
                                <li class="modal__list-item">Подбор фотографий, отрисовка и доработка иконок, работа с графикой.</li>
                            </ul>

                            <p class="modal__skills">
                                <span class="descr--green">Навыки:</span> Figma, Adobe (Photoshop, Illustrator), After Effects.
                            </p>
                        </div>
                    `
            },
        };

    let mainModalVal = '';

    document.addEventListener('click', (event) => {
        if (event.target.closest('.tag')) {
            event.preventDefault();

            const modalTagBtn = event.target.closest('.tag'),
                modalTag = modalTagBtn.dataset.modalTag;

            if (modalData[modalTag]) {
                modalOptions.innerHTML = modalData[modalTag]['content'];
                modalIcon.setAttribute('src', modalData[modalTag]['icon']);
            }

            if (!modal.classList.contains('modal--active')) {
                mainModalVal = modalTag;

                modal.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
            }
        } else if (event.target.closest('.modal__back')) {
            if (modalData[mainModalVal]) {
                modalOptions.innerHTML = modalData[mainModalVal]['content'];
                modalIcon.setAttribute('src', modalData[mainModalVal]['icon']);
            }
        }
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        });
    });

    // Выпадающие списки
    const selectBtn = document.querySelectorAll('.select__header'),
        selectList = document.querySelectorAll('.select__dropdown');

    selectBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (selectList[i].classList.contains('select__dropdown-active')) {
                selectList[i].classList.remove('select__dropdown-active');
                btn.classList.remove('select__header-active');
            } else {
                selectList[i].classList.add('select__dropdown-active');
                btn.classList.add('select__header-active');
            }
        });
    });

    // Загрузка файлов
    const fileInput = document.querySelector('.file-upload__input'),
        wrapper = document.querySelector('.file-upload'),
        fileTitle = document.querySelector('#file_title'),
        deleteFile = document.querySelector('#delete_file');

    fileInput.addEventListener('change', (event) => {
        console.log(event.target.files.length)
        if (event.target.files.length > 0) {
            fileTitle.textContent = event.target.files[0].name;
            wrapper.classList.add('file-upload--select');
        }
    });

    let fileDel = true;

    wrapper.addEventListener('click', (e) => {
        if (wrapper.classList.contains('file-upload--select')) {
            e.preventDefault();
            return false;
        } else if (!fileDel) {
            e.preventDefault();
            fileDel = true;

            return false;
        }
    });

    deleteFile.addEventListener('click', (e) => {
        fileInput.value = '';
        wrapper.classList.remove('file-upload--select');

        fileDel = false;
    });

    // Маска на поле ввода номера телефона
    const phoneInput = document.getElementById('phone'),
        RUS_MASK = "+7(___)___-__-__",
        DEF_MASK = "_(___)___-__-__";

    const applyMask = (val) => {
        let digits = val.replace(/\D/g, ""),
            currentMask = DEF_MASK; // По умолчанию свободная

        if (digits.length > 0) {
            const first = digits[0];

            // Если это РФ (7, 8 или 9)
            if (first === '7' || first === '8' || first === '9') {
                currentMask = RUS_MASK;
                if (first === '7' || first === '8') {
                    digits = digits.substring(1); // Убираем 7/8, т.к. +7 уже в маске
                }
            }
        }

        let result = "",
            digitIndex = 0;

        for (let i = 0; i < currentMask.length; i++) {
            if (currentMask[i] === "_") {
                if (digitIndex < digits.length) {
                    result += digits[digitIndex];
                    digitIndex++;
                } else {
                    result += "_";
                }
            } else {
                result += currentMask[i];
            }
        }
        return { result, currentMask };
    };

    phoneInput.addEventListener('input', (e) => {
        const { result, currentMask } = applyMask(phoneInput.value);

        phoneInput.value = result;

        const pos = phoneInput.value.indexOf("_");
        if (pos !== -1) phoneInput.setSelectionRange(pos, pos);
        const value = phoneInput.value,
            cursorPos = phoneInput.selectionStart;

        // Если перед курсором дефис или скобка — прыгаем еще на один символ назад
        if (value[cursorPos - 1] === '-' || value[cursorPos - 1] === ')' || value[cursorPos - 1] === '(') {
            // Ставим курсор перед спецсимволом
            phoneInput.setSelectionRange(cursorPos - 1, cursorPos - 1);
        }
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) {
            phoneInput.value = DEF_MASK;
            setTimeout(() => phoneInput.setSelectionRange(0, 0), 0);
        }
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === DEF_MASK || phoneInput.value === RUS_MASK) {
            phoneInput.value = "";
        }
    });


    // Маска на ввод дня рождения
    const birthdayInput = document.getElementById('birthday'),
        birthdayMask = "дд.мм.гггг";

    birthdayInput.addEventListener('focus', () => {
        if (!birthdayInput.value) {
            birthdayInput.value = birthdayMask;
            setTimeout(() => phoneInput.setSelectionRange(0, 0), 0);
        }
    });

    birthdayInput.addEventListener('blur', () => {
        if (birthdayInput.value === birthdayMask) {
            birthdayInput.value = "";
        }
    });
});