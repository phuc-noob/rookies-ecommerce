import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

import { Chip, Avatar, Paper } from "@mui/material";

function UploadImage({ value, setState }) {
	const InputFileRef = useRef();
	const [selectedFile, setSelectedFile] = useState(null);

	const handleAppend = () => {
		if (!selectedFile || selectedFile.name.trim() === "") return;
		const url = URL.createObjectURL(selectedFile);
		// const filename = selectedFile.name;
		setState((pre) => [...pre, { url }]);
		InputFileRef.current.value = "";
		setSelectedFile(null);
	};
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
		// I've kept this example simple by using the first image instead of multiple
		setSelectedFile(e.target.files[0]);
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

					<div className="ms-2">
						<Button onClick={handleAppend}>upload</Button>
					</div>
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
							sx={{ maxWidth: "33%" }}
							onDelete={() => handleRemove(index)}
						/>
					))}
				</Paper>
			</div>
		</>
	);
}

export default UploadImage;
