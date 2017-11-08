/* website used as examples for this app
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_http
 https://www.w3schools.com/js/tryit.asp?filename=tryjson_parse_date
 https://api.jquery.com/jquery.when/
 https://stackoverflow.com/questions/24909006/javascript-get-data-from-json-to-a-global-variable
 https://stackoverflow.com/questions/38963412/getting-next-and-previous-element-of-json-array
 */

// SECTION FOR OPENING JSON FILE------------------------------------------------
var xmlhttp = new XMLHttpRequest();
var json_file = "data/daily_stoic.json";
var next = document.getElementById('next');
var previous = document.getElementById('previous');
var current = document.getElementById('current');
var file;

//save array to myArr and send results to myFunction
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        file = JSON.parse(this.responseText);
        webOutput(file, 0); // runs today's file upon page load
    }
};

xmlhttp.open("GET", json_file, true);
xmlhttp.send();
//END SECTION FOR OPENING JSON FILE --------------------------------------------


//SECTION FOR PROCESSING DATES--------------------------------------------------
var monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

var currentDate = new Date();
var dateToProcess;
//END SECTION FOR PROCESSING DATES----------------------------------------------

current.addEventListener('click', function() {
    currentDate = new Date();
    webOutput(file, 0);
});

next.addEventListener('click', function() {
    webOutput(file, 1);
});

previous.addEventListener('click', function() {
    webOutput(file, -1);
});

function dayToProcess(daysToAdd) {
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    dateToProcess = monthNames[currentDate.getMonth()] + ' ' + currentDate.getDate();
}

//loop through webOutput and display results to page
function webOutput(arr, d) {
    dayToProcess(d);
    var out = "<hr />"; //begin output with an HR tag
    for (var i = 0; i < arr.length; i++) {
        console.log(arr.length);
        if (arr[i].date === dateToProcess) // only populate today's quote
        {
            out += '<h2>' + arr[i].date + '</h2>'; //Date Line
            out += '<h3>' + arr[i].topic + '</h3>'; //Topic Line
            out += '<div id = "quotes">';
            for (var j = 0; j < arr[i].quotes.length; j++) {
                out += '<div id="quote_' + (j + 1) + '">' +
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
            
            // code to disable next and previous buttons
            next.disabled = (i+1) >= arr.length;
            previous.disabled = i <= 0;
            
        } //end if
    } //end for loop
    document.getElementById("stoic_quotes").innerHTML = out;
    document.getElementById("array_length").innerHTML = array_index + '/' + array_length;
} // END webOutput(arr)