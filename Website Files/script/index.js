const buttonUpper=document.querySelector("#buttonUpdate");
const textentryLower=document.querySelector("#tbuser");
const textentryUpper=document.querySelector("#upper")
const output=document.querySelector("#output");
const conditionaltext=document.querySelector("#shouldWater");
const averageText=document.getElementById("average");
let file=new FileReader();
let array;
let moistureAverage=15.7776908; // test value
let moistureLower;
let moistureUpper;
//Logic for telling the user if they need to water their plant based on the moisture average over time
const checkCutoff=()=>{
    if(moistureLower>moistureUpper || (moistureLower == undefined || moistureUpper == undefined)){
        conditionaltext.innerHTML="Enter a desired range to start.";
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
    if(textentryLower.value!=""){
        moistureLower=textentryLower.value;
    }
    textentryLower.value="";
    output.innerHTML = " " + moistureLower +" to "+moistureUpper;
    checkCutoff();
    //Send value to Pi
}
const updateUpperBound = ()=>{
    if(textentryUpper.value!=""){
        moistureUpper=textentryUpper.value;
    }
    textentryUpper.value="";
    output.innerHTML = " " + moistureLower +" to "+moistureUpper;
    checkCutoff();
    //Send value to Pi
}
const updateBounds = ()=>{
    updateLowerBound();
    updateUpperBound();
}
//Python will constantly run to measure sensor data every time increment. Once a user requests to access the website, JavaScript will
//access the file upon access, can either ONLY give the average, or store all of the data. (probably best if all).
//--------------------------------------------------------------------------------------------------------
//Code to access data file should go HERE (call everything before eventlistener)
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const getAverage = () => {
    fetch('http://10.253.140.191:5000/moisture')  // Update with your Raspberry Pi's IP address and port
        .then(response => response.json())
        .then(data => {
            let moistureAverage = data.moisture;
            averageText.innerHTML = "Running Average: " + moistureAverage.toFixed(4);

            checkCutoff();  // Re-check the cutoff with the new average
        })
        .catch(error => {
            console.error('Error fetching moisture data:', error);
        });
};

getAverage();
averageText.innerHTML+= moistureAverage.toFixed(4);
buttonUpper.addEventListener('click',updateBounds);
