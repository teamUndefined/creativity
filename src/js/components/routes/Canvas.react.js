import React from 'react';

var Canvas = React.createClass({
	componentDidMount() {

		var self = this;

		this.props.socket.on('new_canvas', function(action) {
			// get scketch and redraw
			var sketch = $("#canvas").sketch();
			sketch.actions.push(action);
			sketch.redraw();
		});

		$('#canvas').sketch();

		// limit canvas update to 24 fps
		var canCall = true;
		setInterval(function(){
            canCall = true;
        }, 42);

		$('.canvas-wrapper canvas').on('mouseup touchmove mousemove touchend touchcancel', function() {
			var action = $(this).sketch().action;

			if (canCall && action) {
				self.props.socket.emit('update_canvas', action);
				canCall = false;
			}
		});
	},
	render() {
		return (
			<div className="canvas-wrapper">
				<canvas id="canvas" width="450" height="300"></canvas>
				<div className="tools">
					<a href="#canvas" className="color-pill" data-color="#1abc9c" title="Black"><span style={{backgroundColor: "#1abc9c"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#2980b9" title="Black"><span style={{backgroundColor: "#2980b9"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#8e44ad" title="Black"><span style={{backgroundColor: "#8e44ad"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#c0392b" title="Black"><span style={{backgroundColor: "#c0392b"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#f1c40f" title="Black"><span style={{backgroundColor: "#f1c40f"}}></span></a>
				</div>
			</div>
		)
	}
});

export default Canvas;
