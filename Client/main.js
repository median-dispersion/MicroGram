import request from "./Modules/request.js";

// ================================================================================================
// Get the name of the user
// ================================================================================================
async function getName() {

    // Get the name of the user
    const response = await request("/API/User/Name");

    // Get the response data
    const data = await response.json();

    // Check if the response was 200 OK
    if (response.ok) {

        // Change the header label to the name of the user
        document.querySelector(".header__label").textContent = data.name;

    }

}

// ================================================================================================
// Main
// ================================================================================================
document.addEventListener("DOMContentLoaded", () => {

    getName();

});