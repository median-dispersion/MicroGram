class Dialog {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Connected callback
    // ============================================================================================
    constructor() {

        // Create elements
        this.#elements.dialog = document.createElement("div");
        this.#elements.content = document.createElement("div");
        this.#elements.box = document.createElement("div");
        this.#elements.message = document.createElement("div");
        this.#elements.label = document.createElement("div");
        this.#elements.text = document.createElement("div");
        this.#elements.actions = document.createElement("div");

        // Add class names
        this.#elements.dialog.classList.add("dialog");
        this.#elements.content.classList.add("dialog__content");
        this.#elements.content.classList.add("content");
        this.#elements.box.classList.add("dialog__box");
        this.#elements.message.classList.add("dialog__message");
        this.#elements.label.classList.add("dialog__label");
        this.#elements.text.classList.add("dialog__text");
        this.#elements.actions.classList.add("dialog__actions");
        this.#elements.actions.classList.add("actions");

        // Append elements
        this.#elements.dialog.append(this.#elements.content);
        this.#elements.content.append(this.#elements.box);
        this.#elements.box.append(this.#elements.message);
        this.#elements.message.append(this.#elements.label);
        this.#elements.message.append(this.#elements.text);
        this.#elements.box.append(this.#elements.actions);
        document.body.prepend(this.#elements.dialog);

    }

    // ============================================================================================
    // Open the dialog box
    // ============================================================================================
    open(label, text, buttons) {

        // Set the label and text values
        this.#elements.label.textContent = label;
        this.#elements.text.textContent = text;

        // Remove all elements from the actions container
        this.#elements.actions.replaceChildren();

        // For each action
        buttons.forEach(button => {

            // Create a button and label
            const buttonElement = document.createElement("button");
            const labelElement = document.createElement("span");

            // Set the button classes
            buttonElement.classList.add("actions__button");
            buttonElement.classList.add("button");

            // For each class name of the action button
            button.classes.forEach(className => {

                // Add the class name to the action button
                buttonElement.classList.add(className);

            });

            // Add the button onclick action
            buttonElement.onclick = button.action;

            // Add the button label class
            labelElement.classList.add("button__label");

            // Set the button label text
            labelElement.textContent = button.label;

            // Append element
            buttonElement.append(labelElement);
            this.#elements.actions.append(buttonElement);

        });

        // Check if the dialog box is not already open
        if (!this.#open) {

            // Get the current body overflow style
            this.#overflow = window.getComputedStyle(document.body).overflow;

            // Prevent page scroll by setting the body overflow to hidden
            document.body.style.overflow = "hidden";

            // Display the dialog element
            this.#elements.dialog.style.display = "block";

            // Set the open flag to true
            this.#open = true;

        }

    }

    // ============================================================================================
    // Close the dialog box
    // ============================================================================================
    close = () => {

        const closeEvent = () => {

            // Remove the event listener
            this.#elements.dialog.removeEventListener("animationend", closeEvent);

            // Stop rendering the dialog element
            this.#elements.dialog.style.display = "none";

            // Remove the closing animation class
            this.#elements.dialog.classList.remove("dialog--closed");

            // Set the body scrolling to the state before the dialog box opened
            document.body.style.overflow = this.#overflow;

            // Set the open flag to false
            this.#open = false;

        };

        // Check if the dialog box is open
        if (this.#open) {

            // Add an event listener to the dialog element that checks if the closing animation has finished playing
            this.#elements.dialog.addEventListener("animationend", closeEvent);

            // Add the closing animation class
            this.#elements.dialog.classList.add("dialog--closed");

        }

    };

    // --------------------------------------------------------------------------------------------
    // Private

    #elements = {};
    #open = false;
    #overflow = "auto";

}

// Create a dialog instance
const dialog = new Dialog();

// Export the dialog instance
export default dialog;