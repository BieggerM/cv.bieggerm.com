// js/terminal.js

// DOM Elements
const outputEl = document.getElementById('output');
const inputLineEl = document.getElementById('input-line');
const commandInputEl = document.getElementById('command-input');
const scrollWrapper = document.getElementById('scroll-wrapper');
const terminalEl = document.getElementById('terminal');

let promptTemplate = `<span class="prompt-text">{user}@{host}:{path}$</span>`;
let isLocked = false;

function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function print(lines) {
    if (!Array.isArray(lines)) {
        lines = [typeof lines === 'string' ? { text: lines } : lines];
    }
    
    lines.forEach(line => {
        const lineEl = document.createElement('div');
        lineEl.classList.add('line');

        if (line.html) {
            lineEl.innerHTML = line.html;
        } else {
            const rawTextContent = line.text || '';
            const strippedTextContent = stripHtml(rawTextContent); // Strip HTML tags
            const textLines = strippedTextContent.split('\n');
            textLines.forEach((textLine, index) => {
                lineEl.appendChild(document.createTextNode(textLine));
                if (index < textLines.length - 1) {
                    lineEl.appendChild(document.createElement('br'));
                }
            });
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
    showPrompt,
    lock,
    unlock,
    locked,
    focus,
    scrollToBottom,
    initViewportHandler // Export the new function
};