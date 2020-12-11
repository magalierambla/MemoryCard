
var recupLogin = sessionStorage.getItem('login');
var recupPass = sessionStorage.getItem('password');
var recupDeckId = sessionStorage.getItem('deckId');
var leDeck = undefined;
var incremente=0;
/*
function deleteDeck(){
    let login = $("#login").val();
    let password = $("#password").val();
    let id = recupDeckId;
    $.ajax({
        url: "./deck/"+id,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        headers: {
            'login': login,
            'password': password
        },

        success: function() {
            alert('Deck deleted!');
        },
        error: function() {
            alert('Failed to delete Deck...');
        }
    })
};
*/


function modifyDeckName(){
    let login = recupLogin;
    let password = recupPass;
    let id = recupDeckId;
      let newDeckName = $('#nomDeck').val();
      $.ajax({
              type: 'GET',
              headers: {'login': login, 'password': password},
              url: './deck/'+id
          }).done(function(data) {
              let myDeck = data;
              myDeck.nom = newDeckName;
              console.log(data),
              $.ajax({
                  url: './deck',
                  type: 'PUT',
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  headers: {
                      'login': login,
                      'password': password
                  },
                  data: JSON.stringify(myDeck),
                  success: function() {
                      //alert('Deck modified!');
                  },
                  error: function() {
                      //alert('Failed to modify Deck...');
                  }
              }).done(function() {
                location.reload();
              })
          });
  };
/*
function addCardToDeck(){
    let login = $("#login").val();
    let password = $("#password").val();
    let id = $("#deckId").val();

    let cardName = $("#cardName").val(); //question
    let cardDefinition = $("#cardDefinition").val(); //response
    let cardURL = $("#cardURL").val();

    $.ajax({
            type: 'GET',
            headers: {'login': login, 'password': password},
            url: './deck/'+id
        }).done(function(data) {
            let myDeck = data;
            myDeck.cards.push({"id":"", "nom": cardName, "definition":cardDefinition, "image":cardURL}),
            console.log(data),
            $.ajax({
                url: './deck',
                type: 'PUT',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: {
                    'login': login,
                    'password': password
                },
                data: JSON.stringify(myDeck),
                success: function() {
                    alert('Deck modified!');
                },
                error: function() {
                    alert('Failed to modify Deck...');
                }
            })
        });
};

function addExistingCardToDeck(){
    let login = $("#login").val();
    let password = $("#password").val();
    let id = $("#deckId").val();
    let cardId = $("#cardId").val();
    $.ajax({
            type: 'GET',
            headers: {'login': login, 'password': password},
            url: './deck/cards'
        }).done(function(data) {
            var tableauDeSaMere = [];
            var myCards = data;
            console.log(myCards);
            for (var k = 0; k <= myCards.length; k++) {
                //'use strict';
                //console.log(myCards[k].id);
                var maPutainDeCarte = myCards[k];

                var x;

                for (x in maPutainDeCarte) {
                  console.log(maPutainDeCarte[x]);
                  if (typeof maPutainDeCarte[x] == "number") {
                      tableauDeSaMere.push(maPutainDeCarte[x]);
                  } 
                }
                console.log(tableauDeSaMere);

                for (var z = 0; z < tableauDeSaMere.length; z++) {
                    if (tableauDeSaMere[z] == cardId) {
                        var myCard = myCards[z];
                        console.log(myCard);
                    }
                }

            };
            $.ajax({
                type: 'GET',
                headers: {'login': login, 'password': password},
                url: './deck/'+id
            }).done(function(data) {
                let myDeck = data;
                myDeck.cards.push(myCard);
                $.ajax({
                    url: './deck',
                    type: 'PUT',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    headers: {
                        'login': login,
                        'password': password
                    },
                    data: JSON.stringify(myDeck),
                    success: function() {
                        alert('Deck modified!');
                    },
                    error: function() {
                        alert('Failed to modify Deck...');
                    }
                })
            });
    });
}
*/
function deleteCardFromDeck(e){
    let login = recupLogin;
    let password = recupPass;
    let id = recupDeckId;

    var idDeLaCarte = parseInt($(e.target).attr("data-id-card"));
    //console.log(idDeLaCarte);

    let cardId = idDeLaCarte;
    console.log(cardId);

    $.ajax({
            type: 'GET',
            headers: {'login': login, 'password': password},
            url: './deck/'+id,
            success: function(data) {
                     //console.log(data);
                     //alert('Get OK');
             },
        }).done(function(data) {

            var tableauDeSaMere = [];
            var myDeck = data;
            //console.log(myDeck);
            for (var k = 0; k <= myDeck.cards.length; k++) {
                //'use strict';
                //console.log(myCards[k].id);
                var maPutainDeCarte = myDeck.cards[k];

                var x;

                for (x in maPutainDeCarte) {
                  /*console.log(maPutainDeCarte[x]);*/
                  if (typeof maPutainDeCarte[x] == "number") {
                      tableauDeSaMere.push(maPutainDeCarte[x]);
                  } 
                }
/*
                for (var z = 0; z < tableauDeSaMere.length; z++) {
                    if (tableauDeSaMere[z] === cardId) {
                        var myCard = myDeck.cards[z];
                        console.log(myCard);
                        myDeck.cards.splice(z,1);
                    }
                }
*/
            }

            for (var z = 0; z < tableauDeSaMere.length; z++) {
                if (tableauDeSaMere[z] === cardId) {
                    var myCard = myDeck.cards[z];
                    myDeck.cards.splice(z,1);
                }
            }
            console.log(tableauDeSaMere);





            /*
            let myDeck = data;
            console.log(myDeck);
            for (var i = 0; i <= myDeck.cards.length; i++) {
                if (myDeck.cards[i].id == cardId) {
                    myDeck.cards.splice(i,1);
                }
            };
            */
            console.log(data),
            $.ajax({
                url: './deck',
                type: 'PUT',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: {
                    'login': login,
                    'password': password
                },
                data: JSON.stringify(myDeck),
            }).done(function(){
                location.reload();
            });

        });
};

