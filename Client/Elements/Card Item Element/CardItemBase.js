export default class CardItemBase {

    // --------------------------------------------------------------------------------------------
    // Public

    elements = {};

    // ============================================================================================
    // Create the content element
    // ============================================================================================
    createContentElement(type, interactive = false) {

        // Create element
        this.elements.content = document.createElement(type);

        // Add class
        this.elements.content.classList.add("card__content");

        // Check if the content element is supposed to be interactive
        if (interactive) {

            // Add the interactive class
            this.elements.content.classList.add("card__content--interactive");

        }

    }

    // ============================================================================================
    // Create the details element
    // ============================================================================================
    createDetailsElement() {

        // Create element
        this.elements.details = document.createElement("div");

        // Add class
        this.elements.details.classList.add("card__details");

        // Append to the appropriate parent element
        this.elements.content.append(this.elements.details);

    }

    // ============================================================================================
    // Create the state element
    // ============================================================================================
    createStateElement(type) {

        // Create element
        this.elements.state = document.createElement("div");

        // Add classes
        this.elements.state.classList.add("card__state");
        this.elements.state.classList.add(`card__state--${type}`);

        // Append to the appropriate parent element
        this.elements.content.append(this.elements.state);

    }

    // ============================================================================================
    // Create the label element
    // ============================================================================================
    createLabelElement(label) {

        // Check if label is set
        if (label) {

            // Create element
            this.elements.label = document.createElement("span");

            // Add class
            this.elements.label.classList.add("card__label");

            // Set label value
            this.elements.label.textContent = label;

            // Append to the appropriate parent element
            this.elements.details.append(this.elements.label);

        }

    }

    // ============================================================================================
    // Create the value element
    // ============================================================================================
    createValueElement(value) {

        // Check if value is set
        if (value) {

            // Create element
            this.elements.value = document.createElement("span");

            // Add class
            this.elements.value.classList.add("card__value");

            // Set value value
            this.elements.value.textContent = value;

            // Append to the appropriate parent element
            this.elements.details.append(this.elements.value);

        }

    }

    // ============================================================================================
    // Create the input element
    // ============================================================================================
    createInputElement(type, hidden = false) {

        // Create element
        this.elements.input = document.createElement("input");

        // Add class
        this.elements.input.classList.add("card__input");

        // Set the input type
        this.elements.input.type = type;

        // Check if the input is supposed to be hidden
        if (hidden) {

            // Add the hidden class
            this.elements.input.classList.add("card__input--hidden");

        }

        // Add the validity check to the input element
        this.addValidityCheck(this.elements.input);

    }

    // ============================================================================================
    // Create the select element
    // ============================================================================================
    createSelectElement() {

        // Create element
        this.elements.select = document.createElement("select");

        // Add class
        this.elements.select.classList.add("card__select");

        // Add the validity check to the input element
        this.addValidityCheck(this.elements.select);

        // Append to the appropriate parent element
        this.elements.details.append(this.elements.select);

    }

    // ============================================================================================
    // Create the description element
    // ============================================================================================
    createDescriptionElement(description) {

        // Check if the description is set
        if (description) {

            // Create element
            this.elements.description = document.createElement("span");

            // Add class
            this.elements.description.classList.add("card__description");

            // Set the description value
            this.elements.description.textContent = description;

            // Append to the appropriate parent element
            this.elements.details.append(this.elements.description);

        }

    }

    // ============================================================================================
    // Move attributes
    // ============================================================================================
    moveAttributes(attributes, source, target) {

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
    // Add a validity check
    // ============================================================================================
    addValidityCheck(target) {

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