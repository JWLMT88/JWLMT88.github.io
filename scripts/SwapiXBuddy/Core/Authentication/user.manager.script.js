class UserManager
{
    constructor()
    {
        if(!UserManager.instance)
        {
            this.loggedInUserObject = null;
            this.ckMng = CookieManager.getInstance();
            this.qrMng = new QueryManager();
            this.instance = this;
        }
        
        return this.instance;
    }

    async loginUserWithCredentials()
    {
        var swpKey = this.qrMng.getParam("swpKey");
        var profileID = this.qrMng.getParam("profileID");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("content-type", "application/json");
        myHeaders.append("ngrok-skip-browser-warning","true");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            header: myHeaders,
            redirect: "follow"
        };

        await fetch(requestURL + "trader/" + CookieManager.getInstance().getCookie("profileID") + "?apiKey=" + CookieManager.getInstance().getCookie("swpKey"), requestOptions)
        .then(response => 
            {
            if (response.ok) {
                return response.json();
                }
            else {
                showError();
                throw new Error("Login failed: " + response.body);
                }
        })
        .then(data => 
        {
                this.ckMng.setCookie("__swp_cgb_account-name", data.firstName);
                this.ckMng.setCookie("__swp_cgb_account-email", data.email);
                this.ckMng.setCookie("__swp_cgb_account-username", data.userName);
                this.ckMng.setCookie("__swp_cgb_account-civilname", data.firstName + " " + data.lastName);
                this.ckMng.setCookie("__swp_cgb_account-resident", data.location);
                this.ckMng.setCookie("__swp_cgb_account-telephone", data.phoneNumber ?? "N/A");
                this.ckMng.setCookie("__swp_cgb_account-twofa",data.twoFactorEnabled ?? "N/A")
        })
        .catch(error => 
        {
                //showError(error);
                console.error(error);
        }); 

    }
}