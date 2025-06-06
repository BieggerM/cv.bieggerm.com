// js/main.js
import term from './terminal.js';
import { executeCommand } from './commands.js';

const commandInputEl = document.getElementById('command-input');

// --- STATE ---
const state = {
    user: 'guest',
    host: 'biegger.io',
    cwd: '/home/guest',
    history: [],
    historyIndex: -1,
    startTime: new Date()
};

// --- CORE LOGIC ---
function processInput(input) {
    const promptHtml = `<span class="prompt-text">${state.user}@${state.host}:${state.cwd.replace(`/home/${state.user}`, '~')}$</span>`;
    term.print({ html: `${promptHtml} <span class="output-command">${input}</span>` });
    
    if (input) {
        state.history.unshift(input);
        state.historyIndex = -1;
    }

    executeCommand(input, term, state);
    term.showPrompt(state);
}

// --- EVENT LISTENERS & INITIALIZATION ---
function init() {
    // Initialize the viewport handler for mobile keyboard support
    term.initViewportHandler();

    const welcomeMessage = [
        { text: "Welcome to my interactive terminal portfolio." },
        { text: "Type 'help' for a list of commands to get started." },
        { text: " " },
        { html: `Not a techie? <a href="cv.html" target="_blank" style="color: #9ece6a; text-decoration: underline;">Click here for my CV</a>.` },
        { text: " " },
        { text: "Example: try typing 'help' or 'about'." }
    ];

    // Ensure all lines are objects, either {text: ...} or {html: ...}
    const welcomeData = welcomeMessage.map(line => (typeof line === 'string' ? { text: line } : line));
    term.print(welcomeData);
    term.showPrompt(state);
}

commandInputEl.addEventListener('keydown', (e) => {
    if (term.locked()) return;

    if (e.key === 'Enter') {
        const input = commandInputEl.value.trim();
        commandInputEl.value = '';
        processInput(input);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            commandInputEl.value = state.history[state.historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.historyIndex > 0) {
            state.historyIndex--;
            commandInputEl.value = state.history[state.historyIndex];
        } else {
            state.historyIndex = -1;
            commandInputEl.value = '';
        }
    }
});

// The old focus listener is no longer needed, as the viewport handler is more effective.

// Start the application
init();