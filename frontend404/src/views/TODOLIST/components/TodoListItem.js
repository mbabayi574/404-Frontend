import React from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutline";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const TodoListItem = React.memo(
  ({
    description,
    priority,
    divider,
    checkbox,
    onCheckBoxToggle,
    onButtonClick,
  }) => {
    return (
      <ListItem divider={divider}>
        <Checkbox onClick={onCheckBoxToggle} checked={checkbox} disableRipple />
        {checkbox ? (
          <ListItemText primary={<del>{description}</del>} />
        ) : (
          <ListItemText primary={description} />
        )}

        <ListItemIcon>
          {
            {
              1: (
                <SentimentVeryDissatisfiedIcon
                  sx={{ color: "red", fontSize: 28 }}
                />
              ),
              2: (
                <SentimentNeutralIcon sx={{ color: "yellow", fontSize: 28 }} />
              ),
              3: (
                <SentimentSatisfiedAltIcon
                  sx={{ color: "green", fontSize: 28 }}
                />
              ),
              4: (
                <SentimentVerySatisfiedIcon
                  sx={{ color: "blue", fontSize: 28 }}
                />
              ),
            }[priority]
          }
        </ListItemIcon>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo" onClick={onButtonClick}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default TodoListItem;
