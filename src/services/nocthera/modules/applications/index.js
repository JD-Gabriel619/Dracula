import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Application buttons
});

register(NoctheraEvents.MODAL, async (interaction) => {
    // Application modals
});

export default true;