Titanium.include('Appstatus.js');
Titanium.include('ProgressDialog.js');

var appStatus=new AppStatus();
var authcode=appStatus.getAuthKey();
var file_id='';
var request_id='';

var win_home =  Ti.UI.currentWindow;


var iFlag_fromBrowser='Empty';
var File_path='Empty';	
var File_title='Empty';

try {
	iFlag_fromBrowser=win_home.FLAG;
} catch(E) {
	Ti.API.info('Exception******Home*********1');
}
	

	
if (appStatus.isOnline() == true) {
	//show_dialog('Home','App is online!');
	if(appStatus.isRegistered() == true)
	 {
		//show_dialog('Home','You are registered!');
		
		//appStatus.removeAuthKey();
		
		
	} else {
		show_dialog('Home','You are not registered!');
		Ti.API.info('Home*************************************** '+'You are not registered!');
			
		var showWin_login = Titanium.UI.createWindow({ 
		url:"Login.js", 
		//url:"progressiphone.js",
		 title:'Bhej.de' 
		 });
		 Ti.UI.currentWindow.hide();
		 showWin_login.open();
	     //win_home.close();
	     win_home.hide();
	}
} else {
	show_dialog('Login','Please check you internet connection!!');
};


function show_dialog(title_msg,message_msg) {
	 var alertDialog = Titanium.UI.createAlertDialog({
	 title: title_msg,
	 message: message_msg,
	 buttonNames: ['OK','CANCEL']
	
 });
 alertDialog.show();   
}


var progrssBar=new ProgresDialog(); 

if(Ti.Platform.osname=='android')
{
var activity = Ti.Android.currentActivity;
	//var win = Ti.UI.currentWindow;
	activity.onCreateOptionsMenu = function(e) {
		Ti.API.debug("In onCreateOptionsMenu");
		var menu = e.menu;
		var menuItem = menu.add({
			title: "Signout"
		});
		//menuItem.setIcon("item1.png");
		menuItem.addEventListener("click", function(e) {
			Ti.API.debug("signout clicked");
			show_dialog('Home','Signout clicked');
			appStatus.removeAuthKey();

			var showWin = Titanium.UI.createWindow({
				url:"Login.js",
				title:'Bhej.de'
			});
			showWin.open();
			//win_home.close();
            win_home.hide();
		});
	};
}
else if(Ti.Platform.osname=='iphone')
{
	
}
var imagev = Titanium.UI.createImageView({
   image:'bhej_de_logo.png',
	top:170,
	width:100,
	heigh:70
	
	});
win_home.add(imagev);

var tx_filepath = Titanium.UI.createTextField({
    color:'#FFF',
    top:250,
    left:20,
    width:200,
    height:35,
    hintText:'Select file',
    backgroundImage:'bhej_de_textfield_middle.png',
    paddingLeft:8,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_NEXT,
    suppressReturn:false,
     borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15},
     editable:'false'
});
win_home.add(tx_filepath);
 
 
 if ('BROWSE' == iFlag_fromBrowser) 
	{
		try
		{
	  File_path=win_home.filePath;
	  File_title=win_home.filetitle;
	  		
	  tx_filepath.value=File_path.toString();
	 }
	 catch(E)
	 {
	 	Ti.API.info('Exception******Home*********2');
	 }
	}
 
