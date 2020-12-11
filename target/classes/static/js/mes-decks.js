var playMode = "ordre";
var dataSelectionDeck = undefined;
var dataSelectionCardsOrdre = [];
var dataSelectionCardsRandom = [];
var data = undefined;


/* SESSION */
var recupLogin = sessionStorage.getItem('login');
var recupPass = sessionStorage.getItem('password');
console.log(recupLogin);
console.log(recupPass);
/* FIN SESSION */


/* AJAX */
function connexion() {
    var login = recupLogin;
    var pass = recupPass;
    $.ajax({
        url: "./deck/all",
        headers: {"login" : login, "password" : pass}
    }).done(function(d) {
        data = d;
        constructionDecks();
    });
}
/* FIN AJAX */


function constructionDecks() {    

    var resetDecks = $("<div class=\"row\" id=\"wrapperDecksBtn\"></div>");
    $("#wrapperDecksBtn").replaceWith(resetDecks);


    for (var i = 0; i < data.length; i++) {

        var deckId = data[i].id;
        var deckNom = data[i].nom;
        if (deckNom === "defaut") {
            deckNom = "Non catégorisé";
        }
        var deckCard1 = data[i].cards[0];
        var deckNb = data[i].cards.length;

        if (deckCard1 === undefined) {
            var image = $("<div class=\"overlay\" onclick=\"afficherCards(event)\"><div class=\"length\">"+deckNb+"</div><div class=\"nomd\"><span>"+deckNom+"</span></div></div><div class=\"linkd\"><img src=\"images/no-file-found.jpg\" alt=\""+deckNom+"\"></div>");
        } else {
            var image = $("<div class=\"overlay\" onclick=\"afficherCards(event)\"><div class=\"length\">"+deckNb+"</div><div class=\"nomd\"><span>"+deckNom+"</span></div></div><div class=\"linkd\"><img src=\""+deckCard1.image+"\" alt=\""+deckNom+"\"></div>");
        }

        $("#wrapperDecksBtn").append("<div class=\"col-lg-3 col-sm-6\"><div class=\"deck"+deckId+"\" data-deck=\""+deckId+"\"></div></div>");
        $(".deck"+deckId).append(image);
    }
    scroll1();
    $("#wrapperDecksBtn").append("<div class=\"col-lg-3 col-sm-6\"><div class=\"ajouter\"><a href=\"creer-deck.html\"><img src=\"images/plus.png\" alt=\"Créer un deck\"></a></div></div>");
}

function afficherCards(e) {
    var cible = $(e.target.parentNode)[0];
    var idCible = parseInt($(cible).attr("data-deck"));
    var linkd = $(cible).children(".linkd")[0];
    var img = $(linkd).children("img")[0];
    var overlay = $(cible).children(".overlay")[0];
    var nomd = $(overlay).children(".nomd")[0];
    var span = $(nomd).children("span")[0];

    $("#wrapperDecksBtn img").removeClass("selec-actif");
    $("#wrapperDecksBtn span").removeClass("selec-actif");
    $(img).addClass("selec-actif");
    $(span).addClass("selec-actif");

    for (var i = 0; i < data.length; i++) {
        if (data[i].id === idCible) {

            var deckNom = data[i].nom;
            if (deckNom === "defaut") {
                deckNom = "Non catégorisé";
            }
            var DeckCards = data[i].cards;
            var resetNomDeck = $("<h3 class=\"titre-deck\" data-deck-id=\""+data[i].id+"\">"+deckNom+"</h3>");
            $(".titre-deck").replaceWith(resetNomDeck);

            afficherCards2(DeckCards);
        }
    }
}

