import React from 'react';

import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

var Home = React.createClass({
	componentDidMount() {
		// initialize slick slider
		$(".homepage-slick").slick({
			dots: false,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 4000
		});
	},
	render() {
		return (
			<div>
				<div className="homepage-slick">
					<div className="homepage-slide" style={{backgroundImage: "url(https://www.metaslider.com/wp-content/uploads/2014/11/mountains1.jpg)"}}>
						
					</div>
					<div className="homepage-slide" style={{backgroundImage: "url(https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/15/153/153608/rlln0we921wijomh3wttle1szl9mao25oyw4nootsqohrva7z9jchrv1d0dfso35-o.jpg?1406907110)"}}>
						
					</div>
					<div className="homepage-slide" style={{backgroundImage: "url(http://mycargear.com/wp-content/uploads/Hipster-Bike-Wallpaper-011.jpg)"}}>
					
					</div>
				</div>
				<div>

				</div>
			</div>
		);
	}
});

export default Home;