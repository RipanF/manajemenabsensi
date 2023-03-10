"use strict";

const moment = require("moment");

module.exports = function (Absensi) {
  const cekKaryawan = function (nik) {
    const app = Absensi.app;
    const Karyawan = app.models.Karyawan;
    const karyawan = Karyawan.findOne({
      where: { nik: nik },
    });

    return karyawan;
  };

  // Absen Masuk
  Absensi.masuk = function (nik, cb) {
    cekKaryawan(nik)
      .then((response) => {
        Absensi.create({
          waktu: moment().format(),
          jenis: 1,
          status: 2,
          nik: response.nik,
        });
        cb(null, "Berhasil melakukan absen masuk");
      })
      .catch((err) => {
        cb(err);
      });
  };

  Absensi.remoteMethod("masuk", {
    http: {path: "/masuk", verb: "post"},
    accepts: { arg: "nik", type: "integer" },
    returns: { arg: "message", type: "string" }
  });
  // End Of Absen Masuk

  // Absen Keluar
  Absensi.keluar = function (nik, cb) {
    cekKaryawan(nik)
      .then((response) => {
        Absensi.create({
          waktu: moment().format(),
          jenis: 2,
          status: 2,
          nik: response.nik,
        });
        cb(null, "Berhasil melakukan absen keluar");
      })
      .catch((err) => {
        cb(err);
      });
  };

  Absensi.remoteMethod("keluar", {
    http: {path: "/keluar", verb: "post"},
    accepts: { arg: "nik", type: "integer" },
    returns: { arg: "message", type: "string" }
  });
  // End Of Absen Keluar

  // Cuti
  Absensi.cuti = function (nik, cb) {
    cekKaryawan(nik)
      .then((response) => {
        Absensi.create({
          waktu: moment().format(),
          jenis: 3,
          status: 1,
          nik: response.nik,
        });
        cb(null, "Berhasil mengajukan cuti");
      })
      .catch((err) => {
        cb(err);
      });
  };

  Absensi.remoteMethod("cuti", {
    http: {path: "/cuti", verb: "post"},
    accepts: { arg: "nik", type: "integer" },
    returns: { arg: "message", type: "string" }
  });
  // End Of Cuti

  // Izin
  Absensi.izin = function (nik, cb) {
    cekKaryawan(nik)
      .then((response) => {
        Absensi.create({
          waktu: moment().format(),
          jenis: 4,
          status: 1,
          nik: response.nik,
        });
        cb(null, "Berhasil mengajukan izin");
      })
      .catch((err) => {
        cb(err);
      });
  };

  Absensi.remoteMethod("izin", {
    http: {path: "/izin", verb: "post"},
    accepts: { arg: "nik", type: "integer" },
    returns: { arg: "message", type: "string" }
  });
  // End Of Izin

  // ====================================================

  // Penyetujuan Cuti/Izin
  Absensi.beforeRemote("penyetujuan", function (context, next) {
    const { id } = context.args;
    Absensi.findOne({ where: { id: id } }).then((response) => {
      if (!response) {
        next(new Error("Data Tidak Ditemukan"));
      } else {
        next();
      }
    });
  });

  Absensi.penyetujuan = function (id, cb) {
    Absensi.findOne({ where: { id: id } }).then((response) => {
      response
        .updateAttributes({
          status: 2
        })
        .then(cb(null, "Berhasil Disetujui"))
        .catch((e) => {
          cb(e);
        });
    });
  };

  Absensi.remoteMethod("penyetujuan", {
    http: {
      path: "/penyetujuan",
      verb: "put",
    },
    accepts: { arg: "id", type: "string" },
    returns: { arg: "message", type: "string" },
  });

  // Penolakan Cuti/Izin
  Absensi.beforeRemote("penolakan", function (context, next) {
    const { id } = context.args;
    Absensi.findOne({ where: { id: id } }).then((response) => {
      if (!response) {
        next(new Error("Data Tidak Ditemukan"));
      } else {
        next();
      }
    });
  });

  Absensi.penolakan = function (id, cb) {
    Absensi.findOne({ where: { id: id } }).then((response) => {
      response
        .updateAttributes({
          status: 3
        })
        .then(cb(null, "Berhasil Ditolak"))
        .catch((e) => {
          cb(e);
        });
    });
  };

  Absensi.remoteMethod("penolakan", {
    http: {
      path: "/penolakan",
      verb: "put",
    },
    accepts: { arg: "id", type: "string" },
    returns: { arg: "message", type: "string" },
  });
};
