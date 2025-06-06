// js/commands.js

import { fs } from './vfs.js';

// --- DATA for Direct Commands ---

const themes = {
    'default': {
        '--background': '#1a1b26', '--foreground': '#c0caf5', '--prompt': '#7aa2f7',
        '--command': '#bb9af7', '--title': '#7dcfff', '--item': '#9ece6a',
        '--error': '#f7768e', '--dir': '#7aa2f7'
    },
    'light': {
        '--background': '#e0e0e0', '--foreground': '#1f1f1f', '--prompt': '#0055c4',
        '--command': '#7814a8', '--title': '#0055c4', '--item': '#007800',
        '--error': '#c40000', '--dir': '#0055c4'
    },
    'dracula': {
        '--background': '#282a36', '--foreground': '#f8f8f2', '--prompt': '#bd93f9',
        '--command': '#ff79c6', '--title': '#8be9fd', '--item': '#50fa7b',
        '--error': '#ff5555', '--dir': '#bd93f9'
    }
};

const cvData = [
    { html: '<span class="output-title">Marius Biegger - Curriculum Vitae</span>' },
    { text: '=================================================' },
    { html: `To view a printer-friendly version, run: <span class="output-item">open cv</span>` },
    { text: ' ' },
    { html: '<span class="output-title">About Me</span>' },
    { text: 'A highly motivated and results-oriented system engineer with over 5 years of experience in designing, implementing, and maintaining robust and scalable IT infrastructure. I possess a strong understanding of Linux systems, network protocols, and cloud technologies. I am passionate about automation and improving system efficiency through scripting and infrastructure-as-code principles.' },
    { text: ' ' },
    { html: '<span class="output-title">Career Journey</span>' },
    { text: 'My professional path has taken me through a variety of roles and industries, each contributing to my growth as a system engineer and shaping my approach to technology and teamwork.' },
    { text: ' ' }, 
    { html: '<span class="output-item">  Dual Master Student at Audi AG (2024 - Present)</span>' },
    { html: '<span class="output-item">  System Engineer - DevOps at Vetter Pharma (2022 - 2024)</span>' },
    { html: '<span class="output-item">  Cloud Operations Engineer at Liebherr (2021 - 2022)</span>' },
    { html: '<span class="output-item">  Softwaredeveloper at Ametras metals GmbH (2018 - 2021)</span>' },
    { text: ' ' },
    { html: '<span class="output-title">Skills</span>' },
    { html: '<span class="output-item">  - Linux Server Administration (Debian, SUSE)</span>' },
    { html: '<span class="output-item">  - Network Configuration (TCP/IP, DNS, DHCP, VLANs)</span>' },
    { html: '<span class="output-item">  - Scripting (Bash, Python)</span>' },
    { html: '<span class="output-item">  - Cloud Platforms (AWS, Azure)</span>' },
    { html: '<span class="output-item">  - Automation Tools (Ansible, Terraform)</span>' },
    { html: '<span class="output-item">  - Monitoring Tools (Prometheus, Grafana, Nagios)</span>' },
    { html: '<span class="output-item">  - Containerization (Docker, Kubernetes)</span>' },
    { html: '<span class="output-item">  - Security Best Practices</span>' },
    { html: '<span class="output-item">  - Vibe Coding 😎</span>' },
    { text: ' ' },
    { html: '<span class="output-title">Education</span>' },
    { html: '<span class="output-item">  - Master, Cloud Applications & Security Engineering - TH Ingolstadt</span>' },
    { html: '<span class="output-item">  - Bachelor, Wirtschaftsinformatik - DHBW Ravensburg</span>' },
    { text: ' ' },
  
];

const profileImagePaths = [
    "media/profiles/profile.jpg",
    "media/profiles/profile1.jpg",
    "media/profiles/profile2.jpg",
    "media/profiles/profile3.jpg",
    "media/profiles/profile4.jpg",
    "media/profiles/profile5.jpg",
    "media/profiles/profile6.jpg",
    "media/profiles/profile7.jpg",
    "media/profiles/profile8.jpg"
];


