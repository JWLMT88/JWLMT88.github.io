/*
   ------------------------------------------------------------------------------
   Copyright (c) 2024 JW Limited. All rights reserved.

   Project: SwapiX 
   Module: Web Client 
   File: notification.manager.script.js
   Company: JW Limited (licensed)
   Author: Joey West (CEO)

   This software is proprietary to JW Limited and constitutes valuable 
   intellectual property. It is entrusted solely to employees named above
   and may not be disclosed, copied, reproduced, transmitted, or used in 
   any manner outside of the scope of its license without prior written
   authorization from JW Limited.

   ------------------------------------------------------------------------------
*/

var NotificationManager = (function() 
{
    var instance;

    function NotificationManager() 
    {
        var notifications = [];
        function generateUniqueId() 
        {
            return Math.floor(Math.random() * 100000);
        }

        function createNotificationCode(notification) {
            
            const notificationTemplate = `
            <div class="notification" id="nfID-${notification.id}">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-actions">
                    <button class="action-button"><span class="material-icons" onclick="NotificationManager.getInstance().interactWithNotification(${notification.id});">arrow_outward</span></button>
                    <button class="delete-notification-btn" onclick="NotificationManager.getInstance().removeNotification(${notification.id});"><span class="material-icons">delete</span></button>
                </div>
            </div>`;
            return notificationTemplate;
        }

        function updateNotifications() 
        {
            $('.notifications-container').empty();
            $('.notifications-container').append(`<div class="search-label">Notifications</div>`);
            notifications.forEach(function(notification, index) 
            {
                if (notification.shown)
                {
                    var notificationItem = createNotificationCode(notification);
                    $('.notifications-container').append(notificationItem);
                }
            });
        }
        function removeNotification(id)
        {
            var index = notifications.findIndex(function(notification) 
            {
                return notification.id === id;
            });
            if (index !== -1) 
            {
                notifications[index].shown = false;
                updateNotifications();
            }
            else
            {
                console.info("[NOTIFY MANGER] Couldnt find data to nfID")
            }
        }

        async function interactWithNotification(id)
        {
            await removeNotification(id);
            
            const notiContainer = document.getElementById('notifications-container');
            document.getElementById("sidebar").classList.remove("active-item");
            document.getElementById("sidebar-noti-link").classList.remove("link-selected")
            notiContainer.innerHTML = '';
            notiContainer.classList.remove('show');

            var index = notifications.findIndex(function(notification) 
            {
                return notification.id === id;
            });
            if(notifications[index].type == "linked")
            {
                window.location.href = notifications[index].link;
            }
        }

        this.addNotification = function(title, message, type, link) 
        {
            var notification = 
            {
                title: title,
                message: message,
                type: type,
                id: generateUniqueId(),
                shown: true,
                link: link
            };
            notifications.push(notification);
            updateNotifications();
        };

        this.removeNotification = function(id) 
        {
            removeNotification(id);
        };

        this.interactWithNotification = function(id)
        {
            interactWithNotification(id);
        }

        this.getNotifications = function() 
        {
            return notifications.filter(function(notification) 
            {
                return notification.shown;
            });
        };
    }

    return {
        getInstance: function() 
        {
            if (!instance) 
            {
                instance = new NotificationManager();
            }
            return instance;
        }
    };
})();
