const St = imports.gi.St;
const Main = imports.ui.main;

let button, cover, text;
let opacity = 0;

const DEFAULT_OPACITY = 0;
let omap = {
  [0]: 50,
  [50]: 100,
  [100]: 150,
  [150]: 200,
  //  [200]: 230,
};

function _fmt() {
  if(opacity == 0){ return "nodim"; }
  return 'dim.' + ((1 - opacity / 255) * 10).toFixed(0);
}

function _onclick() {
  opacity = omap[opacity] || DEFAULT_OPACITY;

  if(!cover) {
    cover = new St.Label({ style_class: 'cover', text: "" });
    cover.opacity = 0; // just in case of an error
    Main.uiGroup.add_actor(cover);

    let monitor = Main.layoutManager.primaryMonitor;
    const w = monitor.width;
    const h = monitor.height;

    // assumes your monitors are roughly the same size. And you don't have like too many of them
    cover.set_position(-w*2, -h*2);
    cover.set_width(w*5);
    cover.set_height(h*5);

    cover.set_position(0, 0);
    cover.set_width(w*4);
    cover.set_height(h*4);
  }


  text.text = _fmt();
  cover.opacity = opacity;
};

function init() {
  button = new St.Bin({
    reactive: true,
    can_focus: true,
    x_fill: true,
    y_fill: false,
    track_hover: true,
  });

  let box = new St.BoxLayout({ style_class: 'tmp' });
  // uncomment for an icon
  // let icon = new St.Icon({ icon_name: 'dialog-information-symbolic', style_class: 'icon' });
  // box.add_actor(icon);
  text = new St.Label({ text: _fmt(), style_class: "label" });
  box.add_actor(text);

  button.set_child(box);
  button.connect('button-press-event', _onclick)
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
  Main.panel._rightBox.remove_child(button);
}
