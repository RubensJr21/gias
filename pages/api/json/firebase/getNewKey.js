import {db} from '../firebase' // db permace no escopo global do arquivo, todas as funções tem acesso tem acesso

async function Main(request, response){
    const key = db.ref().push().key;
    response.send({
        key,
        success: true,
        from: "api/json/firebase/getNewKey"
    })
}

export default Main;