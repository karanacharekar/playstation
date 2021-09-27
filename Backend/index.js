const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = 12300;

let featureFlags = [{name: "useAwesomeGames", value: 11}, {name: "useNewFeature", value: 0}, {name: "Identity_Information", value:3}];
let validateRequest = (flag) => {
    if (!flag || flag.name === undefined || flag.value === undefined) {
        console.log("HERE");
        return false
    }
    if (typeof flag.name !== "string") {
        return false
    }
    return (typeof flag.value === "number")
}

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/featureflags', (req, res) => res.json(featureFlags));
app.post('/featureflags', (req, res) => {
    if (!validateRequest(req.body)) {
        res.status(400)
        res.json({message: "invalid flag body should look like:  \"{ \"name\": \"string\", \"value\": 2}\" ", code: 0})
        return;
    }
    for (let i = 0; i < featureFlags.length; i++) {
        if (featureFlags[i].name === req.body.name) {
            featureFlags[i].value = req.body.value
            res.json(featureFlags)
            return;
        }
    }
    featureFlags.push({name: req.body.name, value: req.body.value})
    res.json(featureFlags)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
