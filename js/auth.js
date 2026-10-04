const registerForm =
    document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener(
        "submit",
        function(event) {
            event.preventDefault();
            const name =
                document.getElementById("name").value;
            const email =
                document.getElementById("email").value;
            const password =
                document.getElementById("password").value;
            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];
            const existingUser =
                users.find(function(user) {
                    return user.email === email;
                });
            if (existingUser) {
                alert(
                    "Пользователь с таким email уже существует!"
                );
                return;
            }
            const newUser = {
                name: name,
                email: email,
                password: password
            };
            users.push(newUser);
            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );
            alert(
                "Регистрация прошла успешно!"
            );
            window.location.href = "login.html";
        }
    );
}
const loginForm =
    document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener(
        "submit",
        function(event) {
            event.preventDefault();
            const email =
                document.getElementById("loginEmail").value;
            const password =
                document.getElementById("loginPassword").value;
            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];
            const user =
                users.find(function(user) {
                    return (
                        user.email === email &&
                        user.password === password
                    );
                });
            if (user) {
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(user)
                );
                alert(
                    "Вы успешно вошли!"
                );
                window.location.href =
                    "profile.html";
            } else {
                alert(
                    "Неверный email или пароль!"
                );
            }
        }
    );
}

const savedUser =
    localStorage.getItem("currentUser");
if (savedUser) {
    const user =
        JSON.parse(savedUser);
    const profileName =
        document.getElementById("profileName");
    const profileEmail =
        document.getElementById("profileEmail");
    if (profileName) {
        profileName.textContent =
            user.name;
    }
    if (profileEmail) {
        profileEmail.textContent =
            user.email;
    }
}
const logoutButton =
    document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener(
        "click",
        function() {
            localStorage.removeItem(
                "currentUser"
            );
            alert(
                "Вы вышли из аккаунта."
            );
            window.location.href =
                "index.html";
        }
    );
}