import { EditingWidgets } from '/imports/api/editingWidgets';

export function change(editingWidget) {
    Meteor.call('editingWidgets.save', editingWidget);
}

export default actions = {
    onActivePanelChanged: (_id, selected)=> {
        EditingWidgets.update({_id: _id}, {'$set': {'panelStatus.active': selected}});
    },
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
            EditingWidgets.update({_id: _id}, {'$set': changeSet});
        }
    },
    borderRadius: {
        onSideSelected: (_id, side)=> {
            if (side === 'all')
                EditingWidgets.update({_id: _id}, {'$push': {'panelStatus.borderRadius.selected': {'$each': ['all','topLeft','topRight','bottomRight','bottomLeft']}}});
            else
                EditingWidgets.update({_id: _id}, {'$push': {'panelStatus.borderRadius.selected': side}});
        },
        onSideUnSelected: (_id, side)=> {
            if (side === 'all')
                EditingWidgets.update({_id: _id}, {'$set': {'panelStatus.borderRadius.selected': []}});
            else
                EditingWidgets.update({_id: _id}, {'$pullAll': {'panelStatus.borderRadius.selected': [side, 'all']}});
        },
        onBorderRadiusChanged: (_id, selected, key, value)=> {
            let changeSet = {};
            selected.map((side)=>{
                if (side === 'all') {
                    changeSet['styles.borderRadius.' + key] = value;
                } else {
                    changeSet['styles.borderRadius.' + side + '.' + key] = value;
                }
            })
            EditingWidgets.update({_id: _id}, {'$set': changeSet});
        }
    }
}
