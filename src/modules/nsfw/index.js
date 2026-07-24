// src/modules/nsfw/index.js
import { registerNSFWHandlers } from './handlers/nsfwHandler.js';

export async function registerNSFW(client) {
    try {
        registerNSFWHandlers(client);
        console.log("🔞 NSFW Module loaded successfully");
    } catch (error) {
        console.error("Failed to load NSFW module:", error);
    }
}

export default registerNSFW;