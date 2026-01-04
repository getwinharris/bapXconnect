<?php

namespace bapXdb\Platform\Modules\Proxy\Http\Rules;

use bapXdb\Event\Delete as DeleteEvent;
use bapXdb\Event\Event;
use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Database;
use Utopia\Database\Document;
use Utopia\Database\Validator\UID;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class Delete extends Action
{
    use HTTP;

    public static function getName()
    {
        return 'deleteRule';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_DELETE)
            ->setHttpPath('/v1/proxy/rules/:ruleId')
            ->desc('Delete rule')
            ->groups(['api', 'proxy'])
            ->label('scope', 'rules.write')
            ->label('event', 'rules.[ruleId].delete')
            ->label('audits.event', 'rules.delete')
            ->label('audits.resource', 'rule/{request.ruleId}')
            ->label('sdk', new Method(
                namespace: 'proxy',
                group: null,
                name: 'deleteRule',
                description: <<<EOT
                Delete a proxy rule by its unique ID.
                EOT,
                auth: [AuthType::ADMIN],
                responses: [
                    new SDKResponse(
                        code: Response::STATUS_CODE_NOCONTENT,
                        model: Response::MODEL_NONE,
                    )
                ],
                contentType: ContentType::NONE
            ))
            ->param('ruleId', '', new UID(), 'Rule ID.')
            ->inject('response')
            ->inject('project')
            ->inject('dbForPlatform')
            ->inject('queueForDeletes')
            ->inject('queueForEvents')
            ->callback($this->action(...));
    }

    public function action(
        string $ruleId,
        Response $response,
        Document $project,
        Database $dbForPlatform,
        DeleteEvent $queueForDeletes,
        Event $queueForEvents
    ) {
        $rule = $dbForPlatform->getDocument('rules', $ruleId);

        if ($rule->isEmpty() || $rule->getAttribute('projectInternalId') !== $project->getSequence()) {
            throw new Exception(Exception::RULE_NOT_FOUND);
        }

        $dbForPlatform->deleteDocument('rules', $rule->getId());

        $queueForDeletes
            ->setType(DELETE_TYPE_DOCUMENT)
            ->setDocument($rule);

        $queueForEvents->setParam('ruleId', $rule->getId());

        $response->noContent();
    }
}
