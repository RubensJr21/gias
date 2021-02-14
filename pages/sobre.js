import Link from 'next/link';

function Sobre(){
    return (<div>
        <h1>Bem vindo à página Sobre ;)</h1>
        <Link>
            <a href="/">Acessar página Home</a>
        </Link>
    </div>)
}

export default Sobre;