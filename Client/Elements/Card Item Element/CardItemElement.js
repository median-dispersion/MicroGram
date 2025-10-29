import CardItemValue from "./CardItemValue.js";
import CardItemText from "./CardItemText.js";
import CardItemPassword from "./CardItemPassword.js";
import CardItemNumber from "./CardItemNumber.js";
import CardItemDateTimeLocal from "./CardItemDateTimeLocal.js";
import CardItemToggle from "./CardItemToggle.js";
import CardItemRadio from "./CardItemRadio.js";
import CardItemCheckbox from "./CardItemCheckbox.js";
import CardItemSelect from "./CardItemSelect.js";

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

                // Get all slot elements
                const slots = this.querySelectorAll("[slot]");

                // Item instance
                let instance;

                // Depending on the item type set the item instance
                switch (type) {

                    case "value": { instance = new CardItemValue(); break; }
                    case "text": { instance = new CardItemText(); break; }
                    case "password": { instance = new CardItemPassword(); break; }
                    case "number": { instance = new CardItemNumber(); break; }
                    case "datetime-local": { instance = new CardItemDateTimeLocal(); break; }
                    case "toggle": { instance = new CardItemToggle(); break; }
                    case "radio": { instance = new CardItemRadio(); break; }
                    case "checkbox": { instance = new CardItemCheckbox(); break; }
                    case "select": { instance = new CardItemSelect(); break; }

                }

                // Create the item instance
                instance.create(this);

                // For each slot element
                slots.forEach(element => {

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