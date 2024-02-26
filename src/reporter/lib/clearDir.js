const rimraf = require("rimraf");
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

async function clearDir(dir) {
    rimraf(dir, function () {
        console.log(`successfully deleted ${dir}`)
    });

    const projectFolder = join(__dirname, 'reports');
    const dirCreation = await mkdir(projectFolder, { recursive: true });

    return dirCreation;
};

export default clearDir;
