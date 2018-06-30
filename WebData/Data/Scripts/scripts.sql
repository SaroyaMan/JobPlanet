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

--=================== Insert skills ===================

INSERT INTO Skills (name, createdby, datecreated, createdbydisplayname, skillcategoryid) VALUES 
('Reading Comprehension', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Active Listening', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Mathematical', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Critical Thinking', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Active Learning', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Coordination', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Service Orientation', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Complex Problem Solving', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Technology Design', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Decision Making', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Financial Resources Management', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Written Comprehension', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Fluency of Ideas', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Mechanical', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Originality', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Visualization', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Perceptual Speed', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Java', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Unix', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('C#', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Cloud Computing', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Management', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Marketing', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Time Management', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Graphic Design', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Negotiation', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Leadership', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Video Editing', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Quality Assurance', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Accounting', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Budget Management', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Databases', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Software Development', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Statistics', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2),
('Javascript', '56c680ea-1814-4cdd-9bf9-7066e99ba392', GETDATE(), 'Admin', 2);


--=================== Insert positions ===================

INSERT INTO Positions (Title,Description,Status,RequiredSkills,DateCreated,CreatedBy,CreatedByDisplayName,LastUpdateDate,LastUpdateBy,LastUpdateByDisplayName) VALUES
('Android Developer', '<p><span style="font-size:24px">Responsibilities</span><br /> Microsoft Intune manages devices for companies and schools around the world. We&rsquo;re looking for great engineers who can innovate and improve on what we&rsquo;ve built. Located in Kendall Square, Cambridge, the Intune Device Experience team creates web and native user experiences for devices, and builds and operates the global-scale services that sit behind those experiences. Come help us empower people to get stuff done at work and at home on the devices they love.</p>  <p><br /> <span style="font-size:24px">Qualifications</span><br /> Job requirements:  &nbsp;&nbsp;</p>  <ul>  <li>You&rsquo;ve done this before - you have at least five years of software development experience in the industry.&nbsp;</li>  <li>You can code - you are comfortable in object-oriented languages like C#, C++, and Java; and you have a solid grasp of algorithms, data structures, and design patterns.&nbsp;</li>  <li>You can collaborate - you can explain your work, you can ask good questions, you can listen to your peers and your customers, and you like to give and receive feedback.&nbsp;</li>  <li>You stay focused - you want to build software that solves real problems for real people.&nbsp;</li>  <li>You&rsquo;re a professional engineer - you understand that it&rsquo;s not enough to write code that works; it also has to be well-designed, easy to test, and easy to add to over time.&nbsp;</li> </ul>  <p>Microsoft&rsquo;s New England Research &amp; Development Center (NERD) attracts the region&rsquo;s top talent and delivers some of Microsoft&rsquo;s most strategic products and services.&nbsp;</p>',
 1, '4,18,15,16,8', GETDATE(), '14bae507-c7c8-4841-b36a-4200ba67c2d1', 'Amos Danon', GETDATE(), 'RAdmin RAdmin'
),
('System Administrator', '<p><strong>Is it for you?</strong><br /> Either way you&rsquo;ll need a good knowledge of the way businesses work and gain as much experience as you can in working with other employees who are employed in technical and non-technical roles. &nbsp;</p>  <p>Other technical support roles, such as&nbsp;<a href="https://www.monster.co.uk/jobs/q-database-administrator-jobs.aspx?WT.mc_n=CAJSRIT001" title="Database Admin Jobs">Database Administrators</a>,&nbsp;<a href="https://www.monster.co.uk/jobs/q-desktop-support-technician-jobs.aspx" title="Desktop Support Jobs">Desktop Support Technicians</a>&nbsp;and&nbsp;<a href="https://www.monster.co.uk/jobs/q-network-administrator-jobs.aspx?WT.mc_n=CAJSRIT001" title="Network Admin Jobs">Network Administrators</a>, may easily transition into a System Administration role.</p>  <p>This is a role for which you&rsquo;ll probably already have aptitude, non-techie types rarely enter this type of job, so if you can demonstrate clear thinking, enthusiasm and a wider understanding of your company&rsquo;s objectives to your technical skills you&rsquo;ll find yourself becoming much more important and in demand where you work.</p>  <p><strong>Qualifications and skills</strong><br /> The route to becoming a System Administrator is quite varied and in some cases requires no formal qualification path. On the other hand, you can study for a Computer Sciences degree or other computer related courses and gain your experience of prevailing systems as you work.</p>  <p>Qualifications such as a Bachelor degree, with a technical subject such as engineering or computer science can, of course be taken before work but gaining yourself an internship and becoming certified in a specific server program are also good ways to begin your career. &nbsp;</p>  <p>To progress to more senior roles, a system administrator should have some knowledge of project management and have proven experience in handling complex assignments.</p>',
 1, '9,10', GETDATE(), '14bae507-c7c8-4841-b36a-4200ba67c2d1', 'Amos Danon', GETDATE(), 'RAdmin RAdmin'
);

--=================== Insert Test Solutions and Feedback ===================

DECLARE @TestId int;
SET @TestId = (SELECT TOP 1 Id FROM Tests ORDER BY DateCreated DESC);

INSERT INTO TestSolutions (TestId, FullName, Email, IsMember, TimeInSeconds, CandidateUserId, DateCreated, IsEvaluated) 
VALUES 
(@TestId, 'Avi Levi', 'avilevi@gmail.com', 0, 600, NULL, GETDATE(), 0),
(@TestId, 'Oz Perez', 'ozperez@gmail.com', 0, 600, NULL, GETDATE(), 0),
(@TestId, 'Doron Yakir', 'doronya@gmail.com', 0, 600, NULL, GETDATE(), 0),
(@TestId, 'James Jameson', 'jamesjj@gmail.com', 0, 600, NULL, GETDATE(), 0);

DECLARE @TestSolutionIds TABLE(idx int identity(1,1), id int);

INSERT INTO @TestSolutionIds (id) SELECT id FROM TestSolutions WHERE TestId = @TestId AND IsEvaluated = 0;

DECLARE @TestSolutionId Integer
WHILE exists (SELECT * FROM @TestSolutionIds)
	BEGIN

		SELECT @TestSolutionId = Min(id) FROM @TestSolutionIds;

		DECLARE @QuestionsIds TABLE(idx int identity(1,1), id int);

		INSERT INTO @QuestionsIds (id) SELECT questionId FROM TestQuestions WHERE TestId = @TestId;

		DECLARE @QuestionId Integer
		WHILE exists (SELECT * FROM @questionsIds)
			BEGIN
				SELECT @QuestionId = Min(id) FROM @QuestionsIds

				INSERT INTO TestSolutionQuestions (TestSolutionId, QuestionId, Solution, Feedback, Score)
				VALUES (@TestSolutionId, @QuestionId, 'somesolution', NULL, FLOOR(RAND()*(10-1)));

				DELETE FROM @questionsIds WHERE id = @QuestionId
			END

		DELETE FROM @TestSolutionIds WHERE id = @TestSolutionId
	END

UPDATE TestSolutions SET IsEvaluated = 1 WHERE TestId = @TestId;

--============================================================================--
