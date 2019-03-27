/*
    Steven Lim
    CECS 470 Calendar
    Part 2 of Lab Assignment 7
    Generate a dynamic calendar for Lyman Hall Website
*/


/*
    Creates the table caption(The title describing the table)
*/
function genCaption(date) {
    //Acquire current month and year
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const month = ["January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"];

    //Creates the html caption text
    const caption = ("<caption> " + month[currentMonth] + " " + currentYear + " </caption>");

    return caption;
}

/*
    Creates the table column headers, generating the first <tr>
*/
function genHeader() {
    let tr = "<tr>";
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //Add each day as a th element
    for (let i = 0; i < day.length; i++) {
        tr += "<th class='calender_weekdays' style = 'background-color: #ffffe6'>" + day[i] + "</th>";
    }
    tr += "</tr>";
    //Return the completed table row
    return tr;

}
/*
    Creates the table data using the dayEvent array provided by lht_events.js
*/
function genDays(date) {
    //Acquire the date of the first day of the month
    let iter = new Date(date.getFullYear(), date.getMonth(), 1);
    //Acquire the number of the weekday it falls on, i.e. 6 corresponds to Saturday(the last day)
    let weekDay = iter.getDay() + 1;
    //Acquire today's exact date
    let today = date.getDate();

    //Acquire the amount of days in the current month
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthDayNum = new Date(year, month - 1, 0);
    const dayCount = monthDayNum.getDate();

    //FILL BLANK CELLS(Nonexistent dates before the iterator)
    let table = "<tr>";
    for (let i = 1; i < weekDay; i++) {
        table += "<td></td>"
    }

    //Fill the remaining cells
    for (let i = 1; i <= dayCount; i++) {
        //Advance the iterator through each day of the month
        iter.setDate(i);
        weekdayNum = iter.getDay();
        (weekdayNum == 0) ? table += "<tr>": null;

        //The current day of the month has a predefined style highlighting it
        if (i == today) {
            table += "<td id = 'calendar_today' class = 'calendar_dates'> " + i + dayEvent[i] + " </td>";
        }
        else {
            table += "<td class = 'calendar_dates'>" + i + dayEvent[i] + "</td>";
        }

        //End the row if iterator weekday is on Saturday
        (weekdayNum == 6)  ? table += "</tr> " : null;
    }
    return table;
}

/***************************
        MAIN FUNCTION
*****************************/
document.addEventListener('DOMContentLoaded', function () {
    const date = new Date();
    //Create the calendar table element and assign the ID, CSS has already been predefined
    let calendar = "<table id = 'calendar_table'>\n"

    //Generate table html code content
    calendar += genCaption(date) + genHeader() + genDays(date) + "</table>\n";
    //alert(genCaption(date);

    //Write the HTML CODE onto the document
    document.getElementById("calendar").innerHTML = calendar;
});