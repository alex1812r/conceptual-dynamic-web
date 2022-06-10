import { useMemo } from "react";
import { 
  DialogProps,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Divider, 
  DialogActions,
  useTheme
} from "@mui/material";

export interface DialogFormProps extends Omit<DialogProps, 'onSubmit'> {
  title: string;
  buttonCancelText?: string;
  buttonSubmitText?: string;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  disabledSubmit?: boolean;
  submiting?: boolean;
}

export const DialogForm: React.FC<DialogFormProps> = ({
  title,
  buttonSubmitText,
  buttonCancelText,
  onClose,
  onSubmit,
  disabledSubmit,
  submiting,
  children,
  ...restProps
}): JSX.Element => {
  const { palette } = useTheme()

  const submitLoader = useMemo(() => {
    return submiting ? (
      <CircularProgress
        size="1rem" 
        style={{
          color: palette.common.white,
          marginRight: 5
        }}
      />
    ) : null;
  }, [palette.common.white, submiting]);

  return (
    <Dialog {...restProps}>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Typography variant="h5" style={{ margin: 0 }}>
            {title}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {buttonCancelText}
          </Button>
          <Button type="submit" disabled={disabledSubmit}>
            {submitLoader}
            {buttonSubmitText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

DialogForm.defaultProps = {
  buttonSubmitText: 'Save',
  buttonCancelText: 'Cancel',
  disabledSubmit: false,
  submiting: false,
};
