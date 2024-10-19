window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  // Name of the certificate html file
var certFilename = 'certificate.html';

// HTMLCollection of elements of type iFrame
var iframeElements = document.getElementsByTagName("iframe");

// Iterate over the iFrameElements HTMLCollection
for(var i = 0; i < iframeElements.length; i++){
    /* If src of current iFrame element equals the filename set in variable
	** certFilename call the generatePDF() function.
	*/
    var src = iframeElements[i].getAttribute('src');
	if (src.indexOf(certFilename) !=-1) {
		iframeElements[i].contentWindow.generatePDF();
	}
}
}

};
