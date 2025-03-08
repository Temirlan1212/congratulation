window.onload = () => {
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

// Function to close the menu when clicking outside
function closeMenuOnOutsideClick(event) {
  const burger = document.querySelector(".burger-menu");
  const popup = document.querySelector(".popup");

  if (!burger.contains(event.target) && !popup.contains(event.target)) {
    burger.classList.remove("active");
    popup.classList.remove("active");
  }
}

// Add event listener for clicks outside the menu
document.addEventListener("click", closeMenuOnOutsideClick);

// Function to update the name and description
function updateFields() {
  const nameInput = document.getElementById("nameInput");
  const descriptionInput = document.getElementById("descriptionInput");

  const nameElement = document.querySelector(".congratulation__name");
  const descriptionElement = document.querySelector(
    ".congratulation__description"
  );

  const newName = nameInput.value.trim();
  const newDescription = descriptionInput.value.trim();

  if (newName) {
    nameElement.textContent = newName;
  }
  if (newDescription) {
    descriptionElement.textContent = newDescription;
  }

  // Update URL parameters
  const params = new URLSearchParams(window.location.search);
  params.set("name", newName);
  params.set("title", newDescription);
  window.history.pushState({}, "", "?" + params.toString());

  // Close the popup
  toggleMenu();
}

let timeoutId;

function updateAndSave() {
  updateFields();

  clearTimeout(timeoutId);

  // Set a timeout to copy the link
  timeoutId = setTimeout(() => {
    copyLink();
  }, 500);
}

// Function to copy the link to clipboard
function copyLink(showAlert = true) {
  const currentUrl = window.location.href;

  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      if (!showAlert) return;
      alert(
        "Ссылка скопирована в буфер обмена, теперь вы можете им поделиться!"
      );
    })
    .catch(() => {
      if (!showAlert) return;
      alert("Не удалось скопировать ссылку. Попробуйте еще раз.");
    });
}

// Load values from URL if available
const searchParams = new URLSearchParams(window.location.search);
const nameFromURL = searchParams.get("name");
const descriptionFromURL = searchParams.get("title");

if (nameFromURL) {
  document.querySelector(".congratulation__name").textContent = nameFromURL;
  document.getElementById("nameInput").value = nameFromURL;
}

if (descriptionFromURL) {
  document.querySelector(".congratulation__description").textContent =
    descriptionFromURL;
  document.getElementById("descriptionInput").value = descriptionFromURL;
}
