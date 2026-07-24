// src/modules/nsfw/index.js
import { registerNSFWHandlers } from './handlers/nsfwHandler.js';

export async function registerNSFW(client) {
    registerNSFWHandlers(client);
    console.log("🔞 NSFW Module loaded");
}

export default registerNSFW;