// todays date
var savedItems = { };

var today = moment();
$("#currentDay").text(today.format("MMMM Do, YYYY HH:mm"))

var updatedTime = setInterval(function() {
    $("#date-time").text(today);
}, 1000);


var retrieveItems = JSON.parse(localStorage.getItem("savedItems"));
var retrieveKeys = Object.keys(retrieveItems);

init();

function init () {
    $(".description").each(function(){
        var hour = $(this).attr('name');
        for (let i = 0; i < retrieveKeys.length; i++) {
            if (hour == retrieveKeys[i]){
                $(this).text(retrieveItems.hour)
            }
        }
    })
}

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

function saveItem() {
    var textElement = $(this).siblings('textarea')
    var newTask = textElement.val()
    var hour = textElement.attr('name')
    savedItems[hour]=newTask;
    localStorage.setItem("savedItems",JSON.stringify(savedItems));
}



$(".saveBtn").each(function(){
    $(this).click(saveItem)
})

