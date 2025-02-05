let inputBusca = document.querySelector('.input-busca') as HTMLInputElement;
let botaoBusca = document.querySelector('.botao-busca') as HTMLButtonElement;
let aviso = document.querySelector('.aviso') as HTMLElement;
let titulo = document.querySelector('.titulo-dados') as HTMLElement;
let dadosTemp = document.querySelector('.dados-temp') as HTMLElement;
let dadosVento = document.querySelector('.dados-vento') as HTMLElement;
let imagemTempo = document.querySelector('.imagem-temp') as HTMLImageElement;
let limparInput = document.querySelector('.limpar-input') as HTMLElement;
let ventoPonto = document.querySelector('.vento-ponteiro') as HTMLElement;
let containerDados = document.querySelector('.container-dados') as HTMLElement;

let key: string = '38ee6a8038a86747a2b1e4dd382feb91';



interface DescricaoDados {

    name: string,
    temp: number,
    pais: string,
    clima: {
        descricao: string,
        icone: string
    }
    vento: {
        velocidade: string,
        graus: string
    }


}

setInterval(()=>{

    if(inputBusca.value !== ''){
        limparInput.style.position = 'relative';
        limparInput.style.color = '#000';

        if(limparInput !== null){

            limparInput.addEventListener('click',()=>{

                inputBusca.value = '';

                if(containerDados !== null){
                    containerDados.classList.add('d-none');
                }

                if(aviso !== null){
                    aviso.classList.add('d-none');
                }

            })

        }

    }else{
        limparInput.style.position = 'none';
        limparInput.style.color = 'transparent'
    }

},10)

botaoBusca.addEventListener('click', buscarDados);

async function buscarDados() {

    if(inputBusca.value !== ''){

        msg('Carregando...')

        let pesquisa: string = inputBusca.value;
        let url: string = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(pesquisa.trim())}&appid=${key}&units=metric&lang=pt_br`

        let req = await fetch(url);
        let json = await req.json();

        if(json.cod === 200){
    
            aviso.classList.add('d-none');
            
            let dados: DescricaoDados = {
                name: json.name,
                temp: json.main.temp,
                pais: json.sys.country,
                clima: {
                    descricao: json.weather[0].description,
                    icone: json.weather[0].icon
                },
                vento: {
                    velocidade: json.wind.speed,
                    graus: json.wind.deg
                }
            }

            mostrarDados(dados);

        }else{
            msg('Não encontramos essa localização')
        }

    }else{
        msg('Digite uma localização');
    }
    
}

function msg(msg: string): void{

    aviso.innerHTML = msg;
    aviso.classList.remove('d-none');

}

async function mostrarDados(dados: DescricaoDados) {

    console.log(dados);

    titulo.innerHTML = `${dados.name}, ${dados.pais}`;
    dadosTemp.innerHTML = `${dados.temp.toString()} <sup>ºC</sup>`;
    dadosVento.innerHTML = `${dados.vento.velocidade} <span>km/h</span>`;
    imagemTempo.setAttribute('src',`http://openweathermap.org/img/wn/${dados.clima.icone}@2x.png`);
    ventoPonto.style.transform = `rotate(${dados.vento.graus}deg)`;

    containerDados.classList.remove('d-none');

}