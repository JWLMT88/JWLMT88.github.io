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
let lastSearchQuery = '';

function registerSidebarElements()
{
    document.getElementById("sidebar-search").addEventListener('click', () => _OpenSearch())
}

function _OpenSearch()
{
    const searchContainer = document.getElementById('search-container');

    if(!searchIsOpen)
    {
        searchIsOpen = true;

        if(notificationsOpen) _OpenNotifications();

        document.getElementById("sidebar").classList.add("active-item");
        document.getElementById("sidebar-search-link").classList.add("link-selected");

        searchContainer.innerHTML = `
            <div class="search-label">Search</div>
            <div class="search-form">
                <input type="text" class="search-input" placeholder="Search here...">
                <button class="search-button"><span class="material-symbols-outlined">search</span></button>
            </div>
        `;
        searchContainer.classList.add('show');
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

function _OpenNotifications(){

    const notiContainer = document.getElementById('notifications-container');
    
    if(!notificationsOpen)
    {
        notificationsOpen = true;
        
        if(searchIsOpen) _OpenSearch();

        document.getElementById("sidebar").classList.add("active-item");
        document.getElementById("sidebar-noti-link").classList.add("link-selected");

        notiContainer.innerHTML = `
        `;

        
        var notificationManager = NotificationManager.getInstance();
        notificationManager.addNotification('Notification Title 1', 'Notification Message 1', 'alert-info');
        notificationManager.addNotification('Notification Title 2', 'Notification Message 2', 'alert-warning');
        notiContainer.classList.add('show');

        
    }

    else
    {
        notificationsOpen = false;
        document.getElementById("sidebar").classList.remove("active-item");
        document.getElementById("sidebar-noti-link").classList.remove("link-selected");

        notiContainer.innerHTML = '';
        notiContainer.classList.remove('show');

        $(document).ready(function() {
            $('.notification').click(function() {
                $(this).slideUp(400, function() 
                {
                    document.getElementById("sidebar").classList.remove("active-item");
                    document.getElementById("sidebar-noti-link").classList.remove("link-selected")
                    notiContainer.innerHTML = '';
                    notiContainer.classList.remove('show');
                });
            });
        });
    }
}