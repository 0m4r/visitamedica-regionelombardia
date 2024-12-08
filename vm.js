$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "elenco.csv",
    dataType: "text",
    success: function (data) {
      processData(data);
    },
  });
});

function processData(data) {
  const elenco = data.split(/\r\n|\n/);
  for (let i = 0; i < elenco.length; i++) {
    (function (j) {
      const atleta = elenco[j].replace(/"/g, "").split(",");
      const tmp = document.createElement("div");
      tmp.id = j;
      document.getElementsByTagName("body")[0].appendChild(tmp);

      $(tmp).load("template.html", function () {
        $(this).find(".Cognome").html(atleta[0]);
        $(this).find(".Nome").html(atleta[1]);
        $(this).find(".LuogoNascita").html(atleta[3]);
        $(this).find(".DataNascita").html(atleta[4]);
        $(this).find(".ResidenteA").html(atleta[5]);
        $(this).find(".CAP").html(atleta[6]);
        $(this)
          .find(".Indirizzo")
          .html(((atleta[7] || "") + ', ' + ((atleta[8]?.trim() || ""))));

        $(this).find(".CodiceFiscale").html(atleta[2]);
      });
    })(i);
  }
}
