//This is a Java Script for About the Author Page

//1. Read More Button = Open Author's Bio
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButton = document.querySelector(".Btn");

  if (readMoreButton) {
    readMoreButton.addEventListener("click", function () {
      window.location.href = "bio.html";
    });
  }
});

//2. Animation Triggers (Number Calculator Stats) from YouTube

// Function to animate the counter
function animateCounter(element, start, end, step, duration) {
  let current = start;
  const increment = step;
  const totalSteps = Math.ceil((end - start) / step);
  const interval = duration / totalSteps;

  const counter = setInterval(() => {
    current += increment;

    // Ensure the counter does not exceed the end value
    if (current > end) {
      current = end;
    }

    element.innerText = current + " +"; // Update the text content with the current value

    // Stop the animation when target is reached
    if (current === end) {
      clearInterval(counter);
    }
  }, interval);
}

// Function to run the counter animation
function runCounterAnimation() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    animateCounter(counter, 0, target, 2, 4000);
  });
}

// Trigger the animation when the page is loaded
window.onload = function () {
  runCounterAnimation();
};
