class AccountDataManager
{
    static instance = null;

    constructor() 
    {
        if (!AccountDataManager.instance) 
        {
            this.traderStats = null;
            AccountDataManager.instance = this;
        }

        return AccountDataManager.instance;
    }

  
    async fetchTraderStats() 
    {
        try 
        {
            const traderId = CookieManager.getInstance().getCookie('profileID');
            const apiKey = CookieManager.getInstance().getCookie('swpKey');
        
            if (!traderId || !apiKey) 
            {
                throw new Error('Missing required cookies: profileID or swpKey');
            }
        
            const response = await fetch(`${apiURI}v1/trader/${traderId}/stats?apiKey=${apiKey}`);
        
            if (!response.ok) 
            {
                throw new Error(`HTTP error ${response.status}`);
            }
            
            console.log(response);
            console.log(`[Account Manager] fetched/cached data [[(request) LoggedInUser]]`, response);
            const data = await response.json();
            this.traderStats = data;
            return this.traderStats;
        } 
        catch (error) 
        {
            console.error('Error fetching trader stats:', error);
            throw error;
        }
    }
    
  
    getTags() {
      return this.traderStats?.Tags || [];
    }
  
    getFollowingTraders() {
      return this.traderStats?.FollowingTraders || [];
    }
  
    getFollowedTraders() {
      return this.traderStats?.FollowedTraders || [];
    }
  
    getGoals() {
      return this.traderStats?.Goals || [];
    }
  
    getNotifications() {
      return this.traderStats?.Notifications || [];
    }
  
    getSpecificGoal(index) {
      return this.traderStats?.Goals?.[index] || null;
    }
  }