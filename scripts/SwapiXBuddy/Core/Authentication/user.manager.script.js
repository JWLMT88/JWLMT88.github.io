/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Buddy
   File: user.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class UserManager
{
    constructor()
    {
        if(!UserManager.instance)
        {
            this.loggedInUserObject = null;
            this.ckMng = CookieManager.getInstance();
            this.qrMng = new QueryManager();
            this.instance = this;
            this.apiURI = "https://mutual-loved-filly.ngrok-free.app/api/";
            this.requestURL =  this.apiURI + "v1/";
        }
        
        return this.instance;
    }

    setCookie(name, value, expirationDays) 
    {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        const expires = 'expires=' + expirationDate.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }
    
    getCookie(name) 
    {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) 
        {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) 
            {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    getUserObject()
    {
        if(this.loggedInUserObject != null)
        {
            return this.loggedInUserObject;
        }

        return false;
    }

    async loginUserWithCredentials()
    {
        if( 
            this.getCookie("swpKey") == null && 
            this.getCookie("profileID") == null ||
            this.qrMng.getParam("profileID") != null &&
            this.qrMng.getParam("swpKey")!= null ) 
        {
            var swpKey = this.qrMng.getParam("swpKey");
            var profileID = this.qrMng.getParam("profileID");
            
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

            this.setCookie("swpKey",swpKey,7650);
            this.setCookie("profileID",profileID,7650);

            await fetch(this.requestURL + "trader/" + profileID + "?apiKey=" + swpKey, requestOptions)
            .then(response => 
            {
                if (response.ok) 
                {
                    return response.json();
                }
                else 
                {
                    throw new Error("Login failed: " + response.body);
                }
            })
            .then(data => 
            {
                this.loggedInUserObject = data;

                this.setCookie("__swp_cgb_account-name", data.firstName, 365);
                this.setCookie("__swp_cgb_account-email", data.email, 365);
                this.setCookie("__swp_cgb_account-username", data.userName, 365);
                this.setCookie("__swp_cgb_account-civilname", data.firstName + " " + data.lastName, 365);
                this.setCookie("__swp_cgb_account-resident", data.location, 365);
                this.setCookie("__swp_cgb_account-telephone", data.phoneNumber ?? "N/A", 365);
                this.setCookie("__swp_cgb_account-twofa",data.twoFactorEnabled ?? "N/A", 365);

                this.qrMng.deleteParam("profileID");
                this.qrMng.deleteParam("swpKey");
            })
            .catch(error => 
            {
                console.error(error);
            }); 
        }
    }
}