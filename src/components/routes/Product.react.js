import React from 'react';

import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

import Header from './Header.react';

var Home = React.createClass({
	componentDidMount() {
		// initialize slick slider
		$(".product-slick").slick({
			dots: false,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 4000
		});
	},
	render() {
		let backgroundImage = "http://media.idownloadblog.com/wp-content/uploads/2015/06/Wallpaper-OS-X-El-Capitan-Mac.jpg";

		return (
			<Grid fluid={true}>
				<Row>
					<Header headerStyle="inverted" />
					<div className="product-container" style={{backgroundImage: "url(" + backgroundImage + ")"}}>
						<div className="product-header-container">
							<div className="product-slick">
								<div className="product-slide">
									<img src="http://blogs-images.forbes.com/jasonevangelho/files/2015/03/2015_new_macbook_gold.jpg" />
								</div>
								<div className="product-slide">
									<img src="http://i.kinja-img.com/gawker-media/image/upload/t_original/dz36xqtcujbc5uwnzh3b.png" />
								</div>
								<div className="product-slide">
									<img src="https://cdn2.vox-cdn.com/thumbor/gPy3YCdrT76s8wKwP1YlZpCJUII=/cdn0.vox-cdn.com/uploads/chorus_asset/file/3486606/pixel_macbook_large_2x.0.jpg" />
								</div>
							</div>
							<div className="product-title-container">
								<span className="product-title">Apple Macbook Gold 256gb</span>
								<span className="product-price">1500</span>
							</div>
						</div>
						<div className="product-bidding-container">

						</div>
						<div className="product-footer-container">
							<div className="product-footer-tab-wrapper">
								<div className="product-footer-tab active">
									Specifications
								</div>
								<div className="product-footer-tab">
									Description
								</div>
								<div className="product-footer-tab">
									Comments
								</div>
							</div>
							<div className="product-footer-details">
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
});

export default Home;