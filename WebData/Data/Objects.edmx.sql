
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 03/10/2018 20:00:09
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

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[C__EFMigrationsHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[C__EFMigrationsHistory];
GO
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
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'C__EFMigrationsHistory'
CREATE TABLE [dbo].[C__EFMigrationsHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

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
    [LastName] nvarchar(max)  NULL
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
    [ResumeUrl] nvarchar(max)  NULL,
    [IdentityId_Id] nvarchar(450)  NOT NULL
);
GO

-- Creating table 'Skills'
CREATE TABLE [dbo].[Skills] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [CreatedBy] nvarchar(max)  NOT NULL,
    [DateCreated] nvarchar(max)  NOT NULL
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

-- Creating primary key on [MigrationId] in table 'C__EFMigrationsHistory'
ALTER TABLE [dbo].[C__EFMigrationsHistory]
ADD CONSTRAINT [PK_C__EFMigrationsHistory]
    PRIMARY KEY CLUSTERED ([MigrationId] ASC);
GO

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

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------