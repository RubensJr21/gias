import Link from 'next/link';

function Home(){
    return (<div>
        <h1>Escolha como vai usar:</h1>
        <Link href="/firebase/client-send">
            <a>Acessar página Client Send</a>
        </Link>
        <Link href="/firebase/client-recive">
            <a style={{marginLeft: "9px"}}>Acessar página Client Recive</a>
        </Link>
    </div>)
}

export default Home;