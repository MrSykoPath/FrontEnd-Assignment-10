var error = document.getElementById("error");
var list = localStorage.getItem("Users")?JSON.parse(localStorage.getItem("Users")):[];

function Register(event){
    var Name = document.getElementById("name")? document.getElementById("name").value:"";
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    event.preventDefault();
    console.log(Name);
    console.log(email);
    console.log(password);
    var name_regex = new RegExp("^[A-Za-z]{3,}([ '-][A-Za-z]{3,})*$");
    if(!name_regex.test(Name)){
        error.innerHTML = "Name should be atleast 3 characters long";
        return false;
    }
    var email_regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    if(!email_regex.test(email)){
        error.innerHTML = "Email should be in the correct format"
        return false;
    }
    var password_regex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$");
    if(!password_regex.test(password)){
        error.innerHTML = "Password should be atleast 8 characters long and should contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character";
        return false;
    }
    if(list.find(x => x.email == email)){
        if(error.classList.contains("text-success")){
            error.classList.replace("text-success","text-danger");
        }
        error.innerHTML = "Email already exists";
        return false;
    }

    list.push({name:Name,email:email,password:password});
    localStorage.setItem("Users",JSON.stringify(list));
    error.classList.replace("text-danger","text-success");
    error.innerHTML = "Registration Successful";
}

function Login(event) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = list.find(x => x.email == email).name;
    event.preventDefault();
    console.log(email);

    if (!(list.find(x => (x.email == email && x.password == password)))) {
        error.innerHTML = "Email not found or password is incorrect";
        error.classList.replace("text-success", "text-danger");
        return false;
    } else {
        error.classList.replace("text-danger", "text-success");
        error.innerHTML = "Login Successful";
        
        setTimeout(function() {
            window.location.href = "success.html?name=" + name;
        }, 2000);
        
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var url = new URL(window.location.href);
    var name = url.searchParams.get("name");
    document.getElementById("user").innerHTML += name;
});
    