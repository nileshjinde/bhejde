Titanium.include('Appstatus.js');
Titanium.include('validationAndErrors.js');
Titanium.include('ProgressDialog.js');


var appStatus=new AppStatus();
var authcode=appStatus.getAuthKey();
var objvalerrors=new ValidationAndErrors();


if (appStatus.isOnline() == true) {
	//show_dialog('Signup','App is online!');
} else {
	show_dialog('Signup','Please check you internet connection!!');
};

var win_signup = Ti.UI.currentWindow;

var scrollView_signup = Ti.UI.createScrollView({
	contentHeight:'auto',
	contentWidth:'auto',
	left:35,
	
	
});

win_signup.add(scrollView_signup);



/*win_signup.orientationModes = [
	Titanium.UI.PORTRAIT,
	
]; */

var progrssBar=new ProgresDialog(); 

var imagev_signup = Titanium.UI.createImageView({
   image:'bhej_de_logo.png',
	top:200,
	width:100,
	//height:70
	
	});
scrollView_signup.add(imagev_signup);



var label_signup = Titanium.UI.createLabel({
	color:'#000',
	text:'Signup',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 250, // vertical postion of label on the screen w.r.t screen top
   
    
});
scrollView_signup.add(label_signup);

var tx_name_signup = Titanium.UI.createTextField({
    color:'#FFF',
    top:280,
    
    width:250,
    height:35,
    hintText:'Name',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
    borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15}
     
});
scrollView_signup.add(tx_name_signup);

var tx_email_signup = Titanium.UI.createTextField({
    color:'#FFF',
    top:320,
   
    width:250,
    height:35,
    hintText:'Email',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
     borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15}
});
scrollView_signup.add(tx_email_signup);

var tx_mobNo_signup = Titanium.UI.createTextField({
    color:'#FFF',
    top:360,
   
    width:250,
    height:35,
    hintText:'Mobile No.',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
    borderColor:'#FFF',
    borderWidth:1,
    font: {fontSize: 15},
    
    
});
scrollView_signup.add(tx_mobNo_signup);

