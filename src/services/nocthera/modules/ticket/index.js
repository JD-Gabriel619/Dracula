import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Ticket buttons
});

register(NoctheraEvents.SELECT, async (interaction) => {
    // Ticket select menus
});

export default true;