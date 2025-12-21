let darkmode = localStorage.getItem("darkmode");
const themeButton = document.getElementById("theme-button");

const enableDarkMode = () => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("darkmode", "enabled");
    darkmode = "enabled";
}

const disableDarkMode = () => {
    document.body.classList.remove("dark-theme");
    localStorage.removeItem("darkmode");
    darkmode = null;
}

if (darkmode === "enabled") {
    enableDarkMode();
}

themeButton.addEventListener("click", function() {
    darkmode !== "enabled" ? enableDarkMode() : disableDarkMode();
})