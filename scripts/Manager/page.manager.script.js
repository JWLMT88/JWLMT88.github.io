/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: page.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

class PageQueryManager 
{
    constructor(options = {}) 
    {
        this.options = 
        {
          observedParams: ['page'],
          ...options
        };
        this.currentParams = new URLSearchParams(window.location.search);
        this.initialParams = this.currentParams;
        this.paramChangeHandlers = new Map();
        this.handleUrlChange = this.handleUrlChange.bind(this);
        window.addEventListener('popstate', this.handleUrlChange);
        window.addEventListener('hashchange', this.handleUrlChange);
        this.handleUrlChange(); // Trigger initial load
      }
    
      handleUrlChange() 
      {
        const newParams = new URLSearchParams(window.location.search);
        const changedParams = this.getChangedParams(newParams);
    
        if (changedParams.size > 0) 
        {
          changedParams.forEach((newValue, param) => 
          {
            const oldValue = this.currentParams.get(param);
            this.triggerChangeHandlers(param, oldValue, newValue);
          });

          this.currentParams = newParams;
        }
      }
    
      getChangedParams(newParams) 
      {
        const changedParams = new Map();
        for (const param of this.options.observedParams)
        {
          const oldValue = this.currentParams.get(param);
          const newValue = newParams.get(param);
          if (oldValue !== newValue) 
          {
            changedParams.set(param, newValue);
          }
        }
        return changedParams;
      }
    
      triggerChangeHandlers(param, oldValue, newValue) 
      {
        const handlers = this.paramChangeHandlers.get(param) || [];
        handlers.forEach(handler => handler(oldValue, newValue));
      }
    
      addParamChangeHandler(param, handler) 
      {
        if (!this.paramChangeHandlers.has(param)) 
        {
          this.paramChangeHandlers.set(param, []);
        }
        this.paramChangeHandlers.get(param).push(handler);
      }
    
      removeParamChangeHandler(param, handler) 
      {
        const handlers = this.paramChangeHandlers.get(param);
        if (handlers) 
        {
          const index = handlers.indexOf(handler);
          if (index !== -1) 
          {
            handlers.splice(index, 1);
          }
        }
      }
    }