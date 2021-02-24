import xml2js from 'xml2js'
import {firebase, db} from '../firebase'

async function getValueKey(key, db){
    var result = ""
    await db.ref(`/qrcodes`).on('value', (snapshot) => {
        var data = snapshot.val();
        // console.log(`> getValueKey => data[key] = ${data[key]}`)
        result = data[key];
    });
    return result;
}

async function removeKey(db, key){
    await db.ref("/qrcodes/" + key).remove()
}

async function Main(request, response){
    if(request.query.key != ""){
         const value = await getValueKey(request.query.key, db)
         const result = {
             responseApi: {
                key: request.query.key,
                value,
                success: true,
                from: "api/xml/firebase/getValue"
             }
         }
        removeKey(db, request.query.key)
        response.send(result)
     } else {
        response.send((new xml2js.Builder()).buildObject({
            responseApi: {
            key: request.query.key,
            error: "missing parameters",
            success: false,
            from: "api/xml/firebase/getValue"
            }
        }))
     }
 }

export default Main;