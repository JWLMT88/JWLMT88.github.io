const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";


async function FillInContent(){
    document.getElementById("header-profile-manager").src = requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID");
}

function SetPage(page){

    const qm = new QueryManager();
    qm.setParam("page",page);
}

function BackToMainPage(){
    const qm = new QueryManager();
    qm.deleteParam("page");
}

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}
