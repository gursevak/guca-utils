const anvaad = require('anvaad-js');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _cliProgress = require('cli-progress');




/////// INPUT DATA HERE //////////////

const intputFileName = 'gursevak.csv';
const numberofLinesInFile = 60613
const outputFileName = 'output.csv';

///////// CSV DATA HERE //////////////

const headerData = [
    {id: 'id', title: 'ID'},
    {id: 'gurmukhi', title: 'Gurmukhi'},
    {id: 'unicode', title: 'Unicode'},
    {id: 'devnagri', title: 'Devnagri'},
    {id: 'english', title: 'English'},
  ];

/////////////////////////////////////



const csvWriter = createCsvWriter({
  path: outputFileName,
  header: headerData,
  encoding: 'utf-8'
});
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
const data = [];
count = 0;
bar1.start(numberofLinesInFile, 0);

fs.createReadStream(intputFileName)
  .pipe(csv())
  .on('data', (row) => {



    ///////// MATCH CSV DATA ABOVE ///////
    const item = {
      id: row['id'],
      gurmukhi: row['gurbani'],
      unicode: anvaad.unicode(row['gurbani']),
      devnagri: anvaad.translit(row['gurbani'], 'devnagri'),
      english: anvaad.translit(row['gurbani'], 'english'),
    };
    /////////////////////////////////////
    //https://github.com/KhalisFoundation/anvaad-js


    data.push(item);
    bar1.update(count++);
  })
  .on('end', () => {
    bar1.stop();
    console.log('Finished transliteration');
    csvWriter
      .writeRecords(data)
      .then(()=> console.log('Output file written to '+outputFileName));
  });
