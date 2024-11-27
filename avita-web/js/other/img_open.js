    // Function to open the image in the large display
    function openImg(imageSrc) {
        document.getElementById("close").style.display = "block";
        // Show the image container
        document.getElementsByClassName("img-container")[0].style.display = "block";
        // Set the correct image source to the large display image
        document.getElementById("large-display-img").src = imageSrc;
        document.getElementById("img-canvas").style.display = "block";
    }

    // Function to close the image view
    function closeImg() {
        document.getElementById("close").style.display = "none";
        // Hide the image container
        document.getElementsByClassName("img-container")[0].style.display = "none";
        document.getElementById("img-canvas").style.display = "none";
    }