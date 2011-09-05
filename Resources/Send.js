

var win_sendforward = Ti.UI.currentWindow;
win_sendforward.backgroundImage='bhej_de_screen2_bg.png';

var contacts='';

var file_link='Empty';
var file_nm='Empty';	
var File_title='Empty';

var iFlag_from='Empty';

try {
	file_link=win_sendforward.LINK;
    file_nm=win_sendforward.FILENM;	
    iFlag_from=win_sendforward.FLAG;
    File_title=win_sendforward.filetitle;
} catch(E) {
	Ti.API.info(E.toString());
}



if (iFlag_from == 'CONT') 
{
  contacts=win_sendforward.CONTACTS;
};

// create table view data object
var data = [];

var label_to = Titanium.UI.createLabel({
	color:'#357EC7',
	text:'To',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 90, // vertical postion of label on the screen w.r.t screen top
    left:20
});
win_sendforward.add(label_to);

var tx_number = Titanium.UI.createTextField({
    color:'#FFF',
    top:120,
    left:20,
    width:220,
    height:35,
    hintText:'Mob.No',
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
win_sendforward.add(tx_number);

tx_number.value=contacts;


var button_conta = Titanium.UI.createButton({
    //title: 'Login',
    color:'#FFF',
    top:120,
    right:20,
    width: 50, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_contact_icon.png',
    
});
button_conta.addEventListener('click', function() {
	
	if (Ti.Platform.osname == 'ipod')
	 {
	 	
	 }
	else
	{
		var showWin = Titanium.UI.createWindow({
		url:"Contact.js",
		title:'Bhej.de'
	});
	showWin.LINK=file_link;
	showWin.FILENM=file_nm;
	showWin.filetitle=File_title;
	showWin.open();
	//win_sendforward.close();
	win_sendforward.hide();
	};
	
});
win_sendforward.add(button_conta);

var label_msg = Titanium.UI.createLabel({
	color:'#357EC7',
	text:'Message',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	width:'auto',
    top: 170, // vertical postion of label on the screen w.r.t screen top
    left:20
});
win_sendforward.add(label_msg);

var txA_msg = Titanium.UI.createTextArea({
	 //color:'#FFF',
    top:200,
    left:20,
    width:270,
    height:70,
    hintText:'Your msg here',
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
win_sendforward.add(txA_msg);


var label_fileName = Titanium.UI.createLabel({
	text:'fileName',
	 color:'#000000',
	font:{fontSize:15,fontFamily:'Helvetica Neue'},
	width:'auto',
    top: 290, // vertical postion of label on the screen w.r.t screen top
    left:20
});
win_sendforward.add(label_fileName);


var button_cancel = Titanium.UI.createButton({
    title: 'Cancel',
    color:'#FFF',
    right:20,
    //top: 450, // vertical postion of label on the screen w.r.t screen top
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_cancel.addEventListener('click', function() {
	
	var showWin = Titanium.UI.createWindow({
		url:"Home.js",
		title:'Bhej.de'
	});
	showWin.open();
	//win_sendforward.close();
	win_sendforward.hide();
	});
	
win_sendforward.add(button_cancel);

var button_send = Titanium.UI.createButton({
    title: 'Send',
    color:'#FFF',
    left:20,
    //top: 450, // vertical postion of label on the screen w.r.t screen top
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_send.addEventListener('click', function() {
	
	var contact_list=[];
	var con_list=new String(tx_number.value.toString());
    
	
if ((!con_list) || (con_list.length == 0)) // check for empty
	{
		show_dialog('Contacts','Plz,Enter contact number !');
	} else {
		contact_list=con_list.split(',',5);
		for (var i=0; i < contact_list.length; i++) {
			sendMessage(contact_list[i]);
		};
	};
	
});
win_sendforward.add(button_send);

var moduleObj = require("com.omorandi");



function sendMessage(contactNo)
{
	//Titanium.UI.createAlertDialog({title:'Table View',message:contactNo+txA_msg.value}).show();
	//Titanium.Platform.openURL('sms:'+contactNo);
	
	if(Ti.Platform.osname=='android') {
		var intent = Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			type: 'vnd.android-dir/mms-sms'
		});
		intent.putExtra('sms_body',txA_msg.value);
		intent.putExtra('address', contactNo);
		Ti.Android.currentActivity.startActivity(intent);
	} else if(Ti.Platform.osname=='iphone') {
		//Titanium.Platform.openURL('sms:'+contactNo);
		//Titanium.Platform.openURL('http://www.google.com');
           smsDialog = moduleObj.createSMSDialog({
				recipients: ['+9764901169'],
				messageBody: 'Test message from me',
				barColor: 'red'
			});

			smsDialog.open({
				animated: true
			});
		
	}

}



txA_msg.value=file_link;
label_fileName.text=File_title;

function show_dialog(title_msg,message_msg)
  {
   var alertDialog = Titanium.UI.createAlertDialog({
        	title: title_msg,
        	message: message_msg,
        	buttonNames: ['OK','CANCEL']
       		});alertDialog.show();
 }

 //----------------
if(Ti.Platform.osname=='iphone')
{
	label_to.top=label_to.top-350;
	label_msg.top=label_msg.top-260;
	label_fileName.bottom=150;
	
}

win_sendforward.open();