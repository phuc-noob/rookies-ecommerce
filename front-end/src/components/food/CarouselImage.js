import { Grid } from "@mui/material";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";

function CarouselImage({ value }) {
	const [activeChild, setActiveChild] = useState(0);
	console.log(value)
	const handleChange = (prev) => {
		setActiveChild(prev);
	};
	if (!value) {
		value = [
			{
				id: -1,
				url: "/image/foodImage.png",
			},
		];
	}
	return (
		<>
			<Carousel
				index={activeChild} // <-- This controls the activeChild
				onChange={handleChange}
				autoPlay={false} // <-- You probaly want to disable this for our purposes
				navButtonsAlwaysInvisible={value.length === 1}
				animation="slide"
				style={{ borderRadius: "16px" }}
				height={"300px"}
			>
				{value.map((e) => {
					return (
						<Grid align="center" key={e.id}>
							<img
								width={"100%"}
								height={"100%"}
								style={{ borderRadius: "16px" }}
								src={e.imageURL}
								alt={"foods"}
							/>
						</Grid>
					);
				})}
			</Carousel>
		</>
	);
}

export default CarouselImage;
