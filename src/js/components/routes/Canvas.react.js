import React from 'react';

var Canvas = React.createClass({
	componentDidMount() {

		var self = this;

		this.props.socket.on('new_canvas', function(newCanvas) {
			var ctx = $('#canvas')[0].getContext('2d');
			console.log('RESPONSE', newCanvas);

			// ctx.drawImage(newCanvas, 0, 0);

			var image = new Image();
			image.onload = function() {
			    ctx.drawImage(image, 0, 0);
			};
			image.src = newCanvas;
		});

		$('#canvas').sketch();

		$('.canvas-wrapper canvas').on('mouseup touchmove mousemove touchend touchcancel', function() {
			var image = $(this)[0].toDataURL();

			// console.log('IMAGE', image);
			setTimeout(function() {
				self.props.socket.emit('update_canvas', image);
			}, 20);
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
