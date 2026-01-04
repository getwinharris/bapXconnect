<?php

namespace bapXdb\Utopia\Response\Model;

use bapXdb\Auth\MFA\Type;
use bapXdb\Utopia\Response;
use bapXdb\Utopia\Response\Model;

class MFAFactors extends Model
{
    public function __construct()
    {
        $this
            ->addRule(Type::TOTP, [
                'type' => self::TYPE_BOOLEAN,
                'description' => 'Can TOTP be used for MFA challenge for this account.',
                'default' => false,
                'example' => true
            ])
            ->addRule(Type::PHONE, [
                'type' => self::TYPE_BOOLEAN,
                'description' => 'Can phone (SMS) be used for MFA challenge for this account.',
                'default' => false,
                'example' => true
            ])
            ->addRule(Type::EMAIL, [
                'type' => self::TYPE_BOOLEAN,
                'description' => 'Can email be used for MFA challenge for this account.',
                'default' => false,
                'example' => true
            ])
            ->addRule(Type::RECOVERY_CODE, [
                'type' => self::TYPE_BOOLEAN,
                'description' => 'Can recovery code be used for MFA challenge for this account.',
                'default' => false,
                'example' => true
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
        return 'MFAFactors';
    }

    /**
     * Get Type
     *
     * @return string
     */
    public function getType(): string
    {
        return Response::MODEL_MFA_FACTORS;
    }
}
