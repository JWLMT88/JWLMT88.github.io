/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: element-selector.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

function $Select(selector) 
{
    return new Promise((resolve, reject) => 
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.href, true);
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) 
            {
                const doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                const elements = doc.querySelectorAll(selector);
                resolve(elements);
            } else if (xhr.readyState === XMLHttpRequest.DONE) 
            {
                reject(xhr.status);
            }
        };
        xhr.send();
    });
}

function e() 
{
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    (n = console.warn || console.log).call.apply(n, [console, "[SWAPIX] "].concat(t));
    var n
}