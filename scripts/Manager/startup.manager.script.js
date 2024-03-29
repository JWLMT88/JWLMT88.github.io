const qm = new QueryManager();
var pager = null;
document.addEventListener('DOMContentLoaded', async function() 
{
     pager = new PageQueryManager({
        observedParams: ['page']
      });
      
      pager.addParamChangeHandler('page', (oldValue, newValue) => {
        console.log(`Page changed from ${oldValue} to ${newValue}`);
      });

    if(qm.getParam("action") == "login")
    {
        setCookie("swpKey",qm.getParam("key"));
        setCookie("profileID",qm.getParam("usr"));
        await FillInContent();
        qm.deleteParam("usr");
        qm.deleteParam("key");
        qm.deleteParam("action");
        setTimeout(() => 
        {
            document.body.classList.add('loaded');
            setTimeout(() => 
            {
                document.body.classList.add('loaded-hidden');
               
            }, 500);
        }, 2000);
    }
    else 
    {
        if(getCookie("swpKey") == null || getCookie("profileID") == null){
            window.location.href = "https://core.swapix.fun/pages/v2/auth/?referal=web-app&action=login&key=webApp"; 
        }

        await FillInContent();
        setTimeout(() => 
        {
            document.body.classList.add('loaded');
            setTimeout(() => 
            {
                document.body.classList.add('loaded-hidden');
             
            }, 500);
        }, 200);
    }
});

