import CardItemBase from "./CardItemBase.js";

export default class CardItemDateTimeLocal extends CardItemBase {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor(item) {

        // Call the parent constructor
        super(item);

        // List of attributes to move to the input element
        const attributes = [

            "type",
            "required",
            "name",
            "value",
            "min",
            "max",
            "step"

        ];

        // Create item structure
        this.createContentElement("label");
        this.createInputElement("datetime-local", attributes);

        // Check if the value is set to "now"
        if (this.elements.input.getAttribute("value") == "now") {

            // Get the current date and time
            const now = new Date();

            // Format the current date and time as "YYYY-MM-DDTHH:MM" adjusted to the local timezone
            const localFormatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

            // Set the input field value to the current local date and time
            this.elements.input.value = localFormatted;

        }

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}