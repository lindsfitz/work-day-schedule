// todays date

// Sets the current date and time via moment
var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY HH:mm"))

var updatedTime = setInterval(function() {
    $("#date-time").text(today);
}, 1000);


// Function compares the current hour (via moment.js) to the time assigned to each time block in the HTML to assign a bgcolor based on past, present, or future
$("textarea").each(function () {
    var name = parseInt($(this).attr("name"));
    var todayCheck = moment().format("H")
    if (name < todayCheck) {
        $(this).addClass("past");
    }
    
    if (name > todayCheck) {
        $(this).addClass("future")
    }
    
    if (name === todayCheck) {
        $(this).addClass("present")
    }
})

var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];


init();
function init () {
    $(".description").each(function(){
        var hour = $(this).attr('name');
        if (savedItems != null) {
            for (let i = 0; i < savedItems.length; i++) {
                if (hour == savedItems[i].currentHour){
                    $(this).text(savedItems[i].newTask)
                }
            }
        } else return;
    })
}


// function called when the save button is clicked. Saves the text input of the specific element into a local storage object with the key set to the hour of the particular element 
function saveItem() {
    var textElement = $(this).siblings('textarea')
    var newTask = textElement.val()
    var currentHour = textElement.attr('name');
    var newObj = {
        currentHour, newTask
    }
    savedItems.push(newObj);
    localStorage.setItem("savedItems",JSON.stringify(savedItems));
}


//when you click the save button within each time block, it will call the saveItem function 
$(".saveBtn").each(function(){
    $(this).click(saveItem)
})

