import { RuleRecord } from '../../models';

const data = {
    id: 'Sy_87lXem',
    name: 'New Card Props',
    content: `rule SetNewModifierProps {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'CREATE_CARD' && a.data.type == 'Modifier Groups') from s.action;
        }
        then {
            r.add('ASK_QUESTION', {
                question: 'Enter Name & Items',
                tag: 'New Modifier Group',
                parameters: {
                    'Name': '',
                    'Items': {
                        values: [],
                        lines: 7
                    }
                }
            });
        }
    }
    
    rule SetModifiers {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'ASK_QUESTION' && a.data.tag == 'New Modifier Group') from s.action;
        }
        then {
            r.add('SET_CARD_TAG', {
                name: 'Name',
                value: s.getValue('Name')
            });
            const items = s.getValues('Items').split(/\\n/).filter(x => x.trim());
            for (const item of items) {
                r.add('CREATE_CARD', {
                    type: 'Modifier'
                });
                r.add('SET_CARD_TAG', {
                    name: 'Name',
                    value: item
                });
                r.resetParent(s.root.id);
            }
        }
    }
    
    rule SetCustomerProps {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'CREATE_CARD' && a.data.type == 'Customers') from s.action;
        }
        then {
            r.add('ASK_QUESTION', {
                question: 'Create New Customer',
                tag: 'New Customer',
                parameters: {
                    'Name': '',
                    'Phone': '',
                    'Address': ''
                }
            });
        }
    }
    
    rule SetCustomerName {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'ASK_QUESTION' && a.data.tag == 'New Customer') from s.action;
        }
        then {
            r.add('SET_CARD_TAG', {
                name: 'Name',
                value: s.getValue('Name')
            });
            r.add('SET_CARD_TAG', {
                name: 'Phone',
                type: 'Customer Phone',
                value: s.getValue('Phone')
            });
            r.add('SET_CARD_TAG', {
                name: 'Address',
                type: 'Customer Address',
                value: s.getValue('Address')
            });
        }
    }`
};

export default new RuleRecord(data);