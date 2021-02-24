import {db} from '../firebase' // db permace no escopo global, todos tem acesso

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
            response.send({
                key: key,
                error: `parameter key is: ${key == "" ? "empty" : undefined}.`,
                success: false,
                from: "api/json/firebase/registerValue"
            })
            return;
        }
        if(["", undefined].includes(value)){
            response.send({
                key: value,
                error: `parameter value is: ${value == "" ? "empty" : undefined}.`,
                success: false,
                from: "api/json/firebase/registerValue"
            })
            return;
        }
        console.log({
            key,
            value
        })
        const r = await registerValueForKey(key, value)
        if (r.success){
            response.send({
                key,
                success: r.success,
                from: "api/json/firebase/registerValue"
            })
        }else{
            response.send({
                key,
                error: "the key isn't valid",
                success: r.success,
                from: "api/json/firebase/registerValue"
            })
        }
    } else {
        response.send({
            error: "missing parameters",
            success: false,
            from: "api/json/firebase/registerValue"
        })
    }
}

export default Main;