<?php
include_once "../../autoloader.php"; // somewhat clunky, acceptable for the time being

use api\control\RaspiCamControl as CamControl;
use api\Config as Config;

class controlapi
{
	private $cc = null;

	function __construct()
	{
		$this->cc = new CamControl;
	}

	function checkrequestmethod()
	{
		$request_method = strtolower($_SERVER['REQUEST_METHOD']);
		if ($request_method !== 'put')
		{
			$this->error(405, "only PUT implemented");
		}
	}

	function error($code, $reason)
	{
		http_response_code($code);
		die($reason);
	}

	function processcommand()
	{
		$request = file_get_contents("php://input");
		$request = json_decode($request, true);
		if (!array_key_exists("command", $request))
			$this->error(400, "command missing");
		if (method_exists($this, $request["command"])) {
			call_user_func(array($this, $request["command"]), $request);
			echo $request["command"].": OK";
			return;
		}
		$this->error(400, "unknown command: ".$request["command"]);
	}

	private function valuecheck($request)
	{
		if (!array_key_exists("value", $request))
			$this->error(400, "value missing");
	}

	function restart($request)
	{
		$output = array();
		chdir(Config::getGemcamPath());
		if (exec("bash ".Config::getGemcamPath()."/start.sh", $output, $result) !== false) {
			if (!$result) {
				return;
			}
			$this->error(502, "Error restart: ".implode(', ', $output));
		}
		$this->error(500, "Error restart: start.sh could not run completely (wrong directories?)");
	}

	function shutdown($request)
	{
		$output = array();
		chdir(Config::getGemcamPath());
		if (exec("bash ".Config::getGemcamPath()."/shutdown.sh", $output, $result) !== false) {
			if (!$result) {
				return;
			}
			$this->error(502, "Error shutdown: ".implode(', ', $output));
		}
		$this->error(500, "Error shutdown: shutdown.sh could not run completely (wrong directories?)");
	}


	function setbrightness($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setBrightness($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setcontrast($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setContrast($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setsaturation($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setSaturation($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setsharpness($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setSharpness($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setwhitebalance($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setWhiteBalance($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);

		// whitebalance can mess with blue and red channels. So use cached values when available
		if ($request["value"] === "off") {
			$red = $this->getchannel("red");
			$blue = $this->getchannel("blue");
			if ($red >= 0 && $blue >= 0) {
				$this->cc->setchannels($red, $blue);
			}
		}
	}

	function setexposuremode($request)
	{
		$this->valuecheck($request);
		if (!$this->cc->setExposureMode($request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setredchannel($request)
	{
		$this->valuecheck($request);
		$this->setchannel("red", $request["value"]);
		$blue = $this->getchannel("blue");

		if ($blue < 0 || !$this->cc->setchannels($request["value"], $blue))
			$this->error(400, "error in ".__FUNCTION__);
	}

	function setbluechannel($request)
	{
		$this->valuecheck($request);
		$this->setchannel("blue", $request["value"]);
		$red = $this->getchannel("red");

		if ($red < 0 || !$this->cc->setchannels($red, $request["value"]))
			$this->error(400, "error in ".__FUNCTION__);
	}


	// functions to let the client independently set the red and blue channel
	// values are cached in the memorymapped transient directory
	// channel changes will only have effect are both set
	// so client has to update both values at start
	private function setchannel($channelname, $value)
	{
		$fp = fopen(Config::getMemPath()."/".$channelname, "w");
		if (!$fp)
			$this->error(423, "error setting cache for ".$channelname);

		fwrite($fp, $value);
		fclose($fp);
	}

	// kludge: value -1: error will die.
	private function getchannel($channelname)
	{
		if (!file_exists(Config::getMemPath()."/".$channelname))
			return -1;
		$fp = fopen(Config::getMemPath()."/".$channelname, "r");
		if ($fp) {
			$value = intval(fread($fp,10));
			fclose($fp);
			return $value;
		}
		$this->error(423, "error setting cache for ".$channelname);
		return -1;
	}
}

$api = new controlapi;
$api->checkrequestmethod();
$api->processcommand();

