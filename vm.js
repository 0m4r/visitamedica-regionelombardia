$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "elenco.csv",
    dataType: "text",
    success: function (data) {
      processData(data);
    }
  });
});

function processData(data) {
  var elenco = data.split(/\r\n|\n/);
  for (var i = 0; i < elenco.length; i++) {
    (function (j) {
      var atleta = elenco[j].split(',');
      var tmp = document.createElement('div');
      tmp.id = j;
      document.getElementsByTagName('body')[0].appendChild(tmp);

      $(tmp).load('template.html', function () {
        $(this).find('.Cognome').html(atleta[0]);
        $(this).find('.Nome').html(atleta[1]);
        $(this).find('.LuogoNascita').html(atleta[4]);
        $(this).find('.DataNascita').html(atleta[5]);
        $(this).find('.ResidenteA').html(atleta[6]);
        $(this).find('.CAP').html(atleta[7]);
        $(this).find('.Indirizzo').html((atleta[8] + (atleta[9] || '')).replace(/"/g, ''));

        $(this).find('.CodiceFiscale').html(atleta[2]);
      });

    }(i));
  }
}
