const app = require('./src/app');
const http = require('http');

console.log('--- NNEXO FUNCTIONALITY TEST ---');

const server = app.listen(5002, () => {
    console.log('Test server started on port 5002');

    // Test 1: Root Route
    http.get('http://localhost:5002/', (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('TEST 1 (Root):', data.includes('Welcome to NNEXO API') ? '✅ PASS' : '❌ FAIL');

            // Test 2: Check if Auth Routes are registered
            const req = http.request({
                hostname: 'localhost',
                port: 5002,
                path: '/api/v1/auth/otp/request',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, (res2) => {
                console.log('TEST 2 (Auth Route Check):', res2.statusCode !== 404 ? '✅ PASS' : '❌ FAIL');

                console.log('--- Tests Completed ---');
                process.exit(0);
            });
            req.on('error', (e) => {
                console.error('Test 2 Error:', e.message);
                process.exit(1);
            });
            req.write(JSON.stringify({ phoneNumber: '1234567890' }));
            req.end();
        });
    }).on('error', (err) => {
        console.error('Test 1 Error:', err.message);
        process.exit(1);
    });
});
