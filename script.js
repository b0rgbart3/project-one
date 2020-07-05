

$(document).ready(function() {
    
    // $('.carousel').carousel();

    //  This was the original search button handler
    //$("#searchBtn").click(searchNASA);

    // This is bart's new search button handler
    $("#searchBtn").click(respondToSearchInput);

    // started putting in some quick code with my (HS) tutor to get the Wiki API up and running, will comment out all Wiki API below for now
    // $("#searchBtn").click(searchWIKI);
    $(".nasaImg").click(showImgInfoModal);

    /// This is the button handler for the preset buttons
    $(".preset").click(presetSearch);
});


// Global variables
var responseObject;
var searchWord;
var imageURLS = [];
var descriptions = [];
var keywords = [];


// This is the search input input handler
var respondToSearchInput =function(event) {

    // interrupt the browser default process of 
    // redirecting to another page	   
    
    event.preventDefault();	   
    console.log("Initializing search");	 

    searchNASA();
}

var searchNASA=function() {

    searchWord = $("#searchInput").val();
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

// var searchWIKI=function(event) {
 
//     // interrupt the browser default process of redirecting to another page
//     // when the form input is filled out
//     event.preventDefault();
//     console.log("Initializing Wiki search");

//     searchWord = $("#searchInput").val();
//     if (searchWord) {
//         searchWord = searchWord.toLowerCase();
//     }
//     var WIKIQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWord + "&limit=1&namespace=0&format=jsonfm";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: WIKIQueryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(collectWIKIData);
// }



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

         // clear out the arrays to start with
        imageURLS=[];
        descriptions=[];

        
        items = collection.items;
        // console.log(JSON.stringify(items) );
        if (items)
        {
            items.forEach(function(item) {
                if(item.links && item.links[0])
                {
                    // collect image urls
                    var thisURL = item.links[0].href ;

                    // store them in a local array
                    if (thisURL) {
                    imageURLS.push(thisURL); }

                    // make sure the data object exists
                    if (item.data && item.data[0]) {
                        
                        // grab the description and keywords and store them
                        var thisDescription = item.data[0].description;
                        var theseKeyWords = item.data[0].keywords;
                        descriptions.push(thisDescription);
                        keywords.push(theseKeyWords);
                    }
                }
            });

        }
        
        buildImageNodes();
        // this will trigger the display to show the images in the slider
        displayImageSlider();
    }
}

// var collectWIKIData = function(response) {

//     var collection; 
//     var items;

    // Here I need to parse through the response object into
    // data that we can actually use, starting with an array of images

    // make sure we got something
    // if (response) {
        
    //     console.log(JSON.stringify(response));
        // What the heck - let's save our own copy of this response object
        // in case we want to look at it later
        // responseObject = response;
        // collection = responseObject.collection;
        
        // items = collection.items;
        // console.log(JSON.stringify(items) );
        // if (items)
        // {
        //     items.forEach(function(item) {
        //         if(item.links && item.links[0])
        //         {
        //             // collect image urls
        //             var thisURL = item.links[0].href ;

        //             // store them in a local array
        //             imageURLS.push(thisURL);

        //             // make sure the data object exists
        //             if (item.data && item.data[0]) {
                        
        //                 // grab the description and keywords and store them
        //                 var thisDescription = item.data[0].description;
        //                 var theseKeyWords = item.data[0].keywords;
        //                 descriptions.push(thisDescription);
        //                 keywords.push(theseKeyWords);
        //             }
        //         }
        //     });

        // }
        
        // buildImageNodes();
        // // this will trigger the display to show the images in the slider
        // displayImageSlider();
//     }
// }

var displayImageSlider = function() {
    // make the image slider visible on the page
    //$("#imageSlider").style.attr({"display":"block"});
    $("#imageSlider").css({"opacity":"1"});
}
var showImgInfoModal = function() {

    $("#imageInfoModal").style.attr({"display":"block"});


}


// buildImageNodes
// This dynamically generates image nodes in the DOM
// for the slider
var buildImageNodes = function() {
    if (imageURLS) {
        var container = $("#imageSliderImages")
        container.empty();
        imageURLS.forEach( function(imageURL, index) {
            var newImage = $("<img>");
            newImage.attr("src",imageURL);
            // donna tweaked this to have the jbox work //
            newImage.attr("title",descriptions[index])
            newImage.attr("data-id", index);
            // donna added tweaked this to have the jbox work //
            newImage.attr("class", "hover-description");
            var anchorTag = $("<a>")
            anchorTag.attr("class", "carousel-item");
            
            anchorTag.append(newImage);
            container.append(anchorTag);
            
        })
        $('.carousel').carousel();
        
        // donnas modal coding //
        new jBox('Tooltip', {
            attach: '.hover-description',
            width: 400,
          });


          // 
          // new jBox('Modal', {
          // width: 400,
          // attach: '.hover-description',
          // title: 'More Info',
          // content: 'Read More: (WIKI API LINKS AND INFO GOES HERE'
      //    });
           // 
    }
}



var presetSearch = function(event) {
    if (event && event.target && event.target.id) {
        var thisPreset = event.target.id;
        if (thisPreset) {
            thisPreset = thisPreset.toLowerCase();
        }
        console.log(thisPreset);
        $("#searchInput").val(thisPreset);
        searchNASA();
        }
}


