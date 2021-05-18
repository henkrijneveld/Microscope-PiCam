<?php
// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

namespace api\picture;

interface ProviderInterface {
	public function getStreamImage();

	public function getShotImage($filename);
}
