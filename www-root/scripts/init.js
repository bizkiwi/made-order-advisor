
var rootDrive = "C:";   // local hard disk drive letter
var rootPath = "/ons";
var rootURL;   // set automatically

var productURL;   // set automatically
var productName = "ons";   // required

var protocolType = "file";   // e.g. "file" or "local" or "server" or "secure"
var protocolName;   // set automatically

var domainName = "";   // required only if protocolType is not "file" or "local"

var portNumber = 60423;	  // normally left blank otherwise e.g. ":8080" // this is
var portName;   // set automatically


if (protocolType == "local") {
    protocolName = "http://";
    domainName = "localhost";
} else if (protocolType == "server") {
    protocolName = "http://";
} else if (protocolType == "secure") {
    protocolName = "https://";
} else {
    protocolType = "file";
    protocolName = "file:///";
    domainName = "";
}

if (portNumber == "") {
    portNumber = 80;
}
if (portNumber != 80) {
    portName = ":" + portNumber;
}


if (protocolType == "file") {
    rootURL = protocolName + rootDrive + rootPath;
} else {
    rootURL = protocolName + domainName + portName;
}
productURL = rootURL + "/" + productName;
	
var storeID = 1;
var deviceID = 1;
var clientID = 1;
var userID = 1;
var serverURL = 'http://128.199.132.155:3000';

// CONSTANTS
var maxNotificationBoxes = 18;
var maxRegisterNumber = 9;
var maxOrderNumber = 99;
var numberASCIIchars = 256;
var leaveChars = 3;
var numberColumns = 6;
var crewDisplayWidth = 0;
var crewDisplayHeight = 0;
var customerDisplayWidth = 0;
var customerDisplayHeight = 0;
var crewWindowChromeHeight = 40; // 40
var taskBarHeight = 35; // 35
var edgeTop = 0 - 0;
var edgeLeft = 0 - 0;
var edgeBottom = 40; // 40
var edgeRight = 40; // 40
var verticalOffset = 0;

protocolName = getCookie("protocolName");
domainName = getCookie("domainName");
portName = getCookie("portName");
productName = getCookie("productName");
productURL = getCookie("productURL");
majorVersion = getCookie("majorVersion");
minorVersion = getCookie("minorVersion");

storeID = getCookie("storeID");
deviceID = getCookie("deviceID");
clientID = getCookie("clientID");
userID = getCookie("userID");
serverURL = getCookie("serverURL");

//new at 10/6/2015 :
var isCustomerWindow = true;
var customerWindowIsOpen = true;
var customerFile = "cust.html";
//var crewFile = "crew.html";
var crewFile = "crew.html";
// end new


//var standbyFile = "standby.html";

var currentVersion = majorVersion + "." + minorVersion;
var latestVersion = currentVersion;

//var desktopWidth = crewDisplayWidth + customerDisplayWidth;
//var windowWidth = ((desktopWidth + edgeRight) - edgeLeft);
var crewWindowWidth = 0;
var crewWindowHeight = 0;

var leftPosition = parseFloat(0);
var topPosition = parseFloat(0);

var customerWindowWidth = 0;
var customerWindowHeight = 0;

// ARRAYS
var notifyArray = new Array(maxNotificationBoxes);
//var timerArray = new Array(maxNotificationBoxes);

//var orderNumberArray = new Array(maxRegisterNumber + 1)
var recentHighestOrderNumber = new Array(maxRegisterNumber + 1);
var recentOrderArray = new Array(maxRegisterNumber + 1);

//var timerStartArray = new Array(maxNotificationBoxes);

/*
var iMax = maxNotificationBoxes;
for (var i = 0; i < iMax; i++) {
    timerArray[i] = Math.round((new Date().getTime())/1000);
}
*/


function wwwResetCookies() {

    deleteCookie("rootDrive");
    setCookie("rootDrive", rootDrive, 36500);

    deleteCookie("rootPath");
    setCookie("rootPath", rootPath, 36500);

    deleteCookie("rootURL");
    setCookie("rootURL", rootURL, 36500);

    deleteCookie("productURL");
    setCookie("productURL", productURL, 36500);

    deleteCookie("productName");
    setCookie("productName", productName, 36500);

    deleteCookie("protocolType");
    setCookie("protocolType", protocolType, 36500);

    deleteCookie("protocolName");
    setCookie("protocolName", protocolName, 36500);

    deleteCookie("domainName");
    setCookie("domainName", domainName, 36500);

    deleteCookie("portNumber");
    setCookie("portNumber", portNumber, 36500);

	deleteCookie("portName");
    setCookie("portName", portName, 36500);
	
    deleteCookie("storeID");
    setCookie("storeID", storeID, 36500);
	
	deleteCookie("deviceID");
    setCookie("deviceID", deviceID, 36500);
	
	deleteCookie("clientID");
    setCookie("clientID", clientID, 36500);
	
	deleteCookie("userID");
    setCookie("userID", userID, 36500);

	deleteCookie("serverURL");
    setCookie("serverURL", serverURL, 36500);
}



function minorVersionResetCookies() {

}
