
// "Made Order Advisor" ("M.O.A") by BizKiwi.NZ
// Copyright 2015 BizKiwi.NZ - steve.julian@orcon.net.nz

//new at 10/6/2015 :
var isCustomerWindow = true;
var customerWindowIsOpen = true;
// end new
//var initWindow = window.opener;
var customerWindow = window.self;
//customerWindow.closed = false;
var crewWindow = null;
var thisWindow = "customer";
var closeAllFlag = false;

var crewWindowCloseFlag = false;
var crewWindowIsClosed = true;
var crewWindowShouldBeMinimised = false;

var crewWindowNewWidth = 0;
var crewWindowNewHeight = 0;

var $j = jQuery.noConflict();

var newWidth = $j("#bodytagcustomer").innerWidth();
var newHeight = $j("#bodytagcustomer").innerHeight();

var resizeCustomerWindowIsTriggered = false;
var displaysWanted = 2;
//var resizeCrewWindowIsTriggered = false;

var pushRequests = 0;
var pushACKs = 0;



var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 100,
    height: 100,
    useSVG: true
});


function PromptConnectSecondDisplay(thisScreenWidth) {
	if(crewWindow && !crewWindow.closed) {
		crewWindow.alwaysRaised = 0;
		crewWindow.moveTo(0, 0);
	}
	customerWindow.alwaysRaised = 1;
	customerWindow.focus();
	var requestFullScreenMode = false;
	toggleFullScreen(customerWindow, requestFullScreenMode);
	customerWindow.moveTo(0, 0);
	customerWindow.resizeTo(200, 200);
	if(customerWindow.screen.availLeft < thisScreenWidth) {
		//customerWindow.resizeTo(customerWindow.screen.width, customerWindow.screen.height);
		if (confirm('To display content on a second display ensure this is connected and working then move this window to the second display. Ready to continue?')) {
			if(!(customerWindow.screen.availLeft < thisScreenWidth)) {
				customerWindow.location.reload();
			} else {
				return true;
			}
		} else {
			customerWindow.close();
		}
			
		//alert("Please ensure the second display is connected and working then move this window to the second display. Click OK when ready to continue.");
	} else {
		return true;
	}
}

function LoadHandler() {
	

	var requestFullScreenMode = true;
	toggleFullScreen(customerWindow, requestFullScreenMode);
			
	customerWindow.moveTo(0, 0);
	var thisScreenWidth = customerWindow.screen.width;
	if(customerWindow.screen.availLeft == 0) {
		if(displaysWanted > 1) {
			customerWindow.focus();
			if (confirm('Only one display detected. Can we fix this?')) {
				var windowIsOnSecondDisplay = false;
				while(!windowIsOnSecondDisplay) {
					windowIsOnSecondDisplay = PromptConnectSecondDisplay(thisScreenWidth);
				}
			}
			
			if(customerWindow.screen.availLeft < thisScreenWidth) {
				if (!confirm('Both Customer and Crew windows will run on a single display. Click OK to continue or Cancel to Quit.')) {
					customerWindow.close();
				} else {
					requestFullScreenMode = true;
					toggleFullScreen(customerWindow, requestFullScreenMode);
					displaysWanted = 1;
				}
			}
		}
		/*
		if (confirm('Please ensure the second display is connected and working then move this window to the second display. Click OK when ready to continue.')) {
			if(customerWindow.screen.availLeft >= thisScreenWidth) {
				customerWindow.location.reload();
			}
		}
		*/
		//PromptConnectSecondDisplay(thisScreenWidth);
		/*
		var windowIsOnSecondDisplay = false;
		while(!windowIsOnSecondDisplay) {
			windowIsOnSecondDisplay = PromptConnectSecondDisplay(thisScreenWidth);
		}
		*/
	}
	
	
	
	//alert(customerWindow.screen.availLeft);
	customerWindow.moveTo(0, 0);
	
	
	//alert(customerWindow.screen.availLeft);
	customerDisplayWidth = customerWindow.screen.width;
	customerDisplayHeight = customerWindow.screen.height;
	/*if(customerWindow.screen.availLeft > 0) {
		var posX = 0 - customerWindow.screen.availLeft;
		customerWindow.moveTo(posX,0);
		//alert(posX);
		//alert(posX);
		
		//customerWindow.resizeTo(5,5);
		//customerWindow.screen.left = customerWindow.screen.width + 10;
	}
	*/
	crewDisplayWidth = customerWindow.screen.availLeft;
	crewWindowWidth = crewDisplayWidth;
	//alert(customerWindow.screen.availLeft);
    ResetCustomerWindow();
    StartONS();

    setTimeout(function () {

        OpenCrewWindow();

    }, 1000);

	customerWindow.alwaysRaised = 0;
	//crewWindow.alwaysRaised = 0;
	
	if(displaysWanted == 1) {
		/*
		requestFullScreenMode = true;
		toggleFullScreen(customerWindow, requestFullScreenMode);
		//if(!customerWindow.crewWindowIsClosed) {
		if(crewWindow && !crewWindow.closed) {
			MaximiseCrewWindow();
			requestFullScreenMode = false;
			toggleFullScreen(crewWindow, requestFullScreenMode);
		}
		*/
		customerWindow.focus();
		requestFullScreenMode = true;
		toggleFullScreen(customerWindow, requestFullScreenMode);
		
		crewWindow.focus();
		
		requestFullScreenMode = false;
		toggleFullScreen(crewWindow, requestFullScreenMode);
		
		setTimeout(function () {
			MaximiseCrewWindow();
		}, 2000);
	}
	
    setInterval(function () {
		CheckCloseAllFlagIsTrue();
        if (resizeCustomerWindowIsTriggered) {
            $j("#bodytagcustomer").css("innerWidth", newWidth);
            var bodyHeight = $j("#bodytagcustomer").innerHeight();
            var bodyPaddingBottom = bodyHeight - newHeight;
            $j("#bodytagcustomer").css("innerHeight", newHeight);
            $j("#bodytagcustomer").css("padding-bottom", bodyPaddingBottom);
            console.log("newHeight:" + newHeight);
            console.log("padding-bottom:" + bodyPaddingBottom);
            customerWindow.resizeTo(newWidth, newHeight);
            resizeCustomerWindowIsTriggered = false;
        }

    }, 2000);
	

			
	setInterval(function () {
		
		if(crewWindow && !crewWindow.closed) {
			
			if(customerWindow.screen.availLeft < crewWindow.screen.width) {
				if(displaysWanted > 1) {
					/*
					crewWindow.alwaysRaised = 0;
					customerWindow.alwaysRaised = 0;
					
					crewWindow.focus();
					MinimiseCrewWindow();
					crewWindow.moveTo(0, 0);
					
					//requestFullScreenMode = true;
					//toggleFullScreen(customerWindow, requestFullScreenMode);
					*/
					
					/*
					crewWindow.closeAllFlag = true;
					customerWindow.crewWindowCloseFlag = true;
					
					crewWindow.close();
					
					customerWindow.focus();
					customerWindow.moveTo(0, 0);
					customerWindow.resizeTo(100, 100);
					
					requestFullScreenMode = true;
					toggleFullScreen(customerWindow, requestFullScreenMode);
					*/
					
					/*
					setTimeout(function () {
						crewWindow.focus();
						crewWindow.location = "cust.html";
						customerWindow.close();

					}, 800);
					*/
					customerWindow.focus();
					alert('Only one display detected. Please Exit this Application, make sure a second display is connected and working, then launch this Application again. Click OK to Quit.');
					crewWindow.closeAllFlag = true;
					customerWindow.closeAllFlag = true;
					customerWindow.crewWindowCloseFlag = true;
					crewWindow.close();
					customerWindow.close();
					
					/*
					if (confirm('Only one display detected. Can we fix this?')) {
						
						crewWindow.closeAllFlag = true;
						customerWindow.crewWindowCloseFlag = true;
						
						crewWindow.close();
						
						
						setTimeout(function () {
							customerWindow.focus();
							

						}, 800);
						
						
						
						
						thisScreenWidth = crewWindow.screen.width;
						var windowIsOnSecondDisplay = false;
						while(!windowIsOnSecondDisplay) {
							windowIsOnSecondDisplay = PromptConnectSecondDisplay(thisScreenWidth);
						}
						if(customerWindow.screen.availLeft < thisScreenWidth) {
							if (!confirm('Both Customer and Crew windows will run on a single display. Click OK to continue or Cancel to Quit.')) {
								crewWindow.close();
								customerWindow.close();
							} else {
								crewWindow.focus();
								requestFullScreenMode = false;
								toggleFullScreen(crewWindow, requestFullScreenMode);
								MinimiseCrewWindow();
								
								customerWindow.focus();
								requestFullScreenMode = true;
								toggleFullScreen(customerWindow, requestFullScreenMode);
								
								customerWindow.alwaysRaised = 0;
								crewWindow.alwaysRaised = 1;
								
								crewWindow.focus();
								
								displaysWanted = 1;
								MaximiseCrewWindow();
								

								
								
							}
						} else {
							requestFullScreenMode = true;
							toggleFullScreen(customerWindow, requestFullScreenMode);
							crewWindow.focus();
							MaximiseCrewWindow();
							toggleFullScreen(crewWindow, requestFullScreenMode);
							customerWindow.alwaysRaised = 0;
							crewWindow.alwaysRaised = 1;
						}
						
					}
					*/
				}
			}
		}
    }, 4000);

		
	/*
	alert(customerWindow.screen.availLeft);
	if(customerWindow.screen.availLeft == 0) {
		var posX = customerWindow.screen.width + 1;
		alert(posX);
		customerWindow.moveTo(posX,0);
		customerWindow.resizeTo(5,5);
		//customerWindow.screen.left = customerWindow.screen.width + 10;
	}
	
	console.log("w:"+customerWindow.screen.width);
	*/

}



