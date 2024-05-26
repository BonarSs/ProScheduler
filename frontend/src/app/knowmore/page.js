import React from "react";
import Navbar from "../../../components/navbar_landingpage";
import Footer from "../../../components/footer";
import styles from "./KnowMore.module.css";

const KnowMore = () => {
  return (
    <div style={{
      background: "linear-gradient(180deg, rgba(255,255,255,1) 35%, rgba(251,176,244,1) 78%)",
    }}>
      <Navbar />
      <div className="py-10 px-5 md:py-20 md:px-10 lg:py-24 lg:px-25 lg:my:5 lg:px-20">
        <h1 className="text-4xl font-bold mb-10 text-center md:mb-16 lg:mb-20" style={{ background: "-webkit-linear-gradient(320deg, rgba(42,128,240,1) 12%, rgba(254,78,238,1) 30%, rgba(72,57,143,1) 69%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Project Timeline Wizardry <br /> in Your Fingertips
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div className={styles.blueBackground + " px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 rounded-lg"}>
            <h2 className="text-2xl font-semibold mb-4">First Column</h2>
            <p>
            Memberikan rekomendasi penjadwalan dan alokasi tugas berdasarkan analisis AI.
            Membantu merencanakan jadwal proyek dan alokasi sumber daya dengan efisien.
            Dapat disesuaikan dengan kebutuhan pengguna dan beradaptasi dengan perubahan proyek.
            </p>
          </div>
          <div className={styles.pinkBackground + " px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 rounded-lg"}>
            <h2 className="text-2xl font-semibold mb-4">Second Column</h2>
            <p>
            Menyediakan platform untuk memantau kinerja proyek secara real-time.
            Memudahkan akses informasi tentang kemajuan proyek, pencapaian milestone, dan estimasi waktu tersisa.
            Membantu identifikasi masalah selama pelaksanaan proyek dan pengambilan tindakan yang diperlukan.
            </p>
          </div>
        </div>
        <div className={styles.purpleBackground + " px-6 py-10 mt-10 md:mt-16 lg:mt-20 rounded-lg"}>
          <h2 className="text-2xl font-semibold mb-4">Another Content Column</h2>
          <p>
          Mengukur kinerja proyek dan memberikan wawasan untuk meningkatkan efisiensi di masa mendatang.
          Mengidentifikasi area di mana efisiensi dapat ditingkatkan melalui analisis data.
          Membantu optimalisasi penggunaan sumber daya, pengurangan biaya, dan peningkatan kesuksesan proyek.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <img src="/images/logolandingpage.png" alt="Company Logo" width="400" height="400" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KnowMore;
