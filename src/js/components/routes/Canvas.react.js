import React from 'react';

var Canvas = React.createClass({
	componentDidMount() {

		var self = this;

		this.props.socket.on('new_canvas', function(newCanvas) {
			var ctx = $('#canvas')[0].getContext('2d');

			ctx.drawImage(newCanvas, 0, 0);
		});

		$('#canvas').sketch();

		$('.canvas-wrapper canvas').on('mouseup touchmove mousemove touchend touchcancel', function() {
			var that = $(this)[0];

			self.props.socket.emit('update_canvas', that);
		});
	},
	render() {
		return (
			<div className="canvas-wrapper">
				<canvas id="canvas" width="100" height="300"></canvas>
				<div className="tools">
					<a href="#canvas" data-color="#000000" title="Black"><img src="img/black_icon.png" alt="Black"/></a>
					<a href="#canvas" data-color="#ff0000" title="Red"><img src="img/red_icon.png" alt="Red"/></a>
					<a href="#canvas" data-color="#00ff00" title="Green"><img src="img/green_icon.png" alt="Green"/></a>
					<a href="#canvas" data-color="#0000ff" title="Blue"><img src="img/blue_icon.png" alt="Blue"/></a>
					<a href="#canvas" data-color="#ffff00" title="Yellow"><img src="img/yellow_icon.png" alt="Yellow"/></a>
					<a href="#canvas" data-color="#00ffff" title="Cyan"><img src="img/cyan_icon.png" alt="Cyan"/></a>
				</div>
			</div>
		)
	}
});

export default Canvas;
