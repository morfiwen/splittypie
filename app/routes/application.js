import Ember from "ember";

export default Ember.Route.extend({
    modal: Ember.inject.service(),
    sideMenu: Ember.inject.service(),
    localStorage: Ember.inject.service(),

    init() {
        this._super(...arguments);
        this.get("modal").on("show", this, "showModal");
        this.get("modal").on("remove", this, "removeModal");
    },

    model() {
        return Ember.RSVP.hash({
            currencies: this.store.findAll("currency"),
            previousEvents: this.get("localStorage").findAll("events"),
        });
    },

    setupController() {
        this._super(...arguments);
        this.get("localStorage").on("changed", this, "resetPreviousEvents");
    },

    resetPreviousEvents() {
        const previousEvents = this.get("controller.model.previousEvents");

        if (previousEvents) {
            previousEvents.clear();
            previousEvents.pushObjects(this.get("localStorage").findAll("events"));
        }
    },

    showModal(options) {
        this.render(`modals/${options.name}`, {
            into: "application",
            outlet: "modal",
            model: options,
        });
    },

    removeModal() {
        this.disconnectOutlet({
            outlet: "modal",
            parentView: "application",
        });
    },

    actions: {
        invokeAction(action) {
            action();
        },

        removeModal() {
            this.removeModal();
        },

        showSideMenu() {
            this.get("sideMenu").show();
        },
    },
});
