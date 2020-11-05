//Объявление всех переменных
let usersAccounts, userLogin, userPassword, login, password,
firstPasswordVerify, secondPasswordVerify, div, divError,
welcomeText, reddit, loginContainer, accountsCounter, logged;
//Инициализация некоторых переменных
usersAccounts = [ /*Login*/['admin'],/*Password*/['123'] ];
logged = false;
accountsCounter = 0;
div = document.createElement('div');
divError = document.createElement('div');
welcomeText = document.querySelector('#success-text');
loginContainer = document.querySelector('.login-container');
reddit = document.getElementById('reddit');
reddit.remove();
//Проверка ввода пользователя на странице входа
function checkAccount() {
    userLogin =  document.getElementById('login-input__login').value;
    userPassword =  document.getElementById('login-input__password').value;
    divError.className = "registration-error";
    divError.innerHTML = "<span class='error'>Неправильный логин или e-mail.</span>";

    if (userLogin.length != 0 && userPassword.length != 0) {
        document.getElementById('login-button').disabled = false;
        document.getElementById('login-input__password').active = false;
    } else {
        document.getElementById('login-button').disabled = true;
    }
}
// После нажатия на кнопку "Войти" - вход в аккаунт
function loginIn() {
    if (userLogin == usersAccounts[0][accountsCounter] && userPassword == usersAccounts[1][accountsCounter]) {
        document.getElementById('login-button').disabled = false;
        logged = true;
        document.title = 'Profile page';
        loginContainer.remove();
        document.body.append(reddit);
        reddit.className = "mainPage";
        reddit.innerHTML = 'Logged';
    } else {
        document.getElementById('login-button').disabled = true;
        loginContainer.append(divError);
        setTimeout(removeError, 2500);
    }
}

function removeError() {
    divError.remove();
}
// После нажатия на кнопку "Ещё не зарегистрирован" - начало регистрации
function notRegistred() {
    document.title = 'Registration page';
        let login = document.getElementById('login-page');
        let a = document.getElementById('link');
    a.remove();
    divError.remove();

    document.querySelector('.main-text').innerHTML = 'Registration Page';
    login.innerHTML = `<input id = "registration-input__login" placeholder="example@gmail.com"><br>
    <input id = "registration-input__password-one" style="margin-top: 5px; margin-bottom: 2px;" type="password" placeholder="***********"><br>
    <input id = "registration-input__password-two" style="margin-top: 5px; margin-bottom: 2px;" type="password" placeholder="***********" oninput="checkParams()"><br>
    <input type="checkbox" id="checkbox" unchecked> <a href="https://avante.biz/wp-content/uploads/Ukraine-wallpaper-hd/Ukraine-wallpaper-hd9.jpg" class="pointer black-link" target="blank" >Мне есть 18 лет.</a><br>
    <input id="registration-button" class="pointer" type="button" value="Зарегистрироваться" onclick="addAccount()" disabled>
    <input id="comeback-button" class="pointer" type="button" value="Назад" onclick="comeBack()" style="margin-left: 2px;">`;
}
//Проверка регистрационных данных. Добавление аккаунта в локальную базу данных - cookies.
function checkParams() {
    setTimeout(notMatching, 1500);
    function notMatching() {
        if (firstPasswordVerify !== secondPasswordVerify) {
        div.innerHTML = "<span class='error'>Возможно, пароли не совпадают</span>";
        }
    }
   
    login = document.getElementById('registration-input__login').value;
    firstPasswordVerify = document.getElementById('registration-input__password-one').value;
    secondPasswordVerify = document.getElementById('registration-input__password-two').value;

    if (login.length != 0 && firstPasswordVerify.length != 0 && secondPasswordVerify.length != 0   && firstPasswordVerify === secondPasswordVerify ) {
        document.getElementById('registration-button').disabled = false;
    } 
    else {
        document.getElementById('registration-button').disabled = true;
        document.getElementById('checkbox').checked = false;
        document.body.append(div)
    }

    password = secondPasswordVerify;
    localStorage.setItem('signLogin', login);
    localStorage.setItem('signPassword', password);
        return login, password;
}

//Добавление аккаунта в массив аккаунтов.
function addAccount() {
    login = String(login);
    firstPasswordVerify = String(firstPasswordVerify);
        usersAccounts[0].push(login);
        usersAccounts[1].push(firstPasswordVerify);
        accountsCounter++;
    alert("Registration completed!");
    console.log(usersAccounts);

    document.querySelector('.main-text').innerHTML = 'Login Page';
    let loginPage = document.getElementById('login-page');
    loginPage.innerHTML = `<input type="email" id="login-input__login" placeholder="example@gmail.com"><br>
    <input id="login-input__password" type="password" placeholder="***********" oninput="checkAccount()"><br>
    <input id="login-button" type="button" value="Войти" class="pointer" onclick="loginIn()" disabled>`;
    return usersAccounts;
}

function indexPage() {
    function setUserName() {
        welcomeText.textContent = 'Welcome, ' + login;
    }

    if(!localStorage.getItem('signLogin')) {
        setUserName();
      } else {
        let storedName = localStorage.getItem('signLogin');
        welcomeText.textContent = 'Welcome, ' + storedName;
      }
}

function comeBack() {
    location.reload();
}