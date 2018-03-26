
export interface ISettingsObject {
    showTodoListButton:boolean;
}

export class SearchQuestionSettings implements ISettingsObject {

    public showTodoListButton:boolean = true;

    private static _instance:SearchQuestionSettings;
    private constructor() {}
    public static get Instance() {
        return this._instance || (this._instance = new SearchQuestionSettings());
    }
}

export class PublishedQuestionSettings implements ISettingsObject {

    public showTodoListButton:boolean = false;

    private static _instance:PublishedQuestionSettings;
    private constructor() {}
    public static get Instance() {
        return this._instance || (this._instance = new PublishedQuestionSettings());
    }
}