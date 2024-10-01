import { z } from "zod";

export const mySchema = z.object({
    username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }).min(3, {message: "Username harus lebih dari 3 huruf!"}),
    password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(3, {message: "Password harus lebih dari 3 huruf!"})
  })

export const quesionerValidation = z.object({
    // kepentingan_kebersihan: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    // kinerja_kebersihan: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    // komentar_kebersihan: z.string({invalid_type_error: "Kinerja must a string"}).optional(),
    
    // kepentingan_sopan_santun: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    // kinerja_sopan_santun: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    // komentar_sopan_santun: z.string({invalid_type_error: "Kinerja must a string"}).optional(),
    
    kepentingan_kebersihan_mobil: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kebersihan_mobil: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kebersihan_mobil: z.string({invalid_type_error: "Kinerja must a string"}).optional(),
    
    kepentingan_kelengkapan_alat_mobil: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kelengkapan_alat_mobil: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kelengkapan_alat_mobil: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_kebersihan_kelas_mengemudi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kebersihan_kelas_mengemudi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kebersihan_kelas_mengemudi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_kelengkapan_alat_kelas_mengemudi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kelengkapan_alat_kelas_mengemudi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kelengkapan_alat_kelas_mengemudi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_performa_alat_kelas_mengemudi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_performa_alat_kelas_mengemudi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_performa_alat_kelas_mengemudi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    // lembaga kursus start

    kepentingan_kebersihan_lembaga_kursus: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kebersihan_lembaga_kursus: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kebersihan_lembaga_kursus: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_kelengkapan_alat_lembaga_kursus: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_kelengkapan_alat_lembaga_kursus: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_kelengkapan_alat_lembaga_kursus: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_performa_alat_lembaga_kursus: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_performa_alat_lembaga_kursus: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_performa_alat_lembaga_kursus: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    // lembaga kursus end
    
    // staff lembaga kursus start

    kepentingan_etika_sopan_santun: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_etika_sopan_santun: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_etika_sopan_santun: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_pelayanan_administrasi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_pelayanan_administrasi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_pelayanan_administrasi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_pelayanan_jadwal_belajar: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_pelayanan_jadwal_belajar: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_pelayanan_jadwal_belajar: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    // staff lembaga kursus end

    // mentor lembaga kursus start

    kepentingan_etika_sopan_santun_mentor_mengemudi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_etika_sopan_santun_mentor_mengemudi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_etika_sopan_santun_mentor_mengemudi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_pembawaan_materi_belajar_mentor_mengemudi: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_pembawaan_materi_belajar_mentor_mengemudi: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_pembawaan_materi_belajar_mentor_mengemudi: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    // mentor lembaga kursus end

    kepentingan_performa_alat_mobil: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_performa_alat_mobil: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_performa_alat_mobil: z.string({invalid_type_error: "Kinerja must a string"}).optional(),

    kepentingan_performa_mobil: z.number({required_error: "Kepentingan is require", invalid_type_error: "Kepentingan must a number"}).lte(5).gte(1),
    kinerja_performa_mobil: z.number({required_error: "Kinerja is require", invalid_type_error: "Kinerja must a number"}).lte(5).gte(1),
    komentar_performa_mobil: z.string({invalid_type_error: "Kinerja must a string"}).optional(),
    
    id_siswa: z.number(),
    
  })

export const tambahDataSiswaSchema = z.object({
    nama : z.string().min(3, {message: "nama harus lebih dari 3 huruf!"}),
    gender: z.string(),
    phoneNumber: z.number().gte(12)
}).required()

export const updateDataSiswaSchema = z.object({
  id: z.number(),
  nama : z.string().min(3, {message: "nama harus lebih dari 3 huruf!"}),
  gender: z.string(),
  phoneNumber: z.number().gte(12)
}).required()

export const checkPhoneNumberZod = z.object({
  phoneNumber: z.number({invalid_type_error: "Kami mengharapkan angka, tapi anda memasukkan huruf",required_error: "ok"}).gte(12, {message: "Inputan tidak boleh kosong atau kurang dari 12 angka, "})
}).required()