function modifyCard(e){
    let login = recupLogin;
    let password = recupPass;
    let id = recupDeckId;

    var idDeLaCarte = parseInt($(e.target).attr("data-id-card"));
    var cardId = idDeLaCarte;
    var cible = $(e.target.parentNode)

    var newCardNom = $(cible).children("input[id*=\"nomCard\"]")[0];
    var valNomCard = newCardNom.value;

    var newCardDefinition = $(cible).children("input[id*=\"tradCard\"]")[0];
    var valDefinitionCard = newCardDefinition.value;
    
    //$('#newCardNom').val();



    //var newCardDefinition = $('#newCardDefinition').val();
    //var newCardURL = $('#newCardURL').val();


    $.ajax({
            type: 'GET',
            headers: {'login': login, 'password': password},
            url: './deck/'+id,
            success: function(data) {
                     //console.log(data);
                     //alert('Get OK');
             },
        }).done(function(data) {
            let myDeck = data;
            //console.log("aaaaaaaaaaaa");
            //console.log(myDeck);

            for (var j = 0; j < myDeck.cards.length; j++) {
                var card = myDeck.cards[j];
                if (card.id == cardId) {
                    card.nom = valNomCard;
                    card.definition = valDefinitionCard;
                    //card.image = newCardURL;
                }
            }
            console.log(data),
            $.ajax({
                url: './deck',
                type: 'PUT',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: {
                    'login': login,
                    'password': password
                },
                data: JSON.stringify(myDeck),
            }).done(function(){
                location.reload();
            });
        });
};



function getDeck() {
    let login = recupLogin;
    let password = recupPass;
    let id = recupDeckId;
    $.ajax({
            type: 'GET',
            headers: {'login': login, 'password': password},
            url: './deck/'+id
        }).done(function(data) {
            console.log(data);
            leDeck = data;
            constructionPage();
        });
}



