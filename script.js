const displayRange=document.querySelector("[data-lengthNumber]");
const rangeSlider=document.querySelector("[data-lengthSlider]");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const outputScreen=document.querySelector("[data-passwordDisplay]");
const generateBtn=document.querySelector(".generate-password"); 
const copyBtn=document.querySelector("[data-copy]"); 
const indicator=document.querySelector("[data-indicator]")
// initilised 
let passwordLength=8;
let password="";
let checkCount=0;


function handleSlider(){
    rangeSlider.value=passwordLength;
    displayRange.innerText=passwordLength;
    // kuch or bhi karna hai   // length has been cover by the thumb  that is called a backgrounSize 
      const min= parseInt(rangeSlider.min);
      const max= parseInt(rangeSlider.max);  
    rangeSlider.style.backgroundSize = (((passwordLength - min) * 100) / (max - min) + "% 100%");
 

        
}


function setIndicatorColor(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0 0 10px 4px ${color}`; 

}


function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked)  hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
   
    if((hasUpper || hasLower || hasNum || hasSym) && passwordLength>0){
        setIndicatorColor("#0f0");
    }
     else 
        setIndicatorColor("#f00");
    
}
    


let radhe=document.querySelector("#radhe");
   radhe.style.fontWeight="bold";

function checkBoxCount(){
    checkCount=0;
   // allCheckBox is a array that contain all checkbox 
    allCheckBox.forEach(
        (box)=>{
            if(box.checked) checkCount++; 
        }
     );


     // 
     if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
       }

}

function getRndInteger(min,max){        
    return  Math.floor(Math.random()*(max-min)+min)   
}
function generateUpperCase(){
     return   String.fromCharCode(getRndInteger(65,91) );               }

function generateLowerCase(){
     return   String.fromCharCode(getRndInteger(97,123) );     
}


function generateNumber(){
     return getRndInteger(0,10);
}


function generateSymbol(){
   const s="`~!@#$%^&*()-_=+[{]}\\:;<,>.?/'";
   const rndValue=Math.floor(Math.random()*s.length);
   return s[rndValue];
}



function  sufflePassword(arr){

    for(let i=arr.length-1; i>=0; i--){
        const j= Math.floor(Math.random()*(i+1)); 
        let temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;

       }

       // now suffling has been done 
       let s="";
       for(let i=0; i<arr.length; i++){
        s+=arr[i];          
       }
         return s;

}


function copyContent() {
    // Try to use Clipboard API
    navigator.clipboard.writeText(outputScreen.value)         

        .then(() => {                                          
            alert("Password copied to clipboard!");
        })
        .catch((err) => {                                     
            console.error("Failed to copy text: ", err);
        });


       
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


copyBtn.addEventListener('click',()=>{
if(outputScreen.value) copyContent();

});


allCheckBox.forEach(
    (checkbox)=> {
        checkbox.addEventListener('change',checkBoxCount)
    }

);


// // now i will generate a password 

handleSlider();
checkBoxCount();  
rangeSlider.addEventListener('input',function(){
            displayRange.innerText=rangeSlider.value ;
            passwordLength=rangeSlider.value; 
            handleSlider();  
}
);

generateBtn.addEventListener('click',()=>{
    if(!checkCount) alert("please select atleast 1 check box radhe radhe ")
    password="";

let funcArr=[];
    if(uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if(numbersCheck.checked) funcArr.push(generateNumber);
    if(symbolsCheck.checked) funcArr.push(generateSymbol);


    for(let i=0; i<funcArr.length; i++){
        password+=funcArr[i]();
    }

    
     for (let i = 1; i <= passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
        }


     let radheArr=Array.from(password);
     password=sufflePassword(radheArr);
 

     outputScreen.value=password;
     calcStrength();


});





