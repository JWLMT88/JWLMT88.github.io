class PublicUserDataManager 
{
    static instance = null;
    fetchedUserData = new Map();
  
    constructor()
    {
        if (!PublicUserDataManager.instance) 
        {
            PublicUserDataManager.instance = this;
        }
  
        return PublicUserDataManager.instance;
    }
  
    async fetchByName(username,  redirectError ,needRefetch) 
    {
        try 
        {
            if(needRefetch == false)
            {
                const cachedResult = this._getSavedResult(username);
                if (cachedResult) 
                {
                    console.log(`[Account Manager] cached data [[(request) ${username}]]`, cachedResult);
                    return cachedResult;
                }
            }
    
            const response = await fetch(apiURI + `v1/trader/@${username}/stats/public`);
    
            if (!response.ok) 
            {
                throw new Error(`HTTP error ${response.status}`);
            }
    
            const data = await response.json();
            this.fetchedUserData.set(username, data);
            console.log(`[Account Manager] fetched/cached data [[(request) ${username}]]`, data);
            return data;
        } 
        catch (error) 
        {
            console.error(`[Account Manager] error [[(request) ${username}]]`, error);
            if(redirectError == true)
            {
                renderPage(notFoundContent, 'not-found');
            }
            throw error;
        }
    }
  
    _getSavedResult(username) 
    {
        return this.fetchedUserData.get(username);
    }
}