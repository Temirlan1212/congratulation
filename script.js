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

function onValueChange(e) {
  console.log(e);

  const value = e.target.value;
  const currentUrl = window.location.href;

  // Create a URLSearchParams object from the current URL
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);

  // Update the 'name' query parameter with the input value
  params.set("name", value);

  // Update the browser's URL without reloading the page
  window.history.pushState({}, "", `${url.pathname}?${params.toString()}`);

  // Update the share link in the popup
  const shareLinkElement = document.getElementById("shareLink");
  shareLinkElement.textContent = `Share this link: ${window.location.href}`;
  shareLinkElement.style.marginTop = "15px";
}

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

  // Update the share link inside the popup
  updateShareLink();

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
// Function to get and display the full website URL inside the popup
function updateShareLink() {
  const currentUrl = window.location.href; // Gets the full URL of the current page
  const shareLinkElement = document.getElementById("shareLink");
  shareLinkElement.textContent = `Share this link: ${currentUrl}`;
  shareLinkElement.style.marginTop = "15px";
}

// Function to copy the link to clipboard
function copyLink() {
  const currentUrl = window.location.href; // Gets the full URL of the current page

  // Use the Clipboard API to copy the link to the clipboard
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert(
        "Ссылка скопирована в буфер обмена, теперь вы можете им поделится!"
      );
    })
    .catch((error) => {
      alert("Не удалось скопировать ссылку. Попробуйте еще раз.");
    });
}

updateShareLink();

// If there's already a 'name' query parameter in the URL, display it initially
const searchParams = new URLSearchParams(window.location.search);
const nameFromURL = searchParams.get("name");
if (nameFromURL) {
  document.querySelector(".user__name").textContent = nameFromURL;
  document.getElementById("nameInput").value = nameFromURL;
}
