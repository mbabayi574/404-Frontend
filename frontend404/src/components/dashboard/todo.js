import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from "react";

const Todo = ({todo}) => {
    const title = todo.title;
    const priority = todo.priority;
    const [done, setDone] = useState(todo.done);
    return <Paper sx={{
        padding: 1
    }}>
        <Box style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Typography
                variant="body1"
                component="h2"
                style={{
                    color:
                        (priority === "low") ?
                            "green" :
                        (priority === "medium") ?
                            "orange" :
                        (priority === "high") ?
                            "red" :
                            "grey"
                }}
            >
                {title}
            </Typography>
            <Box marginLeft="auto">
                <ToggleButton
                    value="check"
                    size="small"
                    selected={done}
                    onChange={() => {
                        setDone(!done);
                    }}
                    >
                    <CheckIcon />
                </ToggleButton>
            </Box>
        </Box>
    </Paper>
};

export default Todo;