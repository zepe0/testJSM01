<?php function generateObjectId()
{
    $timestamp = dechex(time());
    $random = bin2hex(random_bytes(8));
    return $timestamp . substr($random, 0, 16);
}
?>