var tx_pwd_signup = Titanium.UI.createTextField({
    color:'#FFF',
    top:400,
   
    width:250,
    height:35,
    hintText:'Password',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    paddingRight:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
     borderColor:'#FFF',
    borderWidth:1,
    passwordMask:true,
     font: {fontSize: 15}
});
scrollView_signup.add(tx_pwd_signup);
 
 
var button_signup_signup = Titanium.UI.createButton({
    title: 'Signup',
    color:'#FFF',
    top: 440, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_signup_signup.addEventListener('click', function() { 
	
    var pairData={name:tx_name_signup.value,mobile_number:tx_mobNo_signup.value,email:tx_email_signup.value,
    	password:tx_pwd_signup.value};
    		
  // var pairData={name:'nilesh',mobile_number:'9064901169',email:'nilesh_jinde@gmail.com',
    //	password:'nilesh'};
    	if (false == checkError())
    	 {
    	 	doApiCall('/users/registration','POST','auth_key',pairData);
    	    progrssBar.showProgrss();
    	 }; 
    
 });
 
scrollView_signup.add(button_signup_signup);


var label_AlreadyhaveAcc_signup = Titanium.UI.createLabel({
	color:'#000',
	text:'Already have account?',
	font:{fontSize:15,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 480, // vertical postion of label on the screen w.r.t screen top
  
    
});

scrollView_signup.add(label_AlreadyhaveAcc_signup);

var button_Login_signup = Titanium.UI.createButton({
    title: 'Login',
    color:'#FFF',
    top: 505, // vertical postion of label on the screen w.r.t screen top
    width: 250, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_Login_signup.addEventListener('click', function() {
	var showWin = Titanium.UI.createWindow({
			url:"Login.js",
			title:'Bhej.de'
		});
		showWin.open();
		//win_signup.close();
		win_signup.hide();
});
scrollView_signup.add(button_Login_signup);

function doApiCall(url,type,auth_key,dataArray)
	{
	  var xhr = Titanium.Network.createHTTPClient();
	  if (type.valueOf() == 'POST') 
	  {
	  	  xhr.open('POST',base_url+url);
     
	  } 
	  else if (type.valueOf() == 'GET')
	  {
	  	 xhr.open('GET',base_url+url);
	  };
	
	 //show_dialog('OnLoad',dataArray);
	
	xhr.onload = function()
	{
	try
	{
	  var result = JSON.parse(this.responseText);
	  Ti.API.info('OnLoad '+result);
      getSignUpData(result);     
    }
	 catch(E)
	  {
	    progrssBar.stopProgrss();
	 	show_dialog('OnLoad','Error');
	  }
	}
	xhr.send(dataArray);
   }

 function getSignUpData(JsonResult)
 {
 	try{
 	 if (JsonResult.user.valueOf().toString() == 'new')
 	  {
			if (JsonResult.status.valueOf().toString() == 'saved') {
				if (JsonResult.mail.valueOf().toString() == 'success') {
					
					authcode=JsonResult.authentication_code;
					appStatus.setAuthKey(authcode);

                    progrssBar.stopProgrss();
					show_dialog('Signup','Signup Successful!');
					
var showWin = Titanium.UI.createWindow({
						url:"Home.js",
						title:'Bhej.de'
					});
					showWin.open();
					showWin.FLAG='NO';
					//win_signup.close();
					win_signup.hide();
				}
			}
		}
 	     else if (JsonResult.user.valueOf().toString() == 'exists')
 	     {
			if (JsonResult.status.valueOf().toString() == 'duplicate') 
			{
			    progrssBar.stopProgrss();
				show_dialog('Signup','User Exists!');
			}
 	     }
 	     else
 	     {
 	        progrssBar.stopProgrss();
 	     	show_dialog('Signup','Signup Faild');
 	     };
 	}
 	catch(E)
 	{
 		progrssBar.stopProgrss();
 		show_dialog('Signup','Error');
 	}

 }

function show_dialog(title_msg,message_msg) {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: title_msg,
		message: message_msg,
		buttonNames: ['OK','CANCEL']
		
	});
	alertDialog.show();
}

function checkError() 
	{		
		Ti.API.info("checkError");

		if(true == objvalerrors.validate_Name(tx_name_signup.value))
		{
			show_dialog('SignUp',objvalerrors.errorMsgString);
			return true;
		}
		if(true == objvalerrors.validate_email(tx_email_signup.value))
		{
			show_dialog('SignUp',objvalerrors.errorMsgString);
			return true;
		}
		if(true == objvalerrors.validate_Mobile_No(tx_mobNo_signup.value))
		{
			show_dialog('SignUp',objvalerrors.errorMsgString);
			return true;
		}
		if(true == objvalerrors.validate_password(tx_pwd_signup.value))
		{
			show_dialog('SignUp',objvalerrors.errorMsgString);
			return true;
		}
		return false;
	}
//----------------
if(Ti.Platform.osname=='iphone')
{
       	win_signup.addEventListener("click", function() {
       		tx_name_signup.blur();
		tx_email_signup.blur();
		tx_mobNo_signup.blur();
		tx_pwd_signup.blur();
	
	});
	
	 scrollView_signup.addEventListener("click", function() {
		tx_name_signup.blur();
		tx_email_signup.blur();
		tx_mobNo_signup.blur();
		tx_pwd_signup.blur();
	});
	
	
	scrollView_signup.left=0;
	
	
	imagev_signup.top=imagev_signup.top-400;
	label_signup.top=label_signup.top-360;
	
	tx_name_signup.top=tx_name_signup.top-75;
	tx_email_signup.top=tx_email_signup.top-75;
	tx_mobNo_signup.top=tx_mobNo_signup.top-75;
	tx_pwd_signup.top=tx_pwd_signup.top-75;
	
	button_signup_signup.top=button_signup_signup.top-75;
	label_AlreadyhaveAcc_signup.top=label_AlreadyhaveAcc_signup.top-125;
	
	button_Login_signup.top=button_Login_signup.top-80;
	
}
//------------------

win_signup.open();