
var recupLogin = sessionStorage.getItem('login');
var recupPass = sessionStorage.getItem('password');

var largeurEcran = $(window).width();

function hHeader() {
    var largeurEcran = $(window).width();
    if (largeurEcran >= 768) {
        hauteurCalc = Math.round((largeurEcran*420)/1920+30);
        $("header").css({'height': hauteurCalc, 'min-height': hauteurCalc, 'max-height': hauteurCalc});
    } else if (largeurEcran >= 576 && largeurEcran < 768) {
        hauteurCalc = Math.round((largeurEcran*420)/1920+40);
        $("header").css({'height': hauteurCalc, 'min-height': hauteurCalc, 'max-height': hauteurCalc});
    } else if (largeurEcran < 576) {
        hauteurCalc = Math.round((largeurEcran*203)/640);
        $("header").css({'height': hauteurCalc+30, 'min-height': hauteurCalc+30, 'max-height': hauteurCalc+30});
    }

    var moitieHauteur = Math.round(hauteurCalc/2);
    $("#intro").css({'padding-top': moitieHauteur});
}

function hFooter() {
    var largeurEcran2 = $(window).width();
    hauteurCalc2 = Math.round((largeurEcran2*140)/1920+20);
    $("footer").css({'height': hauteurCalc2, 'min-height': hauteurCalc2, 'max-height': hauteurCalc2});
}

function separateurOblique() {
    var largeurEcran3 = $(window).width();
    hauteurCalc3 = Math.round((largeurEcran3*204)/1920);
    $(".slide-interieur").css({'padding-top': hauteurCalc3, 'padding-bottom': hauteurCalc3});
}

hHeader();
hFooter();
separateurOblique();
$(window).resize(function() {
    hHeader();
    hFooter();
    separateurOblique();
});


function acces(url) {
    if (recupLogin == null || recupLogin == "non connecté") {
        window.location.href = "acces-refuse.html";
    } else {
        window.location.href = url;
    }
}

function deconnexion(e) {
    var zero = "non connecté";
    sessionStorage.setItem('login', zero);
    sessionStorage.setItem('password', zero);
    $(e.target).remove();
    window.location.href = "./index.html";
}

if (recupLogin != "non connecté" && recupLogin != null) {
    $("div.dropdown-menu").append("<a class=\"dropdown-item\" id=\"deco-fc\" onclick=\"deconnexion(event)\" href=\"#\">Déconnexion</a>");
}