//localStorage.clear();

function res(){
    document.location.href = "final.html";
}

function back(){
    document.location.href = "index.html";
}

let a;
let b;
let c;
if(localStorage.getItem('lvl1')===null){
    a=0;
}else{a=localStorage.getItem('lvl1');}
if(localStorage.getItem('lvl2')===null){
    b=0;
}else{b=localStorage.getItem('lvl2');}
if(localStorage.getItem('lvl3')===null){
    c=0;
}else{c=localStorage.getItem('lvl3');}


let score = Number(a) + Number(b) + Number(c);


let name1 = localStorage.getItem('name');

    const user  = {
        name: name1,
        sc1: a,
        sc2: b,
        sc3: c,
        total: score
    };

localStorage.setItem('user', JSON.stringify(user));

    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('lvl1'));
    console.log(localStorage.getItem('lvl2'));
    console.log(localStorage.getItem('lvl3'));
    console.log(localStorage.getItem('user'));

    console.log(user.total);

    var user1=JSON.parse(localStorage.getItem('user'));
    console.log(user1);


    var Users;
    if(user.name !== null){
        if(localStorage.getItem('users')===null){
            Users = [];
            Users.push(user);
            
        }
        else{
            Users = [];
            Users=JSON.parse(localStorage.getItem('users'));
            console.log(Users);
    
            let k=0;
            var num=0;
            let i=0;
            Users.forEach(element => {
                
                if(element.name===user1.name){
                    k++;
                    num = i;
                    console.log(num);
                }
                
                i++;
            });
            console.log(num);
            if (k===0){
                Users.push(user1);
            }
            else{
                if(Users[num].sc1 < user1['sc1']){
                    Users[num].sc1 = user1['sc1'];
                }
                if(Users[num].sc2 < user1['sc2']){
                    Users[num].sc2 = user1['sc2'];
                }
                if(Users[num].sc3 < user1['sc3']){
                    Users[num].sc3 = user1['sc3'];
                }
                Users[num].total = Number(Users[num].sc1) + Number(Users[num].sc2) + Number(Users[num].sc3);
            }
              //????
            k=0;
        }
        Users.sort((x, y) => parseFloat(y['total'])-parseFloat(x['total']));    //???

        localStorage.setItem('users', JSON.stringify(Users));
    }

    console.log(Users);

    


    console.log(localStorage.getItem('users'));



    console.log(Users.length);

   
    for(let i=0; i<Users.length; i++){

        let row = document.createElement('tr');
        row.innerHTML=`
        <td>${Users[i]['name']}</td>
        <td>${Users[i]['sc1']}</td>
        <td>${Users[i]['sc2']}</td>
        <td>${Users[i]['sc3']}</td>
        <td>${Users[i]['total']}</td>
        `
        console.log(row.innerHTML);
        
        
        document.querySelector('table').append(row);
    }

localStorage.setItem('lvl1', 0);
localStorage.setItem('lvl2', 0);
localStorage.setItem('lvl3', 0);