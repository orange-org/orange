export const dialog = {
  showMessageBoxSync: jest.fn(),

  showOpenDialog: jest.fn(),
};

export const resetDialog = () => {
  dialog.showMessageBoxSync.mockReset();
};
