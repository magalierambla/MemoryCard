///////////////////////////////////////////////////FONCTION PERMETTANT DE RECUPERER LES SCORES DE L'UTILISATEUR////////////////////////////////
// function postScore(){
//     $.ajax({
//         type: 'POST',
//         headers: {'login': login, 'deckId': deckId},
//         url: './scores',
//         success: function(data) {
//                  console.log(data);
//                  alert('POST OK');
//         },
//         error: function() {
//             alert('Failed to Post');
//         }
//     })
// }

var login = sessionStorage.getItem('login');
var password = sessionStorage.getItem('password');

$.ajax({
    type: 'GET',
    headers: {'login': login},
    url: './scores/all',
    // success: function(data) {
    //     console.log(data);
    //     alert('Get OK');
    // },
    // error: function() {
    //     alert('Failed to Get');
    // }
}).done(function(data) {
    
    var mesScores = data;

    $.ajax({
        type: 'GET',
        url: "./deck/all",
        headers: {"login" : login, "password" : password},
        // success: function(data) {
        //     console.log(data);
        //     alert('Get deck OK');
        // },
        // error: function() {
        //     alert('Failed to Get decks');
        // }
    }).done(function(d) {
      var mesDecks = d;

    //   console.log(mesDecks);
    //   console.log(mesScores);
        $('.table').append('<thead><tr><th scope="col">Nom Du Deck</th><th scope="col">Note</th><th scope="col">Date</th></tr></thead>');

      for (var i = 0; i <= mesDecks.length; i++) {
        for (var j = 0; j <= mesScores.length-1; j++) {
           if (mesDecks[i].id == mesScores[j].deckId){
                $('.table').append('<tr><th scope="col">'+mesDecks[i].nom+'</th><td>'+mesScores[j].resultat+'</td><td>'+mesScores[j].date+'</td></tr>');
           } 
        }
    }
    });
    
})








