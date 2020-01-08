<?php

/**
 * @ BASIC EMAIL
 *
**/
class MailSubmit
{
	private $to;
	private $from;
	private $name;
	private $subject;
	private $message;


	public function __construct ()
	{
		return;
	}

	public function __get ( $var )
	{
		return $this->{$var};
	}

	public function __set ( $var, $value )
	{
			$this->{$var} = $value;

		return;
	}


	public function send ()
	{
		if ( $this->_is_null () ) {
			throw new Exception ( 'Error, the configuration is invalid!', 1 );
		}

		$data = date ( 'd/m/Y H:i:s' );
		$contents = "
			De: {$this->from}
			<br />
			Nome: {$this->name}
			<br />
			Assunto: {$this->subject}
			<br />
			<br />
			Message: {$this->message}
			<br />
			<br />
			Data: {$data}
		";

		$headers = "De: {$this->from}";

			mail (
				$this->to, $this->subject, $contents, $headers
			);

		return true;
	}

	private function _is_null ()
	{
		foreach ( get_object_vars ( $this ) as $arg ) {
			if ( empty ( $arg ) ) {
				return true;
			}
		}

		return false;
	}
}
