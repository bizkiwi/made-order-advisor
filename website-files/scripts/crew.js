
// "Made Order Advisor" ("M.O.A") by BizKiwi.NZ
// Copyright 2015 BizKiwi.NZ - steve.julian@orcon.net.nz

var crewWindow = window.self;
//crewWindow.closed = false;
var customerWindow = window.opener;
//customerWindow.closed = false;
var thisWindow = "crew";
var closeAllFlag = false;

customerWindow.crewWindowCloseFlag = false;
customerWindow.crewWindowIsClosed = false;
customerWindow.crewWindowShouldBeMinimised = false;
customerWindow.crewWindowShouldBeMaximised = true;
crewWindow.focusElement = "none";

var oldWidth = crewWindow.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var oldHeight = crewWindow.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var crewWindowNewWidth = oldWidth;
var crewWindowNewHeight = oldHeight;

var resizeCrewWindowIsTriggered = false;

var menuIsOpen = false;

var allowBoxesToClose = true;

var $k = jQuery.noConflict();

function LoadHandler() {
    //console.log("crewWindow.LoadHandler()");
    crewWindow.moveTo(0, 0);
	customerWindow.crewDisplayHeight = crewWindow.screen.height;
	//customerWindow.crewWindowHeight = customerWindow.crewDisplayHeight - (customerWindow.crewWindowChromeHeight + customerWindow.taskBarHeight);
	customerWindow.crewWindowHeight = crewWindow.screen.availHeight;
	crewWindow.resizeTo(customerWindow.crewWindowWidth, customerWindow.crewWindowHeight);
	//alert("ch4:"+screen.height+" : "+screen.availHeight+" : "+window.height);
    customerWindow.ResetCrewWindow();
    customerWindow.crewWindowCloseFlag = false;


    
    setTimeout(function () {
        //console.log("OpenCrewWindow > customerWindow.setTimeout()1");
        customerWindow.MaximiseCrewWindow();
        if (crewWindow.focusElement != "barcode") {
            crewWindow.$k("#barcode").val(crewWindow.$k("#barcode").val());
            crewWindow.$k("#barcode").select();
        }
    }, 250);
    
	setInterval(function() {
			UpdateTimers();
	}, 1000);

    setInterval(function () {

        if (resizeCrewWindowIsTriggered) {
            crewWindow.resizeTo(crewWindowNewWidth, crewWindowNewHeight);
            oldWidth = crewWindow.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            oldHeight = crewWindow.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            console.log("resizeCrew");
            resizeCrewWindowIsTriggered = false;
        }

    }, 1000);
	
    setInterval(function () {
        //console.log("LoadHandler > crewWindow.setInterval()1");
		
		if(customerWindow.displaysWanted == 1) {
			customerWindow.requestFullScreenMode = false;
			customerWindow.toggleFullScreen(crewWindow, requestFullScreenMode);
			customerWindow.MinimiseCrewWindow();
			customerWindow.MaximiseCrewWindow();
		}
		
        //if (customerWindow.closed) {
		if (!customerWindow || customerWindow.closed) {
            //if (crewWindow.closeAllFlag) {
                crewWindow.close();
            //} else {
                //crewWindow.location = customerFile;
            //}
        } else {
            /*
            var thisFlag = customerWindow.CrewWindowIsMinimised();
            customerWindow.crewWindowShouldBeMinimised = thisFlag == "1";
            customerWindow.crewWindowShouldBeMaximised = thisFlag == "0";
            if (customerWindow.crewWindowShouldBeMaximised) {
                crewWindow.resizeTo(screen.width - 5, screen.height);
            } else if (customerWindow.crewWindowShouldBeMinimised) {
                if (crewWindow.outerWidth == screen.width) {
                    //crewWindow.resizeTo(190, 160);
                }
            }
            customerWindow.toggleFullScreen(crewWindow, true);
            */
            
            if (crewWindow.focusElement != "barcode") {
                
                setTimeout(function () {
                    //console.log("LoadHandler > crewWindow.setTimeout()2");
                    
                    crewWindow.$k("#barcode").select();
                    //alert("select2");
                }, 250);


            }
        }
    }, 1000);
    /*

    setInterval(function () {
        //console.log("LoadHandler > crewWindow.setInterval()2");
        if (customerWindow != null) {
            if (!customerWindow.closed) {




                customerWindow.toggleFullScreen(customerWindow, true);
            }
        }
        crewWindow.focus();
        crewWindow.$("#barcode").select();
        //crewWindow.document.getElementById("barcode").select();
        crewWindow.focusElement = "none";
    }, 10000);

    
    setInterval(function () {
        //console.log("LoadHandler > crewWindow.setInterval()3");
        crewWindow.$("#UpdateCheckerIframe").src = "/index.html";
        //document.getElementById("UpdateCheckerIframe").src = "/index.html";
    }, 120000);

    */

}

