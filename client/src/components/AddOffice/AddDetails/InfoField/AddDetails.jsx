import { Stack } from "@mui/material";
import { useState } from "react";
import { useValue } from "../../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = () => {
  const {
    state: {
      details: { title, description, price },
    },
    dispatch,
  } = useValue();
  const [costType, setCostType] = useState(price ? 1 : 0);
  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value);
    setCostType(costType);
    if (costType === 0) {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: 0 } });
    } else {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: 15 } });
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;
