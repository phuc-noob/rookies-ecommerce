import Banner from "../../components/home/Banner";
import { Divider } from "@mui/material";
import TopItems from "../../components/home/TopItems";
import Information from "../../components/home/Information";
const dataTopFood = [
	{
		id: 1,
		picture: "#",
		name: "Bún Bò Huế 65 - Khâm Thiên",
		category: ["Bún", "Phở Mì", " Hủ tiếu"],
	},
	{
		id: 2,
		picture: "#",
		name: "Bún Bò Huế 32 - Khâm Thiên",
		category: ["Bún", "Phở Mì", " Hủ tiếu"],
	},
	{
		id: 3,
		picture: "#",
		name: "Bún Bò Huế 32- Khâm Thiên",
		category: ["Bún", "Phở Mì", " Hủ tiếu"],
	},
	{
		id: 3,
		picture: "#",
		name: "Bún Bò Huế 32- Khâm Thiên",
		category: ["Bún", "Phở Mì", " Hủ tiếu"],
	},
];

function HomePage() {
	return (
		<>
			<Banner />
			<Divider sx={{ my: 8, borderBottom: 2 }} />
			<TopItems dataTopFood={dataTopFood} />
			<Information />
		</>
	);
}

export default HomePage;
