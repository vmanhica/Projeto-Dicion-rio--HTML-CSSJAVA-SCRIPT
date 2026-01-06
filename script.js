const url = 'https://api.urbandictionary.com/v0/define?term='; // Urban Dictionary

const inputTxt = document.querySelector('#inputTxt');
const btnTxt = document.querySelector('#container_btn');
const resultado = document.querySelector('#container_result');

// Busca ao clicar no botão ou apertar Enter
btnTxt.addEventListener('click', buscarPalavra);
inputTxt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPalavra();
});

function buscarPalavra() {
    const palavra = inputTxt.value.trim();

    if (palavra === '') {
        resultado.innerHTML = '<p class="container_significado">Escreva alguma palavra no campo de busca</p>';
        return;
    }

    resultado.innerHTML = '<p class="container_significado">Carregando...</p>';

    fetch(`${url}${palavra}`)
        .then(res => {
            if (!res.ok) throw new Error('Palavra não encontrada');
            return res.json();
        })
        .then(data => {
            if (!data.list || data.list.length === 0) {
                resultado.innerHTML = '<p class="container_significado">Não foi possível encontrar esta palavra</p>';
                return;
            }

            let html = `<h3 id="container_palavra">${palavra}</h3>`;

            // Mostra até 3 definições
            data.list.slice(0,3).forEach((item, i) => {
                html += `<p class="container_significado"><span>${i+1}*</span> ${item.definition}</p>`;
                if(item.example) {
                    html += `<p class="container_significado"><em>Ex.: ${item.example}</em></p>`;
                }
            });

            resultado.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            resultado.innerHTML = '<p class="container_significado">Não foi possível encontrar esta palavra</p>';
        });
}
