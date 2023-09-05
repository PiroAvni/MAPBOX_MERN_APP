import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  return (
    <div style={{ height: "74vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Image */}
              <img
                src="https://img.freepik.com/premium-photo/modern-corporate-architecture-can-be-seen-cityscape-office-buildings_410516-276.jpg" // Replace with your image path
                alt="Welcome Image"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Welcome Message */}
              <Typography variant="h4" component="h2" gutterBottom>
                Welcome to Location Ltd
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vel accumsan turpis, a auctor dolor. Praesent suscipit sapien at
                augue mattis, nec blandit justo sagittis. Nullam cursus libero
                quis eleifend.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default HomePage;
