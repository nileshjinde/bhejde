const base_url = "http://mobishare.weboapps.com";
//const base_url = "http://192.168.1.132";
function AppStatus()
{
	 var auth_key='Empty';
	 
	 this.isOnline=function()
     {
		if(Ti.Network.online) {
			return true;
		}  
     	return false;
     }
     
     
     this.isRegistered=function() 
     {
		try {
			if (auth_key.toString() == 'Empty')
				return false;
			else
				return true;
		} catch (E) 
		{
		//	alert("Registration "+ E.toString());
		}
		return false;
	}
	
	this.getAuthKey=function()
	{
		auth_key=this.readAuthKey();
		return auth_key;
	}
	this.readAuthKey=function() 
	{
		return Titanium.App.Properties.getString('auth_key');
	}
	this.saveAuthKey=function(key)
	{
		Titanium.App.Properties.setString("auth_key",key);
	}

	this.setAuthKey=function(key)
	{
		auth_key = key;
		this.saveAuthKey(key);                
	}
	this.removeAuthKey=function()
	{
		Titanium.App.Properties.removeProperty('auth_key');           
	}

	
}
