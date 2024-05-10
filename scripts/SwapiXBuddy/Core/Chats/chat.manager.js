class ChatManager
{
    constructor(params) 
    {
        if(!ChatManager.instance)
        {
            this.userKey = params.profileID;
            this.apiKey= params.swpKey;
            this.instance = this;
            this.apiURI = "https://mutual-loved-filly.ngrok-free.app/api/";
            this.requestURL =  this.apiURI + "v1/";
        }
        
        return ChatManager.instance;
    }

    registerChat(chatID)
    {

    }
}