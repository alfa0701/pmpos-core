import { CardTagRecord } from './CardTag';
import { CardRecord } from './Card';

export default class {
    public key: string;
    public tag: CardTagRecord;
    public card: CardRecord;

    constructor(key: string, tag: CardTagRecord, card: CardRecord) {
        this.key = key;
        this.tag = tag;
        this.card = card;
    }

    get display(): string {
        // return this.tag.display;
        return this.tag.valueDisplay;
    }

    get id(): string {
        return this.tag.id;
    }

    get name(): string {
        return this.card.name;
    }

    get time(): number {
        return this.card.time;
    }

    public getInDisplayFor(filter: string): string {
        let inValue = this.tag.getInQuantityFor(filter);
        return inValue !== 0 ? String(inValue) : '';
    }

    public getOutDisplayFor(filter: string): string {
        let outValue = this.tag.getOutQuantityFor(filter);
        return outValue !== 0 ? String(outValue) : '';
    }

    public getTotalFor(filter: string): number {
        return this.tag.getInQuantityFor(filter) - this.tag.getOutQuantityFor(filter);
    }

    public getDebitDisplayFor(filter: string): string {
        let debit = this.getDebitFor(filter);
        return debit !== 0 ? debit.toFixed(2) : '';
    }

    public getCreditDisplayFor(filter: string): string {
        let credit = this.getCreditFor(filter);
        return credit !== 0 ? credit.toFixed(2) : '';
    }

    public getBalanceFor(filter: string): number {
        return this.getDebitFor(filter) - this.getCreditFor(filter);
    }

    public isSourceAccount(filter: string): boolean {
        return this.tag.source.toLowerCase().includes(filter.toLowerCase());
    }

    public isTargetAccount(filter: string): boolean {
        return this.tag.target.toLowerCase().includes(filter.toLowerCase());
    }

    public isAccount(filter: string): boolean {
        return this.isSourceAccount(filter) || this.isTargetAccount(filter);
    }

    public getDebitFor(filter: string): number {
        if (this.isAccount(filter)) {
            return this.isTargetAccount(filter) ? this.card.getTagCredit(this.tag) : 0;
        }
        if (!this.tag.acceptsFilter(filter)) { return 0; }
        if (!this.tag.source && !this.tag.target) {
            return this.card.debit;
        }
        if (this.tag.target && this.tag.source) {
            return Math.abs(this.card.debit);
        }
        return this.tag.target ? Math.abs(this.card.balance) : 0;
    }

    public getCreditFor(filter: string): number {
        if (this.isAccount(filter)) {
            return this.isSourceAccount(filter) ? this.card.getTagDebit(this.tag) : 0;
        }
        if (!this.tag.acceptsFilter(filter)) { return 0; }
        if (!this.tag.source && !this.tag.target) {
            return this.card.credit;
        }
        if (this.tag.target && this.tag.source) {
            return Math.abs(this.card.credit);
        }
        return this.tag.source ? Math.abs(this.card.balance) : 0;
    }
}