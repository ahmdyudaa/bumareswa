import React, { useState } from 'react';
import Header from './Header';

interface Chapter {
  id: string;
  title: string;
  color: string;
  description: string;
  subchapters: Subchapter[];
}

interface Subchapter {
  id: string;
  title: string;
  content: string;
}

const eduContent: Chapter[] = [
  {
    id: "burnout",
    title: "Burnout",
    color: "bg-rose-400",
    description: "Pahami apa itu burnout dan bagaimana mengenalinya",
    subchapters: [
      {
        id: "pengertian",
        title: "Apa itu Burnout?",
        content: "Burnout sendiri merupakan kondisi mental yang sudah mencakup kelelahan secara fisik. Mari kenali lebih lanjut tentang burnout dalam bacaan berikut ini!\n\nBurnout itu apa sih sebenarnya? yuk kenali Burnout secara rinci, berikut adalah penjelasannya\n\nMenurut Kamus American Psychological Association yang dikutip dari website Cleveland Clinic, burnout adalah kelelahan secara fisik, emosional, atau mental yang disertai dengan penurunan motivasi, kinerja, dan munculnya sikap negatif terhadap diri sendiri maupun orang lain.\n\nSeseorang tidak menyadari bahwa dirinya mengalami burnout sampai terlambat, terutama ketika mereka terbiasa menyibukkan dirinya. Biasanya, burnout terjadi ketika seseorang sudah merasa lelah berlebihan sehingga tidak mampu bekerja. Burnout juga terjadi ketika tidak ada lagi keseimbangan antara kerja dan kehidupan pribadi alias work-life balance.\n\nSering ngerasa capek terus menerus? bisa jadi itu burnout, bukan cuma stres. Yuk, kenali bedanya!\n\nBurnout tidak sama dengan stres, meskipun sama-sama menggambarkan kondisi mental yang menurun ketika kita bekerja. Stres atau kelelahan biasa dialami oleh banyak orang dalam kehidupan pekerjaannya setiap hari. Stres juga menandakan bahwa seseorang mengambil tanggung jawab yang cukup banyak untuk diembannya, tetapi mereka tidak mengalami kelelahan emosional.\n\nSedangkan burnout adalah stres yang sudah menumpuk selama beberapa periode waktu bekerja. Bisa dibayangkan bahwa burnout lebih besar daripada stres. Burnout adalah siklus emosi negatif yang membuat seseorang menarik diri. Burnout juga muncul karena seseorang menginvestasikan terlalu banyak emosi, intelektual, bahkan fisik pekerjaan tanpa adanya upaya untuk memulihkan diri mereka."
      },
      {
        id: "penyebab",
        title: "Penyebab Burnout",
        content: "Jangan tunggu burnout menguasai harimu. Pelajari penyebabnya dan ambil langkah bijak hari ini.\n\nFaktor Internal:\n1. Jenis kelamin – Perempuan cenderung lebih rentan mengalami burnout dibandingkan laki-laki.\n2. Usia – Individu pada rentang usia dewasa muda (20–30 tahun) lebih sering mengalami burnout.\n3. Tingkat pendidikan – Seseorang dengan tingkat pendidikan yang lebih rendah cenderung lebih rentan terhadap burnout.\n\nFaktor Eksternal:\n1. Beban kerja – Tugas dan tanggung jawab yang berlebihan dapat memicu burnout.\n2. Masa kerja – Semakin lama seseorang bekerja di suatu tempat, semakin besar risiko mengalami burnout, terutama jika tidak disertai dengan manajemen stres yang baik.\n3. Tingkat stres – Tingkat stres yang tinggi dan berkelanjutan dalam lingkungan kerja dapat menjadi faktor utama penyebab burnout."
      },
      {
        id: "ciri-ciri",
        title: "Ciri-ciri Burnout",
        content: "Seperti apa ciri-ciri burnout? Anda bisa melihatnya melalui ciri-ciri fisik, psikologis, hingga sosial dan perilakunya. Berikut penjelasan lengkap mengenai berbagai ciri burnout.\n\nCiri-ciri Fisik:\n1. Merasa bahwa badan cepat lelah.\n2. Mengalami kesulitan tidur.\n3. Mengalami perubahan pada nafsu makan.\n\nCiri-ciri Psikologis:\n1. Kekurangan motivasi.\n2. Meragukan diri sendiri.\n3. Cenderung merasa gagal atau kesepian.\n\nCiri-ciri Sosial dan Perilaku:\n1. Isolasi sosial.\n2. Tidak kompeten dalam menjalankan tanggung jawab.\n3. Sering marah karena pekerjaan."
      },
      {
        id: "penanganan",
        title: "Cara Mengatasi Burnout",
        content: "Burnout merupakan kondisi serius yang perlu diatasi dengan segera. Anda bisa mengatasi burnout dengan melakukan berbagai cara di bawah ini.\n\n1. Istirahat dan Rekreasi:\nLuangkan waktu untuk tidur yang cukup dan hindari begadang pada malam hari. Pastikan Anda memiliki waktu luang di akhir pekan untuk melakukan hal-hal yang membuat Anda merasa bahagia dan santai.\n\n2. Olahraga dan Aktivitas Fisik:\nMelibatkan diri dalam olahraga atau aktivitas fisik secara teratur dapat mengurangi stres dan meningkatkan suasana hati. Lakukan jenis olahraga atau kegiatan fisik yang Anda nikmati, seperti berjalan kaki, yoga, atau berenang.\n\n3. Terapi dan Konseling:\nBicaralah dengan terapis atau konselor untuk mendapatkan dukungan emosional dan strategi mengatasi stres. Terapi kognitif perilaku atau terapi percakapan dapat membantu mengatasi pikiran negatif dan emosi yang berkaitan dengan burnout.\n\n4. Mengubah Pola Pikir dan Perilaku:\nSadari pola pikir dan perilaku yang menyebabkan atau memperburuk burnout. Latih diri Anda untuk berpikir positif dan mengelola pikiran negatif serta hindari pemikiran yang berlebihan (overthink) tentang pekerjaan atau kehidupan pribadi.\n\n5. Menjaga Keseimbangan Hidup:\nTemukan keseimbangan antara pekerjaan, kehidupan pribadi, dan waktu untuk diri sendiri alias work-life balance. Tetapkan batas antara waktu kerja dan waktu istirahat. Jangan bawa pekerjaan ke rumah dan berikan diri waktu untuk bersantai dan melakukan hal-hal yang disukai.\n\nKesimpulan:\nIntinya, burnout bukanlah kondisi yang muncul secara tiba-tiba, melainkan stres yang sudah menumpuk sehingga mengurangi produktivitas. Ketika burnout mencapai puncaknya, hal ini tidak hanya ditandai dengan gejala emosional tetapi juga gejala fisik yang intens, seperti sakit kepala kronis, kesulitan tidur, dan perubahan nafsu makan.\n\nMaka dari itu, Anda perlu mengurangi burnout dengan cara yang sudah dibagikan di atas. Anda juga perlu menyadari arti pentingnya kesehatan fisik dan mental supaya tidak tenggelam dalam burnout."
      }
    ]
  },
  {
    id: "manajemen-stres",
    title: "Manajemen Stres",
    color: "bg-amber-400",
    description: "Pelajari teknik mengelola stres secara efektif",
    subchapters: [
      {
        id: "pengertian-stres",
        title: "Apa itu Manajemen Stres?",
        content: "Manajemen stres adalah seperangkat teknik dan strategi yang dirancang untuk membantu individu mengelola stres secara lebih efektif dalam kehidupan sehari-hari. Proses ini dimulai dengan menganalisis pemicu stres tertentu, lalu diikuti dengan tindakan positif untuk meminimalkan dampak negatif yang ditimbulkan.\n\nManajemen stres juga mencakup keterampilan untuk mengantisipasi, mencegah, mengelola, dan memulihkan diri dari stres yang muncul akibat tekanan, ancaman, atau ketidakmampuan dalam menghadapi situasi tertentu secara mental maupun perilaku.\n\nTujuan dari manajemen stres bukan hanya untuk menghindari stres, tetapi juga untuk meningkatkan daya tahan individu terhadap stres dan mengurangi dampak fisiologis yang mungkin terjadi. Beberapa contoh metode yang umum digunakan dalam manajemen stres meliputi meditasi, yoga, dan aktivitas olahraga."
      }
    ]
  },
  {
    id: "manajemen-waktu",
    title: "Manajemen Waktu",
    color: "bg-sky-400",
    description: "Teknik mengatur waktu untuk produktivitas maksimal",
    subchapters: [
      {
        id: "pengertian-waktu",
        title: "Apa itu Manajemen Waktu?",
        content: "Manajemen waktu adalah kemampuan untuk mengatur dan memaksimalkan waktu secara efektif agar dapat mencapai tujuan dengan lebih produktif dan efisien. Dengan manajemen waktu yang baik, kamu bisa menyelesaikan tugas-tugas dengan lebih cepat dan lebih baik, serta memiliki waktu luang yang cukup untuk melakukan hal-hal lainnya. Dalam kehidupan sehari-hari, skill manajemen waktu dapat membantu kamu untuk menghindari stres, mengurangi kecemasan, dan meningkatkan produktivitas.\n\nSkill manajemen waktu nggak hanya sebatas membuat daftar dan jadwal pekerjaan saja, tetapi juga membutuhkan cara terbaik dalam mengalokasikan waktu secara optimal. Manajemen waktu melibatkan kemampuan untuk mengatur prioritas serta memecahkan masalah. Selain itu, penting untuk mengenali kebiasaan buruk yang sering menghambat pekerjaan sehari-hari untuk meningkatkan skill manajemen waktu."
      },
      {
        id: "manfaat-waktu",
        title: "Manfaat Manajemen Waktu",
        content: "Keterampilan manajemen waktu memberikan banyak manfaat yang dapat membantu aktivitasmu sehari-hari. Apa saja?\n\n1. Meningkatkan produktivitas:\nManajemen waktu yang baik dapat membantu kamu menyelesaikan lebih banyak pekerjaan dalam waktu yang lebih singkat. Ketika waktu dialokasikan dengan tepat, kamu tidak akan merasa terbebani dan bisa fokus pada tugas-tugas penting yang harus diselesaikan. Dengan begitu, kamu akan menjadi lebih produktif dalam melakukan kegiatan sehari-hari.\n\n2. Mengurangi stres dan kecemasan:\nSeseorang yang merasa kewalahan dalam menyelesaikan pekerjaan cenderung mengalami stres dan kecemasan. Skill manajemen waktu membantu kamu terhindar dari situasi tersebut dan merasa lebih tenang selama mengerjakan tugas. So, kamu nggak akan merasa tertekan dan kesehatan mentalmu akan terjaga dengan baik.\n\n3. Mengoptimalkan waktu luang:\nDengan manajemen waktu yang baik, kamu dapat menyelesaikan tugas-tugas penting sesuai jadwal dan memiliki waktu luang untuk melakukan hal-hal yang kamu sukai. Hal ini tentunya berpengaruh positif terhadap kualitas hidupmu secara keseluruhan.\n\nKamu akan lebih bersemangat menjalani hari-harimu dan memiliki waktu untuk bersantai dan melakukan kegiatan yang membuatmu bahagia, seperti menekuni hobi atau menghabiskan waktu bersama keluarga dan teman. Selain itu, kamu juga bisa memanfaatkan waktu luang tersebut untuk mempelajari skill atau hal baru sebagai upaya pengembangan diri.\n\n4. Meningkatkan rasa percaya diri:\nKetika berhasil menyelesaikan pekerjaan dengan tepat waktu dan efektif, kamu akan merasa puas dan menjadi lebih percaya diri terhadap kemampuan yang kamu miliki. Hal ini akan membuatmu semakin termotivasi untuk menghasilkan kinerja yang lebih baik di masa depan.\n\n5. Menciptakan kesan positif:\nPenerapan manajemen waktu yang efektif dapat meningkatkan citra seseorang sebagai profesional yang bertanggung jawab dan dapat diandalkan. Dengan mampu menyelesaikan pekerjaan tepat waktu atau bahkan sebelum deadline, kamu dapat menciptakan kesan positif di mata orang lain dan meningkatkan reputasimu."
      }
    ]
  }
];

