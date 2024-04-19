/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: jwlimited.requests.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class JWLimitedRequestManager 
{
    constructor() 
    {
        if (!JWLimitedRequestManager.instance) 
        {
            this.ngrokDomain = '.ngrok';
            this.ngrokSkipBrowserWarningHeader = 'ngrok-skip-browser-warning';
            this.customUserAgentHeader = 'SwapiXWebClient/1.0';
            this.cache = {};
            JWLimitedRequestManager.instance = this;
        }
        

        return JWLimitedRequestManager.instance;
    }
  
    makeRequest(method, url, data = null, headers = {}) 
    {
        return new Promise((resolve, reject) => 
        {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
    
            xhr.setRequestHeader(this.ngrokSkipBrowserWarningHeader, 'true');
            //xhr.setRequestHeader('User-Agent', this.customUserAgentHeader);

            Object.entries(headers).forEach(([key, value]) => 
            {
                xhr.setRequestHeader(key, value);
            });
    
            xhr.onload = () => 
            {
                if (xhr.status >= 200 && xhr.status < 300) 
                {
                    resolve(xhr.response);
                } else 
                {
                    reject(`Request failed with status ${xhr.status}: ${xhr.statusText}`);
                }
            };
    
            xhr.onerror = () => 
            {
                reject('Request failed due to a network error');
            };
    
            if (data) 
            {
                xhr.send(data);
            } 
            else 
            {
                xhr.send();
            }
      });
    }
  
    get(url, headers = {}) 
    {
        return this.makeRequest('GET', url, null, headers);
    }
  
    post(url, data, headers = {}) 
    {
        return this.makeRequest('POST', url, data, headers);
    }
  
    put(url, data, headers = {}) 
    {
        return this.makeRequest('PUT', url, data, headers);
    }
  
    delete(url, headers = {}) 
    {
        return this.makeRequest('DELETE', url, null, headers);
    }

    loadImageIntoFrame(url, imgElement) 
    {
        return new Promise((resolve, reject) => 
        {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader(this.ngrokSkipBrowserWarningHeader, 'true');
            //xhr.setRequestHeader('User-Agent', this.customUserAgentHeader);
        
            xhr.responseType = 'blob';
            xhr.onload = () => 
            {
                if (xhr.status === 200) 
                {
                    const blob = xhr.response;
                    const imgUrl = URL.createObjectURL(blob);
                    imgElement.src = imgUrl;
                    resolve(imgUrl);
                } 
                else 
                {
                    reject(`Failed to load image from ngrok URL with status ${xhr.status}: ${xhr.statusText}`);
                }
            };
        
            xhr.onerror = () => 
            {
                reject('Error loading image from ngrok URL');
            };
        
            xhr.send();
        });
    }
    
    getImageBlobUrl(url) 
    {

        return new Promise((resolve, reject) => 
        {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader(this.ngrokSkipBrowserWarningHeader, 'true');
            //xhr.setRequestHeader('User-Agent', this.customUserAgentHeader);
        
            xhr.responseType = 'blob';
            xhr.onload = () => 
            {
                if (xhr.status === 200) 
                {
                    const blob = xhr.response;
                    const imgUrl = URL.createObjectURL(blob);
                    resolve(imgUrl);
                } 
                else 
                {
                    console.log(`Failed to get image Blob URL from ngrok URL with status ${xhr.status}: ${xhr.statusText}`)
                    reject(`Failed to get image Blob URL from ngrok URL with status ${xhr.status}: ${xhr.statusText}`);
                }
            };
        
            xhr.onerror = () => 
            {
                
                console.log(`Error getting image Blob URL from ngrok URL: ${url}`)
                reject('Error getting image Blob URL from ngrok URL');
            };
        
            xhr.send();
        });
    }
}