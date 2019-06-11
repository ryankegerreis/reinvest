let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");



document.addEventListener(
  "DOMContentLoaded",
  () => {
  },
  false
);

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});
