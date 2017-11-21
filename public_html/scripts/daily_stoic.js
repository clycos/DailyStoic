/* website used as examples for this app
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_http
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_parse_date
 https://api.jquery.com/jquery.when/
 https://stackoverflow.com/questions/24909006/javascript-get-data-from-json-to-a-global-variable
 https://stackoverflow.com/questions/38963412/getting-next-and-previous-element-of-json-inputArrayay
 */

var stoicArray;
var reminderArray;
var stoicFile     = "data/daily_stoic.json";
var reminderFile  = "data/daily_reminders.json";
var next          = document.getElementById('next');
var previous      = document.getElementById('previous');
var current       = document.getElementById('current');
var currentDate   = new Date();
var dateToProcess;
var age;
var monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function dayToProcess(daysToAdd) {
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    dateToProcess = monthNames[currentDate.getMonth()] + ' ' + currentDate.getDate();
}

function getAge(dateString) 
{
    var birthDate = new Date(dateString);
    age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

//loop through stoicOutput and display results to page
function stoicOutput(inputArray, d) {
    dayToProcess(d); // set current date
    var out = "<hr />"; //begin output with an HR tag
    
    // LOOP FOR STOIC OUTPUT
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i].date === dateToProcess) // only populate today's quote
        {
            out += '<h2>' + inputArray[i].date + '</h2>'; //Date Line
            out += '<h3>' + inputArray[i].topic + '</h3>'; //Topic Line
            out += '<div id = "quotes">';
            for (var j = 0; j < inputArray[i].quotes.length; j++) {
                out += '<div id="quote_' + (j + 1) + '">' +
                        '<blockquote>' +
                        '<p>' +
                        inputArray[i].quotes[j].quote +
                        '</p>' +
                        '<footer>' +
                        '<address>' +
                        inputArray[i].quotes[j].author + ',' +
                        '</address>' +
                        '<cite>' +
                        inputArray[i].quotes[j].source +
                        '</cite>' +
                        '</footer>' +
                        '</blockquote>' +
                        '</div>';
            }
            out += '</div>'; // end div quotes
            out += '<div id="notes">';
            out += inputArray[i].notes;
            out += '</div>'; // end div notes
            
            // Add additional thoughts if they exist
            if (inputArray[i].thoughts.length > 0)
            {
                out += '<div id="thoughts">';
                out += '<h3>Additional Thoughts</h3>';
                out += inputArray[i].thoughts + '<hr />';
                out += '</div>'; // end div thoughts
            } else
                out += '<hr />'; // add hard return
            
            // code to disable next and previous buttons
            //next.disabled = (i+1) >= inputArray.length;
            next.hidden = (i + 1) >= inputArray.length;
            //previous.disabled = i <= 0;
            previous.hidden = i <= 0;

        } //end if
    } //end for loop
    document.getElementById("stoic_quotes").innerHTML = out;
} // END stoicOutput(inputArray)

//loop through stoicOutput and display results to page
function reminderOutput(inputArray) {
    // LOOP FOR REMINDER OUTPUT
    var out = "";
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i].date === dateToProcess) // only populate today's quote
        {   getAge(dateToProcess + ' ' + inputArray[i].year);
            out += '<div id = "reminder">';
            out += '<h3>Reminders</h3>';
            out += inputArray[i].reminder;
            out += ' (' + inputArray[i].year + ') - ' + age;
            out += '</div>'; // end div reminder
            out += '<hr />'; // add hard return
        } //end if
    } //END FOR LOOP

    document.getElementById("reminders").innerHTML = out;
    
} // END stoicOutput(inputArray)
     
current.addEventListener('click', function () {
    currentDate = new Date();
    stoicOutput(stoicArray, 0);
    reminderOutput(reminderArray);
});

next.addEventListener('click', function () {
    stoicOutput(stoicArray, 1);
    reminderOutput(reminderArray);
});

previous.addEventListener('click', function () {
    stoicOutput(stoicArray, -1);
    reminderOutput(reminderArray);
});

    
readFile(stoicFile, function(text){
    stoicArray = JSON.parse(text);
    console.log(stoicArray);
    stoicOutput(stoicArray, 0);
});

readFile(reminderFile, function(text){
    reminderArray = JSON.parse(text);
    console.log(reminderArray);
    reminderOutput(reminderArray);
    

});

    
   
