import CardItemBase from "./CardItemBase.js";

export default class CardItemSelect extends CardItemBase {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor(item) {

        // Call the parent constructor
        super(item);

        // List of attributes to move to the select element
        const attributes = [

            "required",
            "name"

        ];

        // Create item structure
        this.createContentElement("label");
        this.createSelectElement(attributes);

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}