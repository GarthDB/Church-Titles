import Handlebars from "handlebars";
import parse from "csv-parse/lib/sync.js";
import filenamify from "filenamify";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";
import path from "path";

const outputDir = path.resolve("./output");

const dataCSV = await readFile("data.csv", "utf8");
const data = parse(dataCSV, {
  columns: true,
  trim: true,
});

Handlebars.registerHelper("upperCase", (aString) => aString.toUpperCase());

try {
  const source = await readFile("src/titles.svg", "utf8");
  const template = Handlebars.compile(source);
  data.forEach((item, i) => {
    item.name = item[Object.keys(item)[0]];
    const svgRaw = template(item);
    const count = i++ < 9 ? `0${i++}` : i++;
    const filename = `${count} - ${filenamify(item.name)}.svg`;
    const file = path.join(outputDir, filename);
    const outputSVG = writeFileSync(file, svgRaw);
  });
} catch (err) {
  console.error(err);
}
