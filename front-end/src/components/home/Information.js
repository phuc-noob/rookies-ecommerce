import { Container, Grid, List, ListItem, ListItemText } from "@mui/material";
import { Check } from "@mui/icons-material";
import styled from "@emotion/styled";

const dataWhy = [
	{
		key: "Quickest",
		descript: "GrabFood provides the fastest food delivery in the market.",
	},
	{
		key: "Easiest",
		descript:
			"Now grabbing your food is just a few clicks or taps away. Order online or download our Grab super app for a faster and more rewarding experience.",
	},
	{
		key: "Food for all cravings",
		descript:
			"From local fare to restaurant favourites, our wide selection of food will definitely satisfy all your cravings.",
	},
	{
		key: "Pay with ease",
		descript:
			"It’s easy to get your meals delivered to you. It’s even easier to pay for it with GrabPay.",
	},
	{
		key: "More Rewarding",
		descript:
			"earn GrabRewards points for every order you make and use them to redeem more goodies.",
	},
];

const dataQuestion = [
	{
		question: "What is GrabFood?",
		anwser: `GrabFood is the fastest Food Delivery service in Vietnam. We have curated all
        your favorite dishes, restaurants, and cuisines to help you grab your food in the easiest
        & quickest way possible. Find and order your favorite cuisines across Vietnam - order food
         online in just a few taps, from Lifted Coffee & Brunch - Hàng Gà for Breakfast, Maazi Indian
          - Nhà Hàng Ấn Độ for Lunch, Bún Cá Chấm Gốc Đa - Vũ Thạnh for Dinner! We are here to satisfy
           your hunger with a wide selection of merchant partners in Vietnam.`,
	},
	{
		question: "Does GrabFood provide food delivery 24x7?",
		anwser: `We understand only one language - food, so yes, we do..
        Please note, though we are here as your 24*7 food partners, few
        of our listed restaurants may have late-night food delivery
        restrictions or may be unavailable for orders. But we have
        listed the ones that love your late-night binging in our Late
         Night Delivery Section.        `,
	},
	{
		question: "Does GrabFood accept Cash?",
		anwser: `Sure, we do! GrabFood accepts all
        forms of payments for food delivery services, including cash on delivery in Thailand.`,
	},
	{
		question: "Can I pay online on GrabFood for my food orders?",
		anwser: `GrabFood accepts multiple forms of payments for online food orders,
         including online payments in Vietnam using a credit or debit card, PayPal or
          cash on delivery. We recommend using Moca so you can earn more rewards points,
           which you can use for discounts on your next order and on other Grab services.`,
	},
];

function Information() {
	return (
		<>
			<Container maxWidth={"xl"}>
				<Grid container direction={"column"} gap={3}>
					<Grid item>
						<TittleHome> Why GrabFood?</TittleHome>
					</Grid>
					<Grid container justifyContent="flex-start">
						<List>
							{dataWhy.map((e) => {
								return (
									<ListItem disablePadding>
										<Check
											fontSize="small"
											sx={{ color: "green", marginRight: "12px" }}
										/>
										<ListItemText>
											<strong>{e.key}</strong>
											<span style={{ margin: "0 5px" }}> - </span>
											<span>{e.descript}</span>
										</ListItemText>
									</ListItem>
								);
							})}

							<ListItem disablePadding>
								<ListItemText primary="Trash" />
							</ListItem>
						</List>
					</Grid>
				</Grid>
				<Grid container direction={"column"} gap={3}>
					<Grid item>
						<TittleHome> Frequently Asked Questions</TittleHome>
					</Grid>
					{dataQuestion.map((e, i) => {
						return (
							<>
								<Grid container justifyContent="flex-start">
									<QuestionTitle> {e.question}</QuestionTitle>
									<List>
										<ListItem disablePadding>
											<ListItemText>{e.anwser}</ListItemText>
										</ListItem>
									</List>
								</Grid>
							</>
						);
					})}
				</Grid>

				<Grid container spacing={3} rowGap={3} sx={{ my: 3 }}>
					<Grid
						container
						lg={6}
						md={6}
						direction="column"
						alignItems={"center"}
					>
						<img
							height={"150px"}
							width="150px"
							src="/image/infor_home1.svg"
							alt="hello"
						/>
						<strong>Curated restaurants</strong>
						<span
							style={{
								textAlign: "center",
							}}
						>
							From small bites to big meals, we won't limit your appetite. Go
							ahead and order all you want.
						</span>
					</Grid>
					<Grid
						container
						lg={6}
						md={6}
						direction="column"
						alignItems={"center"}
					>
						<img
							height={"150px"}
							width="150px"
							src="/image/infor_home2.svg"
							alt="hello"
						/>
						<div>More cool features available on the app</div>
						<span
							style={{
								textAlign: "center",
							}}
						>
							From small bites to big meals, we won't limit your appetite. Go
							ahead and order all you want.
						</span>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
const TittleHome = styled.h1`
        fontZize: "2.57142857rem",
        lineHeight: 1.33333333,
        fontWeight: "600",
        fontFamily: "SanomatGrabApp,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",

`;

const QuestionTitle = styled.h3`
        fontZize: "1.5rem",
        lineHeight: 1,
        fontWeight: "600",
        fontFamily: "SanomatGrabApp,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",

`;

export default Information;
