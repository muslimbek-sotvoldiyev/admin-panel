import React, { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://doctorhelper.pythonanywhere.com/api/v1/service/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <List>
        {services.map((service) => (
          <ListItem
            key={service.id}
            sx={{
              marginBottom: 2,
              border: "1px solid #ddd",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Service: {service.type.name}</Typography>
              <Typography variant="body1">
                Doctor: {service.doctors[0].first_name}{" "}
                {service.doctors[0].last_name}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => handleClick(service)}
              sx={{ marginLeft: 2 }}
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  function handleClick(service) {
    navigate(`/services/${service.id}`);
  }
};

export default Services;
