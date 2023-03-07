import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
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

export default function ProductDelete({ id, url, name }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteProduct = async (id, url) => {
    try {
      await deleteDoc(doc(db, "Products", id));
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      toast.success("Product Deleted Successfully");
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
                Are you sure you want to delete {name}?
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
              <Button
                variant="contained"
                onClick={() => deleteProduct(id, url)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
