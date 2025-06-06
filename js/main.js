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
    startTime: new Date() // ADDED: For neofetch uptime
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
    const welcomeMessage = [
        "Welcome to my interactive terminal portfolio.",
        "Type 'help' for a list of commands to get started.",
        " ",
        "Example: try typing 'help' or 'ls'."
    ];

    const welcomeData = welcomeMessage.map(line => ({ text: line }));
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

// Start the application
init();