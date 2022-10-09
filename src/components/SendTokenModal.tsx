import { Modal, ModalClose, Sheet, Typography, ModalProps } from "@mui/joy";
import { ReactNode } from "react";

type SendTokenModal = {
  tokenSymbol: string;
  children: ReactNode;
} & ModalProps;

export default function SendTokenModal({
  tokenSymbol,
  children,
  ...other
}: SendTokenModal) {
  return (
    <Modal
      aria-labelledby="Send token"
      aria-describedby="Send token modal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...other}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Send {tokenSymbol} to
        </Typography>
        {children}
      </Sheet>
    </Modal>
  );
}
