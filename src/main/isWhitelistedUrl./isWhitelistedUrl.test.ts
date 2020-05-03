import { getIsDevelopment as getIsDevelopment_ } from "_m/getIsDevelopment";
import { isWhitelistedUrl } from "./isWhitelistedUrl";
import { getAppRoot } from "../getAppRoot";

const getIsDevelopment = getIsDevelopment_ as jest.Mock;

jest.mock("_m/getIsDevelopment", () => ({
  getIsDevelopment: jest.fn(),
}));

describe("isWhitelistedUrl", () => {
  describe("during development", () => {
    beforeAll(() => {
      getIsDevelopment.mockImplementation(() => true);
    });

    it("allows requests to specific google domains to install extensions", () => {
      expect(isWhitelistedUrl("https://clients2.googleusercontent.com")).toBe(
        true,
      );
      expect(isWhitelistedUrl("https://clients2.google.com")).toBe(true);
    });

    it("allows devtools", () => {
      expect(isWhitelistedUrl("devtools://devtools/one")).toBe(true);
    });

    it("allows Chrome extensions", () => {
      expect(isWhitelistedUrl("chrome-extension://redux-devtools")).toBe(true);
      expect(isWhitelistedUrl("blob:chrome-extension://hniebl")).toBe(true);
    });

    it("allows localhost for something like Hot Module Replacement", () => {
      expect(isWhitelistedUrl("http://localhost/some.json")).toBe(true);
    });

    it("allows files from the same app directory as Orange", () => {
      expect(isWhitelistedUrl(`file://${getAppRoot()}/okay.json`)).toBe(true);
    });

    it("blocks everything else", () => {
      expect(isWhitelistedUrl("http://google.com/some.json")).toBe(false);
      expect(isWhitelistedUrl("ftp://google.com/some.json")).toBe(false);
      expect(isWhitelistedUrl("blob://hello/some.json")).toBe(false);
    });
  });

  describe("during production", () => {
    beforeAll(() => {
      getIsDevelopment.mockImplementation(() => false);
    });

    it("allows files from the same app directory as Orange", () => {
      expect(isWhitelistedUrl(`file://${getAppRoot()}/okay.json`)).toBe(true);
    });

    it("blocks everything else", () => {
      expect(isWhitelistedUrl("http://google.com/some.json")).toBe(false);
      expect(isWhitelistedUrl("ftp://google.com/some.json")).toBe(false);
      expect(isWhitelistedUrl("blob://hello/some.json")).toBe(false);
    });
  });
});
