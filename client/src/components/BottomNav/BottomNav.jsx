import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useEffect, useRef, useState } from "react";
import ClusterMap from "../Map/ClusterMap";
import Offices from "../Offices/Offices";
import AddOffice from "../AddOffice/AddOffice";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Offices />,
          2: <AddOffice />,
        }[value]
      }
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          color: "primary",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Map" icon={<LocationOn />} />
          <BottomNavigationAction label="Offices" icon={<BusinessIcon />} />
          <BottomNavigationAction label="Add" icon={<AddLocationAltIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
