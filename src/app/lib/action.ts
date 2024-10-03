'use server'
import { Gender, PrismaClient } from '@prisma/client'
import { signIn } from '../../../auth'
import { redirect } from 'next/navigation'
import { CheckNumberPhone, Item, Login, State, tambahDataSiswaInterface } from './interface'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache.js'
import { prisma } from '@/app/lib/prismaClient'
import { checkPhoneNumberZod, mySchema, quesionerValidation, tambahDataSiswaSchema, updateDataSiswaSchema } from './schemaZod'

export async function main() {
    const allUsers = await prisma.kebersihan.findMany()
}

export async function getData(){
  const allUsers = await prisma.score.findMany()
  return allUsers
}


export async function addBlue(formData: FormData){
  const data = {
    banting: Number(formData.get('banting')),
    tendang: Number(formData.get('tendang'))
  }
  const allUsers = await prisma.score.update({
    where: {
      id: 1
    },
    data:{
      biru: data.banting,
      merah: 0
    }
  })
  return allUsers
}

 export async function getUserFromDb(username: string, password: string): Promise<Login>{
  try {
    const [result] = await prisma.admin.findMany({
    where: {
      username: username,
      password: password
    },
  })

  if(!result){
    throw Error('Username dan password anda salah')
  }
  return {
    success: true,
    data: {
      username: result.username,
    password: result.password
    }
  };
  } catch (error) {
    if(error instanceof Error){
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'An unknown error occurred',
      };
    }
  }
 }

