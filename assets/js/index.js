document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    var userEmail = document.getElementById("emailRequest").value;
    var userPassword = document.getElementById("passwordRequest").value;

    if (validateLogin(userEmail, userPassword)) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users[currentUserIndex];
        displaySuccessMessage("Bem vindo, " + user.name + "!");
        setTimeout(function () {
            window.location.href = "assets/html/main-page.html";
        }, 1500);
    } else {
        displayErrorMessage("Email ou senha incorretos.");
    }
}

var currentUserIndex = -1;

function validateLogin(email, password) {
    var users = JSON.parse(localStorage.getItem('users')) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            currentUserIndex = i;
            return true;
        }
    }

    currentUserIndex = -1;
    return false;
}

function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    errorMessageElement.style.display = 'block';
}

function displaySuccessMessage(message) {
    var successMessageElement = document.getElementById('error-message');
    successMessageElement.textContent = message;
    successMessageElement.style.color = 'green';
    successMessageElement.style.display = 'block';
}

function clearErrorMessage() {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
    errorMessageElement.style.display = 'none';
}