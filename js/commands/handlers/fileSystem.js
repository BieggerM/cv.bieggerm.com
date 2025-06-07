// js/commands/handlers/fileSystem.js
import { fs, getNode, resolvePath } from '../../vfs.js';

function handleLs(args, term, state) {
    const pathArg = args.find((arg) => !arg.startsWith("-")) || ".";
    const showHidden = args.includes("-a");
    const node = getNode(pathArg, state.cwd);

    if (!node) {
        term.print({
            html: `<span class="output-error">ls: cannot access '${pathArg}': No such file or directory</span>`,
        });
        return false;
    }

    if (node.owner === "root" && state.user !== "root" && node !== fs) {
        term.print({
            html: `<span class="output-error">ls: cannot open directory '${pathArg}': Permission denied</span>`,
        });
        return false;
    }

    if (node.type !== "dir") {
        term.print({
            html: `<span class="output-error">ls: cannot access '${pathArg}': Not a directory</span>`,
        });
        return false;
    }

    const output = Object.keys(node.children)
        .filter((name) => showHidden || !name.startsWith("."))
        .map((name) => {
            const child = node.children[name];
            return {
                html: child.type === "dir" ? `<span class="output-dir">${name}</span>` : `<span class="output-file">${name}</span>`,
            };
        });
    term.print(output.length > 0 ? output : "");
    return false;
}

function handleCd(args, term, state) {
    const targetPathInput = args[0] || "~"; // User's input for the target path
    const targetNode = getNode(targetPathInput, state.cwd); // Get the node (getNode resolves path internally)

    if (targetNode && targetNode.type === "dir") {
        const isPermissionDenied = targetNode.owner === "root" && state.user !== "root";

        if (isPermissionDenied) {
            term.print({ html: `<span class="output-error">cd: cannot access '${targetPathInput}': Permission denied</span>` });
        } else {
            // If all checks pass, update cwd to the resolved path of the input.
            state.cwd = resolvePath(targetPathInput, state.cwd);
        }
    } else {
        term.print({ html: `<span class="output-error">cd: not a directory: ${targetPathInput}</span>` });
    }
    return false;
}

function handleCat(args, term, state) {
    const filePath = args[0];
    if (!filePath) {
        term.print({ html: `<span class="output-error">cat: missing operand</span>` });
        return false;
    }
    const fileNode = getNode(filePath, state.cwd);
    if (!fileNode) {
        term.print({ html: `<span class="output-error">cat: ${filePath}: No such file or directory</span>` });
    } else if (fileNode.type === "dir") {
        term.print({ html: `<span class="output-error">cat: ${filePath}: Is a directory</span>` });
    } else if (fileNode.owner === "root" && state.user !== "root") {
        term.print({ html: `<span class="output-error">cat: ${filePath}: Permission denied</span>` });
    } else {
        term.print(fileNode.content);
    }
    return false;
}

function handlePwd(args, term, state) {
    term.print(state.cwd);
    return false;
}

export const fileSystemHandlers = {
    ls: handleLs,
    cd: handleCd,
    cat: handleCat,
    pwd: handlePwd,
};