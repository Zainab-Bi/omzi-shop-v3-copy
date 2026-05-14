console.log("auth.js loaded");
function signup() {
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  console.log("signup clicked", email, password);

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({
    email: email,
    password: password
  }));

  alert("Signup successful!");
} 
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user")) || null;

  // ADMIN LOGIN
  if (email === "admin@omzi.com" && password === "1234") {

    const adminUser = {
      email,
      role: "admin"
    };

    localStorage.setItem("loggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(adminUser));

    alert("Admin login successful!");
    window.location.href = "index.html";
    return;
  }

  // USER LOGIN
  if (savedUser && email === savedUser.email && password === savedUser.password) {

    localStorage.setItem("loggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(savedUser));

    alert("Login successful!");
    window.location.href = "index.html";

  } else {
    alert("Invalid credentials");
  }
}