// @ts-nocheck
import * as fs from 'fs/promises';
import * as path from 'path';

async function walkDir(dir) {
    let files = await fs.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) return walkDir(filePath);
        else if (stats.isFile()) return filePath;
    }));

    return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

export default walkDir;
