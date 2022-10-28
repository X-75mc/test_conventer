import React, { createRef }  from 'react';
import {useState, useEffect} from 'react'
import './App.css';

function App() {

  

  const rates = {};

  const refInputUah = React.createRef();
  const refInputResult = React.createRef();
  const refSelect = React.createRef();

  const [inputUah, setInputUah] = useState(); 
  const [stateUsd, setStateUsd] = useState();
  const [stateEur, setStateEur] = useState();
  const [stateResult, setStateResult] = useState();
  const [stateSelect, setStateSelect] = useState();
  const [stateRates, setStateRates] = useState();
  const [stateValute, setStateValute] = useState();
  
  

  

  getCurrency();
    

  async function getCurrency (){
    const responce = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const json1 = await responce.json();
    const result = await json1;

    rates.usd = parseFloat(result[0].buy);
    
    setStateUsd((rates.usd).toFixed(2)); 
    
    rates.eur = parseFloat(result[1].buy);
    setStateEur((rates.eur).toFixed(2));
    
}




function convertValue (){

  setInputUah(refInputUah.current.value);
  setStateSelect(refSelect.current.value);
  setStateResult(refInputResult.current.value);
  setStateRates(rates[stateSelect]);
  
  setStateValute( (parseFloat(inputUah) / stateRates).toFixed(2));
  
  
  console.log(stateValute);

  
  
  
}

  return (
    <>
      <div className="container">

          <h1 className="conventer-name">Конвентер Валют</h1>

            <div className="conventer-tabl">

            <div className="conventer-item-one">
                <div className="conventer-block">
                    <div className="conventer-value-name-one">Курс USD:</div>
                    <div className="conventer-item-value-one"  data-value="USD">{stateUsd}</div>
                </div>
  
            </div>

      <div className="conventer-item-two">

        <div className="conventer-block">
            <div className="conventer-value-name-two">Курс EUR:</div>
            <div className="conventer-item-value-two"  data-value="EUR">{stateEur}</div>
        </div>
  
      </div>
    
          </div>

        <div className="conventer-selects">

          <select disabled className="form-control"  id="exampleFormControlSelect1">
              <option defaultValue="UAH" >UAH - Україньська Гривня</option>
          </select>

          <select id="select"	className="form-control"  ref={refSelect} onChange = {convertValue} >
              <option value="usd">USD — Доллар США</option>
              <option value="eur">EUR — Евро</option>
          </select>

      </div>

      <div className="conventer-inputs">

        <input id="inputUAH" type="number" ref={refInputUah}  onInput = {convertValue}  className="form-control" autoFocus/>

        <input id="inputResult" type="number" defaultValue={stateValute} ref={refInputResult} className="form-control" />

    </div>


      </div>
    </>
  );
}

export default App;
