// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {
	create: function create(string) {
		var container = document.createElement('template'); // template：样板，可包含任何元素。
		container.innerHTML = string.trim(); // 加 trim 防止空格。trim 的功能：将字符串两边的空格去掉。
		return container.content.firstChild; // 使用 template 时，不能使用 container.children[0]。
	},
	after: function after(node, node2) {
		node.parentNode.insertBefore(node2, node.nextSibling); // insert：插入；sibling：兄弟姐妹
	},
	before: function before(node, node2) {
		node.parentNode.insertBefore(node2, node);
	},
	append: function append(parent, node) {
		parent.appendChild(node);
	},
	wrap: function wrap(node, parent) {
		dom.before(node, parent); // 新增节点先放 node 前面
		dom.append(parent, node); // 再将 node 设置为子节点
	},
	remove: function remove(node) {
		node.parentNode.removeChild(node);
		return node;
	},
	empty: function empty(node) {
		var array = [];
		/*
        const childNodes = node.childNodes
        简写：const {childNodes} = node
  for (let i = 0; i < childNodes.length; i++) {
  	dom.remove(childNodes[i])
  	array.push(childNodes[i])
   }
  遍历 node 里面的所有元素，但这种方法 childNodes.length 是动态变化的，每删除一个元素，就减 1。所以，不*能使用该方法。
  */
		var x = node.firstChild;
		while (x) {
			array.push(dom.remove(node.firstChild));
			// 删除并放到数组里面
			x = node.firstChild;
		}
		return array;
	},
	attr: function attr(node, name, value) {
		// 重载
		if (arguments.length === 3) {
			node.setAttribute(name, value);
		} else if (arguments.length == 2) {
			return node.getAttribute(name);
		}
	},
	text: function text(node, string) {
		// 适配
		if (arguments.length === 2) {
			if ('innerText' in node) {
				node.innerText = string; // 支持包括 IE 的所有浏览器
			} else {
				node.textContent = string;
			}
		} else if (arguments.length === 1) {
			if ('innerText' in node) {
				return node.innerText;
			} else {
				return node.textContent;
			}
		}
	},
	html: function html(node, string) {
		if (arguments.length === 2) {
			node.innerHTML = string;
		} else if (arguments.length === 1) {
			return node.innerHTML;
		}
	},
	style: function style(node, name, value) {
		if (arguments.length === 3) {
			node.style[name] = value;
		} else if (arguments.length === 2) {
			if (typeof name === 'string') {
				// typeof：返回一个字符串，表示未经计算的操作数的类型，可能为"number"、"boolean"、"string"等。
				return node.style[name];
			} else if (name instanceof Object) {
				// instanceof：检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，结果为"true"或者"false"。

				for (var key in name) {
					node.style[key] = name[key]; // 变量要使用 [] 括起来，name[key] 是变量 name 的值。
				}
			}
		}
	},

	class: {
		add: function add(node, className) {
			node.classList.add(className);
		},
		remove: function remove(node, className) {
			node.classList.remove(className);
		},
		has: function has(node, className) {
			return node.classList.contains(className);
		}
	},
	on: function on(node, eventName, fn) {
		node.addEventListener(eventName, fn);
	},
	off: function off(node, eventName, fn) {
		node.removeEventListener(eventName, fn);
	},
	find: function find(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	},
	parent: function parent(node) {
		return node.parentNode;
	},
	children: function children(node) {
		return node.children;
	},
	siblings: function siblings(node) {
		return Array.from(node.parentNode.children).filter(function (n) {
			return n !== node;
		}); // 先找到父节点，且返回值是数组; filter()创建新的类型化数组，含有所有通过了测试的元素，测试由提供的函数实现（过滤）。
	},
	next: function next(node) {
		var x = node.nextSibling;
		while (x && x.nodeType === 3) {
			x = x.nextSibling; // 判断 x.nodeType 是否为空格，是空格就跳过。
		}
		return x;
	},
	previous: function previous(node) {
		var x = node.previousSibling;
		while (x && x.nodeType === 3) {
			x = x.previousSibling;
		}
		return x;
	},
	each: function each(nodeList, fn) {
		// 遍历所有元素{
		for (var i = 0; i < nodeList.length; i++) {
			fn.call(null, nodeList[i]);
		}
	},
	index: function index(node) {
		var list = dom.children(node.parentNode);
		var i = void 0;
		for (i = 0; i < list.length; i++) {
			if (list[i] === node) {
				break;
			}
		}
		return i;
	}
};
},{}],"..\\..\\..\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55481' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\..\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.3efd442d.map