function MouseUpCloseAllWindows() {
    console.log("MouseUpCloseAllWindows1");
    //if (confirm('Are you sure you want to Exit M.O.A?')) {
        customerWindow.closeAllFlag = true;
        crewWindow.closeAllFlag = true;
        customerWindow.crewWindowCloseFlag = true;
        customerWindow.crewWindowIsClosed = false;
        customerWindow.crewWindowShouldBeMinimised = true;
        //crewWindow.close();
		console.log("MouseUpCloseAllWindows2");
        setTimeout(function () {
            //console.log("MouseUpCloseAllWindows > customerWindow.setTimeout()1");
			console.log("MouseUpCloseAllWindows3");
            customerWindow.CloseAllWindows();
			console.log("MouseUpCloseAllWindows4");
        }, 500);
		console.log("MouseUpCloseAllWindows5");
    //}
}

function MouseUpQuitMOA() {
	var $b = jQuery.noConflict();
	$b("#quit-box-container").css("visibility", "visible");
	$b("#quit-box-container").css("display", "inline");
}

function MouseUpOKQuit() {
	MouseUpCloseAllWindows();
}

function MouseUpCancelQuit() {
	var $b = jQuery.noConflict();
	$b("#quit-box-container").css("visibility", "hidden");
	$b("#quit-box-container").css("display", "none");
}

function UpdateClock() {
    var today = new Date();
	var dateString = today.toDateString();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var dayOfMonth = today.getDate();
	if(month < 10) {
		month = '0' + month;
	}
	if(dayOfMonth < 10) {
		dayOfMonth = '0' + dayOfMonth;
	}
    var hours = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (secs < 10) {
        secs = '0' + secs;
    }
    crewWindow.$w("#crew-clock").html(dateString + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + hours + ':' + mins + ':' + secs);
}

function ToggleMenuIsOpen() {
    if (menuIsOpen) {
        menuIsOpen = false;
    } else {
        menuIsOpen = true;
    }
    if (menuIsOpen) {
        setTimeout(function () {
            if (menuIsOpen) {

                $k('#crew-menu-button').click();
                menuIsOpen = false;
            }
        }, 5000);
    }

}

function HideAboutBox() {
	//console.log("ShowAboutBox1");
	var $b = jQuery.noConflict();
	$b("#about-box-container").css("visibility", "hidden");
	$b("#about-box-container").css("display", "none");
}

function ShowAboutBox() {
	var $b = jQuery.noConflict();
	$b("#about-box-container").css("visibility", "visible");
	$b("#about-box-container").css("display", "inline");
}

function CloseTooManyOrdersDialog() {
	var $b = jQuery.noConflict();
	$b("#too-many-orders-box-container").css("visibility", "hidden");
	$b("#too-many-orders-box-container").css("display", "none");
}

function DuplicateOrderDialog() {
	var $b = jQuery.noConflict();
	$b("#duplicate-order-box-container").css("visibility", "hidden");
	$b("#duplicate-order-box-container").css("display", "none");
}

function UnloadCrewWindow() {
    //console.log("crewWindow.UnloadCrewWindow()");
    if (customerWindow && !customerWindow.closed) {
        customerWindow.crewWindowIsClosed = true;
		
    }
}

