<?php

namespace bapXdb\Tests;

/**
 * Allows test methods to be retried if they fail.
 *
 * Requires that the test class extends {@see TestCase} and has trait {@see Retryable}.
 */
#[\Attribute(\Attribute::TARGET_METHOD)]
class Retry
{
    public function __construct(protected int $count = 1)
    {
    }
}
