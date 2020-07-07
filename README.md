![Spaceforce](/assets/logo4.jpg)

This is a fun little app that allows users to search through the publicly available NASA image bank, and then follow up on that topic by reading associated articles from Wikipedia in the same interface.

## Deployed Link
https://hannahpsmith1.github.io/project-one/

##

## Features
- Relevant NASA sourced Imagery 
- Modal Descriptions of Images
- High Level Blurb from Wikipedia


## Future Development 
- Links to relevant wikipedia Articles 
- Links to Learn More from NASA 
- Additional News Sources pertinent to search term 

---

## Demo Gif

![SPACEFORCE](https://user-images.githubusercontent.com/59800839/86660967-1539bf00-bfa0-11ea-9ab8-2245a9508c5a.gif)

---

## Cool Code 
```
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
            // donna tweaked this to have the jbox work //
            newImage.attr("class", "hover-description");
            var anchorTag = $("<a>")
            anchorTag.attr("class", "carousel-item");
            
            anchorTag.append(newImage);
            container.append(anchorTag);
            
        })

```

- The above code is how we are able to dynamically generate a carousel based on the the search word. 

---

## Prerequisites
* Access to the Internet
* Supported Web Browser
* Github Account
* Terminal or Gitbash
* Local Disk Storage Capacity
* VSCode, Sublime, Text, or other IDE


## Installation
<p>Execute the following commands in  (Or Gitbash): 

1. ls 
2. mkdir project-one
3. cd project-one
4. git clone https://github.com/hannahpsmith1/project-one.git

### Installation GIF for visual reference
<b> Important to note, this is a generic example, not specific to this repository (originally referenced in homework 1)<b>

![Install_Repo](https://user-images.githubusercontent.com/59800839/84457296-2bf62b80-ac17-11ea-9da2-f61f7d13522f.gif)

---

## Technologies

[HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

[JavaScript](https://www.javascript.com/)

[jQuery](https://jquery.com/)

[Moment.js](https://momentjs.com/)

[Materialize](https://materializecss.com/)

[jBox](https://stephanwagner.me/jBox)

## Contributors
--Hannah Smith

--Bart Dority

--Donna Nguyen

## Licenses 
*None

## Sources: 
1. [NASA Image API](https://api.nasa.gov/)
2. [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
3. Libraries are referenced above in Technologies
4. Stack Overflow 
