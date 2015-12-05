import React from 'react';

import {
	FloatingActionButton,
	ActionGrade
} from 'material-ui';

var Canvas = React.createClass({
	componentDidMount() {
		var self = this;

		this.props.socket.on('update_canvas', function(action) {
			// get scketch and redraw
			var sketch = $("#canvas").sketch();
			sketch.actions.push(action);
			sketch.redraw();
		});

		this.props.socket.on('clear_canvas', function(action) {
			// get scketch and redraw
			var sketch = $("#canvas").sketch();
			sketch.actions = [];
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
				self.props.socket.emit('server_update_canvas', action);
				canCall = false;
			}
		});
	},
	clearCanvas() {
		var self = this;
		var sketch = $("#canvas").sketch();

		sketch.actions = [];
		sketch.redraw();
		self.props.socket.emit('server_clear_canvas');
	},
	render() {
		return (
			<div className="canvas-wrapper">
				<canvas id="canvas" width="450" height="300"></canvas>
				<div className="tools">
					<a href="#canvas" className="color-pill" data-color="#000000" title="Black"><span style={{backgroundColor: "#000000"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#1abc9c" title="Green"><span style={{backgroundColor: "#1abc9c"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#2980b9" title="Blue"><span style={{backgroundColor: "#2980b9"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#8e44ad" title="Purple"><span style={{backgroundColor: "#8e44ad"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#c0392b" title="Red"><span style={{backgroundColor: "#c0392b"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#f1c40f" title="Yellow"><span style={{backgroundColor: "#f1c40f"}}></span></a>
					<a href="#canvas" className="color-pill" data-color="#ffffff" title="White"><span style={{backgroundColor: "#ffffff", border: "1px solid #aaa"}}></span></a>
					<FloatingActionButton onClick={this.clearCanvas} mini={true}>
						<i className="fa fa-refresh"></i>
					</FloatingActionButton>
				</div>
			</div>
		)
	}
});

export default Canvas;
