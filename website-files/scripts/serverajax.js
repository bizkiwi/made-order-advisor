
// JS in child iframe loaded from the server

// following targetOrigin should be changed to a static IP for security
var targetOrigin = "*";

function receiveMessage(event) {
	// Do we trust the sender of this message?
	
	if(event.origin !== targetOrigin) {
		return;
	} else {
		var myObj = event.data;
		var eventType = myObj.eventType;
		var result = false;
		if(eventType == "addOrder") {
			var order = myObj.order;
			result = addOrder(order);
		} else if(eventType == "updateOrder") {
			var order = myObj.order;
			result = updateOrder(order);
		} else if(eventType == "listOrders") {
			var tokens = myObj.tokens;
			result = listOrders(tokens);
		}
		sendMessage(result, targetOrigin);
		//event.source.postMessage("message!", event.origin);
	}
}

function sendMessage(message, targetOrigin) {
	top.postMessage(message, targetOrigin);
}

window.addEventListener("message", receiveMessage, false);




function addOrder(order) {
	// Use AJAX to post the object to the addorder service on the remote server
	var url = serverURL + '/orders/add';
	$.ajax({
		type: 'POST',
		data: order,
		url: url,
		dataType: 'JSON'
	}).done(function( response ) {
	
		// Check for successful (blank) response
		if (response.msg === '') {
			return true;
			//pushUpdates();
			
		} else {
		
			// If something goes wrong, alert the error message our service returned
			//alert('Error: ' + response.msg);
			return response.msg;
			
		}
	});
}




// Use AJAX to post an update to the updateorder service on the remote server
function updateOrder(order) {

	// Use AJAX to post an update to updateorder service on the remote server
	var url = serverURL + '/orders/update';
	$.ajax({
		type: 'POST',
		data: order,
		url: url,
		dataType: 'JSON'
	}).done(function( response ) {
	
		// Check for successful (blank) response
		if (response.msg === '') {
			return true;
			//pushUpdates();
			
		} else {
		
			// If something goes wrong, alert the error message our service returned
			//alert('Error: ' + response.msg);
			return response.msg;
			
		}
	});
	
}


// Use AJAX to post an update to the updateorder service on the remote server
function listOrders(tokens) {

	// Use AJAX to post an update to updateorder service on the remote server
	var url = serverURL + '/orders/list';
	$.ajax({
		type: 'GET',
		data: tokens,
		url: url,
		dataType: 'JSON'
	}).done(function( response ) {
	
		// Check for successful (blank) response
		if (response.msg === '') {
			return true;
			//pushUpdates();
			
		} else {
		
			// If something goes wrong, alert the error message our service returned
			//alert('Error: ' + response.msg);
			return response.msg;
			
		}
	});
	
}