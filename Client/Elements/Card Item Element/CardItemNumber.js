import CardItemBase from "./CardItemBase.js";

export default class CardItemNumber extends CardItemBase {

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
            "min",
            "max",
            "step"

        ];

        // Create item structure
        this.createContentElement("label");
        this.createInputElement("number", attributes);
        this.createUnitElement();

        // Append the item structure
        this.elements.item.append(this.elements.content);

    }

}