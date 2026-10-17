let snackbarRef = null;

export const setSnackbarRef = (ref) => {
  snackbarRef = ref;
};

export const notifySuccess = (message) => {
  if (snackbarRef?.enqueueSnackbar) {
    snackbarRef.enqueueSnackbar(message, { variant: 'success' });
  }
};

export const notifyError = (message) => {
  if (snackbarRef?.enqueueSnackbar) {
    snackbarRef.enqueueSnackbar(message, { variant: 'error' });
  }
};

export const notifyInfo = (message) => {
  if (snackbarRef?.enqueueSnackbar) {
    snackbarRef.enqueueSnackbar(message, { variant: 'info' });
  }
};
