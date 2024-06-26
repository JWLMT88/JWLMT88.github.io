/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: header.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/



const profilePlaceholder = document.getElementById('profile-image-placeholder');
var isOutsideDropdown = false;

async function FillInContent()
{
    try
    {
        const networkManager = new JWLimitedRequestManager();
        document.getElementById("header-dropdown-username").innerText = CookieManager.getInstance().getCookie("__swp_cgb_account-username");
        document.getElementById("header-dropdown-email").innerText = CookieManager.getInstance().getCookie("__swp_cgb_account-email");
        networkManager.loadImageIntoFrame(requestURL + "content/profiles?ApiKey=" + CookieManager.getInstance().getCookie("swpKey") + "&traderID=" + CookieManager.getInstance().getCookie("profileID"),document.getElementById("header-profile-manager"));
        var blobLink = await networkManager.getImageBlobUrl(requestURL + "content/profiles?ApiKey=" + CookieManager.getInstance().getCookie("swpKey") + "&traderID=" + CookieManager.getInstance().getCookie("profileID"));
        CookieManager.getInstance().setCookie("profile-blob-uri", blobLink);
    }
    catch(ex)
    {
        console.log(ex);
    }
  }

function SetPage(page)
{
    const qm = new QueryManager();
    qm.setParam("page",page);
}

function BackToMainPage()
{
    window.location.href = "/#/"
}



function toggleDropdown() 
{
    const dropdownMenu = document.getElementById('dropdown-menu');
  if (isOutsideDropdown) 
  {
    dropdownMenu.classList.remove('show');
    isOutsideDropdown =  false;
  }
  else
  {
    dropdownMenu.classList.add('show');
    isOutsideDropdown =  true;
  }
}


