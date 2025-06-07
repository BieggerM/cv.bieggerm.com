// js/main.js
import term from './terminal.js';
import { executeCommand } from './commands/index.js';

const commandInputEl = document.getElementById('command-input');
const outputEl = document.getElementById('output');

const state = {
    user: 'guest',
    host: 'bieggerm.com',
    cwd: '/home/guest',
    history: [],
    historyIndex: -1,
    startTime: new Date()
};

// Messages for the initial page load sequence (inspired by the original CV greeter)
const pageLoadBootMessages = [
    "GNU/Linux 5.15.0-107-generic x86_64",
    "Setting hostname: bieggerm.com...",
    "Checking file systems... [OK]",
    "Activating swap space... [OK]",
    "Mounting local filesystems... [OK]",
    "Starting kernel services... [OK]",
    "Setting up networking interfaces (eth0)... [OK]",
    "Initializing cloud connectivity modules... [OK]",
    "Starting system automation services (cron, systemd)... [OK]",
    "Loading Marius Biegger user profile (/home/guest)... [OK]",
    "Initializing interactive terminal environment...",
    "bash -c 'source /etc/profile && startx -- :0 vt1'" // Simulates shell start
];

async function runInitialPageLoadSequence(termInstance, messages, lineDelay = 70, finalMessageDelay = 600) {
    termInstance.lock();
    for (let i = 0; i < messages.length; i++) {
        termInstance.print(messages[i]);
        await new Promise(resolve => setTimeout(resolve, (i === messages.length - 1) ? finalMessageDelay : lineDelay));
    }
    termInstance.unlock();
}

async function processInput(input) {
    term.hidePrompt(); // Hide the current input line before processing

    const promptHtml = `<span class="prompt-text">${state.user}@${state.host}:${state.cwd.replace(`/home/${state.user}`, '~')}$</span>`;
    term.print({ html: `${promptHtml} <span class="output-command">${input || ''}</span>` }); // Ensure input is not undefined if empty
    
    if (input) {
        state.history.unshift(input);
        state.historyIndex = -1;
    }

    const suppressPrompt = await executeCommand(input, term, state);
    term.unlock();
    
    if (!suppressPrompt) {
        term.showPrompt(state);
    }
}


async function init() {
    term.initViewportHandler();
    term.hidePrompt(); // Hide prompt at the very beginning

    // Run the initial "boot" sequence
    await runInitialPageLoadSequence(term, pageLoadBootMessages);

    term.clear(); // Clear the screen after the boot sequence

    const asciiArt = `
 ____  _                            __  __ 
| __ )(_) ___  __ _  __ _  ___ _ __|  \\\/  |
|  _ \\| |/ _ \\/ _\` |/ _\` |/ _ \\ '__| |\\\/| |
| |_) | |  __/ (_| | (_| |  __/ |  | |  | |
|____/|_|\\___|\\__, |\\__, |\\___|_|  |_|  |_|
              |___/ |___/                 
              
`;

    const welcomeMessage = [
        { html: `<span class="output-item">${asciiArt}</span>` },
        { text: `Welcome to BieggerMOS v2.4 (Kernel: 5.15.0-bm)` },
        { text: " " },
        { text: `* System time: ${new Date().toLocaleString()}` },
        { text: "* Your access level is: guest"},
        { text: " " },
        { html: `Not a techie? 🤓 For a standard graphical view, <a href="#" data-command="open cv" class="output-item command-link">click here</a> or type '<span class="output-command">open cv</span>'.` },
        { text: " " },
        { text: "Type 'help' to see a list of available commands." },
        { html: `Hint: Try '<span class="output-command">neofetch</span>' or '<span class="output-command">theme light</span>' to customize your view.` }
        
    ];

    term.print(welcomeMessage);
    term.showPrompt(state); // Finally, show the interactive prompt
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

// Event listener for command links within the output
outputEl.addEventListener('click', (e) => {
    const targetLink = e.target.closest('.command-link');
    if (targetLink) {
        e.preventDefault();
        const command = targetLink.dataset.command;
        if (command && !term.locked()) {
            commandInputEl.value = ''; 
            processInput(command);
        }
    }
});

init();