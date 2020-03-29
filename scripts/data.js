const fs = require("fs");
const rimraf = require("rimraf");

const trainings = require("../data/training.json");
trainings.forEach((training, index) => {
  training.id = `tra:${index + 1}`;
});

const basePath = "/v1";
const baseUrl = `https://mockedrestapi.reactgraphql.academy${basePath}`;

const dir = `${__dirname}/../public${basePath}`;
rimraf.sync(dir);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const codes = [
  "banana",
  "garlic",
  "sweetpotato",
  "onion",
  "avocado",
  "spinach",
  "celery",
  "blueberry"
];
const percentages = [5, 20, 35, 50, 60];

/**********************
 * DISCOUNTS
 *  */

let discounts = [];
for (let index = 1; index <= 10; index++) {
  const code = randomItem(codes);
  const discountPercentage = randomItem(percentages);
  const randomTraining = randomItem(trainings);
  const discountId = `dis:${index}`;
  discounts.push({
    id: discountId,
    code: `${code}${discountPercentage}`,
    discountPercentage,
    training: `${baseUrl}/training/${randomTraining.id}` // `${baseUrl}/training/${randomTraining.id}.json`
  });
  randomTraining.discounts.push(`${baseUrl}/discount/${discountId}`); // `${baseUrl}/discount/${discountId}.json`
}

const discountPath = `${dir}/discount`;
fs.mkdirSync(discountPath);
const discountIndexPath = `${discountPath}.json`;
fs.writeFileSync(discountIndexPath, JSON.stringify(discounts, null, 4));

discounts.forEach(discount => {
  const path = `${discountPath}/${discount.id}.json`;
  fs.writeFileSync(path, JSON.stringify(discount, null, 4));
});

/**********************
 * TRAINING
 *  */

const trainingPath = `${dir}/training`;
fs.mkdirSync(trainingPath);

const trainingIndexPath = `${trainingPath}.json`;
fs.writeFileSync(trainingIndexPath, JSON.stringify(trainings, null, 4));

trainings.forEach(training => {
  const path = `${trainingPath}/${training.id}.json`;
  fs.writeFileSync(path, JSON.stringify(training, null, 4));
});
