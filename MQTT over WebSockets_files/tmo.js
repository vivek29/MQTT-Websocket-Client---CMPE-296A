(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			$('#publish-button').click(function() {
				return _this.publish();
			});

			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "Connection Successful";
				$("#debug").append(p);
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "Lost connection";
				$("#debug").append(p);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				p.innerHTML = "Publish Successful to Topic - " + topic + ". Message - " + payload;
				$("#debug").append(p);
			};
		}
		Page.prototype.connect = function(){
			var host = document.getElementById("host").value;
			var port = document.getElementById("port").value;
			var url = "ws://" + host + ":" + port + "/mqtt";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
			var p = document.createElement("p");
			p.innerHTML = "Subscription Successful. Topic - "+topic;
			$("#debug").append(p);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(){
			var topic = $('#pub-topic-text')[0].value;
			var qos = $('#qos-text')[0].value;
			var payload = $('#payload-text')[0].value;
			mosq.publish(topic, payload, 0);
		};
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);

