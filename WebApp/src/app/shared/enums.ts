
export enum AccessModifier {
    Private = 1,
    Shared = 2,
    Public = 3,
}

export enum RefObjectType {
    Candidate = 1,  // Resume
    Question = 2,   // Attachment
}

export enum QuestionState {
    General = 1,
    InMyTodoList = 2,
    InMyDoneList = 3,
    PublishedByMe = 4,
}

export enum PositionStatus {
    Opened = 1,
    Closed = 2,
    Pending = 3,
}

export enum CandidatePositionStatus {
    InProgress = 1,
    PendingAnswer = 2,
    Recruited = 3,
    Denied = 4,
}

export enum NotificationType {
    Recommendation = 1,
}

export enum PositionDiagramType {
    TestScore,
    SkillsDistribution,
    PositionMatch,
}