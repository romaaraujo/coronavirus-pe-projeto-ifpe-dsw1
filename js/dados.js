var cidades = [];
var nomeDasCidades = [];
var confirmadosPorCidade = [];
var mortesPorCidade = [];

const apiUrl = {
    "crossDomain": true,
    "url": "https://api.brasil.io/v1/dataset/covid19/caso/data/?format=json&is_last=True&state=PE",
    "method": "GET",
    "headers": {
        "Authorization": "Token 522c78b98965745e4319d9b52206772c93e09aac"
    }
};

$.getJSON(apiUrl, function (data) {
    cidades = JSON.parse(JSON.stringify(data));
    var formatarNumero = new Intl.NumberFormat()
    $(".title.casos").html(formatarNumero.format(cidades["results"][0]["confirmed"]) + " CASOS CONFIRMADOS").slideDown();
    $(".title.mortes").html(formatarNumero.format(cidades["results"][0]["deaths"]) + " MORTES CONFIRMADAS").slideDown();
    for (let index = 1; index < cidades["results"].length; index++) {
        nomeDasCidades.push(cidades["results"][index]["city"]);
        confirmadosPorCidade.push(cidades["results"][index]["confirmed"]);
        mortesPorCidade.push(cidades["results"][index]["deaths"]);
    }

    if (window.location.pathname == '/') {
        $(document).ready(function () {
    
            var ctx = document.getElementById('cidades-inicio-casos').getContext('2d');
            var casosCidadesEstatisticasInicio = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nomeDasCidades,
                    datasets: [{
                        label: 'Número de casos',
                        data: confirmadosPorCidade,
                        borderWidth: 1,
                        backgroundColor: '#00c8bc'
                    }]
                }
            });
            var ctx = document.getElementById('cidades-inicio-mortes').getContext('2d');
            var mortesCidadesEstatisticasInicio = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nomeDasCidades,
                    datasets: [{
                        label: 'Número de mortes',
                        data: mortesPorCidade,
                        borderWidth: 1,
                        backgroundColor: '#e30000'
                    }]
                }
            });
        });
    }
});

const newsApi = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-news-search1.p.rapidapi.com/news/search?q=covid%20pernambuco&freshness=Day&originalImg=true&textFormat=Raw&safeSearch=Off",
	"method": "GET",
	"headers": {
	
		"x-bingapis-sdk": "true",
		"x-rapidapi-key": "17c5c92150msh723bc8219779281p10b87ejsn80d580fa4dda",
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
	}
};

$.ajax(newsApi).done(function (response) {
    response.value.forEach(element => {
        $(".news>.scrolling-wrapper").append("<a href='" + element.url + "' target='_BLANK'><div class='card' title='" + element.name + "' style='background: "+ (typeof element.image != "undefined" ? "url("+element.image.contentUrl+") center" : "#0000001b)") +"; background-size: contain;'><p class='card-text'>" + element.name + "</p> </div></a>");
    });
    $(".news").slideDown();
});