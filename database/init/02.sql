-- Insert Sample Data
INSERT INTO student(student_id, name, preference, status) VALUES
("S12345670A", "Student 1", "Software Development", "UNASSIGNED"),
("S12345671B", "Student 2", "System Development", "UNASSIGNED"),
("S12345672C", "Student 3", "Software Engineering, Development", "UNASSIGNED"),
("S12345673D", "Student 4", "IOS and Android Development", "UNASSIGNED"),
("S12345674E", "Student 5", "Documents, QA Testing and Development", "UNASSIGNED"),
("S12345675F", "Student 6", "Software Engineering, Development", "UNASSIGNED"),
("S12345676G", "Student 7", "IOS and Android Development", "UNASSIGNED");

INSERT INTO company(company_name, job_role, company_contact, email) VALUES
("Company A", "Software Developer", "Mr A", "A@email.com"),
("Company B", "Software QA", "Ms B", "B@email.com"),
("Company C", "Intern", "Mdm C", "C@email.com"),
("Company D", "Documentation Team", "Dr D", "D@email.com");

INSERT INTO system_settings(setting_type) VALUES
("EMAIL_DIRECTORY"),
("RESUME_DIRECTORY"),
("INTERNSHIP_PERIOD");

