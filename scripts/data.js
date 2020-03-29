const fs = require("fs");
const trainings = require("../data/training.json");

const dir = `${__dirname}/../public`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const trainingPath = `${dir}/training`;
if (!fs.existsSync(trainingPath)) {
  fs.mkdirSync(trainingPath);
}

const trainingIndexPath = `${trainingPath}/index.json`;
fs.writeFileSync(trainingIndexPath, JSON.stringify(trainings, null, 4));

trainings.forEach(training => {
  const path = `${trainingPath}/${training.id}.json`;
  fs.writeFileSync(path, JSON.stringify(training, null, 4));
});
