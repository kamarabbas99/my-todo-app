import { Paper } from "@mui/material";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Card,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Todo = ({ arr, bgColor, editClick }) => {
  return (
    <Paper
      elevation={1.5}
      sx={{ margin: "auto", overflow: "hidden", marginTop: 4 }}
    >
      <Card
        sx={{
          width: "85%",
          mx: "auto",
          bgcolor: bgColor,
        }}
      >
        <List>
          <ListItem
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText
              primary={arr.item.todo}
              secondary={arr.item.description}
              sx={{
                textAlign: "left",
                flex: 1,
                m: "auto",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexShrink: 0,
                m: "auto",
              }}
            >
              <IconButton onClick={() => editClick(arr)} aria-label="edit todo">
                <Avatar sx={{ bgcolor: "white" }}>
                  <EditIcon style={{ opacity: 0.9, color: "#ef5350" }} />
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteDoc(doc(db, "todos", arr.id));
                }}
                aria-label="delete todo"
              >
                <Avatar sx={{ bgcolor: "white" }}>
                  <DeleteIcon style={{ opacity: 0.9, color: "#ef5350" }} />
                </Avatar>
              </IconButton>
            </Box>
          </ListItem>
        </List>
      </Card>
    </Paper>
  );
};
export default Todo;
