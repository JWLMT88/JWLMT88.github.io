/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: cookie.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

var CookieManager = (function() 
{
    var instance;

    function CookieManager() 
    {
        function setCookie(name, value, expirationDays, domain) 
        {
            var cookieString = name + "=" + encodeURIComponent(value);
            if (expirationDays) 
            {
                var date = new Date();
                date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                cookieString += ";" + date.toUTCString();
            }
            if (domain) 
            {
                cookieString += "; domain=" + domain;
            }
            cookieString += "; path=/";
            document.cookie = cookieString;
        }

        function getCookie(name) 
        {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) 
            {
                var cookie = cookies[i].trim();
                if (cookie.indexOf(name + "=") === 0) 
                {
                    return decodeURIComponent(cookie.substring(name.length + 1));
                }
            }
            return null;
        }

        function getUsernameFromBrowser() {
            var userAgent = window.navigator.userAgent;
            var start = userAgent.indexOf('(') + 1;
            var end = userAgent.indexOf(')');
            var username = userAgent.substring(start, end);
            return username;
        }

        function deleteCookie(name) 
        {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        this.getUsernameFromBrowser = function(){
            return getUsernameFromBrowser();
        }

        this.setCookie = function(name, value, expirationDays, domain) 
        {
            setCookie(name, value, expirationDays, domain);
        };

        this.getCookie = function(name) 
        {
            return getCookie(name);
        };

        this.deleteCookie = function(name) 
        {
            deleteCookie(name);
        };
    }

    return {
        getInstance: function() 
        {
            if (!instance) 
            {
                instance = new CookieManager();
            }
            return instance;
        }
    };
})();
