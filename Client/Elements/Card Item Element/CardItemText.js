import CardItemBase from "./CardItemBase.js";

export default class CardItemText extends CardItemBase {

    // ============================================================================================
    // Create text item
    // ============================================================================================
    create(item) {

        // Set the item element
        this.elements.item = item;

        // Create item structure
        this.createContentElement("label", true);
        this.createDetailsElement();
        this.createLabelElement(this.elements.item.getAttribute("label"));

        // Create input element
        this.createInputElement("text");

        // List of attributes to move from the item element to the input element
        const attributes = [

            "name",
            "value",
            "placeholder",
            "required",
            "minlength",
            "maxlength",
            "pattern"

        ];

        // Move attributes from the item element to the input element
        this.moveAttributes(attributes, this.elements.item, this.elements.input);

        // Append the input element to the details element
        this.elements.details.append(this.elements.input);

        // Create a description element
        this.createDescriptionElement(this.elements.item.getAttribute("description"));

        // Append item content
        this.elements.item.append(this.elements.content);

    }

}