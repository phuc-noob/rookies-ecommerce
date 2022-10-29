import { Container, Grid, Button } from "@mui/material";
import CategoryCard from "../category/CategoryCard";

function ListCategory({ dataCategory }) {
	return (
		<Container>
			<Grid container direction={"column"} gap={3}>
				<Grid item>
					<h1
						style={{
							fontZize: "2.57142857rem",
							lineHeight: 1.33333333,
							fontWeight: "600",
							fontFamily:
								"SanomatGrabApp,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
						}}
					>
						SOME CATEGORY IN WEBSITE
					</h1>
				</Grid>
				<Grid container spacing={2} columnSpacing={4}>
                    <Grid item md={3} xs={6}>
                        <CategoryCard/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CategoryCard/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CategoryCard/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CategoryCard/>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CategoryCard/>
                    </Grid>
                </Grid>
				
			</Grid>
		</Container>
	);
}

export default ListCategory;
