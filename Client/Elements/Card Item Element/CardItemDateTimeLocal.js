import CardItemBase from "./CardItemBase.js";

export default class CardItemDateTimeLocal extends CardItemBase {

    // ============================================================================================
    // Create date time item
    // ============================================================================================
    create(item) {

        // Set the item element
        this.elements.item = item;

        // Create item structure
        this.createContentElement("label", true);
        this.createDetailsElement();
        this.createLabelElement(this.elements.item.getAttribute("label"));

        // Create input element
        this.createInputElement("datetime-local");

        // List of attributes to move from the item element to the input element
        const attributes = [

            "name",
            "value",
            "required",
            "min",
            "max",
            "step"

        ];

        // Move attributes from the item element to the input element
        this.moveAttributes(attributes, this.elements.item, this.elements.input);

        // Check if the date time value is set to "now"
        if (this.elements.input.getAttribute("value") == "now") {

            // Get the current date and time
            const now = new Date();

            // Format the current date and time as "YYYY-MM-DDTHH:MM" adjusted to the local timezone
            const localFormatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

            // Seth the input field value to the current local date and time
            this.elements.input.value = localFormatted;

        }

        // Append the input element to the details element
        this.elements.details.append(this.elements.input);

        // Create a description element
        this.createDescriptionElement(this.elements.item.getAttribute("description"));

        // Append item content
        this.elements.item.append(this.elements.content);

    }

}