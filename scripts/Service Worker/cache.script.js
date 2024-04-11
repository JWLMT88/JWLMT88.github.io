var CACHE_NAME = 'swapix-cache-v0';
    var urlsToCache = [];
  
    function matchInArray(expression, strings) 
    {
      var len = strings.length, i = 0;
      for (; i < len; i++) 
      {
        if (expression.includes(strings[i])) 
        {
          return true;
        }
      }
      return false;
    }
  
    self.addEventListener('install', function(event) 
    {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) 
          {
            console.log('Service Worker: Caching Files');
            return cache.addAll(urlsToCache);
          })
      );
    });
    
    self.addEventListener('activate', function(event) 
    {
      event.waitUntil(
        caches.keys().then(function(cacheNames) 
        {
          return Promise.all(
            cacheNames.map(function(cacheName) 
            {
              if (cacheName !== CACHE_NAME) 
                {
                console.log('Service Worker: Clearing Old Cache', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
    
    self.addEventListener('fetch', function(event) 
    {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) 
          {
            if (response) 
            {
              console.log('Service Worker: Fetching from Cache', event.request.url);
              return response;
            }
            console.log('Service Worker: Fetching from Network', event.request.url);
            return fetch(event.request);
          })
          .catch(function(error) 
          {
            console.error('Service Worker: Network Error', error);
          })
      );
    });