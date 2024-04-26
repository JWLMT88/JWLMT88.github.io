function errorManager() 
{
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  }
  
  function handleError(event) 
  {
      const errorInfo = 
      {
        message: event.error ? event.error.toString() : event.message,
        fileName: event.filename,
        lineNo: event.lineno,
        colNo: event.colno,
        isUnhandledRejection: false,
        timeStamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
    
    

    try
    {
      sendErrorReport(errorInfo, false);
    }
    catch(ex)
    {
      showError(Object.entries(errorInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'));
      console.log(ex);
    }
  }
  
  function handleUnhandledRejection(event) {
    const errorInfo = {
      message: event.reason ? event.reason.toString() : 'Unhandled Promise Rejection',
      isUnhandledRejection: true,
      timeStamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    

    try
    {
      sendErrorReport(errorInfo, true);
    }
    catch(ex)
    {
      showError(Object.entries(errorInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'));
      console.log(ex);
    } 
  }
  
  function sendErrorReport(errorString, stopedBoot) 
  {
    const errorInfo = Object.entries(errorString)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

    const apiUrl = requestURL + `telemetry/error-reports?ApiKey=${CookieManager.getInstance().getCookie("swpKey")}&errorString=${encodeURIComponent(errorInfo)}&platform=0&stopedBoot=${stopedBoot}`;
  
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
        showError(errorInfo);
        console.error('Error sending error report:', error);
    });
  }