function DateTimezone(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
}

function getDateString(d) {
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    var day = d.getDate();
    day = (day < 10) ? '0' + day : day;
    var hour = d.getHours();
    hour = (hour < 10) ? '0' + hour : hour;
    var min = d.getMinutes();
    min = (min < 10) ? '0' + min : min;
    var sec = d.getSeconds();
    sec = (sec < 10) ? '0' + sec : sec;
    //return year+month+day+hour+min+sec;
    return year + "." + month + "." + day + "　" + hour + ":" + min + ":" + sec;
    //YYYYMMDDhhmmss
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkPermission() {
    const api_endpoint = "https://leo-webservice.wise-paas.com/api/";
    let id = window.localStorage.getItem("user_id");
    fetch(api_endpoint+'get_employee_data_by_id?id='+ id, { method: 'get' })
    .then(function(response) {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
    }).then(function(json) {
        //console.log(json);
        document.getElementById("logo").onclick = function(){
            location.href = 'index.html';
        }
        document.getElementById("myname").innerHTML = json.data.name;
        document.getElementById("account_management").href = "./personal_information.html";
        document.getElementById("logout").onclick = function(){
            localStorage.removeItem("user_id");
            location.href = 'login.html';
        }
        if(json.data.purview == "admin"){
            document.getElementById("my_function").style.display = "block";
        }else if(json.data.purview == "superadmin"){
            document.getElementById("my_function").style.display = "block";
            document.getElementById("setting_icon").style.display = "block";
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}

function checkNowFunction() {
    let url = window.location.href;
    let filename = url.split('/').pop();
    filename = filename.split('?')[0];
    console.log(filename);
    if(filename == "account_management.html" || filename == "join_employee.html" || filename == "edit_employee.html"){
        document.getElementById("employee_icon").style.backgroundColor = "#58b4c3";
    }else if(filename == "floor_management.html"){
        document.getElementById("setting_icon").style.backgroundColor = "#58b4c3";
    }
}

function setUpdatedTime() {
    document.getElementById("final_updated_time").innerHTML = "系統更新時間："+getDateString(DateTimezone(8));
}

function openMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
    // document.getElementById("my_account_view").style.backgroundColor = "#58b4c3";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#account_icon') && !event.target.matches('#myname')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                // document.getElementById("my_account_view").style.backgroundColor = "";
            }
        }
    }
}
setUpdatedTime();
setInterval(setUpdatedTime, 1000);
checkPermission();
checkNowFunction();