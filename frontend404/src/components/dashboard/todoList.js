import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Todo from './todo';

const todos = [
    {title: "Title", priority: "low", done: true},
    {title: "Title", priority: "lds", done: false},
    {title: "Title", priority: "high", done: false},
    {title: "Title", priority: "medium", done: true},
    {title: "Title", priority: "high", done: true},
]

const TodoList = () => {
    return <Paper sx={{
        padding: 2,
        height: "100%"
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography variant="h5" component="h1" fontWeight="bolder">
                Todos
            </Typography>
            <Box marginLeft="auto">
                <Button>
                    View all
                </Button>
            </Box>
        </Box>
        <Stack marginTop={1} spacing={0.5} style={{
            flexGrow: 1,
            maxHeight: "100%",
            overflowY: "auto"
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