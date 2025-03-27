const created = document.getElementById("createdornot")
function register_user(){
    created.innerHTML = ""
    fetch("register", {
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
            console.log("user exists")
            created.style.color = "#FF0000"
            created.innerHTML = "User already exists!"
        }
        if (response.status === 201) {
            console.log("User created.")
            created.style.color = "#7CFC00"
            created.innerHTML = "User created!"

        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There was a problem with your fetch operation:', error))
}
