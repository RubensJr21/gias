async function tempo(request, response){
    const cep = request.query.cep || process.env.CEP;

    const dynamicDate = new Date();

    const endereco = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();

    delete endereco.ibge
    delete endereco.gia
    delete endereco.ddd
    delete endereco.siafi
    delete endereco.complemento

    /*endereco.json().then(data => {
        console.log(data)
    });*/
    console.log(request.query)
    response.json({
        date: dynamicDate.toGMTString(),
        cep_result: endereco
    })
}

export default tempo;