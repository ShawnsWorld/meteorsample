import { Meteor, Match } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EditingWidgets = new Mongo.Collection('editingWidgets');

if (Meteor.isServer) {
    EditingWidgets._ensureIndex({owner:1}, {unique: true});
    // This code only runs on the server
    Meteor.publish('editingWidget', () => {
        let editingWidget = EditingWidgets.find({userId: this.userId});
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
    'editingWidgets.create'(editingWidget) {
        check(editingWidget, Object);

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let a = Object.assign({}, {panelStatus, styles} = editingWidget, {createdAt: new Date(), owner: Meteor.userId()})
        let result = EditingWidgets.insert(
            Object.assign({}, {panelStatus, styles} = editingWidget, {createdAt: new Date(), owner: Meteor.userId()})
        );
    },
    'editingWidgets.remove'(userId) {
        check(userId, String);

        EditingWidgets.remove(userId);
    },
});
