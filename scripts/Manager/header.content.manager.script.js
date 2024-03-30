const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";
const profilePlaceholder = document.getElementById('profile-image-placeholder');
var isOutsideDropdown = false;

async function FillInContent(){
    document.getElementById("header-dropdown-username").innerText = getCookie("__swp_cgb_account-username");
    document.getElementById("header-dropdown-email").innerText = getCookie("__swp_cgb_account-email");
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
    const dropdownMenu = document.getElementById('dropdown-menu');
  if (isOutsideDropdown) {
    dropdownMenu.classList.remove('show');
    isOutsideDropdown =  false;
  }
  else{
    dropdownMenu.classList.add('show');
    isOutsideDropdown =  true;
  }
}


