
function random(min, max){
    return Math.floor((Math.random()* (max+1))) + min; 
}

function generate(min, max){
    let array = [];
    let id;

    for(let i = min+1 ; i <= max; i++){
        array.push(i);
    }
    
    let randomIndex = random(0, array.length-1);
    let randomNumber = array[randomIndex];
    array.splice(randomIndex,1);

    return randomNumber;
}

module.exports = {generate};