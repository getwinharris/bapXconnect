<?php

namespace bapXdb\Auth\OAuth2;

class TradeshiftBox extends Tradeshift
{
    protected string $environment = 'sandbox';

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'tradeshiftBox';
    }
}
