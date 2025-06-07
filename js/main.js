// js/main.js
import term from './terminal.js';
import { executeCommand } from './commands.js';

const commandInputEl = document.getElementById('command-input');


const state = {
    user: 'guest',
    host: 'bieggerm.com',
    cwd: '/home/guest',
    history: [],
    historyIndex: -1,
    startTime: new Date()
};

async function processInput(input) {
    const promptHtml = `<span class="prompt-text">${state.user}@${state.host}:${state.cwd.replace(`/home/${state.user}`, '~')}$</span>`;
    term.print({ html: `${promptHtml} <span class="output-command">${input || ''}</span>` }); // Ensure input is not undefined if empty
    
    if (input) {
        state.history.unshift(input);
        state.historyIndex = -1;
    }

    const suppressPrompt = await executeCommand(input, term, state);
    term.unlock();
    
    // It now CHECKS the value. If suppressPrompt is true, it will NOT show a new prompt.
    if (!suppressPrompt) {
        term.showPrompt(state);
    }
}


function init() {
    term.initViewportHandler();

    const asciiArt = `
  ____   _                              __  __ 
 | __ ) ( )  __    __    __    __      |  \/  |
 |  _ \  |  /__\  /  \  /  \  /__\ |__ | \  / |
 | |_) | | | ___|| () || () || ___||  \| |\/| |
 |____/  | |      \__/  \__/ |     |   | |  | |
        (_) \__/     |     |  \__/     |_|  |_|
                  \__/  \__/           

`;

    const welcomeMessage = [
        { html: `<span class="output-item">${asciiArt}</span>` },
        { text: `Welcome to BieggerMOS v2.4 (Kernel: 5.15.0-bm)` },
        { text: " " },
        { text: `* System time: ${new Date().toLocaleString()}` },
        { text: "* Your access level is: guest"},
        { text: " " },
        { html: `Not a techie? 🤓 For a standard graphical view, <a href="cv.html" target="_blank" class="output-item">click here</a> or type '<span class="output-item">open cv</span>'.` },
        { text: " " },
        { text: "Type 'help' to see a list of available commands." },
        { html: `Hint: Try '<span class="output-command">neofetch</span>' or '<span class="output-command">theme light</span>' to customize your view.` },
        
    ];

    term.print(welcomeMessage);
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

init();