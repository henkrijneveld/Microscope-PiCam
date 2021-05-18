<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

spl_autoload_register(function ($className) {
    $base = __DIR__;
    $className = $base."/".str_replace("\\", DIRECTORY_SEPARATOR, $className).".php";
    include $className;
});
