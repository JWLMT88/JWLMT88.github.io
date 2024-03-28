const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";

async function FillInContent(){
    document.getElementById("header-profile-manager").src = requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID");
}