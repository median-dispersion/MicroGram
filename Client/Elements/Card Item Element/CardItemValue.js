import CardItemBase from "./CardItemBase.js";

export default class CardItemValue extends CardItemBase {

    // ============================================================================================
    // Create value item
    // ============================================================================================
    create(item) {

        // Set the item element
        this.elements.item = item;

        // Create an append required elements
        this.createContentElement("div");
        this.createDetailsElement();
        this.createLabelElement(this.elements.item.getAttribute("label"));
        this.createValueElement(this.elements.item.getAttribute("value"));
        this.createDescriptionElement(this.elements.item.getAttribute("description"));

        // Append item content
        this.elements.item.append(this.elements.content);

    }

}