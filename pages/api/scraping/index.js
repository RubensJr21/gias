import puppeteer from 'puppeteer'

async function Main(request, response){
    const link = request.query.link;
    if(['',undefined].includes(link)){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto()
    
        const pageContent = await page.evaluate(() => {
            return {
                valor: document.querySelector(".totalNumb.txtMax").innerHTML
            }
        })
        
        response.send(pageContent);
    }else{
        response.send({
            error: "link isn't valid"
        });
    }
}

export default Main;