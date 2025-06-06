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
    // This function is now robust and handles strings, single objects, and arrays of objects.
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
            const textLines = textContent.split('\n');
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

async function type(lines, delay = 30) {
    lock();
    for (const line of lines) {
        const lineEl = document.createElement('div');
        lineEl.classList.add('line');
        outputEl.appendChild(lineEl);
        for (const char of line) {
            lineEl.textContent += char;
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    unlock();
}

function clear() {
    outputEl.innerHTML = '';
}

function showPrompt(state) {
    const promptPath = state.cwd.replace(`/home/${state.user}`, '~');
    const prompt = promptTemplate
        .replace('{user}', state.user)
        .replace('{host}', 'biegger.io')
        .replace('{path}', promptPath);
    
    const existingPrompt = inputLineEl.querySelector('.prompt-text');
    if (existingPrompt) {
        inputLineEl.removeChild(existingPrompt);
    }
    
    inputLineEl.insertAdjacentHTML('afterbegin', prompt);
    inputLineEl.style.display = 'flex';
    commandInputEl.focus();
}

function lock() { isLocked = true; }
function unlock() { isLocked = false; }
function locked() { return isLocked; }

function focus() { commandInputEl.focus(); }

function scrollToBottom() {
    scrollWrapper.scrollTop = scrollWrapper.scrollHeight;
}

terminalEl.addEventListener('click', focus);

export default {
    print,
    type,
    clear,
    showPrompt,
    lock,
    unlock,
    locked,
    focus
};