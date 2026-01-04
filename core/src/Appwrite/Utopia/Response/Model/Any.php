<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class Any extends Model
{
    /**
     * @var bool
     */
    protected bool $any = true;

    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Any';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_ANY;
    }

    /**
     * Get sample data
     *
     * @return array
     */
    public function getSampleData(): array
    {
        return [];
    }
}
