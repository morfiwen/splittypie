window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
    workflow: [
        { handler: "silence", matchId: "ember-application.injected-container" },
        { handler: "silence", matchId: "ember-htmlbars.ember-handlebars-safestring" },
        { handler: "silence", matchId: "ember-runtime.enumerable-contains" },
    ],
};
