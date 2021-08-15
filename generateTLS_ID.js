
function random(min, max){
    return Math.floor((Math.random()* (max+1))) + min; 
}

function generateID(min, max){
    let array = [];

    for(let i = min+1 ; i <= max; i++){
        array.push(i);
    }
    
    return array;
}

let array = generateID(0, 9)

function generate() {
    let id;

    if(array.length == 0){
        console.log("Increase ")
    }
    let randomIndex = random(0, array.length-1);
    let randomNumber = array[randomIndex];
    array.splice(randomIndex, 1);
    randomNumber = randomNumber.toString();

    if(randomNumber.length == 1){
        id = `00${randomNumber}`;
    } else if(randomNumber.length ==2){
        id = `0${randomNumber}`;
    } else{
        id = randomNumber;
    }

    return id;
}

module.exports = {generate};