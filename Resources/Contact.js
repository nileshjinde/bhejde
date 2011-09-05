Titanium.include('ProgressDialog.js');

var win_contact = Ti.UI.currentWindow;
win_contact.backgroundImage='bhej_de_screen2_bg.png';

// create table view data object
var data = [];
var checkedData=[];

var file_link='';
var file_nm='';
var File_title='';

var peoples={};

var progrssBar=new ProgresDialog(); 

progrssBar.showProgrss();

try
{
	file_link=win_contact.LINK;
    file_nm=win_contact.FILENM;	
    File_title=win_contact.filetitle;	
    peoples=Ti.Contacts.getAllPeople();
 
    
}catch(E)
{
	Ti.API.info(E.toString());
}
display_table();


 

function display_table()
{
	for (var i=0; i < peoples.length; i++) 
	{
		for (var label in peoples[i].phone) 
		{
		
			if (label == 'mobile') {
				//Ti.API.info('Contactss*******************************'+i + label);
				mobile_no = peoples[i].phone[label][0];
				break;
			};
	    }

    

    // Ti.API.info('Contactss*******************************    '+ mobile_no);  
      // Ti.API.info('ContactName*******************************    '+ peoples[i].fullName.toString());  

	    var row = Titanium.UI.createTableViewRow();
 
      // -- Create a switch and set initial value.
   var paidCheckbox = Titanium.UI.createButton({
			//image:'unchecked.png',
			 backgroundImage:'unchecked.png',
			width:25,
			height:25,
		    top:20,
			left:5,
			
		});
 
    var name = Titanium.UI.createLabel({
			text:peoples[i].fullName.toString(),
			font: {
				fontSize:16,
				fontWeight:'bold',
			},
			width:'auto',
			textAlign:'left',
			//top:2,
			
			left:40,
			height:'auto'
		});
		
	

		var phoneNo =  Titanium.UI.createLabel({
			text:mobile_no.toString(),
			font: {
				fontSize:12,
				fontWeight:'bold',
			},
			width:'auto',
			textAlign:'left',
			bottom:0,
			left:40,
			height:'auto'
		});
		
		
	     
	paidCheckbox.addEventListener('click', function(e) {
			if(paidCheckbox.image== 'unchecked.png') {
				paidCheckbox.image = 'checked.png';
			} else {
				paidCheckbox.image = 'unchecked.png';
			}
		});
	   
 
	    row.add(paidCheckbox);
	    row.add(name);
        row.add(phoneNo);
	    row.hasChild=true;
	    row.title=mobile_no.toString();
	
	 
	    if(Ti.Platform.osname=='iphone') {
		
        row.title="";
       
		}
	
	    row.className = 'contacts';
	    data.push(row);
	    checkedData.push('false');
	   }
	   progrssBar.stopProgrss();
}


 
// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	minRowHeight:'auto',
	top:0,
	bottom:90,
	right:5,
	left:0
	
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	
     var controlArray = rowdata.getChildren();
     var checkedSt = controlArray[0];
     var mobileNo = controlArray[2];
     
   if(checkedSt.backgroundImage== 'unchecked.png') {
		checkedSt.backgroundImage= 'checked.png';
		 checkedData[index]='true';
	} else {
		checkedSt.backgroundImage = 'unchecked.png';
		 checkedData[index]='false';
	}
	
	

});
// add table view to the window
win_contact.add(tableview);




var button_cancel = Titanium.UI.createButton({
    title: 'Cancel',
    color:'#FFF',
    right:20,
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_cancel.addEventListener('click', function() {
	
	var showWin = Titanium.UI.createWindow({
		url:"Send.js",
	});
	showWin.LINK=file_link;
    showWinFILENM=file_nm;
    showWin.filetitle=File_title;
    showWin.FLAG='CONT';
    showWin.CONTACTS='';
	
	showWin.open();
	//win_contact.close();
	win_contact.hide();
});
win_contact.add(button_cancel);

var button_add = Titanium.UI.createButton({
    title: 'Add',
    color:'#FFF',
    left:20,
    //top: 450, // vertical postion of label on the screen w.r.t screen top
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_add.addEventListener('click', function() {

	var dataSend='';
	var iAddCnt=0;
		
	for (var i=0; i < checkedData.length; i++) 
	{
		if (checkedData[i] == 'true')
		 {
		 	for (var label in peoples[i].phone) {
		 		if (iAddCnt != 0)
				 {
				 	dataSend+=',';
				};
				if (label == 'mobile') {

					dataSend+=peoples[i].phone[label][0];
					iAddCnt++;
				}
				//Titanium.UI.createAlertDialog({title:'Table View',message:peoples[i].phone[label][0]}).show();
			}
		} 
	};
	
	var showWin = Titanium.UI.createWindow({
		url:"Send.js",
	});
	showWin.LINK=file_link;
    showWin.FILENM=file_nm;
    showWin.filetitle=File_title;
    showWin.FLAG='CONT';
    showWin.CONTACTS=dataSend;
	
	showWin.open();
	//win_contact.close();
	win_contact.hide();
});
win_contact.add(button_add);

//----------------



win_contact.open();