
function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    const chatContainer = document.getElementById("chatContainer");
    const userMessage = document.createElement("p");
    userMessage.innerText = `You: ${userInput}`;
    chatContainer.appendChild(userMessage);

    fetch(`/api/chat?message=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
            const chatResponse = document.createElement("p");
            chatResponse.innerText = `AgroMinds: ${data.message}`;
            chatContainer.appendChild(chatResponse);
        })
        .catch(error => console.error("Error fetching data:", error));

    document.getElementById("userInput").value = "";
}
