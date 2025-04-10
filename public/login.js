
const yesorno = document.getElementById("yesorno")
function login_user(){
    yesorno.innerHTML = ""
    fetch("login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": $('#username').val(),
            "password": $('#pass').val()
        })
    })
    .then(response => {
        if (response.status === 409) {
            yesorno.style.color = "#FF0000"
            yesorno.innerHTML = "Invalid credentials"
        }
        if (response.status === 201) {
            console.log("Logged in.")
            localStorage.setItem('username', $('#username').val());
            window.location.href = "/chat.html";
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There was a problem with your fetch operation:', error))
}