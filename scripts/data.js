const fs = require("fs");
const rimraf = require("rimraf");

const trainings = require("../data/training.json");
const basePath = "/api/rest";
const baseUrl = `https://restapi.reactgraphql.academy${basePath}`;

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
const percentages = [5, 10, 20, 35];

/**********************
 * DISCOUNTS
 *  */

let discounts = [];
for (let index = 1; index <= 10; index++) {
  const code = randomItem(codes);
  const discountPercentage = randomItem(percentages);
  const randomTraining = randomItem(trainings);
  const discountId = `dis:${index + 420}`;
  discounts.push({
    id: discountId,
    code: `${code}${discountPercentage}`,
    discountPercentage,
    expiresOn: "2017-12-31T07:00:00.000Z",
    training: `${baseUrl}/trainings/${randomTraining.id}` // `${baseUrl}/training/${randomTraining.id}.json`
  });
  randomTraining.discounts.push(`${baseUrl}/discounts/${discountId}`); // `${baseUrl}/discount/${discountId}.json`
}

const discountPath = `${dir}/discounts`;
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

const trainingPath = `${dir}/trainings`;
fs.mkdirSync(trainingPath);

const trainingIndexPath = `${trainingPath}.json`;
fs.writeFileSync(trainingIndexPath, JSON.stringify(trainings, null, 4));

trainings.forEach(training => {
  const path = `${trainingPath}/${training.id}.json`;
  fs.writeFileSync(path, JSON.stringify(training, null, 4));
});
