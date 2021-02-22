import { useState, Component } from 'react'
import QRReader from "../../components/QRReader.tsx";

function ClienteSend(){
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const getKey = async () => {
        const myKey = await fetch("/api/firebase?f=getNewKey").then(data => {
            // console.log("Consulta efetuada!")
            return data.json()
        })
        setKey(myKey.key);
        console.log(myKey.key)
    }
    const registerValue = async () => {
        const myKey = await fetch(`/api/firebase?f=registerValueForKey&pf=${key},${value}`).then(data => {
            // console.log("Consulta efetuada!")
            return data.json()
        })
    }

    const updateValue = (event) => {
        setValue(event.target.value)
        console.log(event.target.value)
    }

    return(
        <div>
            <h1>Cliente Send</h1>
            <button id="gerateKey" onClick={getKey}>
                Gerar chave
            </button>
            <h4>Key: {key}</h4>
            <input onChange={updateValue} type="text" name="url" id="url"/>
            <button id="registerValue" onClick={registerValue}>
                Registrar valor
            </button>
            <br/>
            <br/>
            <br/>
            <QRReader/>
            <p></p>
        </div>
    )
}

export default ClienteSend;