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

      for (let Vi = 0; Vi < $("div[data-testid='cell-frame-container']").length; Vi++) {
        const VEl = $("div[data-testid='cell-frame-container']")[Vi];
        $(VEl).attr("id", "c-" + VOrdenado[Vi]);

        let VContato = {
          id: "c-" + VOrdenado[Vi],
          nome: $($(VEl).find("span[dir='auto']")[0]).html(),
          foto: $(VEl).find("img").attr("src"),
          ultima: $(VEl).find("._1qB8f .ggj6brxn").html(),
          tempo: $($(VEl).find("span[dir='auto']")[0]).parent().siblings().html(),
          alerta: $(VEl).find("._1i_wG[aria-colindex='1'] span.l7jjieqr ").html() != undefined ? $(VEl).find("._1i_wG[aria-colindex='1'] span.l7jjieqr ").html() : "0",
        };
        VAContato.push(VContato);
      }

      // Esconde a visão do whatsapp
      $("#app").css("display", "none");3
      

      $("body").attr("class", "");
      $("body").append("<div id='CRM'></div>");

      $("#CRM").load(chrome.runtime.getURL("index.html"), function() {
        for (let Vi = 0; Vi < VAContato.length; Vi++) {
          const VEl = VAContato[Vi];
          $("#d-inbox .d-contatos").append("<div id='"+ VEl.id +"' class='card d-contato mb-1'>" +
            "<div class='card-body p-1'>" +
            "<div class='d-titulo'>" +
            "<img id='i-foto' src='" + (VEl.foto != undefined ? VEl.foto : chrome.runtime.getURL("images/user.png")) + "' alt='" + VEl.nome + "'>" +
            "<p id='p-nome'>" + VEl.nome + "</p>" +
            "<button id='b-configuracao' type='button' class='btn btn-link'>" +
            "<i class='fa-solid fa-ellipsis'></i>" +
            "</button>" +
            "</div>" +
            "<div class='d-conteudo'>" +
            "<div>" +
            "<p id='p-ultima' class='p-ultima'>" + VEl.ultima + "</p>" +
            "<p id='p-tempo' class='p-tempo'>" + VEl.tempo + "</p>" +
            "</div>" +
            "<div id='d-alerta' alerta='" + (VEl.alerta != "0") + "'>" +
            (VEl.alerta != "0" ? "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display: block;'><i class='fa-solid fa-bell'></i></button>" : "") +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>");
        }

        $(".d-cards .d-contatos .d-contato").prop("draggable", true);

        // Ao mover item dentro do container
        $(".d-cards .d-contatos").on("dragover", ".d-contato", function(event) {
          event.preventDefault(); // Necessário para fazer funcionar evento drop
        });

        // Começa a arrastar o tr
        $(".d-cards").on("dragstart", ".d-contatos .d-contato", function(event) {
          event.originalEvent.dataTransfer.setData("id", $(this).attr("id"));
          event.originalEvent.dataTransfer.setData("nome", $(this).find("#p-nome").html());
          event.originalEvent.dataTransfer.setData("foto", $(this).find("#i-foto").attr("src"));
          event.originalEvent.dataTransfer.setData("ultima", $(this).find("#p-ultima").html());
          event.originalEvent.dataTransfer.setData("tempo", $(this).find("#p-tempo").html());
          event.originalEvent.dataTransfer.setData("alerta", $(this).find("#d-alerta").attr("alerta"));
        });

        $(".d-cards").on("drop", ".d-contatos", function(event) {
          const VId = event.originalEvent.dataTransfer.getData("id");
          const VNome = event.originalEvent.dataTransfer.getData("nome");
          const VFoto = event.originalEvent.dataTransfer.getData("foto");
          const VUltima = event.originalEvent.dataTransfer.getData("ultima");
          const VTempo = event.originalEvent.dataTransfer.getData("tempo");
          const VAlerta = event.originalEvent.dataTransfer.getData("alerta");

          $(".d-cards .d-contatos #" + VId).remove();

          $(this).append("<div id='" + VId +"' class='card d-contato mb-1'>" +
          "<div class='card-body p-1'>" +
          "<div class='d-titulo'>" +
          "<img id='i-foto' src='" + VFoto + "' alt='" + VNome+ "'>" +
          "<p id='p-nome'>" + VNome + "</p>" +
          "<button id='b-configuracao' type='button' class='btn btn-link'>" +
          "<i class='fa-solid fa-ellipsis'></i>" +
          "</button>" +
          "</div>" +
          "<div class='d-conteudo'>" +
          "<div>" +
          "<p id='p-ultima' class='p-ultima'>" + VUltima + "</p>" +
          "<p id='p-tempo' class='p-tempo'>" + VTempo + "</p>" +
          "</div>" +
          "<div id='d-alerta' alerta='" + (VAlerta == "true") + "'>" +
          (VAlerta == "true" ? "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display: block;'><i class='fa-solid fa-bell'></i></button>" : "") +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>");

          $(".d-cards .d-contatos .d-contato").prop("draggable", true);
        });

        $(".d-cards").on("click", ".d-contatos .d-contato", function(event) {
          const myModal = new bootstrap.Modal('#DChat');
          myModal.show();
          console.log("$(this).attr(\"id\")", $(this).attr("id"));
          simulateMouseEvents(document.querySelector('#app #' + $(this).attr("id")), 'mousedown');

          let VChat = $(".ldL67._3sh5K").html();
          console.log("VChat", VChat);
          $("#DChat .modal-body").html(VChat);
        });


        // Função para exibir opção de criar nova lista
        $(".d-adicionar #b-adicionar").on("click", function(){
          $(".d-adicionar #b-adicionar").addClass("d-none");
          $("#d-salvar").removeClass("d-none");
        });

        let VContLista = 0;
        $("#b-salvar").on("click", function(){
          if ($("#i-salvar").val() != "")
          {
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

            $(".d-adicionar #b-adicionar").removeClass("d-none");
            $("#d-salvar").addClass("d-none");
            $("#i-salvar").val("");
          }
        });

      });/** */
    }
  }, 100);
});

function simulateMouseEvents(element, eventName) {
  var mouseEvent= document.createEvent ('MouseEvents');
  mouseEvent.initEvent (eventName, true, true);
  element.dispatchEvent (mouseEvent);
}
