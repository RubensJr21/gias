import firebase from 'firebase/app';
import 'firebase/database';
import xml2js, { Builder } from 'xml2js'

async function registerValueForKey(key, value, db){
    if (key == "") return {
        sucess: false,
        type_error: "key is invalid"
    };
    if (value == "") return {
        sucess: false,
        type_error: "value is invalid"
    };

    let updates = {};
    updates["/qrcodes/" + key] = value;

    const success = await db.ref().update(updates)
                        .then(() => true)
                        .catch(() => false)
    return {
        success,
        type_error: "error on insert value"
    };
}

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
    if (firebase.apps.length == 0){
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_CONFIG_API_KEY,
            authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_CONFIG_DATA_BASE_URL,
            projectId: process.env.FIREBASE_CONFIG_PROJECTID,
            storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
            messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
            appId: process.env.FIREBASE_CONFIG_APPID
        };
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    const key = db.ref().push().key

    if(Object.keys(request.query).length == 0){
        response.send({
            key,
            mode: "request not used query",
            success: false
        })
    } else if(request.query.f == "getNewKey"){
        response.send({
            key,
            success: true
        })
    } else if(request.query.f == "getValueOfKey"){
        if(request.query.pf != ""){
            const value = await getValueKey(request.query.pf, db)
            const result = {
                key: request.query.pf,
                value,
                success: true
            }
            removeKey(db, request.query.pf)
            if(request.query.of == "xml"){
                response.send((new xml2js.Builder()).buildObject({responseGetValueOfKey: result}))
            }else{
                response.send(result)
            }
        } else {
            response.send({
                key: request.query.pf,
                error: "invalid paramter",
                success: false
            })
        }
    } else if(request.query.f == "registerValueForKey"){
        if(request.query.pf != ""){
            const parameters = request.query.pf.split(",");
            const newKey = parameters[0];
            const value = parameters[1];
            console.log({
                newKey,
                value
            })
            registerValueForKey(newKey, value, db)
            response.send({
                key: newKey,
                success: true
            })
        } else {
            response.send({
                key: newKey,
                error: "invalid paramter",
                success: false
            })
        }
    } else {
        response.send({
            error: "unknown query parameter",
            success: false
        })
    }
}

export default Main;