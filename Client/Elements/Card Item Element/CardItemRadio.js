import CardItemBase from "./CardItemBase.js";

export default class CardItemRadio extends CardItemBase {

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
            "checked"

        ];

        // Create item structure
        this.createContentElement("label");
        this.createStateElement("radio", attributes);

        // Get the value
        const value = this.elements.item.getAttribute("value");

        // Check if a value is set
        if (value) {

            // Apply the set value
            this.elements.value.textContent = value;

        }

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}