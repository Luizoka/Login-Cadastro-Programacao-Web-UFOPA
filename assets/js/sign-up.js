document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    var Registername = document.getElementById('nameRequest').value;
    var Registeremail = document.getElementById('emailRequest').value;
    var Registerpassword = document.getElementById('passwordRequest').value;
    var RegisterpasswordConfirm = document.getElementById('passwordConfirmationRequest').value;

    clearErrorMessage();

    if (isEmailRegistered(Registeremail)) {
        displayErrorMessage("Este e-mail já está cadastrado.");
        return;
    }

    if (validateForm(Registeremail, Registerpassword, RegisterpasswordConfirm)) {
        displaySuccessMessage("Seu Registro foi concluído");
        saveUser(Registername, Registeremail, Registerpassword);
        document.getElementById('register-form').reset();
    }
}

function validateForm(email, password, confirmpassword) {
    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);
    var isPasswordConfirmValid = validatePasswordConfirm(password, confirmpassword);

    if (!isPasswordValid) {
        displayErrorMessage("Sua senha está incorreta. A senha deve ter pelo menos 8 caracteres e incluir pelo menos uma letra maiúscula.");
    }

    if (!isEmailValid) {
        displayErrorMessage("Seu email está incorreto");
    }

    if (!isPasswordConfirmValid) {
        displayErrorMessage("As senhas não coincidem");
    }

    return isEmailValid && isPasswordValid && isPasswordConfirmValid;
}

function validateEmail(email) {
    var emailRegex = /^(\w|\n)+@[\w]+\.[\w]+$/m;
    return emailRegex.test(email);
}

function isEmailRegistered(email) {
    var users = JSON.parse(localStorage.getItem('users')) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }

    return false;
}

function validatePassword(password) {
    var passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

function validatePasswordConfirm(password, confirmpassword) {
    return password === confirmpassword;
}

function saveUser(name, email, password) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = {
        name: name,
        email: email,
        password: password
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(user)
}

function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    errorMessageElement.style.display = 'block';
}

function clearErrorMessage() {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
    errorMessageElement.style.display = 'none';
}

function displaySuccessMessage(message) {
    var successMessageElement = document.getElementById('error-message');
    successMessageElement.textContent = message;
    successMessageElement.style.color = 'green';
    successMessageElement.style.display = 'block';
}

function getUsers() {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

function clearUsers() {
    localStorage.removeItem('users');
}