import mongoose from "mongoose";
const dbConnect = (url: string) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => {
      console.log("Received an Error",err);
    });
};
export { dbConnect };
