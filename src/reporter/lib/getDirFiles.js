// @ts-nocheck
import * as fs from 'fs';

function getDirFiles(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name);

    return files || [];
};

export default getDirFiles;
