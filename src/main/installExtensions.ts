import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

export function installExtensions() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
}
