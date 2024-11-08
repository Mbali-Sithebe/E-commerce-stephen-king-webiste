//This is a Java Script for Homepage

//1. Sticky Navigation Bar Color Transaction

document.addEventListener("scroll", () => {
  const navbarContainer = document.querySelector("#navbar_container");

  if (window.scrollY > 0) {
    navbarContainer.classList.add("scrolled");
  } else {
    navbarContainer.classList.remove("scrolled");
  }
});

//2. Activating Navigation Bar

//3. Animation Triggers (Stephen Intro)
document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".intro h1");

  setTimeout(() => {
    heading.style.opacity = "1";
    heading.style.transform = "translateY(0)";
  }, 100);
});
