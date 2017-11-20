// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-

const Main = imports.ui.main;
const Lang = imports.lang;
const GObject = imports.gi.GObject;
const BoxPointer = imports.ui.boxpointer;

let menu, item, suspendAction, powerOffAction;
let bindFlags = GObject.BindingFlags.DEFAULT | GObject.BindingFlags.SYNC_CREATE;

function init() {
    menu = Main.panel.statusArea['aggregateMenu']._system;
    item = menu._actionsItem;

    suspendAction = menu._createActionButton('media-playback-pause-symbolic', _("Suspend"));
    suspendAction.connect('clicked', () => {
        menu.menu.itemActivated(BoxPointer.PopupAnimation.NONE);
        menu._systemActions.activateSuspend();
    });
    menu._systemActions.bind_property('can-suspend', suspendAction, 'visible', bindFlags);

    powerOffAction = menu._createActionButton('system-shutdown-symbolic', _("Power Off"));
    powerOffAction.connect('clicked', () => {
        menu.menu.itemActivated(BoxPointer.PopupAnimation.NONE);
        menu._systemActions.activatePowerOff();
    });
    menu._systemActions.bind_property('can-power-off', powerOffAction, 'visible', bindFlags);
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
