<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

/* =============================
   LOAD ENV (DATABASE)
============================= */

function loadEnv($path = '.env'){
    if (!file_exists($path)) {
        die("Missing .env file");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        
        list($name, $value) = array_map('trim', explode('=', $line, 2));
        $_ENV[$name] = $value;
    }
}

loadEnv();

/* =============================
   DB CONNECTION
============================= */

$conn = new mysqli(
    $_ENV['DB_HOST'], 
    $_ENV['DB_USER'], 
    $_ENV['DB_PASS'], 
    $_ENV['DB_NAME']
);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

/* =============================
   HANDLE FORM
============================= */

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize
    $name    = htmlspecialchars(trim($_POST['full_name'] ?? ''), ENT_QUOTES);
    $email   = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES);
    $phone   = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES);

    /* =============================
       SAVE TO DATABASE
    ============================= */

    $stmt = $conn->prepare("
        INSERT INTO leads (full_name, email, phone, message) 
        VALUES (?, ?, ?, ?)
    ");

    $stmt->bind_param("ssss", $name, $email, $phone, $message);
    $stmt->execute();
    $stmt->close();

    /* =============================
       SEND EMAIL (PHPMailer + SMTP)
    ============================= */

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mitzisantayana@mitzisantayana.com';

        // ⛔ ONLY CHANGE THIS LINE ⛔
        $mail->Password   = '@Youcantseeme8';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Sender
        $mail->setFrom(
            'mitzisantayana@mitzisantayana.com',
            'Mitzi Santayana | New Website Lead'
        );

        // Receivers
        $mail->addAddress('mitzisantayana@boblucidoteam.com');
        $mail->addAddress('granadaclyde1@gmail.com');

        // Reply to client
        $mail->addReplyTo($email, $name);

        // Email format
        $mail->isHTML(true);
        $mail->Subject = 'New Lead from for Mitzi Santayana';

        $mail->Body = "
        <div style='font-family: Arial, sans-serif; padding:15px; background:#111; border-radius:8px; color:#fff;'>
            <h2 style='color:#c7a467;'>New Lead Received</h2>

            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>

            <hr style='border:1px solid #2a2a2a'>

            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        </div>
        ";

        $mail->AltBody = "
NEW WEBSITE LEAD - MITZI SANTAYANA

Name: {$name}
Email: {$email}
Phone: {$phone}

Message:
{$message}
        ";

        $mail->send();
        echo "success";

    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}

$conn->close();
?>
