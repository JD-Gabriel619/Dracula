// src/modules/nsfw/config.js
import { z } from 'zod';

export const NSFWConfigSchema = z.object({
    enabled: z.boolean().default(false),
    nsfwRoleId: z.string().nullable(),
    allowedChannels: z.array(z.string()).default([]), // channels where NSFW is allowed
    ageGateEnabled: z.boolean().default(true),
    logChannelId: z.string().nullable(),
});

export function getNSFWConfig(guildConfig) {
    const raw = guildConfig?.nsfwConfig || {};
    return NSFWConfigSchema.parse(raw);
}