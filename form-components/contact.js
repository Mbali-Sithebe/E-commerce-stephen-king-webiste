//1. Form Validation and Submission

// Grabbing form input elements
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const marketingCheckbox = document.getElementById("marketing-permission");
const form = document.getElementById("form");

// Adding event listener for form submission
form.addEventListener("submit", (e) => {
  let messages = [];

  // Validate First Name
  if (fname.value === "" || fname.value == null) {
    messages.push("First name is required");
  }

  // Validate Last Name
  if (lname.value === "" || lname.value == null) {
    messages.push("Last name is required");
  }

  // Validate Email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    messages.push("Please enter a valid email address");
  }

  // Validate Message Length (must be between 10 and 500 characters)
  if (subject.value.length < 5 || subject.value.length > 100) {
    messages.push("Message must be between 5 and 10 characters");
  }

  // Validate Marketing Checkbox
  if (!marketingCheckbox.checked) {
    messages.push("You must consent to the marketing permission");
  }

  // If there are validation errors, prevent form submission and show pop-up once
  if (messages.length > 0) {
    e.preventDefault(); // Prevent the form from submitting
    alert(messages.join("\n")); // Show errors in a pop-up once
  } else {
    // If no validation errors, alert success message
    alert("Form submitted successfully!");
    // Allow the form to proceed and submit
  }
});
