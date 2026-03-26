document.addEventListener('DOMContentLoaded', () => {
    // Выпадающие списки
    const selectBtn = document.querySelectorAll('.select__header'),
        selectList = document.querySelectorAll('.select__dropdown');

    selectBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (btn.getAttribute("id") && btn.getAttribute("id") == 'direction') {
                let eduLevel = document.querySelector(`input[name="edu_level"]`);
                const container = btn.closest('.select'),
                    derectionVal = container.querySelectorAll('.select__item');

                if (eduLevel.value == 'college') {
                    if (container) {
                        derectionVal.forEach(dVal => {
                            if (dVal.dataset.value != 'master') {
                                dVal.classList.add('select__item-noactive');
                            }
                        });
                    }
                } else {
                    if (container) {
                        derectionVal.forEach(dVal => {
                            if (dVal.classList.contains('select__item-noactive')) {
                                dVal.classList.remove('select__item-noactive');
                            }
                        });
                    }
                }
            }

            if (selectList[i].classList.contains('select__dropdown-active')) {
                selectList[i].classList.remove('select__dropdown-active');
                btn.classList.remove('select__header-active');
            } else {
                selectList[i].classList.add('select__dropdown-active');
                btn.classList.add('select__header-active');
            }
        });
    });

    // Поиск по списку
    const searchInputs = document.querySelectorAll('.select__search');

    searchInputs.forEach(search => {
        search.addEventListener('input', (e) => {
            const filter = e.target.value.toLowerCase();
            const container = search.closest('.select');
            const items = container.querySelectorAll('.select__item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(filter) && !item.classList.contains('select__item-noactive')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Загрузка файлов
    const fileInput = document.querySelector('.file-upload__input'),
        wrapper = document.querySelector('.file-upload'),
        fileTitle = document.querySelector('#file_title'),
        deleteFile = document.querySelector('#delete_file'),
        errorFileSize = document.querySelector('#file_size'),
        errorFileFormat = document.querySelector('#file_format'),
        allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
        maxSizeInMb = 10;

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileName = file.name;
            const fileSize = file.size / 1024 / 1024; // перевод в МБ
            const fileExt = fileName.split('.').pop().toLowerCase();

            // Проверка расширения
            if (!allowedExtensions.includes(fileExt)) {
                if (!errorFileFormat.classList.contains('form__error-show')) {
                    errorFileFormat.classList.add('form__error-show');
                }

                if (!wrapper.classList.contains('file-upload--error')) {
                    wrapper.classList.add('file-upload--error');
                }

                fileInput.value = '';
                return;
            }

            // Проверка веса
            if (fileSize > maxSizeInMb) {
                if (!errorFileSize.classList.contains('form__error-show')) {
                    errorFileSize.classList.add('form__error-show');
                }

                if (!wrapper.classList.contains('file-upload--error')) {
                    wrapper.classList.add('file-upload--error');
                }

                fileInput.value = '';
                return;
            }

            // Если всё ок
            fileTitle.textContent = fileName;
            wrapper.classList.add('file-upload--select');

            if (errorFileFormat.classList.contains('form__error-show')) {
                errorFileFormat.classList.remove('form__error-show');
            }

            if (wrapper.classList.contains('file-upload--error')) {
                wrapper.classList.remove('file-upload--error');
            }

            if (errorFileSize.classList.contains('form__error-show')) {
                errorFileSize.classList.remove('form__error-show');
            }
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
        }
        const pos = phoneInput.value.indexOf("_");
        setTimeout(() => phoneInput.setSelectionRange(pos, pos), 0);
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === DEF_MASK || phoneInput.value === RUS_MASK) {
            phoneInput.value = "";
        }
    });


    // Маска на ввод дня рождения
    const birthdayInput = document.getElementById('birthday'),
        birthdayMask = "дд.мм.гггг";

    birthdayInput.addEventListener('input', function (e) {
        let v = this.value.replace(/\D/g, ''); // Только цифры
        if (v.length > 8) v = v.substring(0, 8);

        // Формируем значение на основе введенных цифр
        let res = "";
        for (let i = 0; i < birthdayMask.length; i++) {
            if (birthdayMask[i] === '.') {
                res += '.';
                continue;
            }

            // Берем цифру из ввода, если она есть, иначе — символ маски
            let digitIndex = (i < 2) ? i : (i < 5 ? i - 1 : i - 2);
            res += v[digitIndex] || birthdayMask[i];
        }

        this.value = res;

        // Установка курсора сразу после последней введенной цифры
        let lastDigit = v.length;
        let cursorOffset = lastDigit + (lastDigit > 2 ? 1 : 0) + (lastDigit > 4 ? 1 : 0);
        this.setSelectionRange(cursorOffset, cursorOffset);
    });

    birthdayInput.addEventListener('focus', () => {
        if (!birthdayInput.value || birthdayInput.value === "") {
            birthdayInput.value = birthdayMask;
            setTimeout(() => birthdayInput.setSelectionRange(0, 0), 0);
            return;
        }

        const digitsOnly = birthdayInput.value.replace(/\D/g, '');
        const count = digitsOnly.length;

        let pos = count;
        if (count > 2) pos += 1;
        if (count > 4) pos += 1;

        setTimeout(() => birthdayInput.setSelectionRange(pos, pos), 0);
    });

    birthdayInput.addEventListener('blur', () => {
        if (birthdayInput.value === birthdayMask) {
            birthdayInput.value = "";
        }
    });

    // Выбор значения из списка
    const selectItems = document.querySelectorAll('.select__item');

    selectItems.forEach(item => {
        item.addEventListener('click', () => {
            const container = item.closest('.select');
            let valueInput = item.dataset.value;

            if (container) {
                const currentTextElement = container.querySelector('.select__current'),
                    selectHeader = container.querySelector('.select__header'),
                    errorMessage = container.querySelector('.form__error');

                if (item.dataset.input && (item.dataset.input == 'edu_name' || item.dataset.input == 'specialis')) {
                    const searchInput = container.querySelector('.select__search');
                    if (searchInput) {
                        searchInput.value = item.textContent;
                    }
                } else {
                    currentTextElement.textContent = item.innerText;
                }

                if (!selectHeader.classList.contains('select__header--choose')) {
                    selectHeader.classList.add('select__header--choose');
                }

                if (selectHeader.classList.contains('form__input-error')) {
                    selectHeader.classList.remove('form__input-error');
                }

                if (errorMessage.classList.contains('form__error-show')) {
                    errorMessage.classList.remove('form__error-show');
                }
            }


            if (item.dataset.input) {
                let inputSelect = document.querySelector(`input[name="${item.dataset.input}"]`);
                inputSelect.value = valueInput;

                console.log(valueInput)
            }
        });
    });

    // Валидация данных по мере заполнения 
    const inputForm = document.querySelectorAll('input');

    inputForm.forEach(input => {
        input.addEventListener('input', () => {

            if (input.name == 'alternative') {
                let alternativeSelect = document.querySelector('.select_alternative');

                if (input.value == 'yes') {
                    if (!alternativeSelect.classList.contains('is-active')) {
                        alternativeSelect.classList.add('is-active');
                    }
                } else {
                    if (alternativeSelect.classList.contains('is-active')) {
                        alternativeSelect.classList.remove('is-active');
                    }
                }
            }

            validateDataForm(input);
        });
    });

    // Отправка данных 
    const formBtn = document.querySelector('.form__submit');

    formBtn.addEventListener('click', (e) => {
        e.preventDefault();

        inputForm.forEach(input => {
            validateDataForm(input);
        });
    });

    function validateDataForm(input) {
        const container = input.closest('.select') || input.closest('.form__radio-group') || input.closest('.form__field');
        const errorSpan = container?.querySelector('.form__error');

        let targetElement = input;
        if (input.type === 'hidden') {
            targetElement = container.querySelector('.select__header');
        }

        let isValid = false;
        if (input.type === 'radio') {
            const checkedRadio = document.querySelector(`input[name="${input.name}"]:checked`);
            isValid = !!checkedRadio;
        } else if (input.type === 'checkbox') {
            isValid = input.checked;
        } else if (input.type === 'file') {
            isValid = input.files && input.files.length > 0;

            if (!isValid) {
                if (!errorFileFormat.classList.contains('form__error-show')) {
                    errorFileFormat.classList.add('form__error-show');
                }

                if (!wrapper.classList.contains('file-upload--error')) {
                    wrapper.classList.add('file-upload--error');
                }

                if (!errorFileSize.classList.contains('form__error-show')) {
                    errorFileSize.classList.add('form__error-show');
                }
            }
        } else if (input.name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.ru$/i;
            isValid = emailRegex.test(input.value.trim());

            const infoBlock = container.querySelector('.form__info');
            if (!isValid) {
                infoBlock.style.display = 'none';
            } else {
                infoBlock.style.display = 'block';
            }
        } else if (input.name === 'phone') {
            const onlyDigits = input.value.replace(/\D/g, '');
            isValid = onlyDigits.length === 11;
        } else if (input.name === 'source') {
            return;
        } else if (input.name === 'edu_name_search' || input.name === 'specialis_search') {
            if (!document.querySelector(`input[name="${input.name}"]`).value) {
                if (!input.classList.contains('select__search-error')) {
                    input.classList.add('select__search-error');
                }
            } else {
                if (input.classList.contains('select__search-error')) {
                    input.classList.remove('select__search-error');
                }
            }
            return;
        } else if (input.name === 'direction_choice') {
            if (!container.classList.contains('is-active')) {
                isValid = true;
            } else {
                isValid = input.value.trim() !== "";
            }
        } else if (input.name === 'birthday') {
            const onlyDigits = input.value.replace(/\D/g, '');
            isValid = onlyDigits.length === 8;
        } else {
            isValid = input.value.trim() !== "";
        }


        if (!isValid) {
            errorSpan?.classList.add('form__error-show');
            targetElement.classList.add('form__input-error');
        } else {
            errorSpan?.classList.remove('form__error-show');
            targetElement.classList.remove('form__input-error');
        }
    }
});