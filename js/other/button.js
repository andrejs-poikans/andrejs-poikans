

function toggleList(){

    var listButton = document.getElementById('listButton');
    var listView = document.querySelectorAll(".title");
    var posterView = document.querySelectorAll(".content");
    var emptyElements = document.querySelectorAll(".empty");
    var gap1 = document.querySelectorAll(".archive ul#channel-blocks li:nth-child(2n)");
    var gap2 = document.querySelectorAll(".archive ul#channel-blocks li:nth-child(5n)");


    if (listButton.innerHTML == 'poster view') {
        //      list is visible. hide it
               listView.forEach(a=>a.style.display = "none");
               posterView.forEach(a=>a.style.display = "initial");
               emptyElements.forEach(a=>a.style.display = "initial");
               gap1.forEach(a=>a.style.marginTop = "5em");
               gap2.forEach(a=>a.style.marginTop = "5em");

        //      change button text
               listButton.innerHTML = 'list view';
             }
             else {
                //       // list is hidden. show it
              listView.forEach(a=>a.style.display = "initial");
              posterView.forEach(a=>a.style.display = "none");
              emptyElements.forEach(a=>a.style.display = "none");
              gap1.forEach(a=>a.style.marginTop = "0em");
              gap2.forEach(a=>a.style.marginTop = "0em");
                //       // change button text
              listButton.innerHTML = 'poster view';
        }
}