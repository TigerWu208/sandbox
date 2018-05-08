const api_endpoint = "https://leo-webservice.wise-paas.com/api/";
let user_id = window.localStorage.getItem("user_id");
        
if(user_id === null) {
    location.href = 'login.html';
}