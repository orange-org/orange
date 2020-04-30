/* eslint-disable no-console */
/* istanbul ignore file */
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
  installExtension(extension)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
});
