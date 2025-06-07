// js/commands/handlers/informational.js
import { cvData } from '../../data/cvContent.js';
import { profileImagePaths, profileCompliments } from '../../data/profileContent.js';
import { stripHtml } from '../../utils/domUtils.js';
import { getUptime } from '../../utils/formatUtils.js';

function handleHelp(args, term, state) {
    term.print([
        { html: "This website is an interactive portfolio designed to simulate a Unix-like terminal," },
        { html: "use the commands below to get started." },
        { text: " " },
        { html: '<span class="output-title">Direct Commands:</span>' },
        { html: "  about      Display a description of this website" },
        { html: "  cv         Display my curriculum vitae" },
        { html: "  social     Show social media links" },
        { html: "  profile    Display a random picture of me - discretion is adviced" },
        { html: "  keys       Fetch and display public keys from keys.bieggerm.com" },
        { html: "  contact    Show contact information" },
        { html: "  neofetch   Display system info" },
        { text: " " },
        { html: '<span class="output-title">Terminal Operations:</span>' },
        { html: "  theme      Change color theme (e.g., theme light)" },
        { html: "  history    Show command history" },
        { html: "  clear      Clear the terminal screen" },
        { html: "  open       Open a link (e.g., open cv, open github)" },
        { html: "  sourcecode Open the GitHub repository for this site" },
        { html: "  exit       Close the terminal" },
        { text: " " },
        { html: '<span class="output-title">File System Commands:</span>' },
        { html: "  ls [-a]    List directory contents" },
        { html: "  cd         Change directory (supports ., .., ~)" },
        { html: "  cat        Display file content" },
        { html: "  pwd        Print working directory" },
    ]);
    return false;
}

function handleAbout(args, term, state) {
    term.print(`This website is an interactive portfolio designed to simulate a Unix-like terminal.
This has been implemented in an evening that should've been spent studying. 

Key Features:
  - A virtual file system you can navigate with 'ls', 'cd', and 'cat'.
  - A command history accessible with the up/down arrow keys.
  - Multiple color schemes. Try 'theme light' or 'theme dracula'.
  - A mobile-friendly interface that adapts to on-screen keyboards.

Type 'help' for a full list of commands.
`);
    return false;
}

function handleCv(args, term, state) {
    term.print(cvData);
    return false;
}

function handleSocial(args, term, state) {
    term.print([
        { html: '<span class="output-title">Connect with me:</span>' },
        { html: `  - GitHub      <a class="output-item" href="https://github.com/bieggerm" target="_blank">github.com/bieggerm</a>` },
        { html: `  - LinkedIn    <a class="output-item" href="https://www.linkedin.com/in/bieggerm/" target="_blank">linkedin.com/in/bieggerm</a>` },
    ]);
    return false;
}

function handleContact(args, term, state) {
    term.print([
        { html: '<span class="output-title">Get in Touch:</span>' },
        { html: `  - Email:      <a class="output-item" href="mailto:mail@bieggerm.com">mail@bieggerm.com</a>` },
        { html: `  - LinkedIn:   <a class="output-item" href="https://www.linkedin.com/in/bieggerm/" target="_blank">linkedin.com/in/bieggerm</a>` },
    ]);
    return false;
}

function handleProfile(args, term, state) {
    const randomIndex = Math.floor(Math.random() * profileImagePaths.length);
    const randomImageSrc = profileImagePaths[randomIndex];
    term.print({ html: `<img src="${randomImageSrc}" alt="Marius Biegger - Profile Picture" style="max-width: 150px; max-height: 150px; border-radius: 8px; margin-top: 5px; margin-bottom: 5px; object-fit: cover;" />` });
    const randomCompliment = profileCompliments[Math.floor(Math.random() * profileCompliments.length)];
    term.print({ text: randomCompliment });
    return false;
}

async function handleKeys(args, term, state) {
    term.print({ text: "Fetching keys from keys.bieggerm.com..." });
    try {
        const response = await fetch("https://keys.bieggerm.com");
        if (!response.ok) {
            term.print({ html: `<span class="output-error">Error fetching keys: ${response.status} ${response.statusText}</span>` });
        } else {
            const keyText = await response.text();
            term.print({ text: stripHtml(keyText) });
        }
    } catch (error) {
        term.print({ html: `<span class="output-error">Network error fetching keys: ${error.message}</span>` });
    }
    return false;
}

function handleNeofetch(args, term, state) {
    const art = ["           .--.         ", "          |o_o |         ", "          |:_/ |         ", "         //   \\ \\        ", "        (|     | )       ", "       /'\\_   _/`\\       ", "       \\___)=(___/      "];
    const info = [
        { html: '<span class="output-neofetch-title"> Marius Biegger @ bieggerm.com</span>' },
        { html: '<span class="output-neofetch-title">----------------------------</span>' },
        { text: `OS:     BieggerMOS v2.4 (Web-Based)` }, { text: `Kernel: 5.15.0-bm` },
        { text: `Title:  System Engineer` }, { text: `Based:  Ingolstadt, Germany` },
        { text: ` Uptime: ${getUptime(state.startTime)}` }, { text: `Shell:  zsh (emulated)` },
    ];
    const output = art.map((line, i) => ({ html: `<span class="output-neofetch-art">${line}</span> ${info[i] ? (info[i].html || info[i].text) : ""}` }));
    term.print(output);
    return false;
}

function handleWhoami(args, term, state) {
    term.print("guest - a curious explorer of this digital realm.");
    return false;
}

function handleDate(args, term, state) {
    term.print(new Date().toLocaleString());
    return false;
}

export const informationalHandlers = {
    help: handleHelp,
    about: handleAbout,
    cv: handleCv,
    social: handleSocial,
    contact: handleContact,
    profile: handleProfile,
    keys: handleKeys,
    neofetch: handleNeofetch,
    whoami: handleWhoami,
    date: handleDate,
};