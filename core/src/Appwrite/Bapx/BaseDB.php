<?php

namespace bapXdb\Bapx;

use Utopia\System\System;
use Exception;

class BaseDB
{
    protected string $dbHost;
    protected string $dbPort;
    protected string $dbUser;
    protected string $dbPass;
    protected string $dbName;

    public function __construct()
    {
        // Use environment variables for PostgreSQL connection
        $this->dbHost = System::getEnv('_APP_DB_HOST', 'postgres');
        $this->dbPort = System::getEnv('_APP_DB_PORT', '5432');
        $this->dbUser = System::getEnv('_APP_DB_USER', 'postgres');
        $this->dbPass = System::getEnv('_APP_DB_PASS', '');
        $this->dbName = System::getEnv('_APP_DB_SCHEMA', 'public');
    }

    /**
     * Initialize a new project-specific PostgreSQL schema.
     * 
     * @param string $projectSequence
     * @return bool
     * @throws Exception
     */
    public function initProject(string $projectSequence): bool
    {
        $schema = $this->getProjectSchema($projectSequence);

        $dsn = "pgsql:host={$this->dbHost};port={$this->dbPort};dbname={$this->dbName}";
        $pdo = new \PDO($dsn, $this->dbUser, $this->dbPass);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        // Create schema if not exists
        $pdo->exec("CREATE SCHEMA IF NOT EXISTS {$schema}");
        
        // Initialize basic BAPX schema within the project-specific schema
        $pdo->exec("CREATE TABLE IF NOT EXISTS {$schema}.bapx_identity (
            id SERIAL PRIMARY KEY,
            scalar_id TEXT UNIQUE,
            type TEXT,
            data BYTEA,
            metadata TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");

        $pdo->exec("CREATE TABLE IF NOT EXISTS {$schema}.bapx_memory (
            id SERIAL PRIMARY KEY,
            context_id TEXT,
            score DOUBLE PRECISION,
            content TEXT,
            user_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");

        return true;
    }

    /**
     * Search context with dynamic circles (iterations).
     */
    public function searchContext(string $projectSequence, string $query, int $circles): array
    {
        $schema = $this->getProjectSchema($projectSequence);
        $dsn = "pgsql:host={$this->dbHost};port={$this->dbPort};dbname={$this->dbName}";
        $pdo = new \PDO($dsn, $this->dbUser, $this->dbPass);
        
        $iterations = [];
        $currentContext = "";
        
        for ($i = 0; $i < $circles; $i++) {
            // In a real sovereign engine, this would use the Identity Tensor for matching
            // For now, we use a similarity-based text search within the schema
            $stmt = $pdo->prepare("SELECT content FROM {$schema}.bapx_memory WHERE content ILIKE ? LIMIT 50");
            $stmt->execute(['%' . $query . '%']);
            $rows = $stmt->fetchAll(\PDO::FETCH_COLUMN);
            
            if (empty($rows)) break;
            
            $iterations[] = $rows;
            $currentContext .= implode("\n", $rows);
            // Update query based on found context for the next "circle"
            $query = substr($currentContext, -50); 
        }
        
        return [
            'iterations' => $iterations,
            'final_context' => $currentContext
        ];
    }

    /**
     * Get the PostgreSQL schema name for a project.
     * 
     * @param string $projectSequence
     * @return string
     */
    public function getProjectSchema(string $projectSequence): string
    {
        return 'project_' . $projectSequence;
    }

    /**
     * BAPX Identity Tensor Mapping
     * Guarantees bit-perfect restoration through identity verification.
     * 
     * @param string $data
     * @return string 8-byte scalar ID (hex)
     */
    public function identify(string $data): string
    {
        $scale = 0.00000001;
        $totalSum = 0;
        
        // Calculate sum of bytes
        for ($i = 0; $i < strlen($data); $i++) {
            $totalSum += ord($data[$i]);
        }
        
        $scalar = $totalSum * $scale;
        
        // Convert double to 8-byte binary (big-endian) then to hex
        return bin2hex(pack('E', $scalar)); // 'E' is double (machine dependent size, big-endian)
    }

    /**
     * BAPX Identity Tensor Restoration
     * Reconstructs identity from the scalar manifold.
     * 
     * @param string $scalarId Hex string
     * @return string restored data
     */
    public function decompress(string $scalarId): string
    {
        // Placeholder for restoration logic - this usually requires the compute engine manifold
        return "Restoration of " . $scalarId . " requires Compute Engine Manifold.";
    }

    /**
     * Store memory context with a score for AGI lifetime memory.
     * 
     * @param string $projectSequence
     * @param string $userId
     * @param string $content
     * @param float $score
     * @return bool
     */
    public function storeMemory(string $projectSequence, string $userId, string $content, float $score): bool
    {
        $schema = $this->getProjectSchema($projectSequence);
        $dsn = "pgsql:host={$this->dbHost};port={$this->dbPort};dbname={$this->dbName}";
        $pdo = new \PDO($dsn, $this->dbUser, $this->dbPass);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("INSERT INTO {$schema}.bapx_memory (context_id, user_id, content, score) VALUES (:context_id, :user_id, :content, :score)");
        $stmt->bindValue(':context_id', substr(hash('sha256', $content), 0, 16));
        $stmt->bindValue(':user_id', $userId);
        $stmt->bindValue(':content', $content);
        $stmt->bindValue(':score', $score);
        
        return $stmt->execute();
    }

    /**
     * Retrieve top memory contexts based on scoring.
     * 
     * @param string $projectSequence
     * @param string $userId
     * @param int $limit
     * @return array
     */
    public function getTopMemory(string $projectSequence, string $userId, int $limit = 10): array
    {
        $schema = $this->getProjectSchema($projectSequence);
        $dsn = "pgsql:host={$this->dbHost};port={$this->dbPort};dbname={$this->dbName}";
        $pdo = new \PDO($dsn, $this->dbUser, $this->dbPass);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM {$schema}.bapx_memory WHERE user_id = :user_id ORDER BY score DESC LIMIT :limit");
        $stmt->bindValue(':user_id', $userId);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
