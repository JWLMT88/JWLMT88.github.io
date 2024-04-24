function errorManager() 
{
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  }
  
  function handleError(event) 
  {
    const errorString = event.error ? event.error.toString() : event.message;
    sendErrorReport(errorString, false);
  }
  
  function handleUnhandledRejection(event) 
  {
    const errorString = event.reason ? event.reason.toString() : 'Unhandled Promise Rejection';
    sendErrorReport(errorString, true);
  }
  
  function sendErrorReport(errorString, stopedBoot) 
  {
    const apiUrl = requestURL + `telemetry/error-reports?ApiKey=${CookieManager.getInstance().getCookie("swpKey")}&errorString=${encodeURIComponent(errorString)}&platform=0&stopedBoot=${stopedBoot}`;
  
    fetch(apiUrl, 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning' : 'true'
        },
        
        redirect: "follow"
    })
    .then(response => 
    {
        if (!response.ok) 
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        console.log('Error report sent successfully');
    })
    .catch(error => 
    {
        console.error('Error sending error report:', error);
    });
  }