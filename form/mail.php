<?php

switch ($_POST['call']){case 1: sendmail(); break;}


function email_tpl($mail){
  	
return <<<EOT
Имя:         {$mail['name']}
Телефон:     {$mail['tel']}
Взрослых:    {$mail['adult']}
Детей:       {$mail['child']}
Дата заезда: {$mail['date1']}
Дата выезда: {$mail['date2']}
Отправлено с: {$mail['sender']}
EOT;
}


function sendmail(){
	
	$FIELDS  = array('name', 'tel', 'adult', 'child', 'date1', 'date2', 'sender');
	$EMAILS  = array($_POST['mailTo'], $_POST['mirror']);
	$SUBJECT = 'Заявка на бронирование';
	

	if (isset($_POST) && !empty($_POST))
	{
		foreach($FIELDS as $field)
		{
			if (!empty($_POST[$field])) $mail[$field] = $_POST[$field]; else $mail[$field] = 'Нет данных';
		}
		
		foreach($EMAILS as $email) 
		{
			$send = mail($email, $SUBJECT, email_tpl($mail), "Content-type: text/plain; charset=utf-8");
		}
		
		if(!!$send) echo 'good';
	}
}

?>