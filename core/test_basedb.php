<?php

require_once __DIR__ . '/vendor/autoload.php';

use bapXdb\Bapx\BaseDB;
use Utopia\System\System;

// Mock environment variables for testing if not set
if (!System::getEnv('_APP_DB_HOST')) {
    putenv('_APP_DB_HOST=localhost');
    putenv('_APP_DB_PORT=5432');
    putenv('_APP_DB_USER=postgres');
    putenv('_APP_DB_PASS=password');
    putenv('_APP_DB_SCHEMA=bapx');
}

$baseDB = new BaseDB();

echo "Testing BAPX Integration...\n";

// 1. Test Identity Mapping
echo "\n1. Testing Identity Mapping:\n";
$data = "Hello, BAPX! This is a test of the identity tensor mapping logic.";
$scalarId = $baseDB->identify($data);
echo "Data: $data\n";
echo "Scalar ID: $scalarId\n";

// 2. Test Project Initialization (PostgreSQL Schema)
echo "\n2. Testing Project Initialization (Schema creation):\n";
$projectSequence = "test_123";
try {
    $success = $baseDB->initProject($projectSequence);
    echo "Schema initialization for project sequence '$projectSequence': " . ($success ? "SUCCESS" : "FAILED") . "\n";
} catch (\Exception $e) {
    echo "Schema initialization FAILED: " . $e->getMessage() . "\n";
    echo "Note: This test requires a running PostgreSQL instance.\n";
}

// 3. Test Memory Storage
echo "\n3. Testing Memory Storage:\n";
try {
    $userId = "user_456";
    $content = "Important context for AGI";
    $score = 0.95;
    $success = $baseDB->storeMemory($projectSequence, $userId, $content, $score);
    echo "Memory storage: " . ($success ? "SUCCESS" : "FAILED") . "\n";
    
    $memories = $baseDB->getTopMemory($projectSequence, $userId, 1);
    echo "Retrieved memory count: " . count($memories) . "\n";
    if (count($memories) > 0) {
        echo "Memory Content: " . $memories[0]['content'] . "\n";
        echo "Memory Score: " . $memories[0]['score'] . "\n";
    }
} catch (\Exception $e) {
    echo "Memory operations FAILED: " . $e->getMessage() . "\n";
}

echo "\nIntegration test complete.\n";
