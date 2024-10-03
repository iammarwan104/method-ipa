import { $Enums } from "@prisma/client";

   export interface tambahDataSiswaInterface{
    errors?: {
           nama?: string[] | string;
           gender?: string[] | string;
           phoneNumber?: string[] | string;
       };
     success?: boolean | string
     data? : {
      nama: string,
      gender: string,
      phoneNumber: number
     };
     error?: string;
   }


   export interface ScatterData {
    name: string;
    x: number;
    y: number;
    komentars: (string|null)[];
  }
  
  export interface GarisPerbatasan {
    sumbuY : number;
    sumbuX: number;
  }

  export interface Item {
    id: number,
    kepentingan: number,
    kinerja: number,
    komentar: string | null
  }

  export interface Login{
    errors?: {
           username?: string[] | string;
           password?: string[] | string;
       };
     success?: boolean
     data? : {
       username: string;
       password: string;
     };
     error?: string;
   }

  export type State = {
    success?: boolean | null,
    errors? : {
        // kepentingan_kebersihan?: string[] | string,
        // kinerja_kebersihan?: string[] | string,
        // komentar_kebersihan?: string[] | string,

        // kepentingan_sopan_santun?: string[] | string,
        // kinerja_sopan_santun?: string[] | string,
        // komentar_sopan_santun?: string[] | string,

        kepentingan_kebersihan_mobil?: string[] | string,
        kinerja_kebersihan_mobil?: string[] | string,
        komentar_kebersihan_mobil?: string[] | string,

        kepentingan_kelengkapan_alat_mobil?: string[] | string,
        kinerja_kelengkapan_alat_mobil?: string[] | string,
        komentar_kelengkapan_alat_mobil?: string[] | string,

        kepentingan_kebersihan_kelas_mengemudi?: string[] | string,
        kinerja_kebersihan_kelas_mengemudi?: string[] | string,
        komentar_kebersihan_kelas_mengemudi?: string[] | string,

        kepentingan_kelengkapan_alat_kelas_mengemudi?: string[] | string,
        kinerja_kelengkapan_alat_kelas_mengemudi?: string[] | string,
        komentar_kelengkapan_alat_kelas_mengemudi?: string[] | string,

        kepentingan_performa_alat_kelas_mengemudi?: string[] | string,
        kinerja_performa_alat_kelas_mengemudi?: string[] | string,
        komentar_performa_alat_kelas_mengemudi?: string[] | string,

        // lembaga kursus start

        kepentingan_kebersihan_lembaga_kursus?: string[] | string,
        kinerja_kebersihan_lembaga_kursus?: string[] | string,
        komentar_kebersihan_lembaga_kursus?: string[] | string,

        kepentingan_kelengkapan_alat_lembaga_kursus?: string[] | string,
        kinerja_kelengkapan_alat_lembaga_kursus?: string[] | string,
        komentar_kelengkapan_alat_lembaga_kursus?: string[] | string,

        kepentingan_performa_alat_lembaga_kursus?: string[] | string,
        kinerja_performa_alat_lembaga_kursus?: string[] | string,
        komentar_performa_alat_lembaga_kursus?: string[] | string,

        // lembaga kursus end

        // staff lembaga kursus start

        kepentingan_etika_sopan_santun?: string[] | string,
        kinerja_etika_sopan_santun?: string[] | string,
        komentar_etika_sopan_santun?: string[] | string,

        kepentingan_pelayanan_administrasi?: string[] | string,
        kinerja_pelayanan_administrasi?: string[] | string,
        komentar_pelayanan_administrasi?: string[] | string,

        kepentingan_pelayanan_jadwal_belajar?: string[] | string,
        kinerja_pelayanan_jadwal_belajar?: string[] | string,
        komentar_pelayanan_jadwal_belajar?: string[] | string,

        // staff lembaga kursus end

        // mentor lembaga kursus start

        kepentingan_etika_sopan_santun_mentor_mengemudi?: string[] | string,
        kinerja_etika_sopan_santun_mentor_mengemudi?: string[] | string,
        komentar_etika_sopan_santun_mentor_mengemudi?: string[] | string,

        kepentingan_pembawaan_materi_belajar_mentor_mengemudi?: string[] | string,
        kinerja_pembawaan_materi_belajar_mentor_mengemudi?: string[] | string,
        komentar_pembawaan_materi_belajar_mentor_mengemudi?: string[] | string,

        // mentor lembaga kursus end

        kepentingan_performa_alat_mobil?: string[] | string,
        kinerja_performa_alat_mobil?: string[] | string,
        komentar_performa_alat_mobil?: string[] | string,

        kepentingan_performa_mobil?: string[] | string,
        kinerja_performa_mobil?: string[] | string,
        komentar_performa_mobil?: string[] | string,


    },
    message: string | null,
    idSiswa?: string | null
    }

    export interface DataSiswa {
      id: number;
      name: string;
      gender: $Enums.Gender;
      phoneNumber: string;
      status: boolean;
      createdAt: Date
    }

    export interface SWRFetchData {
      totalPages : number,
      totalSiswa : number,
      success: boolean
      data?: DataSiswa[],
      message?:string
    }

    export interface CheckNumberPhone{
      success: boolean | null
      id?: number| null
      phoneNumber?: string | null
      name?: string | null 
      errorMessage? : string[] | string
    }

    export interface Siswa{
      success: boolean;
      data?: {
          id: number;
          name: string;
          gender: $Enums.Gender;
          phoneNumber: string;
          status: boolean;
          createdAt: Date;
      }[];
      totalSiswa?: number;
      totalPages?: number;
      message?: string;
  }
