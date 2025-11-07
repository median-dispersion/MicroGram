import request from "../../Modules/request.js";
import toast from "../../Modules/Toast.js";

// ================================================================================================
// Get the login status
// ================================================================================================
async function getLoginStatus() {

    // Test the login state by requesting the name of the user
    const response = await request("/API/User/Name", {}, false);

    // If the user is already logged in
    if (response.ok) {

        // Go back to the main page
        window.location.href = "/";

    }

}

// ================================================================================================
// Set the height unit symbol
// ================================================================================================
async function getHeightSymbol(uuid) {

    // Get the unit based on the UUID
    const response = await request(`/API/Units/${uuid}`);

    // Parse the response as JSON
    const unit = await response.json();

    // Get the height unit elements
    const unitElement = document.querySelector("[name='height']").parentElement.querySelector(".card__unit");

    // Set the unit symbol attribute
    unitElement.setAttribute("symbol", unit.symbol);

}

// ================================================================================================
// Get all mass units for the select element
// ================================================================================================
async function getMassUnits() {

    // Get all mass units
    const response = await request("/API/Units/Mass");

    // Parse the response as JSON
    const units = await response.json();

    // Get the mass unit select element
    const selectElement = document.querySelector("[name='massUnit']");

    // For each mass unit
    units.forEach(unit => {

        // Create an options element
        const optionElement = document.createElement("option");

        // Set the option properties
        optionElement.value = unit.uuid;
        optionElement.textContent = unit.name;

        // Append the option element
        selectElement.append(optionElement);

    });

}

// ================================================================================================
// Get all length units for the select element
// ================================================================================================
async function getLengthUnits() {

    // Get all length units
    const response = await request("/API/Units/Length");

    // Parse the response as JSON
    const units = await response.json();

    // Get the length unit select element
    const selectElement = document.querySelector("[name='lengthUnit']");

    // For each length unit
    units.forEach(unit => {

        // Create an options element
        const optionElement = document.createElement("option");

        // Set the option properties
        optionElement.value = unit.uuid;
        optionElement.textContent = unit.name;

        // Append the option element
        selectElement.append(optionElement);

    });

    // Add a change event listener
    selectElement.addEventListener("change", (event) => {

        // Get the unit symbol for the height field based on the selected length unit
        getHeightSymbol(event.target.value);

    });

    // Set the height unit symbol to the first unit
    getHeightSymbol(units[0].uuid);

}

// ================================================================================================
// Handle password confirmation
// ================================================================================================
function handlePasswordConfirmation() {

    // Get the password and password confirmation element
    const password = document.querySelector("[name='password']");
    const passwordConfirmation = document.querySelector("[name='passwordConfirmation']");

    // Add a change event listener to the password confirmation element
    passwordConfirmation.addEventListener("change", () => {

        // Check if the password and password confirmation value do not match
        if (password.value != passwordConfirmation.value) {

            // Clear out the password confirmation value
            passwordConfirmation.value = "";

        }

    });

}

// ================================================================================================
// Handle the signup submit
// ================================================================================================
function handleSignupSubmit() {

    // Get the signup form by its ID
    const signup = document.querySelector("#signup");

    // Add a submit event listener
    signup.addEventListener("submit", async (event) => {

        // Prevent the default event
        event.preventDefault();

        // Get the form data
        const formData = Object.fromEntries(new FormData(signup).entries());

        // Post signup data
        const response = await request("/API/Signup", {

            method: "POST",
            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({

                "name": formData.name,
                "username": formData.username,
                "password": formData.password,
                "massUnit": formData.massUnit,
                "lengthUnit": formData.lengthUnit,
                "height": parseFloat(formData.height)

            })

        }, false);

        // Check if the response is not 200 OK
        if (!response.ok) {

            // Check if the response is 409 Conflict
            if (response.status == 409) {

                // Display a toast notification
                toast.open({

                    type: "warning",
                    label: "Failed to sign up!",
                    text: "The username you chose is already in use.",
                    durationSeconds: 10

                });

            // If the response is a different error
            } else {

                // Get the response data
                const responseData = await response.json();

                // Display a toast notification
                toast.open({

                    type: "error",
                    label: "Failed to sign up!",
                    text: `An error occurred while signing up. Response status: "${response.status}", error message: "${responseData.message}".`,
                    durationSeconds: 10

                });

            }

        // If the response was 200 OK
        } else {

            // Go back to the main page
            window.location.href = "/";

        }

    });

}

// ================================================================================================
// Main
// ================================================================================================
document.addEventListener("DOMContentLoaded", () => {

    getLoginStatus();
    getMassUnits();
    getLengthUnits();
    handlePasswordConfirmation();
    handleSignupSubmit();

});