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
// Handle the login submit
// ================================================================================================
function handleLoginSubmit() {

    // Get the login form element
    const login = document.querySelector("#login");

    login.addEventListener("submit", async (event) => {

        // Prevent the default event
        event.preventDefault();

        // Get the form data
        const formData = Object.fromEntries(new FormData(login).entries());

        // Post the login data
        const response = await request("/API/Login", {

            method: "POST",
            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({

                "username": formData.username,
                "password": formData.password

            })

        }, false);

        // Check if the login was not successful
        if (!response.ok) {

            // Check if the response is 401 Unauthorized
            if (response.status == 401) {

                // Display a toast notification
                toast.open({

                    type: "warning",
                    label: "Failed to log in!",
                    text: "The username or password you provided is invalid.",
                    durationSeconds: 10

                });

            // If the response is a different error
            } else {

                // Get the response data
                const responseData = await response.json();

                // Display a toast notification
                toast.open({

                    type: "error",
                    label: "Failed to log in!",
                    text: `An error occurred while logging in. Response status: "${response.status}", error message: "${responseData.message}".`,
                    durationSeconds: 10

                });

            }

        // If the login was successful
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
    handleLoginSubmit();

});