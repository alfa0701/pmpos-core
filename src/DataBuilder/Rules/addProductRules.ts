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
            const parameters = p;
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
            selectedValues: Object from s.get('selectedValues');
            selectedPortion:Object from selectedValues['Portions'][0];
        }
        then {
            r.add('CREATE_CARD', {
                type: 'Order'
            });
    
            r.add('SET_CARD_TAG', {
                type: 'Order Product',
                value: p.name,
                category: 'Portions',
                ref: selectedPortion.ref,
                amount: selectedPortion.amount,
                unit: selectedPortion.value
            });
    
            for (const key of Object.keys(selectedValues)) {
                if (key !== 'Portions') {
                    for (const value of selectedValues[key]) {
                        r.add('SET_CARD_TAG', {
                            value: value.value,
                            category: key,
                            ref: value.ref,
                            amount: value.amount,
                            quantity: value.quantity > 1 ? value.quantity : 0
                        });
                    }
                }
            }
        }
    }`
};

export default new RuleRecord(data);