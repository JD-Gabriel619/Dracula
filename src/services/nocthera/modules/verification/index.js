import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Verification buttons
});

register(NoctheraEvents.MEMBER_JOIN, async (member) => {
    // Verification join logic
});

export default true;