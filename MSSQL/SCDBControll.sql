use master;

drop database SCDBControll;
create database SCDBControll;
use SCDBControll;

create table Account (
id int primary key identity,
account_name varchar(200),
create_date datetime2,
update_Date datetime2
);

create table Contact (
id int primary key identity,
contact_surname varchar(200),
contact_name varchar(200),
legal_user int unique
	foreign key (legal_user) references Account(id),
create_date datetime,
update_Date datetime
	
);

create table Users (
id int primary key identity,
user_login varchar(200),
user_password varchar(200),
individual int unique
	foreign key (individual) references Contact(id),
create_date datetime,
update_Date datetime
	
);

create table BillType (
id int primary key identity,
type_bill varchar(200),
create_date datetime,
update_Date datetime
);

create table Bill (
id int primary key identity,
number varchar(200),

legal_user int 
	foreign key (legal_user) references Account(id) 
	on delete cascade 
	on update cascade,
bill_type int
	foreign key (bill_type) references BillType(id) 
	on delete cascade 
	on update cascade,
create_date datetime,
update_Date datetime
);

create table AdressType (
id int primary key identity,
adress_type varchar(200),
create_date datetime,
update_Date datetime
);

create table City (
id int primary key identity,
adress_type int
	foreign key (adress_type) references AdressType(id) 
	on delete cascade 
	on update cascade,
create_date datetime,
update_Date datetime
);

create table Street (
id int primary key identity,
street_name varchar(200),
city int
	foreign key (city) references City(id) 
	on delete cascade 
	on update cascade,
create_date datetime,
update_Date datetime
);

create table Adress (
id int primary key identity,
is_actual bit,

adress_type int
	foreign key (adress_type) references AdressType(id),
city int
	foreign key (city) references City(id),
individual int
	foreign key (individual) references Contact(id),
legal_user int 
	foreign key (legal_user) references Account(id),
street int 
	foreign key (street) references Street(id),
create_date datetime,
update_Date datetime
);

INSERT INTO Account (account_name) VALUES
(' first account'),
('second account'),
('third account')
SELECT * FROM Account;

INSERT INTO Contact (contact_name, contact_surname, legal_user) VALUES
('Howman', 'Jacob', 3),
('Ford', 'Gen', 1),
('Unerdo', 'Wam', 2)
SELECT * FROM Contact;

INSERT INTO Users (user_login, user_password, individual) VALUES
('login1', 'password1', 1),
('login3', 'password2', 2),
('login3', 'password3', 3)
SELECT * FROM Users;
DELETE FROM Users
UPDATE Users SET user_login = 'we22we' WHERE individual = 1

INSERT INTO BillType(type_bill) VALUES
('Active'),
('Frozen'),
('Deleted')
SELECT * FROM BillType;

INSERT INTO Bill (number, legal_user, bill_type) VALUES
('KHJH53J342R', 2, 1),
('DGDPKO4251J', 3, 3),
('GDJKLJKLJL1', 1, 2)
SELECT * FROM Bill;

INSERT INTO AdressType (adress_type) VALUES
('AdressType1'),
('AdressType2'),
('AdressType3')
SELECT * FROM AdressType;

INSERT INTO City (adress_type) VALUES
(2),
(1),
(2)
SELECT * FROM City;

INSERT INTO Street (street_name, city) VALUES
('First street', 1),
('second street', 2),
('third street', 2)
SELECT * FROM Street;

--id int primary key identity,
--is_actual bit,

--adress_type int
--	foreign key (adress_type) references AdressType(id),
--city int
--	foreign key (city) references City(id),
--individual int
--	foreign key (individual) references Contact(id),
--legal_user int 
--	foreign key (legal_user) references Account(id),
--street int 
--	foreign key (street) references Street(id),
--create_date datetime,
--update_Date datetime

INSERT INTO Adress (is_actual, adress_type, city, individual, legal_user, street) VALUES
(0, 2, 1, 2, 3, 3),
(1, 2, 1, 2, 1, 1),
(1, 3, 1, 1, 3, 1)
SELECT * FROM Adress;

DELETE FROM Bill
-----------------------------------------------

SELECT * FROM Users; 

DELETE FROM Users				
WHERE  individual IS NULL;

SELECT Contact.contact_name, Contact.contact_surname   
FROM Contact JOIN Adress ON
Contact.legal_user = Adress.legal_user
WHERE Adress.city IN (SELECT Adress.city FROM Adress GROUP BY city HAVING COUNT(city) > 1) AND 
Adress.street IN (SELECT Adress.street FROM Adress GROUP BY street HAVING COUNT(street) > 1);

SELECT Contact.contact_name, Contact.contact_surname 
FROM Contact JOIN Account ON
Contact.legal_user = Account.id JOIN Adress ON Adress.individual = Account.id
WHERE Adress.city IN (SELECT city FROM Adress adr1 JOIN Contact ON Contact.legal_user = adr1.legal_user GROUP BY city HAVING COUNT(city) > 1) AND 
Adress.street IN (SELECT street FROM Adress adr1 JOIN Contact ON Contact.legal_user = adr1.legal_user GROUP BY street HAVING COUNT(street) > 1)


