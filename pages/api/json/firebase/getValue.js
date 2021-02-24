import {db} from '../firebase' // db permace no escopo global, todos tem acesso

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
            response.send({
                key,
                erro: "key isn't valid",
                success: false,
                from: "api/json/firebase/getValue"
            })
            return;
        }
        const result = {
            key,
            value,
            success: true,
            from: "api/json/firebase/getValue"
        }
        removeKey(key)
        response.send(result)
    } else {
        response.send({
            key,
            error: "invalid paramter",
            success: false,
            from: "api/json/firebase/getValue"
        })
    }
}

export default Main;