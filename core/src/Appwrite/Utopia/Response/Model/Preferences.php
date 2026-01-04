<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;

class Preferences extends Any
{
    /**
     * Get Name
     *
     * @return string
     */
    public function getName(): string
    {
        return 'Preferences';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_PREFERENCES;
    }

    public function getSampleData(): array
    {
        return [
            'language' => 'en',
            'timezone' => 'UTC',
            'darkTheme' => true,
        ];
    }
}
