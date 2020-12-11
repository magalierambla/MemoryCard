$('#inscription').on('submit', function(e){
	var error = true;
	if ($('#validationServerPassword').val() != '' && $('#validationServerPassword').val() != $('#validationServerConfirm').val()) {
		$('.has_improper').html("");
		$('.has_improper').html(`
			<div class="alert alert-warning alert-dismissible fade show mx-5 mt-1" role="alert">
				<strong>Le mot de passe saisi n'est pas conforme à sa confirmation !</strong>
				<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); return false;">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			`);
		error = false;
	}
	
	var fields = $(this).find('.check_validate');
	fields.each(function(index, element){
		if ($(element).val() == '') {
			$(element).addClass('wrong');
			error = false;
		}
	});

	if (!error) {
		return false;
	}
});

function getData() {
	var data = {
		key: "value",
		login: $("#validationServerLogin").val(),
		password: $("#validationServerPassword").val(),
		nom: $("#validationServer01").val(),
		prenom: $("#validationServer02").val(),
		mail: $("#validationServerEmail").val(),
		role: "admin"
	};
	
	// JSON.parse(data);
	// console.log(data);
	return data;
}

function postUser(e)
{
	e.preventDefault();
	var data = getData();
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/utilisateur",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data)
	}).done(function(){
		window.location.href = "http://localhost:8080";
	});
}

// $('#loginButton').on('click', function(){
// 	console.log("loginbutton clicked");
	// var data = getData();
	// $.ajax({
	// 	type: "post",
	// 	data: JSON.stringify(data),
	// 	contentType: "application/json; charset=utf-8",
	// 	url: "http://localhost:8080/utilisateur"
	// })
// })


