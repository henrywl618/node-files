import { readFile, readFileSync, writeFile } from "fs";
import axios from "axios";
const args = process.argv;

const cat = (path) => {
  let data = readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    return data;
  });
  return data;
};

const webCat = async (path) => {
  try {
    const resp = await axios.get(path);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

const writeToFile = (output, data) => {
  writeFile(output, data, "utf8", (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Successfully wrote to file!");
  });
};

const runScript = async () => {
  if (args[2] === "--out") {
    const path = process.argv[4];
    const output = process.argv[3];

    try {
      const isURL = new URL(path);
      const data = await webCat(path);

      writeToFile(output, data);
    } catch (err) {
      const data = cat(path);

      writeToFile(output, data);
    }
  } else {
    const path = process.argv[2];

    try {
      const isURL = new URL(path);
      console.log(await webCat(path));
    } catch {
      console.log(cat(path));
    }
  }
};

runScript();
