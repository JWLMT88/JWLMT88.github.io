/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: startup.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

const qm = new QueryManager();
var pager = null;

document.addEventListener('DOMContentLoaded', async function() 
{
     pager = new PageQueryManager({
        observedParams: ['page']
      });
      
      pager.addParamChangeHandler('page', (oldValue, newValue) => {
        console.log(`Page changed from ${oldValue} to ${newValue}`);
      });
      
      PostRenderer.addPost({
        authorAvatar: 'https://via.placeholder.com/50',
        authorName: 'John Doe',
        timestamp: '2 hours ago',
        postDescription: 'TEST',
        tag1: "news",
        tag2: "politics",
        tag2: "goals"
    });
    
    

    if(qm.getParam("action") == "login")
    {
        setCookie("swpKey",qm.getParam("key"));
        setCookie("profileID",qm.getParam("usr"));

        qm.deleteParam("usr");
        qm.deleteParam("key");
        qm.deleteParam("action");

        await SetCachedProfile();
        await FillInContent();
        setTimeout(() => 
        {
            document.body.classList.add('loaded');
            setTimeout(() => 
            {
                document.body.classList.add('loaded-hidden');
               
            }, 500);
        }, 2000);


    }
    else 
    {
        if(getCookie("swpKey") == null || getCookie("profileID") == null){
            window.location.href = "https://core.swapix.fun/pages/v2/auth/?referal=web-app&action=login&key=webApp"; 
        }

        await FillInContent();
        await SetCachedProfile();

        setTimeout(() => 
        {
            document.body.classList.add('loaded');
            setTimeout(() => 
            {
                document.body.classList.add('loaded-hidden');
             
            }, 500);
        }, 200);
    }

    
});

async function SetCachedProfile(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("content-type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        header: myHeaders,
        redirect: "follow"
    };

    await fetch(requestURL + "trader/" + getCookie("profileID") + "?apiKey=" + getCookie("swpKey"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              showError();
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {
            
            setCookie("__swp_cgb_account-name", data.firstName);
            setCookie("__swp_cgb_account-email", data.email);
            setCookie("__swp_cgb_account-username", data.userName);
            setCookie("__swp_cgb_account-civilname", data.firstName + " " + data.lastName);
            setCookie("__swp_cgb_account-resident", data.location);
            setCookie("__swp_cgb_account-telephone", data.phoneNumber ?? "N/A");
            setCookie("__swp_cgb_account-twofa",data.twoFactorEnabled ?? "N/A")
        })
        .catch(error => {
            showError(error);
            console.error(error);
        }); 
}

function showError(ex) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    const errorContainerex = document.getElementById("error-container-ex");
    errorContainerex.innerText = ex.Message;
}

function logoutMainUser(){
    deleteCookie("swpKey")
    deleteCookie("profileID")
    window.location.href = "https://core.swapix.fun/pages/account/?action=logout"
}

function addPost(){
    PostRenderer.addPost({
        authorAvatar: 'https://via.placeholder.com/50',
        authorName: 'Jane Smith',
        timestamp: '1 hour ago',
        content: 'This is another sample post.',
        postDescription: 'This is another sample post.',
        tag1: "news",
        tag2: "politics",
        tag2: "goals"
    });
}