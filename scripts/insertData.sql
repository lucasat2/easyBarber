INSERT INTO companies_address (id, state, city, street, number, postal_code) 
VALUES ('046c6e2d-9101-4f30-9b0b-923ad0d7e257', 'São Paulo', 'São Paulo', 'Av. Paulista', 1000, '00000-000');

INSERT INTO companies (id, company_address_id, name, cnpj, phone_number, link_client) 
VALUES ('7ce083ca-e9a7-4bde-b554-117aae9d3570', '046c6e2d-9101-4f30-9b0b-923ad0d7e257', 'Test', '00.000.000/0001-00', '(81) 99658-9788', 'http://localhost/7ce083ca-e9a7-4bde-b554-117aae9d3570');

INSERT INTO users (id, company_id, email, password) VALUES ('c075094b-abc2-4054-b232-f6b5c321f482', '7ce083ca-e9a7-4bde-b554-117aae9d3570', 'test@gmail.com', '$2b$10$wWUorI0S/ExSSM1MyLOP1eW9agsxnvw4F7ecJfIbYdFgsKRDKPB7W');

INSERT INTO staffs (id, company_id, name, surname, cpf, email, phone_number, birthdate, postal_code) 
VALUES ('52bbdafe-2ed4-401e-afb2-aa214f5f8689', '7ce083ca-e9a7-4bde-b554-117aae9d3570', 'Carlos', 'Mendes', '123.456.789-00', 'carlos.mendes@email.com', '(11) 99988-7766', '1990-05-15', '01001-000');

INSERT INTO services (id, company_id, name, description, price, average_duration) VALUES ('c6c03d41-4aac-40ca-94dc-819468fb2961', '7ce083ca-e9a7-4bde-b554-117aae9d3570', 'Barba Completa', 'Aparação e modelagem da barba.', 35.00, 25), ('781e2732-6142-47ee-8c50-006aaf51fc69', '7ce083ca-e9a7-4bde-b554-117aae9d3570', 'Corte + Barba', 'Pacote completo de corte e barba.', 75.00, 50), ('a785f872-3406-452d-a8f0-977bed1c58dc', '7ce083ca-e9a7-4bde-b554-117aae9d3570', 'Sombrancelha', 'Design e alinhamento da sobrancelha.', 20.00, 15);

INSERT INTO schedules (id, week_day, start_time_1, end_time_1, status_1, start_time_2, end_time_2, status_2) VALUES ('e337bea8-6217-4af1-bbfe-f3add635c72b', 'Segunda-feira', '09:00:00', '12:00:00', TRUE, '13:00:00', '18:00:00', TRUE), ('f1c1cde7-e33b-41ef-9181-e01453ae68f1', 'Terça-feira', '09:00:00', '12:00:00', TRUE, '13:00:00', '18:00:00', TRUE), ('c9cb5b29-360c-4236-8f76-612cd95ed644', 'Quarta-feira', '09:00:00', '12:00:00', TRUE, '13:00:00', '18:00:00', TRUE), ('1dc1293e-735a-483a-a954-19a98d208e54', 'Quinta-feira', '09:00:00', '12:00:00', TRUE, '13:00:00', '18:00:00', TRUE), ('81ef45ec-ff5b-4667-a70c-a475ec85ef54', 'Sexta-feira', '09:00:00', '12:00:00', TRUE, '13:00:00', '18:00:00', TRUE), ('7d7c757d-d1d9-42ba-bc7b-b1db26b4544c', 'Sábado', '09:00:00', '12:00:00', TRUE, '00:00:00', '00:00:00', FALSE), ('c843b26d-d6ec-4ca6-8f32-27542a8f5964', 'Domingo', '00:00:00', '00:00:00', FALSE, '00:00:00', '00:00:00', FALSE);

INSERT INTO clients (id, name, email, phone_number) VALUES ('bce980cb-8bfb-43c7-86e0-8fe52c393975', 'João Silva', 'joao.silva@email.com', '(11) 98765-4321');

INSERT INTO appointments (id, client_id, staff_id, service_id, date_hour_begin, date_hour_end, status, observation) VALUES ('bb989b71-dcb0-49bd-83ab-9b5dfb8428c2', 'bce980cb-8bfb-43c7-86e0-8fe52c393975', '52bbdafe-2ed4-401e-afb2-aa214f5f8689', 'c6c03d41-4aac-40ca-94dc-819468fb2961', '2025-04-02 10:00:00', '2025-04-02 10:30:00', 'AGENDADO', 'Primeira vez do cliente');

INSERT INTO services_staffs (id, service_id, staff_id) VALUES ('43c5de0b-a36e-4679-99c8-be038dce9433', 'c6c03d41-4aac-40ca-94dc-819468fb2961', '52bbdafe-2ed4-401e-afb2-aa214f5f8689'), ('25e76d7b-3b45-4a1a-a801-d1048fb6da52', '781e2732-6142-47ee-8c50-006aaf51fc69', '52bbdafe-2ed4-401e-afb2-aa214f5f8689'), ('cb441532-87e9-4927-be51-be2ea9ca1682', 'a785f872-3406-452d-a8f0-977bed1c58dc', '52bbdafe-2ed4-401e-afb2-aa214f5f8689');

INSERT INTO schedules_staffs (id, schedule_id, staff_id) VALUES ('6bbd302b-129a-4acb-804a-d8b1d83358aa', 'e337bea8-6217-4af1-bbfe-f3add635c72b', '52bbdafe-2ed4-401e-afb2-aa214f5f8689'), ('f46651a8-9808-49be-bb14-808be5ac2dca', 'f1c1cde7-e33b-41ef-9181-e01453ae68f1', '52bbdafe-2ed4-401e-afb2-aa214f5f8689'), ('1525e49e-42d4-4f24-95b1-43bbbc2b7dfc', 'c9cb5b29-360c-4236-8f76-612cd95ed644', '52bbdafe-2ed4-401e-afb2-aa214f5f8689');