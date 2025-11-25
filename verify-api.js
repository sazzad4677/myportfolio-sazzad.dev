// Using global fetch (Node 18+)

async function verifyApi() {
    const baseUrl = 'http://localhost:3000/api/portfolio';

    console.log('Verifying API endpoints...');

    try {
        // 1. GET request
        console.log('\n1. Testing GET /api/portfolio...');
        const getResponse = await fetch(baseUrl);
        if (getResponse.ok) {
            const data = await getResponse.json();
            console.log('✅ GET request successful');
            console.log('Data received:', JSON.stringify(data).substring(0, 100) + '...');
        } else {
            const errorText = await getResponse.text();
            console.error('❌ GET request failed:', getResponse.status, getResponse.statusText);
            console.error('Response body:', errorText);
        }

        // 2. POST request (Update title)
        console.log('\n2. Testing POST /api/portfolio...');
        const updateData = {
            seo: {
                title: 'Verified Portfolio Title ' + Date.now()
            }
        };
        const postResponse = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        if (postResponse.ok) {
            const data = await postResponse.json();
            console.log('✅ POST request successful');
            console.log('Updated title:', data.seo?.title);
        } else {
            const errorText = await postResponse.text();
            console.error('❌ POST request failed:', postResponse.status, postResponse.statusText);
            console.error('Response body:', errorText);
        }

    } catch (error) {
        console.error('❌ Error during verification:', error);
    }
}

verifyApi();
