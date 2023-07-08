import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const AddEmployeeForm = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    name: '',
    email: '',
    contactNumber: '',
    dateOfJoining: '',
    yearsOfExperience: '',
    dateOfBirth: '',
    department: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data handling here
    console.log(employeeDetails);
    // Reset the form
    setEmployeeDetails({
      name: '',
      email: '',
      contactNumber: '',
      dateOfJoining: '',
      yearsOfExperience: '',
      dateOfBirth: '',
      department: '',
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>    
        <Typography align="center" variant="h3">ADD EMPLOYEE</Typography>
        <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            Add Employee
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={employeeDetails.name}
              onChange={handleChange}
              required
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={employeeDetails.email}
              onChange={handleChange}
              required
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={employeeDetails.contactNumber}
              onChange={handleChange}
              required
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Date of Joining"
              name="dateOfJoining"
              type="date"
              value={employeeDetails.dateOfJoining}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={employeeDetails.yearsOfExperience}
              onChange={handleChange}
              required
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={employeeDetails.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={employeeDetails.department}
                onChange={handleChange}
                required
              >
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddEmployeeForm;
