import CardItemBase from "./CardItemBase.js";

export default class CardItemLink extends CardItemBase {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor(item) {

        // Call the parent constructor
        super(item);

        // Create item structure
        this.createContentElement("a");

        // Get the value
        const value = this.elements.item.getAttribute("value");

        // Check if a value is set
        if (value) {

            // Apply the set value
            this.elements.value.textContent = value;

        }

        // Get the href attribute
        const href = this.elements.item.getAttribute("href");

        // Check if a href value is set
        if (href) {

            // Apply the href value
            this.elements.content.href = href;

            // Remove the href attribute from the source element
            this.elements.item.removeAttribute("href");

        }

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}