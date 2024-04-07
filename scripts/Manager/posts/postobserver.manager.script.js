/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: postobserver.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

const PostObserver = (function() 
{
    function addScrollObserver() 
    {
        $Select(`.post-container`).then((containers) => 
        {
            const observer = new IntersectionObserver(
                (entries) => 
                {
                    entries.forEach((entry) => 
                    {
                        if (entry.isIntersecting) 
                        {
                            PostRenderer.renderPosts();
                        }
                    });
                },
                { rootMargin: '0px 0px 200px 0px' }
            );

            containers.forEach((container) => 
            {
                const lastPostElement = container.lastElementChild;
                if (lastPostElement) 
                {
                    observer.observe(lastPostElement);
                }
            });
        });
    }

    function removeScrollObserver() 
    {
        $Select(`.post-container`).then((containers) => 
        {
            containers.forEach((container) => 
            {
                const observers = IntersectionObserver.getObservers(container);
                observers.forEach((observer) => observer.disconnect());
            });
        });
    }

    function init() 
    {
        $Select(`.post-container`).then((containers) => 
        {
            addScrollObserver();
            console.log("Initialized Post Observer Succesfully! (v" + swapixVersion + ")")
        });
    }
    
    init();

    return {
        addScrollObserver,
        removeScrollObserver
    };
})();
