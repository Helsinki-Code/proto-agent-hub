<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://agentic-ai.ltd');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['firstName']) || !isset($input['lastName']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// EmailJS API call function
function sendEmailJS($data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $http_code == 200;
}

// Send notification email to your team
$notification_email = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_4l2yayr',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => 'AgenticAI Team',
        'from_name' => $input['firstName'] . ' ' . $input['lastName'],
        'from_email' => $input['email'],
        'company' => $input['company'] ?? 'Not specified',
        'subject' => $input['subject'] ?? 'Contact Form Submission',
        'message' => $input['message'],
        'reply_to' => $input['email'],
        'to_email' => 'info@agentic-ai.ltd',
        'timestamp' => date('d M Y H:i', time())
    ]
];

// Send acknowledgment email to user
$acknowledgment_email = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_x89ivqw',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => $input['firstName'],
        'to_email' => $input['email'],
        'from_name' => 'AgenticAI Team',
        'from_email' => 'info@agentic-ai.ltd',
        'company' => $input['company'] ?? 'Not specified',
        'original_subject' => $input['subject'] ?? 'General Inquiry',
        'timestamp' => date('d M Y H:i', time())
    ]
];

$success1 = sendEmailJS($notification_email);
$success2 = sendEmailJS($acknowledgment_email);

if ($success1 || $success2) {
    echo json_encode([
        'message' => 'Contact form submitted successfully',
        'timestamp' => date('c'),
        'status' => 'emails_sent'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send emails',
        'details' => 'Email service temporarily unavailable'
    ]);
}
?>