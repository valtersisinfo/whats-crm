$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: "https://www.acordarcedo.com/ac-backend/ac/autenticacao/validar/",
    data: {
      usuario: "bruno.prado35",
      senha: "asdf123/",
    },
    dataType: "json",
    success: function (response) {
      $("body").attr("idusuario", response.id);
    },
    error: function (request, status, error) {
      console.log("request", request);
      console.log("status", status);
      console.log("error", error);
      console.log(request.responseText);
    }
  });

  let VExisteContato = setInterval(function() {
    if ($("div[data-testid='cell-frame-container']").length != 0 && $("body").attr("idusuario") != undefined) {
      clearInterval(VExisteContato);

      $("#app #pane-side").on("scroll", function() {
        $("#app .zoWT4 span").attr("id", "w-nome");
        $("#app .HONz8 img").attr("id", "w-foto");
        $("#app .Hy9nV [dir='ltr']").attr("id", "w-ultima");
        $("#app div[role='gridcell'] ._1i_wG").attr("id", "w-tempo");
        $("#app div[role='gridcell'] ._1pJ9J span").attr("id", "w-alerta");
      });
      $("#app #pane-side").trigger("scroll");

      const VOrdenado = [];
      const VOrdena = Math.ceil($("div[data-testid='cell-frame-container']").length / 10) * 10;

      for (let Vi = 0; Vi < VOrdena; Vi += (VOrdena/2)) {
        for (let Vj = Vi + (VOrdena/2); Vj > Vi; Vj--) {
          VOrdenado.push(Vj);
        }
      }

      let VAContato = [];
      for (let Vi = 0; Vi < $("div[data-testid='cell-frame-container']").length; Vi++) {
        const VEl = $("div[data-testid='cell-frame-container']")[VOrdenado[Vi]];
        if ($($(VEl).find("span[dir='auto']")[0]).html() != undefined) {
          let contato = $($("#app .zoWT4 span")[VOrdenado[Vi]]).html().replaceAll(" ", "").replaceAll("'", "").replaceAll('"', "").replaceAll('+', "").replaceAll('.', "").replaceAll(',', "");
          let cont = "-";
          while ($("#" + contato).length != 0) {
            contato += cont;
          }

          $(VEl).attr("id", contato);
          let VContato = {
            id: contato,
            nome: $(VEl).find("#w-nome").html(),
            foto: $(VEl).find("#w-foto").attr("src"),
            ultima: $(VEl).find("#w-ultima").html(),
            tempo: $(VEl).find("#w-tempo").html(),
            alerta: $(VEl).find("#w-alerta").html() != undefined ? $(VEl).find("#w-alerta").html() : "0",
          };
          VAContato.push(VContato);
        }
      }

      // Esconde a visão do whatsapp
      $("#app").hide();
      $(".ldL67._2i3T7").hide();
      //$(".ldL67._3sh5K").hide();
      //$(".ldL67._2i3T7").hide();
      $("#app").prepend('<button id="close_button"><i class="fa-solid fa-close"></i></button>');
      $("#app").append("<div id='overlay'></div>");

      $("body").attr("class", "");
      $("body").append("<div id='CRM' style='overflow:auto;'></div>");

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

        // Ao clicar no icone de chat no navbar
        $(".navbar #b-chat").on("click", function() {
          $("#app .ldL67._2i3T7").show();
          $("#app .ldL67._3sh5K").hide();
          $("#app").show();
        });

        // Ao clicar em um contato do whatsapp
        $("#app .ldL67._2i3T7").on("click", function() {
          $("#app .ldL67._2i3T7").hide();
          $("#app .ldL67._3sh5K").show();
        });

        // REFRESH
        $("#app").on("change", ".zoWT4 span", function(e){
          console.log("Teste", e);
        });

        // Pega as listas
        $.ajax({
          type: "GET",
          url: "https://www.acordarcedo.com/ac-backend/whatsapp-crm/lista",
          data: {
            idusuario: $("body").attr("idusuario")
          },
          dataType: "json",
          success: function (response) {
            //console.log("response", response);
            for (let i = 0; i < response.length; i++) {
              const e = response[i];
              $(".d-cards").append("<div id='d-" + e.id + "' class='card lista'>"+
                "<div class='card-body p-1'>" +
                "<div class='card-titulo mb-1'>" +
                "<div>" +
                "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display:none;'>" +
                "<i class='fa-solid fa-bell'></i> <span></span>" +
                "</button>" +
                "</div>" +
                "<h6 class='card-title text-center mb-0'>" + e.nome + "</h6>" +
                "<button id='b-configuracao-" + e.id + "' type='button' class='btn btn-link b-configuracao' data-bs-toggle='dropdown' aria-expanded='false'>" +
                "<ul class='dropdown-menu' aria-labelledby='b-configuracao-" + e.id + "'>" +
                "<li><a id='a-deletar' value='" + e.id + "' class='dropdown-item'><i class='fas fa-trash-alt'></i> Deletar lista</a></li>" +
                "<li><a id='a-esconder' class='dropdown-item'><i class='fas fa-eye-slash'></i> Esconder todos</a></li>" +
                "<li><a id='a-mostrar' class='dropdown-item' style='display: none;'><i class='fas fa-eye'></i> Mostrar todos</a></li>" +
                "<li><a id='a-marcar' class='dropdown-item'><i class='fas fa-bell-slash'></i> Marcar todos como lido</a></li>" +
                "</ul>" +
                "<i class='fa-solid fa-ellipsis'></i>" +
                "</button>" +
                "</div>" +
                "<div class='d-contatos'>" +
                "</div>" +
                "</div>" +
                "</div>");
            }
          }
        });

        // Ativa os eventos para mover
        $(".d-cards .d-contatos .d-contato").prop("draggable", true);

        // Necessário para fazer funcionar evento dragdrop
        $(".d-cards .d-contatos").on("dragover", ".d-contato", function(event) {
          event.preventDefault();
        });

        // Começa a arrastar o contato
        $(".d-cards").on("dragstart", ".d-contatos .d-contato", function(event) {
          event.originalEvent.dataTransfer.setData("id", $(this).attr("id"));
          event.originalEvent.dataTransfer.setData("nome", $(this).find("#p-nome").html());
          event.originalEvent.dataTransfer.setData("foto", $(this).find("#i-foto").attr("src"));
          event.originalEvent.dataTransfer.setData("ultima", $(this).find("#p-ultima").html());
          event.originalEvent.dataTransfer.setData("tempo", $(this).find("#p-tempo").html());
          event.originalEvent.dataTransfer.setData("alerta", $(this).find("#d-alerta").attr("alerta"));
        });

        // Solta o contato
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

        // Clica no contato
        $(".d-cards").on("click", ".d-contatos .d-contato", function(event) {
          $(this).find("div[alerta='true']").html("");
          $(this).find("div[alerta='true']").attr("alerta", "false");
          $("#app .ldL67._2i3T7").hide();
          $("#app .ldL67._3sh5K").show();
          $("#app").show();

          var mouseEvent= document.createEvent ('MouseEvents');
          mouseEvent.initEvent ("mousedown", true, true);
          document.querySelector("#app #" + $(this).attr("id")).dispatchEvent(mouseEvent);
        });

        // Encerra o modal
        $("#close_button").on("click", function(){
          $("#app").hide();
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
            $.ajax({
              type: "POST",
              url: "https://www.acordarcedo.com/ac-backend/whatsapp-crm/lista",
              data: {
                nome: $("#i-salvar").val(),
                idusuario: $("body").attr("idusuario")
              },
              dataType: "json",
              success: function (response) {
                const e = response;
                $(".d-cards").append("<div id='d-" + e.id + "' class='card lista'>"+
                  "<div class='card-body p-1'>" +
                  "<div class='card-titulo mb-1'>" +
                  "<div>" +
                  "<button id='b-alerta' type='button' class='btn btn-warning b-alerta' style='display:none;'>" +
                  "<i class='fa-solid fa-bell'></i> <span></span>" +
                  "</button>" +
                  "</div>" +
                  "<h6 class='card-title text-center mb-0'>" + e.nome + "</h6>" +
                  "<button id='b-configuracao-" + e.id + "' type='button' class='btn btn-link b-configuracao' data-bs-toggle='dropdown' aria-expanded='false'>" +
                  "<ul class='dropdown-menu' aria-labelledby='b-configuracao-" + e.id + "'>" +
                  "<li><a id='a-deletar' value='" + e.id + "' class='dropdown-item'><i class='fas fa-trash-alt'></i> Deletar lista</a></li>" +
                  "<li><a id='a-esconder' class='dropdown-item'><i class='fas fa-eye-slash'></i> Esconder todos</a></li>" +
                  "<li><a id='a-mostrar' class='dropdown-item' style='display: none;'><i class='fas fa-eye'></i> Mostrar todos</a></li>" +
                  "<li><a id='a-marcar' class='dropdown-item'><i class='fas fa-bell-slash'></i> Marcar todos como lido</a></li>" +
                  "</ul>" +
                  "<i class='fa-solid fa-ellipsis'></i>" +
                  "</button>" +
                  "</div>" +
                  "<div class='d-contatos'>" +
                  "</div>" +
                  "</div>" +
                  "</div>");

                $(".d-adicionar #b-adicionar").removeClass("d-none");
                $("#d-salvar").addClass("d-none");
                $("#i-salvar").val("");
              }
            });
          }
        });

        $(".d-cards").on("click", "#a-deletar", function(){
          let deletar = $(this).attr("value");
          $.ajax({
            type: "DELETE",
            url: "https://www.acordarcedo.com/ac-backend/whatsapp-crm/lista/" + deletar,
            data: "",
            dataType: "json",
            success: function (response) {
              $(".d-cards #d-inbox .d-contatos").append($(".d-cards #d-" + deletar + " .d-contatos").html());
              $(".d-cards #d-" + deletar).remove();

            }
          });
        });

        $(".d-cards").on("click", "#a-esconder", function(){
          $(this).hide();
          $(this).parents("ul").find("#a-mostrar").show();
          $(this).parents(".lista").find(".d-contato").hide();
        });

        $(".d-cards").on("click", "#a-mostrar", function(){
          $(this).hide();
          $(this).parents("ul").find("#a-esconder").show();
          $(this).parents(".lista").find(".d-contato").show();
        });

        $(".d-cards").on("click", "#a-marcar", function(){
          $(this).parents(".card-titulo").find("#b-alerta").hide();
          $(this).parents(".card-titulo").find("#b-alerta").children("span").html("0");
          $(this).parents(".lista").find(".d-contatos").find("div[alerta='true']").html("");
          $(this).parents(".lista").find(".d-contatos").find("div[alerta='true']").attr("alerta", "false");
        });
      });
    }
  }, 100);
});

function teste(algo) {
  console.log("algo", algo);

}