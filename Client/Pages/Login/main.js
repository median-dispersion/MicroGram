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
        const response = await fetch("/API/Login", {

            method: "POST",
            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({

                "username": formData.username,
                "password": formData.password

            })

        });

        // Check if the login was successful
        if (response.ok) {

            // Go back to the main page
            window.location.href = "/";

        } else {

            // Get the response data
            const responseData = await response.json();

            console.error(responseData);

        }

    });

}

// ================================================================================================
// Main
// ================================================================================================
document.addEventListener("DOMContentLoaded", () => {

    handleLoginSubmit();

});