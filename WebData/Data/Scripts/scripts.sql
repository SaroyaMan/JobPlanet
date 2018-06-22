------ Delete all data from all tables ------ 

-- disable all constraints
EXEC sp_MSForEachTable "ALTER TABLE ? NOCHECK CONSTRAINT all"

-- delete data in all tables
EXEC sp_MSForEachTable "DELETE FROM ?"

-- enable all constraints
exec sp_MSForEachTable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"

-- reset sequences seed
EXEC sp_MSForEachTable "DBCC CHECKIDENT ( '?', RESEED, 0)"

--============================================================================--

------ Insert skills ------ 

insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('reading comprehension', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('active listening', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('mathematical', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('critical thinking', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('active learning', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('coordination', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('service orientation', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('complex problem solving', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('technology design', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('judgment and decision making', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('management of financial resources', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('written comprehension', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('fluency of ideas', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('mechanical', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('originality', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('visualization', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('perceptual speed', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);
insert into skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) values ('java', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);

--============================================================================--