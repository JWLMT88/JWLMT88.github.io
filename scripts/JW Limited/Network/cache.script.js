class CacheManager 
{
    constructor() 
    {
        if(!CacheManager.managedInstance)
        {
            this.cache = {};
            this.cacheControl = 'max-age=3600';
            CacheManager.managedInstance = this;
        }

        return CacheManager.managedInstance;
    }
  
    async cacheResource(url, resourceType, options = {}) 
    {
        const cacheKey = this.generateCacheKey(url, resourceType);
    
        const cachedResource = this.cache[cacheKey];
        if (cachedResource) 
        {
            return cachedResource;
        }
        const resource = await this.fetchResource(url, resourceType, options);
        this.cache[cacheKey] = resource;
        return resource;
    }
  
    async fetchResource(url, resourceType, options = {}) 
    {
        const response = await fetch(`${url}?cache-control=${this.cacheControl}`, options);

        if (!response.ok) 
        {
            throw new Error(`Failed to fetch ${resourceType} from ${url}: ${response.status} ${response.statusText}`);
        }
  
        switch (resourceType) 
        {
            case 'image':
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            case 'text':
                return await response.text();
            case 'json':
                return await response.json();
            default:
                throw new Error(`Unsupported resource type: ${resourceType}`);
        }
    }
    
    registerResource(url, resource) 
    {
        this.cache[url] = resource;
    }
    
    getResource(key)
    {
        return this.cache[key];
    }

    generateCacheKey(url, resourceType)
    {
        return `${resourceType}-${url}`;
    }
}
  