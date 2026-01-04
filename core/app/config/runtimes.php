<?php

/**
 * List of bapXdb Functions supported runtimes
 */

use bapXdb\Runtimes\Runtimes;

return (new Runtimes('v5'))->getAll();
