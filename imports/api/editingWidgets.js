import { Meteor, Match } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EditingWidgets = new Mongo.Collection('editingWidgets');

if (Meteor.isServer) {
    EditingWidgets._ensureIndex({owner:1}, {unique: true});
    // This code only runs on the server
    Meteor.publish('editingWidget', () => {
        let editingWidget = EditingWidgets.find({userId: this.userId});
        console.info(editingWidget.count())
        return editingWidget;
    });
}

Meteor.methods({
    'editingWidgets.fetch'() {
        let userId = Meteor.userId();
        if (! userId) {
            throw new Meteor.Error('not-authorized');
        }
        return EditingWidgets.find({userId: userId});
    },
    'editingWidgets.save'(editingWidget) {
        check(editingWidget, Object);

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let result = EditingWidgets.upsert({owner: Meteor.userId()}, {
            '$set': {panelStatus, styles} = editingWidget,
            '$setOnInsert': {createdAt: new Date(), owner: Meteor.userId()}
        }, (error, count)=>{
        });
    },
    'editingWidgets.remove'(userId) {
        check(userId, String);

        EditingWidgets.remove(userId);
    },
});

const defaultProps = Object.freeze(
    {
        panelStatus: {
            border: {
                selected: ['all']
            }
        },
        styles: {
            border: {
                width: 1,
                style: 'solid',
                color: 'black'
            },
            borderRadius: {
                ratio: 0,
                unit: 'px',
                value: 10
            },
            position: 'relative'
        }
    }
);
export default defaultProps;
