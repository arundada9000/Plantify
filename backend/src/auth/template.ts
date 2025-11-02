export const HTML_TEMPLATE = (text: string) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Notification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      .container {
        width: 100%;
        padding: 20px;
      }
      .email {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .email-header {
        background-color: #007bff; /* blue */
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 1px;
      }
      .email-body {
        padding: 20px;
        color: #333;
        font-size: 16px;
        line-height: 1.6;
      }
      .email-footer {
        background-color: #6c757d; /* gray */
        color: #fff;
        padding: 15px;
        text-align: center;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="email">
        <div class="email-header">
          <h1>Notification</h1>
        </div>
        <div class="email-body">
          <p>Hello,</p>
          <p>${text}</p>
        </div>
        <div class="email-footer">
          <p>&copy; 2025 All rights reserved.</p>
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
};
