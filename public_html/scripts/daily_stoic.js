/* website used as examples for this app
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_http
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_parse_date
 https://api.jquery.com/jquery.when/
 https://stackoverflow.com/questions/24909006/javascript-get-data-from-json-to-a-global-variable
 https://stackoverflow.com/questions/38963412/getting-next-and-previous-element-of-json-array
 */

//------------------------------------------------------------------------------
// SECTION FOR PROCESSING DATES

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var currentDate  = new Date();
var previousDate;// = new Date(currentDate.getDate() - 1);
var nextDate;//     = new Date(currentDate.getDate() + 1);
var dateToProcess;// = monthNames[currentDate.getMonth()] + ' ' + currentDate.getDate();

// END SECTION FOR PROCESSING DATES
//------------------------------------------------------------------------------


function dayToProcess(d) {
    dateToProcess = monthNames[d.getMonth()] + ' ' + d.getDate();
}

function currentDay() {
    currentDate  = new Date(); //reset current date
    nextDate     = currentDate;      //set next day to current day
    previousDate = currentDate;  //set previous day to current day
    dayToProcess(currentDate);
    document.getElementById("showDay").innerHTML = dateToProcess;
}

function nextDay() {
    nextDate.setDate(nextDate.getDate() + 1);
    previousDate = nextDate;
    currentDate  = nextDate;
    dayToProcess(currentDate);
    document.getElementById("showDay").innerHTML = dateToProcess;
}

function previousDay() {
    previousDate.setDate(previousDate.getDate() - 1);
    nextDate     = previousDate;
    currentDate  = previousDate;
    dayToProcess(currentDate);
    document.getElementById("showDay").innerHTML = dateToProcess;
}

//------------------------------------------------------------------------------
// SECTION FOR OPENING JSON FILE
var xmlhttp = new XMLHttpRequest();
var json_file = "data/daily_stoic.json";

//save array to myArr and send results to myFunction
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        webOutput(myArr);
    }
};

xmlhttp.open("GET", json_file, true);
xmlhttp.send();
//END SECTION FOR OPENING JSON FILE
//------------------------------------------------------------------------------

//loop through myArr and display results to page
function webOutput(arr) {
    currentDay();
    var out = "<hr />"; //begin output with an HR tag
    for (var i = 0; i < arr.length; i++) {
        console.log(arr.length);
        if (arr[i].date === dateToProcess) // only populate today's quote
        {
            out += '<h2>' + arr[i].date + '</h2>'; //Date Line
            out += '<h3>' + arr[i].topic + '</h3>'; //Topic Line
            out += '<div id = "quotes">';
            for (var j = 0; j < arr[i].quotes.length; j++) {
                out += '<div id="quote_'+(j+1)+'">' +
                        '<blockquote>' +
                        '<p>' +
                        arr[i].quotes[j].quote +
                        '</p>' +
                        '<footer>' +
                        '<address>' +
                        arr[i].quotes[j].author + ',' +
                        '</address>' +
                        '<cite>' +
                        arr[i].quotes[j].source +
                        '</cite>' +
                        '</footer>' +
                        '</blockquote>' +
                        '</div>';
            }
            out += '</div>';
            out += '<div id="notes">';
            out += arr[i].notes + '<hr />';
            out += '</div>';
        } //end if
    } //end for loop
    document.getElementById("stoic_quotes").innerHTML = out;
} // END myFuction(arr)