window.dom = {
	create(string) {
		const container = document.createElement('template') // template：样板，可包含任何元素。
		container.innerHTML = string.trim() // 加 trim 防止空格。trim 的功能：将字符串两边的空格去掉。
		return container.content.firstChild // 使用 template 时，不能使用 container.children[0]。
	},
	after(node, node2) {
		node.parentNode.insertBefore(node2, node.nextSibling) // insert：插入；sibling：兄弟姐妹
	},
	before(node, node2) {
		node.parentNode.insertBefore(node2, node)
	},
	append(parent, node) {
		parent.appendChild(node)
	},
	wrap(node, parent) {
		dom.before(node, parent) // 新增节点先放 node 前面
		dom.append(parent, node) // 再将 node 设置为子节点
	},
	remove(node) {
		node.parentNode.removeChild(node)
		return node
	},
	empty(node) {
		const array = []
		/*
        const childNodes = node.childNodes
        简写：const {childNodes} = node
		for (let i = 0; i < childNodes.length; i++) {
			dom.remove(childNodes[i])
			array.push(childNodes[i])
		 }
		遍历 node 里面的所有元素，但这种方法 childNodes.length 是动态变化的，每删除一个元素，就减 1。所以，不*能使用该方法。
		*/
		let x = node.firstChild
		while (x) {
			array.push(dom.remove(node.firstChild))
			// 删除并放到数组里面
			x = node.firstChild
		}
		return array
	},
	attr(node, name, value) {
		// 重载
		if (arguments.length === 3) {
			node.setAttribute(name, value)
		} else if (arguments.length == 2) {
			return node.getAttribute(name)
		}
	},
	text(node, string) {
		// 适配
		if (arguments.length === 2) {
			if ('innerText' in node) {
				node.innerText = string // 支持包括 IE 的所有浏览器
			} else {
				node.textContent = string
			}
		} else if (arguments.length === 1) {
			if ('innerText' in node) {
				return node.innerText
			} else {
				return node.textContent
			}
		}
	},
	html(node, string) {
		if (arguments.length === 2) {
			node.innerHTML = string
		} else if (arguments.length === 1) {
			return node.innerHTML
		}
	},
	style(node, name, value) {
		if (arguments.length === 3) {
			node.style[name] = value
		} else if (arguments.length === 2) {
			if (typeof name === 'string') {
				// typeof：返回一个字符串，表示未经计算的操作数的类型，可能为"number"、"boolean"、"string"等。
				return node.style[name]
			} else if (name instanceof Object) {
				// instanceof：检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，结果为"true"或者"false"。

				for (let key in name) {
					node.style[key] = name[key] // 变量要使用 [] 括起来，name[key] 是变量 name 的值。
				}
			}
		}
	},
	class: {
		add(node, className) {
			node.classList.add(className)
		},
		remove(node, className) {
			node.classList.remove(className)
		},
		has(node, className) {
			return node.classList.contains(className)
		},
	},
	on(node, eventName, fn) {
		node.addEventListener(eventName, fn)
	},
	off(node, eventName, fn) {
		node.removeEventListener(eventName, fn)
	},
	find(selector, scope) {
		return (scope || document).querySelectorAll(selector)
	},
	parent(node) {
		return node.parentNode
	},
	children(node) {
		return node.children
	},
	siblings(node) {
		return Array.from(node.parentNode.children).filter((n) => n !== node) // 先找到父节点，且返回值是数组; filter()创建新的类型化数组，含有所有通过了测试的元素，测试由提供的函数实现（过滤）。
	},
	next(node) {
		let x = node.nextSibling
		while (x && x.nodeType === 3) {
			x = x.nextSibling // 判断 x.nodeType 是否为空格，是空格就跳过。
		}
		return x
	},
	previous(node) {
		let x = node.previousSibling
		while (x && x.nodeType === 3) {
			x = x.previousSibling
		}
		return x
	},
	each(nodeList, fn) {
		// 遍历所有元素{
		for (let i = 0; i < nodeList.length; i++) {
			fn.call(null, nodeList[i])
		}
	},
	index(node) {
		const list = dom.children(node.parentNode)
		let i
		for (i = 0; i < list.length; i++) {
			if (list[i] === node) {
				break
			}
		}
		return i
	},
}
