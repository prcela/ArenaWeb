class ViewController {
	constructor(node) {
		this.node = node
		this.title = ""
	}
	show() {
		this.node.style.display = "block"
	}
	hide() {
		this.node.style.display = "none"
	}
}