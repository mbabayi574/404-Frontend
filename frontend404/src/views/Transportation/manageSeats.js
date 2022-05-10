// design #1

import { theme } from '../../theme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

const employees = [
    {
        id: 1,
        name: "Diyar",
        serviceId: null,
    },
    {
        id: 2,
        name: "Hamedi",
        serviceId: 18,
    },
    {
        id: 3,
        name: "Amin",
        serviceId: 3,
    },
    {
        id: 4,
        name: "Mohammad",
        serviceId: 3,
    }
];

const ManageTransportationSeatsView = () => {
    const params = useParams();
    const [registeredEmployees, setRegisteredEmployees] = useState([]);
    const [unregisteredEmployees, setUnregisteredEmployees] = useState([]);
    const [newRegisters, setNewRegisters] = useState([]);
    const [newUnregisters, setNewUnregisters] = useState([]);

    const loadEmployees = () => {
        const serviceId = params.serviceId;
        setRegisteredEmployees(employees.filter(employee => employee.serviceId == serviceId).map(employee => {let {serviceId, ...x} = employee; return x;}));
        setUnregisteredEmployees(employees.filter(employee => employee.serviceId === null).map(employee => {let {serviceId, ...x} = employee; return x;}));
    }

    useEffect(() => {
        loadEmployees();
    }, [])

    const handleRegister = (id) => {
        let employee = unregisteredEmployees.find(employee => employee.id == id);
        setUnregisteredEmployees(unregisteredEmployees.filter(employee => employee.id != id));
        setRegisteredEmployees([...registeredEmployees, employee]);
        if (newUnregisters.includes(id))
            setNewUnregisters(newUnregisters.filter(id => id != id));
        else
            setNewRegisters([...newRegisters, id]);
    };

    const handleUnregister = (id) => {
        let employee = registeredEmployees.find(employee => employee.id == id);
        setRegisteredEmployees(registeredEmployees.filter(employee => employee.id != id));
        setUnregisteredEmployees([...unregisteredEmployees, employee]);
        if (newRegisters.includes(id))
            setNewRegisters(newRegisters.filter(id => id != id));
        else
            setNewUnregisters([...newUnregisters, id]);
    };

    const handleSubmit = () => {
        console.log(newRegisters);
        console.log(newUnregisters);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Container maxWidth={false} sx={{
                    p: 3,
                    height: '100%',
                }}>
                    <Stack spacing={3} sx={{height: '100%', width: '100%'}}>
                        <Box>
                            <Typography
                                variant="h4"
                            >
                                Manage Seats
                            </Typography>
                        </Box>

                        <Stack spacing={4} direction='row'
                            sx={{
                                height: '700px',
                                alignItems: 'center'
                            }}
                        >
                            <Card sx={{
                                flexGrow: 1,
                                height: '100%'
                            }}>
                                <Stack spacing={0.5} sx={{p: 2}}>
                                    <Typography variant="h5">
                                        Registered Employees
                                    </Typography>
                                    <Typography variant="body1">
                                        Select an employee to unregister
                                    </Typography>
                                </Stack>
                                <Divider />
                                <List sx={{maxHeight: '100%', overflowY: 'auto'}}>
                                    {
                                        registeredEmployees.map(employee => (
                                            <ListItem>
                                                <ListItemButton onClick={() => handleUnregister(employee.id)}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <PersonIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={employee.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Card>
                            <Card sx={{
                                flexGrow: 1,
                                height: '100%'
                            }}>
                                <Stack spacing={0.5} sx={{p: 2}}>
                                    <Typography variant="h5">
                                        Unregistered Employees
                                    </Typography>
                                    <Typography variant="body1">
                                        Select an employee to register
                                    </Typography>
                                </Stack>
                                <Divider />
                                <List sx={{maxHeight: '100%', overflowY: 'auto'}}>
                                    {
                                        unregisteredEmployees.map(employee => (
                                            <ListItem>
                                                <ListItemButton onClick={() => handleRegister(employee.id)}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <PersonIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={employee.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Card>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{justifyContent: "flex-end"}}>
                            <Button href="/transportation" variant='outlined'>
                                Cancel
                            </Button>
                            <Button variant='contained' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
};

const ManageTransportationSeatsPage = () => {
    return (
        <DashboardLayout>
            <ManageTransportationSeatsView />
        </DashboardLayout>
    )
};

export default ManageTransportationSeatsPage;