var btn = document.getElementsByClassName("button");
let name = document.getElementById("name");

/*localStorage.setItem('lvl1', 0);
localStorage.setItem('lvl2', 0);
localStorage.setItem('lvl3', 0);*/

function start() {
    if (isEmpty(name.value)) {
        alert("Нужно ввести имя!");
    }
    else {
        localStorage.setItem('name', name.value);
        document.location.href = "begin.html";
    }
}

function isEmpty(str) {
    return str.trim() == '';
}


function startLvl1(){
    document.location.href = "lvl1.html";
}

function startLvl2(){
    document.location.href = "lvl2.html";
}

function startLvl3(){
    document.location.href = "lvl3.html";
}

function back(){
    document.location.href = "index.html";

}