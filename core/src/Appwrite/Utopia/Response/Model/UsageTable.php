<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class UsageTable extends Model
{
    public function __construct()
    {
        $this
            ->addRule('range', [
                'type' => self::TYPE_STRING,
                'description' => 'Time range of the usage stats.',
                'default' => '',
                'example' => '30d',
            ])
            ->addRule('rowsTotal', [
                'type' => self::TYPE_INTEGER,
                'description' => 'Total aggregated number of of rows.',
                'default' => 0,
                'example' => 0,
            ])
            ->addRule('rows', [
                'type' => Response::MODEL_METRIC,
                'description' => 'Aggregated  number of rows per period.',
                'default' => [],
                'example' => [],
                'array' => true
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
        return 'UsageTable';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_USAGE_TABLE;
    }
}
