export function change(editingWidget) {
    Meteor.call('editingWidgets.save', editingWidget);
}

export default actions = {
    border: {
        onSideSelected: (sides)=> {
            
        }
    }
}
