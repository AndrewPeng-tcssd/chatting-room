function register_user(){
    const url = 'http://localhost:3000/register'
    fetch(url, {
        method: POST,
        body:json({"username": , "password": })
    })
    .then(response => response.json())
    .then(data => console.log(data))
}
