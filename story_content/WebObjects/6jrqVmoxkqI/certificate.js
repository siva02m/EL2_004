// Return todays date in format dd/mm/yyyy
function todaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var todaysDate = dd + '/' + mm + '/' + yyyy;
    return todaysDate;
}

// Generate PDF
function generatePDF() {

    // Check if GetPlayer function exists, if it does, retrieve values of variables.
    if (typeof window.parent.GetPlayer === 'function') {

        // Retrieve storyline player object from parent window
        var player = window.parent.GetPlayer();

        // Retrieve the learners name from the learnerName variable
        var a = player.GetVar("username");



        // If GetPlayer function does not exist we are probably testing the certificate outwith storyline. Set variables with dummy values for testing.
    } else {
        var a = "Error";
    }

    // Get current URL minus filename
    var url = window.location.href.split('/');
    url.pop();
    url = url.join('/');

    // Define PDF output - See http://pdfmake.org/#/gettingstarted for information on creating a PDF document with pdfmake.
    var dd = {
        // Set page size
        pageSize: 'A4',
        // Set document orientation
        pageOrientation: 'landscape',
        // Set page margins
        pageMargins: [0,0,0,0],

        // Images
        images: {
            // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
            certBackground: url +'/Certificate.png'
        },

        background: [
            {
                image: 'certBackground',
                width: 841.89,
                height: 595.28,
            }
        ],

        // Fonts
        defaultStyle: [
            {
                font: 'Roboto'
            }
        ],

        // Define main body of document
        content: [
            
            // Include learner name
            
            {
                text: a,
                fontSize: 24,
                alignment: 'center',
                absolutePosition: { x: 330, y: 305 },
                color: '#000000',
                italics: true
            },
            
        ]
    };

    pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
     };

    pdfMake.createPdf(dd).download('Certificate' + '.pdf');
}