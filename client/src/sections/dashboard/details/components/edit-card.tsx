import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

// -------------------------------------------------------------

interface EditCardProps {
  title: string;
  message: string | undefined;
  children: React.ReactNode;
}

// -------------------------------------------------------------

export function EditCard({ title, message, children }: EditCardProps) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">{title}</Typography>
        {message && <Alert severity="error">{message}</Alert>}
        {children}
      </Stack>
    </Card>
  );
}
