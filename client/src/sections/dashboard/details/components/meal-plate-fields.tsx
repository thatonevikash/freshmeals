import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// -------------------------------------------------------------

interface MealPlateFieldsProps {
  name: string;
  setName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  imgUrl: string;
  setImgUrl: (imgUrl: string) => void;
}

// -------------------------------------------------------------

export function MealPlateFields({
  name,
  setName,
  price,
  setPrice,
  imgUrl,
  setImgUrl,
}: MealPlateFieldsProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
      />
      <TextField
        label="Image URL"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
        fullWidth
      />
    </Stack>
  );
}
