/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: query.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class QueryManager 
{
    constructor() 
    {
      this.queryParams = new URLSearchParams(window.location.search);
    }
  
    /**
     * Get the value of a specific query parameter.
     * @param {string} key - The key of the query parameter.
     * @returns {string|null} The value of the query parameter, or null if not found.
     */
    getParam(key) 
    {
      return this.queryParams.get(key) || null;
    }
  
    /**
     * Set the value of a specific query parameter.
     * @param {string} key - The key of the query parameter.
     * @param {string} value - The value to set for the query parameter.
     */
    setParam(key, value) 
    {
      this.queryParams.set(key, value);
      this.updateUrl();
    }

    /**
   * Get all query parameters as an object.
   * @returns {Object} An object containing all query parameters and their values.
   */
    getAllParams() 
    {
        const params = {};
        for (const [key, value] of this.queryParams.entries()) 
        {
          params[key] = value;
        }
        return params;
    }

    /**
   * Get all query parameters as a single string in the format "?query=value&query2=value2".
   * @returns {string} A string representing all query parameters and their values.
   */
    getQueryString() 
    {
      return `?${this.queryParams.toString()}`;
    }
    
  
    /**
     * Delete a specific query parameter.
     * @param {string} key - The key of the query parameter to delete.
     */
    deleteParam(key) 
    {
      this.queryParams.delete(key);
      this.updateUrl();
    }
  
    /**
     * Update the URL with the current query parameters.
     */
    updateUrl() 
    {
      const newUrl = `${window.location.origin}${window.location.pathname}?${this.queryParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
}

  