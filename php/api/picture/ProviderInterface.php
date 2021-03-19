<?php
namespace api\picture;

interface ProviderInterface {
	public function getStreamImage();

	public function getShotImage($filename);
}
