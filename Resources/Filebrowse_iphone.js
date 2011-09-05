Titanium.include('ProgressDialog.js');

var win_filebrowse = Ti.UI.currentWindow;
win_filebrowse.backgroundImage='bhej_de_screen2_bg.png';

// create table view data object
var data = [];

var progrssBar=new ProgresDialog(); 

//progrssBar.showProgrss();


var dir = Titanium.Filesystem.getFile('file://localhost/');
	
var files=dir.getDirectoryListing();

var files_info=[];

var origin_path='file://localhost';


getFiles(files);

var stack_files=new Array;

stack_files.push('file://localhost');

function getFiles(fi)
{	
	files_info.length=0;
	
	for (var i=0; i < fi.length; i++) 
	{
		//listfilesRec(fi[i]);
		//Ti.API.info("*************File*****  "+fi[i]);
	}
	//display_table(files_info);
	
	display_table(fi);
	progrssBar.stopProgrss();
}


function getFiles_after(fi)
{	
	files_info.length=0;
	
	for (var i=0; i < fi.length; i++) 
	{
		//listfilesRec(fi[i]);
	}
	//display_table_after(files_info);
	display_table_after(fi);
	progrssBar.stopProgrss();
}

function listfilesRec(tmpfile)
{
	 var path = origin_path+'/'+tmpfile;	
	//Titanium.API.info('stack  *************** '+stack_files);
	 var f = Titanium.Filesystem.getFile(path);
	
      Titanium.API.info(path+'   ****listfiles*********** '+tmpfile);
      files_info.push(tmpfile);
}

function check_extension(fileName)
{
	//Titanium.UI.createAlertDialog({title:'Table View',message:fileName}).show();
  
	
	if ((fileName == 'png') || (fileName == 'jpg') || (fileName == 'gif') || (fileName == 'jpeg')
	|| (fileName == 'mp3') || (fileName == 'wav') || (fileName == 'mpa') || (fileName == 'wma')
	|| (fileName == 'txt') || (fileName == 'dat') || (fileName == 'ppt') || (fileName == 'apk')
	|| (fileName == 'mp4') || (fileName == 'mpg') || (fileName == 'avi') || (fileName == 'flv') || (fileName == 'wmv')
	|| (fileName == 'app') || (fileName == 'log') || (fileName == 'db') || (fileName == 'JPG') || (fileName == 'PNG') || (fileName == 'DB') || (fileName == 'ipa')
	|| (fileName == 'ASM') || (fileName == 'chm') || (fileName == 'pdf') || (fileName == 'sql') || (fileName == 'doc') || (fileName == 'docx') || (fileName == 'bmp')
	|| (fileName == 'ico') || (fileName == 'html') || (fileName == 'php') || (fileName == 'jsp') || (fileName == 'java') || (fileName == 'py') || (fileName == 'rb') || (fileName == 'xml')
	|| (fileName == 'rtf') || (fileName == 'jar') || (fileName == 'plist')) 
	 {
	 	return true;
		}
		 else 
		 {
		 	return false;
	};
}
 function display_table(file_list)
 {
 	
 	data.length=0;
 
	for (var i=0; i < file_list.length; i++) 
	{
	data[i] = Ti.UI.createTableViewRow({hasChild:true,height:30,title:file_list[i]});
	addRow(i,file_list[i]);
	};
	progrssBar.stopProgrss();
}

function display_table_after(file_list)
 {
 	
 	var new_data=[];
 
	for (var i=0; i < file_list.length; i++) 
	{
	new_data[i] = Ti.UI.createTableViewRow({hasChild:true,height:30,title:file_list[i]});
	
	new_data[i].add(Ti.UI.createLabel({
		//text:file_list[i],
		//color:'#FFF',
		height:30,
		width:'auto',
		left:20,
		//right:50,
		//top:20,
		//bottom:10
		
	}));
	
	//-------------------------------------------------
	// var path=origin_path+'/'+file_list[i];
	// var file1 = Titanium.Filesystem.getFile(path);
	// var imv=resize_image(path,30,30);
// 	
	// new_data[i].add(Titanium.UI.createImageView({
    // image:imv,
	// width:'auto',
	// heigh:'auto',
	// left:20
	// }));
	//-----------------------------------------------------
	
	
	
	};
		 		
   tableview.setData(new_data);
   data= new_data;
	progrssBar.stopProgrss();
}