export async function login(prevState: Login, formData: FormData): Promise<Login|undefined>{

  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const admin = {
    username: username,
    password: password
  }

  const result = mySchema.safeParse(admin)
  if(!result.success){
    const message = {
      errors: result.error.flatten().fieldErrors
    }
    return message
  }else{
    const hasil = await getUserFromDb(username, password)
    if(hasil.success === false){
    return {
      success: hasil.success,
      error: hasil.error
  }
  }else{
    try {
      await signIn("credentials", {
        ...Object.fromEntries(formData),
        callbackUrl: "/admin",
        redirect: true,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${"/error-page"}?error=${error.type}`);
      }
      throw error;
    }
}}
}

export async function handleSignIn(formData: FormData){
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      callbackUrl: "/admin",
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${"/error-page"}?error=${error.type}`);
    }
    throw error;
  }
}
  
  export async function createQuesionerAnswer(prevState:State , formData: FormData): Promise<State>{
          // const arrayNamaLayanandanFasilitasValidasi = [
          //   {
          //     propertiValidasi : "kebersihan"
          //   },
          //   {
          //     propertiValidasi : "sopan_santun"
          //   },
          //   {
          //     propertiValidasi : "kebersihan_mobil"
          //   },
          //   {
          //     propertiValidasi : "kelengkapan_alat_mobil"
          //   },
          //   {
          //     propertiValidasi : "performa_alat_mobil"
          //   },
          //   {
          //     propertiValidasi : "performa_mobil"
          //   },
          //   {
          //     propertiValidasi : "kebersihan_kelas"
          //   },
          //   {
          //     propertiValidasi : "kelengkapan_alat_kelas"
          //   },
          //   {
          //     propertiValidasi : "performa_alat_kelas"
          //   },
          // ]

      const answerQuesioner = quesionerValidation.safeParse({
          // kepentingan_kebersihan: Number(formData.get('kepentingan-kebersihan')),
          // kinerja_kebersihan : Number(formData.get('kinerja-kebersihan')),
          // komentar_kebersihan : formData.get('komentar-kebersihan'),

          // kepentingan_sopan_santun: Number(formData.get('kepentingan-sopan-santun')),
          // kinerja_sopan_santun : Number(formData.get('kinerja-sopan-santun')),
          // komentar_sopan_santun : formData.get('komentar-sopan-santun'),

          kepentingan_kebersihan_mobil: Number(formData.get('kepentingan-kebersihan-mobil')),
          kinerja_kebersihan_mobil : Number(formData.get('kinerja-kebersihan-mobil')),
          komentar_kebersihan_mobil : formData.get('komentar-kebersihan-mobil'),

          kepentingan_kelengkapan_alat_mobil: Number(formData.get('kepentingan-kelengkapan-alat-mobil')),
          kinerja_kelengkapan_alat_mobil : Number(formData.get('kinerja-kelengkapan-alat-mobil')),
          komentar_kelengkapan_alat_mobil : formData.get('komentar-kelengkapan-alat-mobil'),

          kepentingan_kebersihan_kelas_mengemudi: Number(formData.get('kepentingan-kebersihan-kelas-mengemudi')),
          kinerja_kebersihan_kelas_mengemudi : Number(formData.get('kinerja-kebersihan-kelas-mengemudi')),
          komentar_kebersihan_kelas_mengemudi : formData.get('komentar-kebersihan-kelas-mengemudi'),

          kepentingan_kelengkapan_alat_kelas_mengemudi: Number(formData.get('kepentingan-kelengkapan-alat-kelas-mengemudi')),
          kinerja_kelengkapan_alat_kelas_mengemudi : Number(formData.get('kinerja-kelengkapan-alat-kelas-mengemudi')),
          komentar_kelengkapan_alat_kelas_mengemudi : formData.get('komentar-kelengkapan-alat-kelas-mengemudi'),

          kepentingan_performa_alat_kelas_mengemudi: Number(formData.get('kepentingan-performa-alat-kelas-mengemudi')),
          kinerja_performa_alat_kelas_mengemudi : Number(formData.get('kinerja-performa-alat-kelas-mengemudi')),
          komentar_performa_alat_kelas_mengemudi : formData.get('komentar-performa-alat-kelas-mengemudi'),

          // lembaga kursus start

          kepentingan_kebersihan_lembaga_kursus: Number(formData.get('kepentingan-kebersihan-lembaga-kursus')),
          kinerja_kebersihan_lembaga_kursus : Number(formData.get('kinerja-kebersihan-lembaga-kursus')),
          komentar_kebersihan_lembaga_kursus : formData.get('komentar-kebersihan-lembaga-kursus'),

          kepentingan_kelengkapan_alat_lembaga_kursus: Number(formData.get('kepentingan-kelengkapan-alat-lembaga-kursus')),
          kinerja_kelengkapan_alat_lembaga_kursus : Number(formData.get('kinerja-kelengkapan-alat-lembaga-kursus')),
          komentar_kelengkapan_alat_lembaga_kursus : formData.get('komentar-kelengkapan-alat-lembaga-kursus'),

          kepentingan_performa_alat_lembaga_kursus: Number(formData.get('kepentingan-performa-alat-lembaga-kursus')),
          kinerja_performa_alat_lembaga_kursus : Number(formData.get('kinerja-performa-alat-lembaga-kursus')),
          komentar_performa_alat_lembaga_kursus : formData.get('komentar-performa-alat-lembaga-kursus'),
          
          // lembaga kursus end

          // staff lembaga kursus start

          kepentingan_etika_sopan_santun: Number(formData.get('kepentingan-etika-sopan-santun')),
          kinerja_etika_sopan_santun : Number(formData.get('kinerja-etika-sopan-santun')),
          komentar_etika_sopan_santun : formData.get('komentar-etika-sopan-santun'),

          kepentingan_pelayanan_administrasi: Number(formData.get('kepentingan-pelayanan-administrasi')),
          kinerja_pelayanan_administrasi : Number(formData.get('kinerja-pelayanan-administrasi')),
          komentar_pelayanan_administrasi : formData.get('komentar-pelayanan-administrasi'),

          kepentingan_pelayanan_jadwal_belajar: Number(formData.get('kepentingan-pelayanan-jadwal-belajar')),
          kinerja_pelayanan_jadwal_belajar : Number(formData.get('kinerja-pelayanan-jadwal-belajar')),
          komentar_pelayanan_jadwal_belajar : formData.get('komentar-pelayanan-jadwal-belajar'),
          
          // staff lembaga kursus end

          // mentor lembaga kursus start

          kepentingan_etika_sopan_santun_mentor_mengemudi: Number(formData.get('kepentingan-etika-sopan-santun-mentor-mengemudi')),
          kinerja_etika_sopan_santun_mentor_mengemudi : Number(formData.get('kinerja-etika-sopan-santun-mentor-mengemudi')),
          komentar_etika_sopan_santun_mentor_mengemudi : formData.get('komentar-etika-sopan-santun-mentor-mengemudi'),

          kepentingan_pembawaan_materi_belajar_mentor_mengemudi: Number(formData.get('kepentingan-pembawaan-materi-belajar-mentor-mengemudi')),
          kinerja_pembawaan_materi_belajar_mentor_mengemudi : Number(formData.get('kinerja-pembawaan-materi-belajar-mentor-mengemudi')),
          komentar_pembawaan_materi_belajar_mentor_mengemudi : formData.get('komentar-pembawaan-materi-belajar-mentor-mengemudi'),
          
          // mentor lembaga kursus end

          kepentingan_performa_alat_mobil: Number(formData.get('kepentingan-performa-alat-mobil')),
          kinerja_performa_alat_mobil : Number(formData.get('kinerja-performa-alat-mobil')),
          komentar_performa_alat_mobil : formData.get('komentar-performa-alat-mobil'),

          kepentingan_performa_mobil: Number(formData.get('kepentingan-performa-mobil')),
          kinerja_performa_mobil : Number(formData.get('kinerja-performa-mobil')),
          komentar_performa_mobil : formData.get('komentar-performa-mobil'),

          id_siswa : Number(formData.get("id-siswa"))
      })

      if (!answerQuesioner.success) {
          return{
              success: false,
              errors: answerQuesioner.error.flatten().fieldErrors,
              message: 'Missing fields or someting wrong with your input, failed to send your answers'
          }
      }
      const scriptRegex = /(<script.*?>[\s\S]*?<\/script>|\b(eval|setTimeout|setInterval)\(.*?\)|data:image\/svg\+xml;.*?base64.*?>)/gi;
      const isInvalid = scriptRegex.test(answerQuesioner.data?.komentar_kebersihan_mobil as string) || scriptRegex.test(answerQuesioner.data?.komentar_kelengkapan_alat_mobil as string) || scriptRegex.test(answerQuesioner.data?.komentar_performa_alat_mobil as string) || scriptRegex.test(answerQuesioner.data?.komentar_performa_mobil as string) || scriptRegex.test(answerQuesioner.data?.komentar_kebersihan_kelas_mengemudi as string) || scriptRegex.test(answerQuesioner.data?.komentar_kelengkapan_alat_kelas_mengemudi as string) || scriptRegex.test(answerQuesioner.data?.komentar_performa_alat_kelas_mengemudi as string) || scriptRegex.test(answerQuesioner.data?.komentar_kebersihan_lembaga_kursus as string) || scriptRegex.test(answerQuesioner.data?.komentar_kelengkapan_alat_lembaga_kursus as string) || scriptRegex.test(answerQuesioner.data?.komentar_performa_alat_lembaga_kursus as string) || scriptRegex.test(answerQuesioner.data?.komentar_etika_sopan_santun as string) || scriptRegex.test(answerQuesioner.data?.komentar_pelayanan_administrasi as string) || scriptRegex.test(answerQuesioner.data?.komentar_pelayanan_jadwal_belajar as string) || scriptRegex.test(answerQuesioner.data?.komentar_etika_sopan_santun_mentor_mengemudi as string) || scriptRegex.test(answerQuesioner.data?.komentar_pembawaan_materi_belajar_mentor_mengemudi as string);


      if(isInvalid){
          return{
              success: false,
              message : "Invalid characters detected. Please enter only allowed characters."
          }
      }
      try {
          // const komentarKebersihan = answerQuesioner?.data.komentar_kebersihan;
          // const komentarSopanSantun = answerQuesioner?.data.komentar_sopan_santun;
          const komentarKebersihanMobil= answerQuesioner?.data.komentar_kebersihan_mobil;
          const komentarKelengkapanAlatMobil= answerQuesioner?.data.komentar_kelengkapan_alat_mobil;
          const komentarPerformaAlatMobil= answerQuesioner?.data.komentar_performa_alat_mobil;
          const komentarPerformaMobil= answerQuesioner?.data.komentar_performa_mobil;
          const komentarKebersihanKelasMengemudi= answerQuesioner?.data.komentar_kebersihan_kelas_mengemudi;
          const komentarKelengkapanAlatKelasMengemudi= answerQuesioner?.data.komentar_kelengkapan_alat_kelas_mengemudi;
          const komentarPerformaAlatKelasMengemudi= answerQuesioner?.data.komentar_performa_alat_kelas_mengemudi;
          const komentarKebersihanLembagaKursus= answerQuesioner?.data.komentar_kebersihan_lembaga_kursus;
          const komentarKelengkapanAlatLembagaKursus= answerQuesioner?.data.komentar_kelengkapan_alat_lembaga_kursus;
          const komentarPerformaAlatLembagaKursus= answerQuesioner?.data.komentar_performa_alat_lembaga_kursus;
          const komentarEtikaSopanSantun= answerQuesioner?.data.komentar_etika_sopan_santun;
          const komentarEtikaSopanSantunMentorMengemudi= answerQuesioner?.data.komentar_etika_sopan_santun_mentor_mengemudi;
          const komentarPembawaanMateriBelajarMentorMengemudi= answerQuesioner?.data.komentar_pembawaan_materi_belajar_mentor_mengemudi;
          const komentarPelayananAdministrasi= answerQuesioner?.data.komentar_pelayanan_administrasi;
          const komentarPelayananJadwalBelajar= answerQuesioner?.data.komentar_pelayanan_jadwal_belajar;


          // await prisma.kebersihan.create({
          //     data : {
          //         kepentingan: answerQuesioner.data.kepentingan_kebersihan,
          //         kinerja: answerQuesioner.data.kinerja_kebersihan,
          //         komentar: komentarKebersihan || null,
          //     }
          // });
          // await prisma.sopan_santun.create({
          //     data : {
          //         kepentingan: answerQuesioner.data.kepentingan_sopan_santun,
          //         kinerja: answerQuesioner.data.kinerja_sopan_santun,
          //         komentar: komentarSopanSantun || null,
          //     }
          // })
          await prisma.kebersihan_mobil.create({
            data : {
                kepentingan: answerQuesioner.data.kepentingan_kebersihan_mobil,
                kinerja: answerQuesioner.data.kinerja_kebersihan_mobil,
                komentar: komentarKebersihanMobil || null,
            }
        });
        await prisma.kelengkapan_alat_mobil.create({
          data : {
              kepentingan: answerQuesioner.data.kepentingan_kelengkapan_alat_mobil,
              kinerja: answerQuesioner.data.kinerja_kelengkapan_alat_mobil,
              komentar: komentarKelengkapanAlatMobil || null,
          }
      });
      await prisma.performa_alat_mobil.create({
        data : {
            kepentingan: answerQuesioner.data.kepentingan_performa_alat_mobil,
            kinerja: answerQuesioner.data.kinerja_performa_alat_mobil,
            komentar: komentarPerformaAlatMobil || null,
        }
      });
      await prisma.performa_mobil.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_performa_mobil,
          kinerja: answerQuesioner.data.kinerja_performa_mobil,
          komentar: komentarPerformaMobil || null,
        }
      });
      await prisma.kebersihan_kelas_mengemudi.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_kebersihan_kelas_mengemudi,
          kinerja: answerQuesioner.data.kinerja_kebersihan_kelas_mengemudi,
          komentar: komentarKebersihanKelasMengemudi || null,
        }
      });
      await prisma.kelengkapan_alat_kelas_mengemudi.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_kelengkapan_alat_kelas_mengemudi,
          kinerja: answerQuesioner.data.kinerja_kelengkapan_alat_kelas_mengemudi,
          komentar: komentarKelengkapanAlatKelasMengemudi || null,
        }
      });
      await prisma.performa_alat_kelas_mengemudi.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_performa_alat_kelas_mengemudi,
          kinerja: answerQuesioner.data.kinerja_performa_alat_kelas_mengemudi,
          komentar: komentarPerformaAlatKelasMengemudi || null,
        }
      });
      await prisma.kebersihan_lembaga_kursus.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_kebersihan_lembaga_kursus,
          kinerja: answerQuesioner.data.kinerja_kebersihan_lembaga_kursus,
          komentar: komentarKebersihanLembagaKursus || null,
        }
      });
      await prisma.kelengkapan_alat_lembaga_kursus.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_kelengkapan_alat_lembaga_kursus,
          kinerja: answerQuesioner.data.kinerja_kelengkapan_alat_lembaga_kursus,
          komentar: komentarKelengkapanAlatLembagaKursus || null,
        }
      });
      await prisma.performa_alat_lembaga_kursus.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_performa_alat_lembaga_kursus,
          kinerja: answerQuesioner.data.kinerja_performa_alat_lembaga_kursus,
          komentar: komentarPerformaAlatLembagaKursus || null,
        }
      });
      await prisma.etika_SopanSantun.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_etika_sopan_santun,
          kinerja: answerQuesioner.data.kinerja_etika_sopan_santun,
          komentar: komentarEtikaSopanSantun || null,
        }
      });
      await prisma.pelayanan_administrasi.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_pelayanan_administrasi,
          kinerja: answerQuesioner.data.kinerja_pelayanan_administrasi,
          komentar: komentarPelayananAdministrasi || null,
        }
      });
      await prisma.pelayanan_jadwal_belajar.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_pelayanan_jadwal_belajar,
          kinerja: answerQuesioner.data.kinerja_pelayanan_jadwal_belajar,
          komentar: komentarPelayananJadwalBelajar || null,
        }
      });
      await prisma.etika_sopan_santun_mentor.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_etika_sopan_santun_mentor_mengemudi,
          kinerja: answerQuesioner.data.kinerja_etika_sopan_santun_mentor_mengemudi,
          komentar: komentarEtikaSopanSantunMentorMengemudi || null,
        }
      });
      await prisma.pembawaan_materi_belajar_mentor.create({
        data : {
          kepentingan: answerQuesioner.data.kepentingan_pembawaan_materi_belajar_mentor_mengemudi,
          kinerja: answerQuesioner.data.kinerja_pembawaan_materi_belajar_mentor_mengemudi,
          komentar: komentarPembawaanMateriBelajarMentorMengemudi || null,
        }
      });

      await prisma.siswaKursusMengemudi.update({
        where: {
          id: answerQuesioner.data.id_siswa,
        },
        data:{
          status: true
        }
      })

      console.log(answerQuesioner.data.id_siswa, "id siswa from action")
      } catch (error) {
          console.error(error);
          return{
              success: false,
              message: 'Someting wrong, input data is Failed'
          }
      }
      revalidatePath('/admin')
      redirect('/thanks')
  }
  
  export async function getAllQuesionerAnswer(){
      function getAverangeValue(arr: Item[], name: string): {kepentingan: number, kinerja: number, nama: string, komentar: (string|null)[]}{
          const totalKepentingan = arr.reduce((sum: number, item) => sum + item.kepentingan, 0)
          const rataRataKepentingan = (totalKepentingan / arr.length).toFixed(1);
          const totalKinerja = arr.reduce((sum: number, item) => sum + item.kinerja, 0)
          const rataRataKinerja = (totalKinerja / arr.length).toFixed(1);
          let fiveKomentar: (string|null)[] = [];
          arr.map((data, index) => {
              index >= (arr.length - 5) ? fiveKomentar.push(data.komentar) : null
          })
          return {
              nama : name,
              kepentingan : Number(rataRataKepentingan),
              kinerja: Number(rataRataKinerja),
              komentar: fiveKomentar
          }
      }
      // const kebersihan = await prisma.kebersihan.findMany();
      const kebersihan_mobil = await prisma.kebersihan_mobil.findMany();
      const kelengkapan_alat_mobil = await prisma.kelengkapan_alat_mobil.findMany();
      const kebersihan_kelas_mengemudi = await prisma.kebersihan_kelas_mengemudi.findMany();
      const kelengkapan_alat_kelas_mengemudi = await prisma.kelengkapan_alat_kelas_mengemudi.findMany();
      const performa_alat_kelas_mengemudi = await prisma.performa_alat_kelas_mengemudi.findMany();
      const kebersihan_lembaga_kursus = await prisma.kebersihan_lembaga_kursus.findMany();
      const kelengkapan_alat_lembaga_kursus = await prisma.kelengkapan_alat_lembaga_kursus.findMany();
      const performa_alat_lembaga_kursus = await prisma.performa_alat_lembaga_kursus.findMany();
      const performa_alat_mobil = await prisma.performa_alat_mobil.findMany();
      const performa_mobil = await prisma.performa_mobil.findMany();
      // const sopan_santun = await prisma.sopan_santun.findMany();    
      const etika_sopan_santun = await prisma.etika_SopanSantun.findMany();    
      const etika_sopan_santun_mentor_mengemudi = await prisma.etika_sopan_santun_mentor.findMany();    
      const pembawaan_materi_belajar_mentor_mengemudi = await prisma.pembawaan_materi_belajar_mentor.findMany();    
      const pelayanan_administrasi = await prisma.pelayanan_administrasi.findMany();    
      const pelayanan_jadwal_belajar = await prisma.pelayanan_jadwal_belajar.findMany();    


      // const kordinatKebersihan = getAverangeValue(kebersihan, "Kebersihan")
      const kordinatKebersihanMobil = getAverangeValue(kebersihan_mobil, "Kebersihan Mobil")
      const kordinatKelengkapanAlatMobil = getAverangeValue(kelengkapan_alat_mobil, "Kelengkapan Alat Mobil")
      const kordinatKebersihanKelasMengemudi = getAverangeValue(kebersihan_kelas_mengemudi, "Kebersihan Kelas Mengamudi")
      const kordinatKelengkapanAlatKelasMengemudi = getAverangeValue(kelengkapan_alat_kelas_mengemudi, "Kelengkapan Alat Kelas Mengemudi")
      const kordinatPerformaAlatKelasMengemudi = getAverangeValue(performa_alat_kelas_mengemudi, "Performa Alat Kelas Mengemudi")
      const kordinatKebersihanLembagaKursus = getAverangeValue(kebersihan_lembaga_kursus, "Kebersihan Lembaga Kursus")
      const kordinatKelengkapanAlatLembagaKursus = getAverangeValue(kelengkapan_alat_lembaga_kursus, "Kelengkapan Alat Lembaga Kursus")
      const kordinatPerformaAlatLembagaKursus = getAverangeValue(performa_alat_lembaga_kursus, "Performa Alat Lembaga Kursus")
      const kordinatPerformaAlatMobil = getAverangeValue(performa_alat_mobil, "Performa Alat Mobil")
      const kordinatPerformaMobil = getAverangeValue(performa_mobil, "Performa Mobil")
      // const kordinatSopanSantun = getAverangeValue(sopan_santun, "Sopan Santun")
      const kordinatEtikaSopanSantun = getAverangeValue(etika_sopan_santun, "Etika dan Sopan Santun")
      const kordinatPelayananAdministrasi = getAverangeValue(pelayanan_administrasi, "Pelayanan Administrasi")
      const kordinatPelayananJadwalBelajar = getAverangeValue(pelayanan_jadwal_belajar, "Pelayanan Jadwal Belajar")
      const kordinatEtikaSopanSantunMentorMengemudi = getAverangeValue(etika_sopan_santun_mentor_mengemudi, "Etika dan Sopan Santun Mentor Mengemudi")
      const kordinatPembawaanMateriBelajarMentorMengemudi = getAverangeValue(pembawaan_materi_belajar_mentor_mengemudi, "Pembawaan Materi Belajar Mentor Megemudi")
  
      const sumbuY = [
        // kordinatKebersihan.kepentingan, 
        kordinatKebersihanMobil.kepentingan, 
        // kordinatSopanSantun.kepentingan, 
        kordinatKelengkapanAlatMobil.kepentingan, 
        kordinatPerformaAlatMobil.kepentingan, 
        kordinatPerformaMobil.kepentingan, 
        kordinatKebersihanKelasMengemudi.kepentingan, 
        kordinatKelengkapanAlatKelasMengemudi.kepentingan, 
        kordinatPerformaAlatKelasMengemudi.kepentingan,
        kordinatKebersihanLembagaKursus.kepentingan, 
        kordinatKelengkapanAlatLembagaKursus.kepentingan, 
        kordinatPerformaAlatLembagaKursus.kepentingan,
        kordinatEtikaSopanSantun.kepentingan,
        kordinatPelayananAdministrasi.kepentingan,
        kordinatPelayananJadwalBelajar.kepentingan,
        kordinatEtikaSopanSantunMentorMengemudi.kepentingan,
        kordinatPembawaanMateriBelajarMentorMengemudi.kepentingan,
        3.5, 5, 4]


      const sumbux = [
        // kordinatKebersihan.kinerja, 
        kordinatKebersihanMobil.kinerja, 
        // kordinatSopanSantun.kinerja, 
        kordinatKelengkapanAlatMobil.kinerja, 
        kordinatPerformaAlatMobil.kinerja, 
        kordinatPerformaMobil.kinerja, 
        kordinatKebersihanKelasMengemudi.kinerja, 
        kordinatKelengkapanAlatKelasMengemudi.kinerja, 
        kordinatPerformaAlatKelasMengemudi.kinerja,
        kordinatKebersihanLembagaKursus.kinerja, 
        kordinatKelengkapanAlatLembagaKursus.kinerja, 
        kordinatPerformaAlatLembagaKursus.kinerja,
        kordinatEtikaSopanSantun.kinerja,
        kordinatPelayananAdministrasi.kinerja,
        kordinatPelayananJadwalBelajar.kinerja,
        kordinatEtikaSopanSantunMentorMengemudi.kinerja,
        kordinatPembawaanMateriBelajarMentorMengemudi.kinerja,
        4, 4, 5]
  
      function getSumbuYX(sumbuY: number[], sumbuX: number[]): {sumbuY : number, sumbuX: number}{
          const totalSumbuY = sumbuY.reduce((sum: number, item) => sum + item, 0)
          const rataRataSumbuY = (totalSumbuY / sumbuY.length).toFixed(1);
          const totalSumbuX = sumbuX.reduce((sum: number, item) => sum + item, 0)
          const rataRataSumbuX = (totalSumbuX / sumbuX.length).toFixed(1);
          return {
              sumbuY : Number(rataRataSumbuY),
              sumbuX: Number(rataRataSumbuX)
          }
      }
  
      const garisPerbatasan = getSumbuYX(sumbuY, sumbux);
  
      return{
          // kebersihan: kordinatKebersihan,
          kebersihanMobil: kordinatKebersihanMobil,
          kelengkapanAlatMobil: kordinatKelengkapanAlatMobil,
          kebersihanKelasMengemudi: kordinatKebersihanKelasMengemudi,
          kelengkapanAlatKelasMengemudi: kordinatKelengkapanAlatKelasMengemudi,
          performaAlatKelasMengemudi: kordinatPerformaAlatKelasMengemudi,
          kebersihanLembagaKursus: kordinatKebersihanLembagaKursus,
          kelengkapanAlatLembagaKursus: kordinatKelengkapanAlatLembagaKursus,
          performaAlatLembagaKursus: kordinatPerformaAlatLembagaKursus,
          performaAlatMobil: kordinatPerformaAlatMobil,
          performaMobil: kordinatPerformaMobil,
          // sopanSantun: kordinatSopanSantun,
          etikaSopanSantun: kordinatEtikaSopanSantun,
          pelayananAdministrasi: kordinatPelayananAdministrasi,
          pelayananJadwalBelajar: kordinatPelayananJadwalBelajar,
          etikaSopanSantunMentorMengemudi: kordinatEtikaSopanSantunMentorMengemudi,
          pembawaanMateriBelajarMentorMengemudi: kordinatPembawaanMateriBelajarMentorMengemudi,
          garisPerbatasan: garisPerbatasan
      }
  }

  export async function tambahDataSiswa(prevState: tambahDataSiswaInterface, formData: FormData): Promise<tambahDataSiswaInterface>{
    const siswa = {
      nama : formData.get("nama-siswa"),
      gender : formData.get("gender"),
      number : formData.get("phoneNumber"),
    }
    try{
    const dataSiswa = tambahDataSiswaSchema.safeParse({
      nama: siswa.nama as string,
      gender: siswa.gender as string,
      phoneNumber: Number(siswa.number),
      
    })

    if(dataSiswa.success === false){
      return {
        success: false,
        errors: dataSiswa.error.flatten().fieldErrors
      }
    }
    console.log(dataSiswa)

    await prisma.siswaKursusMengemudi.create({
      data: {
        name: dataSiswa.data.nama,
        gender: dataSiswa.data.gender as Gender,
        phoneNumber: String(dataSiswa.data.phoneNumber),
        status: false,
      }
    })

    return {
      success: true,
      data : {
      nama: siswa.nama as string,
      gender: siswa.gender as string,
      phoneNumber: Number(siswa.number)
      }
    }
  }catch(error){
      if(error instanceof Error){
        return {
          success: false,
          error: error.message
        }
      }else{
        return {
          success: false,
          error: "Terjadi Kesalahan"
        }
      }
    }finally{
      revalidatePath('/admin')
    }
}


