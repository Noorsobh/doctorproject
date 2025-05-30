import React from "react";
import ArticlesSection from "./ArticlesSection"; // المسار حسب مكانك
import Image from './images/OIP.jpeg';
import Image1 from './images/wael.jpeg';
import Image2 from './images/anas.jpeg';
const journalists = [
  {
    name: "وائل الدحدوح",
    image: Image1,
    info: "ائل حمدان الدحدوح (مواليد 1970) هو صحفي فلسطيني من غزة، يعمل مراسلًا رئيسيًا لقناة الجزيرة منذ عام 2004. اعتُقل سابقًا 7 سنوات في سجون الاحتلال، وبرز بتغطيته الميدانية المستمرة للأحداث في القطاع. فقد عائلته في قصف إسرائيلي استهدف منزلهم بمخيم النصيرات في أكتوبر 2023. رغم الخسارة، واصل عمله ليصبح رمزًا للصمود الإعلامي الفلسطيني."
  },
  {
    name: "محمود زعيتر",
    image: Image,
    info: "محمود زعيتر صانع محتوى فلسطيني من دير البلح في غزة، جذب أكثر من 3 ملايين متابع بمحتوى ينشر الأمل والإيجابية وسط الأزمات. بدأ مسيرته من المسرح الجامعي ثم انتقل لصناعة محتوى رقمي يُظهر الجانب الإنساني في غزة، ما جعله يُلقب بـ سفير السعادة . رُشح لجائزة قمة المليار متابع 2025 لدوره في تعزيز الروح المعنوية رغم فقدانه أفرادًا من عائلته خلال العدوان. استطاع أن يكون جسرًا بين غزة والعالم، ملهمًا الشباب لاستخدام الإعلام لإيصال صوتهم."
  },
  {
    name: "أنس الشريف",
    image: Image2,
    info: "نس الشريف، صحفي فلسطيني من شمال قطاع غزة وُلد عام 1996، درس الإذاعة والتلفزيون في جامعة الأقصى. بدأ مسيرته الإعلامية متطوعًا ثم التحق بقناة الجزيرة مراسلًا ميدانيًا. أُصيب خلال تغطيته مسيرة عام 2018 وتلقى تهديدات من الاحتلال بسبب عمله الصحفي. في ديسمبر 2023، استُشهد والده في قصف إسرائيلي استهدف منزلهم بمخيم جباليا."
  }
];
const styles={
    header: {
      color: "#333",
      marginBottom: "30px",
      marginTop: "30px",
      fontWeight: "bold",
      borderBottom: "2px solid #ddd",
      paddingBottom: "10px",
      textAlign: "right"
    },
};
const ArticlesGrid = () => {
  return (
    <div className="container">
    <h2 style={styles.header}>مقالات</h2>
      <div className="row">
        {journalists.map((j, index) => (
          <ArticlesSection
            key={index}
            name={j.name}
            image={j.image}
            info={j.info}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesGrid;
