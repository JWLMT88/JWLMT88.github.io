/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: sidebar.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
const sidebar = document.querySelector('.sidebar');
var searchIsOpen = false;
var notificationsOpen = false;
var goalsOpen = false;
let lastSearchQuery = '';

function _OpenSearch()
{
    const searchContainer = document.getElementById('search-container');

    if(!searchIsOpen)
    {
        searchIsOpen = true;

        if(notificationsOpen) _OpenNotifications();
        if(goalsOpen) _OpenGoals();
        document.getElementById("sidebar").classList.add("active-item");
        document.getElementById("sidebar-search-link").classList.add("link-selected");

        searchContainer.innerHTML = `
            <div class="search-label">Search</div>
            <div class="search-form">
                <input type="text" class="search-input" placeholder="Search here...">
                <button class="search-button"><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="search-results"></div>
        `;
        searchContainer.classList.add('show');

        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');

        // Simulated search data
        const searchData = [
        {
            title: 'JavaScript',
            description: 'A programming language for building web applications.',
            image: 'https://via.placeholder.com/50',
            link: '#',
        },
        {
            title: 'React',
            description: 'A JavaScript library for building user interfaces.',
            image: 'https://via.placeholder.com/50',
            link: '#',
        },
        {
            title: 'Angular',
            description: 'A TypeScript-based web application framework.',
            image: 'https://via.placeholder.com/50',
            link: '#',
        },
        // Add more search data objects as needed
        ];

        searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredResults = searchData.filter((item) =>
            item.title.toLowerCase().includes(searchTerm)
        );

        searchResults.innerHTML = '';

        if (searchTerm === '') {
            searchResults.style.display = 'none';
            return;
        }

        searchResults.style.display = 'block';

        filteredResults.forEach((result) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result');
            resultItem.innerHTML = `
            <img class="search-result-image" src="${result.image}" alt="${result.title}">
            <div class="search-result-info">
                <a href="${result.link}" class="search-result-title">${result.title}</a>
                <p class="search-result-description">${result.description}</p>
            </div>
            `;
            searchResults.appendChild(resultItem);
        });
        });
    }

    else
    {
        searchIsOpen = false;
        document.getElementById("sidebar").classList.remove("active-item");
        document.getElementById("sidebar-search-link").classList.remove("link-selected");
        
        searchContainer.innerHTML = '';
        searchContainer.classList.remove('show');
    }
}





function _OpenNotifications()
{

    const notiContainer = document.getElementById('notifications-container');
    
    if(!notificationsOpen)
    {
        notificationsOpen = true;
        
        if(searchIsOpen) _OpenSearch();
        if(goalsOpen) _OpenGoals();

        document.getElementById("sidebar").classList.add("active-item");
        document.getElementById("sidebar-noti-link").classList.add("link-selected");
        
        notiContainer.classList.add('show');

        // $(document).ready(function() {
        //     $('.notification').click(function() {
        //         $(this).slideUp(400, function() 
        //         {
        //             document.getElementById("sidebar").classList.remove("active-item");
        //             document.getElementById("sidebar-noti-link").classList.remove("link-selected")
        //             notiContainer.innerHTML = '';
        //             notiContainer.classList.remove('show');
        //         });
        //     });
        // });
    }
    else
    {
        notificationsOpen = false;
        document.getElementById("sidebar").classList.remove("active-item");
        document.getElementById("sidebar-noti-link").classList.remove("link-selected");
        notiContainer.classList.remove('show');
    }
}

function _OpenGoals()
{
    const goalContainer = document.getElementById('goals-container');

    if(!goalsOpen)
    {
        goalsOpen = true;
        
        if(searchIsOpen) _OpenSearch();
        if(notificationsOpen) _OpenNotifications();

        GoalManager.getInstance().init();

        document.getElementById("sidebar").classList.add("active-item");
        document.getElementById("sidebar-goals-link").classList.add("link-selected");
        
        goalContainer.classList.add('show');
    }
    else
    {
        goalsOpen = false;
        document.getElementById("sidebar").classList.remove("active-item");
        document.getElementById("sidebar-goals-link").classList.remove("link-selected");
        goalContainer.classList.remove('show');
    }
}