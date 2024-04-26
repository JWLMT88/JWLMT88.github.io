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
var pageManager = null;
var pager = null;

document.addEventListener('DOMContentLoaded', async function() 
{
  errorManager();

    if ('serviceWorker' in navigator) 
        {
        window.addEventListener('load', function() 
        {
          navigator.serviceWorker.register('/scripts/Service Worker/cache.script.js', 
          { 
            scope: '/' 
          })
            .then(function(registration) 
            {
              console.log('Service Worker Registration Successful:', registration.scope);
            })
            .catch(function(error) 
            {
              console.log('Service Worker Registration Failed:', error);
            });
        });
      } 
      else 
      {
        console.log('Service Worker is not supported in this browser.');
      }

     pager = new PageQueryManager({
        observedParams: ['page']
      });
      
      pager.addParamChangeHandler('page', (oldValue, newValue) => {
        console.log(`Page changed from ${oldValue} to ${newValue}`);
      });
      
    PostRenderer.addPost(
    {
        authorAvatar: 'https://via.placeholder.com/50',
        authorName: 'Joey West',
        userName: "admin",
        timestamp: '2 hours ago',
        postDescription: 'TEST',
        tag1: "news",
        tag2: "politics",
        tag3: "goals",
        likeCount: "200",
        pictureURI: "https://images.ctfassets.net/b4k16c7lw5ut/37pi4T16q2gUm3xhGI4Dvx/78d0ef19ab6faef492e74edce4d285dc/image1.png?w=1920&h=1080&q=50&fm=png"
    });
    
    

    if(qm.getParam("action") == "login")
    {
        CookieManager.getInstance().setCookie("swpKey",qm.getParam("key"));
        CookieManager.getInstance().setCookie("profileID",qm.getParam("usr"));

        qm.deleteParam("usr");
        qm.deleteParam("key");
        qm.deleteParam("action");

        await SetCachedProfile();
        await FillInContent();
    }
    else 
    {
        if(CookieManager.getInstance().getCookie("swpKey") == null || CookieManager.getInstance().getCookie("profileID") == null)
        {
            window.location.href = authenticationClientURI; 
        }

        await FillInContent();
        await SetCachedProfile();
    }

    if(!window.location.href.toString().includes("#"))
    {
        window.location.href ="/#/"
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    ModalManager.init();

    setTimeout(() => 
    {
        document.body.classList.add('loaded');
        setTimeout(() => 
        {
            document.body.classList.add('loaded-hidden');
           
        }, 500);
    }, 3000);
});

async function SetCachedProfile()
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("ngrok-skip-browser-warning","true");
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        header: myHeaders,
        redirect: "follow"
    };
    
    if(CookieManager.getInstance().getCookie("__chachedProfile") != "1")
    {
        await fetch(requestURL + "trader/" + CookieManager.getInstance().getCookie("profileID") + "?apiKey=" + CookieManager.getInstance().getCookie("swpKey"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              showError();
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => 
          {
            CookieManager.getInstance().setCookie("__swp_cgb_account-name", data.firstName);
            CookieManager.getInstance().setCookie("__swp_cgb_account-email", data.email);
            CookieManager.getInstance().setCookie("__swp_cgb_account-username", data.userName);
            CookieManager.getInstance().setCookie("__swp_cgb_account-civilname", data.firstName + " " + data.lastName);
            CookieManager.getInstance().setCookie("__swp_cgb_account-resident", data.location);
            CookieManager.getInstance().setCookie("__swp_cgb_account-telephone", data.phoneNumber ?? "N/A");
            CookieManager.getInstance().setCookie("__swp_cgb_account-twofa",data.twoFactorEnabled ?? "N/A")
        })
        .catch(error => 
        {
            showError(error);
            console.error(error);
        }); 

        CookieManager.getInstance().setCookie("__chachedProfile","1");
    }

    var notificationManager = NotificationManager.getInstance();
    notificationManager.addNotification('New Login!', 'We successfully logged you in, so no worry!',  "linked", "/#/");
    notificationManager.addNotification('New Follower!', 'https.marv followed you yesterday!',  "linked", "/#/@https.marv");
}

function showError(ex) 
{
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    const errorContainerex = document.getElementById("error-container-ex");
    errorContainerex.innerText = ex.Message;
}

function logoutMainUser()
{
    CookieManager.getInstance().deleteCookie("swpKey")
    CookieManager.getInstance().deleteCookie("profileID")
    window.location.href = "https://core.swapix.fun/pages/account/?action=logout"
}

function addPost()
{
    PostRenderer.addPost(
    {
        authorAvatar: 'https://via.placeholder.com/50',
        authorName: 'Joey West',
        userName: "admin",
        timestamp: '2 hours ago',
        postDescription: 'TEST',
        tag1: "news",
        tag2: "politics",
        tag3: "goals",
        likeCount: "200",
        pictureURI: "https://images.ctfassets.net/b4k16c7lw5ut/37pi4T16q2gUm3xhGI4Dvx/78d0ef19ab6faef492e74edce4d285dc/image1.png?w=1920&h=1080&q=50&fm=png"
    });
}