function ScanChar(inputSource) {
    //console.log("crewWindow.ScanChar()");
    //var form = crewWindow.$("#barcodeform");
	var timerDelay1 = 1;
	var timerDelay2 = 1;
	var barcode = "";
	//alert(inputSource);
	if ((inputSource == "onscreen") || (inputSource == "keyboard")) {
		timerDelay1 = 300; // was 300
		timerDelay2 = 200; // was 200
		setTimeout(function () {
			var barcode1 = crewWindow.$k("#barcode").val();
			setTimeout(function () {
				var barcode2 = "";
				barcode2 = crewWindow.$k("#barcode").val();
				if (barcode1 == barcode2) {
					var barcode = barcode1;
					if (barcode.length > 0) {
						ProcessInput(inputSource, barcode);
					}
				}
			}, timerDelay2); // was 200
		}, timerDelay1); // was 300
	} else {
		barcode = crewWindow.$k("#barcode").val();
		ProcessInput(inputSource, barcode);
	}
}
    
function ProcessInput(inputSource, barcode) {

/*
	var barcode2 = "";
	barcode2 = crewWindow.$k("#barcode").val();
	if (barcode1 == barcode2) {
		var barcode = barcode1;
		//console.log(barcode);
		if (barcode.length > 0) {
		*/
			//alert(":" + barcode + ":");
			// trim barcode to leave only the first 3 chars
			//alert("barcode.length:" + barcode.length);
			//var latestChar = barcode.substring(0, 1);
			//var latestCharCode = latestChar.charCodeAt(0);
			//console.log("latestChar:" + latestChar);
			//console.log("latestCharCode:" + latestCharCode);

	var newBarcode = "";
	var iMax = barcode.length;
	for (var i = 0; i < iMax; i++) {
		var thisChar = barcode.substring(i, i + 1);
		var thisCharCode = thisChar.charCodeAt(0);
		if ((thisCharCode > 47) && (thisCharCode < 58)) {
			newBarcode = newBarcode + thisChar;
		}
	}
	barcode = newBarcode;
	//if ((latestCharCode > 47) && (latestCharCode < 58)) {
	//    console.log("number:" + latestCharCode);
	//} else {
		//console.log(latestCharCode);
	if (inputSource == "onscreen") {

	} else if (inputSource == "other") {
		if (barcode.length == 1) {
			barcode = '';
		} else {
			barcode = barcode.substring(1, barcode.length);
		}
		crewWindow.$k("#barcode").val(barcode);
	}
	
	//}

	if (barcode.length > 3) {
		barcode = barcode.substring(0, 3);
	}
	if (barcode.length > 2) {
		var testVar = customerWindow.notifyArray[customerWindow.maxNotificationBoxes - 1];
		//alert((testVar != 0) + (testVar != "0") + (testVar != ""));
		//console.log(testVar);

		var isTooManyOrdersOnScreen = ((testVar != null) && (testVar != 0) && (testVar != "0") && (testVar != ""));
		if (isTooManyOrdersOnScreen) {
			//alert("Too many Orders on the screen! Please remove an order before adding a new one.");
			crewWindow.$k("#too-many-orders-box-container").css("visibility","visible");
			crewWindow.$k("#too-many-orders-box-container").css("display","inline");
			//crewWindow.$("#barcode").val("");
			//crewWindow.$("#barcode").select();
		} else {
			//console.log("barcode:" + barcode);
			//console.log("customerWindow.leaveChars:" + customerWindow.leaveChars);
			//var removeChars = barcode.length - customerWindow.leaveChars;

			/*
			var eventID = barcode;
			var suffixString = barcode.substring(barcode.length - removeChars, barcode.length);
			var suffixASCIIcode = suffixString.charCodeAt(0);
			var suffixChar = suffixString.substr(0, 1);
			*/

			var orderNumber = Number(barcode.substring(1, 3));
			var registerNumber = Number(barcode.substring(0, 1));
			var pickID = barcode; // pickID = registerNumber + orderNumber
			var isFirstScanForThisRegister = customerWindow.recentHighestOrderNumber[registerNumber] == 0;

			/*
			console.log("recentreg:"+customerWindow.recentHighestOrderNumber[registerNumber]);
			console.log("regnumber:" + registerNumber);
			console.log("ordernumber:" + orderNumber);
			console.log("Note:"+customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen'] + ":" + !isFirstScanForThisRegister);
*/

			var isOnScreen = false;
			if(customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen']) {
				isOnScreen = true;
			} else if(isFirstScanForThisRegister) {
				isOnScreen = false;
			}
			//var isOnScreen = ((customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen']) || (isFirstScanForThisRegister));
			if (isOnScreen) {

				setTimeout(function () {
					//console.log("ScanChar > crewWindow.setInterval()1");
					crewWindow.$k("#barcode").val("");
					//crewWindow.alert('Receipt Number ' + pickID + ' is Already Displayed!');
					crewWindow.$k("#receipt-number").val(pickID);
					crewWindow.$k("#duplicate-order-box-container").css("visibility","visible");
					crewWindow.$k("#duplicate-order-box-container").css("display","inline");
				}, 100);

			} else {
				customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen'] = true;
				customerWindow.recentOrderArray[registerNumber][orderNumber]['startTimer'] = Math.round(new Date().getTime());
				customerWindow.recentOrderArray[registerNumber][orderNumber]['endTimer'] = "0:00";
				//var thisTimer = Math.round(((new Date().getTime()) - recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer']) / 1000);
				var isHighestOrderNumber = orderNumber > customerWindow.recentHighestOrderNumber[registerNumber];
				if (isHighestOrderNumber) {
					customerWindow.recentHighestOrderNumber[registerNumber] = orderNumber;
				}
				
				crewWindow.$k("#barcode").val("");
				crewWindow.$k("#barcode").select();
				
				customerWindow.UpdateNotifyBoxes(pickID);


			}
			//console.log(registerNumber + ":" + orderNumber + ":" + customerWindow.recentOrderArray[registerNumber][orderNumber]['isOnScreen']);

		}
		
		
	}
}


