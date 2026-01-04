<?php

namespace Tests\Unit\Utopia;

use bapXdb\Utopia\Response\Model;

class Lists extends Model
{
    public function __construct()
    {
        $this
            ->addRule('singles', [
                'type' => 'single',
                'default' => '',
                'array' => true
            ]);
    }

    public function getName(): string
    {
        return 'Lists';
    }

    public function getType(): string
    {
        return 'lists';
    }
}
