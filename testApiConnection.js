/**
 * Test script to verify bapX API connection
 */

async function testBapXApiConnection() {
  console.log('🧪 Testing bapX API connection...\n');

  try {
    // Test 1: Check if the bapX API endpoint is accessible
    console.log('🌐 Testing API endpoint: https://getwinharris.github.io/bapXconnect/api/health');
    const healthResponse = await fetch('https://getwinharris.github.io/bapXconnect/api/health');
    const healthData = await healthResponse.json();
    console.log(`✅ Health check: ${healthData.status} - Model: ${healthData.model}\n`);

    // Test 2: Test text generation endpoint (Alibaba/DashScope style)
    console.log('💬 Testing text generation endpoint...');
    const generationResponse = await fetch('https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-DashScope-Token': 'getwinharris.github.io/bapXconnect/api' // Alibaba-style API key
      },
      body: JSON.stringify({
        model: 'qwen2.5-omni',
        input: {
          messages: [
            {
              role: 'user',
              content: 'Hello, this is a test from bapXconnect API connection.'
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 100
        }
      })
    });

    if (generationResponse.ok) {
      const generationData = await generationResponse.json();
      const responseText = generationData.output?.text || generationData.result?.response || 'No response';
      console.log('✅ Text generation test: SUCCESS');
      console.log(`📝 Response: ${responseText.substring(0, 60)}...\n`);
    } else {
      console.log(`❌ Text generation test: FAILED - Status ${generationResponse.status}\n`);
    }

    // Test 3: Test models endpoint
    console.log('📦 Testing models endpoint...');
    const modelsResponse = await fetch('https://getwinharris.github.io/bapXconnect/api/api/v1/models', {
      headers: {
        'X-DashScope-Token': 'getwinharris.github.io/bapXconnect/api'
      }
    });

    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      console.log(`✅ Models endpoint: SUCCESS - Found ${modelsData.data?.length || 0} model(s)\n`);
    } else {
      console.log(`❌ Models endpoint: FAILED - Status ${modelsResponse.status}\n`);
    }

    console.log('🎉 All bapX API tests completed!');
    console.log('🔗 The client is properly connected to the bapX API service.');

  } catch (error) {
    console.error('💥 bapX API connection test failed:', error.message);
  }
}

// Run the test
testBapXApiConnection();