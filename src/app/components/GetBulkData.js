import fs from "fs";
import https from "https";

export default async function GetBulkData() {
  const downloadLink = await fetch("https://api.scryfall.com/bulk-data");
  const downloadLinkJson = await downloadLink.json();
  const url = downloadLinkJson.data[3]["download_uri"];  

  console.log("Downloading Bulk Data...")
  const file = fs.createWriteStream("bulk-data.json");

  const request = https.get(url, function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});


}
