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
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);

  const loginModal = document.getElementById("loginModal");
  const body = document.body;
  const loginButton = document.getElementById("loginSubmit");
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const apiKeySettings = document.getElementById("apiKeyDisplay");
  const darkModeToggleSettings = document.getElementById('darkModeToggleSettings');
  const buddyActivatedSettings = document.getElementById("settingBuddyActivated");
  const swapixBuddyButton = document.getElementById("chat-btn");

  if(localStorage.getItem("swapixBuddy") != "denied")
  {
    buddyActivatedSettings.checked = true;
    localStorage.setItem("swapixBuddy","activated");
  }

  settingsBtn.addEventListener('click', function () {
    settingsModal.classList.remove('animate-out')
    settingsModal.classList.add('animation-slidein')
    
    settingsModal.classList.remove('hidden');
    showTab('general');
  });

  saveSettingsBtn.addEventListener('click', function () {
    settingsModal.classList.remove('animation-slidein')
    settingsModal.classList.add('animate-out')
    setTimeout(() =>{settingsModal.classList.add('hidden');},500)
    
  });

  apiKeySettings.innerText = localStorage.getItem("swpKey");

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        const tab = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-button').forEach(tab =>{
            tab.classList.remove("bg-gray-200")
        })

        button.classList.add("bg-gray-200")
        showTab(tab);
    });
  });
  function showTab(tab) {
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(tab).classList.remove('hidden');
  }

  buddyActivatedSettings.addEventListener('click', function () 
  {
      if (buddyActivatedSettings.checked) 
      {
          swapixBuddyButton.style.display = "block";
          localStorage.setItem('swapixBuddy', 'activated');
      } 
      else
      {
        swapixBuddyButton.style.display = "none";
          localStorage.setItem('swapixBuddy', 'denied');
      }
  });

  darkModeToggleSettings.addEventListener('click', function () 
            {
                if (darkModeToggleSettings.checked) 
                {
                    body.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } 
                else
                {
                    body.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            });
  if (localStorage.getItem('theme') === 'dark') 
  {
        body.classList.add('dark');
        darkModeToggleSettings.checked = true;
  }
  try
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
          loginModal.classList.remove("hidden");
          loginButton.addEventListener('click', async function(event)
            {
                event.preventDefault();
                 var raw =  {
                    userName: document.getElementById("loginEmail").value,
                    password: document.getElementById("loginPassword").value
                };

                const dataBlob = new Blob([JSON.stringify(raw)], {
                    type: "application/json"});
                
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("content-type", "application/json");
                myHeaders.append("ngrok-skip-browser-warning","true");
                const requestOptions = {
                    method: "POST",
                    content: "application/json",
                    headers: myHeaders,
                    header: myHeaders,
                    body: JSON.stringify(raw),
                    redirect: "follow"
                };

                await fetch("https://mutual-loved-filly.ngrok-free.app/api/v1/auth/login", requestOptions)
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    } else {
                    throw new Error("Login failed: " + response.body);
                    }
                })
                .then(data => {
                  localStorage.setItem("swpKey",data.apiKey,)
                  localStorage.setItem("profileID",data.userId,)
                  CookieManager.getInstance().deleteCookie("__chachedProfile") 
                    window.location.reload()
                })
                .catch(error => {
                    console.error(error);
                    showDialog({
                    type: 'error',
                    title: 'Login Error.',
                    message: 'An error accoured while login you in: ' + error.message,
                    mainButtonText: 'Reload Page',
                    mainButtonAction: () => window.location.reload()
                    });
                });
            });
        }

        await FillInContent();
        await SetCachedProfile();
    }

    if(!window.location.href.toString().includes("#"))
    {
        window.location.href ="/#/"
    }

   

    ModalManager.init();
    document.getElementById("chat-iframe").src = "https://swapix-buddy.kidjjoe.workers.dev/ui?profileID=" + CookieManager.getInstance().getCookie("profileID") + "&swpKey=" + CookieManager.getInstance().getCookie("swpKey");
    setTimeout(() => 
    {
        document.body.classList.add('loaded');
        setTimeout(() => 
        {
            document.body.classList.add('loaded-hidden');
           
        }, 500);
    }, 3000);
    
  }
  catch(ex)

  {
    showError(ex);

    setTimeout(() => 
      {
          document.body.classList.add('loaded');
          setTimeout(() => 
          {
              document.body.classList.add('loaded-hidden');
             
          }, 500);
      }, 1200);
  }
});

function showDialog({ type, title, message, mainButtonText, mainButtonAction }) 
            {
                const dialog = document.getElementById('customDialog');
                const dialogTitle = document.getElementById('dialogTitle');
                const dialogMessage = document.getElementById('dialogMessage');
                const mainActionButton = document.getElementById('mainActionButton');
                const dialogIcon = document.getElementById('dialogIcon');

                // Set dialog content
                dialogTitle.textContent = title;
                dialogMessage.textContent = message;
                mainActionButton.textContent = mainButtonText;

                // Set dialog icon based on type
                dialogIcon.innerHTML = '';
                if (type === 'error') {
                dialogIcon.classList.add('bg-red-100');
                dialogIcon.innerHTML = `
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                `;
                } else if (type === 'success') {
                dialogIcon.classList.add('bg-green-100');
                dialogIcon.innerHTML = `
                    <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                `;
                }

                // Set main action button event
                mainActionButton.onclick = () => {
                mainButtonAction();
                dialog.classList.add('hidden');
                };

                // Show dialog
                dialog.classList.remove('hidden');
            }

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
    const headerMenu = document.getElementById("navigation-center");
    headerMenu.classList.add("header-error-case"); 
    const headerMenuBnt = document.getElementById("openPostCreatorButton");
    headerMenuBnt.classList.add("header-error-case");
    errorContainer.style.display = "block";
    const errorContainerex = document.getElementById("error-container-ex");
    errorContainerex.innerText = ex;
}

function logoutMainUser()
{
    CookieManager.getInstance().deleteCookie("swpKey")
    CookieManager.getInstance().deleteCookie("profileID")
    CookieManager.getInstance().deleteCookie("__chachedProfile") 
    CookieManager.getInstance().deleteCookie("profile-blob-uri")
    window.location.reload();
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