let currentUser = null;

// Auto-login if remembered
window.onload = function () {
  const rememberedUser = localStorage.getItem("currentUser");
  if (rememberedUser) {
    currentUser = rememberedUser;
    document.getElementById("authSection").style.display = "none";
    document.getElementById("mainSection").style.display = "block";
  }
};

// Sign Up
function signUp() {
  const user = document.getElementById("signupUsername").value;
  const pass = document.getElementById("signupPassword").value;

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[user]) {
    alert("User already exists. Please login.");
    return;
  }

  storedUsers[user] = pass;
  localStorage.setItem("users", JSON.stringify(storedUsers));
  alert("Signup successful! Please login.");
  document.getElementById("signupUsername").value = "";
  document.getElementById("signupPassword").value = "";
}

// Login
function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;

  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[user] === pass) {
    currentUser = user;
    if (remember) {
      localStorage.setItem("currentUser", user);
    }
    alert("Login successful!");
    document.getElementById("authSection").style.display = "none";
    document.getElementById("mainSection").style.display = "block";
  } else {
    alert("Invalid credentials.");
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;
  document.getElementById("mainSection").style.display = "none";
  document.getElementById("authSection").style.display = "block";
}
function addPatient() {
  if (!currentUser) {
    alert("Please log in.");
    return;
  }

  const name = document.getElementById("patientName").value;
  const age = document.getElementById("patientAge").value;
  const gender = document.getElementById("patientGender").value;
  const address = document.getElementById("patientAddress").value;
  const phone = document.getElementById("patientPhone").value;
  const symptoms = document.getElementById("patientSymptoms").value;

  if (!name || !age || !gender || !address || !phone || !symptoms) {
    alert("Please fill out all patient details.");
    return;
  }

  const patient = {
    name, age, gender, address, phone, symptoms,
    addedBy: currentUser,
    time: new Date().toLocaleString()
  };

  let allPatients = JSON.parse(localStorage.getItem("patients")) || [];
  allPatients.push(patient);
  localStorage.setItem("patients", JSON.stringify(allPatients));

  alert("Patient added!");
  document.getElementById("patientName").value = "";
  document.getElementById("patientAge").value = "";
  document.getElementById("patientGender").value = "";
  document.getElementById("patientAddress").value = "";
  document.getElementById("patientPhone").value = "";
  document.getElementById("patientSymptoms").value = "";
}

function showPatients() {
  const patientList = document.getElementById("patientList");
  const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
  const userPatients = allPatients.filter(p => p.addedBy === currentUser);

  if (userPatients.length === 0) {
    patientList.innerHTML = "<p>No patients added yet.</p>";
    return;
  }

  let html = "<h3>Patient List:</h3><ul>";
  userPatients.forEach((p, index) => {
    html += `<li>
      <strong>${index + 1}. ${p.name}</strong><br>
      Age: ${p.age}, Gender: ${p.gender}<br>
      Address: ${p.address}<br>
      Phone: ${p.phone}<br>
      Symptoms: ${p.symptoms}<br>
      Added On: ${p.time}
    </li><br>`;
  });
  html += "</ul>";

  patientList.innerHTML = html;
}
