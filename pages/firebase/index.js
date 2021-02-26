import Link from 'next/link';

function Firebase_Home(){
    return (<div>
        <h1 style={{
            textAlign: 'center'
        }}>Escolha como vai usar:</h1>
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <Link href="/firebase/client/send">
                <a>Acessar página Client Send</a>
            </Link>
            <Link href="/firebase/client/recive">
                <a style={{marginLeft: "9px"}}>Acessar página Client Recive</a>
            </Link>
        </div>
    </div>)
}

export default Firebase_Home;