var admin = require("firebase-admin");
const Excel = require('exceljs')
var serviceAccount = require("./progeni/progeni_service.json");

const progeni = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://progeni-c66a2-default-rtdb.firebaseio.com/"
    },"progeni");

const db = progeni.firestore();

  exports.getData = async function(req,res) {
    
        console.log("hello")

        let workbook = new Excel.Workbook();
    
        let worksheet = workbook.addWorksheet('Participants');
    
        worksheet.columns = [
            {header: 'Name', key: 'name'},
            {header: 'email', key: 'email'},
            {header: 'Phone Number', key: 'phn'},
            {header: 'College', key: 'clg'},
            {header: 'Department', key: 'department'},
            {header: 'Year', key: 'year'},
            {header: 'Events', key: 'event'},
            {header: 'StudentId', key: 'id'},
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