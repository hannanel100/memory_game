
let board = document.getElementById("board");
const b4 = document.getElementById("b4");
const b6 = document.getElementById("b6");
const b8 = document.getElementById("b8");
const button = document.getElementsByClassName("button");
const reset = document.getElementById("reset");
let table = document.createElement("DIV");
board.appendChild(table);
let tileArray = [];
let mult = 0;
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        mult = this.innerHTML[0];
        tileArray = buildTiles(mult * (mult / 2)).concat(buildTiles(mult * (mult / 2)));
        console.log(tileArray);
        buildTable(mult);
        b4.disabled = true;
        b6.disabled = true;
        b8.disabled = true;
        startGame();
    });

}

reset.addEventListener("click", function () {
    document.location.reload();
})

function buildTable(size) {

    let row = [];
    let cntr = 0;
    shuffleArray(tileArray);
    console.log(tileArray);
    for (let i = 0; i < mult; i++) {
        row[i] = document.createElement("DIV");
        row[i].setAttribute("class", "row");
        table.appendChild(row[i]);
        let col = [];
        for (let j = 0; j < mult; j++) {
            col[j] = document.createElement("DIV");
            col[j].innerHTML = "<p>" + tileArray[cntr] + "</p>";
            col[j].setAttribute("class", "col-sm");
            col[j].querySelector("p").style.opacity = 0;
            col[j].style.border = "2px solid #007bff";
            col
            col[j].style.textAlign = "center";
            row[i].appendChild(col[j]);
            cntr++;
        }
    }
}

function buildTiles(size) {
    let tempArray = [];
    for (let i = 0; i < size; i++) {
        tempArray[i] = Number(i + 1);
    }
    return tempArray;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
let hasFlipped = false;
let firstCard, secondCard;
let foundArray = [];
function startGame() {
    setInterval(timer, 1000);
    let pressed = document.querySelectorAll(".col-sm");

    for (let i = 0; i < pressed.length; i++) {
        pressed[i].addEventListener("click", flip);
    }
}

function flip() {

    this.querySelector("p").style.opacity = 1;
    if (hasFlipped == false) {
        hasFlipped = true;
        firstCard = this.querySelector("p");
    }
    else {
        hasFlipped = false;
        secondCard = this.querySelector("p");
        if (firstCard.innerHTML != secondCard.innerHTML) {//no match
            setTimeout(function () {
                firstCard.style.opacity = 0;
                secondCard.style.opacity = 0;
            }, 1000);
        }
        else {
            foundArray.push(firstCard.innerHTML);
            if (foundArray.length >= mult * (mult / 2)) {
                setTimeout(function () {
                    board.removeChild(table);
                    let win = document.createElement("DIV");
                    win.setAttribute("class", ".text-center");
                    win.innerHTML = "YOU WON!";
                    board.appendChild(win);
                }, 1000);

            }
        }

    }
}
//still need to insert pictures

//timer still need to clear timer every  time
let bottom = document.getElementById("bottom");
let sec = 0;
let min = 0;
function timer() {
    let time;
    let str = "";
    time = document.createElement("DIV");
    console.log(time);
    if (min < 10) {
        str = "0" + min + ":" + sec;
        writeTimer(str, time);
        sec++;
    }
    if (sec < 10) {
        str = "0" + min + ":" + "0" + sec;
        writeTimer(str, time);
    }
    else if (sec > 59) {
        min++;
        sec = 0;
        str = "0" + min + ":" + "0" + sec;
        writeTimer(str, time);
    }
    
}
function writeTimer(str, time) {
    time.innerHTML = str;
    time.style.border = "thick solid #007bff";
    time.setAttribute("class", ".d-inline-block");
    bottom.insertBefore(time, reset);
    setTimeout(function(){
        time.remove();
    },999);
}