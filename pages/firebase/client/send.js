import { useState, Component } from 'react'
import QRReader from "../../../components/QRReader.tsx";

function ClienteSend(){
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [uri, setUri] = useState("")

    const getKey = async () => {
        const myKey = await fetch("/api/firebase?f=getNewKey").then(data => {
            // console.log("Consulta efetuada!")
            return data.json()
        })
        setKey(myKey.key);
        console.log(myKey.key)
    }
    const registerValue = async () => {
        const myKey = await fetch(`/api/firebase?f=registerValueForKey&pf=${key},${uri}`).then(data => {
            // console.log("Consulta efetuada!")
            return data.json()
        })
        alert(JSON.stringify(myKey, undefined, 2))
    }

    const updateValue = (event) => {
        setValue(event.target.value)
        console.log(event.target.value)
    }

    const updateUri = (data) => {
        setUri(data);
        document.getElementById("resultUrl").value = data;
    }

    return(
        <div>
            <h1>Cliente Send</h1>
            <button id="gerateKey" onClick={getKey}>
                Gerar chave
            </button>
            <h4>Key: {key}</h4>
            <input onChange={updateValue} type="text" name="inputUrl" id="inputUrl"/>
            <button id="registerValue" onClick={registerValue}>
                Registrar valor
            </button>
            <br/>
            <br/>
            <br/>
            <input type="url" name="resultUrl" id="resultUrl" src={uri} value={uri} />
            <QRReader getNewValue={updateUri}/>
        </div>
    )
}

export default ClienteSend;