/*
function LoadHandler() {

    OpenCrewWindow();
    
    setTimeout(function () {

        StartONS();

        ResetCustomerWindow();

        setInterval(function () {
            if (resizeCustomerWindowIsTriggered) {
                $("#bodytagcustomer").css("innerWidth", newWidth);
                var bodyHeight = $("#bodytagcustomer").innerHeight();
                var bodyPaddingBottom = bodyHeight - newHeight;
                $("#bodytagcustomer").css("innerHeight", newHeight);
                $("#bodytagcustomer").css("padding-bottom", bodyPaddingBottom);
                console.log("newHeight:" + newHeight);
                console.log("padding-bottom:" + bodyPaddingBottom);
                customerWindow.resizeTo(newWidth, newHeight);
                resizeCustomerWindowIsTriggered = false;

            }

        }, 2000);

    },2000);

}
*/

function MakeQRCode() {
    var myURL = "http://cnn.com";
    qrcode.makeCode(myURL);
}



function UnloadHandler() {
    //console.log("customerWindow.UnloadHandler()");
    ExitONS();
}

/*
customerWindow.onbeforeunload = function (e) {

    if (customerWindow.closeAllFlag == true) {

        if (customerWindow.crewWindowIsClosed == false) {
            CloseAllWindows();
            setTimeout(function () {

                return "Are you sure you want to Exit ONS?";

            }, 3000);
        }

    } else {

        setTimeout(function () {

            return "Are you sure you want to Exit ONS?";

        }, 3000);

    }

    //crewWindow.MouseUpCloseAllWindows();

};



customerWindow.beforeunload = function (e) {

    if (customerWindow.closeAllFlag == true) {

        if (customerWindow.crewWindowIsClosed == false) {
            CloseAllWindows();
            setTimeout(function () {

                return "Are you sure you want to Exit ONS?";

            }, 3000);
        }

    } else {

        setTimeout(function () {

            return "Are you sure you want to Exit ONS?";

        }, 3000);

    }

    //crewWindow.MouseUpCloseAllWindows();

};

*/


function InitArrays() {
    //console.log("customerWindow.InitArrays()");

    var nMax = maxNotificationBoxes;
    for (var n = 0; n < nMax; n++) {

        var thisRegisterNumber = n;
        //orderNumberArray[thisRegisterNumber] = new Array(maxOrderNumber + 1);
        recentOrderArray[thisRegisterNumber] = new Array(maxOrderNumber + 1);
        var pMax = maxOrderNumber + 1;

        for (var p = 0; p < pMax; p++) {
            var thisOrderNumber = p;
            //orderNumberArray[thisRegisterNumber][thisOrderNumber] = new Array(numberASCIIchars);
            recentOrderArray[thisRegisterNumber][thisOrderNumber] = {};
            recentOrderArray[thisRegisterNumber][thisOrderNumber]['isOnScreen'] = false;
            recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] = "0:00";
			recentOrderArray[thisRegisterNumber][thisOrderNumber]['endTimer'] = "0:00";
            recentOrderArray[thisRegisterNumber][thisOrderNumber]['flash30'] = false;
            recentOrderArray[thisRegisterNumber][thisOrderNumber]['flash60'] = false;
            recentOrderArray[thisRegisterNumber][thisOrderNumber]['flash90'] = false;

            /*
			var qMax = numberASCIIchars;
			for(var q=0;q<qMax;q++) {
				var thisSuffixASCIIcode = q;
				// ASCII codes for chars of interest:
				// digits 0 - 90
				// 48 - 57
				// upper case chars
				// 65 - 90
				// lower case chars
				// 97 - 122
				
				var thisChar = String.fromCharCode(thisSuffixASCIIcode);

				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode] = {};
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['start'] = 0;
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['stop'] = 0;
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['eventID'] = thisRegisterNumber.toString()+thisOrderNumber.toString()+thisSuffixASCIIcode.toString();
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['suffixString'] = thisChar;
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['orderNumber'] = thisOrderNumber;
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['registerNumber'] = thisRegisterNumber;
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['pickID'] = Number(thisRegisterNumber.toString()+thisOrderNumber.toString());
				orderNumberArray[thisRegisterNumber][thisOrderNumber][thisSuffixASCIIcode]['numberTimesUsed'] = 0;
				
			}
			*/
        }
        recentHighestOrderNumber[thisRegisterNumber] = 0;
    }


    var xMax = maxNotificationBoxes;
    for (var x = 0; x < xMax; x++) {
        var notifyCookieObj = "notify" + x;
        var timerCookieObj = "timer" + x;
		var endTimerCookieObj = "endtimer" + x;
        var thisNotify = getCookie(notifyCookieObj);

        if ((thisNotify != null) && (thisNotify != "") && (thisNotify != 0) && (thisNotify != "0")) {
            var containsPickID = thisNotify.length > 1;
            if (!containsPickID) {
                customerWindow.notifyArray[x] = 0;
            } else {
                customerWindow.notifyArray[x] = thisNotify;
                thisNotify = thisNotify.toString();
                var thisRegisterNumber = Number(thisNotify.substring(0, 1));
                var thisOrderNumber = Number(thisNotify.substring(1, 3));
                var thisTimer = getCookie(timerCookieObj);
				var thisEndTimer = getCookie(endTimerCookieObj);
				if ((thisEndTimer == "") || (thisEndTimer == "0:00")) {
					thisEndTimer = "0:00";
				} else {
					// Repost to WebMOA an Order Pickup Event
					// ...
					thisEndTimer = "0:00";
				}
                if ((thisTimer == "") || (thisTimer == "0:00")) {
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] = "0:00";
					recentOrderArray[thisRegisterNumber][thisOrderNumber]['endTimer'] = thisEndTimer;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed30'] = false;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed60'] = false;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed90'] = false;
                } else {
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] = thisTimer;
					recentOrderArray[thisRegisterNumber][thisOrderNumber]['endTimer'] = thisEndTimer;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['isOnScreen'] = true;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed30'] = false;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed60'] = false;
                    recentOrderArray[thisRegisterNumber][thisOrderNumber]['flashed90'] = false;
                }
            }
        }
    }

}

/*
function CheckSystemMode() {
    var systemMode = getCookie("systemMode");
    if (systemMode == "active") {
        var thisURL = protocolName + "//" + domainName + portName + "/"
        top.location = thisURL;
    }
}
*/

function GetONSURL() {
    //console.log("customerWindow.GetONSURL()");
    //var thisURL = productURL + "/v" + majorVersion + "/" + minorVersion + "/";
    //var thisURL = productURL + "/Home?loadCrew=true";
    var thisURL = "cust.html";
    var thisURL = "";
    return thisURL;
}

/*
function OpenInitWindow() {
	var moveToRight = 0;
	var theAvailLeft = screen.width;
	if(theAvailLeft > 0) {
		moveToRight = screen.width - theAvailLeft;
	} else {
		moveToRight = screen.width;
	}
	initWindow = window.open(customerWindow.GetONSURL()+"init.html", "initWindow", "height=100,width=100,left="+moveToRight+",top=0,location=0,menubar=0,scrollbars=0,titlebar=0,toolbar=0");
}
*/

/*
function OpenCustomerWindow() {
	var moveToRight = 0;
	var theAvailLeft = initWindow.screenLeft;
	if(theAvailLeft > 0) {
		moveToRight = customerDisplayWidth - theAvailLeft;
	} else {
		moveToRight = customerDisplayWidth;
	}
	customerWindow = window.open(customerWindow.GetONSURL()+customerFile, "customerWindow", "height=100,width=100,left="+moveToRight+",top=-10,location=0,menubar=0,scrollbars=0,titlebar=0,toolbar=0,fullscreen=1");
	ResizeCustomerWindow();
}
*/




