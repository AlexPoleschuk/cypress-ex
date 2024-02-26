// @ts-nocheck
import { unlink } from "fs/promises";

async function rmFile(path) {
    try {
        await unlink(path);
        console.log(`successfully deleted ${path}`);
    } catch (error) {
        console.error('there was an error:', error.message);
    }
};

export default rmFile;
