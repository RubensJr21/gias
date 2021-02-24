import {db} from '../firebase' // db permace no escopo global, todos tem acesso
import xml2js from 'xml2js'

async function getValueKey(key){
    var result = ""
    await db.ref(`/qrcodes`).on('value', (snapshot) => {
        var data = snapshot.val();
        // console.log(`> getValueKey => data[key] = ${data[key]}`)
        result = data[key];
    });
    return result;
}

async function removeKey(key){
    await db.ref("/qrcodes/" + key).remove()
}

async function Main(request, response){
    const key = request.query.key;
    if(!["", undefined].includes(key)){
        const value = await getValueKey(key)
        if(value == undefined){
            response.send((new xml2js.Builder()).buildObject({
                responseApi: {
                    key,
                    erro: "key isn't valid",
                    success: false,
                    from: "api/xml/firebase/getValue"
                }
            }));
            return;
        }
        const result = {
            responseApi: {
                key,
                value,
                success: true,
                from: "api/xml/firebase/getValue"
            }
        }
        removeKey(key)
        response.send((new xml2js.Builder()).buildObject(result))
    }else {
        response.send((new xml2js.Builder()).buildObject({
            responseApi: {
                key,
                error: "missing parameters",
                success: false,
                from: "api/xml/firebase/getValue"
            }
        }))
     }
 }

export default Main;