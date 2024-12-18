(this["webpackJsonpthermalmodel.com"] = this["webpackJsonpthermalmodel.com"] || []).push([
  [0],
  {
    260: function (e, t, n) {},
    557: function (e, t, n) {
      "use strict";
      n.r(t);
      var i = n(1),
        a = n(108),
        r = n.n(a),
        o = (n(260), n(7)),
        c = n(28),
        s = "#dedede",
        d = {
          borderWidthPx: 2,
          headerHeightPx: 50,
          maxTimeSteps: 1e5,
          defaultTempDegC: 23,
          defaultCapJPerDegK: 10,
          defaultPowerGenW: 0,
          defaultTotalTimeSeconds: 600,
          defaultTimeStepSeconds: 0.1,
          defaultNodeName: "Unnamed",
          defaultNodeRadius: 20,
          defaultResistanceDegKPerW: 10,
          defaultSmallResistanceDegKPerW: 0.01,
          defaultSmallCapacitanceJPerDegK: 1,
          defaultEditorWidthFraction: 0.45,
          defaultCanvasHeightFraction: 1 / 1.61803398875,
          defaultTableHeightFraction: 0.5,
          minPanelFraction: 0.2,
          newNodeNamePrefix: "New Node",
          zoomSensitivity: 1500,
          minZoom: 0.5,
          maxZoom: 2,
          maxZoomDelta: 2,
          minRadiusPx: 20,
          maxRadiusPx: 40,
          minLineThicknessPx: 2,
          maxLineThicknessPx: 4,
          activeNodeOutlineWidthPx: 5,
          tabHeightPx: 35,
          tableDeleteCellWidthPercent: 0.1,
          tableDeleteCellMinWidthPx: 40,
          plotHeightBufferPx: 10,
          plotMargin: { left: 10, right: 20, top: 20, bottom: 20 },
          plotYDomainPaddingPx: 15,
          plotTickFontSizePx: 15,
          maxPlotPoints: 400,
          multiSelectKeys: ["shiftKey", "metaKey", "ctrlKey"],
          errorMessageDurationSeconds: 4,
          maxNoteLengthChars: 500,
          activeColor: "rgba(112, 165, 255, 0.2)",
          pasteXOffset: 45,
          lightGrey: s,
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
          tabColor: s,
          inactiveTabColor: s,
          timeControlsFontSize: "20px",
        },
        l = n(4),
        u = l.b.div.withConfig({ displayName: "style__StyledApp", componentId: "sc-sd268b-0" })(
          [
            "display:flex;height:",
            "px;filter:",
            ";pointer-events:",
            ";user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;",
          ],
          function (e) {
            return e.height;
          },
          function (e) {
            return e.modalOpen ? "blur(5px)" : "unset";
          },
          function (e) {
            return e.modalOpen ? "none" : "unset";
          }
        ),
        f = l.b.div.withConfig({ displayName: "style__StyledDraggableBorder", componentId: "sc-sd268b-1" })([
          "position:absolute;z-index:1;",
        ]),
        b = Object(l.b)(f).withConfig({ displayName: "style__StyledHorizontalBorder", componentId: "sc-sd268b-2" })(
          ["width:", "%;height:10px;top:", "%;transform:translate(0,-5px);cursor:ns-resize;left:", "%;"],
          function (e) {
            return 100 * e.width;
          },
          function (e) {
            return 100 * e.y;
          },
          function (e) {
            return 100 * e.left;
          }
        ),
        h = Object(l.b)(f).withConfig({ displayName: "style__StyledVerticalBorder", componentId: "sc-sd268b-3" })(
          ["height:100%;width:10px;left:", "%;transform:translate(-5px,0);cursor:ew-resize;"],
          function (e) {
            return 100 * e.x;
          }
        ),
        j = l.b.div.withConfig({ displayName: "style__StyledWorkspace", componentId: "sc-sd268b-4" })(
          ["height:", "px;width:", "px;"],
          function (e) {
            return e.height;
          },
          function (e) {
            return e.width;
          }
        ),
        p = l.b.div.withConfig({ displayName: "style__StyledCanvas", componentId: "sc-sd268b-5" })(
          ["width:100%;height:", "px;"],
          function (e) {
            return e.height;
          }
        ),
        m = Object(l.a)(
          [
            "background:",
            ";color:",
            ";border:1px solid black;padding:0.5em 0.8em;font:inherit;cursor:pointer;outline:inherit;text-decoration:none;text-align:center;white-space:nowrap;&:focus,&:hover{text-decoration:underline;}",
          ],
          function (e) {
            return e.primary ? d.primaryColor : d.secondaryColor;
          },
          function (e) {
            return e.primary ? "white" : "inherit";
          }
        ),
        x = l.b.button.withConfig({ displayName: "style__StyledButton", componentId: "sc-sd268b-6" })(["", ""], m),
        O = l.b.a.withConfig({ displayName: "style__StyledAnchorAsButton", componentId: "sc-sd268b-7" })(["", ""], m),
        g = l.b.label.withConfig({ displayName: "style__StyledLabelAsButton", componentId: "sc-sd268b-8" })(
          ["", ""],
          m
        ),
        v = l.b.div.withConfig({ displayName: "style__StyledTableWrapper", componentId: "sc-1khh7lk-0" })([
          "width:100%;",
        ]),
        y = l.b.div.withConfig({ displayName: "style__StyledTable", componentId: "sc-1khh7lk-1" })([
          "width:100%;border-collapse:collapse;",
        ]),
        w = l.b.div.withConfig({ displayName: "style__StyledTableBody", componentId: "sc-1khh7lk-2" })(["width:100%;"]),
        S = l.b.div.withConfig({ displayName: "style__StyledAddButtonWrapper", componentId: "sc-1khh7lk-3" })([
          "position:sticky;top:0;left:0;display:flex;justify-content:center;margin-bottom:1em;",
        ]),
        C = Object(l.b)(x).withConfig({ displayName: "style__StyledAddButton", componentId: "sc-1khh7lk-4" })([
          "padding:0.5em 1em;margin-top:5px;font-size:0.75em;",
        ]),
        k = l.b.div.withConfig({ displayName: "style__StyledRow", componentId: "sc-1khh7lk-5" })(
          ["display:inline-flex;align-items:center;min-width:100%;top:", ";background:", ";"],
          function (e) {
            var t = e.heightOffsetPx;
            return t ? "".concat(t, "px") : "0px";
          },
          function (e) {
            return e.isActive ? d.activeColor : "none";
          }
        ),
        N = l.b.div.withConfig({ displayName: "style__StyledCell", componentId: "sc-1khh7lk-6" })(
          [
            "display:inline-flex;justify-content:center;align-items:center;border:1px solid #ddd;height:2em;width:",
            ";min-width:",
            ";",
          ],
          function (e) {
            var t = e.width;
            return t ? "".concat(100 * t, "%") : "none";
          },
          function (e) {
            var t = e.minWidth;
            return t ? "".concat(t, "px") : "none";
          }
        ),
        T = Object(l.b)(N).withConfig({ displayName: "style__StyledDeleteCell", componentId: "sc-1khh7lk-7" })([
          "cursor:pointer;user-select:none;min-width:40px;&:hover{background:black;}",
        ]),
        A = l.b.div.withConfig({ displayName: "style__StyledHeaderWrapper", componentId: "sc-1khh7lk-8" })(
          ["display:flex;width:100%;height:100%;position:sticky;top:", ";z-index:1;"],
          function (e) {
            var t = e.heightOffsetPx;
            return t ? "".concat(t, "px") : "0px";
          }
        ),
        D = l.b.div.withConfig({ displayName: "style__StyledColHeader", componentId: "sc-1khh7lk-9" })(
          [
            "display:inline-flex;width:",
            ";min-width:",
            ";justify-content:center;align-items:center;font-weight:bold;border:1px solid lightgrey;cursor:pointer;user-select:none;position:relative;background:white;border-bottom:1px solid black;",
          ],
          function (e) {
            var t = e.widthPercent;
            return t ? "".concat(100 * t, "%") : "none";
          },
          function (e) {
            var t = e.minWidthPx;
            return t ? "".concat(t, "px") : "none";
          }
        ),
        W = l.b.div.withConfig({ displayName: "style__StyledColText", componentId: "sc-1khh7lk-10" })([
          "font-size:0.8em;padding:1em;",
        ]),
        I = l.b.div.withConfig({ displayName: "style__StyledSortIcon", componentId: "sc-1khh7lk-11" })([
          "position:absolute;bottom:2px;right:50%;transform:translate(50%);font-size:10px;",
        ]),
        P = n(0);
      function M(e) {
        var t = e.columns,
          n = e.sortState,
          i = e.setSortState,
          a = n ? ("ASC" === n.direction ? "\u25b2" : "\u25bc") : "";
        return Object(P.jsxs)(A, {
          heightOffsetPx: d.tabHeightPx,
          children: [
            t.map(function (e) {
              var t = n && n.key === e.key;
              return Object(P.jsxs)(
                D,
                {
                  onClick: function () {
                    var a;
                    i({ key: e.key, direction: t && n ? ((a = n.direction), "ASC" === a ? "DESC" : "ASC") : "ASC" });
                  },
                  widthPercent: e.widthPercent,
                  minWidthPx: e.minWidthPx,
                  children: [Object(P.jsx)(W, { children: e.text }), Object(P.jsx)(I, { children: t ? a : "" })],
                },
                e.key.toString()
              );
            }),
            Object(P.jsx)(D, {
              widthPercent: d.tableDeleteCellWidthPercent,
              minWidthPx: d.tableDeleteCellMinWidthPx,
              style: { cursor: "unset" },
            }),
          ],
        });
      }
      var K = n(69),
        z = n(3);
      function F(e, t) {
        Object(i.useEffect)(
          function () {
            var n = function (n) {
              e.current && !e.current.contains(n.target) && t();
            };
            return (
              document.addEventListener("mousedown", n),
              document.addEventListener("touchstart", n),
              function () {
                document.removeEventListener("mousedown", n), document.removeEventListener("touchstart", n);
              }
            );
          },
          [e, t]
        );
      }
      var R = l.b.div.withConfig({ displayName: "DropDown__StyledDropDown", componentId: "sc-10ipkj3-0" })([
          "display:flex;height:100%;width:100%;justify-content:center;position:relative;&:visited{outline:none;}",
        ]),
        E = l.b.div.withConfig({ displayName: "DropDown__StyledCurrentValue", componentId: "sc-10ipkj3-1" })(
          ["display:flex;height:100%;width:100%;align-items:center;justify-content:space-between;cursor:", ";"],
          function (e) {
            return e.hasOptions ? "pointer" : "unset";
          }
        ),
        L = l.b.div.withConfig({ displayName: "DropDown__StyledOptions", componentId: "sc-10ipkj3-2" })([
          "display:flex;flex-direction:column;align-items:center;position:absolute;top:100%;left:-2px;right:-2px;border:1px solid black;background:white;z-index:10;",
        ]),
        _ = l.b.div.withConfig({ displayName: "DropDown__StyledOption", componentId: "sc-10ipkj3-3" })(
          ["display:flex;width:100%;padding:5px 0;&:hover{background:", ";cursor:pointer;}"],
          d.activeColor
        ),
        V = l.b.div.withConfig({ displayName: "DropDown__StyledOptionText", componentId: "sc-10ipkj3-4" })([
          "display:flex;align-items:center;height:100%;max-width:100px;margin:0 5px;overflow:hidden;white-space:nowrap;font-size:0.8em;",
        ]),
        J = l.b.div.withConfig({ displayName: "DropDown__StyledDropDownIcon", componentId: "sc-10ipkj3-5" })([
          "padding:2px;font-size:10px;",
        ]);
      function B(e) {
        var t = Object(i.useState)(!1),
          n = Object(o.a)(t, 2),
          a = n[0],
          r = n[1],
          c = Object(i.useRef)(null);
        F(c, function () {
          return r(!1);
        });
        var s = !!e.options.length,
          d = Object(i.useCallback)(
            function (e) {
              s && r(!e);
            },
            [s]
          );
        return Object(P.jsxs)(R, {
          isOpen: a,
          ref: c,
          tabIndex: 0,
          onKeyUp: function (e) {
            return "Enter" === e.key && d(a);
          },
          onClick: function () {
            return d(a);
          },
          children: [
            Object(P.jsxs)(E, {
              hasOptions: s,
              children: [Object(P.jsx)(V, { children: e.value.text }), s && Object(P.jsx)(J, { children: "\u25bc" })],
            }),
            a &&
              Object(P.jsx)(L, {
                children: e.options.map(function (t) {
                  return Object(P.jsx)(
                    _,
                    {
                      onClick: function () {
                        return e.onChange(t);
                      },
                      tabIndex: 0,
                      onKeyUp: function (n) {
                        "Enter" === n.key && (e.onChange(t), d(a));
                      },
                      children: Object(P.jsx)(V, { children: t.text }),
                    },
                    t.id
                  );
                }),
              }),
          ],
        });
      }
      function H(e) {
        var t = e.setOption;
        return t
          ? Object(P.jsx)(B, {
              value: t,
              options: e.options.filter(function (e) {
                return e.id !== t.id;
              }),
              onChange: function (t) {
                var n = e.options.find(function (e) {
                  return e.id === t.id;
                });
                void 0 !== n && e.onSelectOption(e.rowId, n);
              },
            })
          : Object(P.jsx)(P.Fragment, {});
      }
      var q = l.b.input.withConfig({ displayName: "style__StyledInput", componentId: "sc-1oz41em-0" })(
          [
            "display:inline-block;border:none;width:100%;height:100%;text-align:center;padding:0;background:unset;font-size:",
            ";&::-webkit-inner-spin-button,&::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}",
          ],
          function (e) {
            return e.fontSize || "";
          }
        ),
        U = l.b.div.withConfig({ displayName: "style__StyledEditor", componentId: "sc-1oz41em-1" })(
          ["height:", "px;width:", "px;border-left:", "px solid black;"],
          function (e) {
            return e.height;
          },
          function (e) {
            return e.width;
          },
          d.borderWidthPx
        ),
        X = l.b.div.withConfig({ displayName: "style__StyledTables", componentId: "sc-1oz41em-2" })(
          ["display:inline-flex;width:100%;height:", "%;position:relative;"],
          function (e) {
            return 100 * e.heightFrac;
          }
        ),
        Q = l.b.div.withConfig({ displayName: "style__StyledModelControlsWrapper", componentId: "sc-1oz41em-3" })(
          ["display:inline-flex;width:100%;height:", "%;position:relative;"],
          function (e) {
            return 100 * e.heightFrac;
          }
        );
      function G(e) {
        var t = e.initialValue,
          n = e.onBlur,
          a = e.getNewValue,
          r = e.afterValue,
          c = e.validator,
          s = e.fontSize,
          d = Object(i.useRef)(null),
          l = Object(i.useCallback)(
            function (e) {
              return e + (r || "");
            },
            [r]
          ),
          u = Object(i.useState)(l(t.toString())),
          f = Object(o.a)(u, 2),
          b = f[0],
          h = f[1];
        var j = Object(i.useCallback)(
          function (e) {
            var i = a(e);
            if (e.target.value !== t.toString())
              if (void 0 !== i) {
                var r = c(i.toString());
                h(l(r.toString())), n(r);
              } else {
                var o = c(t.toString());
                h(l(o.toString())), n(o);
              }
            else
              h(function (e) {
                return l(e);
              });
          },
          [a, t, n, c, l]
        );
        return Object(P.jsx)(q, {
          ref: d,
          type: "text",
          fontSize: s,
          value: b,
          onChange: function (e) {
            var t = e.target.value;
            void 0 !== t && h(t);
          },
          onFocus: function () {
            return h(function (e) {
              return e.replace(r || "", "");
            });
          },
          onBlur: j,
          onKeyDown: function (e) {
            ["Escape", "Enter"].includes(e.key) && d.current && d.current.blur();
          },
        });
      }
      function Y(e) {
        return Object(P.jsx)(
          G,
          {
            initialValue: e.initialValue,
            onBlur: e.onBlur,
            getNewValue: function (e) {
              return e.target.value;
            },
            validator: function (t) {
              return e.validator ? e.validator(t) : t;
            },
          },
          e.initialValue
        );
      }
      function Z(e) {
        return Object(P.jsx)(Y, { initialValue: e.initialVal, onBlur: e.onBlur, validator: e.validator });
      }
      function $(e) {
        var t = e.target.value,
          n = parseFloat(e.target.value);
        if (void 0 !== t && !isNaN(n)) return n;
      }
      function ee(e) {
        return Object(P.jsx)(
          G,
          {
            initialValue: e.initialValue,
            onBlur: e.onBlur,
            getNewValue: $,
            afterValue: e.afterValue,
            validator: function (t) {
              return e.validator ? parseFloat(e.validator(t.toString())) : parseFloat(t);
            },
            fontSize: e.fontSize,
          },
          e.initialValue + (e.afterValue || "")
        );
      }
      function te(e) {
        return Object(P.jsx)(ee, {
          initialValue: e.initialVal,
          onBlur: e.onBlur,
          afterValue: e.afterValue,
          validator: e.validator,
        });
      }
      var ne = l.b.div.withConfig({ displayName: "BooleanTableCell__StyledCheckbox", componentId: "sc-szl7g1-0" })([
        "display:inline-flex;width:100%;height:100%;justify-content:center;align-items:center;cursor:pointer;user-select:none;",
      ]);
      function ie(e) {
        var t = Object(i.useState)(void 0 !== e.initialIsActive && e.initialIsActive),
          n = Object(o.a)(t, 2),
          a = n[0],
          r = n[1];
        return Object(P.jsxs)(ne, {
          tabIndex: 0,
          onKeyUp: function (t) {
            "Enter" === t.key && (r(!a), e.onClick(!a));
          },
          onClick: function () {
            r(!a), e.onClick(!a);
          },
          children: ["\xa0", a ? e.showWhenActive : ""],
        });
      }
      function ae(e) {
        var t = e.row,
          n = e.col,
          i = e.onUpdateRow,
          a = e.options,
          r = e.initiallySetOption,
          o = e.afterValue,
          c = t[n.key];
        return a && a.length > 0 && n.onSelectOption
          ? Object(P.jsx)(H, { rowId: t.id, options: a, setOption: r, onSelectOption: n.onSelectOption }, t.id)
          : "string" === typeof c
          ? Object(P.jsx)(Z, {
              initialVal: c,
              onBlur: function (e) {
                return i(Object(z.a)(Object(z.a)({}, t), {}, Object(K.a)({}, n.key, e)));
              },
              validator: function (e) {
                return n.validator ? n.validator(t.id, e) : e;
              },
            })
          : "number" === typeof c && "number" === typeof t[n.key]
          ? Object(P.jsx)(
              te,
              {
                initialVal: c,
                onBlur: function (e) {
                  return i(Object(z.a)(Object(z.a)({}, t), {}, Object(K.a)({}, n.key, e)));
                },
                afterValue: o,
                validator: function (e) {
                  return n.validator ? n.validator(t.id, e) : e;
                },
              },
              c
            )
          : "boolean" === typeof c
          ? Object(P.jsx)(
              ie,
              {
                initialIsActive: c,
                onClick: function (e) {
                  return i(Object(z.a)(Object(z.a)({}, t), {}, Object(K.a)({}, n.key, e)));
                },
                showWhenActive: "\u2705",
              },
              c.toString()
            )
          : Object(P.jsx)(P.Fragment, {});
      }
      function re(e, t, n) {
        var a = Object(i.useState)(e),
          r = Object(o.a)(a, 2),
          c = r[0],
          s = r[1];
        return [
          c,
          s,
          function (e, i) {
            return "ASC" === c.direction
              ? e[c.key] > i[c.key] || (e[c.key] === i[c.key] && (e[t] > i[t] || (e[t] === i[t] && e[n] > i[n])))
                ? 1
                : -1
              : e[c.key] > i[c.key]
              ? -1
              : e[c.key] === i[c.key]
              ? e[t] > i[t]
                ? 1
                : -1
              : 1;
          },
        ];
      }
      var oe = l.b.img.withConfig({ displayName: "Icon__StyledImg", componentId: "sc-1r6zufw-0" })([
        "max-width:90%;max-height:90%;",
      ]);
      function ce(e) {
        return Object(P.jsx)(oe, { src: e.src });
      }
      function se() {
        return Object(P.jsx)(ce, {
          src: "data:image/png;base64,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",
        });
      }
      function de(e) {
        return Object(P.jsx)(T, {
          tabIndex: 0,
          onKeyUp: function (t) {
            "Enter" === t.key && e.onDeleteRow(e.row);
          },
          width: d.tableDeleteCellWidthPercent,
          minWidth: d.tableDeleteCellMinWidthPx,
          onClick: function () {
            return e.onDeleteRow(e.row);
          },
          children: Object(P.jsx)(se, {}),
        });
      }
      var le = n(23),
        ue = ["cond", "conv", "rad"],
        fe = ["cond", "conv"];
      function be(e, t, n) {
        return n.filter(function (n) {
          return (n.firstNode.id === e && n.secondNode.id === t) || (n.firstNode.id === t && n.secondNode.id === e);
        });
      }
      var he = function (e, t, n, i) {
        var a = e.name <= t.name;
        return Object(z.a)(
          Object(z.a)(
            {},
            Object(c.makeConnection)({
              firstNode: a ? e : t,
              secondNode: a ? t : e,
              resistanceDegKPerW: i || d.defaultResistanceDegKPerW,
              kind: n,
            })
          ),
          {},
          { firstNodeId: a ? e.id : t.id, secondNodeId: a ? t.id : e.id, connectionNotes: "" }
        );
      };
      function je(e, t, n) {
        var i = be(e.id, t.id, n);
        if (0 === i.length) return he(e, t, "cond");
        var a = i.map(function (e) {
            return e.kind;
          }),
          r = ue.filter(function (e) {
            return !a.includes(e);
          });
        return fe.every(function (e) {
          return !a.includes(e);
        })
          ? he(e, t, "cond")
          : fe.some(function (e) {
              return r.includes(e);
            }) && !a.includes("rad")
          ? he(e, t, "rad")
          : void 0;
      }
      function pe(e, t) {
        function n(e) {
          return 1 === e ? t : "".concat(t, " [").concat(e, "]");
        }
        for (var i = 1; e.includes(n(i)); ) i += 1;
        return n(i);
      }
      function me(e, t) {
        var n = e.map(function (e) {
            return e.name;
          }),
          i = Object(c.makeNode)({
            name: pe(n, d.newNodeNamePrefix),
            temperatureDegC: d.defaultTempDegC,
            capacitanceJPerDegK: d.defaultCapJPerDegK,
            powerGenW: d.defaultPowerGenW,
            isBoundary: !1,
          });
        return Object(z.a)(Object(z.a)({}, i), {}, { center: t, isActive: !1, textDirection: "D", nodeNotes: "" });
      }
      function xe(e, t) {
        return "resistanceDegKPerW" !== e.key ? void 0 : "rad" === t.kind ? " [K\u2074/W]" : " [K/W]";
      }
      function Oe(e, t, n, i) {
        var a = i.filter(function (e) {
          return e.id !== n.id;
        });
        if (["firstNodeId", "secondNodeId"].includes(e))
          return (function (e, t, n, i) {
            var a = "firstNodeId" === e;
            return t
              .filter(function (e) {
                return (
                  e.id !== (a ? n.firstNode.id : n.secondNode.id) && e.id !== (a ? n.secondNode.id : n.firstNode.id)
                );
              })
              .filter(function (e) {
                return !i.some(function (t) {
                  var i = (fe.includes(n.kind) && fe.includes(t.kind)) || n.kind === t.kind;
                  return a
                    ? (i && e.id === t.firstNode.id && n.secondNode.id === t.secondNode.id) ||
                        (i && e.id === t.secondNode.id && n.secondNode.id === t.firstNode.id)
                    : (i && e.id === t.secondNode.id && n.firstNode.id === t.firstNode.id) ||
                        (i && e.id === t.firstNode.id && n.firstNode.id === t.secondNode.id);
                });
              });
          })(e, t, n, a);
        if ("kind" === e) {
          if (n) {
            var r = (function (e, t, n, i) {
              var a = be(t, n, i).map(function (e) {
                return e.kind;
              });
              return "rad" === e &&
                fe.some(function (e) {
                  return a.includes(e);
                })
                ? []
                : ue.filter(function (e) {
                    return !a.includes(e);
                  });
            })(n.kind, n.firstNode.id, n.secondNode.id, i);
            return t.filter(function (e) {
              return r.includes(e.id);
            });
          }
          return t;
        }
        return t;
      }
      function ge(e) {
        return e.firstNode.id > e.secondNode.id
          ? "".concat(e.firstNode.id, "-").concat(e.secondNode.id)
          : "".concat(e.secondNode.id, "-").concat(e.firstNode.id);
      }
      function ve(e) {
        var t = new Map();
        return (
          e.forEach(function (e) {
            !(function (e, t) {
              var n,
                i = ge(t);
              e.set(i, (null !== (n = e.get(i)) && void 0 !== n ? n : 0) + 1);
            })(t, e);
          }),
          t
        );
      }
      function ye(e, t, n) {
        return t.length > d.maxNoteLengthChars
          ? (navigator.clipboard.writeText(t),
            n([
              "Note too long. Copied note to clipboard and truncated to first ".concat(
                d.maxNoteLengthChars,
                " characters in table"
              ),
            ]),
            t.slice(0, d.maxNoteLengthChars))
          : t;
      }
      var we = { key: "name", direction: "ASC" };
      function Se(e) {
        var t = e.rows,
          n = e.onUpdateRow,
          a = e.onDeleteRow,
          r = e.onClickEditableCell,
          s = e.setTemporaryErrors,
          l = re(we, "temperatureDegC", "capacitanceJPerDegK"),
          u = Object(o.a)(l, 3),
          f = u[0],
          b = u[1],
          h = u[2],
          j = Object(i.useMemo)(
            function () {
              return [
                {
                  key: "name",
                  text: "Name",
                  minWidthPx: 150,
                  validator: function (e, n) {
                    return (function (e, t) {
                      var n = e.trim(),
                        i = "" === n ? d.defaultNodeName.trim() : n;
                      return pe(
                        t.map(function (e) {
                          return e.trim();
                        }),
                        i
                      );
                    })(
                      n,
                      t
                        .filter(function (t) {
                          return t.id !== e;
                        })
                        .map(function (e) {
                          return e.name;
                        })
                    );
                  },
                },
                {
                  key: "temperatureDegC",
                  text: "Temp [C]",
                  minWidthPx: 120,
                  validator: function (e, t) {
                    return parseFloat(t) < -c.KELVIN
                      ? (s(["Temperature colder than what is physically possible"]), (-c.KELVIN).toString())
                      : t;
                  },
                },
                {
                  key: "capacitanceJPerDegK",
                  text: "Capacitance [J/K]",
                  minWidthPx: 120,
                  validator: function (e, t) {
                    var n = parseFloat(t);
                    return n <= 0
                      ? (s(0 === n ? ["Capacitance cannot be zero"] : ["Capacitance cannot be negative"]),
                        d.defaultSmallResistanceDegKPerW.toString())
                      : t;
                  },
                },
                { key: "powerGenW", text: "Power Gen [W]", minWidthPx: 120 },
                { key: "isBoundary", text: "Fixed Temp?", minWidthPx: 100 },
                {
                  key: "nodeNotes",
                  text: "Notes",
                  widthPercent: 1,
                  minWidthPx: 100,
                  validator: function (e, t) {
                    return ye(0, t, s);
                  },
                },
              ];
            },
            [t, s]
          ),
          p = t.sort(h).map(function (e) {
            return Object(P.jsxs)(
              k,
              {
                heightOffsetPx: d.tabHeightPx,
                isActive: e.isActive,
                children: [
                  j.map(function (t) {
                    var i = Object(P.jsx)(ae, { row: e, col: t, onUpdateRow: n });
                    return Object(P.jsx)(
                      N,
                      {
                        width: t.widthPercent,
                        minWidth: t.minWidthPx,
                        onFocus: function () {
                          return r(e.id);
                        },
                        children: i,
                      },
                      t.key
                    );
                  }),
                  Object(P.jsx)(de, {
                    row: e,
                    onDeleteRow: function () {
                      return a(e);
                    },
                  }),
                ],
              },
              e.id
            );
          });
        return Object(P.jsx)(v, {
          children: Object(P.jsxs)(y, {
            children: [
              Object(P.jsx)(M, { columns: j, sortState: f, setSortState: b }),
              Object(P.jsx)(w, { children: p }),
            ],
          }),
        });
      }
      var Ce = n(26);
      function ke(e) {
        switch (e) {
          case "conv":
            return "data:image/png;base64,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";
          case "cond":
            return "data:image/png;base64,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";
          default:
            return "data:image/png;base64,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";
        }
      }
      var Ne = l.b.div.withConfig({ displayName: "ConnectionKindOption__StyledWrapper", componentId: "sc-13kg5z9-0" })([
          "display:flex;align-items:center;justify-content:center;",
        ]),
        Te = l.b.img.withConfig({ displayName: "ConnectionKindOption__StyledImg", componentId: "sc-13kg5z9-1" })([
          "width:20px;padding-right:2px;",
        ]);
      function Ae(e) {
        return Object(P.jsxs)(Ne, { children: [Object(P.jsx)(Te, { src: ke(e.option.id) }), e.option.text] });
      }
      var De = { key: "firstNodeId", direction: "ASC" },
        We = [
          { id: "cond", text: "Conduction" },
          { id: "conv", text: "Convection\ufe0f\ufe0f" },
          { id: "rad", text: "Radiation\ufe0f" },
        ];
      function Ie(e) {
        var t = e.rows,
          n = e.nodes,
          a = e.onUpdateRow,
          r = e.onDeleteRow,
          c = e.setTemporaryErrors,
          s = re(De, "secondNodeId", "kind"),
          l = Object(o.a)(s, 3),
          u = l[0],
          f = l[1],
          b = l[2],
          h = Object(i.useCallback)(
            function (e, i) {
              var r = t.find(function (t) {
                  return t.id === e;
                }),
                o = n.find(function (e) {
                  return e.id === i.id;
                });
              r &&
                o &&
                o.id !== r.secondNode.id &&
                a(Object(z.a)(Object(z.a)({}, r), {}, { firstNode: o, firstNodeId: o.id }));
            },
            [n, a, t]
          ),
          j = Object(i.useCallback)(
            function (e, i) {
              var r = t.find(function (t) {
                  return t.id === e;
                }),
                o = n.find(function (e) {
                  return e.id === i.id;
                });
              r &&
                o &&
                o.id !== r.firstNode.id &&
                a(Object(z.a)(Object(z.a)({}, r), {}, { secondNode: o, secondNodeId: o.id }));
            },
            [n, a, t]
          ),
          p = Object(i.useCallback)(
            function (e, n) {
              var i = t.find(function (t) {
                return t.id === e;
              });
              i && a(Object(z.a)(Object(z.a)({}, i), {}, { kind: n.id }));
            },
            [a, t]
          ),
          m = n.map(function (e) {
            return { id: e.id, text: e.name };
          }),
          x = Object(i.useMemo)(
            function () {
              return [
                { key: "firstNodeId", text: "First Node", minWidthPx: 120, options: m, onSelectOption: h },
                { key: "secondNodeId", text: "Second Node", minWidthPx: 120, options: m, onSelectOption: j },
                {
                  key: "resistanceDegKPerW",
                  text: "Resistance",
                  minWidthPx: 120,
                  validator: function (e, t) {
                    var n = parseFloat(t);
                    return n <= 0
                      ? (c(0 === n ? ["Resistance cannot be zero"] : ["Resistance cannot be negative"]),
                        d.defaultSmallResistanceDegKPerW.toString())
                      : t;
                  },
                },
                {
                  key: "kind",
                  text: "Kind",
                  minWidthPx: 120,
                  options: We.map(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { text: Ae({ option: e }) });
                  }),
                  onSelectOption: p,
                },
                {
                  key: "connectionNotes",
                  text: "Notes",
                  widthPercent: 1,
                  minWidthPx: 100,
                  validator: function (e, t) {
                    return ye(0, t, c);
                  },
                },
              ];
            },
            [m, p, h, j, c]
          ),
          O = n
            .filter(function (e) {
              return e.isActive;
            })
            .map(function (e) {
              return e.id;
            }),
          g = t
            .map(function (e) {
              return Object(z.a)(
                Object(z.a)({}, e),
                {},
                { isActive: O.includes(e.firstNode.id) || O.includes(e.secondNode.id) }
              );
            })
            .sort(b)
            .map(function (e) {
              var n = x.map(function (n) {
                function i(t, i) {
                  return Object(P.jsx)(
                    N,
                    {
                      width: n.widthPercent,
                      minWidth: n.minWidthPx,
                      children: Object(P.jsx)(ae, {
                        row: e,
                        col: n,
                        options: t,
                        initiallySetOption: i,
                        onUpdateRow: a,
                        afterValue: xe(n, e),
                      }),
                    },
                    n.key
                  );
                }
                if (n.options) {
                  var r = n.options.find(function (t) {
                    return t.id === e[n.key];
                  });
                  return i(
                    r
                      ? [r].concat(
                          Object(Ce.a)(
                            Oe(n.key, n.options || [], e, t).filter(function (e) {
                              return e.id !== r.id;
                            })
                          )
                        )
                      : [],
                    r
                  );
                }
                return i([], void 0);
              });
              return Object(P.jsxs)(
                k,
                {
                  heightOffsetPx: d.tabHeightPx,
                  isActive: e.isActive,
                  children: [
                    n,
                    Object(P.jsx)(de, {
                      row: e,
                      onDeleteRow: function () {
                        return r(e);
                      },
                    }),
                  ],
                },
                e.id
              );
            });
        return Object(P.jsx)(v, {
          children: Object(P.jsxs)(y, {
            children: [
              Object(P.jsx)(M, { columns: x, sortState: u, setSortState: f }),
              Object(P.jsx)(w, { children: g }),
            ],
          }),
        });
      }
      var Pe = l.b.div.withConfig({ displayName: "Tabs__StyledTabsWrapper", componentId: "sc-tl49d5-0" })(
          ["display:inline-flex;width:100%;flex-direction:column;overflow:", ";position:relative;"],
          function (e) {
            return e.overflow || "auto";
          }
        ),
        Me = l.b.div.withConfig({ displayName: "Tabs__StyledTabs", componentId: "sc-tl49d5-1" })(
          [
            "display:inline-flex;width:100%;height:",
            "px;justify-content:space-evenly;position:sticky;top:0;left:0;background:white;box-sizing:border-box;z-index:1;",
          ],
          d.tabHeightPx
        ),
        Ke = l.b.button.withConfig({ displayName: "Tabs__StyledTab", componentId: "sc-tl49d5-2" })(
          [
            "display:inline-flex;font-size:16px;width:",
            ";cursor:pointer;text-decoration:none;align-items:center;background:",
            ";border-radius:5px 5px 0 0;border:1px solid black;border-bottom:2px solid black;white-space:nowrap;margin:0;&:hover,&:focus{opacity:0.7;}",
          ],
          function (e) {
            var t = e.width;
            return "".concat(100 * t, "%");
          },
          function (e) {
            return e.active ? d.tabColor : d.inactiveTabColor;
          }
        ),
        ze = l.b.div.withConfig({ displayName: "Tabs__StyledTabText", componentId: "sc-tl49d5-3" })(
          ["font-size:1.1em;font-weight:", ";opacity:", ";text-decoration:", ";}"],
          function (e) {
            return e.active ? "bold" : "unset";
          },
          function (e) {
            return e.active ? 1 : "inherit";
          },
          function (e) {
            return e.active ? "underline" : "unset";
          }
        ),
        Fe = l.b.div.withConfig({ displayName: "Tabs__StyledInnerContent", componentId: "sc-tl49d5-4" })([
          "background:white;position:relative;",
        ]);
      function Re(e) {
        var t = Object(i.useState)(0),
          n = Object(o.a)(t, 2),
          a = n[0],
          r = n[1];
        return Object(P.jsxs)(Pe, {
          overflow: e.overflow,
          children: [
            e.tabs.length > 1 &&
              Object(P.jsx)(Me, {
                children: e.tabs.map(function (e, t) {
                  var n = t === a;
                  return Object(P.jsx)(
                    Ke,
                    {
                      tabIndex: 0,
                      onClick: function () {
                        return r(t);
                      },
                      onKeyUp: function (e) {
                        "Enter" === e.key && r(t);
                      },
                      width: e.width,
                      active: n,
                      children: Object(P.jsx)(ze, { active: n, children: e.text }),
                    },
                    e.text
                  );
                }),
              }),
            Object(P.jsx)(Fe, {
              topLeftRounded: e.tabs.length <= 1,
              children: e.tabs.filter(function (e, t) {
                return t === a;
              })[0].component,
            }),
            e.tabs.filter(function (e, t) {
              return t === a;
            })[0].after,
          ],
        });
      }
      function Ee(e) {
        return JSON.stringify(e, null, 2);
      }
      function Le() {
        return new Date(new Date().setHours(new Date().getHours() - new Date().getTimezoneOffset() / 60)).toISOString();
      }
      function _e(e) {
        var t = new Blob([Ee(e)], { type: "text/plain;charset=utf-8" });
        return URL.createObjectURL(t);
      }
      var Ve = l.b.div.withConfig({
          displayName: "ModelControls__StyledModelControlsWrapper",
          componentId: "sc-univex-0",
        })(
          [
            "width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;border-top:",
            "px solid black;overflow:hidden;",
          ],
          d.borderWidthPx
        ),
        Je = l.b.div.withConfig({
          displayName: "ModelControls__StyledModelControlButtons",
          componentId: "sc-univex-1",
        })(["display:flex;justify-content:center;align-items:center;width:80%;"]),
        Be = Object(l.b)(x).withConfig({
          displayName: "ModelControls__StyledModelControlButton",
          componentId: "sc-univex-2",
        })(["height:100%;"]),
        He = Object(l.b)(Be).withConfig({ displayName: "ModelControls__StyledRunButton", componentId: "sc-univex-3" })([
          "font-size:1.3rem;",
        ]),
        qe = l.b.div.withConfig({
          displayName: "ModelControls__StyledCopyAndDownloadButtons",
          componentId: "sc-univex-4",
        })(["display:grid;grid-template-columns:repeat(2,50%);grid-gap:0.5em;margin-left:1em;"]),
        Ue = Object(l.b)(O).withConfig({ displayName: "ModelControls__StyledAnchor", componentId: "sc-univex-5" })([
          "",
        ]),
        Xe = l.b.input.withConfig({ displayName: "ModelControls__StyledInput", componentId: "sc-univex-6" })([
          "margin-right:0.5em;font-size:1.2em;",
        ]),
        Qe = l.b.div.withConfig({ displayName: "ModelControls__StyledTimeControls", componentId: "sc-univex-7" })([
          "display:flex;flex-direction:column;justify-content:space-between;height:80px;",
        ]),
        Ge = l.b.div.withConfig({ displayName: "ModelControls__StyledTimeControl", componentId: "sc-univex-8" })([
          "display:flex;flex-wrap:nowrap;width:100%;align-items:center;justify-content:space-between;",
        ]),
        Ye = l.b.div.withConfig({ displayName: "ModelControls__StyledInputWrapper", componentId: "sc-univex-9" })([
          "border:1px solid black;border-radius:2px;height:1.5em;width:5em;",
        ]),
        Ze = l.b.div.withConfig({ displayName: "ModelControls__StyledImportModel", componentId: "sc-univex-10" })([
          "display:flex;align-items:center;",
        ]),
        $e = Object(l.b)(g).withConfig({
          displayName: "ModelControls__StyledImportFromFile",
          componentId: "sc-univex-11",
        })(["display:block;"]),
        et = l.b.label.withConfig({ displayName: "ModelControls__StyledLabel", componentId: "sc-univex-12" })([
          "margin-right:0.2em;font-size:1.3rem;white-space:nowrap;",
        ]);
      function tt(e) {
        var t = e.appState,
          n = e.setAppState,
          a = e.setOutput,
          r = e.onRunModel,
          c = e.setTiming,
          s = Object(i.useState)(""),
          l = Object(o.a)(s, 2),
          u = l[0],
          f = l[1],
          b = Object(i.useRef)(null),
          h = Object(i.useRef)(null);
        return Object(P.jsxs)(Ve, {
          children: [
            Object(P.jsxs)(Je, {
              children: [
                Object(P.jsx)(He, { primary: !0, onClick: r, children: "Run Model" }),
                Object(P.jsxs)(qe, {
                  children: [
                    Object(P.jsx)(Be, {
                      onClick: function () {
                        navigator.clipboard.writeText(Ee(Object(z.a)(Object(z.a)({}, t), {}, { output: void 0 })));
                      },
                      children: "Copy Model",
                    }),
                    Object(P.jsx)(Be, {
                      onClick: function () {
                        var e = r();
                        navigator.clipboard.writeText(Ee(Object(z.a)(Object(z.a)({}, t), {}, { output: e })));
                      },
                      children: "Run & Copy",
                    }),
                    Object(P.jsx)(Ue, {
                      ref: b,
                      onClick: function () {
                        return (function (e, t) {
                          if (e.current) {
                            var n = _e(t);
                            e.current.setAttribute("href", n),
                              e.current.setAttribute("download", "".concat(Le(), "_thermal_model.json"));
                          }
                        })(b, t);
                      },
                      children: "Download Model",
                    }),
                    Object(P.jsx)(Ue, {
                      ref: h,
                      onClick: function () {
                        var e = r();
                        !(function (e, t) {
                          if (e.current) {
                            var n = _e(t);
                            e.current.setAttribute("href", n),
                              e.current.setAttribute("download", "".concat(Le(), "_thermal_model_with_results.json"));
                          }
                        })(h, Object(z.a)(Object(z.a)({}, t), {}, { output: e }));
                      },
                      children: "Run & Download",
                    }),
                  ],
                }),
              ],
            }),
            Object(P.jsxs)(Qe, {
              children: [
                Object(P.jsxs)(Ge, {
                  children: [
                    Object(P.jsx)(et, { children: "Run Time [seconds]:" }),
                    Object(P.jsx)(Ye, {
                      children: Object(P.jsx)(ee, {
                        initialValue: t.timing.totalTimeS,
                        fontSize: d.timeControlsFontSize,
                        onBlur: function (e) {
                          return c(Object(z.a)(Object(z.a)({}, t.timing), {}, { totalTimeS: e }));
                        },
                      }),
                    }),
                  ],
                }),
                Object(P.jsxs)(Ge, {
                  children: [
                    Object(P.jsx)(et, { children: "Timestep [seconds]:" }),
                    Object(P.jsx)(Ye, {
                      children: Object(P.jsx)(ee, {
                        initialValue: t.timing.timeStepS,
                        fontSize: d.timeControlsFontSize,
                        onBlur: function (e) {
                          return c(Object(z.a)(Object(z.a)({}, t.timing), {}, { timeStepS: e }));
                        },
                      }),
                    }),
                  ],
                }),
              ],
            }),
            Object(P.jsxs)(Ze, {
              children: [
                Object(P.jsx)(et, { children: "Model:" }),
                Object(P.jsx)(Xe, {
                  value: u,
                  placeholder: "Paste a Model Here",
                  onChange: function (e) {
                    return f(e.target.value);
                  },
                }),
                Object(P.jsx)(Be, {
                  onClick: function () {
                    var e = JSON.parse(u);
                    n(e), a(e.output), f("");
                  },
                  children: "Import Pasted",
                }),
              ],
            }),
            Object(P.jsxs)("div", {
              children: [
                Object(P.jsx)("input", {
                  id: "file-importer",
                  type: "file",
                  accept: ".json",
                  style: { display: "none" },
                  onChange: function (e) {
                    return (function (e, t, n) {
                      var i = e.target.files;
                      if (i && 0 !== i.length) {
                        var a = i[0],
                          r = new FileReader();
                        (r.onload = function () {
                          var e = r.result;
                          if (e && "string" === typeof e) {
                            var i = JSON.parse(e);
                            t(i), n(i.output);
                          }
                        }),
                          r.readAsText(a);
                      }
                    })(e, n, a);
                  },
                }),
                Object(P.jsx)($e, { htmlFor: "file-importer", children: "Import Model from File" }),
              ],
            }),
          ],
        });
      }
      function nt() {
        var e = Object(i.useState)([]),
          t = Object(o.a)(e, 2),
          n = t[0],
          a = t[1];
        return [
          n,
          a,
          function (e) {
            a(e),
              setTimeout(function () {
                return a([]);
              }, 1e3 * d.errorMessageDurationSeconds);
          },
        ];
      }
      var it = l.b.p.withConfig({ displayName: "style__StyledText", componentId: "sc-1xfbc7o-0" })([""]),
        at = l.b.a.withConfig({ displayName: "style__StyledLink", componentId: "sc-1xfbc7o-1" })([""]),
        rt = l.b.li.withConfig({ displayName: "style__StyledListItem", componentId: "sc-1xfbc7o-2" })([
          "margin-bottom:1em;",
        ]),
        ot = l.b.div.withConfig({ displayName: "style__StyledModalContent", componentId: "sc-1xfbc7o-3" })([
          "max-width:1200px;height:100%;overflow-y:auto;padding:3em;",
        ]),
        ct = l.b.h1.withConfig({ displayName: "style__StyledTitle", componentId: "sc-1xfbc7o-4" })([
          "line-height:1em;",
        ]),
        st = l.b.h2.withConfig({ displayName: "style__StyledSubTitle", componentId: "sc-1xfbc7o-5" })([
          "margin-top:1.5em;line-height:1em;",
        ]),
        dt = l.b.button.withConfig({ displayName: "style__StyledExitButton", componentId: "sc-1xfbc7o-6" })([
          "position:absolute;right:1em;top:1em;display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin:1em;padding:0;",
        ]),
        lt = l.b.div.withConfig({ displayName: "ErrorModal__StyledError", componentId: "sc-1lfh5r6-0" })(
          [
            "color:red;background:white;font-size:2em;text-align:center;position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);padding:2em;z-index:20;width:80%;border:1px solid red;opacity:0.9;animation:FadeAnimation ",
            "s ease-in forwards;@keyframes FadeAnimation{0%{opacity:0.9;visibility:",
            ";}80%{opacity:0.9;visibility:",
            ";}100%{opacity:0;visibility:hidden;}}",
          ],
          d.errorMessageDurationSeconds,
          function (e) {
            return e.isVisible ? "visible" : "hidden";
          },
          function (e) {
            return e.isVisible ? "visible" : "hidden";
          }
        );
      function ut(e) {
        var t = e.errors,
          n = e.setErrors;
        return 0 === t.length
          ? Object(P.jsx)(P.Fragment, {})
          : Object(P.jsxs)(lt, {
              isVisible: !0,
              children: [
                Object(P.jsx)(dt, {
                  onClick: function () {
                    n([]);
                  },
                  children: Object(P.jsx)(se, {}),
                }),
                t.map(function (e) {
                  return Object(P.jsx)("div", { children: e }, e);
                }),
              ],
            });
      }
      function ft(e) {
        var t = e.appState,
          n = e.setAppState,
          i = e.setOutput,
          a = e.width,
          r = e.height,
          c = e.setTiming,
          s = e.onAddNode,
          l = e.onAddConnection,
          u = e.updateNodes,
          f = e.deleteNodes,
          b = e.setActiveNodes,
          h = e.updateConnections,
          j = e.deleteConnections,
          p = e.onRunModel,
          m = nt(),
          x = Object(o.a)(m, 3),
          O = x[0],
          g = x[1],
          v = x[2],
          y = nt(),
          w = Object(o.a)(y, 3),
          k = w[0],
          N = w[1],
          T = w[2],
          A = Object(P.jsx)(Se, {
            rows: t.nodes,
            onUpdateRow: function (e) {
              return u([e], !1);
            },
            onDeleteRow: function (e) {
              return f([e.id]);
            },
            onClickEditableCell: function (e) {
              return b([e]);
            },
            setTemporaryErrors: v,
          }),
          D = Object(P.jsx)(S, { children: Object(P.jsx)(C, { onClick: s, children: "Add Node" }) }),
          W = Object(P.jsx)(Ie, {
            rows: t.connections,
            nodes: t.nodes,
            onUpdateRow: function (e) {
              return h([e]);
            },
            onDeleteRow: function (e) {
              return j([e.id]);
            },
            setTemporaryErrors: v,
          }),
          I = Object(P.jsx)(S, { children: Object(P.jsx)(C, { onClick: l, children: "Add Connection" }) });
        return Object(P.jsxs)(U, {
          width: a,
          height: r,
          children: [
            Object(P.jsxs)(X, {
              heightFrac: t.panelSizes.tableHeightFraction,
              children: [
                Object(P.jsx)(ut, { errors: O, setErrors: g }),
                Object(P.jsx)(Re, {
                  tabs: [
                    { text: "Nodes", component: A, after: D, width: 0.5 },
                    { text: "Connections", component: W, after: I, width: 0.5 },
                  ],
                }),
              ],
            }),
            Object(P.jsxs)(Q, {
              heightFrac: 1 - t.panelSizes.tableHeightFraction,
              children: [
                Object(P.jsx)(ut, { errors: k, setErrors: N }),
                Object(P.jsx)(tt, {
                  appState: t,
                  setAppState: n,
                  setOutput: i,
                  onRunModel: function () {
                    if (!(Math.ceil(t.timing.totalTimeS / t.timing.timeStepS) > d.maxTimeSteps)) return p();
                    T(["Decrease model run time or increase time step size"]);
                  },
                  setTiming: c,
                }),
              ],
            }),
          ],
        });
      }
      var bt,
        ht,
        jt = n(5),
        pt = n(249),
        mt = n(559),
        xt = n(564),
        Ot = n(239),
        gt = n(240),
        vt = n(231),
        yt = n(93),
        wt = n(90),
        St = l.b.div.withConfig({ displayName: "LinePlot__StyledToolTip", componentId: "sc-xj5jw3-0" })([
          "background:rgba(255,255,255,0.7);padding:0.2em;border:1px solid black;",
        ]),
        Ct = l.b.div.withConfig({ displayName: "LinePlot__StyledToolTipTitle", componentId: "sc-xj5jw3-1" })([
          "font-size:1em;font-weight:bold;",
        ]),
        kt = l.b.div.withConfig({ displayName: "LinePlot__StyledToolTipItem", componentId: "sc-xj5jw3-2" })(
          ["color:", ";display:flex;justify-content:space-between;"],
          function (e) {
            return e.color;
          }
        ),
        Nt = l.b.div.withConfig({ displayName: "LinePlot__StyledToolTipValue", componentId: "sc-xj5jw3-3" })(
          ['margin-left:1em;&::after{content:"', '";}'],
          function (e) {
            return e.after;
          }
        );
      function Tt(e) {
        var t = e.active,
          n = e.payload,
          i = e.label,
          a = e.after;
        if (t && n && n.length) {
          var r = Object(Ce.a)(n).sort(function (e, t) {
            return e.value > t.value ? -1 : e.value === t.value ? (e.name > t.name ? 1 : -1) : 1;
          });
          return Object(P.jsxs)(St, {
            children: [
              Object(P.jsx)(Ct, { children: "Time: ".concat(i, "s") }),
              r.map(function (e) {
                return Object(P.jsxs)(
                  kt,
                  {
                    color: e.color || "black",
                    children: [
                      Object(P.jsx)("div", { children: e.name }),
                      Object(P.jsx)(Nt, { after: a, children: e.value }),
                    ],
                  },
                  e.name
                );
              }),
            ],
          });
        }
        return null;
      }
      function At(e) {
        var t = e.plotDimensions,
          n = e.plotData,
          i = e.lines,
          a = e.xAxisKey,
          r = e.xLabel,
          o = e.yLabel,
          c = e.unit;
        return Object(P.jsxs)(mt.a, {
          height: t.height,
          width: t.width,
          margin: t.margin,
          data: n,
          children: [
            Object(P.jsx)(xt.a, { strokeDasharray: "3 3" }),
            Object(P.jsx)(Ot.a, {
              dataKey: a,
              tick: { fontSize: "".concat(d.plotTickFontSizePx) },
              label: { value: r, position: "center", dy: 20 },
            }),
            Object(P.jsx)(gt.a, {
              domain: ["dataMin", "auto"],
              allowDecimals: !1,
              tick: { fontSize: "".concat(d.plotTickFontSizePx) },
              padding: { top: d.plotYDomainPaddingPx, bottom: d.plotYDomainPaddingPx },
              label: { value: o, position: "center", angle: -90, dx: -20 },
            }),
            Object(P.jsx)(vt.a, { y: 0, stroke: "black", strokeWidth: 2 }),
            Object(P.jsx)(yt.a, { content: Object(P.jsx)(Tt, { after: c }) }),
            Object(P.jsx)(wt.a, {
              layout: "horizontal",
              verticalAlign: "top",
              align: "center",
              wrapperStyle: { paddingLeft: "10px", paddingBottom: "10px" },
            }),
            i,
          ],
        });
      }
      function Dt(e) {
        return e.firstNode.temperatureDegC >= e.secondNode.temperatureDegC;
      }
      function Wt(e) {
        var t = Dt(e),
          n = t ? e.firstNode.name : e.secondNode.name,
          i = t ? e.secondNode.name : e.firstNode.name;
        return "".concat(n, " to ").concat(i);
      }
      function It(e) {
        return Math.round(100 * e) / 100;
      }
      function Pt(e) {
        var t = Math.floor(Math.log10(e.totalTimeS)),
          n = Math.pow(10, t - 1);
        var i = e.timeSeriesS.length < d.maxPlotPoints,
          a = [],
          r = [];
        return (
          e.timeSeriesS.forEach(function (t, o) {
            if (i || ((d = t), 0 === Math.abs(d % n))) {
              var c = { time: t },
                s = { time: t };
              e.nodeResults.forEach(function (e) {
                var t,
                  n = e.tempDegC[o];
                c[e.node.name] = ((t = n), Math.round(10 * t) / 10);
              }),
                e.connectionResults.forEach(function (e) {
                  var t = e.heatTransferW[o],
                    n = Dt(e.connection) ? t : -t;
                  s[Wt(e.connection)] = It(n);
                }),
                a.push(c),
                r.push(s);
            }
            var d;
          }),
          [a, r]
        );
      }
      var Mt = ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#e67e22", "#34495e", "#16a085"],
        Kt = l.b.div(
          bt ||
            (bt = Object(jt.a)([
              "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n\n  .chart {\n    width: 60% !important;\n    max-width: 900px;\n\n    @media only screen and (max-width: 600px) {\n      width: 90% !important;\n      touch-action: pan-y;\n    }\n  }\n",
            ]))
        ),
        zt = l.b.div(
          ht ||
            (ht = Object(jt.a)([
              "\n  width: 100%;\n  height: ",
              "px;\n  border-top: ",
              "px solid black;\n  margin: 0;\n  padding: 0;\n",
            ])),
          function (e) {
            return e.height;
          },
          d.borderWidthPx
        );
      function Ft(e) {
        var t =
            !!(e.modelOutput && e.modelOutput.nodeResults.length > 0) && e.modelOutput ? e.modelOutput : c.emptyOutput,
          n = Pt(t),
          a = Object(o.a)(n, 2),
          r = a[0],
          s = a[1],
          d = Object(i.useMemo)(
            function () {
              return t.connectionResults.map(function (e, t) {
                return Object(P.jsx)(
                  pt.a,
                  {
                    type: "monotone",
                    dataKey: Wt(e.connection),
                    stroke: Mt[t],
                    activeDot: { r: 8 },
                    isAnimationActive: !1,
                  },
                  e.connection.id
                );
              });
            },
            [t.connectionResults]
          ),
          l = Object(i.useMemo)(
            function () {
              return t.nodeResults.map(function (e, t) {
                return Object(P.jsx)(
                  pt.a,
                  { type: "monotone", dataKey: e.node.name, stroke: Mt[t], activeDot: { r: 8 }, isAnimationActive: !1 },
                  e.node.id
                );
              });
            },
            [t.nodeResults]
          ),
          u = Object(P.jsx)(At, {
            plotDimensions: e.plotDimensions,
            plotData: r,
            lines: l,
            xAxisKey: "time",
            xLabel: "Time [s]",
            yLabel: "Temperature [degC]",
            unit: "degC",
          }),
          f = Object(P.jsx)(At, {
            plotDimensions: e.plotDimensions,
            plotData: s,
            lines: d,
            xAxisKey: "time",
            xLabel: "Time [s]",
            yLabel: "Heat Transfer [W]",
            unit: "W",
          });
        return Object(P.jsx)(zt, {
          height: e.plotDimensions.height,
          width: e.plotDimensions.width,
          children: Object(P.jsx)(Kt, {
            children: Object(P.jsx)(Re, {
              tabs: [
                { text: "Temperature", component: u, width: 0.5 },
                { text: "Heat Transfer", component: f, width: 0.5 },
              ],
              overflow: "hidden",
            }),
          }),
        });
      }
      var Rt = Object.freeze({ x: 0, y: 0 });
      function Et(e, t) {
        return { x: e.x - t.x, y: e.y - t.y };
      }
      function Lt(e, t) {
        return { x: e.x / t, y: e.y / t };
      }
      var _t = n(565),
        Vt = d.activeNodeOutlineWidthPx,
        Jt = d.minRadiusPx,
        Bt = d.maxRadiusPx,
        Ht = d.minLineThicknessPx,
        qt = d.maxLineThicknessPx,
        Ut = Math.floor((Jt + Bt) / 2),
        Xt = Math.floor((Ht + qt) / 2);
      function Qt(e, t, n, i, a, r, o, c, s) {
        !(function (e, t, n, i) {
          e.save(),
            e.beginPath(),
            e.arc(t.x, t.y, n, 0, 2 * Math.PI),
            (e.fillStyle = i),
            e.fill(),
            e.closePath(),
            e.restore();
        })(e, n, i, a),
          r &&
            (function (e, t, n, i) {
              e.save(),
                e.beginPath(),
                e.arc(t.x, t.y, n - Vt / 2, 0, 2 * Math.PI),
                (e.lineWidth = Vt),
                (e.strokeStyle = i),
                e.stroke(),
                e.closePath(),
                e.restore();
            })(e, n, i, "black"),
          o &&
            (function (e, t, n) {
              e.save(),
                (e.lineWidth = 2),
                (e.fillStyle = "#FFFFFF"),
                e.translate(t.x, t.y),
                e.rotate(Math.PI / 4),
                e.beginPath(),
                e.moveTo(-n, 0),
                e.lineTo(n, 0),
                e.stroke();
              for (var i = 0; i + 4.5 < n; ) {
                i += 4.5;
                var a = n * Math.sin(Math.acos(i / n));
                e.moveTo(-a - 1, i),
                  e.lineTo(a + 1, i),
                  e.stroke(),
                  e.moveTo(-a - 1, -i),
                  e.lineTo(a + 1, -i),
                  e.stroke();
              }
              e.closePath(),
                e.beginPath(),
                e.arc(0, 0, n + 2, 0, 2 * Math.PI, !1),
                e.arc(0, 0, n, 0, 2 * Math.PI, !0),
                e.fill(),
                e.restore();
            })(e, n, i),
          0 !== s &&
            (function (e, t, n, i) {
              e.save();
              var a,
                r,
                o,
                c = (i >= 1e3 || i <= -1e3 ? ((a = 1), i.toExponential(a).replace("+", "")) : i.toString()) + "W",
                s = 12;
              do {
                (e.font = "".concat(s, "px Helvetica")), (r = (o = e.measureText(c)).width), s--;
              } while (r + 10 > 2 * n);
              var d = o.actualBoundingBoxAscent;
              (e.fillStyle = "black"),
                (function (e, t, n, i, a, r) {
                  i < 2 * r && (r = i / 2),
                    a < 2 * r && (r = a / 2),
                    e.beginPath(),
                    e.moveTo(t + r, n),
                    e.arcTo(t + i, n, t + i, n + a, r),
                    e.arcTo(t + i, n + a, t, n + a, r),
                    e.arcTo(t, n + a, t, n, r),
                    e.arcTo(t, n, t + i, n, r),
                    e.closePath();
                })(e, t.x - r / 2 - 1, t.y - d, r + 2, 2 * d, d / 4),
                e.fill(),
                (e.fillStyle = "white"),
                e.fillText(c, t.x - r / 2, t.y + d / 2),
                e.restore();
            })(e, n, i, s),
          (function (e, t, n, i, a) {
            e.save(), (e.font = "14px Helvetica");
            var r = e.measureText(t),
              o = r.width;
            e.translate(n.x, n.y),
              "D" === a
                ? e.fillText(t, -o / 2, r.actualBoundingBoxAscent + i + 2)
                : "R" === a
                ? e.fillText(t, i + 2, r.actualBoundingBoxAscent / 2)
                : "U" === a
                ? e.fillText(t, -o / 2, -(r.actualBoundingBoxDescent + i + 2))
                : e.fillText(t, -(o + i + 2), r.actualBoundingBoxAscent / 2),
              e.restore();
          })(e, t, n, i, c);
      }
      function Gt(e, t) {
        t.forEach(function (n) {
          var i = tn(
              n.capacitanceJPerDegK,
              t.map(function (e) {
                return e.capacitanceJPerDegK;
              })
            ),
            a = (function (e, t) {
              var n = Math.min.apply(Math, Object(Ce.a)(t)),
                i = Math.max.apply(Math, Object(Ce.a)(t)),
                a = i - n;
              return Object(_t.a)()
                .domain([n - a / 3, (n + i) / 2, i + a / 3])
                .range(["blue", "#ababab", "red"])(e);
            })(
              n.temperatureDegC,
              t.map(function (e) {
                return e.temperatureDegC;
              })
            );
          Qt(e, n.name, n.center, i, a, n.isActive, n.isBoundary, n.textDirection, n.powerGenW);
        });
      }
      function Yt(e, t, n, i) {
        var a = ve(n),
          r = new Map(a),
          o = n.map(function (e) {
            return e.resistanceDegKPerW;
          });
        n.map(function (n) {
          var c = n.firstNode,
            s = n.secondNode,
            d = n.kind,
            l = i.get(d);
          if (l) {
            var u = t.find(function (e) {
                return e.id === c.id;
              }),
              f = t.find(function (e) {
                return e.id === s.id;
              });
            if (u && f) {
              var b,
                h,
                j = tn(
                  u.capacitanceJPerDegK,
                  t.map(function (e) {
                    return e.capacitanceJPerDegK;
                  })
                ),
                p = tn(
                  f.capacitanceJPerDegK,
                  t.map(function (e) {
                    return e.capacitanceJPerDegK;
                  })
                ),
                m = ge(n),
                x = null !== (b = r.get(m)) && void 0 !== b ? b : 0,
                O = (null !== (h = a.get(m)) && void 0 !== h ? h : 0) - x;
              !(function (e, t, n, i, a, r, o, c, s) {
                !(function (e, t, n, i, a, r) {
                  var o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                    c = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
                    s = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
                    d = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 1;
                  if (0 !== d) {
                    var l = n.x - t.x,
                      u = n.y - t.y,
                      f = Math.atan2(u, l),
                      b = Math.sqrt(l * l + u * u),
                      h = b - c;
                    0 === s &&
                      (e.save(),
                      (e.strokeStyle = i),
                      (e.lineWidth = a),
                      e.translate(t.x, t.y),
                      e.rotate(f),
                      e.beginPath(),
                      e.moveTo(o, 0),
                      e.lineTo(h, 0),
                      e.moveTo(h, -0),
                      e.lineTo(o, -0),
                      e.stroke(),
                      e.closePath(),
                      e.restore());
                    var j = 20,
                      p = 2,
                      m = 0 === s && 2 === d ? -(j / 2 + p) : 1 === s && 1 === d ? j / 2 + p : 0;
                    e.save(),
                      (e.fillStyle = "white"),
                      e.translate(t.x, t.y),
                      e.rotate(f),
                      e.translate(b / 2 + m, 0),
                      e.beginPath(),
                      e.arc(0, 0, j / 2, 0, 2 * Math.PI),
                      e.fill(),
                      e.closePath(),
                      e.rotate(-f),
                      e.translate(-j / 2, j / 2),
                      e.drawImage(r, 0, -j, j, j),
                      e.restore();
                  }
                })(e, t, i, "black", r, o, n, a, c, s);
              })(
                e,
                u.center,
                j,
                f.center,
                p,
                (function (e, t) {
                  var n = Math.min.apply(Math, Object(Ce.a)(t)),
                    i = Math.max.apply(Math, Object(Ce.a)(t));
                  if (n === i) return Xt;
                  return ((e - n) / (i - n)) * (qt - Ht) + Ht;
                })(n.resistanceDegKPerW, o),
                l,
                O,
                x
              ),
                (function (e, t) {
                  var n,
                    i = ge(t),
                    a = null !== (n = e.get(i)) && void 0 !== n ? n : 0;
                  a > 1 && e.set(i, a - 1);
                })(r, n);
            }
          }
        });
      }
      function Zt(e, t, n) {
        var i = e.x - t.x,
          a = e.y - t.y;
        return Math.pow(i, 2) + Math.pow(a, 2) <= Math.pow(n, 2);
      }
      function $t(e, t) {
        var n = { x: e.pageX, y: e.pageY },
          i = t.getBoundingClientRect();
        return Et(n, { x: i.left, y: i.top });
      }
      function en(e, t) {
        if (t.context) {
          var n = $t(e, t.context.canvas);
          return (i = n), (a = t.canvasViewState.offset), (r = t.canvasViewState.scale), Et(Lt(i, r), a);
        }
        return Rt;
        var i, a, r;
      }
      function tn(e, t) {
        var n = Math.min.apply(Math, Object(Ce.a)(t)),
          i = Math.max.apply(Math, Object(Ce.a)(t));
        return n === i ? Ut : ((e - n) / (i - n)) * (Bt - Jt) + Jt;
      }
      var nn = d.maxZoom,
        an = d.minZoom,
        rn = d.zoomSensitivity,
        on = d.maxZoomDelta;
      var cn,
        sn,
        dn,
        ln = l.b.div.withConfig({
          displayName: "CanvasControls__StyledCanvasControlButtons",
          componentId: "sc-wwqk9p-0",
        })(["position:absolute;bottom:0;left:0;display:flex;flex-direction:column;"]),
        un = Object(l.b)(x).withConfig({
          displayName: "CanvasControls__StyledCanvasControlButton",
          componentId: "sc-wwqk9p-1",
        })(["margin:0.2em;font-size:0.75em;"]);
      function fn(e) {
        return Object(P.jsxs)(ln, {
          children: [
            Object(P.jsx)(un, {
              onClick: function () {
                return (
                  e.canvasState.context &&
                  e.setCanvasViewState({ offset: e.savedCanvasState.offset, scale: e.savedCanvasState.scale })
                );
              },
              children: "Saved View",
            }),
            Object(P.jsx)(un, {
              onClick: function () {
                return e.canvasState.context && e.setCanvasViewState({ offset: Rt, scale: 1 });
              },
              children: "Zero View",
            }),
            Object(P.jsx)(un, {
              onClick: function () {
                e.setSavedCanvasState({
                  offset: e.canvasState.canvasViewState.offset,
                  scale: e.canvasState.canvasViewState.scale,
                });
              },
              children: "Overwrite Saved View",
            }),
          ],
        });
      }
      var bn = l.b.div(
          cn || (cn = Object(jt.a)(["\n  display: block;\n  max-height: 100%;\n  position: relative;\n"]))
        ),
        hn = l.b.div(
          sn ||
            (sn = Object(jt.a)([
              "\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 0.5em;\n  font-size: 0.75em;\n",
            ]))
        ),
        jn = l.b.canvas(
          dn || (dn = Object(jt.a)(["\n  width: ", ";\n  height: ", ";\n"])),
          function (e) {
            var t = e.cssWidth;
            return "".concat(t, "px");
          },
          function (e) {
            var t = e.cssHeight;
            return "".concat(t, "px");
          }
        );
      function pn(e) {
        var t,
          n,
          a = e.canvasWidth,
          r = e.canvasHeight,
          c = e.devicePixelRatio,
          s = e.draw,
          d = e.onMouseDown,
          l = e.handleDoubleClick,
          u = e.canvasViewState,
          f = e.setCanvasViewState,
          b = e.savedCanvasViewState,
          h = e.setSavedCanvasViewState,
          j = e.setKeyboardActive,
          p = Object(i.useRef)(null);
        (t = p),
          (n = j),
          Object(i.useEffect)(
            function () {
              var e = function (e) {
                var i = !!t.current && t.current.contains(e.target);
                n(i);
              };
              return (
                document.addEventListener("mousedown", e),
                function () {
                  document.removeEventListener("mousedown", e);
                }
              );
            },
            [t, n]
          );
        var m = (function (e, t, n) {
            var a = Object(i.useState)(null),
              r = Object(o.a)(a, 2),
              c = r[0],
              s = r[1],
              d = Object(i.useRef)(Rt),
              l = Object(i.useRef)(Rt),
              u = Object(i.useRef)(t),
              f = Object(i.useCallback)(
                function (e) {
                  if (c) {
                    var i = $t(e, c.canvas);
                    (l.current = d.current), (d.current = i);
                    var a = Lt(Et(d.current, l.current), t.scale),
                      r = { scale: t.scale, offset: ((o = u.current.offset), (s = a), { x: o.x + s.x, y: o.y + s.y }) };
                    n(r), (u.current = r);
                  }
                  var o, s;
                },
                [c, t.scale, n]
              ),
              b = Object(i.useCallback)(
                function () {
                  document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", b);
                },
                [f]
              ),
              h = Object(i.useCallback)(
                function (e) {
                  c &&
                    (document.addEventListener("mousemove", f),
                    document.addEventListener("mouseup", b),
                    (d.current = $t(e, c.canvas)));
                },
                [c, f, b]
              );
            return (
              Object(i.useLayoutEffect)(
                function () {
                  function i(e) {
                    if ((e.preventDefault(), c)) {
                      var i = $t(e, c.canvas);
                      (l.current = d.current), (d.current = i);
                      var a = e.deltaY / rn,
                        r = 1 - (Math.abs(a) > on ? (a / Math.abs(a)) * on : a),
                        o = t.scale * r;
                      if (o > nn || o < an) return;
                      var s = Et(Lt(d.current, t.scale), Lt(d.current, o)),
                        f = { offset: Et(u.current.offset, s), scale: o };
                      n(f), (u.current = f);
                    }
                  }
                  var a = e.current;
                  if (a)
                    return (
                      (u.current = t),
                      a.addEventListener("wheel", i),
                      function () {
                        return a.removeEventListener("wheel", i);
                      }
                    );
                },
                [e, t, c, n]
              ),
              [c, s, h]
            );
          })(p, u, f),
          x = Object(o.a)(m, 3),
          O = x[0],
          g = x[1],
          v = x[2];
        return (
          Object(i.useLayoutEffect)(
            function () {
              if (p.current) {
                var e = p.current.getContext("2d");
                g(e);
              }
            },
            [g]
          ),
          Object(i.useLayoutEffect)(
            function () {
              O &&
                ((O.canvas.width = a * c),
                (O.canvas.height = r * c),
                O.scale(u.scale * c, u.scale * c),
                O.translate(u.offset.x, u.offset.y),
                s(O));
            },
            [r, a, O, c, s, u.offset.x, u.offset.y, u.scale]
          ),
          Object(P.jsxs)(bn, {
            children: [
              Object(P.jsxs)(hn, {
                children: [
                  Object(P.jsx)("div", { children: "x: ".concat(Math.round(u.offset.x)) }),
                  Object(P.jsx)("div", { children: "y: ".concat(Math.round(u.offset.y)) }),
                  Object(P.jsx)("div", { children: "scale: ".concat(It(u.scale)) }),
                ],
              }),
              Object(P.jsx)(fn, {
                setCanvasViewState: f,
                canvasState: { context: O, canvasViewState: u, canvasWidth: a, canvasHeight: r },
                savedCanvasState: b,
                setSavedCanvasState: h,
              }),
              Object(P.jsx)(jn, {
                ref: p,
                width: a * c,
                height: r * c,
                cssWidth: a,
                cssHeight: r,
                onMouseDown: function (e) {
                  return d(e, { context: O, canvasViewState: u, canvasWidth: a, canvasHeight: r }, function () {
                    return v(e);
                  });
                },
                onDoubleClick: function (e) {
                  return l(e, { context: O, canvasViewState: u, canvasWidth: a, canvasHeight: r });
                },
              }),
            ],
          })
        );
      }
      function mn(e, t) {
        var n = (function () {
            var e = Object(i.useState)(new Map()),
              t = Object(o.a)(e, 2),
              n = t[0],
              a = t[1];
            return (
              Object(i.useEffect)(function () {
                ["cond", "conv", "rad"].forEach(function (e) {
                  var t = new Image();
                  (t.src = ke(e)),
                    (t.onload = function () {
                      return a(function (n) {
                        return new Map(n.set(e, t));
                      });
                    });
                });
              }, []),
              n
            );
          })(),
          a = Object(i.useCallback)(
            function (i) {
              Gt(i, e), Yt(i, e, t, n);
            },
            [t, e, n]
          ),
          r = Object(i.useCallback)(
            function (e) {
              e.context &&
                (e.context.clearRect(
                  -e.canvasViewState.offset.x,
                  -e.canvasViewState.offset.y,
                  e.canvasWidth / e.canvasViewState.scale,
                  e.canvasHeight / e.canvasViewState.scale
                ),
                a(e.context));
            },
            [a]
          );
        return [a, r];
      }
      function xn(e, t, n, a) {
        var r = Object(i.useCallback)(
          function (e, t, n) {
            if (n.context) {
              var i = en(e, n);
              a(n),
                (function (e, t, n, i) {
                  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                  e.save(), e.beginPath(), (e.strokeStyle = i), (e.lineWidth = 2);
                  var o = n.x - t.x,
                    c = n.y - t.y,
                    s = Math.atan2(c, o),
                    d = Math.sqrt(o * o + c * c);
                  e.translate(t.x, t.y), e.rotate(s), e.beginPath(), e.moveTo(a, 0);
                  var l = d - r;
                  e.lineTo(l, 0), e.stroke(), e.closePath(), e.restore();
                })(n.context, t.center, i, "grey");
            }
          },
          [a]
        );
        return Object(i.useCallback)(
          function (i, o, c) {
            var s = function (e) {
              r(e, o, c);
            };
            document.addEventListener("mousemove", s),
              document.addEventListener("mouseup", function i(r) {
                document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", i);
                var d = en(r, c),
                  l = e.find(function (t) {
                    var n = tn(
                      t.capacitanceJPerDegK,
                      e.map(function (e) {
                        return e.capacitanceJPerDegK;
                      })
                    );
                    return Zt(d, t.center, n) && t.id !== o.id;
                  });
                if (l) {
                  var u = je(o, l, t);
                  u ? n(u) : a(c);
                } else a(c);
              });
          },
          [n, t, e, a, r]
        );
      }
      function On(e, t, n, i, a, r) {
        var o = Et(en(e, n), i.center),
          c = Et(en(t, n), o),
          s = Object(z.a)(Object(z.a)({}, i), {}, { isActive: !0, center: c }),
          d =
            i.isActive || a
              ? r.map(function (e) {
                  var t = Et(i.center, e.center);
                  return Object(z.a)(Object(z.a)({}, e), {}, { center: Et(c, t) });
                })
              : [];
        return [s].concat(Object(Ce.a)(d));
      }
      function gn(e, t, n) {
        return Object(i.useCallback)(
          function (i, a) {
            var r = en(i, a),
              c = function (e) {
                var t, i, o, c;
                a.context &&
                  (n(a),
                  (t = a.context),
                  (i = r),
                  (o = en(e, a)),
                  (c = "grey"),
                  t.save(),
                  t.beginPath(),
                  (t.fillStyle = c),
                  (t.globalAlpha = 0.2),
                  t.fillRect(i.x, i.y, o.x - i.x, o.y - i.y),
                  t.closePath(),
                  t.beginPath(),
                  (t.strokeStyle = c),
                  t.rect(i.x, i.y, o.x - i.x, o.y - i.y),
                  t.stroke(),
                  t.closePath(),
                  t.restore());
              };
            document.addEventListener("mousemove", c),
              document.addEventListener("mouseup", function n(i) {
                document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", n);
                var s = en(i, a),
                  d = e
                    .filter(function (e) {
                      return (
                        (function (e, t, n) {
                          var i = e.x < t.x && e.y < t.y ? [e, t] : [t, e],
                            a = Object(o.a)(i, 2),
                            r = a[0],
                            c = a[1],
                            s = e.x < t.x && e.y > t.y ? [e, t] : [t, e],
                            d = Object(o.a)(s, 2),
                            l = d[0],
                            u = d[1];
                          return (
                            (r.x <= n.x && n.x <= c.x && r.y <= n.y && n.y <= c.y) ||
                            (l.x <= n.x && n.x <= u.x && u.y <= n.y && n.y <= l.y)
                          );
                        })(r, s, e.center) || e.isActive
                      );
                    })
                    .map(function (e) {
                      return e.id;
                    });
                t(d);
              });
          },
          [e, n, t]
        );
      }
      function vn(e, t, n, a, r, o, c) {
        var s = xn(e, t, n, c),
          l = (function (e) {
            var t = Object(i.useRef)(!1);
            return Object(i.useCallback)(
              function (n, i, a, r) {
                var o = d.multiSelectKeys.some(function (e) {
                    return n[e];
                  }),
                  c = function (c) {
                    if (r.context) {
                      t.current = !0;
                      var s = On(n, c, r, i, o, a);
                      e(
                        s,
                        !d.multiSelectKeys.some(function (e) {
                          return c[e];
                        })
                      );
                    }
                  };
                document.addEventListener("mousemove", c),
                  document.addEventListener("mouseup", function s(d) {
                    document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", s);
                    var l = On(n, d, r, i, o, a);
                    e(l, !o), (t.current = !1);
                  });
              },
              [e]
            );
          })(a),
          u = gn(e, r, c);
        return Object(i.useCallback)(
          function (t, n, i) {
            var a = en(t, n),
              c = e.filter(function (e) {
                return e.isActive;
              }),
              f = c.map(function (e) {
                return e.id;
              }),
              b = e.reverse().find(function (t) {
                var n = tn(
                  t.capacitanceJPerDegK,
                  e.map(function (e) {
                    return e.capacitanceJPerDegK;
                  })
                );
                return Zt(a, t.center, n);
              });
            if (b)
              t.altKey
                ? s(t, b, n)
                : d.multiSelectKeys.some(function (e) {
                    return t[e];
                  }) && f.includes(b.id)
                ? r(
                    f.filter(function (e) {
                      return e !== b.id;
                    })
                  )
                : l(t, b, c, n);
            else if (
              d.multiSelectKeys.some(function (e) {
                return t[e];
              })
            )
              u(t, n);
            else {
              document.addEventListener("mouseup", function e(n) {
                n.clientX === t.clientX && n.clientY === t.clientY && o(), document.removeEventListener("mouseup", e);
              }),
                i(t);
            }
          },
          [e, o, l, u, s, r]
        );
      }
      var yn = Object(c.makeNode)({
          name: "Jerry the Cat",
          temperatureDegC: 38.3,
          capacitanceJPerDegK: 16200,
          powerGenW: 100,
          isBoundary: !1,
        }),
        wn = Object(z.a)(
          Object(z.a)({}, yn),
          {},
          { center: { x: 200, y: 150 }, isActive: !1, textDirection: "L", nodeNotes: "Jerry is the best cat." }
        ),
        Sn = Object(c.makeNode)({
          name: "Heated Cat Bed",
          temperatureDegC: 40,
          capacitanceJPerDegK: 1e4,
          powerGenW: 4,
          isBoundary: !1,
        }),
        Cn = Object(z.a)(
          Object(z.a)({}, Sn),
          {},
          { center: { x: 500, y: 150 }, isActive: !1, textDirection: "R", nodeNotes: "" }
        ),
        kn = Object(c.makeNode)({
          name: "Apartment Air",
          temperatureDegC: 22.5,
          capacitanceJPerDegK: 6e5,
          powerGenW: 0,
          isBoundary: !1,
        }),
        Nn = [
          wn,
          Cn,
          Object(z.a)(
            Object(z.a)({}, kn),
            {},
            { center: { x: 350, y: 300 }, isActive: !1, textDirection: "D", nodeNotes: "" }
          ),
        ],
        Tn = [he(yn, Sn, "cond", 2.5), he(kn, yn, "conv", 0.33), he(kn, Sn, "conv", 0.67)],
        An = { timeStepS: d.defaultTimeStepSeconds, totalTimeS: d.defaultTotalTimeSeconds },
        Dn = { offset: Rt, scale: 1 },
        Wn = {
          editorWidthFraction: d.defaultEditorWidthFraction,
          canvasHeightFraction: d.defaultCanvasHeightFraction,
          tableHeightFraction: d.defaultTableHeightFraction,
        },
        In = { visible: !1, type: "theory" },
        Pn = { timing: An, nodes: Nn, connections: Tn, canvasViewState: Dn, savedCanvasState: Dn, panelSizes: Wn },
        Mn = { copiedNodes: [], copiedConnections: [] };
      function Kn(e) {
        var t = Object(i.useRef)(void 0),
          n = e.onDragX,
          a = e.onDragY,
          r = e.constrainX,
          o = e.constrainY,
          c = function e() {
            document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", e);
          },
          s = function (e) {
            if (t.current) {
              var i = { x: e.pageX, y: e.pageY },
                c = Et(i, t.current);
              n && n(c.x), a && a(c.y), (t.current = { x: r ? r(i.x) : i.x, y: o ? o(i.y) : i.y });
            }
          };
        return function (e) {
          document.addEventListener("mousemove", s),
            document.addEventListener("mouseup", c),
            (t.current = { x: e.pageX, y: e.pageY });
        };
      }
      function zn(e) {
        return e < d.minPanelFraction ? d.minPanelFraction : e > 1 - d.minPanelFraction ? 1 - d.minPanelFraction : e;
      }
      var Fn = l.b.div.withConfig({
          displayName: "ConfirmationModal__StyledConfirmationModal",
          componentId: "sc-1g3ppnp-0",
        })([
          "display:flex;flex-direction:column;margin:2em;justify-content:center;align-items:center;line-height:1.8em;",
        ]),
        Rn = l.b.p.withConfig({
          displayName: "ConfirmationModal__StyledConfirmationText",
          componentId: "sc-1g3ppnp-1",
        })(["margin:0.8em;font-size:1.5em;font-weight:bold;max-width:800px;text-align:center;"]),
        En = l.b.div.withConfig({
          displayName: "ConfirmationModal__StyledConfirmationButtons",
          componentId: "sc-1g3ppnp-2",
        })(["display:flex;"]),
        Ln = l.b.button.withConfig({
          displayName: "ConfirmationModal__StyledConfirmationButton",
          componentId: "sc-1g3ppnp-3",
        })(["font-size:1.5em;margin-left:1em;margin-right:1em;min-width:100px;"]);
      function _n(e) {
        var t = e.modalState,
          n = e.setModalState;
        return Object(P.jsxs)(Fn, {
          children: [
            t.confirmText &&
              t.confirmText.map(function (e) {
                return Object(P.jsx)(Rn, { children: e }, e);
              }),
            Object(P.jsxs)(En, {
              children: [
                Object(P.jsx)(Ln, {
                  onClick: function () {
                    return n(function (e) {
                      return Object(z.a)(Object(z.a)({}, e), {}, { visible: !1 });
                    });
                  },
                  children: "No",
                }),
                Object(P.jsx)(Ln, {
                  onClick: function () {
                    t.onConfirm && t.onConfirm(),
                      n(function (e) {
                        return Object(z.a)(Object(z.a)({}, e), {}, { visible: !1 });
                      });
                  },
                  children: "Yes",
                }),
              ],
            }),
          ],
        });
      }
      var Vn,
        Jn,
        Bn,
        Hn,
        qn,
        Un,
        Xn,
        Qn,
        Gn,
        Yn,
        Zn,
        $n,
        ei,
        ti,
        ni,
        ii,
        ai,
        ri,
        oi,
        ci,
        si,
        di,
        li,
        ui,
        fi,
        bi,
        hi,
        ji,
        pi,
        mi,
        xi,
        Oi,
        gi,
        vi,
        yi,
        wi,
        Si,
        Ci,
        ki,
        Ni,
        Ti,
        Ai,
        Di,
        Wi,
        Ii,
        Pi,
        Mi,
        Ki,
        zi,
        Fi,
        Ri,
        Ei,
        Li,
        _i,
        Vi,
        Ji,
        Bi,
        Hi,
        qi,
        Ui,
        Xi,
        Qi,
        Gi,
        Yi,
        Zi,
        $i,
        ea,
        ta,
        na,
        ia,
        aa,
        ra,
        oa,
        ca,
        sa,
        da,
        la,
        ua,
        fa,
        ba,
        ha,
        ja,
        pa,
        ma,
        xa = n(6);
      function Oa() {
        return Object(P.jsxs)(ot, {
          children: [
            Object(P.jsx)(ct, { children: "How Does thermalmodel.com Work?" }),
            Object(P.jsxs)(it, {
              children: [
                "The model used by thermalmodel.com is a linear",
                " ",
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/State-space_representation",
                  target: "_blank",
                  children: "state space",
                }),
                " ",
                "model based off conservation of heat flow:",
                " ",
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                Vn ||
                  (Vn = Object(jt.a)(
                    ["sum{q_{in/out}} + sum{q_{generated/consumed}} = 0"],
                    ["\\sum{q_{in/out}} + \\sum{q_{generated/consumed}} = 0"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Jn || (Jn = Object(jt.a)(["sum{q_{in/out}}"], ["\\sum{q_{in/out}}"]))),
                    }),
                    " ",
                    "is the sum of all heat transfer in or out, in Watts",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Bn || (Bn = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(
                        Hn || (Hn = Object(jt.a)(["sum{q_{generated/consumed}}"], ["\\sum{q_{generated/consumed}}"]))
                      ),
                    }),
                    " ",
                    "is the sum of all heat generated or consumed, in Watts",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(qn || (qn = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsxs)(it, {
              children: [
                "The class of model is referred to as a",
                " ",
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/Lumped-element_model#Thermal_systems",
                  target: "_blank",
                  children: "Lumped-Element model",
                }),
                ', which produces accurate results when each "lump", or in the terminology of this website, "node", can be assumed to have uniform temperature. A node can be assumed to be uniform temperature when the diffusion of heat within it is much greater than the transfer of heat into or out of it. This is quantified by a small',
                " ",
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/Biot_number",
                  target: "_blank",
                  children: "Biot number",
                }),
                ".",
              ],
            }),
            Object(P.jsx)(it, {
              children:
                "What follows is the definition and manipulation of fundamental heat transfer equations into the numerical form thermalmodel.com uses to calculate node temperatures when it runs a model.",
            }),
            Object(P.jsx)(st, { children: "Fourier's Law and Thermal Conductance" }),
            Object(P.jsxs)(it, {
              children: [
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/Thermal_conduction#Fourier's_law",
                  target: "_blank",
                  children: "Fourier's Law in 1 dimension",
                }),
                " ",
                "states:",
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(Un || (Un = Object(jt.a)(["q =-c Delta T"], ["q =-c \\Delta T"]))),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Xn || (Xn = Object(jt.a)(["q"]))) }),
                    " is heat transfer, in Watts",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Qn || (Qn = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Gn || (Gn = Object(jt.a)(["c"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_contact_conductance",
                      target: "_blank",
                      children: "Thermal Conductance",
                    }),
                    " ",
                    "or",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_transmittance",
                      target: "_blank",
                      children: "Thermal Transmittance,",
                    }),
                    " ",
                    "in Watts per degree Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Yn || (Yn = Object(jt.a)(["[\frac{W}{K}]"], ["[\\frac{W}{K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Zn || (Zn = Object(jt.a)(["Delta T"], ["\\Delta T"]))),
                    }),
                    " is the temperature difference, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw($n || ($n = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(st, { children: "Thermal Resistance" }),
            Object(P.jsxs)(it, {
              children: [
                "The reciprocal of Thermal Conductance is",
                " ",
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/Thermal_resistance",
                  target: "_blank",
                  children: "Thermal Resistance",
                }),
                " ",
                ", ",
                Object(P.jsx)(xa.a, {
                  display: !1,
                  tex: String.raw(ei || (ei = Object(jt.a)(["R = \frac{1}{c}"], ["R = \\frac{1}{c}"]))),
                }),
                ", measured in degrees Kelvin per Watt",
                " ",
                Object(P.jsx)(xa.a, {
                  display: !1,
                  tex: String.raw(ti || (ti = Object(jt.a)(["[\frac{K}{W}]"], ["[\\frac{K}{W}]"]))),
                }),
                ". A given object or material's Thermal Resistance can be thought of as the temperature difference required to get one Watt of heat to flow through it. A material with a higher Thermal Resistance requires a higher temperature difference across it to achieve the same heat flow as one with a lower Thermal Resistance.",
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                ni ||
                  (ni = Object(jt.a)(
                    ["q = -\frac{Delta T}{R} spacespacespace[1]"],
                    ["q = -\\frac{\\Delta T}{R} \\space\\space\\space[1]"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ii || (ii = Object(jt.a)(["q"]))) }),
                    " is heat transfer, in Watts",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ai || (ai = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(ri || (ri = Object(jt.a)(["Delta T"], ["\\Delta T"]))),
                    }),
                    " is the temperature difference, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(oi || (oi = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ci || (ci = Object(jt.a)(["R"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_resistance",
                      target: "_blank",
                      children: "Thermal Resistance",
                    }),
                    ", in degrees Kelvin per Watt",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(si || (si = Object(jt.a)(["[\frac{K}{W}]"], ["[\\frac{K}{W}]"]))),
                    }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(st, { children: "Thermal Capacitance" }),
            Object(P.jsxs)(it, {
              children: [
                Object(P.jsx)(at, {
                  href: "https://en.wikipedia.org/wiki/Heat_capacity",
                  target: "_blank",
                  children: "Thermal Capacitance",
                }),
                " ",
                "(different than Thermal Conductance above) can be thought of as the amount of heat energy absorbed by an object to increase its temperature by 1 degree:",
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                di ||
                  (di = Object(jt.a)(
                    ["C = lim_{Delta T \to 0} \frac{Q}{Delta T} = \frac{dQ}{dT}"],
                    ["C = \\lim_{\\Delta T \\to 0} \\frac{Q}{\\Delta T} = \\frac{dQ}{dT}"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(li || (li = Object(jt.a)(["C"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Heat_capacity",
                      target: "_blank",
                      children: "Thermal Capacitance",
                    }),
                    " ",
                    ", or Heat Capacity, in Joules per degree Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(ui || (ui = Object(jt.a)(["[\frac{J}{K}]"], ["[\\frac{J}{K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(fi || (fi = Object(jt.a)(["Q"]))) }),
                    " is heat transfer, in Joules",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(bi || (bi = Object(jt.a)(["[J]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(hi || (hi = Object(jt.a)(["Delta T"], ["\\Delta T"]))),
                    }),
                    " is the temperature difference, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ji || (ji = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(pi || (pi = Object(jt.a)(["\frac{dQ}{dT}"], ["\\frac{dQ}{dT}"]))),
                    }),
                    " is the rate of change of heat energy with respect to temperature, in Joules per degree",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(mi || (mi = Object(jt.a)(["[\frac{J}{K}]"], ["[\\frac{J}{K}]"]))),
                    }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(it, {
              children:
                "Rearranging and differentiating the equation above with respect to time, we obtain the following:",
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                xi ||
                  (xi = Object(jt.a)(
                    ["q = C \frac{dT}{dt} spacespacespace[2]"],
                    ["q = C \\frac{dT}{dt} \\space\\space\\space[2]"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Oi || (Oi = Object(jt.a)(["q"]))) }),
                    " is heat transfer, in Watts (i.e. Joules per second)",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(gi || (gi = Object(jt.a)(["[W = \frac{J}{s}]"], ["[W = \\frac{J}{s}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(vi || (vi = Object(jt.a)(["C"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Heat_capacity",
                      target: "_blank",
                      children: "Thermal Capacitance",
                    }),
                    " ",
                    ", or Heat Capacity, in Joules per degree Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(yi || (yi = Object(jt.a)(["[\frac{J}{K}]"], ["[\\frac{J}{K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(wi || (wi = Object(jt.a)(["\frac{dT}{dt}"], ["\\frac{dT}{dt}"]))),
                    }),
                    " is the derivative of temperature with respect to time, in degrees per second",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Si || (Si = Object(jt.a)(["[\frac{K}{s}]"], ["[\\frac{K}{s}]"]))),
                    }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(st, { children: "Model Equation" }),
            Object(P.jsxs)(it, {
              children: [
                "We now have two equations for",
                " ",
                Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Ci || (Ci = Object(jt.a)(["q"]))) }),
                ", heat transfer, in Watts. Equating these, working out the signs, and adding in power generated or consumed, we obtain the following:",
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                ki ||
                  (ki = Object(jt.a)(
                    ["C \frac{dT}{dt} = sum{\frac{Delta T}{R}} - q_{generated/consumed}"],
                    ["C \\frac{dT}{dt} = \\sum{\\frac{\\Delta T}{R}} - q_{generated/consumed}"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Ni || (Ni = Object(jt.a)(["C"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Heat_capacity",
                      target: "_blank",
                      children: "Thermal Capacitance",
                    }),
                    " ",
                    ", or Heat Capacity, in Joules per degree Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Ti || (Ti = Object(jt.a)(["[\frac{J}{K}]"], ["[\\frac{J}{K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Ai || (Ai = Object(jt.a)(["\frac{dT}{dt}"], ["\\frac{dT}{dt}"]))),
                    }),
                    " is the derivative of temperature with respect to time, in degrees per second",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Di || (Di = Object(jt.a)(["[\frac{K}{s}]"], ["[\\frac{K}{s}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Wi || (Wi = Object(jt.a)(["Delta T"], ["\\Delta T"]))),
                    }),
                    " is the temperature difference, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Ii || (Ii = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Pi || (Pi = Object(jt.a)(["R"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_resistance",
                      target: "_blank",
                      children: "Thermal Resistance",
                    }),
                    ", in degrees Kelvin per Watt",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Mi || (Mi = Object(jt.a)(["[\frac{K}{W}]"], ["[\\frac{K}{W}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Ki || (Ki = Object(jt.a)(["q_{generated/consumed}"]))),
                    }),
                    " ",
                    "is the net heat generated or consumed, in Watts",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(zi || (zi = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(it, {
              children:
                "This partial differential equation can be simplified to a numerical equation. The results of the equation are reasonable when the time step size between discrete states is small. You'll notice that if you rerun a model with too large a time step, unstable results appear - at high time step sizes, errors compound and blow up the temperature differences to unreasonable numbers. If you see instability, decrease the time step size and rerun your model.",
            }),
            Object(P.jsx)(it, {
              children: "Assuming small time steps, this equation holds for each node in the model:",
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                Fi ||
                  (Fi = Object(jt.a)(
                    [
                      "Delta T_{node} = \frac{Delta{t}}{C_{node}}left(sum{\frac{T_{other_node} - T_{node}}{R_{other_node leftrightarrow node}}} - q_{generated/consumed}\right)",
                    ],
                    [
                      "\\Delta T_{node} = \\frac{\\Delta{t}}{C_{node}}\\left(\\sum{\\frac{T_{other\\_node} - T_{node}}{R_{other\\_node \\leftrightarrow node}}} - q_{generated/consumed}\\right)",
                    ]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Ri || (Ri = Object(jt.a)(["Delta{T}_{node}"], ["\\Delta{T}_{node}"]))),
                    }),
                    " ",
                    "is the change in temperature of the node of interest at that time step, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Ei || (Ei = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Li || (Li = Object(jt.a)(["Delta{t}"], ["\\Delta{t}"]))),
                    }),
                    " is the time step, in seconds",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(_i || (_i = Object(jt.a)(["[s]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Vi || (Vi = Object(jt.a)(["C_{node}"]))) }),
                    " is",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Heat_capacity",
                      target: "_blank",
                      children: "Thermal Capacitance",
                    }),
                    " ",
                    ", or Heat Capacity, of the node of interest, in Joules per degree Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Ji || (Ji = Object(jt.a)(["[\frac{J}{K}]"], ["[\\frac{J}{K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Bi || (Bi = Object(jt.a)(["T_{other_node}"], ["T_{other\\_node}"]))),
                    }),
                    " is the current temperature of a node that is thermally connected with the node of interest, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Hi || (Hi = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(qi || (qi = Object(jt.a)(["T_{node}"]))) }),
                    " is the current temperature the node of interest, in degrees",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Ui || (Ui = Object(jt.a)(["[K]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(
                        Xi ||
                          (Xi = Object(jt.a)(
                            ["R_{other_node leftrightarrow node}"],
                            ["R_{other\\_node \\leftrightarrow node}"]
                          ))
                      ),
                    }),
                    " ",
                    "is the",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_resistance",
                      target: "_blank",
                      children: "Thermal Resistance",
                    }),
                    " ",
                    "between the two thermally connected nodes, in degrees Kelvin per Watt",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Qi || (Qi = Object(jt.a)(["[\frac{K}{W}]"], ["[\\frac{K}{W}]"]))),
                    }),
                    " if conduction or convection, or in degrees Kelvin to the fourth per Watt",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Gi || (Gi = Object(jt.a)(["[\frac{K^4}{W}]"], ["[\\frac{K^4}{W}]"]))),
                    }),
                    " if radiation",
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(Yi || (Yi = Object(jt.a)(["q_{generated/consumed}"]))),
                    }),
                    " ",
                    "is the net heat generated or consumed by the node of interest, in Watts ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(Zi || (Zi = Object(jt.a)(["[W]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(it, {
              children:
                "Under the hood, thermalmodel.com solves the above equation for each node at each timestep, resulting in a set of temperature values for each node at each timestep over the duration of the model.",
            }),
            Object(P.jsx)(it, {
              children:
                "Fixed temperature, i.e. boundary condition nodes do not change temperature over time. They influence nodes that are thermally connected to them, but their calculated temperature difference at each time step is discarded rather than added to their previous temperature.",
            }),
            Object(P.jsxs)(it, {
              children: [
                "The source code for the model can be seen",
                " ",
                Object(P.jsx)(at, {
                  href: "https://github.com/robinovitch61/thermalmodel.com/tree/main/packages/hotstuff-network",
                  target: "_blank",
                  children: "here as a standalone Javascript package on npm",
                }),
                ".",
              ],
            }),
          ],
        });
      }
      function ga() {
        return Object(P.jsxs)(ot, {
          children: [
            Object(P.jsx)(ct, { children: "How to Use This Website" }),
            Object(P.jsx)(st, { children: "Controls" }),
            Object(P.jsxs)(it, {
              children: [
                "A tutorial GIF can be found",
                " ",
                Object(P.jsx)(at, {
                  href: "https://user-images.githubusercontent.com/8892054/156910428-92e18984-461b-4f7b-ab5f-ce09b0c5c0c7.gif",
                  target: "_blank",
                  children: "here",
                }),
                ".",
              ],
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsx)("li", { children: "Click a node to select it" }),
                Object(P.jsx)("li", { children: "Click and drag a node to move it" }),
                Object(P.jsx)("li", { children: "Double click a node to move the label position" }),
                Object(P.jsx)("li", { children: "Delete to remove selected nodes" }),
                Object(P.jsx)("li", { children: "Meta + Click and drag to select multiple nodes" }),
                Object(P.jsx)("li", { children: "Meta + A to select all nodes" }),
                Object(P.jsx)("li", { children: "Escape to deselect all nodes" }),
                Object(P.jsx)("li", { children: "Meta + C to copy selected nodes" }),
                Object(P.jsx)("li", { children: "Meta + V to paste copied nodes" }),
                Object(P.jsx)("li", { children: "Meta + > to run model" }),
                Object(P.jsx)("li", { children: "Double click to add a new node" }),
                Object(P.jsx)("li", {
                  children: "Hold Alt and click, drag, and release between nodes to connect them",
                }),
                Object(P.jsx)("li", {
                  children: "Edit or add node and connection properties in the tables on the right",
                }),
                Object(P.jsx)("li", { children: "Click Run Model to view results in graphs on bottom left" }),
                Object(P.jsx)("li", { children: "Connection thicknesses represent relative thermal resistance" }),
                Object(P.jsx)("li", { children: "Node colors represent relative initial temperatures" }),
              ],
            }),
            Object(P.jsx)(st, { children: "Thermal Resistance Calculation" }),
            Object(P.jsx)(it, {
              children:
                "Nodes can be thermally connected through Conduction, Convection, or Radiation, and potentially have more than one thermal connection type at once, e.g. a conductive connection and a radiative connection. The user should calculate thermal resistance differently depending on the type of connection, as follows:",
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                $i ||
                  ($i = Object(jt.a)(
                    ["R_{conduction} = \frac{L}{kA} quad \text{units:} Big{[}\frac{K}{W}Big{]}"],
                    ["R_{conduction} = \\frac{L}{kA} \\quad \\text{units:} \\Big{[}\\frac{K}{W}\\Big{]}"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ea || (ea = Object(jt.a)(["L"]))) }),
                    " is the conduction length, in meters",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ta || (ta = Object(jt.a)(["[m]"]))) }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(na || (na = Object(jt.a)(["k"]))) }),
                    " is the",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Thermal_conductivity",
                      target: "_blank",
                      children: "Thermal Conductivity",
                    }),
                    ", in Watts per meter per degrees Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(ia || (ia = Object(jt.a)(["[\frac{W}{mK}]"], ["[\\frac{W}{mK}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(aa || (aa = Object(jt.a)(["A"]))) }),
                    " is the conduction area, in meters squared",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ra || (ra = Object(jt.a)(["[m^2]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                oa ||
                  (oa = Object(jt.a)(
                    ["R_{convection} = \frac{1}{hA} quad \text{units:} Big{[}\frac{K}{W}Big{]}"],
                    ["R_{convection} = \\frac{1}{hA} \\quad \\text{units:} \\Big{[}\\frac{K}{W}\\Big{]}"]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ca || (ca = Object(jt.a)(["h"]))) }),
                    " is the",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Heat_transfer_coefficient",
                      target: "_blank",
                      children: "Convective Heat Transfer Coefficient",
                    }),
                    ", in Watts per meters squared per degrees Kelvin",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(sa || (sa = Object(jt.a)(["[\frac{W}{m^2K}]"], ["[\\frac{W}{m^2K}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(da || (da = Object(jt.a)(["A"]))) }),
                    " is the convection area, in meters squared",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(la || (la = Object(jt.a)(["[m^2]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(xa.a, {
              display: !0,
              tex: String.raw(
                ua ||
                  (ua = Object(jt.a)(
                    ["R_{radiation} = \frac{1}{epsilon sigma A} quad \text{units:} Big{[}\frac{K^4}{W}Big{]}"],
                    [
                      "R_{radiation} = \\frac{1}{\\epsilon \\sigma A} \\quad \\text{units:} \\Big{[}\\frac{K^4}{W}\\Big{]}",
                    ]
                  ))
              ),
            }),
            Object(P.jsxs)("ul", {
              children: [
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(fa || (fa = Object(jt.a)(["epsilon"], ["\\epsilon"]))),
                    }),
                    " is the",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Emissivity",
                      target: "_blank",
                      children: "Emissivity",
                    }),
                    ", a unit-less quantity",
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(ba || (ba = Object(jt.a)(["sigma"], ["\\sigma"]))),
                    }),
                    " is the",
                    " ",
                    Object(P.jsx)(at, {
                      href: "https://en.wikipedia.org/wiki/Stefan%E2%80%93Boltzmann_constant",
                      target: "_blank",
                      children: "Stefan-Boltzmann constant",
                    }),
                    ",",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(
                        ha || (ha = Object(jt.a)(["5.67 cdot 10^{\u22128}"], ["5.67 \\cdot 10^{\u22128}"]))
                      ),
                    }),
                    " ",
                    "Watts per meters squared per degrees Kelvin to the fourth",
                    " ",
                    Object(P.jsx)(xa.a, {
                      display: !1,
                      tex: String.raw(ja || (ja = Object(jt.a)(["[\frac{W}{m^2K^4}]"], ["[\\frac{W}{m^2K^4}]"]))),
                    }),
                  ],
                }),
                Object(P.jsxs)(rt, {
                  children: [
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(pa || (pa = Object(jt.a)(["A"]))) }),
                    " is the radiation area, in meters squared",
                    " ",
                    Object(P.jsx)(xa.a, { display: !1, tex: String.raw(ma || (ma = Object(jt.a)(["[m^2]"]))) }),
                  ],
                }),
              ],
            }),
            Object(P.jsx)(it, {
              children:
                "In building your model, you're responsible for determining thermal resistances between nodes, thermal capacitances of nodes, and power generation or consumption in each node in your model. From there, thermalmodel.com will do the rest.",
            }),
          ],
        });
      }
      var va = n.p + "thermal/static/media/jerry.83d18dba.jpg",
        ya = l.b.img.withConfig({ displayName: "AboutModal__StyledImg", componentId: "sc-6tkyvq-0" })([
          "display:block;max-width:100px;",
        ]);
      function wa() {
        return Object(P.jsxs)(ot, {
          children: [
            Object(P.jsx)(ct, { children: "About" }),
            Object(P.jsxs)(it, {
              children: [
                "I'm Leo, former Mechanical Engineer who now makes software. You can find my other stuff on the internet",
                " ",
                Object(P.jsx)(at, { target: "_blank", href: "https://theleo.zone", children: "on my website" }),
                ".",
              ],
            }),
            Object(P.jsxs)(it, {
              children: [
                "Improving thermalmodel.com is important to me. If you have any problems or requests, open a",
                " ",
                Object(P.jsx)(at, {
                  target: "_blank",
                  href: "https://github.com/robinovitch61/hotstuff/issues/new",
                  children: "GitHub issue here",
                }),
                ".",
              ],
            }),
            Object(P.jsxs)(it, {
              children: [
                "If you appreciate this work, you can help me out by giving the",
                " ",
                Object(P.jsx)(at, {
                  target: "_blank",
                  href: "https://github.com/robinovitch61/hotstuff",
                  children: "source code a Star on GitHub",
                }),
                " ",
                "so more people can discover it.",
              ],
            }),
            Object(P.jsxs)(it, {
              children: [
                Object(P.jsx)(at, {
                  target: "_blank",
                  href: "https://ko-fi.com/robinovitch61",
                  children: "You can also donate here",
                }),
                ".",
              ],
            }),
            Object(P.jsxs)(it, {
              children: ["Here is Jerry ", Object(P.jsx)(ya, { src: va, alt: "picture of Jerry the cat" })],
            }),
          ],
        });
      }
      var Sa = l.b.div.withConfig({ displayName: "Modal__StyledModal", componentId: "sc-1kbl9yb-0" })(
        [
          "font-size:1.1em;line-height:1.4em;position:absolute;width:80vw;height:90vh;max-width:1400px;left:0;right:0;top:0;bottom:0;margin:auto;border:",
          "px solid black;z-index:10;background:white;display:",
          ";justify-content:center;align-items:center;",
        ],
        d.borderWidthPx,
        function (e) {
          return e.visible ? "flex" : "none";
        }
      );
      function Ca(e) {
        var t = e.modalState,
          n = e.setModalState,
          a = Object(i.useRef)(null);
        F(a, function () {
          return n(function (e) {
            return Object(z.a)(Object(z.a)({}, e), {}, { visible: !1 });
          });
        }),
          Object(i.useEffect)(
            function () {
              var e = function (e) {
                27 === e.keyCode &&
                  (e.preventDefault(),
                  n(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { visible: !1 });
                  }));
              };
              return (
                document.addEventListener("keydown", e),
                function () {
                  return document.removeEventListener("keydown", e);
                }
              );
            },
            [n]
          );
        var r = (function (e, t) {
          var n = e.type;
          return "confirm" === n
            ? Object(P.jsx)(_n, { modalState: e, setModalState: t })
            : "theory" === n
            ? Object(P.jsx)(Oa, {})
            : "tutorial" === n
            ? Object(P.jsx)(ga, {})
            : Object(P.jsx)(wa, {});
        })(t, n);
        return Object(P.jsxs)(Sa, {
          ref: a,
          visible: t.visible,
          children: [
            Object(P.jsx)(dt, {
              onClick: function () {
                return n(function (e) {
                  return Object(z.a)(Object(z.a)({}, e), {}, { visible: !1 });
                });
              },
              children: Object(P.jsx)(se, {}),
            }),
            r,
          ],
        });
      }
      var ka = l.b.div.withConfig({ displayName: "HeaderControls__StyledHeaderControls", componentId: "sc-1bcr170-0" })(
          ["display:flex;flex-wrap:nowrap;align-items:center;margin-left:1.5em;"]
        ),
        Na = Object(l.b)(x).withConfig({
          displayName: "HeaderControls__StyledHeaderControlButton",
          componentId: "sc-1bcr170-1",
        })(["margin-right:1em;"]);
      function Ta(e) {
        var t = e.setModalState,
          n = e.setAppState,
          i = e.setOutput;
        return Object(P.jsxs)(ka, {
          children: [
            Object(P.jsx)(Na, {
              onClick: function () {
                return t({ visible: !0, type: "theory" });
              },
              children: "Theory",
            }),
            Object(P.jsx)(Na, {
              onClick: function () {
                return t({ visible: !0, type: "tutorial" });
              },
              children: "Tutorial",
            }),
            Object(P.jsx)(Na, {
              onClick: function () {
                return t({ visible: !0, type: "about" });
              },
              children: "About",
            }),
            Object(P.jsx)(Na, {
              primary: !0,
              onClick: function () {
                return t(function (e) {
                  return Object(z.a)(
                    Object(z.a)({}, e),
                    {},
                    {
                      visible: !0,
                      type: "confirm",
                      onConfirm: function () {
                        n(Pn), i(void 0);
                      },
                      confirmText: [
                        "This will reset the entire model, discarding all your current nodes, connections, parameters and results.",
                        "Overwrite everything with an example model?",
                      ],
                    }
                  );
                });
              },
              children: "Show Me an Example",
            }),
          ],
        });
      }
      var Aa = n.p + "thermal/static/media/thermalmodel-logo.00e2dcb9.png",
        Da = l.b.img.withConfig({ displayName: "Logo__StyledImg", componentId: "sc-10kt0ct-0" })(
          ["height:", "px;padding:3px;"],
          d.headerHeightPx
        );
      function Wa() {
        return Object(P.jsx)(Da, { src: Aa });
      }
      var Ia = l.b.div.withConfig({ displayName: "style__StyledHeader", componentId: "sc-61wvn9-0" })(
        ["height:", "px;display:flex;justify-content:space-between;align-items:center;background:", ";"],
        function (e) {
          return e.height;
        },
        d.lightGrey
      );
      function Pa() {
        var e = (function (e, t) {
            var n = i.useState(function () {
                var n = window.localStorage.getItem(t);
                return null === n || void 0 === n ? e : JSON.parse(n);
              }),
              a = Object(o.a)(n, 2),
              r = a[0],
              c = a[1];
            return (
              i.useEffect(
                function () {
                  window.localStorage.setItem(t, JSON.stringify(r));
                },
                [t, r]
              ),
              [r, c]
            );
          })(Pn, "thermalModelAppState"),
          t = Object(o.a)(e, 2),
          n = t[0],
          a = t[1],
          r = Object(i.useState)(void 0),
          s = Object(o.a)(r, 2),
          l = s[0],
          f = s[1],
          m = Object(i.useState)(In),
          x = Object(o.a)(m, 2),
          O = x[0],
          g = x[1],
          v = nt(),
          y = Object(o.a)(v, 3),
          w = y[0],
          S = y[1],
          C = y[2],
          k = (function (e, t) {
            return [
              Object(i.useCallback)(
                function (t) {
                  e(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { nodes: t });
                  });
                },
                [e]
              ),
              Object(i.useCallback)(
                function (t) {
                  e(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { connections: t });
                  });
                },
                [e]
              ),
              Object(i.useCallback)(
                function (t) {
                  e(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { canvasViewState: t });
                  });
                },
                [e]
              ),
              Object(i.useCallback)(
                function (t) {
                  e(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { savedCanvasState: t });
                  });
                },
                [e]
              ),
              Object(i.useCallback)(
                function (n) {
                  e(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { timing: n });
                  }),
                    t(void 0);
                },
                [e, t]
              ),
            ];
          })(a, f),
          N = Object(o.a)(k, 5),
          T = N[0],
          A = N[1],
          D = N[2],
          W = N[3],
          I = N[4],
          M = (function (e, t, n, a, r) {
            var o = Object(i.useCallback)(
                function (n) {
                  var i = e.map(function (e) {
                    return Object(z.a)(Object(z.a)({}, e), {}, { isActive: !1 });
                  });
                  i.push(Object(z.a)(Object(z.a)({}, n), {}, { isActive: !0 })), t(i), r(void 0);
                },
                [e, t, r]
              ),
              c = Object(i.useCallback)(
                function (e) {
                  a([].concat(Object(Ce.a)(n), [e])), r(void 0);
                },
                [n, a, r]
              ),
              s = Object(i.useCallback)(
                function (i) {
                  var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    o = e.map(function (e) {
                      return (
                        i.find(function (t) {
                          return t.id === e.id;
                        }) || (r ? Object(z.a)(Object(z.a)({}, e), {}, { isActive: !1 }) : e)
                      );
                    });
                  t(o);
                  var c = n.map(function (e) {
                    var t = i.find(function (t) {
                      return e.firstNode.id == t.id;
                    });
                    if (t) return Object(z.a)(Object(z.a)({}, e), {}, { firstNode: t, firstNodeId: t.id });
                    var n = i.find(function (t) {
                      return e.secondNode.id == t.id;
                    });
                    return n ? Object(z.a)(Object(z.a)({}, e), {}, { secondNode: n, secondNodeId: n.id }) : e;
                  });
                  a(c);
                },
                [n, e, a, t]
              );
            return [
              o,
              c,
              s,
              Object(i.useCallback)(
                function (i) {
                  var o = n.filter(function (e) {
                    return !i.includes(e.firstNode.id) && !i.includes(e.secondNode.id);
                  });
                  a(o), r(void 0);
                  var c = e.filter(function (e) {
                    return !i.includes(e.id);
                  });
                  t(c);
                },
                [n, e, a, t, r]
              ),
              Object(i.useCallback)(
                function (e) {
                  var t = e.map(function (e) {
                      var t = e.firstNode.name < e.secondNode.name;
                      return Object(z.a)(
                        Object(z.a)({}, e),
                        {},
                        {
                          firstNode: t ? e.firstNode : e.secondNode,
                          firstNodeId: t ? e.firstNode.id : e.secondNode.id,
                          secondNode: t ? e.secondNode : e.firstNode,
                          secondNodeId: t ? e.secondNode.id : e.firstNode.id,
                        }
                      );
                    }),
                    i = t.map(function (e) {
                      return e.id;
                    }),
                    o = n.filter(function (e) {
                      return !i.includes(e.id);
                    });
                  a([].concat(Object(Ce.a)(t), Object(Ce.a)(o))), r(void 0);
                },
                [n, a, r]
              ),
              Object(i.useCallback)(
                function (e) {
                  a(
                    n.filter(function (t) {
                      return !e.includes(t.id);
                    })
                  ),
                    r(void 0);
                },
                [n, a, r]
              ),
              Object(i.useCallback)(
                function (n) {
                  t(
                    e.map(function (e) {
                      return Object(z.a)(Object(z.a)({}, e), {}, { isActive: n.includes(e.id) });
                    })
                  );
                },
                [e, t]
              ),
              Object(i.useCallback)(
                function () {
                  void 0 !==
                    e.find(function (e) {
                      return e.isActive;
                    }) &&
                    t(
                      e.map(function (e) {
                        return Object(z.a)(Object(z.a)({}, e), {}, { isActive: !1 });
                      })
                    );
                },
                [e, t]
              ),
            ];
          })(n.nodes, T, n.connections, A, f),
          K = Object(o.a)(M, 8),
          F = K[0],
          R = K[1],
          E = K[2],
          L = K[3],
          _ = K[4],
          V = K[5],
          J = K[6],
          B = K[7],
          H = function () {
            var e,
              t = Object(c.run)({
                nodes: n.nodes,
                connections: n.connections,
                timeStepS: n.timing.timeStepS,
                totalTimeS: n.timing.totalTimeS,
              });
            return (
              (null === (e = t.errors) || void 0 === e ? void 0 : e.length) &&
                C(
                  t.errors.map(function (e) {
                    return e.message;
                  })
                ),
              f(t),
              t
            );
          },
          q = Object(i.useState)(!0),
          U = Object(o.a)(q, 2),
          X = U[0],
          Q = U[1],
          G = Object(i.useState)(Mn),
          Y = Object(o.a)(G, 2),
          Z = Y[0],
          $ = Y[1];
        !(function (e, t, n, a, r, o, s, l, u) {
          Object(i.useEffect)(
            function () {
              var i = function (i) {
                if ((i.metaKey && 190 === i.keyCode && (i.preventDefault(), u()), e)) {
                  if (
                    (i.metaKey &&
                      65 === i.keyCode &&
                      (i.preventDefault(),
                      n(
                        t.map(function (e) {
                          return Object(z.a)(Object(z.a)({}, e), {}, { isActive: !0 });
                        })
                      )),
                    ("Backspace" !== i.key && "Delete" !== i.key) ||
                      (i.preventDefault(),
                      a(
                        t
                          .filter(function (e) {
                            return e.isActive;
                          })
                          .map(function (e) {
                            return e.id;
                          })
                      )),
                    27 === i.keyCode &&
                      (i.preventDefault(),
                      n(
                        t.map(function (e) {
                          return Object(z.a)(Object(z.a)({}, e), {}, { isActive: !1 });
                        })
                      )),
                    i.metaKey && 67 === i.keyCode)
                  ) {
                    i.preventDefault();
                    for (
                      var f = t.filter(function (e) {
                          return e.isActive;
                        }),
                        b = f.map(function (e) {
                          return Object(z.a)(
                            Object(z.a)(Object(z.a)({}, e), Object(c.makeNode)(e)),
                            {},
                            {
                              center: { x: e.center.x + d.pasteXOffset, y: e.center.y },
                              name: pe(
                                t.map(function (e) {
                                  return e.name;
                                }),
                                e.name
                              ),
                            }
                          );
                        }),
                        h = new Map(),
                        j = 0;
                      j < f.length;
                      j++
                    )
                      h.set(f[j].id, b[j]);
                    var p = [];
                    r.forEach(function (e) {
                      var t = h.get(e.firstNode.id),
                        n = h.get(e.secondNode.id);
                      if (t && n) {
                        var i = Object(z.a)(
                          Object(z.a)({}, e),
                          Object(c.makeConnection)(Object(z.a)(Object(z.a)({}, e), {}, { firstNode: t, secondNode: n }))
                        );
                        p.push(i);
                      }
                    }),
                      l({ copiedNodes: b, copiedConnections: p });
                  }
                  i.metaKey &&
                    86 === i.keyCode &&
                    (i.preventDefault(),
                    n(
                      [].concat(
                        Object(Ce.a)(
                          t.map(function (e) {
                            return Object(z.a)(Object(z.a)({}, e), {}, { isActive: !1 });
                          })
                        ),
                        Object(Ce.a)(s.copiedNodes)
                      )
                    ),
                    o([].concat(Object(Ce.a)(r), Object(Ce.a)(s.copiedConnections))));
                }
              };
              return (
                document.addEventListener("keydown", i),
                function () {
                  return document.removeEventListener("keydown", i);
                }
              );
            },
            [r, t, s, a, e, u, o, n, l]
          );
        })(X, n.nodes, T, L, n.connections, A, Z, $, H);
        var ee = mn(n.nodes, n.connections),
          te = Object(o.a)(ee, 2),
          ne = te[0],
          ie = te[1],
          ae = (function (e, t, n) {
            return Object(i.useCallback)(
              function (i, a) {
                if (
                  (i.preventDefault(),
                  !d.multiSelectKeys.some(function (e) {
                    return i[e];
                  }))
                ) {
                  var r,
                    o = en(i, a),
                    c = e.find(function (t) {
                      var n = tn(
                        t.capacitanceJPerDegK,
                        e.map(function (e) {
                          return e.capacitanceJPerDegK;
                        })
                      );
                      return Zt(o, t.center, n);
                    });
                  if (c)
                    n([
                      Object(z.a)(
                        Object(z.a)({}, c),
                        {},
                        {
                          textDirection:
                            ((r = c.textDirection), "D" === r ? "R" : "R" === r ? "U" : "U" === r ? "L" : "D"),
                        }
                      ),
                    ]);
                  else {
                    var s = me(e, o);
                    t(s);
                  }
                }
              },
              [t, e, n]
            );
          })(n.nodes, F, E),
          re = vn(n.nodes, n.connections, R, E, J, B, ie),
          oe = (function () {
            var e = Object(i.useState)([0, 0]),
              t = Object(o.a)(e, 2),
              n = t[0],
              a = t[1],
              r = Object(i.useState)(1),
              c = Object(o.a)(r, 2),
              s = c[0],
              d = c[1];
            return (
              Object(i.useLayoutEffect)(function () {
                function e() {
                  a([window.innerWidth, window.innerHeight]);
                }
                function t() {
                  var e = window.devicePixelRatio;
                  d(void 0 === e ? 1 : e);
                }
                return (
                  window.addEventListener("resize", e),
                  window.addEventListener("resize", t),
                  e(),
                  t(),
                  function () {
                    window.removeEventListener("resize", e), window.removeEventListener("resize", t);
                  }
                );
              }, []),
              [n, s]
            );
          })(),
          ce = Object(o.a)(oe, 2),
          se = ce[0],
          de = ce[1],
          ue = Object(o.a)(se, 2),
          fe = ue[0],
          be = ue[1],
          he = (function (e, t, n) {
            var a = Object(i.useCallback)(
                function (e) {
                  var t = n * d.minPanelFraction,
                    i = n * (1 - d.minPanelFraction);
                  return e < t ? t : e > i ? i : e;
                },
                [n]
              ),
              r = Object(i.useCallback)(
                function (e) {
                  var n = t * d.minPanelFraction,
                    i = t * (1 - d.minPanelFraction);
                  return e < n ? n : e > i ? i : e;
                },
                [t]
              );
            return [
              Object(i.useRef)(null),
              Kn({
                onDragY: Object(i.useCallback)(
                  function (n) {
                    e(function (e) {
                      return Object(z.a)(
                        Object(z.a)({}, e),
                        {},
                        {
                          panelSizes: Object(z.a)(
                            Object(z.a)({}, e.panelSizes),
                            {},
                            { canvasHeightFraction: zn(e.panelSizes.canvasHeightFraction + n / t) }
                          ),
                        }
                      );
                    });
                  },
                  [e, t]
                ),
                constrainY: r,
              }),
              Object(i.useRef)(null),
              Kn({
                onDragX: Object(i.useCallback)(
                  function (t) {
                    e(function (e) {
                      return Object(z.a)(
                        Object(z.a)({}, e),
                        {},
                        {
                          panelSizes: Object(z.a)(
                            Object(z.a)({}, e.panelSizes),
                            {},
                            { editorWidthFraction: zn(e.panelSizes.editorWidthFraction - t / n) }
                          ),
                        }
                      );
                    });
                  },
                  [e, n]
                ),
                constrainX: a,
              }),
              Object(i.useRef)(null),
              Kn({
                onDragY: Object(i.useCallback)(
                  function (n) {
                    e(function (e) {
                      return Object(z.a)(
                        Object(z.a)({}, e),
                        {},
                        {
                          panelSizes: Object(z.a)(
                            Object(z.a)({}, e.panelSizes),
                            {},
                            { tableHeightFraction: zn(e.panelSizes.tableHeightFraction + n / t) }
                          ),
                        }
                      );
                    });
                  },
                  [e, t]
                ),
                constrainY: r,
              }),
            ];
          })(a, be, fe),
          xe = Object(o.a)(he, 6),
          Oe = xe[0],
          ge = xe[1],
          ve = xe[2],
          ye = xe[3],
          we = xe[4],
          Se = xe[5],
          ke = fe,
          Ne = be,
          Te = d.headerHeightPx,
          Ae = be * n.panelSizes.canvasHeightFraction - Te,
          De = fe * (1 - n.panelSizes.editorWidthFraction),
          We = (1 - n.panelSizes.canvasHeightFraction) * be - d.tabHeightPx - d.plotHeightBufferPx,
          Ie = De,
          Pe = n.panelSizes.editorWidthFraction * fe,
          Me = Object(i.useMemo)(
            function () {
              return Object(P.jsx)(Ft, {
                plotDimensions: { height: We, width: Ie, margin: d.plotMargin },
                modelOutput: l,
              });
            },
            [l, We, Ie]
          ),
          Ke = Object(i.useCallback)(
            function () {
              F(
                me(
                  n.nodes,
                  (function (e, t, n, i) {
                    var a = n;
                    return Et(Lt({ x: e, y: t }, 2 * i), a);
                  })(De, Ae, n.canvasViewState.offset, n.canvasViewState.scale)
                )
              );
            },
            [F, n.canvasViewState.offset, n.canvasViewState.scale, n.nodes, Ae, De]
          ),
          ze = Object(i.useCallback)(
            function () {
              var e = (function (e, t) {
                var n,
                  i = Object(le.a)(e);
                try {
                  for (i.s(); !(n = i.n()).done; ) {
                    var a,
                      r = n.value,
                      o = Object(le.a)(e);
                    try {
                      for (o.s(); !(a = o.n()).done; ) {
                        var c = a.value;
                        if (r.id !== c.id) {
                          var s = je(r, c, t);
                          if (s) return s;
                        }
                      }
                    } catch (d) {
                      o.e(d);
                    } finally {
                      o.f();
                    }
                  }
                } catch (d) {
                  i.e(d);
                } finally {
                  i.f();
                }
              })(n.nodes, n.connections);
              void 0 !== e && R(e);
            },
            [R, n.connections, n.nodes]
          );
        return Object(P.jsxs)("div", {
          children: [
            Object(P.jsx)(Ca, { modalState: O, setModalState: g }),
            Object(P.jsx)(ut, { errors: w, setErrors: S }),
            Object(P.jsxs)(u, {
              height: be,
              modalOpen: O.visible,
              children: [
                Object(P.jsx)(b, {
                  ref: Oe,
                  onMouseDown: ge,
                  y: n.panelSizes.canvasHeightFraction,
                  width: 1 - n.panelSizes.editorWidthFraction,
                  left: 0,
                }),
                Object(P.jsx)(h, { ref: ve, onMouseDown: ye, x: 1 - n.panelSizes.editorWidthFraction }),
                Object(P.jsx)(b, {
                  ref: we,
                  onMouseDown: Se,
                  y: n.panelSizes.tableHeightFraction,
                  width: n.panelSizes.editorWidthFraction,
                  left: 1 - n.panelSizes.editorWidthFraction,
                }),
                Object(P.jsxs)(j, {
                  height: Ne,
                  width: (1 - n.panelSizes.editorWidthFraction) * ke,
                  children: [
                    Object(P.jsxs)(Ia, {
                      height: Te,
                      children: [
                        Object(P.jsx)(Wa, {}),
                        Object(P.jsx)(Ta, { setModalState: g, setAppState: a, setOutput: f }),
                      ],
                    }),
                    Object(P.jsx)(p, {
                      height: Ae,
                      children: Object(P.jsx)(pn, {
                        canvasWidth: De,
                        canvasHeight: Ae,
                        devicePixelRatio: de,
                        draw: ne,
                        onMouseDown: re,
                        handleDoubleClick: ae,
                        canvasViewState: n.canvasViewState,
                        setCanvasViewState: D,
                        savedCanvasViewState: n.savedCanvasState,
                        setSavedCanvasViewState: W,
                        setKeyboardActive: Q,
                      }),
                    }),
                    Me,
                  ],
                }),
                Object(P.jsx)(ft, {
                  appState: n,
                  setAppState: a,
                  setOutput: f,
                  height: be,
                  width: Pe,
                  setTiming: I,
                  onAddNode: Ke,
                  onAddConnection: ze,
                  updateNodes: function (e) {
                    E(e), f(void 0);
                  },
                  deleteNodes: L,
                  setActiveNodes: J,
                  updateConnections: function (e) {
                    _(e), f(void 0);
                  },
                  deleteConnections: V,
                  onRunModel: H,
                }),
              ],
            }),
          ],
        });
      }
      var Ma = n(245);
      Object(Ma.a)({ domain: "thermalmodel.com", apiHost: "https://plausible.theleo.zone" }).enableAutoPageviews(),
        window.addEventListener("load", function () {
          (function () {
            var e = document.createElement("div"),
              t = document.createElement("div");
            (e.style.width = "30px"),
              (e.style.height = "30px"),
              (e.style.overflow = "scroll"),
              (e.style.borderWidth = "0"),
              (t.style.width = "30px"),
              (t.style.height = "60px"),
              e.appendChild(t),
              document.body.appendChild(e);
            var n = e.offsetWidth - e.clientWidth;
            return document.body.removeChild(e), n > 0;
          })() || document.body.classList.add("force-show-scrollbars");
        }),
        r.a.render(Object(P.jsx)(i.StrictMode, { children: Object(P.jsx)(Pa, {}) }), document.getElementById("root"));
    },
  },
  [[557, 1, 2]],
]);
//# sourceMappingURL=main.42a7cb5d.chunk.js.map
