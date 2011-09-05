function ValidationAndErrors()
{
	this.errorMsgString='Error';
	 
	 this.validate_email=function(emailAddress)
     {
     	var str = new String(emailAddress); 
     	var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;  
		if (str.length == 0)
		 {
		 	this.errorMsgString='Field cant be empty!';
		 	return true;
		 } 
		 else if (!filter.test(str))  
		 {
		 	this.errorMsgString='Please enter a valid email address';
		 	return true;
		 };
		 return false;
     }
     
     
     this.validate_password=function(password) 
     {
		var str = new String(password);  
		if (str.length == 0)
		 {
		 	this.errorMsgString='Field cant be empty!';
		 	return true;
		 } 
		 else if (str.length < 6)  
		 {
		 	this.errorMsgString='Password should be atleast 6 characters';
		 	return true;
		 };
		 return false;
	}
	
	this.validate_Name=function(name)
	{
		var str = new String(name); 
		if (str.length == 0)
		 {
		 	this.errorMsgString='Field cant be empty!';
		 	return true;
		 } 
		 return false;
	}
	this.validate_Mobile_No=function(mobileNo) 
	{
		var str = new String(mobileNo);   
	   if (str.length == 0) {
			this.errorMsgString='Field cant be empty!';
			return true;
		}
		if ((str.length < 10) || (str.length > 10)) {
			this.errorMsgString='Ten digits Mobile No. allowed!';
			return true;
		}
		return false;
	}
	
}
