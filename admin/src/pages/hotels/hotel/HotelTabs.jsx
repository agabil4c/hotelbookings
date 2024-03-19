import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import List from "../../../components/table/Table";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Rooms" value="1" />
            <Tab label="Services" value="2" />
            <Tab label="Gallery" value="3" />
            <Tab label="Bookings" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          Rooms
          <br />
          <List />
        </TabPanel>
        <TabPanel value="2">
          Services
          <br />
          <List />
        </TabPanel>
        <TabPanel value="3">
          Gallery
          <br />
          <List />
        </TabPanel>
        <TabPanel value="4">
          Bookings
          <br />
          <List />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
