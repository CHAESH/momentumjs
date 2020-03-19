// Select the Elements
const clear = document.querySelector(".clear");
const dateElem = document.getElementById("date");

// clear the local storage
function handleClear(event)
{
    localStorage.clear();
    location.reload();
}

// show today date
function getDate()
{
    const today = new Date();
    const options = {month: "long", day: "numeric", weekday: "short"};
    dateElem.innerHTML = today.toLocaleDateString("en-US", options);
}

function init()
{
    getDate();
    clear.addEventListener("click", handleClear);
}
init();

