const API_URL = "http://localhost:5000/api/auth";

// ==========================
// REGISTER
// ==========================
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // Save user + token
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  return data;
};

// ==========================
// LOGIN
// ==========================
export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Save user + token
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  return data;
};

// ==========================
// LOGOUT
// ==========================
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// ==========================
// GET CURRENT USER
// ==========================
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// ==========================
// CHECK IF ADMIN
// ==========================
export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin";
};

// ==========================
// CHECK IF LOGGED IN
// ==========================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};