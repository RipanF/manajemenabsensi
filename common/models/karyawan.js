"use strict";
module.exports = function (Karyawan) {
  Karyawan.validatesUniquenessOf("nik");

  Karyawan.laporan = function (nik, jenis, status, waktuawal, waktuakhir) {

    return Karyawan.aggregate([
      {
        $lookup: {
          from: "Absensi",
          let: { nik: nik },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$nik", "$$nik"] },
                jenis: jenis,
                status: status,
                waktu: {
                  $gte: waktuawal,
                  $lte: waktuakhir,
                },
              },
            },
          ],
          as: "result",
        },
      },
      
      {
        $project: {
          _id: 1,
          nik: 1,
          nama: 1,
          absensi: {
            result: { $size: "$result" }
          },
        },
      },
    ]);
  };

  Karyawan.remoteMethod("laporan", {
    http: {
      path: "/laporan",
      verb: "get",
    },
    accepts: [
      { arg: "nik", type: "integer", required: true },
      { arg: "jenis", type: "string", required: true },
      { arg: "status", type: "string", required: true },
      { arg: "waktuawal", type: "number", required: true },
      { arg: "waktuakhir", type: "number", required: true },
    ],
    returns: {
      arg: "data",
      type: "string",
    },
  });
  
};
