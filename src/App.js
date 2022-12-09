import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const zones = ["Zone 1", "Zone 2", "Zone 3"];
const buildingTypes = [
	"Single dwelling house",
	"Apartment complex",
	"Commercial building",
];

function App() {
	const [zone, setZone] = useState("");
	const [size, setSize] = useState("");
	const [flood, setFlood] = useState(false);
	const [buildingList, setBuildingList] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);

	const zoneOnChange = (event, value) => {
		setZone(value);
	};

	const sizeOnChange = (event) => {
		setSize(event.target.value);
	};

	const floodOnChange = (event) => {
		setFlood(event.target.checked);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	}

	const submitOnClick = (event) => {
		if (zone === "" || zone === null || size === "") {//empty fields
			setBuildingList(["None"]);
			setDialogOpen(true);
		} 
		else {
			let list = analysePropertyFacts(zone, size, flood); //temp list

			//No conditions match
			if (list.length === 0) {
				setBuildingList(["None"]);
			} 
			else {
				setBuildingList(list);
			}
		}
	};
	
	//rules
	//1. No housing types can be built in a flood area
	//2. Single dwelling houses can only be built in Zone 1 & 2
	//3. Apartment buildings can be built in Zone 2 and Zone 3 and the property must be at least 500 sq meters
	//4. Commercial buildings can only be built in Zone 3 and must be greater than 1000 sq m.
	const analysePropertyFacts = (pZone, pSize, pFlood) => {
		let list = [];

		//Single dwelling housing
		if (pFlood === false && (pZone === zones[0] || pZone === zones[1])) {
			list.push(buildingTypes[0]);
		}
		
		//Apartment Buildings
		if (pFlood === false && (pZone === zones[1] || pZone === zones[2]) && pSize >= 500) {
			list.push(buildingTypes[1]);
		}
		
		//Commercial building
		if (pZone === zones[2] && pSize > 1000) {
			list.push(buildingTypes[2]);
		}
		
		return list;
	};
	
	return (
		<div className="App">
			<br />

			<Box
				sx={{
					"& > :not(style)": { m: "auto", width: "100vh" },
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					Property
				</Typography>
				<Grid
					container
					spacing="15px"
					justifyContent="center"
					alignItems="flex-start"
				>
					<Grid item>
						<Typography align="left" fontWeight="bold">
							Zone
						</Typography>
						<br />
						<Autocomplete
							options={zones}
							sx={{ width: 250 }}
							renderInput={(params) => <TextField {...params} />}
							onChange={(event, value) => zoneOnChange(event, value)}
						/>
					</Grid>
					<Grid item>
						<Typography align="left" fontWeight="bold">
							Size
						</Typography>
						<br />
						<TextField
							sx={{ width: 250 }}
							helperText="Square Meters"
							type="number"
							value={size}
							onChange={(event) => sizeOnChange(event)}
						/>
					</Grid>
					<Grid item>
						<Typography align="left" fontWeight="bold">
							Is flooding area?
						</Typography>
						<br />
						<FormControlLabel
							control={
								<Checkbox
									checked={flood}
									onChange={(event) => floodOnChange(event)}
								/>
							}
							label="Flood Area"
						/>
					</Grid>
				</Grid>
				<br />
				<Grid
					container
					spacing="15px"
					justifyContent="left"
					alignItems="center"
				>
					<Grid item>
						<Button
							variant="contained"
							onClick={(event) => submitOnClick(event)}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
				<br />
				<Grid
					container
					spacing="15px"
					justifyContent="left"
					alignItems="center"
				>
					<Grid item>
						<Typography variant="h6" fontWeight="bold">
							Analysis Results
						</Typography>
						<Typography>
							Based on these property facts, the allowed building types are:
						</Typography>
						<List>
							{buildingList.map((item) => (
								<ListItem>• {item}</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</Box>
			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
			>
				<DialogTitle >Empty Fields</DialogTitle>
				<DialogContent>
					<DialogContentText>
						One or more fields are empty. Please enter them and try again.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default App;
