<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

namespace api\control;

use api\Config as Config;

// @TODO: Move all magic values to a configuration file.
// for the moment the default for RPI_... is used

class RaspiCamControl
{
	private function send(string $command): bool
	{
		$pipe = fopen(Config::getFifoFile(), "w");
		if ($pipe) {
			fwrite($pipe, $command . "\n");
			fclose($pipe);
			return true;
		}
		return false;
	}

	public function takeImage(): bool
	{
        $shutterspeed = 0;
        $expmode = $this->getchannel("exposuremode");
        if ($expmode != -1 && substr($expmode, 0, 3) == "off") {
            $shutterspeed = $this->getchannel("shutterspeed");
            if ($shutterspeed == -1) {
                $shutterspeed = 0;
            } else {
                $shutterspeed = intval($shutterspeed);
            }
        }

		$succes = $this->send("im ".strval($shutterspeed));
		sleep(1);
		return $succes;
	}

	public function setBrightness(int $value): bool
	{
		if (($value  < 0) || ($value > 100))
			return false;

		$cm = "br ".strval($value);

		return $this->send($cm);
	}

	public function setExposureCompensation(int $value): bool
	{
		if (($value  < -10) || ($value > 10))
			return false;

		$cm = "ec ".strval($value);

		return $this->send($cm);
	}

	public function setSharpness(int $value): bool
	{
		if (($value  < -100) || ($value > 100))
			return false;

		$cm = "sh ".strval($value);

		return $this->send($cm);
	}

	public function setContrast(int $value): bool
	{
		if (($value  < -100) || ($value > 100))
			return false;

		$cm = "co ".strval($value);

		return $this->send($cm);
	}

    public function setShutterSpeed(int $value): bool
    {
        if (($value  < 0) || ($value > 20))
            return false;

        if ($value > 0) {
            $cm = "is 200";
            $this->send($cm);
            sleep(1);
        }

        $cm = "ss ".strval($value)."000000";

        return $this->send($cm);
    }

    public function setSaturation(int $value): bool
	{
		if (($value  < -100) || ($value > 100))
			return false;

		$cm = "sa ".strval($value);

		return $this->send($cm);
	}

	public function setchannels(int $red, int $blue): bool
	{
		if (($red < 0) || ($red > 800))
			return false;

		if (($blue < 0) || ($blue > 800))
			return false;

		$cm = "ag ".strval($red)." ".strval($blue);

		return $this->send($cm);
	}

	public function setWhiteBalance(String $value): bool
	{
		if (!in_array($value, ['off', 'auto', 'sun', 'cloudy', 'shade', 'tungsten', 'fluorescent', 'incandescent', 'flash', 'horizon'])) {
			return false;
		}

		$cm = "wb ".$value;

		if (!$this->send($cm)) return false;
		sleep(1); // white balance needs time to settle
		return true;
	}

	public function setExposureMode(String $value): bool
	{
		if (!in_array($value, [ "off", "auto", "night", "nightpreview", "backlight",
								"spotlight", "sports", "snow", "beach", "verylong",
								"fixedfps", "antishake", "fireworks"])) {
			return false;
		}

		$cm = "em ".$value;

		if (!$this->send($cm)) return false;
		sleep(1); // exposure mode may need time to settle
		return true;
	}

    // kludge: value -1: error will die.
    private function getchannel($channelname)
    {
        if (!file_exists(Config::getMemPath()."/".$channelname))
            return -1;
        $fp = fopen(Config::getMemPath()."/".$channelname, "r");
        if ($fp) {
            $value = fread($fp,10);
            fclose($fp);
            return $value;
        }
        return -1;
    }
}

