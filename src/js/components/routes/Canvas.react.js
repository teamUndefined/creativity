import React from 'react';

var Canvas = React.createClass({
	componentDidMount() {
		// $('#canvas').jqScribble();
		$('#canvas').sketch();
		$('#canvas2').sketch();

		$('.canvas-wrapper canvas').on('mouseup touchmove mousemove touchend touchcancel', function() {
			console.log('EVENT');
			var that = $(this)[0];
			var aux = false;
			var ctx = true;

			$('.canvas-wrapper canvas').each(function() {
				if ($(this)[0] == that) {
					return;
				}

				var ctx = $(this)[0].getContext('2d');

				console.log(ctx);

				if (ctx == aux) {
					console.log('not good');
					return;
				}

				aux = ctx;

				ctx.drawImage(that, 0, 0);
			});
		});
	},
	render() {
		return (
			<div className="canvas-wrapper">
				<canvas id="canvas"></canvas>
				<canvas id="canvas2"></canvas>
			</div>
		)
	}
});

export default Canvas;
