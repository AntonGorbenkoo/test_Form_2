import React, {useRef, useState} from 'react';
import { useInputPhoneMask } from 'use-input-phone-mask';
import axios from 'axios';
import './modal.css';


function Modal({active, setActive, value}) {

    const [validBtn, setValidBtn] = useState(true);
    
    function useInput (initialValue, inputN) {
        
        const[inputValue, setInputValue] = useState(initialValue);
        
        const onChangeInput = (e) => {
            setInputValue(inputN.current.value);

            if(inputN.current === inputName.current){
                if(inputN.current?.value.length < 3){
                    inputN.current.className = "formInput invalid";
                }else {
                    inputN.current.className = "formInput valid";
                }

            }else if(inputN.current === inputEmail.current){
                const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!re.test(String(inputEmail.current.value).toLowerCase())){
                    inputN.current.className = "formInput invalid";
                }else {
                    inputN.current.className = "formInput valid";
                    
                }
            }

            if (inputName.current.className === "formInput valid" && 
            inputEmail.current.className === "formInput valid" &&
            inputRef.current.className === "formInput valid"){
                sendBtn.current.style.opacity = '1';
                setValidBtn(false);
            }
            
        }

        return {
            onChangeInput,
        }
    }

    

   const onInputPhone = (e) => {
        const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
            if(!re.test(inputRef.current.value)){
                inputRef.current.className = "formInput invalid";
            }else {
                inputRef.current.className = "formInput valid"; 
            }
    }

    const sendBtn = useRef(null);
    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const { ref: inputRef, onChange } = useInputPhoneMask({ mask: '+7 (###) ###-##-##' }); // phone mask


    const userName = useInput('', inputName);
    const userEmail = useInput('', inputEmail);

   const arrOptions =  [
        {
        id: 1,
        name: "????????????"
        },
        {
        id: 2,
        name: "??????????-??????????????????"
        },
        {
        id: 3,
        name: "????????????"
        }
        ];

    const options = arrOptions.map((el) => {
        return <option key={el.id} value={el.name}>{el.name}</option>
    } );

    const mySelect = useRef(null);
    function defaultvalue() {
        if(active){
            mySelect.current.value = value;
        }
    }


    function hendleSubmit(e){
        e.preventDefault();

        const newApplication = {
            name : inputName.current.value,
            phone : inputRef.current.value,
            email : inputEmail.current.value,
            town : mySelect.current.value
        }
        //telegram chat_bot
        const TOKEN = '6115532820:AAEkHuOQr_fGlnqWZ1GRuCE6_wULlAvN2QM';
        const CHAT_ID = '-1001841851977';
        const URI = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;


        const text = `
            <b>???????????? ?? ??????????</b>\n <b>?????? ??????????????????: </b>${newApplication.name}\n <b>??????????????: </b>${newApplication.phone}\n <b>Email: </b>${newApplication.email}\n <b>??????????: </b>${newApplication.town}\n
            `;

        axios.post(URI, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: text
        })

        .then(() => {
            console.log('?????????????? ??????????????????????!');
        })
        .catch((err) => {
            console.log(err);
        })


        inputName.current.value = '';
        inputRef.current.value = '';
        inputEmail.current.value = '';

        inputName.current.className = "formInput";
        inputRef.current.className = "formInput";
        inputEmail.current.className = "formInput";

        sendBtn.current.style.opacity = '0.5';

        setActive(false);
        setValidBtn(true);
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => {setActive(false)}}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={hendleSubmit} id="mainForm" disabled >
                    <p id="formLabel">???????????????? ????????????</p>
                    <div id="groupInp">
                    <label id="one_l">??????*
                    <input 
                        ref={inputName} 
                        className="formInput"
                        id="one" 
                        placeholder="???????? ????????????" 
                        value={inputName.current?.value || ''}
                        onChange={e => userName.onChangeInput(e)}
                    >
                    </input>
                    </label>
                    <label id="two_l">??????????????
                    <input  
                        ref={inputRef} 
                        onChange={onChange}
                        className="formInput"
                        id="two"
                        placeholder="+7(___) ___-__-__"
                        onInput={onInputPhone}
                    >
                    </input>
                    </label>
                    <label id="three_l">Email*
                    <input
                        ref={inputEmail} 
                        className="formInput" 
                        id="three" 
                        placeholder="Email" 
                        onChange={e => userEmail.onChangeInput(e)}
                        value={inputEmail.current?.value || ''}
                    >
                    </input>
                    </label>
                    <label id="four_l">??????????
                    <select
                        ref={mySelect}
                        className="formInput" 
                        id="four"
                    > 
                        {defaultvalue()}
                        {options}
                    </select>
                    </label>
                    </div>
                    <button ref={sendBtn} type="submit" id="sendBtn" disabled={validBtn}><a id="btnText">??????????????????</a></button>
                </form>
            </div>
        </div>
    );
}

export default Modal;