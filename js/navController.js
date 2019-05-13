class NavigationController {
	constructor(node,rootVC) {
		this.node = node
		this.node.className = "NavigationController"
		this.header = document.createElement("div")
		this.header.className = "Header"
		this.node.appendChild(this.header)
		rootVC.navigationController = this
		this.items = [rootVC]
		this.node.appendChild(rootVC.node)
		this.refreshHeader()
		rootVC.show()

	}
	push(viewController) {
		for (var i = 0; i < this.items.length; i++) {
			var vc = this.items[i]
			vc.hide()
		}
		this.items.push(viewController)
		this.node.appendChild(viewController.node)
		this.refreshHeader()
	}
	refreshHeader() {
		var lastItem = this.items[this.items.length-1]
		this.header.innerHTML = ""
		if (this.items.length > 1) {
			var backDiv = document.createElement("div")
			backDiv.className = "Back"
			backDiv.innerHTML = "<"
			backDiv.onclick = (function(nc) {
				return function() {
					nc.back()	
				}
			})(this)
			this.header.appendChild(backDiv)
		} 
		this.header.appendChild(document.createTextNode(lastItem.title))
	}
	back() {
		if (this.items.length <= 1) {
			return
		}
		var item = this.items.pop()
		this.node.removeChild(item.node)
		var lastItem = this.items[this.items.length-1]
		lastItem.show()
		this.refreshHeader()
	}
}