const apiKey = "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"; // Replace with your OpenAI API Key

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    const messagesDiv = document.getElementById("messages");

    // Display user message
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    // Determine current day and time
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    // Define office hours: Monday-Thursday 9am-6pm, Friday 9am-5pm
    const isOfficeOpen =
        (day >= 1 && day <= 4 && hour >= 9 && hour < 18) || // Monday-Thursday
        (day === 5 && hour >= 9 && hour < 17); // Friday

    // Add after-hours message if the office is closed
    if (!isOfficeOpen) {
        messagesDiv.innerHTML += `
            <p><strong>Meadow:</strong> Although our office is currently closed, I can provide general information and guide you to the appropriate form for your requested service. If your pet has a true emergency, please contact one of our local emergency hospitals: <a href="https://www.greenwoodvethospice.com/emergency-care" target="_blank">Emergency Care</a>. What can I help you with, and how can I best support you?</p>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return;
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 150
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Display bot response
    messagesDiv.innerHTML += `<p><strong>Meadow:</strong> ${botMessage}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
