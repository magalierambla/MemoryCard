// SESSION
 var recupLogin = sessionStorage.getItem('login'); 
 var recupPass = sessionStorage.getItem('password'); 
 console.log(recupLogin); 
 console.log(recupPass); 
 //FIN SESSION

var card=undefined;
var incremente=0;


console.log("loaded"); //Vérification que le fichier JS est chargé.
var data=undefined;
var newDeck=undefined;


	console.log("loaded "+recupLogin+" "+recupPass);
	console.log($("body").find("#nomListe").val());
	$.ajax(
		{
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
			affichage(data);
		});
	
	//console.log("..."+data);


//$.ajax({url: "https://private-c0f0f-flash21.apiary-mock.com/decks"}).done(function(data) {affichage(data)});


/////////////////////////////////////////////////////////////AFFICHAGE FORMULAIRE AJOUT CARTE//////////////////////////////////////////////////////////////

var strForm = $("#flashcard").html();
$("#flashcard").html(strForm+"<h4>FlashCard "+(incremente+1)+" :</h4>"+
							"<div id='formCard"+incremente+"'>"+
							"<input type='text' class='inputCreaDeck2' id='nomCard"+incremente+"' placeholder='Entrez le nom de la carte'>"+
							"<input type='text' class='inputCreaDeck2' id='tradCard"+incremente+"' placeholder='Entrez la définition'>"+
							"<img id='urlCard"+incremente+"' src=''>"+
							"<input class='btn-creaDeck' type='button' value='Ajouter' onclick='ajoutCard()'>"+
							"</div>"+
						"<hr />");

/////////////////////////////////////////////////////////////////AFFICHAGE PROPOSITION CARTE/////////////////////////////////////////////////////////////
function affichage(data) // afficher les données.
{
	$("#main").html("");
	//dataPerm = data;
	console.log($(".list"));
/*
	$("#ChoixCarte").css({	
							"width":"100%",
	  						"overflow-x":"scroll",
	  						"scrollbar-color":"lightgrey grey",
							"display":"inline-block",
							"white-space":"nowrap !important;",
							"line-height":"0"
	  					});
	
	$(".flashcard").css({
						"display":"inline"
					});
*/
	var nbCarte = 0;
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
var imagesCards = document.querySelectorAll("#ChoixCarte img");
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






}

////////////////////////////////////////////FONCTION PERMETTANT DE CREER UNE CARTE DANS UNE LISTE///////////////////////////////////////////////


function pushCreatedCard()
{

		//newDeck = '{"nom":"'+nomListe+'","cards":[{"nom":"'+nomCard+'","definition":"'+tradCard+'","image":"'+urlCard+'"}]}';
		//console.log(newDeck);
		var nomDuDeck = $("#nomListe").val();
		console.log(nomDuDeck);
		var fcjson='{"nom":"'+nomDuDeck+'","cards":[';
		for(var j=0; j<=incremente; j++)
		{
			console.log("boucle FOR");
			if($("#nomCard"+j).length)
			{
				console.log("Création Carte");
				if(j!=incremente)
				{
					console.log("creer IF");
					fcjson+='{"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"},';
				}
				else
				{
					console.log("creer ELSE");
					fcjson+='{"nom":"'+$("#nomCard"+j).val()+'","definition":"'+$("#tradCard"+j).val()+'","image":"'+$("#urlCard"+j).attr('src')+'"}';
				}				
			}
			else
			{
				console.log("traitement carte Existante");
				for(x=0;x<=card.length-1; x++)
				{				
				    if($("#urlCardExistante"+x).hasClass("cardChoisie"))
				    {
				    	console.log("Carte Existante");
				        if(j!=incremente)
						{
							console.log("Carte Found IF");
							fcjson+='{"id":"'+$("#idCardExistante"+x).val()+'","nom":"'+$("#nomCardExistante"+x).html()+'","definition":"'+$("#tradCardExistante"+x).val()+'","image":"'+$("#urlCardExistante"+x).attr("src")+'"},';
							j++;
						}
						else
						{
							console.log("Carte Found Else");
							fcjson+='{"id":"'+$("#idCardExistante"+x).val()+'","nom":"'+$("#nomCardExistante"+x).html()+'","definition":"'+$("#tradCardExistante"+x).val()+'","image":"'+$("#urlCardExistante"+x).attr("src")+'"}';
						}		
				    }
				    else
				    {
				        console.log("aucune carte restante");
				    }
				}

			}
			
		}
		fcjson+=']}';
		console.log(fcjson);
		/*newDeck.push({
								nom: nomListe,
								cards: 
								[
									"nom: "+nomCard+
									", definition: "+tradCard+
									", image: "+urlCard+
								]		
							});
		console.log(newDeck);
		*/
		$.ajax({
			type: 'post',
			data: fcjson,
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/deck",
			headers: 
			{
				"login":recupLogin,
				"password":recupPass
			}, 
			}).done(function(){
				window.location.href = "./mes-decks.html";
			});
	console.log(fcjson+" ... creation liste");
}