function constructionPage() 
{
    $("#contenuEdit").append("<div><input style=\"font-weight: bold;\" class=\"inputCreaDeck2\" type=\"text\" id=\"nomDeck\" /><input type='text' id='idDeck' style='display: none'><button class=\"btn-creaDeck\" onclick=\"modifyDeckName(event)\" id=\"buttonDeckModify"+i+"\">Modifier</button><button class=\"btn-creaDeck\" onclick=\"addCarte(event)\" id=\"addCard\">Creer une nouvelle flashCard</button><button class=\"btn-creaDeck\" onclick=\"addExistingCardToDeck()\" id=\"addExistingCard\">Ajouter une flashCard existante</button></div>");
    document.getElementById("nomDeck").value = leDeck.nom;
    document.getElementById("idDeck").value = leDeck.id;
    //$("#contenuEdit").append("<button onclick=\"addCarte(event)\" id=\"addCard\">Creer une nouvelle flashCard</button>");
    //$("#contenuEdit").append("<button class=\"btn-creaDeck\" onclick=\"addCarte(event)\" id=\"addCard\">Creer une nouvelle flashCard</button><button class=\"btn-creaDeck\" onclick=\"addExistingCardToDeck()\" id=\"addExistingCard\">Ajouter une flashCard existante</button>");
    $("#contenuEdit").append("<hr />");
    console.log(leDeck.cards.length);
    for (var i = 0; i < leDeck.cards.length; i++) {
        
        $("#contenuEdit").append("<div id=\"div"+incremente+"\"><input type=\"text\" id=\"idCard"+incremente+"\" style='display: none'/><input class=\"inputCreaDeck2\" type=\"text\" id=\"nomCard"+incremente+"\" /><input class=\"inputCreaDeck2\" type=\"text\" id=\"tradCard"+incremente+"\" /><img id='urlCard"+incremente+"' style='display: none'><button class=\"btn-creaDeck\" onclick=\"deleteCardFromDeck(event)\" id=\"buttonCard"+i+"\" data-id-card=\""+leDeck.cards[i].id+"\">Supprimer</button><button class=\"btn-creaDeck\" onclick=\"modifyCard(event)\" id=\"buttonCardModify"+incremente+"\" data-id-card=\""+leDeck.cards[i].id+"\">Modifier</button><hr /></div>");
        //$("#contenuEdit").append("<input type=\"text\" id=\"nomCard"+i+"\" />");
        document.getElementById("idCard"+incremente).value = leDeck.cards[i].id;
        document.getElementById("nomCard"+incremente).value = leDeck.cards[i].nom;
        //$("#contenuEdit").append("<input type=\"text\" id=\"tradCard"+i+"\" />");
        document.getElementById("tradCard"+incremente).value = leDeck.cards[i].definition;
        document.getElementById("urlCard"+incremente).src = leDeck.cards[i].image;
        /*
        $("#contenuEdit").append("<input type=\"text\" id=\"urlCard"+i+"\" />");
        document.getElementById("urlCard"+i).value = leDeck.cards[i].image;
        */
        //$("#contenuEdit").append("<button onclick=\"deleteCardFromDeck(event)\" id=\"buttonCard"+i+"\" data-id-card=\""+leDeck.cards[i].id+"\">Supprimer</button>");
        //$("#contenuEdit").append("<button onclick=\"modifyCard(event)\" id=\"buttonCardModify"+i+"\" data-id-card=\""+leDeck.cards[i].id+"\">Modifier</button>");
        //$("#contenuEdit").append("<hr />");
        //$("#contenuEdit").append("</div>");
        incremente=incremente+1;
/*
        function addCarte(e)
        {
            console.log(e.target);

        }
*/
}

   
    //$("#contenuEdit").append("<form><h2>Choisissez votre image</h2><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button id='buttonDeSaMere' type='submit'>OK</button></form>")

   
}

getDeck();



/////////////////////////////////////////////////////////////AFFICHAGE FORMULAIRE AJOUT CARTE//////////////////////////////////////////////////////////////

function addCarte(e)
{

    $("#contenuEdit").append("<div id='formCard"+incremente+"'>"+
                                    "<input type='text' class='inputCreaDeck2' id='nomCard"+incremente+"' placeholder='Entrez le nom de la carte'>"+
                                    "<input type='text' class='inputCreaDeck2' id='tradCard"+incremente+"' placeholder='Entrez la définition'>"+
                                    "<img id='urlCard"+incremente+"' src=''>"+
                                    "<input class='btn-creaDeck' type='button' value='Ajouter' onclick='addCardToDeck()'>"+
                                    "</div>"+
                                    "<hr/>");

    //$("#addCarte").css("display: none");
    $("#addCard").addClass("cache");
    console.log(e.target);
    //$(e.target).css("display: none");

}


////////////////////////////////////////////////////////////////AJOUT FORMULAIRE CARTE/////////////////////////////////////////////////

