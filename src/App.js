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

const zones = ["Zone 1","Zone 2","Zone 3"];
const buildingTypes = ["Single dwelling house", "Apartment complex", "Commercial building"]

function App() {
	const [zone, setZone] = useState("");
  const [size, setSize] = useState('');
  const [flood, setFlood] = useState(false);
  const [buildingList, setBuildingList] = useState(["None"]);

	const zoneACOnChange = (event, value) => {
    setZone(value);
	};

  const sizeOnChange = (event) => {
    setSize(event.target.value);
  }

  const floodOnChange = (event) => {
    setFlood(event.target.checked);
  }

  //rules
  //1. No housing types can be built in a flood area
  //2. Single dwelling houses can only be built in Zone 1 & 2
  //3. Apartment buildings can be built in Zone 2 and Zone 3 and the property must be at least 500 sq meters
  //4. Commercial buildings can only be built in Zone 3 and must be greater than 1000 sq m.
  const submitOnClick = (event) => {
		if (zone === "" || zone === null || size === "") {
			setBuildingList(["None"]);
		} 
    else {
			let list = []; //temp list

			//Single dwelling housing
			if (flood === false && (zone === "Zone 1" || zone === "Zone 2")) {
				list.push(buildingTypes[0]);
			}

			//Apartment Buildings
			if ((zone === "Zone 2" || zone === "Zone 3") && size >= 500) {
				list.push(buildingTypes[1]);
			}

			//Commercial building
			if (zone === "Zone 3" && size > 1000) {
				list.push(buildingTypes[2]);
			}

			//No conditions match
			if (list.length === 0) {
				setBuildingList(["None"]);
			} else {
				setBuildingList(list);
			}
		}
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
					alignItems="center"
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
							onChange={(event, value) => zoneACOnChange(event, value)}
						/>
					</Grid>
					<Grid item>
						<Typography align="left" fontWeight="bold">
							Size
						</Typography>
						<br />
						<TextField sx={{ width: 250 }} label="Square Meters" type="number" value={size} onChange={(event) => sizeOnChange(event)}/>
					</Grid>
					<Grid item>
						<Typography align="left" fontWeight="bold">
							Is flooding area?
						</Typography>
						<br />
						<FormControlLabel control={<Checkbox checked={flood} onChange={(event) => floodOnChange(event)}/>} label="Flood Area" />
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
						<Button variant="contained" onClick={(event) => submitOnClick(event)}>Submit</Button>
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
						<Typography>Based on these property facts, the allowed building types are:</Typography>
            <List>
              {buildingList.map(item => (
                <ListItem>• {item}</ListItem>
              ))}
            </List>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default App;
