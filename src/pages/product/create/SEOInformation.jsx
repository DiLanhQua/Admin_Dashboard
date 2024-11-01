// src/components/SEOInformation.js
import { Grid, TextField } from "@mui/material";
import Textarea from "../../../components/textarea";

export default function SEOInformation({ productData, handleInputChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Từ khóa"
          fullWidth
          value={productData.keywords}
          onChange={(e) => handleInputChange("keywords", e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Tiêu đề SEO"
          fullWidth
          value={productData.titleSEO}
          onChange={(e) => handleInputChange("titleSEO", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Textarea
          label="Mô tả SEO"
          name="descriptionSEO"
          value={productData.descriptionSEO}
          onChange={(e) => handleInputChange("descriptionSEO", e.target.value)}
          height={500}
        />
      </Grid>
    </Grid>
  );
}
