import {db} from '../firebase'

async function Main(request, response){
    const key = db.ref().push().key;
    response.send({
        key,
        success: true
    })
}

export default Main;