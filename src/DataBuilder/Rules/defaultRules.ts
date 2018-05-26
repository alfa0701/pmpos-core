import { RuleRecord } from '../../models';
import * as shortid from 'shortid';

const data = {
    id: shortid.generate(),
    name: 'Default Rules',
    content: `rule SetTicketNumber {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'COMMIT_CARD' from s.action;
            c: Card c.name === '' && c.type == 'Tickets' from s.root;
        }
        then {
          r.add('SET_CARD_TAG',{
            'name'    : 'Name',
            'value'   : 'A' + s.padStart(s.count(c.type) + 1, 4, '0')
          });
        }
    }
    
    rule SetNewTicketState {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'CREATE_CARD' && a.data.type=='Tickets' from s.action;
        }
        then {
          r.add('SET_CARD_TAG',{
            'value'   : 'New Ticket',
            'type'    : 'Ticket Status'
          });
        }
    }
    
    rule SetUnpaidTicketState {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'COMMIT_CARD' from s.action;
            c: Card c.getTag('Status','')=='New Ticket' && c.balance > 0 from s.root;
        }
        then {
          r.add('SET_CARD_TAG',{
            'type'    : 'Ticket Status',
            'value'   : 'Unpaid'
          });
        }
    }
    rule SetPaidTicketState {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'COMMIT_CARD' from s.action;
            c: Card c.getTag('Status','')!=='Paid' && c.balance == 0 && c.debit > 0 from s.root;
        }
        then {
          r.add('SET_CARD_TAG',{
            'type'    : 'Ticket Status',
            'value'   : 'Paid'
          });
          r.add('CLOSE_CARD');
        }
    }
    rule AddProduct {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'EXECUTE_COMMAND' && a.data.name == 'Add Product' from s.action;
            p: Card from s.load('Products',a.params.Name);
        }
        then {
            let portions = p.getSubCard('Portions');
            if(!portions) {
              r.add('CREATE_CARD',{type:'Order'});
              r.add('SET_CARD_TAG',{
                tag:      'add-product',
                type:     'Order Product',
                value:    p.name
              });
            }else{
              r.add('EXECUTE_COMMAND', {name:'Select Portion', params:{Name:p.name}});
            }
        }
    }
    rule SelectPortion {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'EXECUTE_COMMAND' && a.data.name == 'Select Portion' from s.action;
            p: Card from s.load('Products', a.params.Name);
            portions: Card from p.getSubCard('Portions');
        }
        then {
           r.add('ASK_QUESTION',{
              question:'Select Portion',
              tag:'SelectPortion',
              cardName: a.params.Name,
              parameters: {
                'portion': portions.allTags.filter(t=>t.name!=='Name').map(p => p.value + ' (' + p.amount.toFixed(2) + ')=' + p.value)
              }
            });
        }
    }
    
    rule AddProductWithPortion{
        when {
          r: Result;
          s: State;
          a: Action a.type == 'ASK_QUESTION' && a.data.tag == 'SelectPortion' from s.action;
          p: Card from s.load('Products', a.data.cardName);
          portions: Card from p.getSubCard('Portions');
          selected: String from s.get('portion');
        }
        then {
          let portion = portions.tags.find(t => t.value === selected);
          r.add('CREATE_CARD',{type:'Order'});
          r.add('SET_CARD_TAG',{
            tag     : 'add-product',
            type    : 'Order Product',
            value   : p.name,
            amount  : portion.amount,
            unit    : portion.value
          });
        }
      }
    `
};

export default new RuleRecord(data);