--Drop Tables
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS system_settings;

--Create Tables
CREATE TABLE student (
    student_id int,
    name varchar,
    preference varchar,
    status varchar,
    PRIMARY KEY(student_id)
);

CREATE TABLE company (
    company_id serial
    company_name varchar,
    job_role varchar,
    company_contact varchar,
    email varchar,
    PRIMARY KEY(id)
);

CREATE TABLE system_settings (
    setting_type varchar CHECK (employment_type IN ('EMAIL_DIRECTORY', 'RESUME_DIRECTORY','INTERNSHIP_PERIOD')),
    value varchar,
    PRIMARY KEY(setting_type)
);