function addCardToDeck()
{
    console.log("ajout formulaire carte");
    if(incremente==0)
    {
        console.log("ajout première carte");
        console.log("pushCreatedCard_OK");
        //var strForm = $("#card").html();
        $("#contenuEdit").append(   "<div id='formCard"+incremente+"'>"+
                                    "<input type='text' class='inputCreaDeck2' id='nomCard"+incremente+"' placeholder='Entrez le nom de la carte'>"+
                                    "<input type='text' class='inputCreaDeck2' id='tradCard"+incremente+"' placeholder='Entrez la définition'>"+
                                    "<img id='urlCard"+incremente+"' src=''>"+
                                    "<input class='btn-creaDeck' type='button' value='Ajouter' onclick='addCardToDeck()'>"+
                                    //"<form id='unsplash'><h2>Choisissez votre image</h2><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button type='submit'>OK</button></form><div id='loading'>Loading...</div><div id='photos'></div>"+
                                    "</div>"+
                                "<hr />");
        incremente=incremente+1;
    }
    else
    {
        console.log("ajout carte");
        var nomCard = document.getElementById("nomCard"+incremente).value;
        var tradCard = document.getElementById("tradCard"+incremente).value;
        var nomDeck = document.getElementById("nomDeck").value;
    
        if(nomDeck=="" || nomCard=="" || tradCard=="") {
            alert("Veuillez remplir les champs.");
            console.log("pushCreatedCard_OFF");
        }
        else
        {
            console.log("pushCreatedCard_OK");
            incremente=incremente+1;
            //var strForm = $("#card").html();
            $("#contenuEdit").append("<div id='formCard"+incremente+"'>"+
                                        "<input type='text' class='inputCreaDeck2' id='nomCard"+incremente+"' placeholder='Entrez le nom de la carte'>"+
                                        "<input type='text' class='inputCreaDeck2' id='tradCard"+incremente+"' placeholder='Entrez la définition'>"+
                                        "<img id='urlCard"+incremente+"' src=''>"+
                                        "<input class='btn-creaDeck' type='button' value='Ajouter' onclick='addCardToDeck()'>"+
                                        //"<form id='unsplash'><h2>Choisissez votre image</h2><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button type='submit'>OK</button></form><div id='loading'>Loading...</div><div id='photos'></div>"+
                                        "</div>"+
                                    "<hr />");
        } 
    }
    
//  console.log(i);
}

/////////////////////////////////////////////////////////////////AFFICHAGE PROPOSITION CARTE/////////////////////////////////////////////////////////////
function addExistingCardToDeck() // afficher les données.
{

    $.ajax(
        {
            type:"get",
            url: "http://localhost:8080/deck/cards",
            headers: 
            {
                "login":recupLogin,
                "password":recupPass
            }, 
            error:function(thrownError)
            {
                console.log(thrownError+" error requête ");
            }
        }).done(function(data){
            card=data;
            console.log(card);
            //affichage(data);
        

            for (var i = 0; i <= card.length-1; i++) 
            {
                var strCard = $("#ChoixCarte").html();
                $("#ChoixCarte").html(
                                        strCard+
                                        "<div class='flashcard' id='flashcard"+i+"'>"+
                                        //"<p id='nomCardExistante"+i+"'>"+card[i].nom+"</p>"+
                                        //"<input type='text' style='display: none;' id='idCardExistante"+i+"' value='"+card[i].id+"'>"+
                                        //"<input type='text' style='display: none;' id='tradCardExistante"+i+"' value='"+card[i].definition+"'>"+
                                        "<div style='display: inline-block !important; white-space: normal !important;'><p><img id='urlCardExistante"+i+"' src='"+card[i].image+"'></p><p id='nomCardExistante"+i+"'>"+card[i].nom+"</p><input type='text' style='display: none;' id='idCardExistante"+i+"' value='"+card[i].id+"'><input type='text' style='display: none;' id='tradCardExistante"+i+"' value='"+card[i].definition+"'></div>"+
                                        //"<input type='checkbox' id='id"+i+"' onclick='pushCard()' />"+
                                        "</div>"
                                    );
            }
      

            /*
            SELECTION MULTIPLE DE CARTES PAR L'IMAGE
            */
            var imagesCards = $("#ChoixCarte img");
            console.log(imagesCards);
            
            for (var k=0; k < imagesCards.length; k++) {
                imagesCards[k].addEventListener('click', function() {
                var selection = [];
            
                    if (this.classList[0] == "cardChoisie") {
                        this.classList.remove("cardChoisie");
                        incremente = incremente-1;
                        console.log(incremente);
                    } else {
                        this.classList.add("cardChoisie");
                        incremente = incremente+1;
                        console.log(incremente);
                    }
                /*
                    if (selection === null) {
                        this.classList.add("cardChoisie");
                        choixImage = this.getAttribute("src");
                        document.getElementById("urlCard"+i).src=choixImage;
                        console.log(document.getElementById("urlCard"+i).src);
                    } else {
                        selection.classList.remove("choisi");
                        this.classList.add("choisi");
                        choixImage = this.getAttribute("src");
                        document.getElementById("urlCard"+i).src=choixImage;
                        console.log(document.getElementById("urlCard"+i).src);
                           
                    }
                */
                });
            }  
        });
}


////////////////////////////////////////////FONCTION PERMETTANT DE CREER UNE CARTE DANS UNE LISTE///////////////////////////////////////////////

