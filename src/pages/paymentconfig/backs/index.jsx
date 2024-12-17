import React, { useEffect } from "react";
import { debounce } from "lodash";
import { Autocomplete, Avatar, TextField, Grid } from "@mui/material";

const VietQRBankList = ({ data, valuedata }) => {
  const [banks, setBanks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [logo, setLogo] = React.useState("");

  const debouncedFetchBanks = React.useMemo(
    () =>
      debounce((value) => {
        fetch(`https://api.viqr.net/list-banks/`)
          .then((response) => response.json())
          .then((data) => {
            setBanks(data.data);
          })
          .catch((error) => {
          });
      }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchBanks(searchTerm);
  }, [debouncedFetchBanks, searchTerm]);

  const handleInputChange = (event, value) => {
    setSearchTerm(value);
    debouncedFetchBanks(value);
  };

  const handleBankSelect = (event, value) => {
    data(value);
    setLogo(value?.logo || "");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <img src={logo} alt={logo} width={100} />
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          value={valuedata}
          options={banks}
          getOptionLabel={(option) => option.short_name || ""}
          onInputChange={handleInputChange}
          onChange={handleBankSelect}
          renderInput={(params) => (
            <TextField {...params} label="Ngân hàng" variant="outlined" />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default VietQRBankList;
