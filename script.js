





































































































// =============================
// Bart's Code below here....


$(document).ready(function() {



    // This line will need to go inside the JQuery Document Ready code block
    $("#search-submit").click(searchNASA);

});


// Global variables
var responseObject;
var searchWord;
var imageURLS;



// These function declaration can go anywhere

// searchNASA - this function gets called when the user
// enters a new search term in the input field

var searchNASA=function(event) {
 
    // interrupt the browser default process of redirecting to another page
    // when the form input is filled out
    event.preventDefault();

    searchWord = $("#search-input").val();
    if (searchWord) {
        searchWord = searchWord.toLowerCase();
    }
    var NASAQueryURL = "https://images-api.nasa.gov/search?q="+searchWord;

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: NASAQueryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(collectNASAData);
}

// collectNASAData 
// This is the callback function that receives the data from NASA
var collectNASAData = function(response) {

    
    var collection; 
    var items;

    // Here I need to parse through the response object into
    // data that we can actually use, starting with an array of images

    // make sure we got something
    if (response) {
        //console.log(JSON.stringify(response));
        // What the heck - let's save our own copy of this response object
        // in case we want to look at it later
        responseObject = response;
        collection = responseObject.collection;
        
        items = collection.items;
        console.log(JSON.stringify(items) );
        if (items)
        {
            items.forEach(function(item) {
                var thisURL = item.href;
                imageURLS.push(thisURL);
            });

        }
        
        // this will trigger the display to show the images in the slider
        displayImageSlider();
    }
}




