<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class Language extends Model
{
    public function __construct()
    {
        $this
            ->addRule('name', [
                'type' => self::TYPE_STRING,
                'description' => 'Language name.',
                'default' => '',
                'example' => 'Italian',
            ])
            ->addRule('code', [
                'type' => self::TYPE_STRING,
                'description' => 'Language two-character ISO 639-1 codes.',
                'default' => '',
                'example' => 'it',
            ])
            ->addRule('nativeName', [
                'type' => self::TYPE_STRING,
                'description' => 'Language native name.',
                'default' => '',
                'example' => 'Italiano',
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
        return 'Language';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_LANGUAGE;
    }
}
