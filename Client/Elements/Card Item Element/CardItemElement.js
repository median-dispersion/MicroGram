import CardItemValue from "./CardItemValue.js";
import CardItemText from "./CardItemText.js";
import CardItemPassword from "./CardItemPassword.js";
import CardItemNumber from "./CardItemNumber.js";
import CardItemDateTimeLocal from "./CardItemDateTimeLocal.js";
import CardItemToggle from "./CardItemToggle.js";
import CardItemRadio from "./CardItemRadio.js";
import CardItemCheckbox from "./CardItemCheckbox.js";
import CardItemSelect from "./CardItemSelect.js";
import CardItemLink from "./CardItemLink.js";

export default class CardItemElement extends HTMLElement {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Connected callback
    // ============================================================================================
    connectedCallback() {

        // Check if element is not initialized
        if (!this.#initialized) {

            // Get the item type
            const type = this.getAttribute("type");

            // Check if a type is set
            if (type) {

                // Item instance
                let instance;

                // Depending on the item type set the item instance
                switch (type) {

                    case "value": { instance = new CardItemValue(this); break; }
                    case "text": { instance = new CardItemText(this); break; }
                    case "password": { instance = new CardItemPassword(this); break; }
                    case "number": { instance = new CardItemNumber(this); break; }
                    case "datetime-local": { instance = new CardItemDateTimeLocal(this); break; }
                    case "toggle": { instance = new CardItemToggle(this); break; }
                    case "radio": { instance = new CardItemRadio(this); break; }
                    case "checkbox": { instance = new CardItemCheckbox(this); break; }
                    case "select": { instance = new CardItemSelect(this); break; }
                    case "link": { instance = new CardItemLink(this); break; }

                }

                // For each slot element
                this.querySelectorAll("[slot]").forEach(element => {

                    // Move the slot element to the appropriate slot position
                    switch (element.slot) {

                        case "prepend-item": { instance.elements.item.prepend(element); break; }
                        case "append-item": { instance.elements.item.append(element); break; }
                        case "prepend-content": { instance.elements.content.prepend(element); break; }
                        case "append-content": { instance.elements.content.append(element); break; }

                    }

                });

            }

            // Set the initialized flag to true
            this.#initialized = true;

        }

    }

    // --------------------------------------------------------------------------------------------
    // Private

    #initialized = false;

}