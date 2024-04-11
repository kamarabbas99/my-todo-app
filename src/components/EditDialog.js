// EditDialog.js
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

function EditDialog({
  open,
  setOpen,
  todo,
  setTodo,
  description,
  setDescription,
  onSave,
}) {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleClose = () => {
    setTodo("");
    setDescription("");
    setOpen(false);
  };

  const handleEditClick = async () => {
    if (todo) {
      console.log("Set current todoTo:", todo);
      try {
        await onSave();
        setSuccessAlertOpen(true);
        handleClose();
      } catch {}
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo Item"
            type="text"
            fullWidth
            variant="outlined"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <TextField
            margin="dense"
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
          <Button onClick={handleEditClick} color="primary">
            Save
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
          severity="info"
          sx={{ width: "100%" }}
        >
          Item updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditDialog;
