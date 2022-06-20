$(document).ready(function () {


  let VExisteContato = setInterval(function() {
    if ($("div[data-testid='cell-frame-container']").length != 0) {
      clearInterval(VExisteContato);
      let VAContato = [];

      const VOrdenado = [];
      const VOrdena = Math.ceil($("div[data-testid='cell-frame-container']").length / 11) * 11;
      for (let Vi = 0; Vi < VOrdena; Vi += 11) {
        for (let Vj = Vi + 11; Vj > Vi; Vj--) {
          VOrdenado.push(Vj);
        }
      }

      console.log("VOrdenado", VOrdenado);

      for (let Vi = 0; Vi < $("div[data-testid='cell-frame-container']").length; Vi++) {
        const VEl = $("div[data-testid='cell-frame-container']")[Vi];
        $(VEl).attr("id", VOrdenado[Vi]);

        let VContato = {
          id: Vi,
          nome: $(VEl).find("span[dir='auto']").html(),
          foto: $(VEl).find("img").attr("src"),
          ultimaMensagem: $(VEl).find("._1qB8f .ggj6brxn").html(),
          alerta: $(VEl).find("._1i_wG[aria-colindex='1'] span.l7jjieqr ").html() != undefined ? $(VEl).find("._1i_wG[aria-colindex='1'] span.l7jjieqr ").html() : "0",
        };
        VAContato.push(VContato);

        console.log("Elemento", VEl);
      }

      // Esconde a visão do whatsapp
      $("#app").css("display", "none");

      $("body").attr("class", "");
      $("body").prepend("<div id='CRM'></div>");

      $("#CRM").load(chrome.runtime.getURL("index.html"), function() {

        for (let Vi = 0; Vi < VAContato.length; Vi++) {
          const VEl = VAContato[Vi];
          $("#d-inbox .d-contatos").append("<div id='" + VEl.id +"' class='card d-contato mb-1'>" +
            "<div class='card-body p-1'>" +
            "<div class='d-titulo'>" +
            "<img src='" + (VEl.foto != undefined ? VEl.foto : chrome.runtime.getURL("images/user.png")) + "' alt='" + VEl.nome + "'>" +
            "<p>" + VEl.nome + "</p>" +
            "<button id='b-configuracao' type='button' class='btn btn-link'>" +
            "<i class='fa-solid fa-ellipsis'></i>" +
            "</button>" +
            "</div>" +
            "<div class='d-conteudo'>" +
            "<div>" +
            "<p id='p-ultima' class='p-ultima'>" + VEl.ultimaMensagem + "</p>" +
            "<p id='p-tempo' class='p-tempo'>Há 1 dias</p>" +
            "</div>" +
            "<div>" +
            (VEl.alerta != "0" ? "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display: block;'><i class='fa-solid fa-bell'></i></button>" : "") +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>");
        }

        // Função para exibir opção de criar nova lista
        $(".d-adicionar #b-adicionar").on("click", function(){
          $(".d-adicionar #b-adicionar").addClass("d-none");
          $("#d-salvar").removeClass("d-none");
        });

        let VContLista = 0;
        $("#b-salvar").on("click", function(){
          console.log("VContLista", VContLista);
          $(".d-cards").append("<div id='d-" + VContLista + "' class='card lista'>"+
          "<div class='card-body p-1'>" +
          "<div class='card-titulo mb-1'>" +
          "<div>" +
          "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display:none;'>" +
          "<i class='fa-solid fa-bell'></i> <span></span>" +
          "</button>" +
          "</div>" +
          "<h6 class='card-title text-center mb-0'>" + $("#i-salvar").val() + "</h6>" +
          "<button id='b-configuracao-" + VContLista + "' type='button' class='btn btn-link b-configuracao' data-bs-toggle='dropdown' aria-expanded='false'>" +
          "<ul class='dropdown-menu' aria-labelledby='b-configuracao-" + VContLista + "'>" +
          "<li><a id='a-esconder' onclick='esconder(event)' class='dropdown-item'><i class='fas fa-eye-slash'></i> Esconder todos</a></li>" +
          "<li><a id='a-mostrar' onclick='mostrar(event)' class='dropdown-item' style='display: none;'><i class='fas fa-eye'></i> Mostrar todos</a></li>" +
          "<li><a id='a-marcar' onclick='marcar(event)' class='dropdown-item'><i class='fas fa-bell-slash'></i> Marcar todos como lido</a></li>" +
          "</ul>" +
          "<i class='fa-solid fa-ellipsis'></i>" +
          "</button>" +
          "</div>" +
          "<div class='d-contatos'>" +
          "</div>" +
          "</div>" +
          "</div>");
          VContLista++;
        });
      }); /** */
    }
  }, 100);
});


  /*
  //

  let VDivs;
  /*while ($("div[data-testid='cell-frame-container']").length == 0) {
    VDivs = $("div[data-testid='cell-frame-container']");
    console.log("VDivs", VDivs);
  }/** */
/*
  const elm = await waitForElm("div[data-testid='cell-frame-container']");

  $("#app").on("load", "div", function(e){
    console.log("e", e);

  });
/** */

  
/*

  

 


    // Função para criar nova lista
    /*
    VBSalvar.onclick = (event) => {
      let VISalvar = document.querySelector("#i-salvar"); // Botão salvar

      if (VISalvar != "")
      {
        let VCard = document.createElement("div");
        VCard.setAttribute("id", "d-" + VCont);
        VCard.setAttribute("class", "card lista");
        VCard.setAttribute("ondrop", "largarContato(event)");
        VCard.setAttribute("ondragover", "permitirMovimento(event)");

        VCard.innerHTML = ;
        VALista.appendChild(VCard);
        window.scrollTo(VALista.offsetWidth * 2, 0);

        VAdicionar.style.display = "inline-block";
        VDSalvar.style.display = "none";

        VISalvar.value = "";
        VCont++;
      }
    };/** */


 // });







/*
let VBody = document.querySelector("body"); // Campo pesquisar do navbar
VBody.setAttribute("class", "");

// Visão so Whatsapp CRM
let VCRMView = document.createElement("div");
VCRMView.setAttribute("id", "CrmView");

// Visão do Whatsapp
let WhatsAppView = document.querySelector("#app");
WhatsAppView.style.display = "none";

VBody.appendChild(VCRMView);










let VHtml = chrome.runtime.getURL("index.html");

fetch(VHtml)
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    VCRMView.innerHTML = body;

    // Elementos da página
    let VNavPesquisar = document.querySelector(".navbar #i-pesquisar"); // Campo pesquisar do navbar
    let VNavFiltrar = document.querySelector(".navbar #i-filtrar"); // Campo filtrar do navbar
    let VNavAlerta = document.querySelector(".navbar #b-alerta"); // Botão alerta do navbar
    let VNavRelogio = document.querySelector(".navbar #b-relogio"); // Botão relógio do navbar
    let VNavChat = document.querySelector(".navbar #b-chat"); // Botão chat do navbar
    let VNavOpcoes = document.querySelector(".navbar #b-opcoes"); // Botão opções do navbar

    let VALista = document.querySelector(".d-cards"); // Container com cards

    let VAdicionar = document.querySelector(".d-adicionar #b-adicionar");
    let VDSalvar = document.querySelector("#d-salvar"); // DIV salvar
    let VBSalvar = document.querySelector("#b-salvar"); // Botão salvar

    

    // Função para criar nova lista
    let VCont = 0;
    VBSalvar.onclick = (event) => {
      let VISalvar = document.querySelector("#i-salvar"); // Botão salvar

      if (VISalvar != "")
      {
        let VCard = document.createElement("div");
        VCard.setAttribute("id", "d-" + VCont);
        VCard.setAttribute("class", "card lista");
        VCard.setAttribute("ondrop", "largarContato(event)");
        VCard.setAttribute("ondragover", "permitirMovimento(event)");

        VCard.innerHTML = "<div class='card-body p-1'>" +
          "<div class='card-titulo mb-1'>" +
          "<div>" +
          "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display:none;'>" +
          "<i class='fa-solid fa-bell'></i> <span></span>" +
          "</button>" +
          "</div>" +
          "<h6 class='card-title text-center mb-0'>" + VISalvar.value + "</h6>" +
          "<button id='b-configuracao-" + VCont + "' type='button' class='btn btn-link b-configuracao' data-bs-toggle='dropdown' aria-expanded='false'>" +
          "<ul class='dropdown-menu' aria-labelledby='b-configuracao-" + VCont + "'>" +
          "<li><a id='a-esconder' onclick='esconder(event)' class='dropdown-item'><i class='fas fa-eye-slash'></i> Esconder todos</a></li>" +
          "<li><a id='a-mostrar' onclick='mostrar(event)' class='dropdown-item' style='display: none;'><i class='fas fa-eye'></i> Mostrar todos</a></li>" +
          "<li><a id='a-marcar' onclick='marcar(event)' class='dropdown-item'><i class='fas fa-bell-slash'></i> Marcar todos como lido</a></li>" +
          "</ul>" +
          "<i class='fa-solid fa-ellipsis'></i>" +
          "</button>" +
          "</div>" +
          "<div class='d-contatos'>" +
          "</div>" +
          "</div>";
        VALista.appendChild(VCard);
        window.scrollTo(VALista.offsetWidth * 2, 0);

        VAdicionar.style.display = "inline-block";
        VDSalvar.style.display = "none";

        VISalvar.value = "";
        VCont++;
      }
    };

    // Função para o scroll funcionar na Horizontal
    document.addEventListener('wheel', function (event) {
      window.scrollTo(window.scrollX + event.deltaY * 2, 0);
    }, false);
  });



// Função para pegar o contato
function pegarContato(event) {
  console.log("event", event);
  event.dataTransfer.setData("contato", event.target.id);
  VLista = getParent(event.target, ".lista");
  event.dataTransfer.setData("id", VLista.getAttribute("id"));
}

// Função para largar o contato
function largarContato(event) {
  console.log("event", event);
  event.preventDefault();
  const VCard = document.getElementById(event.dataTransfer.getData("contato"));
  let VContainer = null;
  let VCardSuperior = null;
  let VCardInferior = null;
  let VListaSuperior = null;
  let VListaInferior = null;
  for (let Vi = 0; Vi < event.path.length - 2; Vi++) {
    const VEl = event.path[Vi];
    if (getParent(VEl, ".d-titulo") != false)
      VCardSuperior = getParent(VEl, ".d-titulo");

    if (getParent(VEl, ".d-conteudo") != false)
      VCardInferior = getParent(VEl, ".d-conteudo");

    if (getParent(VEl, ".d-contatos") != false)
      VListaInferior = getParent(VEl, ".d-contatos");
    else if (getParent(VEl, ".card-titulo") != false)
      VListaSuperior = getParent(VEl, ".card-titulo").nextSibling;
  }
  if (VCardSuperior != null) {
    VContainer = VCardSuperior.parentNode.parentNode.parentNode;
    VCardSuperior = VCardSuperior.parentNode.parentNode;
    VContainer.insertBefore(VCard, VCardSuperior);
  } else if (VCardInferior != null) {
    VContainer = VCardInferior.parentNode.parentNode.parentNode;
    VCardInferior = VCardInferior.parentNode.parentNode;
    VContainer.insertBefore(VCard, VCardInferior.nextSibling);
  } else if (VListaInferior != null) {
    VListaInferior.appendChild(VCard);
    VContainer = VListaInferior;
  } else {
    VListaSuperior.prepend(VCard);
    VContainer = VListaSuperior;
  }

  // Lista anterior
  let VLista = document.getElementById(event.dataTransfer.getData("id"));
  let VAAlerta = VLista.querySelectorAll("#b-alerta");
  let VCont = 0;
  for (let Vi = 1; Vi < VAAlerta.length; Vi++) {
    const VAlerta = VAAlerta[Vi];
    if (VAlerta.style.display == "block")
      VCont++;
  }
  if (VCont == 0)
    VLista.querySelector("#b-alerta").style.display = "none";
  else
    VLista.querySelector("#b-alerta").style.display = "block";

  if (VLista.querySelector("#b-alerta span") != null)
    VLista.querySelector("#b-alerta span").innerHTML = VCont;

  VAContato = VLista.querySelectorAll('.d-contato');
  if (VAContato.length == 0) {
    VLista.querySelector("#a-esconder").style.display = "block";
    VLista.querySelector("#a-mostrar").style.display = "none";
  }
  // Lista atual
  VLista = getParent(VContainer, ".lista");
  VAAlerta = VLista.querySelectorAll("#b-alerta");
  VCont = 0;
  for (let Vi = 1; Vi < VAAlerta.length; Vi++) {
    const VAlerta = VAAlerta[Vi];

    console.log("VAlerta.style.display ", VAlerta.style.display );
    if (VAlerta.style.display == "block")
      VCont++;
  }

  if (VCont == 0)
    VLista.querySelector("#b-alerta").style.display = "none";
  else
    VLista.querySelector("#b-alerta").style.display = "block";

  if (VLista.querySelector("#b-alerta span") != null)
    VLista.querySelector("#b-alerta span").innerHTML = VCont;

}

// Função para esconder contatos
function esconder(event) {
  console.log("event", event);
  const VLista = getParent(event.target, ".lista"); // Pego a lista do botão
  const VAContato = VLista.querySelectorAll('.d-contato'); // Verifico se existe contato
  if (VAContato.length > 0) { 
    VLista.querySelector("#a-esconder").style.display = "none"; // Escondo o botão Esconder
    VLista.querySelector("#a-mostrar").style.display = "block"; // Mostro o botão Mostrar
    for (let Vi = 0; Vi < VAContato.length; Vi++) { // Escondo todos os contatos
      let VContato = VAContato[Vi];
      VContato.style.display = "none";
    }
  }
}

// Função para mostrar contatos
function mostrar(event) {
  console.log("event", event);
  const VLista = getParent(event.target, ".lista"); // Pego a lista do botão
  VLista.querySelector("#a-esconder").style.display = "block"; // Escondo o botão Esconder
  VLista.querySelector("#a-mostrar").style.display = "none"; // Mostro o botão Mostrar
  const VAContato = VLista.querySelectorAll('.d-contato'); // Escondo todos os contatos
  for (let Vi = 0; Vi < VAContato.length; Vi++) {
    let VContato = VAContato[Vi];
    VContato.style.display = "block";
  }
}

// Função para marcar como lido
function marcar(event) {
  console.log("event", event);
  const VLista = getParent(event.target, ".lista");
  VLista.querySelector("#b-alerta span").innerHTML = "0";
  VAAlerta = VLista.querySelectorAll("#b-alerta");
  for (let Vi = 0; Vi < VAAlerta.length; Vi++) {
    const VAlerta = VAAlerta[Vi];
    VAlerta.style.display = "none";
  }
}

// Função para pegar parent
function getParent(element, selector) {
  console.log("element", element);
  console.log("selector", selector);
  if (!element) { return element; }
  element.matches(selector) || (element = (element.nodeName.toLowerCase() === 'html' ? false : getParent(element.parentNode, selector)));
  return element;
}

// Função para pegar todos os parentes
function getParents(el) {
  console.log("el", el);
  var parents = [];
  var p = el.parentNode;
  while (p != null) {
    var o = p;
    parents.push(o);
    p = o.parentNode;
  }
  return parents;
}/** */

