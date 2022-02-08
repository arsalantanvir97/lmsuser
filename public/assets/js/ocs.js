var appid,
	appkey,
	id,
	name,
	avatar,
	users,
	element,
	leftPanelBgColor,
	leftPanelUsersColor,
	chatWindowBgColor,
	senderBubble,
	recieverBubble;	

var error = 0;
var error_msg = 0;

var ocs = {
    init: function(params){
		var post = new Object();
		post.dev = params.dev;
		post.appid = params.appid;
		post.appkey = params.appkey;
		post.global = params.global;
		post.domain = params.domain;
        post.id = params.id;
        post.toid = params.toid;
        post.name = params.name;
        post.avatar = params.avatar;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
			   var response = JSON.parse(xmlhttp.responseText);
			   if (response.status == 200) {
			      console.log('Success !', response.message);
			      ocs.connect();
			      ocs.appendDialog(params, response.id, response.touser);
			   }
			   else if (response.status == 400) {
			   	  error = 1;
			   	  error_msg = response.message;
			      console.log('Error !', response.message);
			   }
			   else {
			   	  error = 1;
			   	  error_msg = response.message;
			      console.log('Error !', response.message);
			   }
			}
		};
		xmlhttp.open("POST", "https://dev28.onlinetestingserver.com/soachatcentralizedWeb/api/authenticate", true);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(post));
    },
    connect: function(refresh, refreshTime) {
    	if(error)
    		console.log(error_msg);
    	else
	    	connect();
    },
    appendDialog: function(params, id, touser){
    	if(error)
    		console.log(error_msg);
    	else{
			var to = (touser == null) ? '' : touser;
			var onlyAudio = (params['onlyAudio']  !== undefined) ? 1 : 0;
			var colorScheme = (params['colorScheme']  !== undefined ) ? params.colorScheme : '';
			var autoAccept = (params['autoAccept']  !== undefined) ? 1 : 0;
			var readOnly = (params['readOnly']  !== undefined) ? 1 : 0;
    	    if(to && params.global == 0)
				var url = `https://dev28.onlinetestingserver.com/soachatcentralizedNode/single_chat.php?app_id=${params.appid}&read_only=${readOnly}&autoAccept=${autoAccept}&onlyAudio=${onlyAudio}&color_scheme=${colorScheme}&app_key=${params.appkey}&agent=${params.domain}&id=${id}&global=${params.global}&toid=${to}`;
    	    else if(params.dev)
				var url = `https://dev28.onlinetestingserver.com/soachatcentralizedNode/index_dev.php?app_id=${params.appid}&read_only=${readOnly}&autoAccept=${autoAccept}&onlyAudio=${onlyAudio}&color_scheme=${colorScheme}&app_key=${params.appkey}&agent=${params.domain}&id=${id}&global=${params.global}&toid=${to}`;
    		else
				var url = `https://dev28.onlinetestingserver.com/soachatcentralizedNode/index.php?app_id=${params.appid}&read_only=${readOnly}&autoAccept=${autoAccept}&onlyAudio=${onlyAudio}&color_scheme=${colorScheme}&app_key=${params.appkey}&agent=${params.domain}&id=${id}&global=${params.global}&toid=${to}`;
			element = params.element;
			leftPanelBgColor = params.leftPanelBgColor;
			leftPanelUsersColor = params.leftPanelUsersColor;
			chatWindowBgColor = params.chatWindowBgColor;
			senderBubble = params.senderBubble;
			recieverBubble = params.recieverBubble;
			$(element).append(`<iframe style="width:100%;min-height:700px;height:100%;" 
							   src="${url}" 
							   frameborder="0" 
							   scrolling="no"
							   allow="geolocation,microphone,camera"
							   allowfullscreen=""></iframe>`);

    	}
    }
};


function connect(){
	console.log('you are connected');
}