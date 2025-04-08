document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const authBtn = document.getElementById("authBtn");
  const welcomeMsg = document.getElementById("welcomeMsg");

  // SIGNUP LOGIC
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.querySelector(".name").value.trim();
      const username = document.querySelector(".username").value.trim();
      const email = document.querySelector(".email").value.trim();
      const password = document.querySelector(".password").value.trim();
      const cPassword = document.querySelector(".cPassword").value.trim();

      if (password !== cPassword) {
        alert("Passwords do not match!");
        return;
      }

      const user = { name, username, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    });
  }

  // LOGIN LOGIC
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.querySelector(".email").value.trim();
      const password = document.querySelector(".password").value.trim();

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      // ✅ Restore cart for this user
      const savedCart = JSON.parse(localStorage.getItem(`cart_${storedUser.email}`)) || [];
      localStorage.setItem("cart", JSON.stringify(savedCart));

      alert("Login successful!");
      window.location.href = "index.html";
    });
  }

  // INDEX PAGE LOGIC
  if (authBtn) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    authBtn.onclick = () => {
      if (isLoggedIn && user) {
        // ✅ Save current cart for this user before logout
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));

        // ✅ Clear session and cart
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("cart");

        // ✅ Reload page (cart count will reset via loadCart())
        location.reload();
      } else {
        // Redirect to login
        window.location.href = "login.html";
      }
    };

    // Update UI
    if (isLoggedIn && user) {
      authBtn.textContent = "Logout";
      welcomeMsg.textContent = `Welcome, ${user.name}!`;
    } else {
      authBtn.textContent = "Login";
      welcomeMsg.textContent = "";
    }
  }
});
