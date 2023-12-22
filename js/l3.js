var colors = { 1: 'rgb(133, 6, 145)', 2: 'rgb(145, 6, 85)', 3: 'rgb(52, 6, 145)', 4: 'rgb(25, 130, 210)', 5: 'rgb(25, 210, 111)', 6: 'rgb(232, 253, 96)', 7: 'rgb(255, 189, 58)', 8: 'rgb(255, 58, 58)' };


var ex_sq = document.getElementById('example_sq3');
var sq_s = document.getElementById('squares');
let timer = document.getElementById('timer');
var lvl = document.querySelector('h4');
let maxTime = 1000 * 25;
var RightScores = -1;

const sqSpinning = [
    { transform: "rotate(0)" },
    { transform: "rotate(360deg)" },
  ];
  
  const sqSpeed = {
    duration: 2000,
    iterations: Infinity,
  };


function back(){
    document.location.href = "begin.html";
}

var level = 0;
var kol=3;

let startTime = null;
let timerId = setInterval(function() {
    
    if (startTime === null) {
        startTime = Date.now();

        lvl.innerHTML='Режим 1: кликните на правильный квадрат';
        FillWithSq(ex_sq);
        console.log('Primer');
        let example = document.createElement('div');
        example.setAttribute('id', 'example_sq3');
        example.innerHTML = ex_sq.innerHTML;

        let PositionRight = getRandomInt(0,(kol-1));
        for (let i=0; i<kol; i++){ 
            let corner = getRandomInt(1, 360);

            let square = document.createElement('div');
            //square.id = example_sq;
            
            square.setAttribute('id', 'example_sq3');
            
            if(i!==PositionRight){
                FillWithSq(square);
                console.log('kvadrat');
                square.style.transform = "rotate("+ corner + "deg)";
                sq_s.appendChild(square);
            }
            else{
                example.style.transform = "rotate("+ corner + "deg)";
                example.className = ex_sq.className;
                sq_s.appendChild(example);
                console.log('kvadrat_pr');
            }
        }
        kol++;
        RightScores++;

        var children = sq_s.childNodes;
        console.log(ex_sq.className);
        if(RightScores>2){
            //example.appendChild();
            for (var i = 0; i < children.length; i++){
                children[i].draggable = true;
                console.log(children[i].className);
            }
            
            lvl.innerHTML='Режим 2: поместите правильный квадрат на квадрате-примере';
        }

        if(RightScores>5){
            for (var i = 0; i < children.length; i++){
                children[i].draggable = false;
                console.log(children[i].className);

                children[i].animate(sqSpinning, sqSpeed);
            }
            lvl.innerHTML='Режим 3: кликите на правильный квадрат';
        }
    }

    let now = Date.now();

    if(RightScores>5){
        console.log('ROTATE');

    }
    if(RightScores>2 && RightScores<=5){
        console.log('MOVE');
        console.log(RightScores);//

        let dragged = null;
        var children = sq_s.childNodes;
        for(var i = 0; i < children.length; i++){
            children[i].addEventListener("dragstart", function(e){
                let selected = e.target;

                ex_sq.addEventListener("dragover", function(e){
                    e.preventDefault(); //убираем "заглушку" для drop
                });

                ex_sq.addEventListener("drop", function(e){
                    console.log(ex_sq.className);//
                    console.log(selected.className);//
                    if(ex_sq.className === selected.className){
                        ex_sq.style.border = "4px solid rgb(24, 255, 39)"; 
                        selected=null;
                        setTimeout(() => {ex_sq.innerHTML = '';
                        sq_s.innerHTML = '';
                        startTime = null;
                        ex_sq.style.border = null; }, 2000);
                        
                    }
                    else{
                        ex_sq.style.border = "4px solid rgb(254, 22, 22)"; 
                        selected=null;
                        setTimeout(() => {clearInterval(timerId);
                            ex_sq.innerHTML = '';
                            sq_s.innerHTML = '';
                            ex_sq.innerHTML = "<h1>Неправильно :(</h1>";
                            sq_s.innerHTML = "Ваши очки: " + RightScores;
                            localStorage.setItem('lvl3', RightScores);
                            ex_sq.style.border = null; }, 3000);
                        
                    }

                    
                });
    
            })
            }
    }
    if(RightScores<=2 || RightScores>5){
        console.log('CLICK');
            sq_s.addEventListener("click", event => {
                if(event.target.parentElement.className === ex_sq.className){   //right!
                    event.target.parentElement.style.border = "4px solid rgb(24, 255, 39)"; 
                    
                    var children = sq_s.childNodes;
                    
                    for(var i = 0; i < children.length; i++){
                        children[i].animate(sqSpinning, sqSpeed).pause();
                        
                    } 
                    
                    setTimeout(() => {ex_sq.innerHTML = '';
                                        sq_s.innerHTML = '';
                                        startTime = null;}, 2000);
                    
                }
                
                else{
                    event.target.parentElement.style.border = "4px solid rgb(254, 22, 22)";
                    var children = sq_s.childNodes;
                    for(var i = 0; i < children.length; i++){
                        children[i].animate(sqSpinning, sqSpeed).pause();
                    } 
                    setTimeout(() => {clearInterval(timerId);
                        ex_sq.innerHTML = '';
                        sq_s.innerHTML = '';
                        ex_sq.innerHTML = "<h1>Неправильно :(</h1>";
                        sq_s.innerHTML = "Ваши очки: " + RightScores;
                        localStorage.setItem('lvl3', RightScores);}, 3000);
                    
                    //alert("The end!");
                    
                }
                
            });
        }
    if (now - startTime >= maxTime) {  
        clearInterval(timerId);
        ex_sq.innerHTML = '';
        sq_s.innerHTML = '';
        ex_sq.innerHTML = "<h1>Время вышло :(</h1>";
        sq_s.innerHTML = "Ваши очки: " + RightScores;
        localStorage.setItem('lvl3', RightScores);
        
    } 
    timer.innerText = formatTime(maxTime - (Date.now() - startTime));
}, 100);

function formatTime(time) {
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor(time / 1000 % 60);
    return minutes + ':' + seconds;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Максимум не включае
}

function FillWithSq(field){    
    let name = '';
    for (let i=0; i<25; i++){    //заполнение квадрата
        let rand_num = getRandomInt(1, 8);
        var sqr = document.createElement('div');
        sqr.classList.add('sq');
        sqr.style.background = colors[rand_num];
        sqr.id = rand_num;
        field.appendChild(sqr);
        name += rand_num;
    }
    field.classList.add(name);
    console.log(name);
  }
