<?php

require_once 'MailSubmit.php';

if ( ! class_exists ( 'MailSubmit' ) ) {
	throw new Exception ( 'Error, class not found!', 1 );
}

if ( ! $_POST ) {
	throw new Exception ( 'Error, you can\'t send an mail!', 1 );
}

$valid = function ( $args ) {
	foreach ( $args as $key => $v ) {
		if ( empty ( $key ) ) {
			throw new Exception ( 'Error, invalid arguments!', 1 );
		}
	}

	return false;
};

if ( ! $valid ( $_POST ) ) {
	$mail = new MailSubmit;
	$mail->to = "csmatheus10@gmail.com";

	foreach ( $_POST as $key => $v ) {
		$key = trim ( $key );

		$mail->{$key} = trim ( $v );
	}

	if ( $mail->send () ) {
		header ( 'Location: ../index.html' );
	}
}
