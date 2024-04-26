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
  
    async makeRequest(method, url, data = null, headers = {}) 
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
    
            xhr.onload = async () => 
            {
                if (xhr.status >= 200 && xhr.status < 300) 
                {
                    console.log(xhr.responseText)
                    await resolve(xhr.response);
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
                    reject(`Exception was thrown while sideloading CDN Server/Client resource with status ${xhr.status}: ${xhr.statusText}`);
                }
            };
        
            xhr.onerror = () => 
            {
                reject('Exception was thrown while contacting CDN Server/Client. (Server status: 0cx2212)');
            };
        
            xhr.send();
        });
    }
    
    getImageBlobUrl(url) 
    {
        const cacheManager = new CacheManager();
        return new Promise((resolve, reject) => 
        {
            const cacheObject = cacheManager.getResource(url);
            if(!cacheObject)
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
                        cacheManager.registerResource(url, imgUrl);
                        resolve(imgUrl);
                    } 
                    else 
                    {
                        console.log(`Failed to get image Blob URL from CDN Client with status ${xhr.status}: ${xhr.statusText}`)
                        reject(`Failed to get image Blob URL from CDN Client with status ${xhr.status}: ${xhr.statusText}`);
                    }
                };
            
                xhr.onerror = () => 
                {
                    
                    console.log(`Error getting image Blob URL from CDN Client: ${url}`)
                    reject('Error getting image Blob URL from CDN Client ');
                };
            
                xhr.send();
            }
            else
            {
                resolve(cacheObject);
            }

        });
    }
}