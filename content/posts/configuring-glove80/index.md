---
title: "customizing the Glove80 keyboard with ZMK"
date: "2023-11-07"
description: "How to configure the Glove80 keyboard with ZMK, by Leo Robinovitch."
---

I've recently been dealing with some wrist/hand/forearm pain from typing. I've tried a few different ergonomic keyboards
to see if any of them help, and they definitely have! Some reviews in brief:

- [ZSA Moonlander](https://www.zsa.io/moonlander/): ortholinear layout, split halves, tentable, palm rests, but still
  did not feel very ergo to me. Felt like I was often stretching my hands quite a bit and the thumb cluster felt
  uncomfortably spaced. I enjoyed customizing it, but the keyboard itself wasn't friendly for my hands.
- [Kinesis Advantage2](https://kinesis-ergo.com/shop/advantage2/): ortholinear layout, split halves at a fixed distance,
  palm rests, and concave keywells. The concave keywells felt great, as did the thumb cluster compared to the
  Moonlander. Customizing the Advantage2 was harder and it was more frustrating to troubleshoot at times, for example,
  the firmware seemed to reset sometimes when physically switching the usb cord between computers. Got the silent
  switches version off craigslist and wish that I had gotten the tactile switches. Probably could have continued to use
  this one happily.
- [MoErgo Glove80](https://www.moergo.com/): hands down the best of the bunch. A combination of all the best features of
  both prior keyboards in my opinion. Feels great, and I will be sticking with the Glove80.

There are some great tools for customizing the Glove80, but it still took me a bit of time to get my preferred workflow
together. The goal of this post is to bridge the gap between the keyboard customization gods (there are some people out
there with some [MAJORLY customized setups][custom]) and mere mortals like me who want to change some mappings, have an
extra layer, a couple combos and macros, and basic home row mods.

The Glove80 runs the excellent open source keyboard firmware [ZMK](https://zmk.dev/), and many of the links in this post
go to the great documentation there.

## Components

- a template of the glove80 [zmk config repo](https://github.com/moergo-sc/glove80-zmk-config) - setup instructions in
  the README there
  - note that the [github action references][actionref] the [glove80 zmk fork][zmkfork], so the built firmware will
    include that version of ZMK by default
- a browser bookmark of this excellent [zmk keymap editor][kmeditor], with the source configured to Github (my template
  of the repo above)
  - the [moergo layout editor](https://my.glove80.com/) is nice but does not have point-and-click macro and combo
    definitions the way that nickcoutsos's does
- [this keymap file][keymap], which I'll walk through below

## Updating Configuration and Firmware

1. Edit the [keymap file][keymap] and commit the changes, either through an editor directly or through the [keymap
   editor][kmeditor]. The commit will trigger a github actions build that will generate an artifact called glove80.uf2
   ([example](https://github.com/robinovitch61/glove80-zmk-config/actions/runs/6790985271)). You can commit to a
   non-`main` branch and it will still execute the action
2. Download the glove80.uf2 artifact and unzip it. Put each half of the keyboard into
   [Bootloader Mode](https://cdn.shopify.com/s/files/1/0695/7078/9649/files/Glove80_User_Guide_7Oct2023.pdf?v=1696669801)
   and drag the glove80.uf2 file to the mounted drive, once for each half

## Keymap Walkthrough

Brief explanations of my current [keymap file][keymap], starting with some boilerplate includes and definitions:

```txt
#include <behaviors.dtsi>
#include <dt-bindings/zmk/bt.h>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/outputs.h>
#include <dt-bindings/zmk/rgb.h>

#define LAYER_Base 0
#define LAYER_Lower 1
#define LAYER_Magic 2
```

The "root devicetree node" under which everything else goes:

```txt
/ {
    ...all stuff below
};
```

What I believe is a Glove80-specific node, as the keyboard comes with a "magic" key and I can't find any reference to a
magic node in the ZMK docs:

```txt
    magic: magic {
        compatible = "zmk,behavior-hold-tap";
        label = "MAGIC_HOLD_TAP";
        #binding-cells = <2>;
        flavor = "tap-preferred";
        tapping-term-ms = <200>;
        bindings = <&mo>, <&rgb_ug_status_macro>;
    };
```

Some Glove80 system level [macros]:

```txt
    macros {
        /* Glove80 system */

        rgb_ug_status_macro: rgb_ug_status_macro {
            label = "RGB_UG_STATUS";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&rgb_ug RGB_STATUS>;
        };
        bt_0: bt_0 {
            label = "BT_0";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&out OUT_BLE &bt BT_SEL 0>;
        };
        bt_1: bt_1 {
            label = "BT_1";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&out OUT_BLE &bt BT_SEL 1>;
        };
        bt_2: bt_2 {
            label = "BT_2";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&out OUT_BLE &bt BT_SEL 2>;
        };
        bt_3: bt_3 {
            label = "BT_3";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&out OUT_BLE &bt BT_SEL 3>;
        };
```

My own custom [macros]:

- The `iterm` macro activates the key sequence mapping to my
  [iterm2 toggle all windows hotkey](https://iterm2.com/documentation-hotkey.html) sequence, giving me one-keypress
  terminal summon/dismiss.
- The `switchapps` macro uses `cmd-Tab` to switch apps.
- The `email` macro types my email for me :).

```txt
        /* My custom macros */

        iterm: iterm {
            label = "iterm";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            wait-ms = <40>;
            tap-ms = <40>;
            bindings =
                <&macro_press>,
                <&kp LALT>,
                <&macro_tap>,
                <&kp SPACE>,
                <&macro_release>,
                <&kp LALT>;
        };
        switchapps: switchapps {
            compatible = "zmk,behavior-macro";
            label = "SWITCHAPPS";
            #binding-cells = <0>;
            wait-ms = <40>;
            tap-ms = <40>;
            bindings =
                <&macro_press>,
                <&kp LCMD>,
                <&macro_tap>,
                <&kp TAB>,
                <&macro_pause_for_release>,
                <&macro_release>,
                <&kp LCMD>;
        };
        email: email {
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&kp L &kp E &kp O &kp R &kp O &kp B &kp I &kp N &kp O &kp V &kp I &kp T &kp C &kp H &kp AT_SIGN &kp G &kp M &kp A &kp I &kp L &kp PERIOD &kp C &kp O &kp M>;
            label = "EMAIL";
            tap-ms = <30>;
            wait-ms = <30>;
        };
    };
```

[ZMK behaviors](https://zmk.dev/docs/features/keymaps#behaviors) can be bound to things to perform certain actions when
events occur for that binding. I think it is best understood through examples.

- the `lower` behavior is a "tap dance", such that holding the bound key results in a momentary switch to the lower
  layer, whereas a double-tap (2 presses within 200ms of one another) results in a persistent switch to the lower layer.
  This came with the Glove80 default layout and I don't actually use it right now.
- the `ltb` ("layer_tap_balanced") behavior is something I custom defined, and is just a minor tweak on the
  [layer-tap](https://zmk.dev/docs/behaviors/layers#layer-tap) stock ZMK behavior. The essence of the behavior, which I
  currently have bound to the spacebar on the base layer, is that when I hold space, the lower layer activates, but when
  I tap it, it just sends a single space. I defined this using a "hold-tap" because the "layer-tap" behavior uses the
  ["tap-preferred" flavor][flavors], which meant I had to wait a whole 200ms (tapping-term-ms) before the hold behavior
  kicked in. I found the ["balanced" flavor][flavors] to be perfect, as it subverts the tapping-term-ms timeout if
  another key is pressed and released before it expires. This sort of deep tweaky customization is what makes ZMK so
  awesome!

```txt
    behaviors {
        lower: lower {
            compatible = "zmk,behavior-tap-dance";
            label = "LAYER_TAP_DANCE";
            #binding-cells = <0>;
            tapping-term-ms = <200>;
            bindings = <&mo LAYER_Lower>, <&to LAYER_Lower>;
        };
        ltb: layer_tap_balanced {
            compatible = "zmk,behavior-hold-tap";
            label = "LAYER_TAP_BALANCED";
            #binding-cells = <2>;
            flavor = "balanced";
            tapping-term-ms = <200>;
            bindings = <&mo>, <&kp>;
        };
    };
```

[Combos](https://zmk.dev/docs/features/combos) allow you to press multiple keys to trigger other keys or macros. I find
combos in particular the easiest to define and edit in the [keymap editor][kmeditor].

- my `switch_apps` combo triggers the `switchapps` macro and allows me to press `<>` together to switch apps.
- the `ctrl` combo allows me to press `m<` together to press `ctrl`.

These combos are examples of what people refer to as "homerow mods", even though they're not actually on the home row...

Often home row mods are also symmetric across both hands. I may change these up.

```txt
    combos {
        compatible = "zmk,combos";

        switch_apps {
            bindings = <&switchapps>;
            key-positions = <60 61>;
            timeout-ms = <70>;
            slow-release;
        };

        ctrl {
            bindings = <&kp LCTRL>;
            key-positions = <59 60>;
        };
    };
```

Finally, the [keymap node](https://zmk.dev/docs/features/keymaps#keymap-node) defines all my layers and the bindings of
behaviors to keys. I just have 3 layers: the base layer, a "lower" layer that is for numbers and symbols, and the
"magic" layer that comes stock with the Glove80. The magic layer is used for admin tasks like getting into bootloader
mode and seeing connection & battery status with the LEDs:

```txt
    keymap {
        compatible = "zmk,keymap";

        layer_Base {
            bindings = <
&none                 &kp C_BRI_DN  &kp C_BRI_UP  &kp C_PREV  &kp C_NEXT                                                                                      &kp C_PLAY_PAUSE  &kp C_MUTE  &kp C_VOLUME_DOWN  &kp C_VOLUME_UP  &none
&kp EQUAL             &kp N1        &kp N2        &kp N3      &kp N4      &kp N5                                                                      &kp N6  &kp N7            &kp N8      &kp N9             &kp N0           &kp MINUS
&kp TAB               &kp Q         &kp W         &kp E       &kp R       &kp T                                                                       &kp Y   &kp U             &kp I       &kp O              &kp P            &kp BSLH
&mt LCTRL ESC         &kp A         &kp S         &kp D       &kp F       &kp G                                                                       &kp H   &kp J             &kp K       &kp L              &kp SEMI         &kp SQT
&kp LSHFT             &kp Z         &kp X         &kp C       &kp V       &kp B   &kp DEL   &kp LALT  &email     &caps_word  &kp RCTRL  &kp RCMD      &kp N   &kp M             &kp COMMA   &kp DOT            &kp FSLH         &kp RSHFT
&magic LAYER_Magic 0  &kp GRAVE     &iterm        &kp LEFT    &kp RIGHT           &kp BSPC  &kp LGUI  &kp LCTRL  &kp RALT    &kp RET    &ltb 1 SPACE          &kp DOWN          &kp UP      &kp LBKT           &kp RBKT         &caps_word
            >;
        };

        layer_Lower {
            bindings = <
&trans                &trans        &trans          &trans        &trans                                                                             &trans            &trans             &trans          &trans           &trans
&kp F1                &kp F2        &kp F3          &kp F4        &kp F5       &none                                                      &none      &kp F6            &kp F7             &kp F8          &kp F9           &kp F10
&kp EQUAL             &kp EXCL      &kp AT          &kp HASH      &kp DLLR     &kp PRCNT                                                  &kp CARET  &kp AMPS          &kp STAR           &kp LPAR        &kp RPAR         &kp MINUS
&trans                &kp N1        &kp N2          &kp N3        &kp N4       &kp N5                                                     &kp N6     &kp N7            &kp N8             &kp N9          &kp N0           &trans
&trans                &kp KP_EQUAL  &kp UNDERSCORE  &kp KP_MINUS  &kp KP_PLUS  &none      &trans  &trans  &trans  &trans  &trans  &trans  &none      &kp LEFT_BRACKET  &kp RIGHT_BRACKET  &kp LEFT_BRACE  &kp RIGHT_BRACE  &trans
&magic LAYER_Magic 0  &trans        &trans          &trans        &trans                  &trans  &trans  &trans  &trans  &trans  &trans             &trans            &trans             &trans          &trans           &trans
            >;
        };

        layer_Magic {
            bindings = <
&bt BT_CLR   &none            &none            &none            &none                                                                                     &none  &none  &none  &none  &bt BT_CLR_ALL
&none        &none            &none            &none            &none            &none                                                             &none  &none  &none  &none  &none  &none
&none        &rgb_ug RGB_SPI  &rgb_ug RGB_SAI  &rgb_ug RGB_HUI  &rgb_ug RGB_BRI  &rgb_ug RGB_TOG                                                   &none  &none  &none  &none  &none  &none
&bootloader  &rgb_ug RGB_SPD  &rgb_ug RGB_SAD  &rgb_ug RGB_HUD  &rgb_ug RGB_BRD  &rgb_ug RGB_EFF                                                   &none  &none  &none  &none  &none  &bootloader
&sys_reset   &none            &none            &none            &none            &none            &bt_2  &bt_3  &none         &none  &none  &none  &none  &none  &none  &none  &none  &sys_reset
&none        &none            &none            &none            &none                             &bt_0  &bt_1  &out OUT_USB  &none  &none  &none         &none  &none  &none  &none  &none
            >;
        };
    };
};
```

## Annoyances

- Update: Nick has since [fixed this!][fix] ~~I've found that the online keymap editor sometimes reformats the keymap file arbitrarily, even when it would still be
  valid without doing so. For example, it will remove newline spacing, or create an empty `behaviors` block if none
  exists.~~
- When the firmware build fails, the error message is often very obscure and/or hidden in a lot of log output.

## Conclusion

A few weeks in, I love my new Glove80 keyboard and the custom configuration I've loaded onto it so far. Hopefully this
post helped someone other than just me to get started configuring their own board! If you'd like, tag me at
`@robinovitch61` in the [Glove80 Discord](https://discord.gg/3E2Kvp8Azk).

[keymap]: https://github.com/robinovitch61/glove80-zmk-config/blob/main/config/glove80.keymap
[kmeditor]: https://nickcoutsos.github.io/keymap-editor/
[zmkfork]: https://github.com/moergo-sc/zmk
[macros]: https://zmk.dev/docs/behaviors/macros
[custom]: https://my.glove80.com/#/layout/user/6d0bf84e-3a3e-4145-96d9-a9b2aeddd8f1
[actionref]:
  https://github.com/moergo-sc/glove80-zmk-config/blob/d09d3a07549490e2feed46c6d469939dd234d399/.github/workflows/build.yml#L14
[flavors]: https://zmk.dev/docs/behaviors/hold-tap#flavors
[fix]: https://github.com/nickcoutsos/keymap-editor/discussions/152#discussioncomment-7560084
