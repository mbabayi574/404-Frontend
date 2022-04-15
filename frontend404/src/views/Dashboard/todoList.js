import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Todo from './todo';

const TodoList = ({todos}) => {
    return <Paper sx={{
        padding: 2,
        height: "40vh"
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography variant="h5" component="h1">
                Todos
            </Typography>
            <Box marginLeft="auto">
                <Button>
                    View all
                </Button>
            </Box>
        </Box>
        <Stack marginTop={1} spacing={0.5} style={{
            maxHeight: "30vh",
            overflowY: "scroll"
        }}>
        {
            todos.map((todo) => {
                return (
                    <Item>
                        <Todo todo={todo}/>
                    </Item>
                );
            })
        }
        </Stack>
    </Paper>
};

export default TodoList;