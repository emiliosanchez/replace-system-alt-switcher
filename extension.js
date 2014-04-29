// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-

const Main = imports.ui.main;
const Lang = imports.lang;

let menu, item, suspendAction, powerOffAction;

function init() {
    menu = Main.panel.statusArea['aggregateMenu']._system;
    item = menu._actionsItem;

    suspendAction = menu._createActionButton('media-playback-pause-symbolic', _("Suspend"));
    suspendAction.connect('clicked', Lang.bind(menu, menu._onSuspendClicked));

    powerOffAction = menu._createActionButton('system-shutdown-symbolic', _("Power Off"));
    powerOffAction.connect('clicked', Lang.bind(menu, menu._onPowerOffClicked));
}

function enable() {
    item.actor.remove_actor(menu._altSwitcher.actor);
    item.actor.add(suspendAction, { expand: true, x_fill: false });
    item.actor.add(powerOffAction, { expand: true, x_fill: false });
}

function disable() {
    item.actor.remove_actor(suspendAction);
    item.actor.remove_actor(powerOffAction);
    item.actor.add(menu._altSwitcher.actor, { expand: true, x_fill: false });
}
