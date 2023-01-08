-- Drop Tables
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS system_settings;

-- Create Tables
CREATE TABLE student (
    student_id varchar(10),
    name text,
    preference text,
    status text,
    PRIMARY KEY(student_id)
);

CREATE TABLE company (
    company_id serial,
    company_name text,
    job_role text,
    company_contact text,
    email text,
    PRIMARY KEY(company_id)
);

CREATE TABLE system_settings (
    setting_type varchar(17) CHECK (setting_type IN ('EMAIL_DIRECTORY', 'RESUME_DIRECTORY','INTERNSHIP_PERIOD')),
    setting_value text,
    PRIMARY KEY(setting_type)
);