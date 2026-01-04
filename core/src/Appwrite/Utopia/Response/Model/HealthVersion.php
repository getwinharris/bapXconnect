<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class HealthVersion extends Model
{
    public function __construct()
    {
        $this
            ->addRule('version', [
                'type' => self::TYPE_STRING,
                'description' => 'Version of the bapXdb instance.',
                'default' => '',
                'example' => '0.11.0',
            ])
        ;
    }

    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Health Version';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_HEALTH_VERSION;
    }
}
