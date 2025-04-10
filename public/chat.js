const text = document.getElementById("messages");

// Helper function to display a message in the UI
function displayMessage(msg) {
  text.innerHTML += `\n${msg.username} : ${msg.message}`;
}

// Helper function to check if a given message is already in the stored history
function messageExists(history, msg) {
  return history.some(h => h.username === msg.username && h.message === msg.message);
}

// Function to post a new message to the server
function post_message(){
  fetch("messages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": typeof localStorage.username==="undefined" ? "Anonymous": localStorage.username,
      "message": $('#message').val()
    })
  })
  .then(response => {
    if (response.status === 200) {
      console.log("message sent.");
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There was a problem with your fetch operation:', error));
}

// Function to connect to server-sent events (SSE)
function connectToServerEvents() {
  const eventSource = new EventSource('/events');

  eventSource.onmessage = (event) => {
    // Parse the JSON from the event
    const messages = JSON.parse(event.data);
    console.log(messages);

    // Get current chat history from localStorage or initialize an empty array
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

    // Loop over each received message and only add new ones
    messages.forEach((msg) => {
      if (!messageExists(chatHistory, msg)) {
        displayMessage(msg);
        chatHistory.push(msg);
      }
    });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  };

  // Handle errors (e.g. if the server disconnects)
  eventSource.onerror = (err) => {
    console.error('EventSource failed:', err);
    eventSource.close();
  };
}

// On page load, first load saved messages then set up the SSE connection
window.addEventListener('DOMContentLoaded', () => {
  // Load stored messages from localStorage and display them
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.forEach((msg) => {
    displayMessage(msg);
  });

  // Connect to SSE for new messages
  connectToServerEvents();
});
