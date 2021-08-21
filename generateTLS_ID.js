
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

let array = generateID(0, 999);

function seqindex(max){
    let IDindex = [];

    for(let i = 0 ; i <= max-1; i++){
        IDindex.push(i);
    }
    
    return IDindex;
}

let indexArray = seqindex(array.length);

function generate() {
    let id;

    //Random ID
    //let randomIndex = random(0, array.length-1);
    //let randomNumber = array[randomIndex];
    //array.splice(randomIndex, 1);
    //randomNumber = randomNumber.toString();

    //if(randomNumber.length == 1){
    //    id = `00${randomNumber}`;
    //} else if(randomNumber.length ==2){
    //    id = `0${randomNumber}`;
    //} else{
    //    id = randomNumber;
    //}

    //Sequential ID
    let index = indexArray[1];
    indexArray.splice(0, 1);
    let indexNumber = index.toString();

    if(indexNumber.length == 1){
        id = `00${indexNumber}`;
    } else if(indexNumber.length == 2){
        id = `0${indexNumber}`;
    } else{
        id = indexNumber;
    }
    

    return id;
}

module.exports = {generate};