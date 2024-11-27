var w = document.documentElement.clientWidth || window.innerWidth;

function openCV() {
    if (w <= 1024) {
        var url = document.getElementById('CV_iframe').src;
        var tabOrWindow = window.open(url, '_blank');
        tabOrWindow.focus();
    } else {
        document.getElementById("CV_file").style.display = "block";
        document.getElementById("CV-canvas").style.display = "block";
        document.getElementById("close").style.display = "block";
    }
}

function closeCV() {
    document.getElementById("CV_file").style.display = "none";
    document.getElementById("CV-canvas").style.display = "none";
    document.getElementById("close").style.display = "none";
}
