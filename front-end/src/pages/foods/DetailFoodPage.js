import { Container, Divider, Grid } from "@mui/material";
import FormFood from "../../components/food/FormFood";
import InfoFood from "../../components/food/InfoFood";
import ListFoods from "../../components/food/ListFoods";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../helpers/context/productContext";
import ListRating from "../../components/rating/ListRating";

function DetailFood() {
	const products = useContext(ProductContext)
	return (
		<>
			<Container sx={{ marginTop: "150px" }}>
				<InfoFood />
				<br></br>
				<Grid item>
					<h3
						style={{
							fontZize: "2.57142857rem",
							lineHeight: 1.33333333,
							fontWeight: "600",
							fontFamily:
								"SanomatGrabApp,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
						}}
					>
						Sản Phẩm Tương Tự
					</h3>
					<Divider/>
				</Grid>
				<br></br>

				<ListFoods data={products.ListProduct} />
				<br/>
				<br/>
				<Grid item>
					<h3
						style={{
							fontZize: "2.57142857rem",
							lineHeight: 1.33333333,
							fontWeight: "600",
							fontFamily:
								"SanomatGrabApp,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
						}}
					>
						ĐÁNH GIÁ SẢN PHẨM
					</h3>
				</Grid>
				<br></br>
				<ListRating />
			</Container>
		</>
	);
}

export default DetailFood;
