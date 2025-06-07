// js/commands/index.js
import { fileSystemHandlers } from './handlers/fileSystem.js';
import { informationalHandlers } from './handlers/informational.js';
import { terminalOpsHandlers } from './handlers/terminalOps.js';

const allCommandHandlers = {
    ...fileSystemHandlers,
    ...informationalHandlers,
    ...terminalOpsHandlers,
};

// --- COMMAND EXECUTION ---
export async function executeCommand(input, term, state) {
    const [command, ...args] = input.split(" ").filter((i) => i);
    if (!command) return false;

    const handler = allCommandHandlers[command];
    if (handler) {
        return await handler(args, term, state);
    } else {
        term.print({ html: `<span class="output-error">${command}: command not found</span>` });
        return false;
    }
}
