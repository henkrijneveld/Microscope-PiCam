<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

namespace api;

class Config
{
    public static function getMemPath()
    {
        return("/dev/shm/gemcam");
    }

    // gets the directory of the index.php
    public static function getUriDir()
    {
        return(substr(dirname(__FILE__), 0, -1 * strlen("php/api")));
    }

    public static function getMediaDir()
    {
        return Config::getUriDir()."media";
    }


    public static function getFifoFile()
    {
        return Config::getUriDir()."/system/FIFO";
    }

    public static function getGemcamPath()
		{
			$len = -1 * strlen("/php/api");
			return substr(dirname(__FILE__), 0, $len);
		}
}


