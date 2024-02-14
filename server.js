// const app = require("./app");
// import {app} from "./server.js"

import { app } from './app.js';
const PORT = process.env.PORT || 80


app.listen(PORT, () => {
  console.log(
    `Server is active on ${PORT}`
  );
});