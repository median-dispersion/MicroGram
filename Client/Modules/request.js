export default async function request(url, options = {}, redirect = true) {

    // Make the request
    const response = await fetch(url, options);

    // Check if automatic redirection is enabled
    if (redirect) {

        // Check if the response is unauthorized
        if (response.status == 401) {

            // Change window location to the login page
            window.location.href = "/Pages/Login";

        }

    }

    // Return the response
    return response;

}