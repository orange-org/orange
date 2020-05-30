// import { getIsDevelopment as getIsDevelopment_ } from "_m/getIsDevelopment";
// import { Utils } from "_m/Utils";
// import { UrlGuard } from "./UrlGuard";

// const getIsDevelopment = getIsDevelopment_ as jest.Mock;

// jest.mock("_m/getIsDevelopment", () => ({
//   getIsDevelopment: jest.fn(),
// }));

// describe("UrlGuard.isAllowed", () => {
//   describe("during development", () => {
//     beforeAll(() => {
//       getIsDevelopment.mockImplementation(() => true);
//     });

//     it("allows requests to specific google domains to install extensions", () => {
//       expect(UrlGuard.isAllowed("https://clients2.googleusercontent.com")).toBe(
//         true,
//       );
//       expect(UrlGuard.isAllowed("https://clients2.google.com")).toBe(true);
//     });

//     it("allows devtools", () => {
//       expect(UrlGuard.isAllowed("devtools://devtools/one")).toBe(true);
//     });

//     it("allows Chrome extensions", () => {
//       expect(UrlGuard.isAllowed("chrome-extension://redux-devtools")).toBe(
//         true,
//       );
//       expect(UrlGuard.isAllowed("blob:chrome-extension://hniebl")).toBe(true);
//     });

//     it("allows localhost for something like Hot Module Replacement", () => {
//       expect(UrlGuard.isAllowed("http://localhost/some.json")).toBe(true);
//     });

//     it("allows files from the same app directory as Orange", () => {
//       expect(UrlGuard.isAllowed(`file://${Utils.getAppRoot()}/okay.json`)).toBe(
//         true,
//       );
//     });

//     it("blocks everything else", () => {
//       expect(UrlGuard.isAllowed("http://google.com/some.json")).toBe(false);
//       expect(UrlGuard.isAllowed("ftp://google.com/some.json")).toBe(false);
//       expect(UrlGuard.isAllowed("blob://hello/some.json")).toBe(false);
//     });
//   });

//   describe("during production", () => {
//     beforeAll(() => {
//       getIsDevelopment.mockImplementation(() => false);
//     });

//     it("allows files from the same app directory as Orange", () => {
//       expect(UrlGuard.isAllowed(`file://${Utils.getAppRoot()}/okay.json`)).toBe(
//         true,
//       );
//     });

//     it("blocks everything else", () => {
//       expect(UrlGuard.isAllowed("http://google.com/some.json")).toBe(false);
//       expect(UrlGuard.isAllowed("ftp://google.com/some.json")).toBe(false);
//       expect(UrlGuard.isAllowed("blob://hello/some.json")).toBe(false);
//     });
//   });
// });
