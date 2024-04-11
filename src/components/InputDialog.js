import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

const InputDialog = ({
  open,
  setOpen,
  todo,
  setTodo,
  description,
  setDescription,
  handleAdd,
}) => {
  const [error, setError] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleClose = () => {
    setTodo("");
    setDescription("");
    setError(false);
    setOpen(false);
  };

  const handleAddClick = async () => {
    if (todo) {
      try {
        await handleAdd();
        setSuccessAlertOpen(true);
        handleClose();
      } catch {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="Todo Item"
            type="text"
            fullWidth
            variant="outlined"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
            error={error}
            helperText={error ? "Todo item cannot be empty" : ""}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          Todo item added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InputDialog;
