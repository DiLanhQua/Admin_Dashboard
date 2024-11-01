// src/components/SEOInformation.js
import { Grid, TextField } from "@mui/material";
import Textarea from "../../../components/textarea";

export default function SEOInformation({ formik }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Từ khóa"
          fullWidth
          value={formik.values.keywords}
          onChange={formik.handleChange}
          name="keywords"
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Tiêu đề SEO"
          fullWidth
          value={formik.values.titleSEO}
          onChange={formik.handleChange}
          name="titleSEO"
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <Textarea
          label="Mô tả SEO"
          name="descriptionSEO"
          value={formik.values.descriptionSEO}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          height={500}
        />
      </Grid>
    </Grid>
  );
}
