<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class Headers extends Model
{
    public function __construct()
    {
        $this
            ->addRule('name', [
                'type' => self::TYPE_STRING,
                'description' => 'Header name.',
                'default' => '',
                'example' => 'Content-Type',
            ])
            ->addRule('value', [
                'type' => self::TYPE_STRING,
                'description' => 'Header value.',
                'default' => '',
                'example' => 'application/json',
            ]);
    }

    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Headers';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_HEADERS;
    }
}
