var $x = jQuery.noConflict();


function ShowNumpad() {
	
    if($x("#wrapper").css("width") == "50%") {
        $x("#wrapper").css("margin-left", "10%");
    } else {
        $x("#wrapper").css("margin-left", "35%");
    }
	
    $x("#wrapper").css("visibility", "visible");
    $x("#wrapper").css("display", "inline");
	allowBoxesToClose = false;
}

function HideNumpad() {
    $x("#wrapper").css("visibility", "hidden");
    $x("#wrapper").css("display", "none");
	setTimeout(function() {
		allowBoxesToClose = true;
	},3000);
}

function PressKey(key) {
    var thisBarcode = $x("#barcode").val() + key;
    $x("#barcode").val("");
    //$x("#barcode").select();
    $x("#barcode").val(thisBarcode);
    if (thisBarcode.length >= 3) {
        HideNumpad();
    }
    ScanChar("onscreen");
}

function PressClear() {
    $x("#barcode").val("");
}

function PressDone() {
    $x("#barcode").val("");
    HideNumpad();
}

function ToggleNumpad() {
    if ($x("#wrapper").css("visibility") == "visible") {
        HideNumpad();
    } else {
        ShowNumpad();
    }
}