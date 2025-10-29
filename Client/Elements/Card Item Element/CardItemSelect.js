import CardItemBase from "./CardItemBase.js";

export default class CardItemSelect extends CardItemBase {

    // ============================================================================================
    // Create select item
    // ============================================================================================
    create(item) {

        // Set the item element
        this.elements.item = item;

        // Create an append required elements
        this.createContentElement("label", true);
        this.createDetailsElement();
        this.createLabelElement(this.elements.item.getAttribute("label"));

        // Create the select element
        this.createSelectElement();

        // List of attributes to move from the item element to the select element
        const attributes = [

            "name",
            "required"

        ];

        // Move attributes from the item element to the select element
        this.moveAttributes(attributes, this.elements.item, this.elements.select);

        // For each select option
        this.elements.item.querySelectorAll("option").forEach(option => {

            // Move the option into the select element
            this.elements.select.append(option);

        });

        // Add an event listener for when the select elements gets focused
        // Through a click event or by selecting the wrapper label element
        // It automatically displays the dropdown options by using the show picker function
        this.elements.select.addEventListener("focus", this.elements.select.showPicker);

        // Create a description element
        this.createDescriptionElement(this.elements.item.getAttribute("description"));

        // Append item content
        this.elements.item.append(this.elements.content);

    }

}