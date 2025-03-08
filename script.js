onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

// Function to toggle the burger menu and popup visibility
function toggleMenu() {
  const burger = document.querySelector(".burger-menu");
  const popup = document.querySelector(".popup");

  // Toggle active class for burger menu
  burger.classList.toggle("active");

  // Toggle popup visibility
  popup.classList.toggle("active");
}

// Function to close the menu and popup when clicked outside
function closeMenuOnOutsideClick(event) {
  const burger = document.querySelector(".burger-menu");
  const popup = document.querySelector(".popup");

  // Check if the click was outside the burger menu or popup
  if (!burger.contains(event.target) && !popup.contains(event.target)) {
    // If clicked outside, close the menu and popup
    burger.classList.remove("active");
    popup.classList.remove("active");
  }
}

// Add event listener for clicks outside the menu and popup
document.addEventListener("click", closeMenuOnOutsideClick);

// Function to update the name based on input
function updateName() {
  const nameInput = document.getElementById("nameInput");
  const userNameElement = document.querySelector(".user__name");

  // Get the name from the input and update the display
  const newName = nameInput.value;
  if (newName) {
    userNameElement.textContent = newName;
  }

  // Optionally, update the URL (query parameter)
  const currentSearchParams = new URLSearchParams(window.location.search);
  currentSearchParams.set("name", newName);
  window.history.pushState({}, "", "?" + currentSearchParams.toString());

  // Close the popup
  toggleMenu();
}

let timeoutId;

function updateAndSave() {
  updateName();

  clearTimeout(timeoutId);

  // Set a timeout for the copyLink function
  timeoutId = setTimeout(() => {
    copyLink();
  }, 500);
}

// Function to copy the link to clipboard
function copyLink() {
  const currentUrl = window.location.href; // Gets the full URL of the current page

  // Use the Clipboard API to copy the link to the clipboard
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert(
        "Ссылка скопирована в буфер обмена, теперь вы можете им поделиться!"
      );
    })
    .catch((error) => {
      alert("Не удалось скопировать ссылку. Попробуйте еще раз.");
    });
}

// If there's already a 'name' query parameter in the URL, display it initially
const searchParams = new URLSearchParams(window.location.search);
const nameFromURL = searchParams.get("name");
if (nameFromURL) {
  document.querySelector(".user__name").textContent = nameFromURL;
  document.getElementById("nameInput").value = nameFromURL;
}
