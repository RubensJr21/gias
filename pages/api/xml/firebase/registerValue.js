import {firebase, db} from '../firebase'

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
    const key = request.query.key;
    const value = request.query.value;
    if(key != "" || value != ""){
        console.log({
            key,
            value
        })
        const r = await registerValueForKey(key, value)
        response.send((new xml2js.Builder()).buildObject({
            responseApi: {
                key,
                success: r.success,
                from: "api/xml/firebase/registerValue"
            }
        }))
    } else {
        response.send((new xml2js.Builder()).buildObject({
            responseApi: {
                key,
                error: "missing parameters",
                success: false,
                from: "api/xml/firebase/registerValue"
            }
        }))
    }
}

export default Main;