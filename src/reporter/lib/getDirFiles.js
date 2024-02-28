import { readdirSync } from "fs";

function getDirFiles(dirPath) {
    const files = readdirSync(dirPath, { withFileTypes: true })
        .filter((item) => !item.isDirectory())
        .map((item) => item.name);

    return files || [];
}

export default getDirFiles;
