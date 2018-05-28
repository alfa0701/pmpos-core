import { ActionType } from "./ActionType";
import { CardRecord } from "../models";
import extract from './ButtonExtractor';
import CardManager from "../CardManager";
import * as _ from 'lodash';

export class ActionData {
    public action: ActionType;
    public card: CardRecord;
    public root: CardRecord;
    public state: Map<string, any>;

    constructor(action: ActionType, card: CardRecord, root: CardRecord, state: Map<string, any>) {
        this.action = action;
        this.card = card;
        this.root = root;
        this.state = state;
    }
    public load(cardType: string, cardName: string) {
        return CardManager.getCardByName(cardType, cardName);
    }
    public count(cardType: string): number {
        return CardManager.getCount(cardType);
    }
    public padStart(val: string, count: number, ch: string) {
        return _.padStart(val, count, ch);
    }
    public extract(card: CardRecord): {} | undefined {
        return extract(card);
    }
    public get(key: string) {
        return this.state.get(key);
    }
}