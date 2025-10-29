import CardItemBase from "./CardItemBase.js";

export default class CardItemToggle extends CardItemBase {

    // ============================================================================================
    // Create toggle item
    // ============================================================================================
    create(item) {

        // Set the item element
        this.elements.item = item;

        // Create an append required elements
        this.createContentElement("label", true);
        this.createDetailsElement();
        this.createLabelElement(this.elements.item.getAttribute("label"));
        this.createValueElement(this.elements.item.getAttribute("value"));
        this.createDescriptionElement(this.elements.item.getAttribute("description"));
        this.createStateElement("toggle");

        // Create the input element
        this.createInputElement("checkbox", true);

        // List of attributes to move from the item element to the input element
        const attributes = [

            "name",
            "required",
            "checked"

        ];

        // Move attributes from the item element to the input element
        this.moveAttributes(attributes, this.elements.item, this.elements.input);

        // Append the input element to the state element
        this.elements.state.append(this.elements.input);

        // Append item content
        this.elements.item.append(this.elements.content);

    }

}