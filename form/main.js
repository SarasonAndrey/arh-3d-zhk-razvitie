function send(){
	
	var field  = $("form").serialize();
	
	var krpano = document.getElementById("krpanoSWFObject");
	
	var sender = krpano.get('settings.sender');
	var mailTo = krpano.get('settings.mailTo');
	var mirror = krpano.get('settings.mirror');
	
	
	$.ajax({
		type:    "POST",
		url:     "form/mail.php",
		data:    field + "&call=1&sender=" +sender+ "&mailTo=" +mailTo+ "&mirror=" +mirror,
		success: function(feedback) {
			
			if(feedback == 'good'){
				
				krpano.call('togg-order(); sendSuccess()'); 
				$("form").trigger('reset');
			}
		}
	})
}

jQuery(function($){
   $("#phone").mask("+7 (999) 999-99-99");
});