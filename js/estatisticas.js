var casosDiariosConfirmados = [];
var datasCatalogadas = [];
var casosNovosConfirmados = [];

const apiEstatisticasDiariasUrl = {
    "crossDomain": true,
    "url": "https://brasil.io/covid19/historical/daily/?state=PE",
    "method": "GET",
    "headers": {
        "Authorization": "Token 522c78b98965745e4319d9b52206772c93e09aac"
    }
};

$.getJSON(apiEstatisticasDiariasUrl, function (data) {
    var getData = JSON.parse(JSON.stringify(data));
    datasCatalogadas = getData["from_states"]["date"];

    casosDiariosConfirmados = getData["from_states"]["confirmed"];
    casosNovosConfirmados = getData["from_states"]["new_confirmed"];

    mortesDiariosConfirmados = getData["from_states"]["deaths"];
    mortesNovosConfirmados = getData["from_states"]["new_deaths"];

    // TODO O PERÍODO [CASOS]
    var ctx = document.getElementById('casos-diarios').getContext('2d');
    var casosDiariosConfirmadosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasCatalogadas,
            datasets: [{
                label: 'Número de casos',
                data: casosDiariosConfirmados,
                borderWidth: 1,
                backgroundColor: '#00c8bc'
            }]
        }
    });

    // ÚLTIMOS 7 DIAS [CASOS]
    var ctx = document.getElementById('casos-ultimos-7-dias').getContext('2d');
    var casosDiariosConfirmadosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasCatalogadas.slice(datasCatalogadas.length - 7),
            datasets: [{
                label: 'Número de casos',
                data: casosNovosConfirmados.slice(casosNovosConfirmados.length - 7),
                borderWidth: 1,
                backgroundColor: '#00c8bc'
            }]
        }
    });

    // TODO O PERÍODO [MORTES]
    var ctx = document.getElementById('mortes-diarios').getContext('2d');
    var casosDiariosConfirmadosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasCatalogadas,
            datasets: [{
                label: 'Número de mortes',
                data: mortesDiariosConfirmados,
                borderWidth: 1,
                backgroundColor: '#e30000'
            }]
        }
    });

    // ÚLTIMOS 7 DIAS [MORTES]
    var ctx = document.getElementById('mortes-ultimos-7-dias').getContext('2d');
    var casosDiariosConfirmadosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datasCatalogadas.slice(datasCatalogadas.length - 7),
            datasets: [{
                label: 'Número de mortes',
                data: mortesNovosConfirmados.slice(mortesNovosConfirmados.length - 7),
                borderWidth: 1,
                backgroundColor: '#e30000'
            }]
        }
    });
});

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pagina = urlParams.get('pagina');
    if (pagina == "casos") {
        $(".p-casos").fadeIn();
    } else if (pagina == "mortes") {
        $(".p-mortes").fadeIn();
    } else if (pagina == "recuperados") {
        $(".p-recuperados").fadeIn();
    }
});