////////////////////////////////////////////////////////////////AJOUT FORMULAIRE CARTE/////////////////////////////////////////////////

function ajoutCard()
{

	var nomCard = document.getElementById("nomCard"+incremente).value;
	var tradCard = document.getElementById("tradCard"+incremente).value;
	var urlCard = document.getElementById("urlCard"+incremente).src;
	var nomListe = document.getElementById("nomListe").value;

	if(nomListe=="" || nomCard=="" || tradCard=="" || urlCard=="http://localhost:8080/creationListe.html") {
		alert("Veuillez remplir les champs.");
		console.log("pushCreatedCard_OFF");
	}
	else
	{
		console.log("pushCreatedCard_OK");
		incremente=incremente+1;
		//var strForm = $("#card").html();
		$("#flashcard").append("<h4>FlashCard "+(incremente+1)+" :</h4>"+
									"<div id='formCard"+incremente+"'>"+
									"<input type='text' class='inputCreaDeck2' id='nomCard"+incremente+"' placeholder='Entrez le nom de la carte'>"+
									"<input type='text' class='inputCreaDeck2' id='tradCard"+incremente+"' placeholder='Entrez la définition'>"+
									"<img id='urlCard"+incremente+"' src=''>"+
									"<input class='btn-creaDeck' type='button' value='Ajouter' onclick='ajoutCard()'>"+
									//"<form id='unsplash'><h2>Choisissez votre image</h2><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button type='submit'>OK</button></form><div id='loading'>Loading...</div><div id='photos'></div>"+
									"</div>"+
								"<hr />");
	}

	
//	console.log(i);
}
////////////////////////////////////////////////////////////UNSPLASH//////////////////////////////////////////////////////////////////////

function unsplash()
{
	$("#flashcard").append("<form id='unsplash-fc'><h4>Choisissez votre image</h4><input type='text' id='text' placeholder='Tapez votre recherche ici' /><button type='submit'>OK</button></form><div id='loading'>Loading...</div><div id='photos'></div>");  					
    					
}
/*
////////////////////////////////////////////FONCTION PERMETTANT D'AJOUTER UNE CARTE DANS UNE LISTE///////////////////////////////////////////////
function pushCard()
{
	//for(x=0;x<=card.length-1; x++)
	//{	
		//if(document.getElementById("id"+x).checked == true)
		//{			
			i=i+1;
			console.log("checked ... "+i);
		//}
	//}
}
*/
////////////////////////////////////////////FONCTION PERMETTANT DE CREER UNE LISTE ET SES CARTES///////////////////////////////////////////////

function creationList()
{
	$.ajax({type: 'post',
			data: newDeck,
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/deck",
			headers: 
			{
				"login":recupLogin,
				"password":recupPass
			}, 
			}).done(function(){location.reload();});
	console.log(newDeck+" ... creation liste");
}

/////////////////////////////////////////////////////////////////////UNSPLASH.JS///////////////////////////////////////////////////////////////////

const form = document.querySelector('form');
const photos = document.querySelector('#photos');
const loading = document.querySelector('#loading');
var choixImage = "";

form.addEventListener('submit', function (event) {
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




