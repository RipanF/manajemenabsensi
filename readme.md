
# Manajemen Absensi

API Manajemen Absensi Karyawan


## Referensi

#### Absensi Masuk

```http
  GET /api/masuk
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nik`     | `integer`| **Required**. NIK Karyawan |

#### Absensi Keluar

```http
  GET /api/keluar
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nik`     | `integer`| **Required**. NIK Karyawan |

#### Absensi Cuti

```http
  GET /api/cuti
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nik`     | `integer`| **Required**. NIK Karyawan |

#### Absensi Izin

```http
  GET /api/izin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nik`     | `integer`| **Required**. NIK Karyawan |

#### Absensi Penyetujuan

```http
  GET /api/penyetujuan
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nik`     | `integer`| **Required**. NIK Karyawan |

#### Laporan

```http
  GET /api/laporan/${nik}/${jenis}/${status}/${waktuawal}/${waktuakhir}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nik`      | `integer` | **Required**. NIK Karyawan |
| `jenis`      | `integer` | **Required**. 1=masuk, 2=keluar, 3=cuti, 4=izin |
| `status`      | `integer` | **Required**. (1=belumproses, 2=disetujui) |
| `waktuawal`      | `timestamp` | **Required**. |
| `waktuakhir`      | `timestamp` | **Required** |

## How To Run

```http
npm install
```

```http
node .
```

## URL to Access

```http
localhost:3000/api
```