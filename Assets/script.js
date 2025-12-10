document.querySelector('.buscador').addEventListener('submit', async (event) => {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        LimparInfo();
        mostraraviso('Carregando...');
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b78a6c81fc67bb4274c4e06111df3dd2&units=metric&lang=pt_br`;
        let resultado = await fetch(url);
        let json = await resultado.json();

        if (json.cod === 200) {

            mostrarInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                wind: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            LimparInfo();
            mostraraviso('Não encontramos essa localização.');
        }
    } else {
        LimparInfo();
    }
});


function mostrarInfo(json) {
    mostraraviso('');

   

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempinfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoinfo').innerHTML = `${json.wind} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform =
        `rotate(${json.windAngle-90}deg)`;
         document.querySelector('.resultado').style.display = 'block';
}

function LimparInfo() {
    mostraraviso('');
    document.querySelector('.resultado').style.display = 'none';
}

function mostraraviso(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

