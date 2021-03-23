const readline = require('readline');
const fs = require('fs');

async function main(){
  if(process.argv.length >= 3){
    const readInterface = readline.createInterface({
      input: fs.createReadStream(process.argv[2]),
      console: false
    });

    readInterface.on("line", line => {
      if(!line.includes("-->") && line != "" && !line.includes("WEBVTT")){
        if(line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) line += "\n\n";
        else line += " ";

        if(process.argv == 3) process.stdout.write(line);
        else fs.appendFileSync(process.argv[3], line);
      }
    });
  } else {
    console.error("usage: node index.js [input file] [output file (optional)]");
  }
}

main();
