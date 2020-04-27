export const dialog = {
  showMessageBoxSync: jest.fn(),
};

export const resetDialog = () => {
  dialog.showMessageBoxSync.mockReset();
};