SELECT Contact.contact_name, Contact.contact_surname 
FROM Contact JOIN Account ON Contact.legal_user = Account.id JOIN Bill ON Account.id = Bill.id JOIN BillType ON Bill.bill_type = BillType.id
WHERE BillType.type_bill = 'Frozen';


GO
CREATE VIEW AllUsers  
AS
	SELECT Contact.contact_name +' '+ Contact.contact_surname AS entityName,
	'Individual' AS entityType
	FROM Contact
UNION ALL
	SELECT Account.account_name,
	'Legal'
	FROM Account
GO

SELECT * FROM AllUsers
DROP VIEW AllUsers


GO
CREATE TRIGGER allusers_insert on AllUsers
INSTEAD OF INSERT
AS
BEGIN
	INSERT INTO Account(account_name) VALUES (NULL)

	INSERT INTO Contact(contact_name,contact_surname,legal_user) VALUES
	((SELECT entityName FROM inserted),
	NULL,
	(SELECT TOP 1 id FROM Account ORDER BY ID DESC))

	INSERT AllUsers(entityName,entityType)
    SELECT entityName,entityType
    FROM inserted;
END
GO
DROP TRIGGER allusers_insert
INSERT INTO AllUsers VALUES('Name1','legal')


GO  
CREATE FUNCTION dbo.isFrozenBill(@legal_id int)  
RETURNS varchar(3)   
AS   
BEGIN  
	Declare @Result as varchar(3)
	set @Result = 'YES';
     IF (
	 (
	SELECT Account.id
	FROM Contact JOIN Account ON 
	Contact.legal_user = Account.id JOIN Bill ON
	Account.id = Bill.id JOIN BillType ON 
	Bill.bill_type = BillType.id
	WHERE Account.id = @legal_id and BillType.type_bill = 'Frozen')
	IS NULL)   
        SET @Result = 'NO';  
    RETURN @Result;  
END
GO
DROP FUNCTION isFrozenBill
SELECT dbo.isFrozenBill(3) AS Result;

GO
ALTER TRIGGER dateUser ON Users 
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Users  SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Users WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Users  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO


GO
CREATE TRIGGER dateAccount ON Account
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Account  SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Account WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Account  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO



DROP TRIGGER dateAccount

GO
CREATE TRIGGER dateAdress ON Adress 
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Adress SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Adress WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Adress  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateAdress


GO
CREATE TRIGGER dateAdresstype ON AdressType
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE AdressType SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM AdressType WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE AdressType  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateAdresstype

GO
CREATE TRIGGER dateBill ON Bill
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Bill SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Bill WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Bill  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateBill


GO
CREATE TRIGGER dateBilltype ON BillType
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE BillType SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM BillType WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE BillType  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateBilltype

GO
CREATE TRIGGER dateCity ON City
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE City SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM City WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE City  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateCity

GO
CREATE TRIGGER dateContact ON Contact
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Contact SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Contact WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Contact  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateContact

GO
CREATE TRIGGER dateStreet ON Street
AFTER INSERT,UPDATE
AS
BEGIN
UPDATE Street SET Update_Date = GETDATE() WHERE id IN (SELECT id FROM deleted)
IF((SELECT Create_Date FROM Street WHERE id IN (SELECT id FROM inserted)) IS NULL)
UPDATE Street  SET Create_Date = GETDATE() WHERE id IN (SELECT id FROM inserted)
END;
GO

DROP TRIGGER dateStreet


GO 
CREATE TRIGGER Adress_INSERT ON Adress 
AFTER INSERT  
AS  
 UPDATE Adress SET is_actual = 0  
WHERE adress_type = (SELECT adress_type FROM inserted) and individual = (SELECT individual FROM inserted); 
DROP TRIGGER Adress_INSERT

INSERT INTO Adress(is_actual,adress_type,city,individual,legal_user,street) VALUES (1, 1, 1, 1, 1, 1) 
SELECT * FROM Adress;	

GO
CREATE TRIGGER users_insert on Users
INSTEAD OF INSERT
AS
BEGIN
	INSERT INTO Account(account_name) VALUES (NULL)
	INSERT INTO Contact(contact_name, contact_surname, legal_user) VALUES(NULL,NULL,(SELECT TOP 1 id FROM Account ORDER BY ID DESC))
	INSERT Users(user_login,user_password,individual)
    SELECT user_login,user_password,individual
    FROM inserted;
END
GO

drop trigger users_insert
INSERT INTO Users(user_login,user_password,individual) VALUES
('login4', 'password4', 5)

select * from Users
select * from Account
select * from Contact

GO
DECLARE @Contact_UPDATE_MODIFICATIONS TABLE (    
	id INT NOT NULL,  
    old_name_ varchar(200),  
	new_name_ varchar(200),  
    old_surname varchar(200),  
	new_surname varchar(200),
	old_legal int,
	new_legal int); 

UPDATE Contact SET contact_name = 'Mike', contact_surname = 'Jackson'
    OUTPUT 
	Inserted.id,
	Deleted.contact_name,
	Inserted.contact_name,
	Deleted.contact_surname,
	Inserted.contact_surname,
	Deleted.legal_user,
	Inserted.legal_user
    INTO @Contact_UPDATE_MODIFICATIONS 
WHERE id = 1

SELECT * FROM @Contact_UPDATE_MODIFICATIONS
GO