function AdjustCrewAspectRatio() {

    var screenAspectRatio = screen.width / screen.height;
    console.log("screen.width:" + screen.width + ", screen.height:" + screen.height);

    var windowAspectRatio = oldWidth / oldHeight;
    console.log("oldWidth:" + oldWidth + ", oldHeight:" + oldHeight);

    console.log(screenAspectRatio + ":" + windowAspectRatio);

    var windowIsStretchedHorizontally = windowAspectRatio > screenAspectRatio;
    var windowIsStretchedVertically = windowAspectRatio < screenAspectRatio;

    crewWindowNewWidth = oldWidth;
    crewWindowNewHeight = oldHeight;

    if (windowIsStretchedHorizontally) {
        crewWindowNewWidth = Math.round(oldHeight * screenAspectRatio);
        if (crewWindowNewWidth > 100) {
            console.log("trigger1");
            resizeCrewWindowIsTriggered = true;
        }
        //var percentWidth = Math.round((newWidth / myWindow.innerWidth) * 100);
        //myWindow.innerWidth = percentWidth + "%";
        //myWindow.$("#contentcrew").css("innerWidth", newWidth);
        
        //console.log(myWindow.innerWidth);
        //alert("horiz");
    } else if (windowIsStretchedVertically) {
        //windowAspectRatio / screenAspectRatio
        crewWindowNewHeight = Math.round(oldWidth / screenAspectRatio);
        if (crewWindowNewHeight > 100) {
            console.log("trigger2");
            resizeCrewWindowIsTriggered = true;
        }
        //var percentHeight = Math.round((newHeight / myWindow.innerHeight) * 100);
        //myWindow.innerHeight = percentHeight + "%";
        //myWindow.$("#contentcrew").css("height", newHeight);
        
        //console.log(myWindow.innerHeight);
        //alert("vert");
    } else {
        //alert("equal");
        resizeCrewWindowIsTriggered = false;
    }

    /*
    setTimeout(function () {
        myWindow.resizeTo(newWidth, newHeight);
    }, 3000);
    */

}


