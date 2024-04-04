var notifications = [];

    function addNotification(title, message, type) {
        var notification = {
            title: title,
            message: message,
            type: type,
            shown: true
        };
        notifications.push(notification);
        updateNotifications(); 
    }

    
    function removeNotification(index) {
        notifications[index].shown = false;
        updateNotifications(); 
    }

    function updateNotifications() {
        $('#notifications-container').empty();
        notifications.forEach(function(notification, index) {
            if (notification.shown) {
                var notificationItem = $('<div class="notification-item"></div>');
                var notificationElement = $('<div class="notification alert ' + notification.type + '"></div>');
                notificationElement.append('<h4 class="notification-title">' + notification.title + '</h4>');
                notificationElement.append('<p class="notification-message">' + notification.message + '</p>');
                notificationItem.append(notificationElement);
                $('#notifications-container').append(notificationItem);
                
                notificationElement.click(function() {
                    removeNotification(index);
                });
            }
        });
    }