function addRow(idx,text)
{
	data[idx].add(Ti.UI.createLabel({
		//text:text,
		//color:'#FFF',
		height:30,
		width:'auto',
		left:20,
		//right:50,
		//top:20,
		//bottom:10
		
	}));
	
	//-------------------------------------------------
	// var path=origin_path+'/'+text;
	// var file1 = Titanium.Filesystem.getFile(path);
	// var imv=resize_image(path,30,30);
// 	
	// data[idx].add(Titanium.UI.createImageView({
    // image:imv,
	// width:'auto',
	// heigh:'auto',
	// left:20
	// }));
	//-----------------------------------------------------
}

function resize_image(imagePath, height, width) {
  height = height || 64;
  width = width || 64;
 
  var imageView = Ti.UI.createImageView({
    image: imagePath,
    width: width,
    height: height
  });
 
  return imageView.toImage();
}

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	minRowHeight:'auto',
	top:30,
	bottom:90,
	right:5,
	left:0,
	scrollable:true
	
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;

    var path = origin_path+'/'+data[index].title;
    var f = Titanium.Filesystem.getFile(path);
   
  Titanium.API.info('   ************path*** '+f.extension()+'*********'+path);
   
    //Titanium.API.info('   ******Nativepath********* '+f.extension()+'*********'+f.nativePath);
    
   if (f.extension() == '')
    {
       var dir1 = Titanium.Filesystem.getFile(origin_path+'/'+data[index].title);
        var files1=dir1.getDirectoryListing();
        
        //	Titanium.API.info('   ******file length********* '+files1.length);
        
        if(files1.length == null)
        {
        	
        }
        else
        {
            stack_files.push(data[index].title);

			origin_path=origin_path+'/'+data[index].title;
			Titanium.API.info('   ******orgPath********* '+origin_path);

			var path_fil=return_path(origin_path);
			tx_path.value=path_fil;

			//var dir1 = Titanium.Filesystem.getFile(origin_path);
			//var files1=dir1.getDirectoryListing();

			getFiles_after(files1);
        };
    	
    } 
    else if (check_extension(f.extension()) == true)
    {	
	
		var showWin = Titanium.UI.createWindow({
			url:"Home.js",
			title:'Bhej.de'
		});
		showWin.FLAG='BROWSE';
		//showWin.filePath=f.nativePath;
		showWin.filePath=path;
		showWin.filetitle=data[index].title;
		
		showWin.open();
		//win_filebrowse.close();
		progrssBar.stopProgrss();
		win_filebrowse.hide();
		
		};
});
// add table view to the window
win_filebrowse.add(tableview);




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
			url:"Home.js",
			title:'Bhej.de'
		});
		
		showWin.open();
		//win_filebrowse.close();
		progrssBar.stopProgrss();
		win_filebrowse.hide();
});
win_filebrowse.add(button_cancel);

var button_back = Titanium.UI.createButton({
    title: 'Back',
    color:'#FFF',
    left:20,
    bottom:50,
    width: 138, // width of the button
    height: 35 ,// width of the button
    backgroundImage:'bhej_de_button_middle.png',
    
});
button_back.addEventListener('click', function() {
	origin_path='';
	
	var path_temp=new String(stack_files);
	if(path_temp == 'file://localhost')
	{
		path_temp='file://localhost/';
	}
	else
	{
	stack_files.pop();	
	
	};
   //  Titanium.API.info('Stack_files    *************** '+stack_files);
	
	var path_all=new String(stack_files);
	path_all=path_all.replace(/,/g,'/');
	
	origin_path=path_all;
	
	//Titanium.API.info('Stack_f    *************** '+origin_path);

    var pat='';
    if(origin_path == 'file://localhost')
	{
		pat='file://localhost/';
	}
	else
	{
		pat=origin_path;
	};

	var dir1 = Titanium.Filesystem.getFile(pat);
	var files1=dir1.getDirectoryListing();
	getFiles_after(files1);
	
	
	var path_fil=return_path(origin_path);
	tx_path.value=path_fil;
});
win_filebrowse.add(button_back);

function return_path(fil_path)
{
	var ori_path=new String(fil_path);
	var index=ori_path.indexOf('localhost');
    var path='';
	for (var i=index; i <ori_path.length; i++)
	{
      path+=ori_path.charAt(i);
	};
	path=path.replace(/\//g,'>');
	
	//Titanium.API.info(ori_path+'Split    *************** '+path);
	
	return path;
}

//-------------temp
var tx_path = Titanium.UI.createTextField({
    color:'#FFF',
    left:0,
    top:0,
    //width: , // width of the button
    height: 20 ,// width of the button
    right:0,
    //backgroundImage:'bhej_de_textfield_middle.png',
    backgroundImage:'bhej_de_button_middle.png',
    paddingLeft:8,
     borderColor:'#FFF',
    borderWidth:1,
     font: {fontSize: 15},
     editable:'false'
});

win_filebrowse.add(tx_path);

tx_path.value='localhost';

win_filebrowse.open();