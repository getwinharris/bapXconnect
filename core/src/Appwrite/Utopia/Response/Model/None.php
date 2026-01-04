<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class None extends Model
{
    /**
     * @var bool
     */
    protected bool $none = true;

    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'None';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_NONE;
    }
}
