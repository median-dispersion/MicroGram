export default class IconElement extends HTMLElement {

    // --------------------------------------------------------------------------------------------
    // Public

    static observedAttributes = ["src"];

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor() {

        // Call the parent constructor
        super();

    }

    // ============================================================================================
    // Connected callback
    // ============================================================================================
    connectedCallback() {

        // Check if element is not initialized
        if (!this.#initialized) {

            // Check if a source is provided
            if (this.src) {

                // Render the SVG icon
                this.#render();

            }

            // Set the initialized flag to true
            this.#initialized = true;

        }

    }

    // ============================================================================================
    // Attribute changed callback
    // ============================================================================================
    attributeChangedCallback(attribute, oldValue, newValue) {

        // Check if the element is initialized and that the src value has changed
        if (this.#initialized && attribute == "src" && newValue != oldValue) {

            // Render the SVG icon
            this.#render();

        }

    }

    // ============================================================================================
    // Source getter function
    // ============================================================================================
    get src() {

        // Return the source attribute
        return this.getAttribute("src");

    }

    // ============================================================================================
    // Source setter function
    // ============================================================================================
    set src(src) {

        // Set the source attribute
        this.setAttribute("src", src);

    }

    // --------------------------------------------------------------------------------------------
    // Private

    #initialized = false;

    // ============================================================================================
    // Render the SVG icon
    // ============================================================================================
    async #render() {

        // Try rendering the SVG icon
        try {

            // Fetch the source data
            const response = await fetch(this.src);

            // Check if the HTTP response is not 200 OK
            if (!response.ok) {

                // Throw an error
                throw new Error(`HTTP status ${response.status}!`);

            }

            // Parse the response data as text
            const text = await response.text();

            // Use the DOM parser to parse the response text as HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            // Select the SVG data from the parsed HTML
            const svg = doc.querySelector("svg");

            // Check if no SVG data was selected
            if (!svg) {

                // Throw an error
                throw new Error("No SVG data!");

            }

            // Clear out old SVG data
            this.replaceChildren();

            // Append the svg data to the element
            this.append(svg);

        // If rendering the SVG icon failed
        } catch (error) {

            // Output the error to the console
            console.error(error);

        }

    }

}