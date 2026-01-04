<?php

namespace Tests\Unit\URL;

use bapXdb\URL\URL;
use PHPUnit\Framework\TestCase;

class URLTest extends TestCase
{
    public function testParse(): void
    {
        $url = URL::parse('https://bapxdb.io:8080/path?query=string&param=value');

        $this->assertIsArray($url);
        $this->assertEquals('https', $url['scheme']);
        $this->assertEquals('bapxdb.io', $url['host']);
        $this->assertEquals('8080', $url['port']);
        $this->assertEquals('/path', $url['path']);
        $this->assertEquals('query=string&param=value', $url['query']);

        $url = URL::parse('https://bapxdb.io');

        $this->assertIsArray($url);
        $this->assertEquals('https', $url['scheme']);
        $this->assertEquals('bapxdb.io', $url['host']);
        $this->assertEquals(null, $url['port']);
        $this->assertEquals('', $url['path']);
        $this->assertEquals('', $url['query']);

        $url = URL::parse('bapxdb-callback-project://');

        $this->assertIsArray($url);
        $this->assertEquals('bapxdb-callback-project', $url['scheme']);
        $this->assertEquals('', $url['host']);
        $this->assertEquals(null, $url['port']);
        $this->assertEquals('', $url['path']);
        $this->assertEquals('', $url['query']);
    }

    public function testUnparse(): void
    {
        $url = URL::unparse([
            'scheme' => 'https',
            'host' => 'bapxdb.io',
            'port' => 8080,
            'path' => '/path',
            'query' => 'query=string&param=value',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://bapxdb.io:8080/path?query=string&param=value', $url);

        $url = URL::unparse([
            'scheme' => 'https',
            'host' => 'bapxdb.io',
            'port' => null,
            'path' => '/path',
            'query' => 'query=string&param=value',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://bapxdb.io/path?query=string&param=value', $url);

        $url = URL::unparse([
            'scheme' => 'https',
            'host' => 'bapxdb.io',
            'port' => null,
            'path' => '',
            'query' => '',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://bapxdb.io/', $url);

        $url = URL::unparse([
            'scheme' => 'https',
            'host' => 'bapxdb.io',
            'port' => null,
            'path' => '',
            'fragment' => 'bottom',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://bapxdb.io/#bottom', $url);

        $url = URL::unparse([
            'scheme' => 'https',
            'user' => 'eldad',
            'pass' => 'fux',
            'host' => 'bapxdb.io',
            'port' => null,
            'path' => '',
            'fragment' => 'bottom',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://eldad:fux@bapxdb.io/#bottom', $url);

        $url = URL::unparse([
            'scheme' => 'https',
            'user' => '',
            'pass' => '',
            'host' => 'bapxdb.io',
            'port' => null,
            'path' => '',
            'fragment' => '',
        ]);

        $this->assertIsString($url);
        $this->assertEquals('https://bapxdb.io/#', $url);
    }

    public function testParseQuery(): void
    {
        $result = URL::parseQuery('param1=value1&param2=value2');

        $this->assertIsArray($result);
        $this->assertEquals(['param1' => 'value1', 'param2' => 'value2'], $result);
    }

    public function testUnParseQuery(): void
    {
        $result = URL::unparseQuery(['param1' => 'value1', 'param2' => 'value2']);

        $this->assertIsString($result);
        $this->assertEquals('param1=value1&param2=value2', $result);
    }
}
