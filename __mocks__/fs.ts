import { fs } from "memfs";

jest.genMockFromModule("fs");

module.exports = fs;
