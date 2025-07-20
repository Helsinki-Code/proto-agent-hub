<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle GET request (for testing)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'Contact API is ready',
        'message' => 'Send POST request with form data',
        'timestamp' => date('c'),
        'required_fields' => ['firstName', 'lastName', 'email', 'message']
    ]);
    exit;
}

// Handle POST request (actual form submission)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST for form submission.']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'No JSON data received']);
    exit;
}

if (!isset($input['firstName']) || !isset($input['lastName']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields',
        'required' => ['firstName', 'lastName', 'email', 'message'],
        'received' => array_keys($input)
    ]);
    exit;
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// EmailJS function
function sendEmailJS($data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $http_code >= 200 && $http_code < 300;
}

// Prepare notification email
$notification = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_4l2yayr',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => 'AgenticAI Team',
        'from_name' => trim($input['firstName']) . ' ' . trim($input['lastName']),
        'from_email' => trim($input['email']),
        'company' => isset($input['company']) ? trim($input['company']) : 'Not specified',
        'subject' => isset($input['subject']) ? trim($input['subject']) : 'Contact Form Submission',
        'message' => trim($input['message']),
        'reply_to' => trim($input['email']),
        'to_email' => 'info@agentic-ai.ltd',
        'timestamp' => date('d M Y H:i T')
    ]
];

// Prepare acknowledgment email
$acknowledgment = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_x89ivqw',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => trim($input['firstName']),
        'to_email' => trim($input['email']),
        'from_name' => 'AgenticAI Team',
        'from_email' => 'info@agentic-ai.ltd',
        'company' => isset($input['company']) ? trim($input['company']) : 'Not specified',
        'original_subject' => isset($input['subject']) ? trim($input['subject']) : 'General Inquiry',
        'timestamp' => date('d M Y H:i T')
    ]
];

// Send emails
$sent1 = sendEmailJS($notification);
$sent2 = sendEmailJS($acknowledgment);

// Response
if ($sent1 || $sent2) {
    echo json_encode([
        'message' => 'Contact form submitted successfully',
        'timestamp' => date('c'),
        'status' => 'emails_sent',
        'notification_sent' => $sent1,
        'acknowledgment_sent' => $sent2
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send emails',
        'details' => 'EmailJS service temporarily unavailable'
    ]);
}
?>