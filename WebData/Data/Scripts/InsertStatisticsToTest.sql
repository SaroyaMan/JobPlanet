--=================== Insert Test Solutions and Feedback ===================

DECLARE @TestId int;
SET @TestId = (SELECT TOP 1 Id FROM Tests ORDER BY DateCreated DESC);

INSERT INTO TestSolutions (TestId, FullName, Email, IsMember, TimeInSeconds, CandidateUserId, DateCreated, IsEvaluated) 
VALUES 
(@TestId, 'Avi Levi', 'avilevi@gmail.com', 0, FLOOR(RAND()*(2000) + 600), NULL, GETDATE(), 0),
(@TestId, 'Oz Perez', 'ozperez@gmail.com', 0, FLOOR(RAND()*(2000) + 600), NULL, GETDATE(), 0),
(@TestId, 'Doron Yakir', 'doronya@gmail.com', 0, FLOOR(RAND()*(2000) + 600), NULL, GETDATE(), 0),
(@TestId, 'James Jameson', 'jamesjj@gmail.com', 0, FLOOR(RAND()*(2000) + 600), NULL, GETDATE(), 0),
(@TestId, 'Aya Mazor', 'aya.mazor@gmail.com', 1, FLOOR(RAND()*(2000) + 600), NULL, GETDATE(), 0);

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
				VALUES (@TestSolutionId, @QuestionId, 'somesolution', NULL, FLOOR(RAND()*(10) + 1));

				DELETE FROM @questionsIds WHERE id = @QuestionId
			END

		DELETE FROM @TestSolutionIds WHERE id = @TestSolutionId
	END

UPDATE TestSolutions SET IsEvaluated = 1 WHERE TestId = @TestId;