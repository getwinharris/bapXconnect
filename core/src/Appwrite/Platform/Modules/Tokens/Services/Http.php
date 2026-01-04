<?php

namespace bapXdb\Platform\Modules\Tokens\Services;

use bapXdb\Platform\Modules\Tokens\Http\Tokens\Buckets\Files\Create as CreateFileToken;
use bapXdb\Platform\Modules\Tokens\Http\Tokens\Buckets\Files\XList as ListFileTokens;
use bapXdb\Platform\Modules\Tokens\Http\Tokens\Delete as DeleteToken;
use bapXdb\Platform\Modules\Tokens\Http\Tokens\Get as GetToken;
use bapXdb\Platform\Modules\Tokens\Http\Tokens\Update as UpdateToken;
use Utopia\Platform\Service;

class Http extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_HTTP;
        $this
            ->addAction(CreateFileToken::getName(), new CreateFileToken())
            ->addAction(GetToken::getName(), new GetToken())
            ->addAction(ListFileTokens::getName(), new ListFileTokens())
            ->addAction(UpdateToken::getName(), new UpdateToken())
            ->addAction(DeleteToken::getName(), new DeleteToken())
        ;

    }
}
