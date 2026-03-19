-- Database Schema for Appointment Booking Management System

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    role ENUM('admin', 'client') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT DEFAULT 30,
    price DECIMAL(10, 2) DEFAULT 0.00,
    icon_name VARCHAR(50), -- Lucide icon name
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) UNIQUE NOT NULL, -- e.g. GAZI-2024-001
    user_id INT,
    service_id INT,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE IF NOT EXISTS availability_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
    start_time TIME,
    end_time TIME,
    is_closed BOOLEAN DEFAULT FALSE,
    UNIQUE(day_of_week)
);

-- Seed Initial Services
INSERT INTO services (name, description, duration_minutes, price, icon_name) VALUES
('Aadhaar Enrolment/Linking', 'Aadhaar Card related services including photo and mobile number update.', 20, 100.00, 'Fingerprint'),
('New PAN Card (e-PAN)', 'Fast track Permanent Account Number generation.', 15, 120.00, 'CreditCard'),
('EPFO / Digital Life Certificate', 'Provident fund services and retiree life certificates.', 30, 150.00, 'ShieldCheck'),
('Banking/UPI Support', 'Help with UPI setup or bank account linking.', 15, 50.00, 'Smartphone');

-- Initial Availability (Default Mon-Sat 10 AM - 6 PM)
INSERT INTO availability_config (day_of_week, start_time, end_time) VALUES
('monday', '10:00:00', '18:00:00'),
('tuesday', '10:00:00', '18:00:00'),
('wednesday', '10:00:00', '18:00:00'),
('thursday', '10:00:00', '18:00:00'),
('friday', '10:00:00', '18:00:00'),
('saturday', '10:00:00', '18:00:00'),
('sunday', '00:00:00', '00:00:00', TRUE);
