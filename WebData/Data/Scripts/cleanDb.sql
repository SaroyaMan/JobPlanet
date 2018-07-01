------ Delete all data from all tables ------ 

-- disable all constraints
EXEC sp_MSForEachTable "ALTER TABLE ? NOCHECK CONSTRAINT all"

-- delete data in all tables
EXEC sp_MSForEachTable "DELETE FROM ?"

-- enable all constraints
exec sp_MSForEachTable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"

-- reset sequences seed
EXEC sp_MSForEachTable "DBCC CHECKIDENT ( '?', RESEED, 0)"