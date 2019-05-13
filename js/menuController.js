class MenuViewController extends ViewController {
  constructor(node) {
    super(node)
    node.className = "MenuViewController"
    this.items = ["Mlin","Bela","Yamb"]
  }
  show() {
    super.show()
    this.node.innerHTML = ""
    var listNode = document.createElement('div')
    this.node.appendChild(listNode)
    for (var i = 0; i < this.items.length; i++) {
      var item = document.createElement('div')
      item.className = "MenuItem"
      item.onclick = (function(menu,item) {
        return function() {
          menu.onMenuItemClicked(item)
        }
      })(this,this.items[i])
      item.textContent = this.items[i]
      listNode.appendChild(item)
    }
  }

  onMenuItemClicked(item) {
      console.log("klik ",item)
      switch (item) {
        case "Mlin": 
          var mlin = new MlinViewController(document.createElement("div"))
          this.navigationController.push(mlin)
          break
        case "Rules": {
          var rules = new RulesViewController(document.createElement("div"))
          this.navigationController.push(rules)
        }
      }
    }
}