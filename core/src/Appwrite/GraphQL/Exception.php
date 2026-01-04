<?php

namespace bapXdb\GraphQL;

use bapXdb\Extend\Exception as bapXdbException;
use GraphQL\Error\ClientAware;

class Exception extends bapXdbException implements ClientAware
{
    public function isClientSafe(): bool
    {
        return true;
    }

    public function getCategory(): string
    {
        return 'bapxdb';
    }
}
