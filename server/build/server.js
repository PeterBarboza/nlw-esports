import express from "express";
const app = express();
app.get("/users", (req, res) => {
    console.log("Acessou");
    res.json({ message: "Hello" });
});
app.listen(3333);
