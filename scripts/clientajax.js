// JS in parent frame loaded from the local filesystem
var targetOrigin = "http://example.com:8080";
var iframeWindow = top.serveriframe;
iframeWindow.postMessage(message, targetOrigin);

function receiveMessage(event) {
	// Do we trust the sender of this message?
	
	if(event.origin !== targetOrigin) {
		return;
	} else {
		event.source.postMessage("message!", event.origin);
	}
}

function sendMessage(message, targetOrigin) {
	iframeWindow.postMessage(message, targetOrigin);
}

window.addEventListener("message", receiveMessage, false);



// Delegate an addOrder event to the iframe serverajax
function addOrder(order) {
	
	var orderObj = {
		'ordernumber': order['orderNumber'],
		'storeid': order['storeID'],
		'deviceid': order['deviceID'],
		'clientid': order['clientID'],
		'userid': order['userID'],
		'custid': order['custID'],
		'timerstart': order['timerStart'],
		'timerend': order['timerEnd'],
		'orderstatus': order['orderStatus']
	}
	
	var myObj = {
		'action': 'addOrder',
		'order': orderObj
	}
	sendMessage(myObj, targetOrigin);
}


// Delegate an updateOrder event to the iframe serverajax
function updateOrder(order) {

	var orderObj = {
		'ordernumber': order['orderNumber'],
		'storeid': order['storeID'],
		'deviceid': order['deviceID'],
		'clientid': order['clientID'],
		'userid': order['userID'],
		'custid': order['custID'],
		'timerstart': order['timerStart'],
		'timerend': order['timerEnd'],
		'orderstatus': order['orderStatus']
	}

	var myObj = {
		'action': 'updateOrder',
		'order': orderObj
	}
	sendMessage(myObj, targetOrigin);
}

/*
// Delegate a listOrders request to the iframe serverajax
function listOrders(tokens) {

	var tokensObj = {
		'storeid': tokens['storeID'],
		'deviceid': tokens['deviceID'],
		'clientid': tokens['clientID'],
		'userid': tokens['userID'],
		'custid': tokens['custID'],
	}

	var myObj = {
		'action': 'listOrders',
		'tokens': tokensObj
	}
	sendMessage(myObj, targetOrigin);
}
*/