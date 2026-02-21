<?php
// ==========================
// SECURITY HEADERS
// ==========================
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection: 1; mode=block");
header("Content-Type: application/json");

// ==========================
// DATABASE CONFIG
// ==========================
$host = "localhost";
$user = "u451158315_admin";
$pass = "@Greencross38"; // 🔐 PUT YOUR PASSWORD BACK
$db   = "u451158315_MitziWeb";

// ==========================
// RATE LIMIT CONFIG
// ==========================
define('RATE_LIMIT_FILE', __DIR__ . '/rate_limit.json');
define('MAX_SUBMISSIONS_PER_HOUR', 150);

// Spam Keywords
$spam_keywords = ['casino', 'crypto', 'bitcoin', 'loan', 'credit', 'porn'];

// ==========================
// RATE LIMIT FUNCTION
// ==========================
function checkRateLimit($ip) {
    $rate_data = [];

    if (file_exists(RATE_LIMIT_FILE)) {
        $rate_data = json_decode(file_get_contents(RATE_LIMIT_FILE), true) ?: [];
    }

    $now = time();
    $one_hour_ago = $now - 3600;

    foreach ($rate_data as $stored_ip => $timestamps) {
        $rate_data[$stored_ip] = array_filter($timestamps, fn($ts) => $ts > $one_hour_ago);
        if (empty($rate_data[$stored_ip])) unset($rate_data[$stored_ip]);
    }

    if (isset($rate_data[$ip]) && count($rate_data[$ip]) >= MAX_SUBMISSIONS_PER_HOUR) {
        return false;
    }

    $rate_data[$ip][] = $now;
    file_put_contents(RATE_LIMIT_FILE, json_encode($rate_data));

    return true;
}

// ==========================
// ANTI SPAM
// ==========================
function containsSpam($text, $keywords) {
    foreach ($keywords as $word) {
        if (stripos($text, $word) !== false) return true;
    }
    return false;
}

// ==========================
// SANITIZE
// ==========================
function sanitize($text, $conn) {
    return mysqli_real_escape_string($conn, htmlspecialchars(trim($text), ENT_QUOTES, 'UTF-8'));
}

// ==========================
// START PROCESS
// ==========================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// RATE LIMIT CHECK
if (!checkRateLimit($ip)) {
    echo json_encode(['status' => 'error', 'message' => 'Too many requests. Please try again later.']);
    exit;
}

// HONEYPOT CHECK
if (!empty($_POST['website_url'] ?? '')) {
    echo json_encode(['status' => 'success']);
    exit;
}

// DB CONNECT
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

// SANITIZE INPUT
$full_name        = sanitize($_POST['full_name'] ?? '', $conn);
$phone_number     = sanitize($_POST['phone_number'] ?? '', $conn);
$email            = sanitize($_POST['email'] ?? '', $conn);
$property_address = sanitize($_POST['property_address'] ?? '', $conn);
$message          = sanitize($_POST['message'] ?? '', $conn);

// VALIDATE
if (!$full_name || !$phone_number || !$email || !$property_address) {
    echo json_encode(['status' => 'error', 'message' => 'All required fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
    exit;
}

if (!preg_match('/^[0-9+\-\s()]{7,20}$/', $phone_number)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid phone number.']);
    exit;
}

// SPAM CHECK
if (containsSpam($message . ' ' . $full_name . ' ' . $property_address, $spam_keywords)) {
    echo json_encode(['status' => 'success']);
    exit;
}

// ==========================
// INSERT TO DATABASE
// ==========================
$stmt = $conn->prepare(
    "INSERT INTO home_evaluations 
    (full_name, phone_number, email, property_address, message) 
    VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param("sssss", $full_name, $phone_number, $email, $property_address, $message);

if (!$stmt->execute()) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save']);
    exit;
}

// ==========================
// EMAIL OWNER + CLIENT
// ==========================
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'mitzisantayana@mitzisantayana.com';
    $mail->Password = '@Youcantseeme8'; // 🔐 PUT YOUR PASSWORD BACK
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('mitzisantayana@mitzisantayana.com', 'Mitzi Website');
    $mail->addAddress('mitzisantayana@boblucidoteam.com');
    $mail->addAddress('granadaclyde1@gmail.com');
    $mail->addReplyTo($email, $full_name);

    $mail->isHTML(true);
    $mail->Subject = "Hi Mitzi! There's a New Home Evaluation Request";
    $mail->Body = "
        <h2>New Home Evaluation Request</h2>
        <p><strong>Name:</strong> $full_name</p>
        <p><strong>Phone:</strong> $phone_number</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Property Address:</strong> $property_address</p>
        <p><strong>Message:</strong> $message</p>
        <p><em>Submitted from Mitzi's website</em></p>
    ";
    
        $mail->send();


    // CLIENT AUTO RESPONSE
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host = 'smtp.hostinger.com';
    $reply->SMTPAuth = true;
    $reply->Username = 'mitzisantayana@mitzisantayana.com';
    $reply->Password = '@Youcantseeme8'; // 🔐 PUT YOUR PASSWORD BACK
    $reply->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $reply->Port = 465;

    $reply->setFrom('mitzisantayana@mitzisantayana.com', 'Mitzi Santayana');
    $reply->addAddress($email);
    $reply->Subject = "We received your request";

    $reply->Body = "
Hello $full_name,

Thank you for requesting a home evaluation.

Mitzi or her team will contact you shortly.

Best regards,
Mitzi Santayana
boblucidoteam.com
";

    $reply->send();

    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $mail->ErrorInfo
    ]);
}

$stmt->close();
$conn->close();
