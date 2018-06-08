const fs = require('fs');
// const Database = require('../services/Database');
// const mongoose = require('mongoose');
// const keys = require('../config/keys');

// const db = new Database();

const counter = { };

const patientFileNames = fs.readdirSync(`${__dirname}/../data/fhir`);
patientFileNames.forEach(patientFileName => {
  // console.log('~~~~~~~~~~~~~~~~~~~');
  // console.log(patientFileName.split('.')[0].replace(/[0-9]/g, '').split('_').join(' '));
  // console.log('first name: ' + patientFileName.split('.')[0].replace(/[0-9]/g, '').split('_').join(' ').split(' ')[1]);
  // console.log('last name: ' + patientFileName.split('.')[0].replace(/[0-9]/g, '').split('_').join(' ').split(' ')[0]);
  
  const patient = require(`../data/fhir/${patientFileName}`);
  patient.entry.forEach(resourceEntry => {
    
    if (!counter[resourceEntry.resource.resourceType]) {
      counter[resourceEntry.resource.resourceType] = 1;
    } else {
      counter[resourceEntry.resource.resourceType]++;
    }

    // if (resourceEntry.resource.resourceType === 'MedicationRequest') {
    //   console.log('********************************************************************************************')
    //   // console.log(resourceEntry.resource);
    //   for (i in resourceEntry.resource) {
    //     // if (i==='extension') {
    //     //   console.log('<><><><><><><><><><><><><><>');
    //     //   console.log(i);
    //     //   console.log(resourceEntry.resource[i][0].valueCodeableConcept.text);
    //     // }
    //     if (i==='status') {
    //       console.log('<><><><><><><><><><><><><><>');
    //       console.log(resourceEntry.resource[i]);
    //     }
    //   }
    // }

    // DO DOKONCZENIA
    // if (resourceEntry.resource.resourceType === 'Observation') {
    //   console.log('********************************************************************************************')
    //   // console.log(resourceEntry.resource);
    //   for (i in resourceEntry.resource) {
    //     // if (i==='valueQuantity') {
    //       console.log('<><><><><><><><><><><><><><>');
    //       console.log(i);
    //     //   console.log(resourceEntry.resource[i][0].valueCodeableConcept.text);
    //     // }
    //     // if (i==='status') {
    //       // console.log('<><><><><><><><><><><><><><>');
    //       console.log(resourceEntry.resource[i]);
    //     // }
    //   }
    // }

    if (resourceEntry.resource.resourceType === 'MedicationRequest') {
      console.log(resourceEntry.resource.resourceType);
      console.log('********************************************************************************************')
      // console.log(resourceEntry.resource);
      for (i in resourceEntry.resource) {
        // if (i==='id') {
        //   console.log('<><><><><><><><><><><><><><>');
        // if (i.category)
          // console.log(resourceEntry.resource[i].category);
        //   console.log(resourceEntry.resource[i][0].valueCodeableConcept.text);
        // }
        // if (i==='status') {
          console.log('<><><><><><><><><><><><><><>');
          console.log(i);
          console.log(resourceEntry.resource[i]);
          console.log('<><><><><><><><><><><><><><>');
        }
      // }
    }

    // if (resourceEntry.resource.resourceType === 'Observation') {
    //   if (resourceEntry.resource.code)
    //   if (resourceEntry.resource.code.text == 'Body Weight') {
    //     // console.log(resourceEntry.resource.code.text);
    //   }
    //   if (resourceEntry.resource.valueQuantity) {
    //     if (resourceEntry.resource.code.text == 'Body Weight') {
    //       // console.log(resourceEntry.resource.valueQuantity.value);
    //     }
    //   }
    // }
    
  });
  // console.log(patient.entry);
  process.exit();
});

// console.log(counter);


// mongoose.connect(keys.mongoURI, () => {
  // console.log('Successfully connected to DB!');

  // Fill Lego Sets collection
  // if (FILLING_LEGO_SETS) {
    // const legoSetsImages = require('../data/lego-sets.json');
    // const legoSetsFileNames = fs.readdirSync(__dirname + '/../data/sets/');
    // legoSetsFileNames.forEach(legoSetFileName => {
    //   legoSetFile = fs.readFileSync(`${__dirname}/../data/sets/${legoSetFileName}`, 'utf-8');
    //   let legoSet = { bricks: [] };
    //   try {
    //     let tmp = JSON.parse(legoSetFile);
    //     legoSet.legoSetID = tmp.Product.ProductNo;
    //     legoSet.name = tmp.Product.ProductName;
    //     legoSet.tags = legoSet.name.toLowerCase().split(' ');
    //     legoSet.imageURL = tmp.ImageBaseUrl + tmp.Product.Asset;
    //     tmp.Bricks.forEach(brick => {
    //       let tmpBrick = {};
    //       tmpBrick.id = brick.DesignId;
    //       tmpBrick.name = brick.ItemDescr;
    //       tmpBrick.imageURL = tmp.ImageBaseUrl + brick.Asset;
          
    //       // magic math, don't even bother
    //       if (Math.random() < 0.2) tmpBrick.quantity = Math.ceil(Math.random()*9);
    //       else tmpBrick.quantity = Math.ceil(Math.random()*3);
    //       legoSet.bricks.push(tmpBrick);
    //     });
    //     // db.addLegoSet(legoSet);


    //     /* !!!!!! PART FOR ADDING USER COLLECTION PROJECTS !!!!!!! */
    //     if (Math.random() < 0.05) {
    //       const project = {
    //         legoSetID: legoSet.legoSetID,
    //         ownedBricks: [],
    //         lastModified: new Date(),
    //         isActive: true,
    //         isFavourite: false          
    //       }
    //       tmp.Bricks.forEach(brick => {
    //         let tmpBrick = {};
    //         tmpBrick.brickID = brick.DesignId;
    //         tmpBrick.quantity = 0;
    //         project.ownedBricks.push(tmpBrick);
    //       });
    //       db.addProject(project);
    //       // console.log(project);
    //     }
    //      /* !!!!!! PART FOR ADDING USER COLLECTION PROJECTS !!!!!!! */

    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
    // console.log('Filled Lego Sets collection!');
  // }

  // if (FILLING_BRICKS) {
  //   const bricksFileNames = fs.readdirSync(`${__dirname}/../data/bricks/`);
  //   bricksFileNames.forEach(brickFileName => {
  //     brickFile = fs.readFileSync(`${__dirname}/../data/bricks/${brickFileName}/README.md`, 'utf-8').split('\n');
  //     let brick = {
  //       brickID: brickFile[1].split(' ')[1],
  //       name: brickFile[0].substring(2),
  //       imageURL: brickFile[2].substring(brickFile[2].indexOf('(')+1, brickFile[2].length - 1)
  //     };
  //     db.addBrick(brick);
  //   });
  // }
  
// });