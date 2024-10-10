// content.js

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', modifyApproveText);
} else {
    afterDOMLoaded();
}

// Функция для вставки текста в <textarea>
function insertTextIntoTextarea(text) {
    const textarea = document.querySelector('textarea[name="pull_request_review[body]"]');
    if (textarea) {
        textarea.value = text;  // Вставляем текст в поле
    } else {
        console.error('Textarea not found');
    }
}

// Функция для обработки клика по клонированной радио-кнопке
function handleClonedRadioClick() {
    // Получаем текст из настроек (chrome.storage.sync)
    chrome.storage.sync.get(['comment'], (result) => {
        const comment = result.comment || 'Default saved text';
        // Вставляем текст в <textarea>
        insertTextIntoTextarea(comment);
    });
}

function afterDOMLoaded() {
    // Ищем все элементы с классом "FormControl-radio-wrap"
    const radioWraps = document.querySelectorAll('.FormControl-radio-wrap');

    // Перебираем все div, чтобы найти тот, в котором есть label с текстом "Approve"
    radioWraps.forEach((wrap) => {
        const label = wrap.querySelector('label.FormControl-label[for="pull_request_review[event]_approve"]');

        if (label && label.textContent.includes("Approve")) {
            // Клонируем весь блок
            const clonedWrap = wrap.cloneNode(true);

            // Меняем текст в клонированном блоке
            const clonedLabel = clonedWrap.querySelector('label.FormControl-label[for="pull_request_review[event]_approve"]');
            if (clonedLabel) {
                // Заменяем текст "Approve" на "Approve but unhappy"
                clonedLabel.textContent = clonedLabel.textContent.replace("Approve", "Approve, but unhappy with it");
                // Меняем атрибут "for" у клонированного label
                clonedLabel.setAttribute("for", "pull_request_review[event]_approve_but_unhappy");
            }

            // Проверка наличия span с классом FormControl-caption перед изменением
            const clonedCaption = clonedWrap.querySelector('span.FormControl-caption');
            if (clonedCaption) {
                // Меняем текст на новый
                clonedCaption.textContent = "Submit feedback and approve merging these changes with eye roll or tut...";
            } else {
                console.error('Element with class FormControl-caption not found in clonedWrap');
            }

            // Меняем атрибут "id" у связанного input в клонированном блоке
            const clonedInput = clonedWrap.querySelector('input[type="radio"][id="pull_request_review[event]_approve"]');
            if (clonedInput) {
                clonedInput.setAttribute("id", "pull_request_review[event]_approve_but_unhappy");
                clonedInput.addEventListener('click', handleClonedRadioClick);
            }

            // Вставляем клонированный блок после оригинального
            wrap.parentNode.insertBefore(clonedWrap, wrap.nextSibling);
        }
    });
}