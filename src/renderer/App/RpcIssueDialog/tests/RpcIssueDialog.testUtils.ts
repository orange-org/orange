import { screen } from "@testing-library/dom";

export const pageElements = {
  rpcIssueDialogOpen: () => screen.findByTestId("rpcIssueDialog-open"),

  rpcIssueDialogClosed: () => screen.findByTestId("rpcIssueDialog-closed"),

  connectionStatusReport: () => screen.findByTestId("connectionStatusReport"),

  unauthorizedMessage: () => screen.findByTestId("unauthorizedMessage"),

  rpcSettingsInDialog: () => screen.findByTestId("rpcSettingsInDialog"),

  useDefaultSettings: () =>
    screen.findByTestId("rpcSettingsForm-useDefaultSettings"),

  useCookieAuthentication: () =>
    screen.findByTestId("rpcSettingsForm-useCookieAuthentication"),

  cookieFile: () => screen.findByTestId("rpcSettingsForm-cookieFile"),

  rpcSettingsSaveButton: () => screen.findByTestId("rpcSettingsSaveButton"),

  enterServerDetails: () => screen.findByTestId("enterServerDetails"),

  username: () => screen.findByTestId("rpcSettingsForm-username"),

  password: () => screen.findByTestId("rpcSettingsForm-password"),

  connectionStatusReportCloseButton: () =>
    screen.findByTestId("connectionStatusReport-closeButton"),
};
