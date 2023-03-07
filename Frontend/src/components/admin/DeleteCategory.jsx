import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { colors } from "../../Styles/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteCategory({ id, category }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteCategory = async (id, url) => {
    try {
      await deleteDoc(doc(db, "Category", id));

      toast.success("Category Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Tooltip title="Delete">
        <Button onClick={handleOpen}>
          <DeleteIcon sx={{ color: "red" }} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{}}>
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="red"
              >
                Delete
              </Typography>
              <Divider />
            </Box>

            <Box>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, bgcolor: colors.lightpink }}
              >
                Are you sure you want to delete {category}?
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 5 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ bgcolor: "grey", "&:hover": { bgcolor: "grey" } }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={() => deleteCategory(id)}>
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
