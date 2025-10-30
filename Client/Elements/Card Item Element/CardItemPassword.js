import CardItemBase from "./CardItemBase.js";

export default class CardItemPassword extends CardItemBase {

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
            "placeholder",
            "minlength",
            "maxlength",
            "pattern"

        ];

        // Create item structure
        this.createContentElement("label");
        this.createInputElement("password", attributes);

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}