var $w = jQuery.noConflict();


function UpdateTimers() {
    UpdateClock();
    //console.log("UpdateTimers");
    //isOnScreen
    //maxOrderNumber
    //maxRegisterNumber
    //recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer']

    var iMax = customerWindow.maxNotificationBoxes;
    for (var i = 0; i < iMax; i++) {
        var notifyObj = "#notify" + i;
        var orderbgObj = "#orderbg" + i;
		var timerObj = "#timer" + i;
        var pickID = crewWindow.$w(notifyObj).html();
        if ((pickID != null) && (pickID != "") && (pickID != "0") && (pickID != 0)) {
            //console.log("i:" + i);
            pickID = pickID.toString();
            var boxContainsPickID = pickID.length > 1;
            if (boxContainsPickID) {
                var thisRegisterNumber = Number(pickID.substring(0, 1));
                var thisOrderNumber = Number(pickID.substring(1, 3));
                var thisTimerStart = 0;
                if (customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] == "0:00") {
                    thisTimerStart = new Date().getTime();
                    customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'] = thisTimerStart;
                } else {
                    thisTimerStart = customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber]['startTimer'];
                }
                var timerCookieObj = "timer" + i;
                setCookie(timerCookieObj, thisTimerStart, 36500);
                console.log("thisTimerStart:" + thisTimerStart);
                var timerTotalSecs = Math.round(((new Date().getTime()) - thisTimerStart) / 1000);
                var timerDays = Math.floor(timerTotalSecs / (24 * 60 * 60));
                var timerRemainingSecs = timerTotalSecs - (timerDays * 24 * 60 * 60);
                var timerHours = Math.floor(timerRemainingSecs / (60 * 60));
                timerRemainingSecs = timerRemainingSecs - (timerHours * 60 * 60);
                var timerMins = Math.floor(timerRemainingSecs / 60);
                timerRemainingSecs = timerRemainingSecs - (timerMins * 60);
                var timerSecs = timerRemainingSecs;
                var timerOutput = "";
                if (timerDays > 0) {
                    if (timerDays < 10) {
                        timerOutput += "0" + timerDays + ":";
                    } else {
                        timerOutput += timerDays + ":";
                    }
                }
                if (timerHours > 0) {
                    if (timerHours < 10) {
                        timerOutput += "0" + timerHours + ":";
                    } else {
                        timerOutput += timerHours + ":";
                    }
                }
                //if (timerMins > 0) {
                    if (timerMins < 10) {
                        //if (timerHours > 0) {
                        timerOutput += "0";
                        //}
                    }
                    timerOutput += timerMins + ":";
                //}

                if (timerSecs < 10) {
                    //if ((timerMins > 0) || (timerHours > 0) || (timerDays > 0)) {
                        timerOutput += "0";
                    //}
                }
                timerOutput += timerSecs;

                crewWindow.$w(timerObj).html(timerOutput);

				var msDelay = 1000;
				if (timerTotalSecs >= 120) {
					msDelay = 750;
                    //var flashedObj = 'flashed' + 90;
                    //var hasFlashed = customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] == true;
                    //if (!hasFlashed) {
                        FlashBox(orderbgObj,notifyObj,timerObj,msDelay);
                        //customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] = true;
                    //}
                    //crewWindow.$w(orderbgObj).css("background-color", "red");
					//crewWindow.$w(notifyObj).css("color", "white");
					//crewWindow.$w(timerObj).css("color", "yellow");
                    

	
                } else if (timerTotalSecs >= 60) {
					/*
                    var flashedObj = 'flashed' + 60;
                    var hasFlashed = customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] == true;
                    if (!hasFlashed) {
                        FlashBox(orderbgObj,notifyObj,timerObj);
                        customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] = true;
                    }
					*/
                    crewWindow.$w(orderbgObj).css("background-color", "red");
					crewWindow.$w(notifyObj).css("color", "white");
					crewWindow.$w(timerObj).css("color", "yellow");

                } else if (timerTotalSecs >= 30) {
					/*
                    var flashedObj = 'flashed' + 30;
                    var hasFlashed = customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] == true;
                    if (!hasFlashed) {
                        FlashBox(orderbgObj,notifyObj,timerObj);
                        customerWindow.recentOrderArray[thisRegisterNumber][thisOrderNumber][flashedObj] = true;
                    }
					*/
                    crewWindow.$w(orderbgObj).css("background-color", "#ff6600");
					crewWindow.$w(notifyObj).css("color", "black");
					crewWindow.$w(timerObj).css("color", "black");

                } else {
                    crewWindow.$w(orderbgObj).css("background-color", "#336600");
					crewWindow.$w(notifyObj).css("color", "white");
					crewWindow.$w(timerObj).css("color", "yellow");
                }
                console.log("timerTotalSecs:" + timerTotalSecs);
                console.log("timer:" + pickID + ":" + timerTotalSecs);
            } else {
                crewWindow.$w(timerObj).html("0:00");
            }
        }
        
    }
}

