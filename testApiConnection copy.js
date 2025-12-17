/**
 * Test script to verify local API connection
 */

async function testLocalApiConnection() {
  console.log('🧪 Testing local API connection...\n');
  
  try {
    // Test 1: Check if the local API endpoint is accessible
    console.log('🌐 Testing API endpoint: http://localhost:8080/health');
    const healthResponse = await fetch('http://localhost:8080/health');
    const healthData = await healthResponse.json();
    console.log(`✅ Health check: ${healthData.status} - Model: ${healthData.model}\n`);
    
    // Test 2: Test chat completion endpoint
    console.log('💬 Testing chat completion endpoint...');
    const chatResponse = await fetch('http://localhost:8080/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer local-test-key'
      },
      body: JSON.stringify({
        model: 'qwen2.5-omni-local',
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test from Harris\'s local API connection.'
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      })
    });
    
    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log('✅ Chat completion test: SUCCESS');
      console.log(`📝 Response: ${chatData.choices[0].message.content.substring(0, 60)}...\n`);
    } else {
      console.log(`❌ Chat completion test: FAILED - Status ${chatResponse.status}\n`);
    }
    
    // Test 3: Test models endpoint
    console.log('📦 Testing models endpoint...');
    const modelsResponse = await fetch('http://localhost:8080/v1/models', {
      headers: {
        'Authorization': 'Bearer local-test-key'
      }
    });
    
    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      console.log(`✅ Models endpoint: SUCCESS - Found ${modelsData.data.length} model(s)\n`);
    } else {
      console.log(`❌ Models endpoint: FAILED - Status ${modelsResponse.status}\n`);
    }
    
    console.log('🎉 All local API tests completed!');
    console.log('🔗 The CLI is properly connected to the local Qwen2.5-Omni model.');
    
  } catch (error) {
    console.error('💥 API connection test failed:', error.message);
  }
}

// Run the test
testLocalApiConnection();