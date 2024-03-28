// Function to set a cookie
function setCookie(name, value, expirationDays, domain) {
    var cookieString = name + "=" + encodeURIComponent(value);
    if (expirationDays) {
      var date = new Date();
      date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
      cookieString += "; expires=" + date.toUTCString();
    }
    if (domain) {
      cookieString += "; domain=" + domain;
    }
    cookieString += "; path=/"; // Set path to /
    document.cookie = cookieString;
   }
   

// Function to get a cookie
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getUsernameFromBrowser() {
    var userAgent = window.navigator.userAgent;
    var start = userAgent.indexOf('(') + 1;
    var end = userAgent.indexOf(')');
    var username = userAgent.substring(start, end);
    return username;
}

var username = getUsernameFromBrowser();
console.log("Useragent:", username);

setCookie("agent",  username, 30, "core.swapix.com");

var user = getCookie("agent");
console.log("Agent:", user);