<?php
spl_autoload_register(function ($className) {
    $base = __DIR__;
    $className = $base."/".str_replace("\\", DIRECTORY_SEPARATOR, $className).".php";
    include $className;
});
