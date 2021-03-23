const readline = require('readline');
const fs = require('fs');

exports.flatten = async (inFile, outFile) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(inFile),
    console: false
  });

  readInterface.on("line", line => {
    if(!line.includes("-->") && line != "" && !line.includes("WEBVTT")){
      if(line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) line += "\n\n";
      else line += " ";

      if(!outFile) process.stdout.write(line);
      else fs.appendFileSync(outFile, line);
    }
  });
}