function resolvePath(path, cwd) {
    if (path.startsWith('/')) return path;
    if (path.startsWith('~')) return `/home/guest${path.substring(1)}`;
    
    const parts = path.split('/').filter(p => p);
    let currentPath = cwd === '/' ? [] : cwd.split('/').filter(p => p);

    for (const part of parts) {
        if (part === '.') continue;
        if (part === '..') { if (currentPath.length > 0) currentPath.pop(); }
        else { currentPath.push(part); }
    }
    return `/${currentPath.join('/')}`;
}

function getNode(path, cwd) {
    const resolvedPath = resolvePath(path, cwd);
    if (resolvedPath === '/') return fs;

    const parts = resolvedPath.split('/').filter(p => p);
    let currentNode = fs;

    for (const part of parts) {
        if (currentNode && currentNode.type === 'dir' && currentNode.children && currentNode.children[part]) {
            currentNode = currentNode.children[part];
        } else {
            return null;
        }
    }
    return currentNode;
}

function applyTheme(themeId) {
    const theme = themes[themeId];
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    }
}

function getUptime(startTime) {
    const diff = Math.abs(new Date() - startTime);
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}

// --- COMMAND EXECUTION ---

export function executeCommand(input, term, state) {
    const [command, ...args] = input.split(' ').filter(i => i);
    if (!command) return;

    switch (command) {
        // Direct Commands
        case 'help':
            term.print([
                { html: '<span class="output-title">Direct Commands:</span>' },
                { html: '  about      Display a short bio' },
                { html: '  cv         Display my curriculum vitae' },
                { html: '  social     Show social media links' },
                { html: '  profile    Display my profile picture' },
                { html: '  contact    Show contact information' },
                { html: '  theme <id> Change color theme (e.g., theme light)' },
                { html: '  neofetch   Display system info' },
                { html: '  history    Show command history' },
                { html: '  exit       Close the terminal' },
                { text: ' ' },
                { html: '<span class="output-title">File System Commands:</span>' },
                { html: '  ls [-a]    List directory contents' },
                { html: '  cd <dir>   Change directory (supports ., .., ~)' },
                { html: '  cat <file> Display file content' },
                { html: '  pwd        Print working directory' },
                { html: '  clear      Clear the terminal screen' },
                { html: '  open <url> Open a link (e.g., open github)'},
            ]);
            break;
        
        case 'about':
            // Extract the "About Me" section from cvData
            const aboutMeLines = cvData.slice(
                cvData.findIndex(line => line.html && line.html.includes('About Me')),
                cvData.findIndex(line => line.html && line.html.includes('Career Journey')) -1 // -1 to exclude the empty line before next section
            );
            term.print(aboutMeLines);
            break;
        case 'cv':
            term.print(cvData);
            break;
        case 'social':
            term.print([
                { html: '<span class="output-title">Connect with me:</span>' },
                { html: `  - GitHub      <a href="https://github.com/bieggerm" target="_blank">github.com/bieggerm</a>` },
                { html: `  - LinkedIn    <a href="https://www.linkedin.com/in/marius-biegger/" target="_blank">linkedin.com/in/marius-biegger</a>` }
            ]);
            break;
        case 'contact':
            term.print([
                { html: '<span class="output-title">Get in Touch:</span>' },
                { html: `  - Email:      <a href="mailto:mail@bieggerm.com">mail@bieggerm.com</a>`},
                { html: `  - LinkedIn:   <a href="https://www.linkedin.com/in/marius-biegger/" target="_blank">linkedin.com/in/marius-biegger</a>` }
            ]);
            break;
        case 'profile':
            const randomIndex = Math.floor(Math.random() * profileImagePaths.length);
            const randomImageSrc = profileImagePaths[randomIndex];
            term.print({
                html: `<img src="${randomImageSrc}" alt="Marius Biegger - Profile Picture" style="max-width: 150px; max-height: 150px; border-radius: 8px; margin-top: 5px; margin-bottom: 5px; object-fit: cover;" />`
            });
            term.print({ text: 'Looking sharp!' });
            break;
        case 'theme':
            const themeId = args[0];
            if (!themeId) {
                term.print([
                    {html: 'Usage: theme &lt;id&gt;'},
                    {html: `Available themes: <span class="output-item">${Object.keys(themes).join(', ')}</span>`}
                ]);
            } else if (themes[themeId]) {
                applyTheme(themeId);
                term.print({ html: `Theme set to <span class="output-item">'${themeId}'</span>` });
            } else {
                term.print({ html: `<span class="output-error">Theme '${themeId}' not found.</span>` });
            }
            break;
        case 'neofetch':
            const neofetchArt = [
                { html: "           .--.         ", type: 'neofetch-art' },
                { html: "          |o_o |         ", type: 'neofetch-art' },
                { html: "          |:_/ |         ", type: 'neofetch-art' },
                { html: "         //   \\ \\        ", type: 'neofetch-art' },
                { html: "        (|     | )       ", type: 'neofetch-art' },
                { html: "       /'\\_   _/`\\       ", type: 'neofetch-art' },
                { html: "       \\___)=(___/      ", type: 'neofetch-art' }
            ].map((line, i) => {
                const info = [
                    { html: '<span class="output-neofetch-title"> Marius Biegger @ bieggerm.com</span>' },
                    { html: '<span class="output-neofetch-title">----------------------------</span>' },
                    { text: `OS:     MariusBieggerOS (Web-Based)` },
                    { text: `Kernel: Linux & Cloud Automation` },
                    { text: `Title:  System Engineer` },
                    { text: `Based:  Ingolstadt, Germany` },
                    { text: ` Uptime: ${getUptime(state.startTime)}` },
                    { text: `Shell:  zsh (emulated)` }
                ];
                return { html: `<span class="output-neofetch-art">${line.html}</span> ${info[i] ? info[i].html || info[i].text : ''}` };
            });
            term.print(neofetchArt);
            break;
        case 'history':
            term.print(state.history.map((cmd, i) => ({ text: `  ${state.history.length - i}  ${cmd}` })));
            break;
        case 'exit':
            term.clear();
            term.print("Goodbye! You can now close this tab.");
            term.lock(); // Prevent further input
            break;

        // File System Commands
        case 'ls':
            const path = args[0] || '.';
            const node = getNode(path, state.cwd);
            if (!node || node.type !== 'dir') {
                term.print({ html: `<span class="output-error">ls: cannot access '${path}': No such file or directory</span>` });
                return;
            }
            const showHidden = args.includes('-a');
            const output = Object.keys(node.children)
                .filter(name => showHidden || !name.startsWith('.'))
                .map(name => {
                    const child = node.children[name];
                    return { html: child.type === 'dir' ? `<span class="output-dir">${name}</span>` : `<span class="output-file">${name}</span>` };
                });
            term.print(output.length > 0 ? output : '');
            break;
        case 'cd':
            const targetPath = args[0] || '~';
            const newPath = resolvePath(targetPath, state.cwd);
            const targetNode = getNode(newPath, state.cwd);
            if (targetNode && targetNode.type === 'dir') {
                state.cwd = newPath;
            } else {
                term.print({ html: `<span class="output-error">cd: no such file or directory: ${targetPath}</span>` });
            }
            break;
        case 'cat':
            const filePath = args[0];
            if (!filePath) {
                term.print({ html: `<span class="output-error">cat: missing operand</span>` });
                return;
            }
            const fileNode = getNode(filePath, state.cwd);
            if (!fileNode) {
                term.print({ html: `<span class="output-error">cat: ${filePath}: No such file or directory</span>` });
            } else if (fileNode.type === 'dir') {
                term.print({ html: `<span class="output-error">cat: ${filePath}: Is a directory</span>` });
            } else {
                term.print(fileNode.content);
            }
            break;
        case 'pwd':
            term.print(state.cwd);
            break;
        case 'clear':
            term.clear();
            break;
        case 'open':
            const target = args[0];
            const links = {
                cv: 'cv.html',
                github: 'https://github.com/bieggerm',
                linkedin: 'https://www.linkedin.com/in/marius-biegger/'
            };
            if (links[target]) {
                term.print(`Opening ${target}...`);
                window.open(links[target], '_blank');
            } else {
                term.print({ html: `<span class="output-error">open: item '${target}' not found. Try 'cv', 'github', or 'linkedin'.</span>` });
            }
            break;

        // Other utility commands
        case 'whoami':
            term.print('guest - a curious explorer of this digital realm.');
            break;
        case 'date':
            term.print(new Date().toLocaleString());
            break;
        case 'sudo':
            term.print({ html: `<span class="output-error">User 'guest' is not in the sudoers file. This incident will be reported.</span>` });
            break;
        default:
            term.print({ html: `<span class="output-error">${command}: command not found</span>`});
            break;
    }
}