import { register } from "../../events/eventManager.js";
import { NoctheraEvents } from "../../events/events.js";

register(NoctheraEvents.BUTTON, async (interaction) => {
    // Role Panel buttons will be handled here
});

export default true;