import express from "express";
import cors from "cors";
import router from "./router.js";
const App = express();

App.use(cors());
App.use(express.json());
App.use("/muhibGPT", router);

const PORT = 3000;
App.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
