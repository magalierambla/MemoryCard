
console.log("loaded");

/////////////////////////////////////////////////RECUPERATION DES DONNEES DE L'UTILISATEUR///////////////////////////////////
   
$.ajax({
    url: "./utilisateur/" + sessionStorage.getItem("login")
    }).done(function(d) {
    $("#fieldLogin").val(d.login);
    $("#fieldName").val(d.nom);
    $("#fieldFirstName").val(d.prenom);
    $("#fieldMail").val(d.mail);
    $("#fieldPassword").val(d.password);
    $("#fieldRole").val(d.role);
});


///////////////////////////////////////////////////FONCTION PERMETTANT DE MODIFIER LES DONNEES DE L'UTILISATEUR////////////////////////////////

function modifUser()
{
    var recupLogin = $("#fieldLogin").val();
    var recupPass = $("#fieldPassword").val();
    var recupRole = $("#fieldRole").val();
    
    var prenom = $("#fieldFirstName").val();
    var nom = $("#fieldName").val();
    var mail = $("#fieldMail").val();
    console.log("prenom --> "+prenom);
    console.log("nom --> "+nom);
    console.log("mail --> "+mail);

    var fcjson='{"login": "'+recupLogin+'","password": "'+recupPass+'","nom": "'+nom+'","prenom": "'+prenom+'","mail": "'+mail+'","role": "'+recupRole+'"}'

    $.ajax({
            type: 'put',
            data: fcjson,
            contentType: "application/json; charset=utf-8",
            url: "./utilisateur",
            headers: 
            {
                "login":recupLogin,
                "password":recupPass
            }, 
            }).done(function(){location.reload()});
        console.log(fcjson+" ... creation liste");
}


