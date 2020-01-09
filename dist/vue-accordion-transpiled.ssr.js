'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var BadgerAccordion=_interopDefault(require('badger-accordion'));function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}function unwrap(wrapper) {
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
      default: function _default() {
        return {};
      }
    },
    icons: {
      default: function _default() {
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
  data: function data() {
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
      handler: function handler(states) {
        this.calculateAllPanelsHeight();
        this.$children.forEach(function (child, n) {
          if (_typeof(states[n]) == 'object') {
            child.changeState(states[n].state == 'open');
          }
        });
      },
      deep: true
    }
  },
  created: function created() {
    var _this = this;

    // On child-item rendered initiate badger-accordion
    this.$on('item:ready', function () {
      // Unwrap child-wrapper due issues with badger-accordion
      unwrap(_this.$refs.badger.querySelector('.badger-accordion-item')); // Init badger-accordion if child-component is loaded

      _this.accordion = new BadgerAccordion(_this.$refs.badger, _this.options || {});

      _this.$forceUpdate();
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$watch(function () {
      return _this2.children.length;
    }, function (items) {
      _this2.rerender();
    });
  },
  methods: {
    init: function init() {
      this.accordion.init();
    },
    getState: function getState() {
      var headerIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return this.accordion.getState(headerIds);
    },
    open: function open(headerIndex) {
      this.accordion.open(headerIndex);
    },
    close: function close(headerIndex) {
      this.accordion.close(headerIndex);
    },
    togglePanel: function togglePanel(animationAction, headerIndex) {
      this.accordion.togglePanel(animationAction, headerIndex);
    },
    openAll: function openAll() {
      this.accordion.openAll();
    },
    closeAll: function closeAll() {
      this.accordion.closeAll();
    },
    calculateAllPanelsHeight: function calculateAllPanelsHeight() {
      this.accordion.calculateAllPanelsHeight();
    },
    calculatePanelHeight: function calculatePanelHeight(panel) {
      this.accordion.calculatePanelHeight(panel);
    },
    rerender: function rerender() {
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
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-61ec29a4";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
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
  mounted: function mounted() {
    // If item rendered emit readyness to parent
    this.$parent.$emit('item:ready');
  },
  data: function data() {
    return {
      opened: false
    };
  },
  methods: {
    changeState: function changeState(state) {
      this.opened = state;
    },
    getIcon: function getIcon() {
      return this.icon;
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      if (this.$parent.iconComponent) {
        return this.$parent.iconComponent;
      }

      return this.iconLoaded;
    },
    iconOpened: function iconOpened() {
      return this.$parent.icons ? this.$parent.icons.opened : '';
    },
    iconClosed: function iconClosed() {
      return this.$parent.icons ? this.$parent.icons.closed : '';
    },
    icon: function icon() {
      return this.opened ? this.iconOpened : this.iconClosed;
    },
    iconLoaded: function iconLoaded() {
      return {
        template: '<span>' + this.icon + '</span>'
      };
    }
  },
  watch: {
    opened: function opened(newValue) {
      this.$emit(newValue ? 'open' : 'close');
    }
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "badger-accordion-item"
  }, [_vm._ssrNode("<dt class=\"badger-accordion__header\">", "</dt>", [_vm._ssrNode("<div class=\"js-badger-accordion-header\">", "</div>", [_vm._ssrNode("<button class=\"badger-accordion-toggle\">", "</button>", [_vm._ssrNode("<span class=\"badger-accordion-title\">", "</span>", [_vm._t("header", [_vm._v("Collapse-Title")])], 2), _vm._ssrNode(" "), _vm.icon !== '' && _vm.iconComponent ? _c(_vm.iconComponent, {
    tag: "component",
    staticClass: "badger-toggle-indicator",
    attrs: {
      "opened": _vm.opened
    }
  }) : _vm._e()], 2)])]), _vm._ssrNode(" "), _vm._ssrNode("<dd class=\"badger-accordion__panel js-badger-accordion-panel\">", "</dd>", [_vm._ssrNode("<div class=\"js-badger-accordion-panel-inner\">", "</div>", [_vm._t("content")], 2)])], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-27b0f80a_0", {
    source: ".component-badger-accordion .badger-accordion__panel{max-height:0}.badger-accordion__panel{max-height:75vh;overflow:hidden}.badger-accordion__panel.-ba-is-hidden{max-height:0!important}.badger-accordion--initialized .badger-accordion__panel{transition:max-height ease-in-out .2s}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle{width:100%;background:0 0;border:0;box-shadow:none;display:flex;align-items:center}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle .badger-accordion-title{flex:0 0 90%;cursor:pointer;text-align:left}.badger-accordion__header .js-badger-accordion-header .badger-accordion-toggle .badger-toggle-indicator{flex:0 0 10%;display:flex;align-items:center;justify-content:flex-end;cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-27b0f80a";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,BadgerAccordion: __vue_component__,BadgerAccordionItem: __vue_component__$1});var install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found

/* global window global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()
exports.BadgerAccordion=__vue_component__;exports.BadgerAccordionItem=__vue_component__$1;exports.default=plugin;