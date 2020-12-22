use master;

drop database sc1;
create database sc1;
use sc1;

create table Account (
id int primary key identity,
name_ varchar(200)
);

create table Contact (
id int primary key identity,
surname varchar(200),
name_ varchar(200),
legal_entity int unique
	foreign key (legal_entity) references Account(id) 
	on delete cascade 
	on update cascade
);

create table Users (
id int primary key identity,
login_ varchar(200),
password_ varchar(200),
individual int unique
	foreign key (individual) references Contact(id) 
	on delete cascade 
	on update cascade
);

create table BillType (
id int primary key identity,
name_ varchar(200)
);

create table Bill (
id int primary key identity, --reference mistake: primary key + foreign key  
number varchar(200),
legal_entity int 
	foreign key (legal_entity) references Account(id) 
	on delete cascade 
	on update cascade,
bill_type int
	foreign key (bill_type) references BillType(id) 
	on delete cascade 
	on update cascade
);

create table AdressType (
id int primary key identity,
name_ varchar(200)
);

create table City (
id int primary key identity,
adress_type int
	foreign key (adress_type) references AdressType(id) 
	on delete cascade 
	on update cascade
);

create table Street (
id int primary key identity,
name_ varchar(200),
city int
	foreign key (city) references City(id) 
	on delete cascade 
	on update cascade
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
legal_entity int 
	foreign key (legal_entity) references Account(id),
street int 
	foreign key (street) references Street(id)
);

INSERT INTO Account VALUES
('account name 1'),
('account name 2'),
('account name 3')
SELECT * FROM Account;

INSERT INTO Contact VALUES
('Johnson', 'Mike', 1),
('Tyson', 'Ron', 2),
('Gates', 'Bill', 3)
SELECT * FROM Contact;

INSERT INTO Users VALUES
('user123', 'qwe123', 1),
('qwerer', 'tyui1234', 2),
('potop4', 'potoppp224', 3)
SELECT * FROM Users;

INSERT INTO BillType VALUES
('Type1'),
('Type2'),
('Frozen')
SELECT * FROM BillType;

INSERT INTO Bill VALUES
('D23OJGLK345', 1, 3),
('LDHDS80D0SL', 3, 2),
('LJFIM384GKK', 2, 1)
SELECT * FROM Bill;

INSERT INTO AdressType VALUES
('AdressType1'),
('AdressType2'),
('AdressType3')
SELECT * FROM AdressType;

INSERT INTO City VALUES
(1),
(2),
(1)
SELECT * FROM City;

INSERT INTO Street VALUES
('Pushkina', 1),
('Kolotushkina', 2),
('Industialnaya', 1)
SELECT * FROM Street;

INSERT INTO Adress VALUES
(1, 1, 1, 1, 1, 1),
(0, 3, 1, 2, 1, 3),
(1, 3, 2, 1, 3, 2)
SELECT * FROM Adress;

-----------------------------------------------


SELECT Contact.name_, Contact.surname 
FROM Contact JOIN Adress ON
Contact.legal_entity = Adress.legal_entity
WHERE Adress.city IN (SELECT Adress.city FROM Adress GROUP BY city HAVING COUNT(city) > 1) AND 
Adress.street IN (SELECT Adress.street FROM Adress GROUP BY street HAVING COUNT(street) > 1);

SELECT Contact.name_, Contact.surname 
FROM Contact JOIN Account ON
Contact.legal_entity = Account.id JOIN Adress ON Adress.individual = Account.id
WHERE Adress.city IN (SELECT city FROM Adress adr1 JOIN Contact ON Contact.legal_entity = adr1.legal_entity GROUP BY city HAVING COUNT(city) > 1) AND 
Adress.street IN (SELECT street FROM Adress adr1 JOIN Contact ON Contact.legal_entity = adr1.legal_entity GROUP BY street HAVING COUNT(street) > 1)


SELECT Contact.name_, Contact.surname
FROM Contact JOIN Account ON Contact.legal_entity = Account.id JOIN Bill ON Account.id = Bill.id JOIN BillType ON Bill.bill_type = BillType.id
WHERE BillType.name_ = 'Type1';

--Функция, возвращающая есть ли у ЮрЛица замороженные счета - 
GO  
CREATE FUNCTION dbo.isFrozenBill(@legal_id int)  
RETURNS varchar(3)   
AS   
BEGIN  
	Declare @RequestResult as int
	Declare @Res as varchar(3)
	set @Res = 'YES';

	set @RequestResult = (SELECT Account.id
	FROM Contact JOIN Account ON Contact.legal_entity = Account.id JOIN Bill ON Account.id = Bill.id JOIN BillType ON Bill.bill_type = BillType.id
	WHERE Account.id = @legal_id and BillType.name_ = 'Frozen');
 
     IF (@RequestResult IS NULL)   
        SET @Res = 'NO';  
    RETURN @Res;  
END
GO
SELECT dbo.isFrozenBill(1) AS isFrozen;

DROP FUNCTION isFrozenBill;


--❌Во всех таблицах колонки заполняются автоматически (Дата создания Дата изменения) - 
-- need to add theese filds?

--❌Нельзя несколько актуальных адресов с одним типом, только последний добавленный, остальные изменяют состояние - 


--❌При создании пользователя автоматически создавать Физ лицо и Юр лицо
GO create trigger Users_INSERT
ON Users
after insert
as
insert into Contact values ()
--1) inverse referense between User and Contact tables needed.
--unable to insert into User where individual is an attribute and i have to
--insert into Account table first, then into Contact table, then into User table 
--2) *Connected with 1st problem* To autofill Contact I should have name
--and surname (as min.) but there are no such filds at User table