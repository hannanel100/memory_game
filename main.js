
var board = document.getElementById("board");
const b4 = document.getElementById("b4");
const b6 = document.getElementById("b6");
const b8 = document.getElementById("b8");
const reset = document.getElementById("reset");

let tileArray = [];
let mult = 0;
b4.addEventListener("click", function () {
    mult = 2;
    tileArray = buildTiles(4 * mult);
    buildTable(4);
    b4.disabled = true;
    b6.disabled = true;
    b8.disabled = true;
    startGame();
})

b6.addEventListener("click", function () {
    mult = 3;
    tileArray = buildTiles(6 * mult);
    buildTable(6);
    b4.disabled = true;
    b6.disabled = true;
    b8.disabled = true;
})
b8.addEventListener("click", function () {
    mult = 4;
    tileArray = buildTiles(8 * mult);
    buildTable(8);
    b4.disabled = true;
    b6.disabled = true;
    b8.disabled = true;
})
reset.addEventListener("click", function () {
    document.location.reload();
})

function buildTable(size) {
    var row = [];
    var cntr = 0;
    shuffleArray(tileArray);
    for (var i = 0; i < size; i++) {
        row[i] = document.createElement("DIV");
        row[i].setAttribute("class", "row");
        board.appendChild(row[i]);
        var col = [];
        for (var j = 0; j < size; j++) {
            col[j] = document.createElement("DIV");
            col[j].innerHTML = "<p>" + tileArray[cntr] + "</p>";
            col[j].setAttribute("class", "col-sm");
            col[j].querySelector("p").style.opacity = 0;
            col[j].style.border = "thick solid #0000FF";
            col[j].style.textAlign = "center";
            row[i].appendChild(col[j]);
            cntr++;
            if (cntr >= size * mult) {
                cntr = 0;
                shuffleArray(tileArray);
            }
        }
    }
}

function buildTiles(size) {
    var tempArray = [];
    for (var i = 0; i < size; i++) {
        tempArray[i] = Number(i + 1);
    }
    return tempArray;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function startGame() {
    let pressed = document.querySelectorAll(".col-sm");
    for (var i = 0; i < pressed.length; i++) {
        pressed[i].addEventListener("click", function(){
        this.querySelector("p").style.opacity=1;
        });
        
    }
}

/*pressed.addEventListener("click", function(){
    console.log(this);
    this.style.background = "red";
})*/