function ResizeCustomerWindow() {
    //console.log("customerWindow.ResizeCustomerWindow()");
    customerWindow.resizeTo(customerDisplayWidth, customerDisplayHeight);
    var moveToRight = 0;
    var theAvailLeft = customerWindow.screenLeft;
    if (theAvailLeft > 0) {
        moveToRight = screen.width - theAvailLeft;
    } else {
        moveToRight = screen.width;
    }
    customerWindow.moveBy(moveToRight, 0);
}


function CrewWindowIsMinimised() {
    //console.log("customerWindow.CrewWindowIsMinimised()");
    var cname = "ONSminimised";
    return getCookie(cname);
}


function ExitONS() {
    //console.log("customerWindow.ExitONS()");
    var cname = "ONSrunning";
    var cvalue = "0";
    var exdays = "365";
    deleteCookie(cname);
    setCookie(cname, cvalue, exdays);
    if (crewWindow != null) {
        crewWindow.close();
    }
}


function StartONS() {
    //console.log("customerWindow.StartONS()");
    var cname = "ONSrunning";
    var cvalue = "1";
    var exdays = "365";
    deleteCookie(cname);
    setCookie(cname, cvalue, exdays);
    InitArrays();
    toggleFullScreen(customerWindow, true);
    toggleFullScreen(crewWindow, true);
}


function CheckCloseAllFlagIsTrue() {
    //console.log("customerWindow.CheckCloseAllFlagIsTrue()");
    if (customerWindow.closeAllFlag) {
		
        //if (crewWindow != null) {
		if(crewWindow && !crewWindow.closed) {
			crewWindow.close();
			customerWindow.close();
		} else {
		//if (crewWindow.closed) {
		//if(customerWindow.crewWindowIsClosed) {
			customerWindow.CloseAllWindows();
		}
        //}
    } else {
        // keep crewWindow open
		
        //if (crewWindow != null) {
            //if (crewWindow.closed) {
			//if(customerWindow.crewWindowIsClosed) {
		if(!crewWindow || crewWindow.closed) {
			// already opened and closed
			if (!customerWindow.crewWindowCloseFlag) {
				RelaunchCrewWindow();
			}
		} else {
			if (customerWindow.crewWindowShouldBeMinimised) {
				var crewWindowIsMinimised = CrewWindowIsMinimised();
				if (!crewWindowIsMinimised) {
					MinimiseCrewWindow();
				}
			} else {
				var crewWindowIsMinimised = CrewWindowIsMinimised();
				if (crewWindowIsMinimised) {
					MaximiseCrewWindow();
				}
			}
		}
			/*
        } else {
            RelaunchCrewWindow();
        }
		*/
    }
}


function CloseAllWindows() {
    //console.log("customerWindow.CloseAllWindows()");
    //customerWindow.focus();
    //if(customerWindow.closeAllFlag == true) {
    crewWindow.closeAllFlag = true;
    customerWindow.closeAllFlag = true;
    customerWindow.crewWindowCloseFlag = true;
    customerWindow.crewWindowShouldBeClosed = true;
	console.log("CloseAllWindows1");
    //customerWindow.focus();
    if (!customerWindow.crewWindowIsClosed) {
		console.log("CloseAllWindows2");
        if (thisWindow == "crew") {
			console.log("CloseAllWindows3");
            customerWindow.close();

            setTimeout(function () {
                //console.log("CloseAllWindows > customerWindow.setTimeout()1");
                //if (crewWindow != null) {
				if (crewWindow && !crewWindow.closed) {
                    crewWindow.close();
                }
            }, 750);

        } else {
			console.log("CloseAllWindows4");
            if (crewWindow && !crewWindow.closed) {
                crewWindow.close();
            }

            setTimeout(function () {
                //console.log("CloseAllWindows > customerWindow.setTimeout()2");
                //if (customerWindow != null) {
                    customerWindow.close();
                //}
            }, 750);
			console.log("CloseAllWindows5");
        }
    } else {
		console.log("CloseAllWindows6");
	}
}





function notifyoffcustomer() {
    //console.log("customerWindow.notifyoffcustomer()");
    //customerWindow.CloseAllWindows();
}


/*
function CheckVersion(latestVersion) {

	if(top.currentVersion != latestVersion) {
		var redirectURL = protocolName+"//"+domainName+"/"+productName+"/";
		top.location = redirectURL;
	}

}
*/


function RelaunchCrewWindow() {
    //console.log("customerWindow.RelaunchCrewWindow()");
    //if(customerWindow.crewWindowCloseFlag == false) {

    setTimeout(function () {
        //console.log("RelaunchCrewWindow > customerWindow.setTimeout()1");
        customerWindow.closeAllFlag = false;
        customerWindow.crewWindowCloseFlag = false;
        
        customerWindow.crewWindowShouldBeMinimised = false;
        customerWindow.crewWindowShouldBeMaximised = true;

        OpenCrewWindow();
		
    }, 500);

    //}
}


function OpenCrewWindow() {
    //console.log("customerWindow.OpenCrewWindow()");
    //crewWindow = window.open(customerWindow.GetONSURL() + crewFile, "crewWindow", "height=100,width=100,left=0,top=0,location=0,menubar=0,scrollbars=0,titlebar=0,toolbar=0,dialog=1,close=0");
    crewWindow = window.open("crew.html", "crewWindow", "height=100,width=100,left=0,top=0,location=0,menubar=0,scrollbars=0,titlebar=0,toolbar=0,dialog=1,close=0,alwaysRaised=1");
    crewWindow.focus();
    crewWindow.moveTo(0, 0);
    //crewWindow.closed = false;
	//customerWindow.crewWindowIsClosed = false;

}

/*
function checkWindowPosition() {
	if(leftPosition != parseFloat(customerWindow.screenLeft)) {
		customerWindow.moveTo(0,0);
		//self.resizeTo(100,100);
		//var myAvailWidth = screen.availWidth;
		//alert(myAvailWidth);
		leftPosition = parseFloat(customerWindow.screenLeft);
		topPosition = parseFloat(customerWindow.screenTop);
		ResetExtendedWindow();
	} else if(topPosition != parseFloat(customerWindow.screenTop)) {
		customerWindow.moveTo(0,0);
		//self.resizeTo(100,100);
		leftPosition = parseFloat(customerWindow.screenLeft);
		topPosition = parseFloat(customerWindow.screenTop);
		ResetExtendedWindow();
	}
	
}
*/

/*
if(crewDisplayHeight > customerDisplayHeight) {
    var desktopHeight = crewDisplayHeight + verticalOffset;
} else {
    var desktopHeight = customerDisplayHeight + verticalOffset;
}
var windowHeight = ((desktopHeight + edgeBottom) - edgeTop);

var extendedDesktop = self;
extendedDesktop.moveTo(0,0);
//extendedDesktop.resizeTo(100, 100); 

var bodyTagHeight = desktopHeight + "px";
var bodyTagWidth = desktopWidth + "px";
document.getElementById("bodytag").style.width = bodyTagWidth;
document.getElementById("bodytag").style.height = bodyTagHeight;

extendedDesktop.moveTo(edgeLeft,edgeTop);
extendedDesktop.resizeTo(windowWidth, windowHeight); 
leftPosition = parseFloat(self.screenLeft);
topPosition = parseFloat(self.screenTop);
    
*/

/*extendedDesktop.outerWidth = windowWidth;
extendedDesktop.outerHeight = windowHeight;
extendedDesktop.innerWidth = windowWidth;
extendedDesktop.innerHeight = windowHeight;
//document.webkitIsFullScreen(true);
toggleFullScreen();
//extendedDesktop.resizeTo(100,100);
//extendedDesktop.moveTo(screen.width+100,0);
//alert(screen.height);
*/


/*
function ResetCrewWindow() {

    var bodyTagHeight = crewWindowHeight + "px";
    var bodyTagWidth = crewDisplayWidth + "px";
    document.getElementById("bodytagcrew").style.width = bodyTagWidth;
    document.getElementById("bodytagcrew").style.height = bodyTagHeight;
    document.getElementById("contentcrew").style.height = "100%";

    var iMax = maxNotificationBoxes;
    for (var i = 0; i < iMax; i++) {

        var notifyObj = "notify" + i;
        var tileObj = "tile" + i;
        if (notifyArray[i] == 0) {
            crewWindow.document.getElementById(notifyObj).className = "notifyoffcrew";
            crewWindow.document.getElementById(tileObj).className = "tileoff";
        } else {
            crewWindow.document.getElementById(notifyObj).className = "notifyoncrew";
            crewWindow.document.getElementById(tileObj).className = "tileon";
        }

    }
}
*/

