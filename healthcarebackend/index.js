const express = require('express');
const bodyParser = require('body-parser'); // Correct import
const cors = require('cors');
const { userRouter } = require("./routes/userRouter");
const { docterRouter } = require("./routes/docterRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

const port = 3100;

app.use('/user', userRouter);
app.use('/docter', docterRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
