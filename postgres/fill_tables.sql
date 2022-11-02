BEGIN TRANSACTION;

INSERT INTO users
  (name, email, entries, joined )
VALUES
  ('Wendy', 'wendy@example.com', 5, '2018-01-04');
INSERT INTO login
  (hash, email)
values
  ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'wendy@example.com');

COMMIT;