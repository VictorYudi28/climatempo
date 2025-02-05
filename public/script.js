"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let inputBusca = document.querySelector('.input-busca');
let botaoBusca = document.querySelector('.botao-busca');
let aviso = document.querySelector('.aviso');
let titulo = document.querySelector('.titulo-dados');
let dadosTemp = document.querySelector('.dados-temp');
let dadosVento = document.querySelector('.dados-vento');
let imagemTempo = document.querySelector('.imagem-temp');
let limparInput = document.querySelector('.limpar-input');
let ventoPonto = document.querySelector('.vento-ponteiro');
let containerDados = document.querySelector('.container-dados');
let key = '38ee6a8038a86747a2b1e4dd382feb91';
setInterval(() => {
    if (inputBusca.value !== '') {
        limparInput.style.position = 'relative';
        limparInput.style.color = '#000';
        if (limparInput !== null) {
            limparInput.addEventListener('click', () => {
                inputBusca.value = '';
                if (containerDados !== null) {
                    containerDados.classList.add('d-none');
                }
                if (aviso !== null) {
                    aviso.classList.add('d-none');
                }
            });
        }
    }
    else {
        limparInput.style.position = 'none';
        limparInput.style.color = 'transparent';
    }
}, 10);
botaoBusca.addEventListener('click', buscarDados);
function buscarDados() {
    return __awaiter(this, void 0, void 0, function* () {
        if (inputBusca.value !== '') {
            msg('Carregando...');
            let pesquisa = inputBusca.value;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(pesquisa.trim())}&appid=${key}&units=metric&lang=pt_br`;
            let req = yield fetch(url);
            let json = yield req.json();
            if (json.cod === 200) {
                aviso.classList.add('d-none');
                let dados = {
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
                };
                mostrarDados(dados);
            }
            else {
                msg('Não encontramos essa localização');
            }
        }
        else {
            msg('Digite uma localização');
        }
    });
}
function msg(msg) {
    aviso.innerHTML = msg;
    aviso.classList.remove('d-none');
}
function mostrarDados(dados) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dados);
        titulo.innerHTML = `${dados.name}, ${dados.pais}`;
        dadosTemp.innerHTML = `${dados.temp.toString()} <sup>ºC</sup>`;
        dadosVento.innerHTML = `${dados.vento.velocidade} <span>km/h</span>`;
        imagemTempo.setAttribute('src', `http://openweathermap.org/img/wn/${dados.clima.icone}@2x.png`);
        ventoPonto.style.transform = `rotate(${dados.vento.graus}deg)`;
        containerDados.classList.remove('d-none');
    });
}
