import { Button } from '@mui/material';

export function CustomButton(props) {
  return (
    <Button variant="contained" color="primary" {...props}>
      Click Me
    </Button>
  );
}
