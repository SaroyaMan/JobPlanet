
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/03/2018 20:29:47
-- Generated from EDMX file: D:\Softwares\Visual Studio Output\JobPlanet\WebData\Data\Objects.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [jobplanet1];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_AspNetRoleClaims_AspNetRoles_RoleId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetRoleClaims] DROP CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserClaims_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserLogins_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRoles]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FK_CandidateAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Candidates] DROP CONSTRAINT [FK_CandidateAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_RecruiterAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Recruiters] DROP CONSTRAINT [FK_RecruiterAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_SkillSkillCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Skills] DROP CONSTRAINT [FK_SkillSkillCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_CandidateQuestionQuestion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CandidateQuestions] DROP CONSTRAINT [FK_CandidateQuestionQuestion];
GO
IF OBJECT_ID(N'[dbo].[FK_CandidateQuestionCandidate]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CandidateQuestions] DROP CONSTRAINT [FK_CandidateQuestionCandidate];
GO
IF OBJECT_ID(N'[dbo].[FK_CandidatePositionPosition]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CandidatePositions] DROP CONSTRAINT [FK_CandidatePositionPosition];
GO
IF OBJECT_ID(N'[dbo].[FK_CandidatePositionCandidate]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CandidatePositions] DROP CONSTRAINT [FK_CandidatePositionCandidate];
GO
IF OBJECT_ID(N'[dbo].[FK_PositionTest]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Tests] DROP CONSTRAINT [FK_PositionTest];
GO
IF OBJECT_ID(N'[dbo].[FK_QuestionTestQuestion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuestionTests] DROP CONSTRAINT [FK_QuestionTestQuestion];
GO
IF OBJECT_ID(N'[dbo].[FK_QuestionTestTest]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[QuestionTests] DROP CONSTRAINT [FK_QuestionTestTest];
GO
IF OBJECT_ID(N'[dbo].[FK_TestSolutionTest]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TestSolutions] DROP CONSTRAINT [FK_TestSolutionTest];
GO
IF OBJECT_ID(N'[dbo].[FK_TestSolutionQuestionTestSolution]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TestSolutionQuestions] DROP CONSTRAINT [FK_TestSolutionQuestionTestSolution];
GO
IF OBJECT_ID(N'[dbo].[FK_PositionPositionSkill]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PositionSkills] DROP CONSTRAINT [FK_PositionPositionSkill];
GO
IF OBJECT_ID(N'[dbo].[FK_SkillPositionSkill]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PositionSkills] DROP CONSTRAINT [FK_SkillPositionSkill];
GO
IF OBJECT_ID(N'[dbo].[FK_RecommendationNotificationNotification]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RecommendationNotifications] DROP CONSTRAINT [FK_RecommendationNotificationNotification];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AspNetRoleClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoleClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserTokens]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserTokens];
GO
IF OBJECT_ID(N'[dbo].[Candidates]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Candidates];
GO
IF OBJECT_ID(N'[dbo].[Skills]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Skills];
GO
IF OBJECT_ID(N'[dbo].[Recruiters]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Recruiters];
GO
IF OBJECT_ID(N'[dbo].[SkillCategories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SkillCategories];
GO
IF OBJECT_ID(N'[dbo].[Questions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Questions];
GO
IF OBJECT_ID(N'[dbo].[Attachments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Attachments];
GO
IF OBJECT_ID(N'[dbo].[CandidateQuestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CandidateQuestions];
GO
IF OBJECT_ID(N'[dbo].[Tests]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Tests];
GO
IF OBJECT_ID(N'[dbo].[Positions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Positions];
GO
IF OBJECT_ID(N'[dbo].[CandidatePositions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CandidatePositions];
GO
IF OBJECT_ID(N'[dbo].[QuestionTests]', 'U') IS NOT NULL
    DROP TABLE [dbo].[QuestionTests];
GO
IF OBJECT_ID(N'[dbo].[TestSolutions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TestSolutions];
GO
IF OBJECT_ID(N'[dbo].[TestSolutionQuestions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TestSolutionQuestions];
GO
IF OBJECT_ID(N'[dbo].[PositionSkills]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PositionSkills];
GO
IF OBJECT_ID(N'[dbo].[Notifications]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notifications];
GO
IF OBJECT_ID(N'[dbo].[RecommendationNotifications]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RecommendationNotifications];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'AspNetRoleClaims'
CREATE TABLE [dbo].[AspNetRoleClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL,
    [RoleId] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'AspNetRoles'
CREATE TABLE [dbo].[AspNetRoles] (
    [Id] nvarchar(450)  NOT NULL,
    [ConcurrencyStamp] nvarchar(max)  NULL,
    [Name] nvarchar(256)  NULL,
    [NormalizedName] nvarchar(256)  NULL
);
GO

-- Creating table 'AspNetUserClaims'
CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL,
    [UserId] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'AspNetUserLogins'
CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] nvarchar(450)  NOT NULL,
    [ProviderKey] nvarchar(450)  NOT NULL,
    [ProviderDisplayName] nvarchar(max)  NULL,
    [UserId] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'AspNetUsers'
CREATE TABLE [dbo].[AspNetUsers] (
    [Id] nvarchar(450)  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [ConcurrencyStamp] nvarchar(max)  NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [LockoutEnabled] bit  NOT NULL,
    [LockoutEnd] datetimeoffset  NULL,
    [NormalizedEmail] nvarchar(256)  NULL,
    [NormalizedUserName] nvarchar(256)  NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [UserName] nvarchar(256)  NULL,
    [FirstName] nvarchar(max)  NULL,
    [LastName] nvarchar(max)  NULL,
    [ChildId] int  NOT NULL
);
GO

-- Creating table 'AspNetUserTokens'
CREATE TABLE [dbo].[AspNetUserTokens] (
    [UserId] nvarchar(450)  NOT NULL,
    [LoginProvider] nvarchar(450)  NOT NULL,
    [Name] nvarchar(450)  NOT NULL,
    [Value] nvarchar(max)  NULL
);
GO

-- Creating table 'Candidates'
CREATE TABLE [dbo].[Candidates] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IdentityId_Id] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'Skills'
CREATE TABLE [dbo].[Skills] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [CreatedBy] nvarchar(max)  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [CreatedByDisplayName] nvarchar(max)  NOT NULL,
    [LastUpdateDate] datetime  NOT NULL,
    [LastUpdateBy] nvarchar(max)  NOT NULL,
    [LastUpdateByDisplayName] nvarchar(max)  NOT NULL,
    [SkillCategoryId] int  NOT NULL
);
GO

-- Creating table 'Recruiters'
CREATE TABLE [dbo].[Recruiters] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IdentityId_Id] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'SkillCategories'
CREATE TABLE [dbo].[SkillCategories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Questions'
CREATE TABLE [dbo].[Questions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NULL,
    [DateCreated] datetime  NOT NULL,
    [CreatedByDisplayName] nvarchar(max)  NOT NULL,
    [LastUpdateDate] datetime  NOT NULL,
    [LastUpdateBy] nvarchar(max)  NOT NULL,
    [LastUpdateByDisplayName] nvarchar(max)  NOT NULL,
    [Rank] float  NOT NULL,
    [RankSum] float  NOT NULL,
    [RankedCount] int  NOT NULL,
    [AccessModifier] int  NOT NULL,
    [SolvedCount] int  NOT NULL,
    [TestedSkills] nvarchar(max)  NOT NULL,
    [CreatedBy] nvarchar(max)  NOT NULL,
    [MatchingVector] nvarchar(max)  NULL
);
GO

-- Creating table 'Attachments'
CREATE TABLE [dbo].[Attachments] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FileName] nvarchar(max)  NOT NULL,
    [FileContent] varbinary(max)  NOT NULL,
    [FileType] nvarchar(max)  NOT NULL,
    [RefObjectType] int  NOT NULL,
    [RefObjectId] int  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [LastUpdateDate] datetime  NOT NULL
);
GO

-- Creating table 'CandidateQuestions'
CREATE TABLE [dbo].[CandidateQuestions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [QuestionId] int  NOT NULL,
    [CandidateUserId] int  NOT NULL,
    [IsDone] bit  NOT NULL,
    [Solution] nvarchar(max)  NULL,
    [SolutionDate] datetime  NULL,
    [Ranked] float  NULL,
    [Review] nvarchar(max)  NULL
);
GO

-- Creating table 'Tests'
CREATE TABLE [dbo].[Tests] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(max)  NOT NULL,
    [Difficulty] float  NOT NULL,
    [TimeFrameInMinutes] int  NOT NULL,
    [MaxQuestions] int  NOT NULL,
    [FocusedSkills] nvarchar(max)  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [CreatedBy] nvarchar(max)  NOT NULL,
    [CreatedByDisplayName] nvarchar(max)  NOT NULL,
    [LastUpdateDate] datetime  NOT NULL,
    [LastUpdateBy] nvarchar(max)  NOT NULL,
    [LastUpdateByDisplayName] nvarchar(max)  NOT NULL,
    [PositionId] int  NOT NULL,
    [FinalDifficultyLevel] float  NOT NULL
);
GO

-- Creating table 'Positions'
CREATE TABLE [dbo].[Positions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NULL,
    [Status] int  NOT NULL,
    [RequiredSkills] nvarchar(max)  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [CreatedBy] nvarchar(max)  NOT NULL,
    [CreatedByDisplayName] nvarchar(max)  NOT NULL,
    [LastUpdateDate] datetime  NOT NULL,
    [LastUpdateBy] nvarchar(max)  NOT NULL,
    [LastUpdateByDisplayName] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'CandidatePositions'
CREATE TABLE [dbo].[CandidatePositions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PositionId] int  NOT NULL,
    [CandidateUserId] int  NOT NULL,
    [Comment] nvarchar(max)  NOT NULL,
    [Status] int  NOT NULL
);
GO

-- Creating table 'QuestionTests'
CREATE TABLE [dbo].[QuestionTests] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [QuestionId] int  NOT NULL,
    [TestId] int  NOT NULL
);
GO

-- Creating table 'TestSolutions'
CREATE TABLE [dbo].[TestSolutions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [TestId] int  NOT NULL,
    [FullName] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [IsMember] bit  NOT NULL,
    [TimeInSeconds] int  NOT NULL,
    [CandidateUserId] int  NULL,
    [DateCreated] datetime  NOT NULL
);
GO

-- Creating table 'TestSolutionQuestions'
CREATE TABLE [dbo].[TestSolutionQuestions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [TestSolutionId] int  NOT NULL,
    [QuestionId] int  NOT NULL,
    [Solution] nvarchar(max)  NULL
);
GO

-- Creating table 'PositionSkills'
CREATE TABLE [dbo].[PositionSkills] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PositionId] int  NOT NULL,
    [SkillId] int  NOT NULL,
    [SkillWeight] float  NOT NULL
);
GO

-- Creating table 'Notifications'
CREATE TABLE [dbo].[Notifications] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Type] int  NOT NULL,
    [DateCreated] datetime  NOT NULL,
    [Recipent] nvarchar(max)  NOT NULL,
    [IsViewed] bit  NOT NULL
);
GO

-- Creating table 'RecommendationNotifications'
CREATE TABLE [dbo].[RecommendationNotifications] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CandidateId] int  NOT NULL,
    [Approved] bit  NULL,
    [PositionId] int  NOT NULL,
    [Notification_Id] int  NOT NULL
);
GO

-- Creating table 'AspNetUserRoles'
CREATE TABLE [dbo].[AspNetUserRoles] (
    [AspNetRoles_Id] nvarchar(450)  NOT NULL,
    [AspNetUsers_Id] nvarchar(450)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'AspNetRoleClaims'
ALTER TABLE [dbo].[AspNetRoleClaims]
ADD CONSTRAINT [PK_AspNetRoleClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetRoles'
ALTER TABLE [dbo].[AspNetRoles]
ADD CONSTRAINT [PK_AspNetRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [PK_AspNetUserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [PK_AspNetUserLogins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUsers'
ALTER TABLE [dbo].[AspNetUsers]
ADD CONSTRAINT [PK_AspNetUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [UserId], [LoginProvider], [Name] in table 'AspNetUserTokens'
ALTER TABLE [dbo].[AspNetUserTokens]
ADD CONSTRAINT [PK_AspNetUserTokens]
    PRIMARY KEY CLUSTERED ([UserId], [LoginProvider], [Name] ASC);
GO

-- Creating primary key on [Id] in table 'Candidates'
ALTER TABLE [dbo].[Candidates]
ADD CONSTRAINT [PK_Candidates]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Skills'
ALTER TABLE [dbo].[Skills]
ADD CONSTRAINT [PK_Skills]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Recruiters'
ALTER TABLE [dbo].[Recruiters]
ADD CONSTRAINT [PK_Recruiters]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'SkillCategories'
ALTER TABLE [dbo].[SkillCategories]
ADD CONSTRAINT [PK_SkillCategories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Questions'
ALTER TABLE [dbo].[Questions]
ADD CONSTRAINT [PK_Questions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [RefObjectType], [RefObjectId] in table 'Attachments'
ALTER TABLE [dbo].[Attachments]
ADD CONSTRAINT [PK_Attachments]
    PRIMARY KEY CLUSTERED ([RefObjectType], [RefObjectId] ASC);
GO

-- Creating primary key on [QuestionId], [CandidateUserId] in table 'CandidateQuestions'
ALTER TABLE [dbo].[CandidateQuestions]
ADD CONSTRAINT [PK_CandidateQuestions]
    PRIMARY KEY CLUSTERED ([QuestionId], [CandidateUserId] ASC);
GO

-- Creating primary key on [Id] in table 'Tests'
ALTER TABLE [dbo].[Tests]
ADD CONSTRAINT [PK_Tests]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Positions'
ALTER TABLE [dbo].[Positions]
ADD CONSTRAINT [PK_Positions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [PositionId], [CandidateUserId] in table 'CandidatePositions'
ALTER TABLE [dbo].[CandidatePositions]
ADD CONSTRAINT [PK_CandidatePositions]
    PRIMARY KEY CLUSTERED ([PositionId], [CandidateUserId] ASC);
GO

-- Creating primary key on [QuestionId], [TestId] in table 'QuestionTests'
ALTER TABLE [dbo].[QuestionTests]
ADD CONSTRAINT [PK_QuestionTests]
    PRIMARY KEY CLUSTERED ([QuestionId], [TestId] ASC);
GO

-- Creating primary key on [Id] in table 'TestSolutions'
ALTER TABLE [dbo].[TestSolutions]
ADD CONSTRAINT [PK_TestSolutions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [TestSolutionId], [QuestionId] in table 'TestSolutionQuestions'
ALTER TABLE [dbo].[TestSolutionQuestions]
ADD CONSTRAINT [PK_TestSolutionQuestions]
    PRIMARY KEY CLUSTERED ([TestSolutionId], [QuestionId] ASC);
GO

-- Creating primary key on [PositionId], [SkillId] in table 'PositionSkills'
ALTER TABLE [dbo].[PositionSkills]
ADD CONSTRAINT [PK_PositionSkills]
    PRIMARY KEY CLUSTERED ([PositionId], [SkillId] ASC);
GO

-- Creating primary key on [Id] in table 'Notifications'
ALTER TABLE [dbo].[Notifications]
ADD CONSTRAINT [PK_Notifications]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RecommendationNotifications'
ALTER TABLE [dbo].[RecommendationNotifications]
ADD CONSTRAINT [PK_RecommendationNotifications]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [AspNetRoles_Id], [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [PK_AspNetUserRoles]
    PRIMARY KEY CLUSTERED ([AspNetRoles_Id], [AspNetUsers_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [RoleId] in table 'AspNetRoleClaims'
ALTER TABLE [dbo].[AspNetRoleClaims]
ADD CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetRoleClaims_AspNetRoles_RoleId'
CREATE INDEX [IX_FK_AspNetRoleClaims_AspNetRoles_RoleId]
ON [dbo].[AspNetRoleClaims]
    ([RoleId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserClaims_AspNetUsers_UserId'
CREATE INDEX [IX_FK_AspNetUserClaims_AspNetUsers_UserId]
ON [dbo].[AspNetUserClaims]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserLogins_AspNetUsers_UserId'
CREATE INDEX [IX_FK_AspNetUserLogins_AspNetUsers_UserId]
ON [dbo].[AspNetUserLogins]
    ([UserId]);
GO

-- Creating foreign key on [AspNetRoles_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRoles]
    FOREIGN KEY ([AspNetRoles_Id])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUsers]
    FOREIGN KEY ([AspNetUsers_Id])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserRoles_AspNetUsers'
CREATE INDEX [IX_FK_AspNetUserRoles_AspNetUsers]
ON [dbo].[AspNetUserRoles]
    ([AspNetUsers_Id]);
GO

-- Creating foreign key on [IdentityId_Id] in table 'Candidates'
ALTER TABLE [dbo].[Candidates]
ADD CONSTRAINT [FK_CandidateAspNetUser]
    FOREIGN KEY ([IdentityId_Id])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CandidateAspNetUser'
CREATE INDEX [IX_FK_CandidateAspNetUser]
ON [dbo].[Candidates]
    ([IdentityId_Id]);
GO

-- Creating foreign key on [IdentityId_Id] in table 'Recruiters'
ALTER TABLE [dbo].[Recruiters]
ADD CONSTRAINT [FK_RecruiterAspNetUser]
    FOREIGN KEY ([IdentityId_Id])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RecruiterAspNetUser'
CREATE INDEX [IX_FK_RecruiterAspNetUser]
ON [dbo].[Recruiters]
    ([IdentityId_Id]);
GO

-- Creating foreign key on [SkillCategoryId] in table 'Skills'
ALTER TABLE [dbo].[Skills]
ADD CONSTRAINT [FK_SkillSkillCategory]
    FOREIGN KEY ([SkillCategoryId])
    REFERENCES [dbo].[SkillCategories]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_SkillSkillCategory'
CREATE INDEX [IX_FK_SkillSkillCategory]
ON [dbo].[Skills]
    ([SkillCategoryId]);
GO

-- Creating foreign key on [QuestionId] in table 'CandidateQuestions'
ALTER TABLE [dbo].[CandidateQuestions]
ADD CONSTRAINT [FK_CandidateQuestionQuestion]
    FOREIGN KEY ([QuestionId])
    REFERENCES [dbo].[Questions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [CandidateUserId] in table 'CandidateQuestions'
ALTER TABLE [dbo].[CandidateQuestions]
ADD CONSTRAINT [FK_CandidateQuestionCandidate]
    FOREIGN KEY ([CandidateUserId])
    REFERENCES [dbo].[Candidates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CandidateQuestionCandidate'
CREATE INDEX [IX_FK_CandidateQuestionCandidate]
ON [dbo].[CandidateQuestions]
    ([CandidateUserId]);
GO

-- Creating foreign key on [PositionId] in table 'CandidatePositions'
ALTER TABLE [dbo].[CandidatePositions]
ADD CONSTRAINT [FK_CandidatePositionPosition]
    FOREIGN KEY ([PositionId])
    REFERENCES [dbo].[Positions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [CandidateUserId] in table 'CandidatePositions'
ALTER TABLE [dbo].[CandidatePositions]
ADD CONSTRAINT [FK_CandidatePositionCandidate]
    FOREIGN KEY ([CandidateUserId])
    REFERENCES [dbo].[Candidates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CandidatePositionCandidate'
CREATE INDEX [IX_FK_CandidatePositionCandidate]
ON [dbo].[CandidatePositions]
    ([CandidateUserId]);
GO

-- Creating foreign key on [PositionId] in table 'Tests'
ALTER TABLE [dbo].[Tests]
ADD CONSTRAINT [FK_PositionTest]
    FOREIGN KEY ([PositionId])
    REFERENCES [dbo].[Positions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PositionTest'
CREATE INDEX [IX_FK_PositionTest]
ON [dbo].[Tests]
    ([PositionId]);
GO

-- Creating foreign key on [QuestionId] in table 'QuestionTests'
ALTER TABLE [dbo].[QuestionTests]
ADD CONSTRAINT [FK_QuestionTestQuestion]
    FOREIGN KEY ([QuestionId])
    REFERENCES [dbo].[Questions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [TestId] in table 'QuestionTests'
ALTER TABLE [dbo].[QuestionTests]
ADD CONSTRAINT [FK_QuestionTestTest]
    FOREIGN KEY ([TestId])
    REFERENCES [dbo].[Tests]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_QuestionTestTest'
CREATE INDEX [IX_FK_QuestionTestTest]
ON [dbo].[QuestionTests]
    ([TestId]);
GO

-- Creating foreign key on [TestId] in table 'TestSolutions'
ALTER TABLE [dbo].[TestSolutions]
ADD CONSTRAINT [FK_TestSolutionTest]
    FOREIGN KEY ([TestId])
    REFERENCES [dbo].[Tests]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TestSolutionTest'
CREATE INDEX [IX_FK_TestSolutionTest]
ON [dbo].[TestSolutions]
    ([TestId]);
GO

-- Creating foreign key on [TestSolutionId] in table 'TestSolutionQuestions'
ALTER TABLE [dbo].[TestSolutionQuestions]
ADD CONSTRAINT [FK_TestSolutionQuestionTestSolution]
    FOREIGN KEY ([TestSolutionId])
    REFERENCES [dbo].[TestSolutions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [PositionId] in table 'PositionSkills'
ALTER TABLE [dbo].[PositionSkills]
ADD CONSTRAINT [FK_PositionPositionSkill]
    FOREIGN KEY ([PositionId])
    REFERENCES [dbo].[Positions]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [SkillId] in table 'PositionSkills'
ALTER TABLE [dbo].[PositionSkills]
ADD CONSTRAINT [FK_SkillPositionSkill]
    FOREIGN KEY ([SkillId])
    REFERENCES [dbo].[Skills]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_SkillPositionSkill'
CREATE INDEX [IX_FK_SkillPositionSkill]
ON [dbo].[PositionSkills]
    ([SkillId]);
GO

-- Creating foreign key on [Notification_Id] in table 'RecommendationNotifications'
ALTER TABLE [dbo].[RecommendationNotifications]
ADD CONSTRAINT [FK_RecommendationNotificationNotification]
    FOREIGN KEY ([Notification_Id])
    REFERENCES [dbo].[Notifications]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RecommendationNotificationNotification'
CREATE INDEX [IX_FK_RecommendationNotificationNotification]
ON [dbo].[RecommendationNotifications]
    ([Notification_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------