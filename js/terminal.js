// js/terminal.js

// DOM Elements
const outputEl = document.getElementById('output');
const inputLineEl = document.getElementById('input-line');
const commandInputEl = document.getElementById('command-input');
const scrollWrapper = document.getElementById('scroll-wrapper');
const terminalEl = document.getElementById('terminal');

let promptTemplate = `<span class="prompt-text">{user}@{host}:{path}$</span>`;
let isLocked = false;

function print(lines) {
    // Ensure `lines` is always an array
    if (!Array.isArray(lines)) {
        lines = [typeof lines === 'string' ? { text: lines } : lines];
    }
    
    lines.forEach(line => {
        const lineEl = document.createElement('div');
        lineEl.classList.add('line');

        if (line.html) {
            lineEl.innerHTML = line.html;
        } else {
            const textContent = line.text || '';

            // If the line is empty or just whitespace, use a non-breaking space
            // to ensure the line takes up vertical space.
            if (textContent.trim() === '') {
                lineEl.innerHTML = '&nbsp;';
            } else {
                // Otherwise, handle text and newlines as before
                const textLines = textContent.split('\n');
                textLines.forEach((textLine, index) => {
                    lineEl.appendChild(document.createTextNode(textLine));
                    if (index < textLines.length - 1) {
                        lineEl.appendChild(document.createElement('br'));
                    }
                });
            }
        }
        outputEl.appendChild(lineEl);
    });
    scrollToBottom();
}

function clear() {
    outputEl.innerHTML = '';
}

function showPrompt(state) {
    const promptPath = state.cwd.replace(`/home/${state.user}`, '~');
    const promptContent = promptTemplate
        .replace('{user}', state.user)
        .replace('{host}', state.host) // Use host from state
        .replace('{path}', promptPath);
    
    let promptSpan = inputLineEl.querySelector('.prompt-text');
    if (!promptSpan) {
        promptSpan = document.createElement('span');
        promptSpan.className = 'prompt-text';
        inputLineEl.insertBefore(promptSpan, commandInputEl);
    }
    promptSpan.innerHTML = promptContent;

    outputEl.appendChild(inputLineEl);

    inputLineEl.style.display = 'flex';
    commandInputEl.focus();
    scrollToBottom();
}

function hidePrompt() {
    if (inputLineEl) {
        inputLineEl.style.display = 'none';
    }
}

function scrollToBottom() {
    scrollWrapper.scrollTop = scrollWrapper.scrollHeight;
}

function handleViewportResize() {
    if (window.visualViewport) {
        terminalEl.style.height = `${window.visualViewport.height}px`;
        scrollToBottom();
    }
}

function initViewportHandler() {
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportResize);
        handleViewportResize();
    }
}


terminalEl.addEventListener('click', focus);

function lock() { isLocked = true; }
function unlock() { isLocked = false; }
function locked() { return isLocked; }
function focus() { commandInputEl.focus(); }

export default {
    print,
    clear,
    hidePrompt,
    showPrompt,
    lock,
    unlock,
    locked,
    focus,
    scrollToBottom,
    initViewportHandler // Export the new function
};