const EduPack: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedSubchapter, setSelectedSubchapter] = useState<Subchapter | null>(null);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedSubchapter(null);
  };

  const handleSubchapterSelect = (subchapter: Subchapter) => {
    setSelectedSubchapter(subchapter);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setSelectedSubchapter(null);
  };

  const handleBackToSubchapters = () => {
    setSelectedSubchapter(null);
  };

  // Render chapter selection view
  if (!selectedChapter) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="BUMARESWA EduPack" onBack={onBack} />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Materi Edukasi</h2>
            <p className="text-slate-500 mt-1">Pilih topik untuk mempelajari lebih lanjut</p>
          </div>
          <div className="space-y-4">
            {eduContent.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter)}
                className={`w-full text-left p-6 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${chapter.color}`}
              >
                <h3 className="text-xl font-bold text-white mb-1">{chapter.title}</h3>
                <p className="text-white/80 text-sm">{chapter.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render subchapter selection view
  if (!selectedSubchapter) {
    return (
      <div className="flex flex-col h-screen">
        <Header title={selectedChapter.title} onBack={handleBackToChapters} />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Sub Bab</h2>
            <p className="text-slate-500 mt-1">Pilih sub bab untuk membaca detailnya</p>
          </div>
          <div className="space-y-4">
            {selectedChapter.subchapters.map((subchapter) => (
              <button
                key={subchapter.id}
                onClick={() => handleSubchapterSelect(subchapter)}
                className="w-full text-left p-4 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-semibold text-slate-800">{subchapter.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render subchapter content view
  return (
    <div className="flex flex-col h-screen">
      <Header title={selectedSubchapter.title} onBack={handleBackToSubchapters} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">{selectedSubchapter.title}</h2>
          <div className="prose max-w-none text-slate-600 whitespace-pre-line">
            {selectedSubchapter.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduPack;