import {useState} from 'react'

function ClienteRevice(){

    const [key, setKey] = useState("");
    const [xml, setXml] = useState(false);
    const [result, setResult] = useState("undefined");

    const changeListenKey = async (event) => {
        // console.log(event.target.value)
        setKey(event.target.value)
    }

    const clickButton = async (event) => {
        const getXML = xml
        const uri = `/api/${xml ? "xml" : "json"}/firebase/getValue?key=${key}`
        const newResult = await fetch(`${uri}`).then(data => {
            console.log(data)
            if(getXML){
                const mValue = data.text()
                console.log(mValue)
                return mValue
            } else {
                const mValue = data.json()
                console.log(mValue)
                return mValue
            }
        })
        setResult(getXML ? newResult : JSON.stringify(newResult, undefined, 2))
        console.log(newResult)
    }

    const changeXML = (event) => {
        setXml(event.target.checked)
        console.log(event.target.checked)
    }

    return(
        <div>
            <h1>Cliente Recive</h1>
            <input onChange={changeListenKey} type="text" name="listenKey" id="listenKey"/>
            <button onClick={clickButton}>Escutar</button>
            <h4>Key digitada: {key}</h4>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <input onChange={changeXML} 
                    type="checkbox"
                    name="checkBoxXML"
                    id="checkBoxXML"
                    style={{
                        cursor: 'pointer'
                    }}
                />
                <label
                    style={{
                        cursor: 'pointer'
                    }}
                    for="checkBoxXML"
                >resposta em XML (Se desmarcado retorna em JSON)</label>
            </div>
            <h2>Resultado:</h2>
            <pre>{result}</pre>
        </div>
    )
}

export default ClienteRevice;