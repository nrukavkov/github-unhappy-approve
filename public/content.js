if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeDOMChanges);
} else {
    observeDOMChanges();
}


function insertTextIntoTextarea(text) {
    const textarea = document.querySelector('textarea[name="pull_request_review[body]"]');
    if (textarea) {
        textarea.value = text;
    } else {
        console.error('Textarea not found');
    }
}

function handleClonedRadioClick() {
    chrome.storage.sync.get(['comment'], (result) => {
        const comment = result.comment || 'Default saved text';
        insertTextIntoTextarea(comment);
    });
}

function unhappyApproveItem() {
    const radioWraps = document.querySelectorAll('.FormControl-radio-wrap');

    if (document.getElementById('pull_request_review_event_approve_but_unhappy')) {
        console.log('Unhappy approve already exists');
        return;
    }

    radioWraps.forEach((wrap) => {
        const label = wrap.querySelector('label.FormControl-label[for="pull_request_review[event]_approve"]');
        if (label && label.textContent.includes("Approve")) {
            const clonedWrap = wrap.cloneNode(true);
            const clonedLabel = clonedWrap.querySelector('label.FormControl-label[for="pull_request_review[event]_approve"]');
            if (clonedLabel) {
                clonedLabel.textContent = clonedLabel.textContent.replace("Approve", "Approve, but unhappy with it");
                clonedLabel.setAttribute("for", "pull_request_review_event_approve_but_unhappy");
            }

            const clonedCaption = clonedWrap.querySelector('span.FormControl-caption');
            if (clonedCaption) {
                clonedCaption.textContent = "Submit feedback and approve merging these changes with eye roll or tut...";
            } else {
                console.error('Element with class FormControl-caption not found in clonedWrap');
            }

            const clonedInput = clonedWrap.querySelector('input[type="radio"][id="pull_request_review[event]_approve"]');
            if (clonedInput) {
                clonedInput.setAttribute("id", "pull_request_review_event_approve_but_unhappy");
                clonedInput.addEventListener('click', handleClonedRadioClick);
            }

            wrap.parentNode.insertBefore(clonedWrap, wrap.nextSibling);
        }
    });
}

function observeDOMChanges() {
    const targetNode = document.body;

    const config = { childList: true, subtree: true };

    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('DOM is changed');
                unhappyApproveItem(); 
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
