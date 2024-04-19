/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: login.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

async function login(username, password)
{
        var raw =  {
            userName: username,
            password: password
        };

        const dataBlob = new Blob([JSON.stringify(raw)], {
            type: "application/json"
       });
        
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
            showError("login", "Login successful!");
            console.log(data);
            setCookie("swpKey",data.apiKey,)
            setCookie("profileID",data.userId,)
            setCookie("swpDefault","1");
            setCookie("__b__a_version","b")
            window.location.href = "/pages/account/" + new QueryManager().getQueryString();
          })
          .catch(error => {
            showError("login",error);
            console.error(error);
          });
}