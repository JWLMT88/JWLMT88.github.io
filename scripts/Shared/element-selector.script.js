function $Select(selector) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.href, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                const elements = doc.querySelectorAll(selector);
                resolve(elements);
            } else if (xhr.readyState === XMLHttpRequest.DONE) {
                reject(xhr.status);
            }
        };
        xhr.send();
    });
}