export async function getDataSiswa(page: number){
try {
  console.log(page, " page in action")
  const totalData = await prisma.siswaKursusMengemudi.count()
  const take = 10
  const totalPage = Math.ceil(totalData/take)
  if(page < 1){
    throw new Error("Halaman tidak diketahui") 
  }
    if(page > totalPage){
    throw new Error("Halaman tidak diketahui") 
  }
  const skip = (page - 1)*take;
  const datas = await prisma.siswaKursusMengemudi.findMany({
    take: take,
    skip: skip
  })
  return {success: true, data: datas, totalSiswa: totalData,totalPages : totalPage}
} catch (error) {
  if(error instanceof Error){
    console.error(error.message, " error message ini action");
    return {success: false, message : error.message}
  }
}
}

export async function deleteSiswa(id: number){
  try {
    const data = await prisma.siswaKursusMengemudi.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    if(error instanceof Error){
      console.error(error)
      return error
    }else{
      return `Error tidak dikenali`
    }
  }finally{
    revalidatePath('/admin')
  }
}

export async function updateDataSiswa( prevState: tambahDataSiswaInterface, formData: FormData): Promise<tambahDataSiswaInterface> {
  const siswa = {
    id : formData.get("id"),
    nama : formData.get("nama-siswa"),
    gender : formData.get("gender"),
    number : formData.get("phoneNumber"),
  }
  try{
  const dataSiswa = updateDataSiswaSchema.safeParse({
    id: Number(siswa.id),
    nama: siswa.nama as string,
    gender: siswa.gender as string,
    phoneNumber: Number(siswa.number),
    
  })

  if(dataSiswa.success === false){
    return {
      success: false,
      errors: dataSiswa.error.flatten().fieldErrors
    }
  }
  console.log(dataSiswa)

  await prisma.siswaKursusMengemudi.update({
    where:{
      id: dataSiswa.data.id
    },
    data: {
      name: dataSiswa.data.nama,
      gender: dataSiswa.data.gender as Gender,
      phoneNumber: String(dataSiswa.data.phoneNumber),
      status: false,
    }
  })

  return {
success: true,
data : {
 nama: siswa.nama as string,
 gender: siswa.gender as string,
 phoneNumber: Number(siswa.number)
}
}
  }catch(error){
    if(error instanceof Error){
      return {
        success: false,
        error: error.message
      }
    }else{
      return {
        success: false,
        error: "Terjadi Kesalahan"
    }
  }
}finally{
  revalidatePath('/admin')
}
}