function ResetCustomerWindow() {
    //console.log("customerWindow.ResetCustomerWindow()");
    customerWindow.toggleFullScreen(customerWindow, true);

    setTimeout(function () {
        //console.log("ResetCustomerWindow > customerWindow.setTimeout()1");
        customerWindow.customerDisplayWidth = customerWindow.innerWidth;
        customerWindow.customerDisplayHeight = customerWindow.innerHeight;
        var bodyTagHeight = customerWindow.customerDisplayHeight;
        var bodyTagWidth = customerWindow.customerDisplayWidth;

        /*
		document.getElementById("bodytagcustomer").style.width = bodyTagWidth;
		document.getElementById("headeroutercustomer").style.width = bodyTagWidth;
		document.getElementById("middlecustomer").style.width = bodyTagWidth;
		document.getElementById("footeroutercustomer").style.width = bodyTagWidth;
		document.getElementById("headercustomer").style.width = bodyTagWidth;
		document.getElementById("footercustomer").style.width = bodyTagWidth;
		*/

        customerWindow.$j("#bodytagcustomer").css("height", bodyTagHeight);
        customerWindow.$j("#bodytagcustomer").css("width", bodyTagWidth);
        //document.getElementById("contentcustomer").style.height = customerWindow.customerDisplayHeight + "px";
        var headerCustomerHeight = Math.round(customerWindow.customerDisplayHeight * 0.10);
        var middleCustomerHeight = Math.round(customerWindow.customerDisplayHeight * 0.70);
        var footerCustomerHeight = Math.round(customerWindow.customerDisplayHeight * 0.10);

        /*
		var headerMessageCustomerFontSize = customerWindow.document.getElementById("headermessagecustomer").style.fontSize;
		//headerMessageCustomerFontSize = headerMessageCustomerFontSize.substring(0, headerMessageCustomerFontSize.length);
		alert(headerMessageCustomerFontSize);
		
		headerMessageCustomerFontSize = Number(headerMessageCustomerFontSize);
		headerMessageCustomerFontSize = Math.round(headerMessageCustomerFontSize * (customerWindow.customerDisplayHeight / 1080));
		headerMessageCustomerFontSize = headerMessageCustomerFontSize+"%";
		alert(headerMessageCustomerFontSize);
		customerWindow.document.getElementById("headermessagecustomer").style.fontSize = headerMessageCustomerFontSize;
		*/

        /*
        var numberRows = Math.ceil(maxNotificationBoxes / numberColumns);
        var notifyBoxHeightCustomer = Math.round((middleCustomerHeight / numberRows) * 0.82);
        //var notifyBoxHeightCrew = Math.round((middleCustomerHeight / numberRows)*0.88);
        var iMax = maxNotificationBoxes;
        for (var i = 0; i < iMax; i++) {
            customerWindow.document.getElementById("notify" + i).style.height = notifyBoxHeightCustomer + "px";
            //crewWindow.document.getElementById("notify"+i).style.height = notifyBoxHeightCrew+"px";
        }
        document.getElementById("headercustomer").style.height = headerCustomerHeight + "px";
        document.getElementById("middlecustomer").style.height = middleCustomerHeight + "px";
        document.getElementById("footercustomer").style.height = footerCustomerHeight + "px";
        // from: http://www.dhtmlgoodies.com/?whichScript=text_fit_in_box
        */

        /*
		fitTextInBox('headercustomer');
		fitTextInBox('footercustomer');
		*/
        //customerWindow.toggleFullScreen(true);
    }, 750);
}


function ToggleBoxVisibility(i) {
    //console.log("customerWindow.ToggleBoxVisibility("+i+")");
	if(crewWindow.allowBoxesToClose) {
		var notifyObj = "#notify" + i;
		var notifyCookieObj = "notify" + i;
		var timerCookieObj = "timer" + i;
		var endTimerCookieObj = "endtimer" + i;
		var tileObj = "#tile" + i;
		var pickID = customerWindow.$j(notifyObj).html();
		var boxContainsPickID = pickID.length > 1;
		var dateTime = Math.round(new Date().getTime());
		
		if (boxContainsPickID) {

			var registerNumber = pickID.substring(0, 1);
			var orderNumber = Number(pickID.substring(1, pickID.length));
			customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen'] = false;
			customerWindow.recentOrderArray[registerNumber][orderNumber]['endTimer'] = dateTime;
			var isHighestOrderNumber = orderNumber > customerWindow.recentHighestOrderNumber[registerNumber];
			if (isHighestOrderNumber) {
				var jMax = maxOrderNumber;
				for (var j = jMax; j > 0; j--) {
					var orderNumber = j;
					isNewHighestOrderNumber = customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen'] == true;
					if (isNewHighestOrderNumber) {
						customerWindow.recentHighestOrderNumber[registerNumber] = orderNumber;
					}
				}
			}
			//crewWindow.$(notifyObj).className = "";
			//customerWindow.$(notifyObj).className = "";
			crewWindow.jQuery(tileObj).attr('class', 'tileoff');
			customerWindow.$j(tileObj).attr('class', 'tileoff');
			customerWindow.notifyArray[i] = 0;
			deleteCookie(notifyCookieObj);
			setCookie(notifyCookieObj, 0, 36500);
			deleteCookie(timerCookieObj);
			setCookie(timerCookieObj, "0:00", 36500);
			deleteCookie(endTimerCookieObj);
			setCookie(endTimerCookieObj, dateTime, 36500);
		}
		//customerWindow.UpdateNotifyBoxes(pickID);
		customerWindow.ResortNotifyBoxes();

		// START set status for order pickID to "Collected"
		var newStatus = "Collected";
		UpdateOrdersTable(pickID, newStatus, dateTime);
		// END set status
	}
}


function UpdateNotifyBoxes(pickID) {
    console.log("test1");
    //console.log("customerWindow.UpdateNotifyBoxes("+pickID+")");
    var iMax = customerWindow.notifyArray.length - 1;
    for (var i = iMax; i > 0; i--) {
        customerWindow.notifyArray[i] = customerWindow.notifyArray[i - 1];
        //customerWindow.timerArray[i] = customerWindow.timerArray[i - 1];
        console.log("notifyArray[" + i + "]: " + customerWindow.notifyArray[i]);
    }
    customerWindow.notifyArray[0] = pickID;
   // var thisRegisterNumber = pickID.substring(0, 1);
   // var thisOrderNumber = pickID.substring(1, 2);
    //recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] = 0;
    //customerWindow.timerArray[0] = (((new Date().getTime())/1000) - ((new Date().getTime())/1000));

    console.log("notifyArray[0]: " + customerWindow.notifyArray[0]);
    customerWindow.ResortNotifyBoxes();

    // START Insert new Order into Orders table on server
    var newStatus = "Ready";
	var dateTime = Math.round(new Date().getTime());
    UpdateOrdersTable(pickID, newStatus, dateTime);
    // END Update
}





function UpdateOrdersTable(pickID, newStatus, dateTime) {
	if(pushRequests = pushACKs) {
		
	}
	pushRequests++;
    //var $j = jQuery.noConflict();
    console.log("log1");
    // START Insert new Order into Orders table on server
    customerWindow.$j("#UpdateOrdersTableIframe").contents().find("#OrderNo").val(pickID);
    customerWindow.$j("#UpdateOrdersTableIframe").contents().find("#StatusCode").val(newStatus);
	customerWindow.$j("#UpdateOrdersTableIframe").contents().find("#DateTime").val(dateTime);
    customerWindow.$j("#UpdateOrdersTableIframe").contents().find("#Orders").submit();
    //customerWindow.UpdateOrdersTableIframe.$j("#OrderNo").val(pickID);
    //customerWindow.UpdateOrdersTableIframe.$j("#StatusCode").val(newStatus);
    //customerWindow.UpdateOrdersTableIframe.$j("#Orders").submit();
    //console.log(pickID);
    //console.log(customerWindow.UpdateOrdersTableIframe.$("#OrderNo").val());
    // END Insert new Order into Orders table on server
    console.log("log2");
}

/*
function UpdateOrderStatus(pickID, newStatus) {
    // START Update Order Status in Orders table on server
    //top.UpdateOrdersTableIframe.$("#OrderNo").val(pickID);
    //top.UpdateOrdersTableIframe.$("#Status").val(newStatus);
    //top.UpdateOrdersTableIframe.$("#form0").submit();

    //top.UpdateOrdersTableIframe.$("#OrderNo").val(pickID);
    //top.UpdateOrdersTableIframe.$("#form0").submit();
    //console.log(pickID);
    //console.log(top.UpdateOrdersTableIframe.$("#OrderNo").val());

    // END Update Order Status in Orders table on server
}
*/

function GetNumberOrdersOnScreen() {
    var jMax = customerWindow.maxNotificationBoxes;
    var $j = jQuery.noConflict();
    var ordersOnScreen = 0;
    for (var j = 0; j < jMax; j++) {
        var notifyObj1 = "#notify" + j;
        var testVar = customerWindow.notifyArray[j];
        if ((testVar != null) && (testVar != 0) && (testVar != "0") && (testVar != "")) {
            ordersOnScreen++;
        }
    }
    return ordersOnScreen;
}

