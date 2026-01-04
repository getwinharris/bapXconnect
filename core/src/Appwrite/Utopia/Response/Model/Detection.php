<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

abstract class Detection extends Model
{
    public function __construct()
    {
        $this
            ->addRule('variables', [
                'type' => Response::MODEL_DETECTION_VARIABLE,
                'description' => 'Environment variables found in .env files',
                'required' => false,
                'default' => [],
                'example' => new \stdClass(),
                'array' => true,
            ]);
    }
}
