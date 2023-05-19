'use strict'

//variables
const form = document.querySelector('form');
const brandAutoPage = document.querySelector('.brand');
const modelAutoPage = document.querySelector('.selectModel');
const ownersAutoPage = document.querySelector('.carCondition');
const nbOwnersAutoPage = document.querySelector('.owners_none');
const payment = document.querySelector('.payment');
const button = document.querySelector('button');
const output = document.querySelector('.output');

//objets
const infoModelJaguar = {
    select_model: 0,
    jaguar_i_pace: 1000,
    jaguar_e_pace: 2000,
    jaguar_f_pace: 3000,
    jaguar_xe: 3500,
    jaguar_xf: 3800
}

const infoModelMazda = {
    select_model: 0,
    mazda2: 500,
    mazda3: 800,
    mazda_cx_5: 1200,
    mazda_mx5: 1500
}

const infoModelOpel = {
    select_model: 0,
    opel_astra: 750,
    opel_corsa: 850,
    opel_crossland: 900,
    opel_grandland: 1100,
    opel_mokka: 1300
}

const infoModelRenault = {
    select_model: 0,
    renault_austral: 400,
    renault_clio: 700,
    renault_kangoo: 1000,
    renault_megane: 300,
    renault_twingo: 1300,
    renault_zoe: 1600
}

// -1 -> field is not completed
let arrResultSumm = [-1, -1, -1, -1, -1, -1];

//evenements 
brandAutoPage.addEventListener('change', showModelAuto);
modelAutoPage.addEventListener('change', showBrandAuto);
ownersAutoPage.addEventListener('change', showOwnersNumber);
nbOwnersAutoPage.addEventListener('change', countOwners);
payment.addEventListener('change', showPaymentMethod)
button.addEventListener('click', submitForm);


//fonctions
function showModelAuto(event) {
    switch(event.target.value){
        case 'jaguar' :
            arrResultSumm[0] = 70000;
            modelAutoPage.classList.remove('none');
            getObjModelRenderPage(infoModelJaguar,modelAutoPage);
            break;
        case 'mazda' :
            arrResultSumm[0] = 50000;
            modelAutoPage.classList.remove('none');
            getObjModelRenderPage(infoModelMazda,modelAutoPage);
            break;
        case 'opel' :
            arrResultSumm[0] = 40000;
            modelAutoPage.classList.remove('none');
            getObjModelRenderPage(infoModelOpel,modelAutoPage);
            break;
        case 'renault' :
            arrResultSumm[0] = 20000;
            modelAutoPage.classList.remove('none');
            getObjModelRenderPage(infoModelRenault,modelAutoPage);
            break;
        case 'disable' :
            arrResultSumm[0] = -1;
            // model field becomes -1 because it is not completed in this case
            arrResultSumm[1] = -1;
            modelAutoPage.classList.add('none');
            break;
        default :
            arrResultSumm[0] = -1;
            arrResultSumm[1] = -1;
            break;
    }
}

function getObjModelRenderPage(obj, elementPage) {
    elementPage.innerHTML = '';
    for(let key in obj){
        const option = document.createElement('option');
        option.value = obj[key];
        option.innerText = key;
        elementPage.appendChild(option);
    }
}

function showBrandAuto(event) {
    arrResultSumm[1] = Number(event.target.value);
    // Brand and model are required fields
    if(arrResultSumm[0] === -1 || arrResultSumm[0] === 0) arrResultSumm[1] = -1;
}


function selectFuel() {
    let validity = false;

    arrResultSumm[2] = 0;

    if(document.getElementsByName("diesel")[0].checked) {
        arrResultSumm[2] += 0; // same price
        validity = true;
    }
    if(document.getElementsByName("gasoline")[0].checked) {
        arrResultSumm[2] += 500;
        validity = true;
    }
    if(document.getElementsByName("gaz")[0].checked) {
        arrResultSumm[2] += 1000;
        validity = true;
    }
    if(document.getElementsByName("electricity")[0].checked) {
        arrResultSumm[2] += 2000;
        validity = true;
    }

    if(validity === false) arrResultSumm[2] = -1;

}

// VOLUME DU MOTEUR
function selectEngineVolume() {
    let validity = false;

   if(document.getElementById("engine").value <= 2.3
   && document.getElementById("engine").value >= 1.1) {
    arrResultSumm[3] = 0;
    validity = true;
   }
   else {
        if(document.getElementById("engine").value >= 2.4
       &&  document.getElementById("engine").value <= 3.5) {
            arrResultSumm[3] = 300;
            validity = true;
        }
    }

    if(validity === false) arrResultSumm[3] = -1;

}

function showOwnersNumber(event) {
    switch(event.target.value){
        case 'new' :
            arrResultSumm[4] = 1;
            nbOwnersAutoPage.classList.add('owners_none');
            break;
        case 'used' :
            nbOwnersAutoPage.classList.remove('owners_none');
            break;
    }
}

function countOwners(event) {

    switch(event.target.value){
        case '1_2owners' :
            arrResultSumm[4] = 60/100;
            break;
        case 'gt3owners' :
            arrResultSumm[4] = 40/100;     
            break;
    }
}

function showPaymentMethod(event) {

    switch(event.target.value){
        case 'card' :
            arrResultSumm[5] = 'card';
            break;
        case 'cash' :
            arrResultSumm[5] = 'cash';
            break;
    }
}


function submitForm(event) {
    selectFuel();
    selectEngineVolume();

    const totalPrice = (arrResultSumm[0]
    + arrResultSumm[1]
    + arrResultSumm[2]
    + arrResultSumm[3])
    * arrResultSumm[4];

    console.log(
        "Validation Brand : " + arrResultSumm[0] + "\n"
        + "validation Model : " + arrResultSumm[1] + "\n"
        + "validation Fuel : " + arrResultSumm[2] + "\n"
        + "validation Engine volume : " + arrResultSumm[3] + "\n"
        + "validation Car condition : " + arrResultSumm[4] + "\n"
        + "validation Payment method : " + arrResultSumm[5] + "\n"
    );
    if(arrResultSumm[0] !== -1
        && arrResultSumm[1] !== -1
        && arrResultSumm[2] !== -1
        && arrResultSumm[3] !== -1
        && arrResultSumm[4] !== -1
        && arrResultSumm[5] !== -1) {
            output.innerHTML = '<br>TOTAL PRICE : ' + totalPrice + ` $`;

            output.innerHTML +=
        `<br>
        <br><i>--------------------
        <br><u>Admin informations :</u>
        <br>Brand price : ` + arrResultSumm[0] + ` $`
        + `<br>Model price : `+ arrResultSumm[1] + ` $`
        + `<br>Fuel price : `+ arrResultSumm[2] + ` $`
        + `<br>Engine Volume price : `+ arrResultSumm[3] + ` $`
        + `<br>Car condition coefficient : `+ arrResultSumm[4]
        + `<br>Payment method : `+ arrResultSumm[5]
        + `<br>--------------------</i>`;
    }
    else alert("Please fill all the fields correctly in order to see total price.");
}

