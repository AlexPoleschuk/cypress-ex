import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";

async function clearDir(dir) {
    rimraf(dir);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const projectFolder = join(__dirname, "reports");
    const dirCreation = await mkdir(projectFolder, { recursive: true });

    return dirCreation;
}

export default clearDir;