function afficherCards2(DeckCards) {
    var resetCards = $("<div class=\"row align-items-center\" id=\"wrapperCardsBtn\"></div>");
    $("#wrapperCardsBtn").replaceWith(resetCards);
    if (DeckCards.length === 0) {
        $("#wrapperCardsBtn").append("<div class=\"col-lg-12 col-sm-12 slider-cards\">Aucune FlashCard dans le deck sélectionné</div>");
    }

    if (playMode === "random") {
        dataSelectionCardsOrdre = DeckCards;
        var dataSelectionCardsOrdre2 = JSON.parse(JSON.stringify(dataSelectionCardsOrdre));
        dataSelectionCardsRandom = shuffle(dataSelectionCardsOrdre2);
        DeckCards = dataSelectionCardsRandom;
    }


    for (var j = 0; j < DeckCards.length; j++) {
        var DeckCard = DeckCards[j];

        if (j === 0) {
            $("#wrapperCardsBtn").append("<div class=\"col-md-1 d-none d-md-block\">&nbsp;</div>");
            $("#wrapperCardsBtn").append("<div class=\"col-lg-1 d-none d-lg-block\">&nbsp;</div>");
            $("#wrapperCardsBtn").append("<div class=\"col-md-1 d-none d-md-block\"><button class=\"fc-pointer\" onclick=\"slideGauche(event)\"><i class=\"fas fa-chevron-left fc-fleche\"></i></button></div>");


            $("#wrapperCardsBtn").append("<div class=\"col-lg-6 col-md-8 col-xs-10 slider-cards\"><div class=\"wrapperfcflip cards deck-card card-active\" data-card=\""+DeckCard.id+"\"><div class=\"containerfcflip\"><div class=\"card\"><div onclick=\"flip(event)\" class=\"front\" style=\"background-image:url("+DeckCard.image+"); background-repeat:no-repeat; background-size:cover;\"><h4>"+DeckCard.nom+"</h4></div><div onclick=\"flip(event)\" class=\"back\" style=\"background-image:url("+DeckCard.image+"); background-repeat:no-repeat; background-size:cover;\"><div class=\"content-card\"><h4>"+DeckCard.definition+"</h4></div></div></div></div></div></div>");
            // $("#wrapperCardsBtn").append("<div class=\"col-lg-6 col-sm-10 slider-cards\"><div class=\"deck-card card-active\" data-card=\""+DeckCard.id+"\"><div>"+DeckCard.nom+"</div><div><img src=\""+DeckCard.image+"\" alt=\""+DeckCard.nom+"\"></div><div>"+DeckCard.definition+"</div></div></div>");

            $("#wrapperCardsBtn").append("<div class=\"col-md-1 d-none d-md-block\"><button class=\"fc-pointer\" onclick=\"slideDroite(event)\"><i class=\"fas fa-chevron-right fc-fleche\"></i></button></div>");
            $("#wrapperCardsBtn").append("<div class=\"col-lg-1 d-none d-lg-block\">&nbsp;</div>");
            $("#wrapperCardsBtn").append("<div class=\"col-md-1 d-none d-md-block\"><button class=\"btnSliderCard\" id=\"btnSliderOrdre\" onclick=\"btnPlayOrdre()\" title=\"Mode boucle\"><i class=\"fas fa-sync-alt\"></i></button><button class=\"btnSliderCard\" id=\"btnSliderRandom\" onclick=\"btnPlayRandom()\" title=\"Mode aléatoire\"><i class=\"fas fa-random\"></i></button><button class=\"btnSliderCard\" id=\"btnSliderUp\" title=\"Retour aux decks\"><i class=\"fas fa-arrow-up\"></i></button></div>");

            $("#wrapperCardsBtn").append("<div style=\"margin-left: auto; margin-right: auto;\" class=\"col-xs-2 d-xs-block d-sm-block d-md-none\"><button class=\"fc-pointer\" onclick=\"slideGauche(event)\"><i class=\"fas fa-chevron-left fc-fleche\"></i></button></div>");
            $("#wrapperCardsBtn").append("<div style=\"margin-left: auto; margin-right: auto;\" class=\"col-xs-8 d-xs-block d-sm-block d-md-none\"><button class=\"btnSliderCard\" id=\"btnSliderOrdreMob\" onclick=\"btnPlayOrdre()\"><i class=\"fas fa-sync-alt\"></i></button><button class=\"btnSliderCard\" id=\"btnSliderRandomMob\" onclick=\"btnPlayRandom()\"><i class=\"fas fa-random\"></i></button><button class=\"btnSliderCard\" id=\"btnSliderUpMob\" onclick=\"scroll3()\"><i class=\"fas fa-arrow-up\"></i></button></div>");
            $("#wrapperCardsBtn").append("<div style=\"margin-left: auto; margin-right: auto;\" class=\"col-xs-2 d-xs-block d-sm-block d-md-none\"><button class=\"fc-pointer\" onclick=\"slideDroite(event)\"><i class=\"fas fa-chevron-right fc-fleche\"></i></button></div>");

            if (playMode === "ordre") {
                $("#btnSliderOrdre").addClass("playModeActif");
                $("#btnSliderRandom").removeClass("playModeActif");
                $("#btnSliderOrdreMob").addClass("playModeActif");
                $("#btnSliderRandomMob").removeClass("playModeActif");
            } else {
                $("#btnSliderOrdre").removeClass("playModeActif");
                $("#btnSliderRandom").addClass("playModeActif");
                $("#btnSliderOrdreMob").removeClass("playModeActif");
                $("#btnSliderRandomMob").addClass("playModeActif");
            }

        } else {

            $(".slider-cards").append("<div class=\"wrapperfcflip cards deck-card\" data-card=\""+DeckCard.id+"\"><div class=\"containerfcflip\"><div class=\"card\"><div onclick=\"flip(event)\" class=\"front\" style=\"background-image:url("+DeckCard.image+"); background-repeat:no-repeat; background-size:cover;\"><h4>"+DeckCard.nom+"</h4></div><div onclick=\"flip(event)\" class=\"back\" style=\"background-image:url("+DeckCard.image+"); background-repeat:no-repeat; background-size:cover;\"><div class=\"content-card\"><h4>"+DeckCard.definition+"</h4></div></div></div></div></div>");
            // $(".slider-cards").append("<div class=\"deck-card\" data-card=\""+DeckCard.id+"\"><div>"+DeckCard.nom+"</div><div><img src=\""+DeckCard.image+"\" alt=\""+DeckCard.nom+"\"></div><div>"+DeckCard.definition+"</div></div>");
        }
        
        $(".deck-card").hide();
        $(".card-active").show();
        
        separateurOblique();
        scroll2();
    }

    $("#wrapperCardsBtn").append("<div class=\"col-sm-12\"><button class=\"btn-dslider\" onclick=\"suppressionDeck()\">Supprimer ce deck</button><button class=\"btn-dslider\" onclick=\"modifDeck()\">Modifier ce deck</button><button class=\"btn-dslider\" onclick=\"exportPdf()\">Exporter en PDF</button></div>");

}


