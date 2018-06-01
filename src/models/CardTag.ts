import { Record } from 'immutable';
import { Parser } from 'expr-eval';

export interface ICardTag {
    id: string;
    typeId: string;
    name: string;
    category: string;
    value: string;
    quantity: number;
    unit: string;
    amount: number;
    func: string;
    source: string;
    target: string;
    cardId: string;
    ref: string;
    sourceCardId: string;
    targetCardId: string;
}

export class CardTagRecord extends Record<ICardTag>({
    id: '',
    typeId: '',
    name: '',
    category: '',
    value: '',
    quantity: 0,
    unit: '',
    amount: 0,
    func: '',
    source: '',
    target: '',
    cardId: '',
    ref: '',
    sourceCardId: '',
    targetCardId: ''
}) {

    get display(): string {
        const key = !this.name || this.name[0] === '_' ? '' : this.name + ': ';
        return `${key}${this.valueDisplay}`;
    }

    get valueDisplay(): string {
        const u = this.unit ? ' ' + this.unit : '';
        const q = this.quantity !== 0 ? this.quantity + u + ' ' : '';
        return this.value ? q + this.value : '';
    }
    get realQuantity(): number {
        return this.quantity !== 0 ? this.quantity : 1;
    }
    public getDebit(parentDebit: number, parentCredit: number): number {
        return this.source ? this.realQuantity * this.getRealAmount(parentDebit, parentCredit) : 0;
    }
    public getCredit(parentDebit: number, parentCredit: number): number {
        return this.target ? this.realQuantity * this.getRealAmount(parentDebit, parentCredit) : 0;
    }
    public getBalance(parentDebit: number, parentCredit: number): number {
        return this.getDebit(parentDebit, parentCredit) - this.getCredit(parentDebit, parentCredit);
    }
    public getRealAmount(parentDebit: number, parentCredit: number): number {
        if (this.func) {
            return Parser.evaluate(this.func, {
                a: this.amount, d: parentDebit, c: parentCredit,
                p: parentDebit - parentCredit
            });
        }
        return this.amount;
    }
    public getInQuantityFor(location?: string): number {
        location = location && location.toLowerCase();
        if (location && this.value.toLowerCase().includes(location)) {
            return this.target ? this.quantity : 0;
        }
        return this.target && (!location || this.target.toLowerCase().includes(location)) ? this.quantity : 0;
    }

    public getOutQuantityFor(location?: string): number {
        location = location && location.toLowerCase();
        if (location && this.value.toLowerCase().includes(location)) {
            return this.target ? 0 : this.quantity;
        }
        return this.source && (!location || this.source.toLowerCase().includes(location)) ? this.quantity : 0;
    }

    public getTotalQuantityFor(location: string): number {
        return this.getInQuantityFor(location) - this.getOutQuantityFor(location);
    }

    get locationDisplay(): string {
        return this.source || this.target ? `${this.source} > ${this.target}` : '';
    }

    public acceptsFilter(filter: string): boolean {
        const sv = filter.toLowerCase();
        return (this.value.toLowerCase().includes(sv) && this.name !== 'Name')
            || this.source.toLowerCase().includes(sv)
            || this.target.toLowerCase().includes(sv);
    }
}
