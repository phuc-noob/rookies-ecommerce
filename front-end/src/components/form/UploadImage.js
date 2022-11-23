import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { ProductContext } from "../../helpers/context/productContext";
import { Chip, Avatar, Paper } from "@mui/material";
import { ImageUtil } from "../../helpers/util/uploadImage";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

function UploadImage({ value, setState }) {
	const InputFileRef = useRef();
	const { selectedFile, setSelectedFile } = useContext(ProductContext);

	const handleRemove = (index) => {
		URL.revokeObjectURL(value[index].url);
		setState((pre) =>
			pre.filter((e, i) => {
				return i !== index;
			})
		);
	};
	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		setSelectedFile(e.target.files[0]);
	};

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const timer = React.useRef();

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			"&:hover": {
				bgcolor: green[700],
			},
		}),
	};

	React.useEffect(() => {
		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	const handleButtonClick = () => {
		if (!selectedFile || selectedFile.name.trim() === "") return;
		setLoading(true);
		ImageUtil.uploadImage(selectedFile).then((res) => {
			setSelectedFile(res.url);
			const url = URL.createObjectURL(selectedFile);
			setState((pre) => [...pre, { url }]);
			InputFileRef.current.value = "";
			setLoading(false);
			setSuccess(true);
		});
	};
	return (
		<>
			<div className="d-flex flex-column">
				<div className="d-flex pe-3">
					<div className="flex-grow-1">
						<Form.Group controlId="formFileSm" className="w-100 border-0">
							<Form.Control
								type="file"
								onChange={onSelectFile}
								size="md"
								accept="image/*"
								ref={InputFileRef}
							/>
							<div className="invalid-feedback">require file upload</div>
						</Form.Group>
					</div>

					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Box sx={{ m: 1, position: "relative" }}></Box>
						<Box sx={{ m: 1, position: "relative" }}>
							<Button
								sx={buttonSx}
								disabled={loading}
								onClick={handleButtonClick}
							>
								Upload
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									sx={{
										color: green[500],
										position: "absolute",
										top: "50%",
										left: "50%",
										marginTop: "-12px",
										marginLeft: "-12px",
									}}
								/>
							)}
						</Box>
					</Box>
				</div>
				<Paper
					sx={{
						display: "flex",
						flexWrap: "wrap",
						listStyle: "none",
						p: 0.5,
						mt: 1,
					}}
					component="ul"
				>
					{value.map((e, index) => (
						<Chip
							key={index}
							avatar={<Avatar alt={e.filename} src={e.url} />}
							label={"image" + index}
							variant="outlined"
							onDelete={() => handleRemove(index)}
						/>
					))}
				</Paper>
			</div>
		</>
	);
}

export default UploadImage;
