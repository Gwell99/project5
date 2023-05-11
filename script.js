let sliders = document.getElementsByClassName('slider');
let checks = document.getElementsByClassName('checkbox');

var ubering = document.createElement("uberPic");
ubering.src = "uber.jpg";

var walking = document.createElement("walkPic");
walking.src = "walk.jpg";

var subwaying = document.createElement("subwayPic");
subwaying.src = "subway.jpg";

let element1 = document.getElementById("uberPic"); 
let element2 = document.getElementById("subwayPic"); 
let element3 = document.getElementById("walkPic");

window.addEventListener("load", (event) => {            //loader 
    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        localStorage.setItem(slider.id, 0);
    }

    for (let i = 0; i < checks.length; i++) {
        let check = checks[i];
        localStorage.setItem(check.id, false);
    }
});


for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i];
    slider.addEventListener('change', processSlider);
}

for (let i = 0; i < checks.length; i++) {
    let check = checks[i];
    check.addEventListener('change', processCheck);
}

function processSlider(event) {

    let id = event.target.id;
    let number = event.target.value;

    localStorage.setItem(id, number);

    console.log(localStorage.getItem(id));
}


function processCheck(event) {

    let id = event.target.id;
    let val = event.target.value;

    localStorage.setItem(id, val); 

}


document.getElementById("generate").addEventListener('click', generateResults); 

function generateResults() {

    let q8 = localStorage.getItem('Q8');
    let q9 = localStorage.getItem('Q9');
    let q10 = localStorage.getItem('Q10');


    let noWalk = q8 || q9 || q10;               //if any of last 3 questions chosen, walk cannot be an answeer (unless < $5)

    console.log('Cant Walk' + noWalk);

    if (localStorage.getItem('Q1') < 20) {                                  //if you have less than a certain amount of $
        console.log('walk');
        document.getElementById('answer').innerHTML= 'You should walk';
        element2.setAttribute("hidden", "hidden");              //hides other pics
        element1.setAttribute("hidden", "hidden");
        element3.removeAttribute("hidden");
    }
    else {

        let slidersArr = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];

        let score = 0; 
        for (let i = 0; i < slidersArr.length; i++) {
            let val = parseInt(localStorage.getItem(slidersArr[i]));

            console.log(slidersArr[i] + ":" + val);
            score+=val;
        }
        console.log(score);

        if (noWalk) {
            if (score < 300) {
                console.log('Uber');
                //document.querySelector("#results").innerHTML = score                    //prints score
                document.getElementById('answer').innerHTML= 'You should Uber';         
                    let hidden = element1.getAttribute("hidden");
                    element2.setAttribute("hidden", "hidden");              //hides other pics
                    element3.setAttribute("hidden", "hidden");
                    element1.removeAttribute("hidden");

            }
            else {
                console.log('Subway');   
                //document.querySelector("#results").innerHTML = score
                document.getElementById('answer').innerHTML= 'You should subway';
                element1.setAttribute("hidden", "hidden");
                element3.setAttribute("hidden", "hidden");
                let hidden = element2.getAttribute("hidden");
                element2.removeAttribute("hidden");

            }
        }
        else {
            if (score < 100) {
                console.log('Walk');
                //document.querySelector("#results").innerHTML = score
                document.getElementById('answer').innerHTML= 'You should walk';   //lower score = more dangerous travel experience
                let hidden = element3.getAttribute("hidden");
                element1.setAttribute("hidden", "hidden");
                element2.setAttribute("hidden", "hidden");
                element3.removeAttribute("hidden");

            }
            else if (score < 500 && score > 300) {
                console.log('Subway')
                //document.querySelector("#results").innerHTML = score
                document.getElementById('answer').innerHTML= 'You should subway';
                element1.setAttribute("hidden", "hidden");
                element3.setAttribute("hidden", "hidden");
                let hidden = element2.getAttribute("hidden");
                element2.removeAttribute("hidden");

            }
            else {
                console.log('Uber');   
                //document.querySelector("#results").innerHTML = score
                document.getElementById('answer').innerHTML= 'You should Uber';
                element2.setAttribute("hidden", "hidden");
                element3.setAttribute("hidden", "hidden");
                let hidden = element1.getAttribute("hidden");
                element1.removeAttribute("hidden");

            }
        }

    } 


}