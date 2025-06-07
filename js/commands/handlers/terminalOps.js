// js/commands/handlers/terminalOps.js
import { themes } from '../../data/themes.js';

function applyTheme(themeId) {
    const theme = themes[themeId];
    if (theme) {
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, value);
        }
        return true;
    }
    return false;
}

function handleTheme(args, term, state) {
    const themeId = args[0];
    if (!themeId) {
        term.print([
            { html: "Usage: theme &lt;id&gt;" },
            { html: `Available themes: <span class="output-item">${Object.keys(themes).join(", ")}</span>` },
        ]);
    } else if (applyTheme(themeId)) {
        term.print({ html: `Theme set to <span class="output-item">'${themeId}'</span>` });
    } else {
        term.print({ html: `<span class="output-error">Theme '${themeId}' not found.</span>` });
    }
    return false;
}

function handleHistory(args, term, state) {
    term.print(state.history.map((cmd, i) => ({ text: `  ${state.history.length - i}  ${cmd}` })));
    return false;
}

function handleExit(args, term, state) {
    term.print("Goodbye! You can now close this tab.");
    setTimeout(() => {
        document.body.innerHTML = '';
        document.body.style.backgroundColor = 'black';
        // window.close(); // This might be blocked by browsers if not opened by script
    }, 1000);
    return true; // Suppress prompt
}

function handleClear(args, term, state) {
    term.clear();
    return false;
}

function handleOpen(args, term, state) {
    const target = args[0];
    const links = {
        cv: "cv.html",
        github: "https://github.com/bieggerm",
        linkedin: "https://www.linkedin.com/in/bieggerm/",
        keys: "https://keys.bieggerm.com",
    };

    if (links[target]) {
        term.print(`Opening ${target}...`);
        window.open(links[target], "_blank");
    } else {
        term.print({ html: `<span class="output-error">open: item '${target}' not found. Try 'cv', 'github', or 'linkedin'.</span>` });
    }
    return false;
}

function handleSudo(args, term, state) {
    term.print({ html: `<span class="output-error">User 'guest' is not in the sudoers file. This incident will be reported.</span>` });
    return false;
}

function handleSourcecode(args, term, state) {
    const repoUrl = "https://github.com/bieggerm/bieggerm.github.io";
    term.print(`Opening GitHub repository: ${repoUrl}...`);
    window.open(repoUrl, "_blank");
    return false;
}

export const terminalOpsHandlers = {
    theme: handleTheme,
    history: handleHistory,
    exit: handleExit,
    clear: handleClear,
    open: handleOpen,
    sudo: handleSudo,
    sourcecode: handleSourcecode,
};