function FlashBox(orderbgObj,notifyObj,timerObj,msDelay) {
	
	var numberLoops = 1000 / msDelay;
	msDelay = msDelay / numberLoops;

	var count = 0;
	while(count < numberLoops) {
		setTimeout(function () {
			crewWindow.$w(orderbgObj).css("background-color", "red");
			crewWindow.$w(notifyObj).css("color", "white");
			crewWindow.$w(timerObj).css("color", "yellow");
			setTimeout(function () {
				crewWindow.$w(orderbgObj).css("background-color", "black");
				crewWindow.$w(notifyObj).css("color", "white");
				crewWindow.$w(timerObj).css("color", "yellow");
				setTimeout(function () {
					crewWindow.$w(orderbgObj).css("background-color", "red");
					crewWindow.$w(notifyObj).css("color", "white");
					crewWindow.$w(timerObj).css("color", "yellow");
					setTimeout(function () {
						crewWindow.$w(orderbgObj).css("background-color", "black");
						crewWindow.$w(notifyObj).css("color", "white");
						crewWindow.$w(timerObj).css("color", "yellow");
					}, msDelay);
				}, msDelay);
			}, msDelay);
		}, msDelay);
		count++;
	}

}


function ToggleSidePanel() {
    if ($w("#crew-panel1").css("visibility") == "visible") {
        $w("#crew-panel1").css("width", "0%");
        $w("#crew-panel1").css("visibility", "hidden");
        $w("#crew-panel1").css("display", "none");
        $w("#crew-panel2").css("width", "100%");
        //$w("#crew-left").css("overflow", "hidden");
        //$w("#crew-header").css("visibility", "visible");
        //$w("#crew-header").css("display", "inline");
        $w("#crew-footer").css("height", "12vh");
        $w("#crew-orders").css("height", "88vh");
    } else {
        $w("#crew-panel2").css("width", "50.5%");
        $w("#crew-panel2").css("height", "100vh");
        //$w("#crew-left").css("overflow", "hidden");
        $w("#crew-panel1").css("width", "49.5%");
        $w("#crew-panel1").css("visibility", "visible");
        $w("#crew-panel1").css("display", "inline");
        //$w("#crew-right").css("overflow", "hidden");
        //$w("#crew-header").css("visibility", "hidden");
        //$w("#crew-header").css("display", "none");
        $w("#crew-footer").css("height", "12vh");
        $w("#crew-orders").css("height", "88vh");
    }
    $w("button.navbar-toggle").click();
}

function Login() {

}



// Attach directly bound event handlers
//$("body").on("load", LoadHandler());

//$("body").on("resize", AdjustCrewAspectRatio());
var $j = jQuery.noConflict();
$k("#bodytagcrew").on("blur", customerWindow.toggleFullScreen(crewWindow, true));
$k("#bodytagcrew").on("unload", UnloadCrewWindow());
$k("#bodytagcrew").on("focus", customerWindow.MaximiseCrewWindow());
//$k("#bodytagcrew").on("resize", AdjustCrewAspectRatio());
$k("#bodytagcrew").on("load", LoadHandler());