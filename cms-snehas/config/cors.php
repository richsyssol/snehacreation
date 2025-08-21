<?php

return [
    'paths' => ['*', 'api/*', 'sanctum/csrf-cookie'], // Paths to apply CORS to
    'allowed_methods' => ['*'], // Allowed HTTP methods
    'allowed_origins' => ['http://localhost:5173','http://localhost:5174'], // Allowed origins (use '*' for all)
    'allowed_origins_patterns' => [], // Allowed origin patterns
    'allowed_headers' => ['*'], // Allowed headers
    'exposed_headers' => [], // Headers to expose
    'max_age' => 0, // Max age for preflight requests
    'supports_credentials' => false, // Allow credentials
];