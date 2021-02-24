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
            key: request.query.key,
            value,
            success: true
        }
        removeKey(db, request.query.key)
        response.send(result)
    } else {
        response.send({
            key: request.query.key,
            error: "invalid paramter",
            success: false
        })
    }
}

export default Main;