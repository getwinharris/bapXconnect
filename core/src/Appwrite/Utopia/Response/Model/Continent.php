<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class Continent extends Model
{
    public function __construct()
    {
        $this
            ->addRule('name', [
                'type' => self::TYPE_STRING,
                'description' => 'Continent name.',
                'default' => '',
                'example' => 'Europe',
            ])
            ->addRule('code', [
                'type' => self::TYPE_STRING,
                'description' => 'Continent two letter code.',
                'default' => '',
                'example' => 'EU',
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
        return 'Continent';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_CONTINENT;
    }
}
