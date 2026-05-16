const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch('https://portfolio-website-135t.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        // Check if request succeeded
        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        alert(data.message || "Message sent successfully");

        // Reset form
        form.reset();

    } catch (error) {

        console.error("Error:", error);

        alert("Error sending message");
    }
});