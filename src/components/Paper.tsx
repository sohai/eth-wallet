import { Sheet, SheetProps } from "@mui/joy";

export default function Paper({ sx, ...other }: SheetProps) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "sm",
        p: 2,
        mb: 3,
        backgroundColor: "background.componentBg",
        width: "100%",
        ...sx,
      }}
      {...other}
    />
  );
}
