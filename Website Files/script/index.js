const buttonLower=document.querySelector("#buttonLower");
const buttonUpper=document.querySelector("#buttonUpper");
const textentryLower=document.querySelector("#tbuser");
const textentryUpper=document.querySelector("#upper")
const output=document.querySelector("#output");
const conditionaltext=document.querySelector("#shouldWater");
let moistureAverage=0;
let moistureLower;
let moistureUpper;
//Logic for telling the user if they need to water their plant based on the moisture average over time
const checkCutoff=()=>{
    if(moistureLower>moistureUpper){
        conditionaltext.innerHTML="Invalid Bounds, please make lower is less than or equal to the upper bounds";
        return; 
    }
    if (moistureAverage > moistureUpper){
        conditionaltext.innerHTML="Plant too humid! Water less";
    }
    else if (moistureAverage < moistureLower){
        conditionaltext.innerHTML="Plant too dry! Water more";
    }
    else{
        conditionaltext.innerHTML="Plant within humidity range, no need to water.";
    }
}
const updateLowerBound = ()=>{
    moistureLower=textentryLower.value;
    textentryLower.value="";
    output.innerHTML = " " + moistureLower +" to "+moistureUpper;
    checkCutoff();
    //Send value to Pi
}
const updateUpperBound = ()=>{
    moistureUpper=textentryUpper.value;
    textentryUpper.value="";
    output.innerHTML = " " + moistureLower +" to "+moistureUpper;
    checkCutoff();
    //Send value to Pi
}

buttonLower.addEventListener('click',updateLowerBound);
buttonUpper.addEventListener('click',updateUpperBound);
//Once Server is set up, send values to user side, page will load with values given, and display appropriate information
