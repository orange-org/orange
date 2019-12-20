import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

export function installExtensions() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
}