function pushCreatedCard()
{

    //newDeck = '{"nom":"'+nomDeck+'","cards":[{"nom":"'+nomCard+'","definition":"'+tradCard+'","image":"'+urlCard+'"}]}';
    //console.log(newDeck);
    var nomDuDeck = $("#nomDeck").val();
    var idDeck = $("#idDeck").val();
    console.log(nomDuDeck);
    console.log(idDeck);
    var fcjson='{"id":'+idDeck+',"nom":"'+nomDuDeck+'","cards":[';
    for(var j=0; j<=incremente; j++)
    {
        console.log("boucle FOR");
        if($("#nomCard"+j).length)
        {
            console.log("Création Carte");
            if($("#idCard"+j).val())
            {
                if(j!=incremente)
                {
                    console.log("creer IF j="+j);
                    fcjson+='{"id":'+$("#idCard"+j).val()+',"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"},';
                }
                else
                {
                    console.log("creer ELSE j="+j);
                    fcjson+='{"id":'+$("#idCard"+j).val()+',"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"}';
                }    
            }
            else
            {
                if(j!=incremente)
                {
                    console.log("creer IF j="+j);
                    fcjson+='{"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"},';
                }
                else
                {
                    console.log("creer ELSE j="+j);
                    fcjson+='{"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"}';
                }    
            }
                       
        }
        else
        {
            console.log("traitement carte Existante");
            for(x=0;x<=card.length-1; x++)
            {               
                if($("#urlCardExistante"+x).hasClass("cardChoisie"))
                {
                    j++;
                    console.log("Carte choisie");
                    if(j<incremente)
                    {
                        console.log("Carte Found IF j="+j+" i="+incremente);
                        fcjson+='{"id":"'+$("#idCardExistante"+x).val()+'","nom":"'+$("#nomCardExistante"+x).html()+'","definition":"'+$("#tradCardExistante"+x).val()+'","image":"'+$("#urlCardExistante"+x).attr("src")+'"},';                     
                    }
                    else
                    {
                        console.log("Carte Found Else j="+j);
                        fcjson+='{"id":"'+$("#idCardExistante"+x).val()+'","nom":"'+$("#nomCardExistante"+x).html()+'","definition":"'+$("#tradCardExistante"+x).val()+'","image":"'+$("#urlCardExistante"+x).attr("src")+'"}';
                    }
                }
                else
                {
                    console.log("carte non choisie "+j+" i="+incremente);
                }

                
            }

        }
            
        }
        fcjson+=']}';
        console.log(fcjson);
       
        $.ajax({
            type: 'put',
            dataType: "json",
            data: fcjson,
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/deck",
            headers: 
            {
                "login":recupLogin,
                "password":recupPass
            }, 
            }).done(function(){
                console.log("ça a marché");
                //window.location.href = "./mes-decks.html";
            });
    console.log(fcjson+" ... creation liste");
    console.log(recupLogin+" <--> "+recupPass);
}


/////////////////////////////////////////////////////////////////////UNSPLASH.JS///////////////////////////////////////////////////////////////////

function unsplash()
{
    $("#contenuEdit").append("<form id='unsplash-fc'><h4>Choisissez votre image</h4><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button type='submit'>OK</button></form><div id='loading'>Loading...</div><div id='photos'></div>");                                   
}
const form = document.querySelector('form');
const photos = document.querySelector('#photos');
const loading = document.querySelector('#loading');

var choixImage = "";

form.addEventListener('submit', function (event)
{
    event.preventDefault();

    const text = document.querySelector('#text').value;
    document.querySelector('#text').value = '';
    loading.style.display = 'inline-block';

    callAPI(text);
});

async function callAPI(text) {
    let responseOne = await fetch('https://api.unsplash.com/search/photos?client_id=d06bb204d3a95a82cd6b6757e70d678dcf16aa005af4baaccebd5f048650e0a5&page=1&orientation=landscape&query=' + text);
    let imagesOne = await responseOne.json();

    photos.innerHTML = '';
    putImages(imagesOne.results);
}

function putImages(images) {
    loading.style.display = 'none';

    images.forEach(image => {
        const img = document.createElement('img');
        img.setAttribute('src', image.urls.small);
        photos.appendChild(img);
        
        img.addEventListener('click', function() {
            var selection = photos.querySelector(".choisi");
            if (selection === null) {
                this.classList.add("choisi");
                choixImage = this.getAttribute("src");
                document.getElementById("urlCard"+incremente).src=choixImage;
                console.log(document.getElementById("urlCard"+incremente).src);
            } else {
                selection.classList.remove("choisi");
                this.classList.add("choisi");
                choixImage = this.getAttribute("src");
                document.getElementById("urlCard"+incremente).src=choixImage;
                console.log(document.getElementById("urlCard"+incremente).src);
                
            }
        });
        
    });


}