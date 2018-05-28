import { RuleRecord } from '../../models';
import * as shortid from 'shortid';

const data = {
    id: shortid.generate(),
    name: 'Add Product Rules',
    content: `rule AddProduct {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'EXECUTE_COMMAND' && a.data.name == 'Add Product') from s.action;
            p: Card from s.load('Products', a.params.Name);
        }
        then {
            if (p.allCards.length === 0) {
                r.add('CREATE_CARD', {
                    type: 'Order'
                });
                r.add('SET_CARD_TAG', {
                    type: 'Order Product',
                    value: p.name
                });
            } else {
                r.add('EXECUTE_COMMAND', {
                    name: 'Select Portion',
                    params: {
                        Name: p.name
                    }
                });
            }
        }
    }
    
    rule SelectPortion {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'EXECUTE_COMMAND' && a.data.name == 'Select Portion') from s.action;
            p: Card from s.load('Products', a.params.Name);
        }
        then {
            const parameters = s.extract(p);
            r.add('ASK_QUESTION', {
                question: 'Select Portion',
                tag: 'SelectPortion',
                cardName: a.params.Name,
                parameters
            });
        }
    }
    
    rule AddProductWithPortion {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'ASK_QUESTION' && a.data.tag == 'SelectPortion') from s.action;
            p: Card from s.load('Products', a.data.cardName);
        }
        then {
            r.add('CREATE_CARD', {
                type: 'Order'
            });
            let selectedPortion = s.get('Portions');
            if (selectedPortion) {
                let portion = p.findSubTag('Portions', selectedPortion);
                r.add('SET_CARD_TAG', {
                    type: 'Order Product',
                    value: p.name,
                    amount: portion.amount,
                    unit: portion.value
                });
            } else {
                r.add('SET_CARD_TAG', {
                    type: 'Order Product',
                    value: p.name
                });
            }
            for (const key of Object.keys(a.data.parameters)) {
                const value = s.get(key);
                if (key !== 'Portions' && value) {
                    r.add('SET_CARD_TAG', {
                        name: key,
                        value
                    });
                }
            }
        }
    }`
};

export default new RuleRecord(data);