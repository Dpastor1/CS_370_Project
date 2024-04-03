const moistureButton=document.querySelector("#moistureUpdate");
const textentry=document.querySelector("#tbuser");
const output=document.querySelector("#output");
let moistureAverage;
let moistureCutoff;
function updateMoistureCutoff(){
    moistureAverage=textentry.value;
    output.innerHTML = " " + moistureAverage;
}
moistureButton.addEventListener('click',updateMoistureCutoff);
//Once Server is set up, send values to user side, page will load with values given, and display appropriate information
