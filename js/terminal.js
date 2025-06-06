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

// NOTE: The 'type' function has been removed as per your request to have no typing animations.
// If you wanted to add it back for specific commands, it would go here.

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

// --- ADDED: Mobile Viewport Logic ---
function handleViewportResize() {
    // This sets the terminal's actual height to match the visible screen area,
    // effectively docking it above the keyboard.
    terminalEl.style.height = `${window.visualViewport.height}px`;
    scrollToBottom();
}

function initViewportHandler() {
    // Only run this on devices that support the Visual Viewport API (most mobile browsers)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportResize);
    }
}
// --- END ADDED ---

terminalEl.addEventListener('click', focus);

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