function slideDroite(e) {
    $(e.target).prop('disabled', true);
    var cible = $(e.target.parentNode.parentNode)[0];
    var slider = $(cible).children(".slider-cards")[0];
    var cardActive = $(slider).children(".card-active")[0];
    var idCardActive = parseInt($(cardActive).attr("data-card"));
    var nextCard = $(cardActive).next()[0];
    var idNextCard = parseInt($(nextCard).attr("data-card"));

    var premiereCard = $(".deck-card:first-child")[0];
    var idPremiereCard = parseInt($(premiereCard).attr("data-card"));

    if (isNaN(idNextCard)) {
        idNextCard = idPremiereCard;
    }

    $(slider).children("div[data-card=\""+idCardActive+"\"]").removeClass("card-active");
    $(slider).children("div[data-card=\""+idNextCard+"\"]").addClass("card-active");

    $(slider).children("div[data-card=\""+idCardActive+"\"]").fadeOut(200, function(){
        $(slider).children("div[data-card=\""+idNextCard+"\"]").fadeIn(200);
        $(e.target).prop('disabled', false);
    });
    // $(slider).children("div[data-card=\""+idCardActive+"\"]").fadeOut(400);
    // $(slider).children("div[data-card=\""+idNextCard+"\"]").fadeIn(400);
}

