class WsAPI {
  constructor(ws) {
  	this.ws = ws
  	ws.onopen = function() {
	  console.log("didConnect")
	};
	ws.onmessage = function (evt) { 
    var lines = splitLines(evt.data)
    for (var i = 0; i < lines.length; i++) {    
  		var json = JSON.parse(lines[i]);
      console.log(json)
  		switch (json.msg_func) {
  			case "arena_info":
  			// TODO
  			var event = new CustomEvent("onRoomInfo")
  			document.dispatchEvent(event)
  			break
        case "player_stat":
        PlayerStat.player = json.player
        PlayerStat.stat_items = json.stat_items
        PlayerStat.best_listici = json.best_listici
        var event = new CustomEvent("onPlayerStat")
        document.dispatchEvent(event)
        break
  		}
    }
	};
	ws.onclose = function() {  
  		// websocket is closed.
  		console.log("Connection is closed..."); 
	};
  }

  roomInfo() {
  	this.ws.send(JSON.stringify({msg_func:"room_info"}))
  }
}