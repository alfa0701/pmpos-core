import { ActionType } from "./ActionType";

export class ResultType {
    private actions: ActionType[];

    constructor() {
        this.actions = [];
    }

    public clear() {
        while (this.actions.length > 0) {
            this.actions.pop();
        }
    }

    public add(type: string, data: any) {
        this.actions.push(new ActionType(type, data));
    }

    public resetParent(cardId: number) {
        this.actions.push(new ActionType('RESET_PARENT_CARD', cardId));
    }

    public concatActionsTo(r: ActionType[]) {
        return r.concat(this.actions);
    }
}