function slideGauche(e) {
    $(e.target).prop('disabled', true);
    var cible = $(e.target.parentNode.parentNode)[0];
    var slider = $(cible).children(".slider-cards")[0];
    var cardActive = $(slider).children(".card-active")[0];
    var idCardActive = parseInt($(cardActive).attr("data-card"));
    var prevCard = $(cardActive).prev()[0];
    var idPrevCard = parseInt($(prevCard).attr("data-card"));

    var derniereCard = $(".deck-card:last-child")[0];
    var idDerniereCard = parseInt($(derniereCard).attr("data-card"));

    if (isNaN(idPrevCard)) {
        idPrevCard = idDerniereCard;
    }

    $(slider).children("div[data-card=\""+idCardActive+"\"]").removeClass("card-active");
    $(slider).children("div[data-card=\""+idPrevCard+"\"]").addClass("card-active");

    $(slider).children("div[data-card=\""+idCardActive+"\"]").fadeOut(200, function(){
        $(slider).children("div[data-card=\""+idPrevCard+"\"]").fadeIn(200);
        $(e.target).prop('disabled', false);
    });

    // $(slider).children("div[data-card=\""+idCardActive+"\"]").fadeOut(400);
    // $(slider).children("div[data-card=\""+idPrevCard+"\"]").fadeIn(400);
}


function btnPlayOrdre() {
    playMode = "ordre";
    dataSelectionDeck = parseInt($(".titre-deck").attr("data-deck-id"));
    for (var i=0; i < data.length; i++) {
        if (data[i].id === dataSelectionDeck) {
            dataSelectionCardsOrdre = data[i].cards;
            afficherCards2(dataSelectionCardsOrdre);
        }
    }
}

function btnPlayRandom() {
    playMode = "random";
    dataSelectionDeck = parseInt($(".titre-deck").attr("data-deck-id"));
    for (var i=0; i < data.length; i++) {
        if (data[i].id === dataSelectionDeck) {
            dataSelectionCardsOrdre = data[i].cards;
            var dataSelectionCardsOrdre2 = JSON.parse(JSON.stringify(dataSelectionCardsOrdre));
            dataSelectionCardsRandom = shuffle(dataSelectionCardsOrdre2);
            afficherCards2(dataSelectionCardsRandom);
        }
    }
}

function scroll1() {
    $('div.overlay').click(function() {
        $('html, body').stop(true, false).animate({
        scrollTop: $("div.debut-slider").offset().top+(hauteurCalc3/2)+20
        }, 800)
    });
}

function scroll2() {
    $('button#btnSliderUp').click(function (){
        $('html, body').stop(true, false).animate({
            scrollTop: $("div.corps").offset().top-70
        }, 800)
    });
}

function scroll3(e) {
    $('html, body').stop(true, false).animate({
        scrollTop: $("div.corps").offset().top-50
    }, 800);
    /*
    $('button#btnSliderUpMob').click(function (){
        $('html, body').stop(true, false).animate({
            scrollTop: $("div.corps").offset().top-70
        }, 800)
    });
    */
}
/*
$(document).ready(function () {
        $('div.overlay').click(function() {
        $('html, body').stop(true, false).animate({
        scrollTop: $("div.debut-slider").offset().top+(hauteurCalc3/2)+20
        }, 800)
    })
});
*/

function flip(e) {
    var cardAflipper = e.target.parentNode;
    $(cardAflipper).toggleClass('flipped');
}

function shuffle(jsonOriginal) {
    for (var i = 0; i < jsonOriginal.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (jsonOriginal.length - i));

        var temp = jsonOriginal[j];
        jsonOriginal[j] = jsonOriginal[i];
        jsonOriginal[i] = temp;
    }
    return jsonOriginal;
}

function suppressionDeck() {
    var deckSelectionne = parseInt($(".titre-deck").attr("data-deck-id"));
    $.ajax({
        url: "./deck/"+deckSelectionne,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        headers: {
            'login': recupLogin,
            'password': recupPass
        }
    }).done(function() {
        location.reload();
    });
}

function modifDeck() {
    var deckId = parseInt($(".titre-deck").attr("data-deck-id"));
    sessionStorage.setItem('deckId', deckId);
    window.location.href = "./edit-decks.html";
}


function exportPdf() {
    var deckId = parseInt($(".titre-deck").attr("data-deck-id"));
    window.open("./pdf/"+deckId); 
}


connexion();