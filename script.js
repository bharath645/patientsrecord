let users = {};
let currentUser = null;
let patients = [];

function signUp() {
  const user = document.getElementById("signupUsername").value;
  const pass = document.getElementById("signupPassword").value;
  if (user && pass) {
    users[user] = pass;
    alert("Signup successful! Please login.");
  }
}

function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  if (users[user] === pass) {
    currentUser = user;
    document.getElementById("authSection").style.display = "none";
    document.getElementById("mainSection").style.display = "block";
  } else {
    alert("Invalid credentials");
  }
}

function showPatientForm() {
  document.getElementById("patientForm").style.display = "block";
  document.getElementById("patientList").innerHTML = "";
}

function addPatient() {
  const patient = {
    name: document.getElementById("pName").value,
    age: document.getElementById("pAge").value,
    gender: document.getElementById("pGender").value,
    address: document.getElementById("pAddress").value,
    phone: document.getElementById("pPhone").value,
    symptoms: document.getElementById("pSymptoms").value,
  };

  if (Object.values(patient).some(val => val === "")) {
    alert("Please fill all fields.");
    return;
  }

  patients.push(patient);
  alert("Patient added successfully!");
  document.getElementById("patientForm").reset();
  document.getElementById("patientForm").style.display = "none";
}

function listPatients() {
  const listDiv = document.getElementById("patientList");
  listDiv.innerHTML = "<h3>Patients List</h3>";

  if (patients.length === 0) {
    listDiv.innerHTML += "<p>No patients found.</p>";
    return;
  }

  patients.forEach((p, index) => {
    listDiv.innerHTML += `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
        <strong>${index + 1}. ${p.name}</strong><br/>
        Age: ${p.age}, Gender: ${p.gender}<br/>
        Address: ${p.address}<br/>
        Phone: ${p.phone}<br/>
        Symptoms: ${p.symptoms}
      </div>
    `;
  });
}