function ResortNotifyBoxes() {
    //console.log("customerWindow.ResortNotifyBoxes()");
    var jMax = customerWindow.maxNotificationBoxes;
    var notifyArray2 = new Array(customerWindow.maxNotificationBoxes);
    //var timerArray2 = new Array(customerWindow.maxNotificationBoxes);
    var mMax = customerWindow.maxNotificationBoxes;
    for (var m = 0; m < mMax; m++) {
        notifyArray2[m] = 0;
        //timerArray2[m] = 0;
    }
    var ordersOnScreen = GetNumberOrdersOnScreen();
    var k = 0;
    var $j = jQuery.noConflict();
    for (var j = 0; j < jMax; j++) {
        var notifyObj1 = "#notify" + j;
        crewWindow.jQuery(notifyObj1).html("");
        customerWindow.$j(notifyObj1).html("");
        if (customerWindow.notifyArray[j] != 0) {
            //ordersOnScreen++;
            notifyArray2[k] = customerWindow.notifyArray[j];
            //timerArray2[k] = customerWindow.timerArray[j];
            k++;
        }
    }
    customerWindow.notifyArray = notifyArray2;
    //customerWindow.timerArray = timerArray2;
    
    if (ordersOnScreen > 0) {
        customerWindow.$j("#cust-header-text").html("Your order is ready to collect");
    } else {
        customerWindow.$j("#cust-header-text").html("Watch here for your number");
    }

    /*
    if (ordersOnScreen > 12) {
        customerWindow.$j("#cust-orders").css("height", "67.75vh");

        customerWindow.$j("#cust-content-outer").css("height", "0vh");
        customerWindow.$j("#cust-content-outer").css("display", "none");
        customerWindow.$j("#cust-content-outer").css("visibility", "hidden");

        customerWindow.$j("#cust-content").css("height", "0vh");
        customerWindow.$j("#cust-content").css("display", "none");
        customerWindow.$j("#cust-content").css("visibility", "hidden");

        customerWindow.$j("#slider1").css("display", "none");
        customerWindow.$j("#slider1").css("visibility", "hidden");
        customerWindow.$j("#slider1").css("height", "0vh");
        customerWindow.$j("#slider1").css("width", "0vw");

        customerWindow.$j("#slider2").css("display", "none");
        customerWindow.$j("#slider2").css("visibility", "hidden");
        customerWindow.$j("#slider2").css("height", "0vh");
        customerWindow.$j("#slider2").css("width", "0vw");
        
    } else if (ordersOnScreen > 6) {

        customerWindow.$j("#cust-orders").css("height", "45.5vh");

        customerWindow.$j("#cust-content-outer").css("height", "22.75vh");
        customerWindow.$j("#cust-content-outer").css("display", "block");
        customerWindow.$j("#cust-content-outer").css("visibility", "visible");

        customerWindow.$j("#cust-content").css("height", "22.75vh");
        customerWindow.$j("#cust-content").css("display", "block");
        customerWindow.$j("#cust-content").css("visibility", "visible");

        customerWindow.$j("#slider1").css("height", "22.75vh");
        customerWindow.$j("#slider1").css("width", "50vw");
        customerWindow.$j("#slider1").css("display", "block");
        customerWindow.$j("#slider1").css("visibility", "visible");

        customerWindow.$j("#slider2").css("height", "22.75vh");
        customerWindow.$j("#slider2").css("width", "50vw");
        customerWindow.$j("#slider2").css("display", "block");
        customerWindow.$j("#slider2").css("visibility", "visible");

    } else {

        customerWindow.$j("#cust-orders").css("height", "22.75vh");

        customerWindow.$j("#cust-content").css("height", "45.5vh");
        customerWindow.$j("#cust-content").css("display", "block");
        customerWindow.$j("#cust-content").css("visibility", "visible");

        customerWindow.$j("#cust-content-outer").css("height", "45.5vh");
        customerWindow.$j("#cust-content-outer").css("display", "block");
        customerWindow.$j("#cust-content-outer").css("visibility", "visible");
        
        customerWindow.$j("#slider1").css("display", "block");
        customerWindow.$j("#slider1").css("visibility", "visible");
        customerWindow.$j("#slider1").css("height", "45.5vh");
        customerWindow.$j("#slider1").css("width", "100vw");

        customerWindow.$j("#slider2").css("display", "none");
        customerWindow.$j("#slider2").css("visibility", "hidden");
        customerWindow.$j("#slider2").css("height", "0vh");
        customerWindow.$j("#slider2").css("width", "0vw");
        
    }
    */

    var iMax = customerWindow.maxNotificationBoxes;
    for (var i = 0; i < iMax; i++) {
        //console.log("i:" + i);
        //console.log(customerWindow.notifyArray[i]);
        var notifyObj = "#notify" + i;
        var timerObj = "#timer" + i;
        var notifyCookieObj = "notify" + i;
        var timerCookieObj = "timer" + i;
		var endTimerCookieObj = "endtimer" + i;
        var tileObj = "#tile" + i;
        //var tileCookieObj = "tile" + i;
        var pickID = customerWindow.notifyArray[i];
        if ((pickID == null) || (pickID == "") || (pickID == 0) || (pickID == "0")) {
            crewWindow.jQuery(notifyObj).html("");
            //crewWindow.jQuery(timerObj).html("");
            customerWindow.$j(notifyObj).html("");
            crewWindow.jQuery(tileObj).attr('class', 'tileoff');
            customerWindow.$j(tileObj).attr('class', 'tileoff');
            crewWindow.jQuery(timerObj).html('0:00');
            deleteCookie(notifyCookieObj);
            deleteCookie(timerCookieObj);
			deleteCookie(endTimerCookieObj);
            setCookie(notifyCookieObj, 0, 36500);
            setCookie(timerCookieObj, "0:00", 36500);
			setCookie(endTimerCookieObj, "0:00", 36500);
        } else {
            
            crewWindow.jQuery(notifyObj).html(pickID);
            pickID = pickID.toString();
            var thisRegisterNumber = Number(pickID.substring(0, 1));
            var thisOrderNumber = Number(pickID.substring(1, 3));
            console.log("thisRegisterNumber:" + thisRegisterNumber + "thisOrderNumber:" + thisOrderNumber);

            var thisTimer = new Date().getTime();
            if (customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] != "0:00") {
                thisTimer = Math.round((thisTimer - customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer']));
            }
            //crewWindow.jQuery(timerObj).html(Math.round(thisTimer / 1000));

            //crewWindow.jQuery(timerObj).html(customerWindow.timerArray[i]);
            customerWindow.$j(notifyObj).html(pickID);
            crewWindow.jQuery(tileObj).attr('class', 'tileon');
            customerWindow.$j(tileObj).attr('class', 'tileon');
            deleteCookie(notifyCookieObj);
            setCookie(notifyCookieObj, pickID, 36500);
            deleteCookie(timerCookieObj);
            setCookie(timerCookieObj, customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'], 36500);
			deleteCookie(endTimerCookieObj);
			setCookie(endTimerCookieObj, "0:00", 36500);
            //console.log("tileon" + i);
            
        }
    }
    UpdateOrdersCustomerTemplate();
    UpdateOrdersCrewTemplate();

	var timerDelay = 100; // was 100;
    setTimeout(function () {
        //console.log("customerWindow.ResortNotifyBoxes()setTimeout()1");
        crewWindow.focus();
        if (crewWindow.focusElement != "barcode") {
            crewWindow.jQuery("#barcode").val(crewWindow.jQuery("#barcode").val());
            crewWindow.jQuery("#barcode").select();
        }
    }, timerDelay);

    //customerWindow.UpdateNotifyBoxes();
    
}



function UpdateOrdersCustomerTemplate() {
    var $j = jQuery.noConflict();
    var ordersOnScreen = GetNumberOrdersOnScreen();
    var hMax = customerWindow.maxNotificationBoxes;
    console.log("orders:" + ordersOnScreen);
    console.log("maxNotificationBoxes:" + hMax);

    var tileWidth = 0;
    var tileHeight = 0;
    var tilePaddingLeft = 0;
    var tilePaddingRight = 2.25;
    var tilePaddingTop = 0;
    var fontSize = 0;
    var letterSpacing = 0.6;

    if (ordersOnScreen < 2) {

        tileWidth = 90.3;
        tileHeight = 55;
        tilePaddingLeft = 7.5;
        tilePaddingTop = 7.5;
        fontSize = 41;
        letterSpacing = 0.85;

    } else if (ordersOnScreen < 3) {
        
        tileWidth = 48.75;
        tileHeight = 38;
        tilePaddingLeft = 2;
        tilePaddingTop = 15.2;
        fontSize = 24.6;
        fontSize = 24.6;
        letterSpacing = 0.625;
/*
    } else if (ordersOnScreen < 4) {

        tileWidth = 32.66;
        tileHeight = 31.55;
        tilePaddingLeft = 1.75;
        tilePaddingTop = 18.2;
        fontSize = 15.25;
        letterSpacing = 0.595;
*/
    } else if (ordersOnScreen < 5) {

        tileWidth = 48.25;
        tileHeight = 31.6;
        tilePaddingLeft = 4;
        tilePaddingRight = 4;
        tilePaddingTop = 3.4;
        fontSize = 21;
        letterSpacing = 0.595;

    } else if (ordersOnScreen < 7) {

        tileWidth = 32.66;
        tileHeight = 31.7;
        tilePaddingLeft = 1.75;
        tilePaddingTop = 3.25;
        fontSize = 15.5;
        letterSpacing = 0.485;

    } else if (ordersOnScreen < 10) {

        tileWidth = 32.66;
        tileHeight = 21.25;
        tilePaddingLeft = 1.55;
        tilePaddingTop = 3;
        fontSize = 13;
        letterSpacing = 0.485;

    } else if (ordersOnScreen < 13) {

        tileWidth = 24.25;
        tileHeight = 21;
        tilePaddingLeft = 3.1;
        tilePaddingRight = 2.85;
        tilePaddingTop = 3;
        fontSize = 11;
        letterSpacing = 0.41;

    } else if (ordersOnScreen < 16) {


        tileWidth = 19.5;
        tileHeight = 21.02;
        tilePaddingLeft = 2.5;
        tilePaddingRight = 2.9;
        tilePaddingTop = 3;
        fontSize = 9;
        letterSpacing = 0.38;

    } else if (ordersOnScreen < 19) {

        tileWidth = 16.25;
        tileHeight = 21.05;
        tilePaddingLeft = 2;
        tilePaddingRight = 2;
        tilePaddingTop = 3;
        fontSize = 6.5;
        letterSpacing = 0.33;

    }

    var orderbgHeight = tileHeight - 3;
    var orderbgWidth = tileWidth - tilePaddingRight;
    orderbgWidth = orderbgWidth + "vw";
    orderbgHeight = orderbgHeight + "vh";
    tileWidth = tileWidth + "vw";
    tileHeight = tileHeight + "vh";
    tilePaddingLeft = tilePaddingLeft + "vh";
    tilePaddingRight = tilePaddingRight + "vh";
    tilePaddingTop = tilePaddingTop + "vh";
    fontSize = fontSize + "vw";
    letterSpacing = letterSpacing + "vw";

    console.log("tileWidth:" + tileWidth);
    console.log("tileHeight:" + tileHeight);
    console.log("orderbgWidth:" + orderbgWidth);
    console.log("orderbgHeight:" + orderbgHeight);
    console.log("fontSize:" + fontSize);

    for (var h = 0; h < hMax; h++) {
        var tileObj = "#tile" + h;
        var orderbgObj = "#orderbg" + h;
        var notifyObj = "#notify" + h;
        $j(tileObj).css("width", tileWidth);
        $j(tileObj).css("height", tileHeight);
        $j(tileObj).css("padding-left", tilePaddingLeft);
        //$j(tileObj).css("padding-right", tilePaddingRight);
        $j(tileObj).css("padding-top", tilePaddingTop);
        $j(orderbgObj).css("width", orderbgWidth);
        $j(orderbgObj).css("height", orderbgHeight);
        $j(notifyObj).css("font-size", fontSize);
        $j(notifyObj).css("letter-spacing", letterSpacing);
    }

}



function UpdateOrdersCrewTemplate() {
    var $j = jQuery.noConflict();
    var ordersOnScreen = GetNumberOrdersOnScreen();
    var hMax = customerWindow.maxNotificationBoxes;
    console.log("orders:" + ordersOnScreen);
    console.log("maxNotificationBoxes:" + hMax);

	//var crewOrdersHorizontalPadding = 10;
	var crewOrdersPaddingLeft = 5;
	var crewOrdersPaddingRight = 5;
    var tileWidth = 0;
    var tileHeight = 0;
    var notifyHeight = 0;
    var notifyPaddingTop = 0;
    var timerHeight = 0;
    var tilePaddingLeft = 0;
    var tilePaddingRight = 0;
    var tilePaddingTop = 0;
    var orderFontSize = 0;
    var orderbgHeight = 0;
    var orderbgWidth = 0;
    var orderbgPaddingTop = 0;
	var orderbgBorderWidth = 1;
	var orderbgBorderRadius = 5;
    var timerFontSize = 0;
    var timerTop = 500;
    var timerPaddingTop = 20;
    var letterSpacing = 0.6;

    if (ordersOnScreen < 2) {

		crewOrdersPaddingLeft = 10;
		crewOrdersPaddingRight = 10;
        tileWidth = 100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight);
        tileHeight = tileWidth / 1.88;
		//tileWidth = tileHeight * 1.88;
        tilePaddingLeft = 0;
        tilePaddingTop = 9.6;
        orderFontSize = 38;
        timerFontSize = orderFontSize * 0.22;
        timerTop = 10;
        letterSpacing = 0.85;
		orderbgBorderWidth = orderbgBorderWidth * 1;
		orderbgBorderRadius = orderbgBorderRadius * 1;

    } else if (ordersOnScreen < 3) {

		crewOrdersPaddingLeft = 0.9;
		crewOrdersPaddingRight = 5.5;
        //tileWidth = 47.62;
        //tileHeight = 25;
		//tileWidth = tileHeight * 1.88;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 2;
        tileHeight = tileWidth / 1.88;
        tilePaddingLeft = 3.4;
        tilePaddingRight = 2.25;
        tilePaddingTop = 21;
        orderFontSize = 20;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        letterSpacing = 0.625;
		orderbgBorderWidth = orderbgBorderWidth * 0.8;
		orderbgBorderRadius = orderbgBorderRadius * 0.8;

    } else if (ordersOnScreen < 4) {

		crewOrdersPaddingLeft = 0;
		crewOrdersPaddingRight = 4.5;
        //tileWidth = 31.8;
        //tileHeight = 20;
		//tileWidth = tileHeight * 1.88;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 3;
        tileHeight = tileWidth / 1.5;
        tilePaddingLeft = 3;
        tilePaddingRight = 2.25;
        tilePaddingTop = 23.75;
        orderFontSize = 15.5;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        letterSpacing = 0.595;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    } else if (ordersOnScreen < 5) {

		crewOrdersPaddingLeft = 0;
		crewOrdersPaddingRight = 7;
        //tileWidth = 48.175;
        //tileHeight = 26;
		//tileWidth = tileHeight * 1.65;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 2;
        tileHeight = tileWidth / 1.95;
        tilePaddingLeft = 4.6;
        tilePaddingRight = 2.25;
        tilePaddingTop = 5.8;
        orderFontSize = 19.33;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        letterSpacing = 0.595;
		crewOrdersPaddingLeft = 0;
		orderbgBorderWidth = orderbgBorderWidth * 0.8;
		orderbgBorderRadius = orderbgBorderRadius * 0.8;
		
    } else if (ordersOnScreen < 7) {

		crewOrdersPaddingLeft = 0;
		crewOrdersPaddingRight = 3.2;
        //tileWidth = 32;
        //tileHeight = 31;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 3;
        tileHeight = tileWidth / 1.3;
        tilePaddingLeft = 3;
        tilePaddingRight = 3;
        tilePaddingTop = 4.85;
        orderFontSize = 19.2;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        letterSpacing = 0.485;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    } else if (ordersOnScreen < 10) {

		crewOrdersPaddingLeft = 6;
		crewOrdersPaddingRight = 9;
        //tileWidth = 31.9;
        //tileHeight = 21.02;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 3;
        tileHeight = tileWidth / 1.6;
        tilePaddingLeft = 3;
        tilePaddingRight = 3;
        tilePaddingTop = 2.5;
        orderFontSize = 13.3;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        timerPaddingTop = 0;
        letterSpacing = 0.38;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    } else if (ordersOnScreen < 13) {

		crewOrdersPaddingLeft = 1.5;
		crewOrdersPaddingRight = 1.5;
        //tileWidth = 24.05;
        //tileHeight = 21.02;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 4;
        tileHeight = tileWidth / 1.4;
        tilePaddingLeft = 1.5;
        tilePaddingRight = 3;
        tilePaddingTop = 3.3;
        orderFontSize = 12.7;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        timerPaddingTop = 0;
        letterSpacing = 0.38;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    } else if (ordersOnScreen < 17) {

		crewOrdersPaddingLeft = 5;
		crewOrdersPaddingRight = 6;
        //tileWidth = 19.2;
        //tileHeight = 21.02;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 4;
        tileHeight = tileWidth / 1.65;
        tilePaddingLeft = 2;
        tilePaddingRight = 2;
        tilePaddingTop = 1.7;
        orderFontSize = 9.25;
        timerFontSize = orderFontSize * 0.20;
        timerTop = 0;
        timerPaddingTop = 0;
        letterSpacing = 0.38;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    } else if (ordersOnScreen < 19) {

		crewOrdersPaddingLeft = 0;
		crewOrdersPaddingRight = 1.65;
        //tileWidth = 16.15;
        //tileHeight = 21;
		tileWidth = (100 - (crewOrdersPaddingLeft + crewOrdersPaddingRight)) / 6;
        tileHeight = tileWidth / 1.17;
        tilePaddingLeft = 1.65;
        tilePaddingRight = 1.65;
        tilePaddingTop = 9.6;
        orderFontSize = 9.25;
        timerFontSize = orderFontSize * 0.25;
        timerTop = 0;
        timerPaddingTop = 0;
        letterSpacing = 0.3;
		orderbgBorderWidth = orderbgBorderWidth * 0.6;
		orderbgBorderRadius = orderbgBorderRadius * 0.6;

    }

    tileHeight = tileHeight * 1.35;
    orderbgHeight = tileHeight - 3;
    orderbgWidth = tileWidth - tilePaddingRight;
    //orderbgPaddingTop = orderbgHeight * 0.005;
    orderbgPaddingTop = 0;
	
    notifyHeight = orderbgHeight * 0.65;
    timerHeight = orderbgHeight * 0.35;
    //notifyPaddingTop = notifyHeight * 0.005;
	notifyPaddingTop = 0;

	crewOrdersPaddingLeft = crewOrdersPaddingLeft + "vw";
	crewOrdersPaddingRight = crewOrdersPaddingRight + "vw";
    orderbgWidth = orderbgWidth + "vw";
    orderbgHeight = orderbgHeight + "vh";
    orderbgPaddingTop = orderbgPaddingTop + "vh";
    notifyHeight = notifyHeight + "vh";
    timerHeight = timerHeight + "vh";
    tileWidth = tileWidth + "vw";
    tileHeight = tileHeight + "vh";
    tilePaddingLeft = tilePaddingLeft + "vw";
    tilePaddingRight = tilePaddingRight + "vw";
    tilePaddingTop = tilePaddingTop + "vh";
    orderFontSize = orderFontSize + "vh";
	orderbgBorderWidth = orderbgBorderWidth + "vh";
	orderbgBorderRadius = orderbgBorderRadius + "vh";
    timerFontSize = timerFontSize + "vh";
    //timerTop = timerTop + "vh";
    timerPaddingTop = timerPaddingTop + "vh";
    letterSpacing = letterSpacing + "vw";

    console.log("tileWidth:" + tileWidth);
    console.log("tileHeight:" + tileHeight);
    console.log("orderbgWidth:" + orderbgWidth);
    console.log("orderbgHeight:" + orderbgHeight);
    console.log("fontSize:" + orderFontSize);

    for (var h = 0; h < hMax; h++) {
        var tileObj = "#tile" + h;
        var orderbgObj = "#orderbg" + h;
        var notifyouterObj = "#notifyouter" + h;
        var notifyObj = "#notify" + h;
        var timerObj = "#timer" + h;
		crewWindow.$j("#crew-orders").css("padding-left", crewOrdersPaddingLeft);
		crewWindow.$j("#crew-orders").css("padding-right", crewOrdersPaddingRight);
        crewWindow.$j(tileObj).css("width", tileWidth);
        crewWindow.$j(tileObj).css("height", tileHeight);
        crewWindow.$j(tileObj).css("padding-left", tilePaddingLeft);
        crewWindow.$j(tileObj).css("padding-top", tilePaddingTop);
        //$j(tileObj).css("padding-right", tilePaddingRight);
        
        crewWindow.$j(orderbgObj).css("height", orderbgHeight);
        crewWindow.$j(orderbgObj).css("width", orderbgWidth);
        crewWindow.$j(orderbgObj).css("padding-top", orderbgPaddingTop);
		crewWindow.$j(orderbgObj).css("border-width", orderbgBorderWidth);
		crewWindow.$j(orderbgObj).css("border-radius", orderbgBorderRadius);

        crewWindow.$j(notifyouterObj).css("height", notifyHeight);
        crewWindow.$j(notifyObj).css("height", notifyHeight);
        /*crewWindow.$j(notifyObj).css("padding-top", notifyPaddingTop);*/
        crewWindow.$j(notifyObj).css("font-size", orderFontSize);
        crewWindow.$j(notifyObj).css("letter-spacing", letterSpacing);

        crewWindow.$j(timerObj).css("height", timerHeight);
        crewWindow.$j(timerObj).css("font-size", timerFontSize);
        /*crewWindow.$j(timerObj).css("top", timerTop);
        crewWindow.$j(timerObj).css("padding-top", timerPaddingTop);
        */
    }

}



/*

function UpdateCustomerNotifyBoxes() {
    console.log("customerWindow.UpdateCustomerNotifyBoxes()");
    var jMax = customerWindow.maxNotificationBoxes;

    for (var j = 0; j < jMax; j++) {
        var notifyObj1 = "notify" + j;
        customerWindow.$(notifyObj1).innerHTML = "";
    }

    var iMax = customerWindow.maxNotificationBoxes;
    var ordersOnScreen = 0;

    for (var i = 0; i < iMax; i++) {

        var notifyObj = "notify" + i;
        var tileObj = "tile" + i;
        if (customerWindow.notifyArray[i] == 0) {
            customerWindow.$(notifyObj).innerHTML = "";
            //customerWindow.$(notifyObj).innerHTML = "";
            //$(notifyObj).className = "notifyoff";
            customerWindow.$(tileObj).className = "tileoff";
        } else {
            ordersOnScreen++;
            customerWindow.$(notifyObj).innerHTML = customerWindow.notifyArray[i];
            //$(notifyObj).className = "notifyoncustomer";
            customerWindow.$(tileObj).className = "tileon";

        }

    }


    if (ordersOnScreen > 0) {
        customerWindow.$("cust-header-text").innerHTML = "Your order is ready to collect";
    } else {
        customerWindow.$("cust-header-text").innerHTML = "Watch here for your number";
    }

    setTimeout(function () {
        console.log("customerWindow.UpdateCustomerNotifyBoxes() setTimeout()");
        crewWindow.focus();
        if (crewWindow.focusElement != "barcode") {
            crewWindow.$("barcode").value = crewWindow.$("barcode").value;
            crewWindow.$("barcode").select();
        }
    }, 100);

}
*/
/*
function makeCode() {
    //console.log("customerWindow.makeCode()");
    var qrcode = new QRCode(customerWindow.$("#qrcode"), {
        width: 100,
        height: 100,
        useSVG: false
    });
    var elText = "http://cnn.com/";
    
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }

    qrcode.makeCode(elText);
}
*/


/*
function toggleFullScreen(requestFullScreenMode) {
    //console.log("customerWindow.toggleFullScreen("+requestFullScreenMode+")");
    if (customerWindow != null) {
        if (!customerWindow.closed) {
            customerWindow.focus();
            if (!customerWindow.document.fullscreenElement &&    // alternative standard method
				  !customerWindow.document.mozFullScreenElement && !customerWindow.document.webkitFullscreenElement && !customerWindow.document.msFullscreenElement) {  // current working methods
                var isFullScreenMode = false;
            } else {
                var isFullScreenMode = true;
            }
            if (!isFullScreenMode) {
                if (requestFullScreenMode) {
                    if (customerWindow.document.documentElement.requestFullscreen) {
                        customerWindow.document.documentElement.requestFullscreen();
                    } else if (customerWindow.document.documentElement.msRequestFullscreen) {
                        customerWindow.document.documentElement.msRequestFullscreen();
                    } else if (customerWindow.document.documentElement.mozRequestFullScreen) {
                        customerWindow.document.documentElement.mozRequestFullScreen();
                    } else if (customerWindow.document.documentElement.webkitRequestFullscreen) {
                        customerWindow.document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            } else {
                if (!requestFullScreenMode) {
                    if (customerWindow.document.exitFullscreen) {
                        customerWindow.document.exitFullscreen();
                    } else if (customerWindow.document.msExitFullscreen) {
                        customerWindow.document.msExitFullscreen();
                    } else if (customerWindow.document.mozCancelFullScreen) {
                        customerWindow.document.mozCancelFullScreen();
                    } else if (customerWindow.document.webkitExitFullscreen) {
                        customerWindow.document.webkitExitFullscreen();
                    }
                }
            }
        }
    }
    if (crewWindow != null) {
        if (!crewWindow.closed) {
            if (!CrewWindowIsMinimised()) {
                crewWindow.focus();
                if (crewWindow.focusElement != "barcode") {
                    crewWindow.$("#barcode").val(crewWindow.$("#barcode").val());
                    crewWindow.$("#barcode").select();
                }
            }
        }
    }
}
*/



function toggleFullScreen(myWindow, requestFullScreenMode) {
    //console.log("customerWindow.toggleFullScreen("+requestFullScreenMode+")");
    if (myWindow != null) {
        if (!myWindow.closed) {
            myWindow.focus();
            if (!myWindow.document.fullscreenElement &&    // alternative standard method
				  !myWindow.document.mozFullScreenElement && !myWindow.document.webkitFullscreenElement && !myWindow.document.msFullscreenElement) {  // current working methods
                var isFullScreenMode = false;
            } else {
                var isFullScreenMode = true;
            }
            if (!isFullScreenMode) {
                if (requestFullScreenMode) {
                    if (myWindow.document.documentElement.requestFullscreen) {
                        myWindow.document.documentElement.requestFullscreen();
                    } else if (myWindow.document.documentElement.msRequestFullscreen) {
                        myWindow.document.documentElement.msRequestFullscreen();
                    } else if (myWindow.document.documentElement.mozRequestFullScreen) {
                        myWindow.document.documentElement.mozRequestFullScreen();
                    } else if (myWindow.document.documentElement.webkitRequestFullscreen) {
                        myWindow.document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            } else {
                if (!requestFullScreenMode) {
                    if (myWindow.document.exitFullscreen) {
                        myWindow.document.exitFullscreen();
                    } else if (myWindow.document.msExitFullscreen) {
                        myWindow.document.msExitFullscreen();
                    } else if (myWindow.document.mozCancelFullScreen) {
                        myWindow.document.mozCancelFullScreen();
                    } else if (myWindow.document.webkitExitFullscreen) {
                        myWindow.document.webkitExitFullscreen();
                    }
                }
            }
        }
    }
    /*
    if (crewWindow != null) {
        if (!crewWindow.closed) {
            if (!CrewWindowIsMinimised()) {
                crewWindow.focus();
                if (crewWindow.focusElement != "barcode") {
                    crewWindow.$("#barcode").val(crewWindow.$("#barcode").val());
                    crewWindow.$("#barcode").select();
                }
            }
        }
    }
    */
}



function ResetCrewWindow() {
	if (customerWindow.crewWindow && !customerWindow.crewWindow.closed) {
		//console.log("customerWindow.ResetCrewWindow()");
		var bodyTagHeight = customerWindow.crewWindowHeight;
		var bodyTagWidth = customerWindow.crewDisplayWidth;
		var bodyObj = "#bodytagcrew";
		crewWindow.$j(bodyObj).css('width', bodyTagWidth);
		crewWindow.$j(bodyObj).css('height', bodyTagHeight);

		crewWindow.$j("#maximiseformdiv").css("visibility", "hidden");
		crewWindow.$j("#maximiseformdiv").css("display", "none");
		crewWindow.$j("#contentcrew").css("visibility", "visible");
		crewWindow.$j("#contentcrew").css("display", "inline");



		crewWindow.$j(bodyObj).css("height", "100%");
		crewWindow.$j(bodyObj).css("width", "100%");



		//document.getElementById("bodytagcrew").style.width = "100px";
		//document.getElementById(bodyObj).style.height = bodyTagHeight;
		//document.getElementById("contentcrew").style.height = "100%";
		var iMax = customerWindow.maxNotificationBoxes;
		for (var i = 0; i < iMax; i++) {
			//var notifyObj = "#notify" + i;
			var tileObj = "#tile" + i;
			//console.log("ResetCrewWindow()");
			if (customerWindow.notifyArray[i] == 0) {
				//$(notifyObj).css('className', "notifyoff");
				crewWindow.$j(tileObj).attr('class', 'tileoff');
				//document.getElementById(notifyObj).className = "notifyoffcrew";
				//document.getElementById(tileObj).className = "tileoff";
			} else {
				//document.getElementById(notifyObj).className = "notifyoncrew";
				//document.getElementById(tileObj).className = "tileon";
				//$(notifyObj).css('className', "notifyon");
				crewWindow.$j(tileObj).attr('class', 'tileon');
			}
		}
	}
}


function MaximiseCrewWindow() {
    //var $j = jQuery.noConflict();
    //console.log("customerWindow.MaximiseCrewWindow()");
	if (crewWindow && !crewWindow.closed) {
		customerWindow.crewWindowCloseFlag = false;
		customerWindow.crewWindowIsClosed = false;
		customerWindow.crewWindowShouldBeMinimised = false;
		customerWindow.crewWindowShouldBeMaximised = true;
		var cname = "ONSminimised";
		var cvalue = "0";
		var exdays = "365";
		deleteCookie(cname);
		setCookie(cname, cvalue, exdays);
		var $j = jQuery.noConflict();
		crewWindow.$j("#maximiseformdiv").css("visibility", "hidden");
		crewWindow.$j("#maximiseformdiv").css("display", "none");
		crewWindow.$j("#contentcrew").css("visibility", "visible");
		crewWindow.$j("#contentcrew").css("display", "block");
		crewWindow.moveTo(0, 0);
		//alert("ch2:"+screen.height+" : "+screen.availHeight+" : "+crewWindow.height);
		
		customerWindow.crewDisplayWidth = crewWindow.screen.width;
		customerWindow.crewDisplayHeight = crewWindow.screen.height;
		if(displaysWanted == 1) {
			customerWindow.crewDisplayWidth = crewWindow.screen.width / 2;
			customerWindow.crewDisplayHeight = crewWindow.screen.height / 2;
		}
		
		crewWindow.resizeTo(customerWindow.crewDisplayWidth - 1, customerWindow.crewDisplayHeight);

		customerWindow.ResortNotifyBoxes();

		setTimeout(function () {
			//console.log("MaximiseCrewWindow > customerWindow.setTimeout()1");
			crewWindow.$j("#barcode").select();
			if (crewWindow.focusElement != "barcode") {
				//crewWindow.document.getElementById("barcode").select();
				crewWindow.$j("#barcode").val(crewWindow.$j("#barcode").val());
				crewWindow.$j("#barcode").select();
				//crewWindow.focusElement = "none";
				//crewWindow.focusElement = "barcode";
			}
		}, 250);
	}
}


function MinimiseCrewWindow() {
	if (customerWindow.crewWindow && !customerWindow.crewWindow.closed) {
		//console.log("crewWindow.MinimisedCrewWindow()");
		customerWindow.crewWindowCloseFlag = false;
		customerWindow.crewWindowIsClosed = false;
		customerWindow.crewWindowShouldBeMinimised = true;
		customerWindow.crewWindowShouldBeMaximised = false;
		var cname = "ONSminimised";
		var cvalue = "1";
		var exdays = "365";
		deleteCookie(cname);
		setCookie(cname, cvalue, exdays);
		crewWindow.moveTo(0, 0);
		crewWindow.resizeTo(200, 180);
		crewWindow.$j("#contentcrew").css("visibility", "hidden");
		crewWindow.$j("#contentcrew").css("display", "none");
		crewWindow.$j("#maximiseformdiv").css("visibility", "visible");
		crewWindow.$j("#maximiseformdiv").css("display", "inline");
		//toggleFullScreen();
	}

}


function AdjustCustomerAspectRatio() {
    var oldWidth = $j("#bodytagcustomer").innerWidth();
    var oldHeight = $j("#bodytagcustomer").innerHeight();
    //var myWindow = crewWindow;
    //oldWidth = myWindow.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //oldHeight = myWindow.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var screenAspectRatio = screen.width / screen.height;
    console.log("screen.width:" + screen.width + ", screen.height:" + screen.height);

    var windowAspectRatio = oldWidth / oldHeight;
    console.log("oldWidth:" + oldWidth + ", oldHeight:" + oldHeight);

    console.log(screenAspectRatio + ":" + windowAspectRatio);

    var windowIsStretchedHorizontally = windowAspectRatio > screenAspectRatio;
    var windowIsStretchedVertically = windowAspectRatio < screenAspectRatio;

    newWidth = oldWidth;
    newHeight = oldHeight;

    if (windowIsStretchedHorizontally) {
        newWidth = Math.round(oldHeight * screenAspectRatio);

        //var percentWidth = Math.round((newWidth / myWindow.innerWidth) * 100);
        //myWindow.innerWidth = percentWidth + "%";
        //myWindow.$("#contentcrew").css("innerWidth", newWidth);
        resizeCustomerWindowIsTriggered = true;

        //console.log(myWindow.innerWidth);
        //alert("horiz");
    } else if (windowIsStretchedVertically) {
        //windowAspectRatio / screenAspectRatio
        newHeight = Math.round(oldWidth / screenAspectRatio);

        //var percentHeight = Math.round((newHeight / myWindow.innerHeight) * 100);
        //myWindow.innerHeight = percentHeight + "%";
        //myWindow.$("#contentcrew").css("height", newHeight);
        resizeCustomerWindowIsTriggered = true;

        //console.log(myWindow.innerHeight);
        //alert("vert");
    } else {
        //alert("equal");
        resizeCustomerWindowIsTriggered = false;
    }
}


// Attach directly bound event handlers
var $j = jQuery.noConflict();
$j("#bodytagcustomer").on("load", LoadHandler());
$j("#bodytagcustomer").on("unload", UnloadHandler());
$j("#bodytagcustomer").on("resize", AdjustCustomerAspectRatio());