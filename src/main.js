// document.createElement('div')
const div = dom.create('<div>newDiv</div>') // tr 和 td 需一起使用，td 不能单独使用。
console.log(div)

dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes) // 空格也会被打印出来，作为文本 text。

dom.attr(test, 'title', 'Hi, I am Frank')

const title = dom.attr(test, 'title')
console.log(`title:${title}`)

dom.text(test, '你好，这是新的内容')

dom.html(empty, '<p>文本+标签</p>') // innerText 只能添加文本，innerHTML 能将 HTML 标签一起添加，同时，innerText 是 IE 浏览器标准，innerHTML 是 W3C 标准。
const html = dom.html(empty)
console.log(empty)

dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))

const fn = () => {
	console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find(`#travel`)[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(s2))