var button_browse = Titanium.UI.createButton({
    title: 'browse',
    color:'#FFF',
    right:20,
    top: 250, // vertical postion of label on the screen w.r.t screen top
    width: 70, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_browse.addEventListener('click', function() {
		
		if (Ti.Platform.osname == 'iphone') 
		{
		var showWin = Titanium.UI.createWindow({
			url:"photo_gallery.js",
			//url:"Filebrowse_iphone.js",
			title:'Bhej.de'
		});
		showWin.FLAG='APP';
		showWin.open();
		//win_home.close();
		win_home.hide();	
		}
		else if (Ti.Platform.osname == 'android') 
		{
			var showWin = Titanium.UI.createWindow({
			url:"Filebrowse.js",
			title:'Bhej.de'
		});
		showWin.FLAG='APP';
		showWin.open();
		//win_home.close();
		win_home.hide();
		};
	
});
win_home.add(button_browse);

var button_upload = Titanium.UI.createButton({
    title: 'Upload',
    color:'#FFF',
    right:20,
    //top: 450, // vertical postion of label on the screen w.r.t screen top
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});

function getFormattedTime()
{
    var amPM = '';
    var d = new Date();
    var currentHour = d.getHours();
 
    var timestamp=d.getFullYear().toString()+d.getMonth().toString()+d.getDate().toString();
 
    if (currentHour < 12)
    {
        amPM = 'AM';
    }
    else
    {
        amPM = 'PM';
    }
 
    if (currentHour == 0)
    {
        currentHour = 12;
    }
 
    if (currentHour > 12)
    {
        currentHour = currentHour - 12;
    }
 
    var currentMinute = d.getMinutes();
    currentMinute = currentMinute;
 
    var currentSec=d.getSeconds();
 
    if (currentMinute.length == 1)
    {
         currentMinute = '0' + currentMinute;
    }
    timestamp=timestamp+currentHour.toString()+currentMinute.toString()+currentSec.toString();
    
    //timestamp=timestamp+Titanium.Platform.id.toString();
    //show_dialog("TIMESTAMP",timestamp);
    
   return timestamp;
}

button_upload.addEventListener('click', function() {
	
	var str = new String(tx_filepath.value);  
		if (str.length == 0)
		 {
		 	show_dialog('Upload','Select File to upload!');
		 } 
		 else
		 {
		 
		request_id=getFormattedTime();

		//show_dialog('Login',request_id);

		var pairData= {
			request_id:request_id,
			auth_code:authcode,
			num_of_files:1
		};

		var parametrs='/uploads/requestit?request_id='+request_id+'&auth_code='+authcode+'&num_of_files='+1;

		if(Ti.Platform.osname== 'android') {
			doApiCall('/uploads/requestit','GET',authcode,pairData,0);
		} else if(Ti.Platform.osname== 'iphone') {
			doApiCall(parametrs,'GET',authcode,pairData,0);
		}

		//doApiCall('/uploads/requestit','GET',authcode,pairData,0);
		progrssBar.showProgrss();
		
	
		 }
	
	});
	
win_home.add(button_upload);

var button_cancel = Titanium.UI.createButton({
    title: 'Cancel',
    color:'#FFF',
    left:20,
    //top: 450, // vertical postion of label on the screen w.r.t screen top
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_cancel.addEventListener('click', function() {
	
	tx_filepath.value="";
	
});
win_home.add(button_cancel);


function doApiCall(url,type,auth_key,dataArray,iFlg)
	{
	  var xhr = Titanium.Network.createHTTPClient();
	 
	  if (type.valueOf() == 'POST') 
	  {
	  	// if (iFlg == 3)
	  	 // {
	  	 	// xhr.setRequestHeader("enctype", "multipart/form-data");
	  	 // };
	  	
	  	
	  	
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
	 Ti.API.info('Buffer ' + result);
	//  show_dialog('OnLoad',result);
	 Titanium.API.info("REsult **************** "+result);
	
	  if (iFlg == 1)
	   {
	   	getChunkReq(result);
	   } 
	   else if(iFlg == 2)
	   {
	   	getLink(result);
	   }
	   else if (iFlg == 0) 
	   {
	   //	show_dialog('OnLoad_filerequest',result);
	    	getFileRequest(result);
	   }
	   else if (iFlg == 3) 
	   {
	    	splitAndSendChunk(result);
	   }; 
    }
	 catch(E)
		{
		progrssBar.stopProgrss();
		show_dialog('Doapi','Error');
		}
	}
	xhr.onsendstream = function(e) {
		progrssBar.setValtoProgrss(e.progress) ;
		Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
	};
	xhr.setTimeout(20000);
	xhr.send(dataArray);
   }



 function getFileRequest(JsonResult)
 {
 	try{
 	    var success=JsonResult.success;
 	    if (success.valueOf().toString() == 'true')
 	     {
 	     	if(JsonResult.request_save.valueOf().toString() == 'saved')
 	     	{
 	     		file_id=JsonResult.file_id;
				getChunks();
			}
 	     } 
 	     else
 	     {
 	     	progrssBar.stopProgrss();
 	       show_dialog('Upload','Upload Faild');
 	     };
 	}
 	catch(E)
 	{
 		progrssBar.stopProgrss();
 		show_dialog('Upload','Error');
 	}

 }
 
function getChunks()
{
	var pairData= {
		auth_code:authcode,
		request_id:request_id,
		file_id:file_id,
		file_name:File_title,
		chunks:1
	};
	
	var parametrs='/uploads/filechunks?auth_code='+authcode+'&request_id='+request_id+'&file_id='+file_id+'&file_name='+File_title+'&chunks='+1;
	
	if(Ti.Platform.osname== 'android')
	 	{
	 		 doApiCall('/uploads/filechunks','GET',authcode,pairData,1);
	 	}
	 	else if(Ti.Platform.osname== 'iphone')
	 	{
	 		 doApiCall(parametrs,'GET',authcode,pairData,1);
	 	}
	
	//doApiCall('/uploads/filechunks','GET',authcode,pairData,1);
	
}

function getChunkReq(JsonResult)
 {
 	try{
 	    var success=JsonResult.success;
 	    if (success.valueOf().toString() == 'true')
 	     {
 	     	if(JsonResult.chunks.valueOf().toString() == 'saved')
 	     	{	
				 var f = Titanium.Filesystem.getFile(File_path);
				 
				 Titanium.API.info('   ******Actual********* '+f.extension()+'*********'+File_path);
				  
				if (!f.exists()) {
					Ti.API.error("File not exists()");
					show_dialog('File','File not exists()'+f.name());
				}
				else
				{	
					var pairData= {
						auth_code:authcode,
						request_id:request_id,
						file_id:file_id,
						total_chunks:1,
						chunk_id:1,
						file:f.read(),
						file_name:File_title
					};
					doApiCall('/uploads/uploadfile','POST',authcode,pairData,3);
				};
			}
 	     } 
 	     else
 	     {
 	     	progrssBar.stopProgrss();
 	       show_dialog('Upload','Upload Faild');
 	     };
 	}
 	catch(E)
 	{
 		progrssBar.stopProgrss();
 		show_dialog('Upload','Error');
 	}

 }


function splitAndSendChunk(JsonResult)
 {
 	// show_dialog('split',JsonResult);
	progrssBar.stopProgrss();

	if (JsonResult.success.valueOf().toString() == 'true') {
		if(JsonResult.file_save.valueOf().toString() == 'saved') {

			// show_dialog('Upload',this.responseText);
			createLink(request_id);
		}
	}
 }

function createLink(requ_id)
 {
 	var pairData= {
		auth_code:authcode,
		request_id:requ_id

	};
	
	var parametrs='/uploads/createlink?auth_code='+authcode+'&request_id='+requ_id;
	
	if(Ti.Platform.osname== 'android')
	 	{
	 		 doApiCall('/uploads/createlink','GET',authcode,pairData,2);
	 	}
	 	else if(Ti.Platform.osname== 'iphone')
	 	{
	 		 doApiCall(parametrs,'GET',authcode,pairData,2);
	 	}
	
	//doApiCall('/uploads/createlink','GET',authcode,pairData,2);
 }
 function getLink(JsonResult)
 {
 	try{
 		
 		//show_dialog("link",JsonResult.toString());
 		
 	    var success=JsonResult.success;
 	    
 	    if (success.valueOf().toString() == 'true')
 	     {
 	     	
 	     	var file_url=JsonResult.url.valueOf().toString();
 	     	
 	     	 
 	     	 //-------------------code to delete file after upload ----
 	     	 if (Ti.Platform.name == 'android') {
				var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory);
				Ti.API.info('external directoryListing = ' + dir.getParent().getDirectoryListing());

				var fileList = dir.getParent().getDirectoryListing();
				var l = fileList.length;

                  
             
				for(var i=0; i<l; i++) {
					var file2 = fileList[i];
					var fileName = file2.toString();
						
					fileName2 = fileName.substr(fileName.lastIndexOf("/") + 1);
					

					 if (fileName2.substr(0,5) === 'tixhr') {
						 var path = 'file:///sdcard/'+fileName2;
						
						  var file = Titanium.Filesystem.getFile(path);
						  
						 file.deleteFile();
						 Ti.API.info('********Files********** = ' + fileName2);
					 }
				}
			}
 		    progrssBar.stopProgrss();
 		    show_dialog('File Upload','File uploaded!');
 		    
 		    	 Ti.API.info('********Files links********** = ' + file_url);
 	     	 //------------------------------------------------
 	     	 
 	     	 
 	     	 
 	     	 
 	     	 
			var showWin = Titanium.UI.createWindow({
				url:"Send.js",
				title:'Bhej.de'
			});
			showWin.FLAG='HOME';
			showWin.LINK=file_url;
			showWin.FILENM=File_path;
			showWin.filetitle=File_title;
			
			showWin.open();
			//win_home.close();
			 win_home.hide();
 	     } 
 	     else
 	     {
 	     	progrssBar.stopProgrss();
 	       show_dialog('Link','Upload Faild');
 	     };
 	}
 	catch(E)
 	{
 		progrssBar.stopProgrss();
 		show_dialog('Link','Error');
 	}
 }
 
 if(Ti.Platform.osname == 'iphone')
 {
 	imagev.top=imagev.top-300;
 	
 	win_home.addEventListener("click", function() {
	tx_filepath.blur();
	});
 }
 
 
