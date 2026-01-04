<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class Branch extends Model
{
    public function __construct()
    {
        $this
            ->addRule('name', [
                'type' => self::TYPE_STRING,
                'description' => 'Branch Name.',
                'default' => '',
                'example' => 'main',
            ]);
    }

    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Branch';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_BRANCH;
    }
}
