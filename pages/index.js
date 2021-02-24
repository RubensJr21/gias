import Link from 'next/link';

function Home(){
    return (<div>
        <h1 style={{
            textAlign: 'center'
        }}>Bem vindo à página Home ;)</h1>
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <Link href="/firebase">
                <a>Acessar página Firebase</a>
            </Link>
            <Link href="/sobre">
                <a>Acessar página Sobre</a>
            </Link>
        </div>
    </div>)
}

export default Home;