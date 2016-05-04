import { Meteor, Match } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EditingWidgets = new Mongo.Collection('editingWidgets');

if (Meteor.isServer) {
    EditingWidgets._ensureIndex({owner:1}, {unique: true});
    // This code only runs on the server
    Meteor.publish('editingWidget', () => {
        return EditingWidgets.find({userId: this.userId});
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
    'editingWidgets.merge'(state) {
        check(state, Match.Any);

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        EditingWidgets.insert({
            state,
            createdAt: new Date(),
            owner: Meteor.userId()
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
            borderExpanded: false
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