export async function checkPhoneNumberSignIn(prevState: CheckNumberPhone, formData: FormData) : Promise<CheckNumberPhone>{
  const phoneNumber = await Number(formData.get("phone-number"));
  const resultCheckPhoneNumberZod = checkPhoneNumberZod.safeParse({
    phoneNumber: phoneNumber
  })
  console.log(resultCheckPhoneNumberZod.data)
  if(resultCheckPhoneNumberZod.success === false){
    console.log(resultCheckPhoneNumberZod?.error.flatten().fieldErrors)
    return {
      success: false,
      errorMessage: resultCheckPhoneNumberZod?.error.flatten().fieldErrors.phoneNumber
    }
  }
  const kopi = `${0}${resultCheckPhoneNumberZod.data.phoneNumber}`
  console.log(kopi)
  const resultCheckDataByPrisma = await prisma.siswaKursusMengemudi.findFirst({
    where: {
      phoneNumber: `${resultCheckPhoneNumberZod.data.phoneNumber}`,
      status: false
    }
  })

  if(!resultCheckDataByPrisma){
    return {
      success: false,
      errorMessage: "Nomor anda tidak terdaftar atau anda sudah pernah menjawab quesioner, silahkan hubungi admin!"
    }
  }

  return {
    success: true,
    id: resultCheckDataByPrisma.id,
    name: resultCheckDataByPrisma.name,
    phoneNumber: String(resultCheckDataByPrisma.phoneNumber)
  }
}

export async function checkPhoneNumberInQuesionerPage(id: number){
try{  
  const result = await prisma.siswaKursusMengemudi.findFirst({
    where: {
      id: id
    }
  })
  return result
}catch(error){
    if(error instanceof Error){
      console.log(error)
    }
  }
}