import { useState } from 'react'
import QRReader from "../../../components/QRReader.tsx";

function ClienteSend(){
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [uri, setUri] = useState("")

    const getKey = async () => {
        const myKey = await fetch("/api/json/firebase/getNewKey").then(data => {
            // console.log("Consulta efetuada!")
            return data.json()
        })
        setKey(myKey.key);
        console.log(myKey.key)
    }
    const registerValue = async () => {
        const myKey = await fetch(`/api/json/firebase/registerValue&key=${key}&value=${uri}`).then(data => {
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <h1 style={{
            textAlign: 'center'
            }}>Cliente Send</h1>
            <div style={{
                display: 'grid',
                justifyContent: 'center'
            }}>
                <button id="gerateKey" onClick={getKey}>
                    Gerar chave
                </button>
            </div>
            <h4 style={{
                textAlign: 'center'
            }}>Key: {key}</h4>
            <div style={{
                display: 'grid',
                justifyContent: 'center'
            }}>
                <input onChange={updateValue} type="text" name="inputUrl" id="inputUrl"/>
                <br/>
                <button id="registerValue" onClick={registerValue}>
                    Registrar valor
                </button>
            </div>
            <br/>
            <div style={{
                display: 'grid',
                justifyContent: 'center'
            }}>
                <input
                    disabled
                    type="url"
                    name="resultUrl"
                    id="resultUrl"
                    value={uri}
                    style={{
                        width: "50vw"
                    }}
                />
            </div>
            <br/>
            <QRReader getNewValue={updateUri}/>
        </div>
    )
}

export default ClienteSend;