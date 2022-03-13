var listaSeries = [
  "https://play-lh.googleusercontent.com/urFmNCsqsU93qEKDmhrs60zl2rDki-XzdQpms01-P64kMX3VkGO0c7Sf2ira2mzbgwmM=w400-h600-rw",
  "https://i.pinimg.com/originals/7a/1e/53/7a1e53b5b921aee206bb695f24174524.jpg",
  "https://movieposters2.com/images/1751507-b.jpg",
  "https://img.elo7.com.br/product/zoom/268E0A6/big-poster-o-hobbit-uma-jornada-inesperada-lo06-tam-90x60-cm-nerd.jpg",
  "https://br.web.img2.acsta.net/pictures/14/09/23/20/17/225218.jpg"];
var nomesSeries = [
 "Star Wars",
 "Star Trek",
"Stargate",
"O Hobbit",
"Jovens Bruxas"
];

var seriesadd = [];
for (var i = 0; i < listaSeries.length; i++) {
  var elementoListaSerie = document.getElementById("listaSerie");
  elementoListaSerie.innerHTML += `
      <div>
        <img onclick="rodarTrailer(${i})" src="${listaSeries[i]}"> 
        <p>${nomesSeries[i]}</p>
        <button class="btremove" onclick = "removerSeries(${i})">remover</button>
      </div> `;

  function removerSeries(i) {
    listaSeries.splice(i, 1);
    document.getElementById("listaSerie").innerHTML = "";

    for (var i = 0; i < listaSeries.length; i++) {
      var elementoListaSerie = document.getElementById("listaSerie");
      elementoListaSerie.innerHTML += `
      <div>
        <img onclick="rodarTrailer(${i})" src="${listaSeries[i]}">
        <p>${nomesSeries[i]}</p>
        <button  class="btremove" onclick = "removerSeries(${i}")>remover</button>
      </div> `;
    }
  }
}

// Obtem código da serie digitado pelo usuário e roda o trailer
function trailerUsuario() {
  var valorInputSerie = document.querySelector("#serie").value;
  var iframeTrailer = document.querySelector("#trailer");
  var codVideo = valorInputSerie.substring(32);

  var linkFilme = "https://www.youtube.com/embed/" + codVideo;

  var tagSerie =
    "<iframe id='frameTrailer' width='500' height='300' src='" +
    linkFilme +
    "' ></iframe>";
  iframeTrailer.innerHTML = tagSerie;

  document.querySelector("#serie").value = "";
}

// Obtem código do filme clicado e roda o trailer
function rodarMeuTrailer(numeroFilme) {
  var codVideo = filmesTrailer[numeroFilme];
  rodarTrailer(codVideo);
}

// Roda o trailer do link escolhido
function rodarTrailer(codVideo) {
  var linkSerie = links[codVideo];
  var iframeTrailer = document.querySelector("#trailer");
  var tagSerie =
    "<iframe id='frameTrailer' width='500' height='300' src='" +
    linkSerie +
    "' ></iframe>";

  iframeTrailer.innerHTML = tagSerie;
}

//inserir imagem atraves da escrita
function AdicionarSerie() {
  let campoNome = document.querySelector("#serie-imagem");
  const nome = campoNome.value;
  buscaIMDB(nome.replaceAll(" ", "_"));
  campoNome.value = "";
}

function tratamentoIMDB(jsonIMDB) {
  const urlImagem = jsonIMDB.d[0].i[0];
  const nomeObra = jsonIMDB.d[0].l;
  const idObra = jsonIMDB.d[0].id;
  const ano = jsonIMDB.d[0].y;

  if (urlImagem.endsWith(".jpg")) {
    seriesadd.push({
      nomeObra: nomeObra,
      urlImagemCapa: urlImagem,
      idObra: idObra,
      ano: ano
    });
    listarCapasNaTela(urlImagem, nomeObra, idObra, ano);
  } else {
    document.querySelector("#recado").innerText = "Nome da serie invalido";
    // alert("URL de imagem inválida");
  }
}

function listarCapasNaTela(urlImagemCapa, nomeObra, idObra, ano) {
  const listaCapas = document.querySelector("#listaCapas");
  listaCapas.innerHTML = "";
  for (var i = 0; i < seriesadd.length; i++) {
    const elementoCapa =
      '<div id="serie"><a target=_blank alt="' +
      seriesadd[i].nomeObra +
      '" href="' +
      seriesadd[i].urlImagemCapa +
      '"><img width="182" height="268" src="' +
      seriesadd[i].urlImagemCapa +
      '"></a><p><b><a target=_blank alt="' +
      seriesadd[i].nomeObra +
      '" href="https://www.imdb.com/title/' +
      seriesadd[i].idObra +
      '/">' +
      seriesadd[i].nomeObra +
      "</a></b></p><p>" +
      seriesadd[i].ano +
      "</p> <button  class = 'btremove' onclick = 'removerCapa(" +
      i +
      ")'>Remover</button> </div>";

    listaCapas.innerHTML = listaCapas.innerHTML + elementoCapa;
  }
}

function removerCapa(i) {
  // essa linha remove 0 item que esta no index i do array
  seriesadd.splice(i, 1);
  // essa linha lista denovo os itens na tela
  listarCapasNaTela();
}

function buscaIMDB(nome) {
  const comprimento = 6 + nome.length;

  $.getJSON(
    "https://api.allorigins.win/get?url=https%3A//sg.media-imdb.com/suggests/" +
      nome[0].toLowerCase() +
      "/" +
      nome +
      ".json&callback=?",
    function (data) {
      const retorno = data.contents.substr(
        comprimento,
        data.contents.length - comprimento - 1
      );
      tratamentoIMDB(JSON.parse(retorno));
    }
  );
}
