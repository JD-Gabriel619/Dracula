// src/modules/nsfw/index.js
export async function registerNSFW(client) {
    try {
        console.log("🔞 Loading NSFW Module...");

        // Dynamic import to prevent crash
        const { registerNSFWHandlers } = await import('./handlers/nsfwHandler.js');
        registerNSFWHandlers(client);

        console.log("✅ NSFW Module loaded successfully");
    } catch (error) {
        console.error("❌ NSFW Module failed to load (non-fatal):", error.message);
        console.log("Bot will continue without NSFW features.");
    }
}

export default registerNSFW;
