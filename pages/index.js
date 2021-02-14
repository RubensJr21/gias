import Link from 'next/link';

function Home(){
    return (<div>
        <h1>Bem vindo à página page ;)</h1>
        <Link>
            <a href="/sobre">Acessar página Sobre</a>
        </Link>
    </div>)
}

export default Home;