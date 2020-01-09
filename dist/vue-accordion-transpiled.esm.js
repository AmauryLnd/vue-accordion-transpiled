import BadgerAccordion from 'badger-accordion';

//

function unwrap(wrapper) {
  // place childNodes in document fragment
  var docFrag = document.createDocumentFragment();

  while (wrapper.firstChild) {
    var child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  } // replace wrapper with document fragment


  wrapper.parentNode.replaceChild(docFrag, wrapper);
}

var script = {
  name: 'BadgerAccordion',
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      }
    },
    icons: {
      default: function () {
        return {
          opened: '-',
          closed: '+'
        };
      }
    },
    iconComponent: {
      default: null
    }
  },
  data: function () {
    return {
      accordion: null,
      itemsReady: false,
      show: true,
      rerendering: false,
      children: this.$children
    };
  },
  watch: {
    "accordion.states": {
      handler: function (states) {
        this.calculateAllPanelsHeight();
        this.$children.forEach(function (child, n) {
          if (typeof states[n] == 'object') {
            child.changeState(states[n].state == 'open');
          }
        });
      },
      deep: true
    }
  },
  created: function () {
    var _this = this;

    // On child-item rendered initiate badger-accordion
    this.$on('item:ready', function () {
      // Unwrap child-wrapper due issues with badger-accordion
      unwrap(_this.$refs.badger.querySelector('.badger-accordion-item')); // Init badger-accordion if child-component is loaded

      _this.accordion = new BadgerAccordion(_this.$refs.badger, _this.options || {});

      _this.$forceUpdate();
    });
  },
  mounted: function () {
    var _this2 = this;

    this.$watch(function () {
      return _this2.children.length;
    }, function (items) {
      _this2.rerender();
    });
  },
  methods: {
    init: function () {
      this.accordion.init();
    },
    getState: function (headerIds = []) {
      return this.accordion.getState(headerIds);
    },
    open: function (headerIndex) {
      this.accordion.open(headerIndex);
    },
    close: function (headerIndex) {
      this.accordion.close(headerIndex);
    },
    togglePanel: function (animationAction, headerIndex) {
      this.accordion.togglePanel(animationAction, headerIndex);
    },
    openAll: function () {
      this.accordion.openAll();
    },
    closeAll: function () {
      this.accordion.closeAll();
    },
    calculateAllPanelsHeight: function () {
      this.accordion.calculateAllPanelsHeight();
    },
    calculatePanelHeight: function (panel) {
      this.accordion.calculatePanelHeight(panel);
    },
    rerender: function () {
      var _this3 = this;

      if (!this.rerendering) {
        this.rerendering = true;
        this.show = false;
        this.$nextTick(function () {
          _this3.show = true;

          _this3.$nextTick(function () {
            _this3.rerendering = false;
          });
        });
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.show ? _c('dl', {
    ref: "badger",
    staticClass: "component-badger-accordion"
  }, [_vm._t("default")], 2) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'BadgerAccordionItem',
  mounted: function () {
    // If item rendered emit readyness to parent
    this.$parent.$emit('item:ready');
  },
  data: function () {
    return {
      opened: false
    };
  },
  methods: {
    changeState: function (state) {
      this.opened = state;
    },
    getIcon: function () {
      return this.icon;
    }
  },
  computed: {
    iconComponent: function () {
      if (this.$parent.iconComponent) {
        return this.$parent.iconComponent;
      }

      return this.iconLoaded;
    },
    iconOpened: function () {
      return this.$parent.icons ? this.$parent.icons.opened : '';
    },
    iconClosed: function () {
      return this.$parent.icons ? this.$parent.icons.closed : '';
    },
    icon: function () {
      return this.opened ? this.iconOpened : this.iconClosed;
    },
    iconLoaded: function () {
      return {
        template: '<span>' + this.icon + '</span>'
      };
    }
  },
  watch: {
    opened: function (newValue) {
      this.$emit(newValue ? 'open' : 'close');
    }
  }
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "badger-accordion-item"
  }, [_c('dt', {
    staticClass: "badger-accordion__header"
  }, [_c('div', {
    staticClass: "js-badger-accordion-header"
  }, [_c('button', {
    staticClass: "badger-accordion-toggle"
  }, [_c('span', {
    staticClass: "badger-accordion-title"
  }, [_vm._t("header", [_vm._v("Collapse-Title")])], 2), _vm._v(" "), _vm.icon !== '' && _vm.iconComponent ? _c(_vm.iconComponent, {
    tag: "component",
    staticClass: "badger-toggle-indicator",
    attrs: {
      "opened": _vm.opened
    }
  }) : _vm._e()], 1)])]), _vm._v(" "), _c('dd', {
    staticClass: "badger-accordion__panel js-badger-accordion-panel"
  }, [_c('div', {
    staticClass: "js-badger-accordion-panel-inner"
  }, [_vm._t("content")], 2)])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-27b0f80a_0", {
    source: ".component-badger-accordion .badger-accordion__panel{max-height:0}.badger-accordion__panel{max-height:75vh;overflow:hidden}.badger-accordion__panel.-ba-is-hidden{max-height:0!important}.badger-accordion--initialized .badger-accordion__panel{transition:max-height ease-in-out .2s}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle{width:100%;background:0 0;border:0;box-shadow:none;display:flex;align-items:center}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle .badger-accordion-title{flex:0 0 90%;cursor:pointer;text-align:left}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle .badger-toggle-indicator{flex:0 0 10%;display:flex;align-items:center;justify-content:flex-end;cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BadgerAccordion: __vue_component__,
    BadgerAccordionItem: __vue_component__$1
});

// Import vue components

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function ([componentName, component]) {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install: install
}; // To auto-install when vue is found

/* global window global */

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()

export default plugin;
export { __vue_component__ as BadgerAccordion, __vue_component__$1 as BadgerAccordionItem };
