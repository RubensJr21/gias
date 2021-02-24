import xml2js from 'xml2js'
import {firebase, db} from '../firebase'

async function Main(request, response){
    const key = db.ref().push().key;
    response.send((new xml2js.Builder()).buildObject({
        responseApi: {
            key,
            success: true,
            from: "api/xml/firebase/getNewKey"
        }
    }))
}

export default Main;