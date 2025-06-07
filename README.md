# Terminal Portfolio - Interactive CV Experience
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/BieggerM/cv.bieggerm.com)

An interactive terminal-style portfolio website that provides a unique command-line interface for exploring professional information. Built with vanilla JavaScript and designed to simulate a Unix-like terminal experience in the browser.

## 🚀 Features

- **Interactive Terminal Interface**: Full command-line simulation with prompt, command history, and familiar Unix commands
- **Virtual File System**: Navigate through directories and files using `ls`, `cd`, `cat`, and `pwd` commands [1](#0-0) 
- **Dynamic Theming**: Multiple color schemes including default, light, and dracula themes [2](#0-1) 
- **Mobile Responsive**: Optimized for mobile devices with viewport handling and touch support
- **External API Integration**: Fetches SSH public keys from external service [3](#0-2) 
- **Static CV Alternative**: Traditional CV page for non-technical users [4](#0-3) 

## 🛠️ Architecture

The application follows a modular architecture with four core JavaScript modules:

- **`js/main.js`**: Application orchestration and state management [5](#0-4) 
- **`js/terminal.js`**: DOM manipulation and UI rendering [6](#0-5) 
- **`js/commands.js`**: Command interpretation and execution [7](#0-6) 
- **`js/vfs.js`**: Virtual file system structure and content [1](#0-0) 

## 📋 Available Commands

### Direct Commands
- `help` - Display all available commands
- `about` - Show bio information
- `cv` - Display full curriculum vitae
- `social` - Show social media links
- `contact` - Display contact information
- `profile` - Show random profile picture
- `keys` - Fetch SSH public keys
- `theme [id]` - Change color theme (default, light, dracula)
- `neofetch` - Display system information

### File System Commands
- `ls [-a]` - List directory contents
- `cd <dir>` - Change directory (supports ., .., ~)
- `cat <file>` - Display file content
- `pwd` - Print working directory
- `open <target>` - Open links (cv, github, linkedin)

### Utility Commands
- `clear` - Clear terminal screen
- `history` - Show command history
- `exit` - Close terminal
- `whoami` - Display current user
- `date` - Show current date/time

## 🎨 Theming

The terminal supports three built-in themes that can be switched using the `theme` command:
- **default**: Dark theme with blue/purple accents
- **light**: Light theme for better readability
- **dracula**: Popular dark theme with vibrant colors

## 🏗️ Project Structure

```
├── index.html          # Main terminal interface
├── cv.html            # Static CV page with boot animation
├── js/
│   ├── main.js        # Application entry point and state management
│   ├── terminal.js    # Terminal UI and DOM manipulation
│   ├── commands.js    # Command processing and execution
│   └── vfs.js         # Virtual file system structure
└── media/
    └── profiles/      # Profile images
```

## 🚀 Getting Started

1. Clone the repository
2. Serve the files using any HTTP server (required for ES6 modules)
3. Open `index.html` in your browser
4. Type `help` to see available commands

For development:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## 🌐 Live Demo

Visit the live version at your deployed URL and start exploring with the `help` command!

## 📱 Mobile Support

The terminal includes specialized mobile support with Visual Viewport API integration for proper keyboard handling and responsive design optimizations [8](#0-7) .

## Notes

The project demonstrates a creative approach to portfolio presentation by combining familiar terminal interactions with modern web technologies. The virtual file system contains hidden directories (like `.secret_lair`) that users can discover through exploration, adding an element of gamification to the CV browsing experience. The dual presentation approach (terminal + static CV) ensures accessibility for both technical and non-technical audiences.

Wiki pages you might want to explore:
- [Terminal Portfolio Application (BieggerM/cv.bieggerm.com)](/wiki/BieggerM/cv.bieggerm.com#2)
- [Command Processing System (BieggerM/cv.bieggerm.com)](/wiki/BieggerM/cv.bieggerm.com#2.3)