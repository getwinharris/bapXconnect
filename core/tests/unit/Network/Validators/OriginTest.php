<?php

namespace Tests\Unit\Network\Validators;

use bapXdb\Network\Validator\Origin;
use PHPUnit\Framework\TestCase;

class OriginTest extends TestCase
{
    public function testValues(): void
    {
        $validator = new Origin(
            allowedHostnames: ['bapxdb.io', 'bapxdb.test', 'localhost', 'bapxdb.flutter'],
            allowedSchemes: ['exp', 'bapxdb-callback-123']
        );

        $this->assertEquals(false, $validator->isValid(''));
        $this->assertEquals(false, $validator->isValid('/'));

        $this->assertEquals(true, $validator->isValid('https://localhost'));
        $this->assertEquals(true, $validator->isValid('http://localhost'));
        $this->assertEquals(true, $validator->isValid('http://localhost:80'));

        $this->assertEquals(true, $validator->isValid('https://bapxdb.io'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.io'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.io:80'));

        $this->assertEquals(true, $validator->isValid('https://bapxdb.test'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.test'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.test:80'));

        $this->assertEquals(true, $validator->isValid('https://bapxdb.flutter'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.flutter'));
        $this->assertEquals(true, $validator->isValid('http://bapxdb.flutter:80'));

        $this->assertEquals(false, $validator->isValid('https://example.com'));
        $this->assertEquals(false, $validator->isValid('http://example.com'));
        $this->assertEquals(false, $validator->isValid('http://example.com:80'));

        $this->assertEquals(true, $validator->isValid('exp://'));
        $this->assertEquals(true, $validator->isValid('exp:///'));
        $this->assertEquals(true, $validator->isValid('exp://index'));

        $this->assertEquals(true, $validator->isValid('bapxdb-callback-123://'));
        $this->assertEquals(false, $validator->isValid('bapxdb-callback-456://'));

        $this->assertEquals(false, $validator->isValid('bapxdb-ios://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new iOS platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('bapxdb-android://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Android platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('bapxdb-macos://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new macOS platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('bapxdb-linux://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Linux platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('bapxdb-windows://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Windows platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('chrome-extension://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Web (Chrome Extension) platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('moz-extension://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Web (Firefox Extension) platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('safari-web-extension://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Web (Safari Extension) platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('ms-browser-extension://com.company.appname'));
        $this->assertEquals('Invalid Origin. Register your new client (com.company.appname) as a new Web (Edge Extension) platform on your project console dashboard', $validator->getDescription());

        $this->assertEquals(false, $validator->isValid('random-scheme://localhost'));
        $this->assertEquals('Invalid Scheme. The scheme used (random-scheme) in the Origin (random-scheme://localhost) is not supported. If you are using a custom scheme, please change it to `bapxdb-callback-<PROJECT_ID>`', $validator->getDescription());
    }
}
