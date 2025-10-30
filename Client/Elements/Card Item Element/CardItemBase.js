export default class CardItemBase {

    // --------------------------------------------------------------------------------------------
    // Public

    elements = {};

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor(item) {

        // Set the item element
        this.elements.item = item;

    }

    // ============================================================================================
    // Create the content element
    // ============================================================================================
    createContentElement(type) {

        // Create the content element
        this.elements.content = document.createElement(type);
        this.elements.content.classList.add("card__content");

        // If the content type is a label or link
        if (type == "label" || type == "a") {

            // Add the interactive modifier class
            this.elements.content.classList.add("card__content--interactive");

        }

        // Create the details element
        this.elements.details = document.createElement("div");
        this.elements.details.classList.add("card__details");
        this.elements.content.append(this.elements.details);

        // Get the label
        const label = this.elements.item.getAttribute("label");

        // Check if a label is set
        if (label) {

            // Create the label element
            this.elements.label = document.createElement("div");
            this.elements.label.classList.add("card__label");
            this.elements.label.textContent = label;
            this.elements.details.append(this.elements.label);

        }

        // Create the value element
        this.elements.value = document.createElement("div");
        this.elements.value.classList.add("card__value");
        this.elements.details.append(this.elements.value);

        // Get the description
        const description = this.elements.item.getAttribute("description");

        // Check if a description is set
        if (description) {

            // Create a description element
            this.elements.description = document.createElement("div");
            this.elements.description.classList.add("card__description");
            this.elements.description.textContent = description;
            this.elements.details.append(this.elements.description);

        }

    }

    // ============================================================================================
    // Create the state element
    // ============================================================================================
    createStateElement(type, attributes) {

        // Create the state element
        this.elements.state = document.createElement("div");
        this.elements.state.classList.add("card__state");
        this.elements.state.classList.add(`card__state--${type}`);
        this.elements.content.append(this.elements.state);

        // Create the input element
        this.elements.input = document.createElement("input");
        this.elements.input.classList.add("card__input");
        this.elements.input.classList.add("card__input--hidden");
        this.elements.input.type = type == "toggle" ? "checkbox" : type;
        this.elements.state.append(this.elements.input);

        // Move the attributes
        this.#moveAttributes(attributes, this.elements.item, this.elements.input);

        // Add input validation
        this.#validateInput(this.elements.input);

    }

    // ============================================================================================
    // Create the input element
    // ============================================================================================
    createInputElement(type, attributes) {

        // Create the input element
        this.elements.input = document.createElement("input");
        this.elements.input.classList.add("card__input");
        this.elements.input.type = type;
        this.elements.value.append(this.elements.input);

        // Move the attributes
        this.#moveAttributes(attributes, this.elements.item, this.elements.input);

        // Add input validation
        this.#validateInput(this.elements.input);

    }

    // ============================================================================================
    // Create the unit element
    // ============================================================================================
    createUnitElement() {

        // Create the unit element
        this.elements.unit = document.createElement("div");
        this.elements.unit.classList.add("card__unit");
        this.elements.value.prepend(this.elements.unit);

        // Create the unit value element
        this.elements.unit_value = document.createElement("span");
        this.elements.unit_value.classList.add("card__unit--value");
        this.elements.unit.append(this.elements.unit_value);

        // Create the unit symbol element
        this.elements.unit_symbol = document.createElement("span");
        this.elements.unit_symbol.classList.add("card__unit--symbol");
        this.elements.unit.append(this.elements.unit_symbol);

        // Move the unit attribute
        this.#moveAttributes(["unit"], this.elements.item, this.elements.unit);

        // Add a input event listener to the input element
        this.elements.input.addEventListener("input", (event) => {

            // Get the symbol
            const symbol = this.elements.unit.getAttribute("unit");

            // Check if the input element contains a value and symbol
            if (event.target.value && symbol) {

                // Set the unit value and symbol
                this.elements.unit_value.textContent = event.target.value;
                this.elements.unit_symbol.textContent = ` ${symbol}`;

            // If the input element contains no value
            } else {

                // Clear the unit value and symbol
                this.elements.unit_value.textContent = "";
                this.elements.unit_symbol.textContent = "";

            }

        });

    }

    // ============================================================================================
    // Create the select element
    // ============================================================================================
    createSelectElement(attributes) {

        // Create the select element
        this.elements.select = document.createElement("select");
        this.elements.select.classList.add("card__select");
        this.elements.value.append(this.elements.select);

        // For every option element
        this.elements.item.querySelectorAll("option").forEach(option => {

            // Move the option element to the select element
            this.elements.select.append(option);

        });

        // Move the attributes
        this.#moveAttributes(attributes, this.elements.item, this.elements.select);

        // Add input validation
        this.#validateInput(this.elements.select);

        // Show the dropdown menu on focus
        this.elements.select.addEventListener("focus", this.elements.select.showPicker);

    }

    // --------------------------------------------------------------------------------------------
    // Private

    // ============================================================================================
    // Move attributes
    // ============================================================================================
    #moveAttributes(attributes, source, target) {

        // For every attribute in the list of attributes
        attributes.forEach(attribute => {

            // Get the attribute value of the source element
            const value = source.getAttribute(attribute);

            // If the source element has the attribute set
            if (value != null) {

                // Copy the attribute to the target element
                target.setAttribute(attribute, value);

                // Remove the attribute from the source element
                source.removeAttribute(attribute);

            }

        });

    }

    // ============================================================================================
    // Input validation
    // ============================================================================================
    #validateInput(target) {

        // Add a blur event listener to the target element
        target.addEventListener("blur", () => {

            // Check if the target element input is valid
            if (target.checkValidity()) {

                // Check if the item element contains the critical modifier class
                if (this.elements.item.classList.contains("card__item--critical")) {

                    // Remove the critical modifier class
                    this.elements.item.classList.remove("card__item--critical");

                }

            // If the target element input is not valid
            } else {

                // Check if the item element does not contain the critical modifier class
                if (!this.elements.item.classList.contains("card__item--critical")) {

                    // Add the critical modifier class
                    this.elements.item.classList.add("card__item--critical");

                }

            }

        });

    }

}