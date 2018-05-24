import CardOperation from '../CardOperation';
import { ActionRecord, CardRecord } from '../../models';

export default class CloseCard extends CardOperation {
    constructor() {
        super('CLOSE_CARD', 'Close Card');
    }
    public canEdit(action: ActionRecord): boolean {
        return false;
    }
    public canApply(card: CardRecord, data: any): boolean {
        return data.id && !card.isClosed && card.balance === 0;
    }
    public readConcurrencyData(card: CardRecord, actionData: any) {
        return undefined;
    }
    public reduce(card: CardRecord, data: any): CardRecord {
        return card.set('isClosed', true);
    }
    public fixData(data: any) {
        return data;
    }
    public processPendingAction(action: ActionRecord): ActionRecord {
        return action;
    }
}