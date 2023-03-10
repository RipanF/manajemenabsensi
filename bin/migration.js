var path = require("path");

var app = require(path.resolve(__dirname, "../server/server"));
var ds = app.datasources.MyDB;

const migrateAbsensi = function (nik) {
  ds.automigrate("Absensi", function (err) {
    if (err) throw err;

    let absensi = [
      {
        waktu: Date.Now(),
        status: 1,
        jenis : 3,
        nik: nik,
      },
    ];

    app.models.Absensi.create(absensi, function (err, model) {
      if (err) throw err;
      console.log("Created:", model);
    });
  });
};

ds.automigrate("Karyawan", function (err) {
  if (err) throw err;

  var karyawans = [
    {
      nik: 163510619,
      name: "Ripan Fauzi",
    },
    {
      nik: 163510618,
      name: "Fauzi Ripan",
    },
  ];

  var count = karyawans.length;

  karyawans.forEach(function (karyawan) {
    app.models.Karyawan.create(karyawan, function (err, model) {
      if (err) throw err;

      console.log("Created:", model);

      migrateAbsensi(model.nik);

      count--;
      if (count === 0) {
        ds.disconnect;
      }
    });
  });
});
