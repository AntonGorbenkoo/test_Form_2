import React, {useRef, useState} from 'react';
import './modal.css'

function Modal({active, setActive, value}) {
    
   const arrOptions =  [
        {
        id: 1,
        name: "Москва"
        },
        {
        id: 2,
        name: "Санкт-Петербург"
        },
        {
        id: 3,
        name: "Казань"
        }
        ];

        const options = arrOptions.map((el) => {
            return <option key={el.id} value={el.name}>{el.name}</option>
        } )

    const mySelect = useRef(null);
    function defaultvalue() {
        if(active){
            mySelect.current.value = value;
        }
    }
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => {setActive(false)}}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <form id="mainForm">
                    <p id="formLabel">Заказать звонок</p>
                    <div id="groupInp">
                    <label id="one_l">Имя*
                    <input className="formInput" id="one" placeholder="Иван Иванов"></input>
                    </label>
                    <label id="two_l">Телефон
                    <input className="formInput" id="two" placeholder="+7(___)-___-__-__"></input>
                    </label>
                    <label id="three_l">Email*
                    <input className="formInput" id="three"placeholder="Email"></input>
                    </label>
                    <label id="four_l">Город
                    <select className="formInput" id="four" ref={mySelect} >
                        {defaultvalue()}
                        {options}
                    </select>
                    </label>
                    </div>
                    <button type="submit" id="sendBtn"><a id="btnText">Отправить</a></button>
                </form>
            </div>
        </div>
    );
}

export default Modal;