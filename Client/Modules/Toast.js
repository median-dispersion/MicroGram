class Toast {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor() {

        // Create elements
        this.#elements.toast = document.createElement("div");
        this.#elements.content = document.createElement("div");

        // Add class names
        this.#elements.toast.classList.add("toast");
        this.#elements.content.classList.add("toast__content");
        this.#elements.content.classList.add("content");

        // Append elements
        this.#elements.toast.append(this.#elements.content);
        document.body.prepend(this.#elements.toast);

    }

    // ============================================================================================
    // 
    // ============================================================================================
    open(message) {

        // Create the box element
        const boxElement = document.createElement("div");
        boxElement.classList.add("toast__box");

        // Create the message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("toast__message");
        boxElement.append(messageElement);

        // Check if the toast message has a type
        if (message.type) {

            // Create a icon element
            const iconElement = document.createElement("icon-element");
            iconElement.classList.add("toast__icon");
            iconElement.classList.add("icon");
            boxElement.prepend(iconElement);

            // Depending on the message type set the class and icon
            switch (message.type) {

                case "info": {

                    boxElement.classList.add("toast__box--info");
                    iconElement.src = "/Icons/Info.svg";
                    break;

                };

                case "success": {

                    boxElement.classList.add("toast__box--success");
                    iconElement.src = "/Icons/Success.svg";
                    break;

                };

                case "warning": {

                    boxElement.classList.add("toast__box--warning");
                    iconElement.src = "/Icons/WarningCircle.svg";
                    break;

                };

                case "error": {

                    boxElement.classList.add("toast__box--error");
                    iconElement.src = "/Icons/Error.svg";
                    break;

                };

            }

        }

        // Check if the message has a label value
        if (message.label) {

            // Create the label element
            const labelElement = document.createElement("div");
            labelElement.classList.add("toast__label");
            labelElement.textContent = message.label;
            messageElement.append(labelElement);

        }

        // Check if the message has a text value
        if (message.text) {

            // Create the text element
            const textElement = document.createElement("div");
            textElement.classList.add("toast__text");
            textElement.textContent = message.text;
            messageElement.append(textElement);

        }

        // Close the toast message
        const closeEvent = () => {

            // Check if not already closing
            if (!boxElement.classList.contains("toast__box--closed")) {

                // Set the toast box height to the current rendered height
                boxElement.style.height = `${boxElement.getBoundingClientRect().height}px`;

                // Add an animation end event listener
                boxElement.addEventListener("animationend", () => {

                    // Remove the toast message from the DOM
                    this.#elements.content.removeChild(boxElement);

                });

                // Add the animation class
                boxElement.classList.add("toast__box--closed");

            }

        };

        // Add a click event listener for closing the toast message
        boxElement.addEventListener("click", closeEvent);

        // Check if the message has a duration else default to 5 seconds
        const durationSeconds = message.durationSeconds ? message.durationSeconds : 5;

        // Add a automatic close event after the duration has passed
        let timeout = setTimeout(closeEvent, durationSeconds * 1000);

        // If the user hovers over the message remove the automatic close event
        boxElement.addEventListener("mouseover", () => { clearTimeout(timeout); });

        // If the user stops hovering over the message
        boxElement.addEventListener("mouseout", () => { 

            // Restart the automatic close event
            clearTimeout(timeout);
            timeout = setTimeout(closeEvent, durationSeconds * 1000); 

        });

        // Append the toast message box element
        this.#elements.content.append(boxElement);

    }

    // --------------------------------------------------------------------------------------------
    // Private

    #elements = {};

}

// Create a toast instance
const toast = new Toast();

// Export the toast instance
export default toast;