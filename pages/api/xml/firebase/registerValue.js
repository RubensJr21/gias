import {db} from '../firebase' // db permace no escopo global, todos tem acesso
import xml2js from 'xml2js'

async function registerValueForKey(key, value){
    let updates = {};
    updates["/qrcodes/" + key] = value;

    const success = await db.ref().update(updates)
                        .then(() => true)
                        .catch(() => false)
    return success ? {success} : {
        type_error: "error on insert value",
        success
    };
}

async function Main(request, response){

    if(Object.keys(request.query).length > 0){
        const key = request.query.key;
        const value = request.query.value;
        if(["", undefined].includes(key)){
            response.send((new xml2js.Builder()).buildObject({
                responseApi: {
                    key,
                    error: `parameter key is: ${key == "" ? "empty" : undefined}.`,
                    success: false,
                    from: "api/xml/firebase/registerValue"
                }
            }))
            return;
        }
        if(["", undefined].includes(value)){
            response.send((new xml2js.Builder()).buildObject({
                responseApi: {
                    key: key,
                    error: `parameter value is: ${value == "" ? "empty" : undefined}.`,
                    success: false,
                    from: "api/xml/firebase/registerValue"
                }
            }))
            return;
        }
        console.log({
            key,
            value
        })
        const r = await registerValueForKey(key, value)
        if (r.success){
            response.send((new xml2js.Builder()).buildObject({
                responseApi: {
                    key,
                    success: r.success,
                    from: "api/xml/firebase/registerValue"
                }
            }))
        }else{
            response.send((new xml2js.Builder()).buildObject({
                responseApi: {
                    key,
                    error: "the key isn't valid",
                    success: r.success,
                    from: "api/xml/firebase/registerValue"
                }
            }))
        }
    } else {
        response.send((new xml2js.Builder()).buildObject({
            responseApi: {
                error: "missing parameters",
                success: false,
                from: "api/xml/firebase/registerValue"
            }
        }))
    }
}

export default Main;