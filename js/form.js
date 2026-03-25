document.addEventListener('DOMContentLoaded', () => {
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

    let posBirthdayInput = 0,
        valBirthday = birthdayMask;

    birthdayInput.addEventListener('input', function (e) {
        let v = this.value.replace(/\D/g, '');

        if (v.length > 8) {
            this.value = valBirthday;
            return;
        }

        let lastDigitIndex = v.search(/\d(?=[^\d]*$)/) + 1;

        if (v) {
            if (v.length > 0) {
                if (v.length == 1) {
                    valBirthday = valBirthday.replace("дд", v.substring(0, 2) + 'д');
                } else {
                    valBirthday = valBirthday.replace("д", v.substring(1, 2));
                }
            }
            if (v.length > 2) {
                if (v.length == 3) {
                    valBirthday = valBirthday.replace("мм", v.substring(2, 3) + 'м');
                } else {
                    valBirthday = valBirthday.replace("м", v.substring(3, 4));
                }

                // lastDigitIndex++;
            }
            if (v.length > 4) {
                let yearMask = "гггг",
                    valYear = v.substring(4, v.length);

                valBirthday = valBirthday.replace(valBirthday.substring(6, 10), valYear + yearMask.substring(0, 4 - valYear.length));

                // lastDigitIndex = lastDigitIndex + 2;
            }

            // setTimeout(() => birthdayInput.setSelectionRange(lastDigitIndex, lastDigitIndex), 0);

            // console.log(lastDigitIndex)


            // const cursorPos = birthdayInput.selectionStart;

            // if (this.value[cursorPos] === '.') {
            //     setTimeout(() => birthdayInput.setSelectionRange(cursorPos + 1, cursorPos + 1), 0);
            // }


            // posBirthdayInput = v.length;
            // console.log(posBirthdayInput)
            // setTimeout(() => birthdayInput.setSelectionRange(posBirthdayInput, posBirthdayInput), 0);
            // const cursorPos = birthdayInput.selectionStart;

            // // // Если перед курсором дефис или скобка — прыгаем еще на один символ назад
            // if (this.value[cursorPos] === '.') {
            //     posBirthdayInput = cursorPos + 1;
            //     // Ставим курсор перед спецсимволом
            //     setTimeout(() => birthdayInput.setSelectionRange(posBirthdayInput, posBirthdayInput), 0);
            // }

        }

        this.value = valBirthday;
    });

    birthdayInput.addEventListener('focus', () => {
        if (!birthdayInput.value) {
            birthdayInput.value = birthdayMask;
            setTimeout(() => birthdayInput.setSelectionRange(0, 0), 0);
        }
    });

    birthdayInput.addEventListener('blur', () => {
        if (birthdayInput.value === birthdayMask) {
            birthdayInput.value = "";
        }
    });
});