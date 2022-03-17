var admin = require("firebase-admin");
const Excel = require('exceljs')
var serviceAccount = require("./service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://synergy-9a9cb-default-rtdb.firebaseio.com"
    });

const db = admin.firestore();

  exports.getData = async function(req,res) {
    
        let workbook = new Excel.Workbook();
    
        let worksheet = workbook.addWorksheet('Participants');
    
        worksheet.columns = [
            {header: 'Name', key: 'name'},
            {header: 'email', key: 'email'},
            {header: 'Phone Number', key: 'phone'},
            {header: 'College', key: 'college'},
            {header: 'Department', key: 'department'},
            {header: 'Year', key: 'year'},
            {header: 'Events', key: 'events'},
            {header: 'StudentId', key: 'id'},
            {header: 'Accomodation', key: 'accomodation'},
    
        ]
    
        worksheet.getRow(1).font = {bold: true}


        const snapshot = await db.collection('students').get();
        snapshot.forEach((doc,index) => {
                const rowIndex = index + 2
                let e = doc.data()
                worksheet.addRow({
                ...e,
                })
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "Participants List.xlsx"
          );
          return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
          });
          
    }