import {db} from '../firebase'

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
    if(request.query.key != "" || request.query.value != ""){
        console.log({
            key,
            value
        })
        const r = await registerValueForKey(key, value)
        response.send({
            key,
            success: r.success
        })
    } else {
        response.send({
            key,
            error: "missing parameters",
            success: false
        })
    }
}

export default Main;