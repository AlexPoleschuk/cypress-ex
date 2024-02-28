// @ts-nocheck
import { readdir, stat } from "fs/promises";
import { join } from "path";

async function walkDir(dir) {
    let files = await readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = join(dir, file);
        const stats = await stat(filePath);
        if (stats.isDirectory()) return walkDir(filePath);
        else if (stats.isFile()) return filePath;
    }));

    return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

export default walkDir;
