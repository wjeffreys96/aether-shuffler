import fs from 'fs';
import https from 'https';
import path from 'path';

const downloadFile = (url, filePath) => {
  const file = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve();
        });
      });
    }).on('error', (error) => {
      fs.unlink(filePath, () => {
        reject(error);
      });
    });
  });
};

const replaceFile = () => {
  try {
    if (fs.existsSync('./data/bulkData.json')) {
      fs.unlinkSync('./data/bulkData.json');
    }
    fs.renameSync('./data/bulkData.json.temp', './data/bulkData.json');
    console.log('File replaced successfully');
  } catch (error) {
    console.error(`Failed to replace file: ${error}`);
  }
};

export default async function GetBulkData() {
  const url = "https://api.scryfall.com/bulk-data";
  const fileName = 'bulkData.json';
  const tempFileName = `${fileName}.temp`;
  const dataDir = path.join(__dirname, '..', 'data');
  const oldFilePath = path.join(dataDir, fileName);
  const tempFilePath = path.join(dataDir, tempFileName);

  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    await downloadFile(url, tempFilePath);
    replaceFile(oldFilePath, tempFilePath);
    fs.unlinkSync(tempFilePath);
    console.log('File replaced successfully');
  } catch (error) {
    console.error(error);
    console.log('Failed to replace file');
  }
};
