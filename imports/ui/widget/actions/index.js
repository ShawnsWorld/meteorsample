import { EditingWidgets } from '../../../api/editingWidgets';

export function change(editingWidget) {
    Meteor.call('editingWidgets.save', editingWidget);
}

export default actions = {
    border: {
        onSideSelected: (_id, side)=> {
            if (side === 'all')
                EditingWidgets.update({_id: _id}, {'$push': {'panelStatus.border.selected': {'$each': ['all','top','right','bottom','left']}}});
            else
                EditingWidgets.update({_id: _id}, {'$push': {'panelStatus.border.selected': side}});
        },
        onSideUnSelected: (_id, side)=> {
            if (side === 'all')
                EditingWidgets.update({_id: _id}, {'$set': {'panelStatus.border.selected': []}});
            else
                EditingWidgets.update({_id: _id}, {'$pullAll': {'panelStatus.border.selected': [side, 'all']}});
        },
        onBorderChanged: (_id, selected, key, value)=> {
            let changeSet = {};
            selected.map((side)=>{
                if (side === 'all') {
                    changeSet['styles.border.' + key] = value;
                } else {
                    changeSet['styles.border.' + side + '.' + key] = value;
                }
            })
            console.log(changeSet)
            EditingWidgets.update({_id: _id}, {'$set': changeSet});
        }
    }
}
