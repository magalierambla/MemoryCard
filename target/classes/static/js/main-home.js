
var recupLogin = sessionStorage.getItem('login');
var recupPass = sessionStorage.getItem('password');

var largeurEcran = $(window).width();

function hHeader() {
    var largeurEcran = $(window).width();
    if (largeurEcran >= 1200) {
        hauteurCalc = Math.round((largeurEcran*440)/1920);
        var hauteurImageHead = Math.round((largeurEcran*380)/1920);
        $("header").css({'height': hauteurCalc+hauteurImageHead, 'min-height': hauteurCalc+hauteurImageHead, 'max-height': hauteurCalc+hauteurImageHead});
        $(".flexGauche").css({'height': hauteurImageHead, 'min-height': hauteurImageHead, 'max-height': hauteurImageHead});

    } else if (largeurEcran >= 992 && largeurEcran < 1200) {
        hauteurCalc = Math.round((largeurEcran*440)/1920);
        var hauteurImageHead = Math.round((largeurEcran*450)/1920);
        $("header").css({'height': hauteurCalc+hauteurImageHead, 'min-height': hauteurCalc+hauteurImageHead, 'max-height': hauteurCalc+hauteurImageHead});
        $(".flexGauche").css({'height': hauteurImageHead, 'min-height': hauteurImageHead, 'max-height': hauteurImageHead});
        $(".home").css({'margin-top': '10px'});

    } else if (largeurEcran >= 768 && largeurEcran < 992) {
        hauteurCalc = Math.round((largeurEcran*440)/1920);
        var hauteurImageHead = Math.round((largeurEcran*800)/1920);
        $("header").css({'height': hauteurCalc+hauteurImageHead, 'min-height': hauteurCalc+hauteurImageHead, 'max-height': hauteurCalc+hauteurImageHead});
        $(".flexGauche").css({'margin-top': '-80px'});
        $(".home").css({'margin-top': '30px'});

    } else if (largeurEcran >= 576 && largeurEcran < 768) {
        hauteurCalc = Math.round((largeurEcran*440)/1920);
        var hauteurImageHead = Math.round((largeurEcran*900)/1920);
        $("header").css({'height': hauteurCalc+hauteurImageHead, 'min-height': hauteurCalc+hauteurImageHead, 'max-height': hauteurCalc+hauteurImageHead});
        $(".flexGauche").css({'margin-top': '-80px'});
        $(".home").css({'margin-top': '30px'});

    } else if (largeurEcran < 576) {
        hauteurCalc = Math.round((largeurEcran*203)/640);
        $("header").css({'height': 'auto', 'min-height': 'auto', 'max-height': 'auto'});
        $(".flexGauche").css({'margin-top': hauteurCalc});
        $(".home").css({'margin-top': '30px'});
        $(".login").css({'margin-bottom': '-30px'});

    }

    var moitieHauteur = Math.round(hauteurCalc/2);
    $("#intro").css({'padding-top': moitieHauteur});
}

function hFooter() {
    var largeurEcran2 = $(window).width();
    hauteurCalc2 = Math.round((largeurEcran2*140)/1920);
    $("footer").css({'height': hauteurCalc2+30, 'min-height': hauteurCalc2+30, 'max-height': hauteurCalc2+30});
}

function separateurOblique() {
    var largeurEcran3 = $(window).width();
    hauteurCalc3 = Math.round((largeurEcran3*204)/1920);
    $(".temoignages").css({'padding-top': hauteurCalc3, 'padding-bottom': hauteurCalc3});
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