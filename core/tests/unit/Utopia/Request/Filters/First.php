<?php

namespace Tests\Unit\Utopia\Request\Filters;

use bapXdb\Utopia\Request\Filter;

class First extends Filter
{
    public function parse(array $content, string $model): array
    {
        if ($model === 'namespace.method') {
            $content['first'] = true;
            $content['second'] = false;
            $content['removed'] = true;
        }

        return $content;
    }
}
