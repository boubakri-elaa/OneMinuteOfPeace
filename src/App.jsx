import React, { useState, useEffect, useRef } from 'react';
import { Globe, Heart, Share2, RefreshCw, BookOpen, Sparkles, Volume2, VolumeX } from 'lucide-react';


// 🔹 Remplace ton ancien shyTexts + getRandomInitial par ça

const shyTexts = {
  en: {
    greetings: ["Hey,", "Hi,", "Welcome,"],
    feelings: ["I’m happy you’re here.", "It’s good to see you here."],
    prompts: [
      "Ready for one minute?",
      "Shall we start this minute together?",
      "Can I tell you something?",
    ],
    button: "Tell me",
    afterClick: "Even one minute for Allah counts.",
    goodbye: "May Allah accept.",
  },
  fr: {
    greetings: ["Salam,", "Coucou,", "Bienvenue,"],
    feelings: [
      "je suis heureux que tu sois là.",
      "ça me fait plaisir que tu sois ici.",
    ],
    prompts: [
      "Prêt pour une minute ?",
      "On commence cette minute ensemble ?",
      "Je peux te dire quelque chose ?",
    ],
    button: "Dis‑moi",
    afterClick: "Même une minute pour Allah, ça compte.",
    goodbye: "Qu’Allah accepte.",
  },
  ar: {
    greetings: ["السلام عليك،", "مرحبًا،", "أهلاً بك،"],
    feelings: [
      "أنا سعيد بوجودك هنا.",
      "يسرّني أنك هنا الآن.",
    ],
    prompts: [
      "هل أنت مستعد لدقيقة واحدة؟",
      "هل نبدأ هذه الدقيقة معًا؟",
      "هل أستطيع أن أخبرك بشيء؟",
    ],
    button: "أخبرني",
    afterClick: "حتى دقيقة واحدة لله لها قيمة.",
    goodbye: "اللهم تقبّل.",
  },
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomInitial = (lang) => {
  const t = shyTexts[lang] || shyTexts.en;
  const style = Math.floor(Math.random() * 3);

  if (style === 0) {
    return rand(t.prompts);
  }
  if (style === 1) {
    return `${rand(t.greetings)} ${rand(t.prompts)}`;
  }
  return `${rand(t.greetings)} ${rand(t.feelings)}`;
};


const ShyCat = ({ language, resetKey }) => {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState("idle");
  const [msg, setMsg] = useState(() => getRandomInitial(language));
  const texts = shyTexts[language] || shyTexts.en;

  // 🔁 Quand resetKey change (minute terminée / stoppée), on réinitialise le chat
  useEffect(() => {
    setVisible(true);
    setStep("idle");
    setMsg(getRandomInitial(language));
  }, [resetKey, language]);

  useEffect(() => {
    if (step === "goodbye") {
      const timeout = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed z-40
        right-2 sm:right-4
        bottom-4 sm:bottom-4
        flex items-end gap-1 sm:gap-2
        transition-all duration-500 ease-in-out
      `}
      style={{ opacity: step === "goodbye" ? 0 : 0.95 }}
    >
      <div
        className={`
          max-w-[140px] sm:max-w-xs
          px-2 py-1 sm:px-3 sm:py-2
          rounded-xl sm:rounded-2xl
          bg-white/90 backdrop-blur-sm shadow-md
          text-[9px] sm:text-sm
          text-purple-800
          border border-purple-100
          ${step === "goodbye" ? "opacity-0" : "opacity-100"}
          transition-all duration-400 ease-in-out
        `}
      >
        {step === "afterClick"
          ? texts.afterClick
          : step === "goodbye"
          ? texts.goodbye
          : msg}

        {step === "idle" && (
          <button
            onClick={() => setStep("afterClick")}
            className="
              inline-flex items-center gap-0.5 ml-1 sm:ml-2
              px-1.5 py-0.5 sm:px-2
              rounded-full
              text-[8px] sm:text-xs font-medium
              bg-purple-100 text-purple-700
              hover:bg-purple-200
              transition-colors
            "
          >
            👀 {texts.button}
          </button>
        )}
      </div>

      <button
        onClick={() => {
          if (step === "afterClick") {
            setTimeout(() => setStep("goodbye"), 1000);
          }
        }}
        className={`
          relative
          w-10 h-10 sm:w-16 sm:h-16
          rounded-full
          bg-purple-200/70
          shadow-sm
          flex items-center justify-center
          overflow-hidden
          transition-transform duration-400 ease-in-out
          ${step === "afterClick" ? "-translate-y-0.5" : ""}
        `}
      >
        <img
          src="/images/cat.gif"
          alt="Little cat"
          className="w-8 h-8 sm:w-14 sm:h-14 object-contain"
        />
      </button>
    </div>
  );
};


// Translations
const translations = {
  en: {
    welcome: "You have one minute.",
    subtitle: "Spend it with Allah.",
    start: "Start Minute",
    about: "About",
    takeAction: "Take this minute into the world",
    generateDeed: "Generate Good Deed",
    anotherDeed: "Another Deed",
    share: "Share",
    replay: "Replay",
    aboutTitle: "About This Project",
    aboutText: "One Minute With Allah is a sadaqa jariya project designed to help busy Muslims reconnect with their faith through brief, meaningful spiritual moments. Each minute combines Quranic reflection, Dhikr, and actionable good deeds.",
    niyyah: "Our intention is to make it easy for anyone to pause, reflect, and return to Allah - no matter how busy life gets.",
    privacy: "No login required. Your journey is private and anonymous.",
    phase1: "Quranic Reflection",
    phase2: "Dhikr",
    phase3: "Reflection",
    concept:"In a one‑minute timer, random reminders, dhikr and Quran verses will show on the screen. Just read or repeat what appears, and take a short pause from stress.",
    stopHint: "You can pause the minute and repeat it whenever you want.",
  },
  ar: {
    welcome: "لديك دقيقة واحدة.",
    subtitle: "أمضها مع الله.",
    start: "ابدأ الدقيقة",
    about: "عن المشروع",
    takeAction: "خذ هذه الدقيقة إلى العالم",
    generateDeed: "عمل صالح عشوائي",
    anotherDeed: "عمل آخر",
    share: "شارك",
    replay: "إعادة",
    aboutTitle: "عن هذا المشروع",
    aboutText: "دقيقة واحدة مع الله هو مشروع صدقة جارية مصمم لمساعدة المسلمين المشغولين على إعادة التواصل مع إيمانهم من خلال لحظات روحية موجزة وذات مغزى. تجمع كل دقيقة بين التأمل القرآني والذكر والأعمال الصالحة القابلة للتنفيذ.",
    niyyah: "نيتنا هي تسهيل التوقف والتأمل والعودة إلى الله - بغض النظر عن مدى انشغال الحياة.",
    privacy: "لا حاجة لتسجيل الدخول. رحلتك خاصة ومجهولة.",
    phase1: "تأمل قرآني",
    phase2: "ذكر",
    phase3: "تأمل",
     concept:"خلال مؤقّت مدته دقيقة واحدة، ستظهر لك آيات وأذكار وتذكيرات عشوائية على الشاشة. فقط اقرأ أو ردد ما يظهر أمامك وخذ استراحة قصيرة من الضغط.",
    stopHint: "يمكنك إيقاف الدقيقة مؤقتًا وإعادتها متى شئت.",
  },
  fr: {
    welcome: "Vous avez une minute.",
    subtitle: "Passez-la avec Allah.",
    start: "Commencer",
    about: "À propos",
    takeAction: "Emportez cette minute dans le monde",
    generateDeed: "Générer une bonne action",
    anotherDeed: "Autre action",
    share: "Partager",
    replay: "Rejouer",
    aboutTitle: "À propos de ce projet",
    aboutText: "One Minute With Allah est un projet de sadaqa jariya conçu pour aider les musulmans occupés à se reconnecter avec leur foi à travers de brefs moments spirituels significatifs. Chaque minute combine réflexion coranique, Dhikr et bonnes actions concrètes.",
    niyyah: "Notre intention est de faciliter la pause, la réflexion et le retour vers Allah - peu importe à quel point la vie est occupée.",
    privacy: "Aucune connexion requise. Votre parcours est privé et anonyme.",
    phase1: "Réflexion coranique",
    phase2: "Dhikr",
    phase3: "Réflexion",
    concept:"Pendant un minuteur d’une minute, des rappels, des adhkar et des versets du Coran apparaîtront à l’écran. Il suffit de les lire ou de les répéter pour faire une pause dans ton stress.",
    stopHint: "Tu peux mettre la minute en pause et la recommencer quand tu veux.",
  }
};

// Content data
const content = {
  en: {
    ayahs: [
      "\"And He is with you wherever you are.\" (Quran 57:4)",
      "\"So remember Me; I will remember you.\" (Quran 2:152)",
      "\"Indeed, with hardship comes ease.\" (Quran 94:6)",
      "\"Allah does not burden a soul beyond that it can bear.\" (Quran 2:286)",
      "\"Verily, in the remembrance of Allah do hearts find rest.\" (Quran 13:28)",
      "\"And whoever relies upon Allah – then He is sufficient for him.\" (Quran 65:3)",
      "\"Call upon Me; I will respond to you.\" (Quran 40:60)",
      "\"And your Lord says, 'Ask of Me, I will respond to you.'\" (Quran 40:60)",
      "\"So be patient. Indeed, the promise of Allah is truth.\" (Quran 30:60)",
      "\"And whoever does an atom’s weight of good will see it.\" (Quran 99:7)",
      "\"And He found you lost and guided you.\" (Quran 93:7)",
      "\"My mercy encompasses all things.\" (Quran 7:156)",
      "\"Do not despair of the mercy of Allah.\" (Quran 39:53)",
      "\"He knows what is in the hearts.\" (Quran 67:13)",
      "\"And Allah is with the doers of good.\" (Quran 29:69)"
    ],
    dhikr: [
      "SubhanAllah (Glory be to Allah) × 3",
      "Alhamdulillah (All praise is for Allah) × 3",
      "Allahu Akbar (Allah is the Greatest) × 3",
      "Astaghfirullah (I seek forgiveness from Allah) × 3",
      "La ilaha illallah (There is no god but Allah) × 3",
      "La hawla wa la quwwata illa billah × 3",
      "SubhanAllahi wa bihamdih × 3",
      "SubhanAllahi-l-'Azim × 3",
      "Hasbiyallahu la ilaha illa Huwa × 3",
      "Allahumma salli ‘ala Muhammad wa ‘ala ali Muhammad × 3"
    ],
    reflections: [
      "Every breath is a gift. Use it wisely.",
      "Your struggles are shaping your strength.",
      "Be kind today. Someone needs it.",
      "Allah's mercy is greater than your mistakes.",
      "This moment is a chance to begin again.",
      "You are never alone; Allah knows every tear and every sigh.",
      "Do a small good deed now, before the moment passes.",
      "If your heart feels heavy, pour it out in dua.",
      "No act done sincerely for Allah is ever wasted.",
      "Even a whispered 'Astaghfirullah' can lighten the heart.",
      "Turn one habit today into something done for Allah's sake.",
      "The Quran is not just to be read, but to be lived.",
      "Your secret good deeds are your most beautiful treasures.",
      "When you feel weak, remember Who created strength.",
      "Jannah is built by the small, consistent actions you do daily."
    ]
  },
  ar: {
    ayahs: [
      "\"وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ\" (القرآن 57:4)",
      "\"فَاذْكُرُونِي أَذْكُرْكُمْ\" (القرآن 2:152)",
      "\"إِنَّ مَعَ الْعُسْرِ يُسْرًا\" (القرآن 94:6)",
      "\"لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا\" (القرآن 2:286)",
      "\"أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ\" (القرآن 13:28)",
      "\"وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ\" (القرآن 65:3)",
      "\"ادْعُونِي أَسْتَجِبْ لَكُمْ\" (القرآن 40:60)",
      "\"وَبَشِّرِ الصَّابِرِينَ\" (القرآن 2:155)",
      "\"فَإِنَّ مَعَ الْعُسْرِ يُسْرًا\" (القرآن 94:6)",
      "\"فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ\" (القرآن 99:7)",
      "\"وَوَجَدَكَ ضَالًّا فَهَدَى\" (القرآن 93:7)",
      "\"وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ\" (القرآن 7:156)",
      "\"لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ\" (القرآن 39:53)",
      "\"إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ\" (القرآن 67:13)",
      "\"وَاللَّهُ مَعَ الْمُحْسِنِينَ\" (القرآن 29:69)"
    ],
    dhikr: [
      "سبحان الله × 3",
      "الحمد لله × 3",
      "الله أكبر × 3",
      "أستغفر الله × 3",
      "لا إله إلا الله × 3",
      "لا حول ولا قوة إلا بالله × 3",
      "سبحان الله وبحمده × 3",
      "سبحان الله العظيم × 3",
      "حسبي الله لا إله إلا هو × 3",
      "اللهم صلِّ على محمد وعلى آل محمد × 3"
    ],
    reflections: [
      "كل نفس هو هدية من الله؛ استخدمه في طاعته.",
      "صراعاتك اليوم قد تكون سبباً لرفعتك غداً.",
      "كن لطيفاً؛ فرب كلمة طيبة تفتح باب رحمة.",
      "رحمة الله أعظم من كل ذنوبك مهما كثرت.",
      "هذه اللحظة فرصة صادقة للعودة إلى الله.",
      "إذا ضاق صدرك، فافتحه بالدعاء والقرآن.",
      "لا تحتقر عملاً صغيراً إذا كان خالصاً لله.",
      "أجمل الأعمال ما كان بينك وبين الله لا يعلمه أحد.",
      "كل خطوة نحو المسجد تكتب لك أجراً ونوراً.",
      "ذكرٌ خفيّ بينك وبين الله قد يبدّل صحيفتك.",
      "اجعل جزءاً من يومك خالياً من الهاتف وممتلئاً بالذكر.",
      "تذكّر أن الدنيا مزرعة؛ وما تزرعه اليوم تحصده غداً.",
      "إذا ضعفت همّتك فاذكر الجنة وأهلها.",
      "ما دام قلبك ينبض فباب التوبة مفتوح.",
      "القرب من الله هو أعظم راحة وسكينة."
    ]
  },
  fr: {
    ayahs: [
      "\"Et Il est avec vous où que vous soyez.\" (Coran 57:4)",
      "\"Souvenez-vous de Moi et Je Me souviendrai de vous.\" (Coran 2:152)",
      "\"Avec la difficulté vient certes la facilité.\" (Coran 94:6)",
      "\"Allah n'impose à aucune âme une charge supérieure à sa capacité.\" (Coran 2:286)",
      "\"C'est par l'évocation d'Allah que les cœurs se tranquillisent.\" (Coran 13:28)",
      "\"Et que quiconque place sa confiance en Allah, Il lui suffit.\" (Coran 65:3)",
      "\"Invoquez-Moi, Je vous répondrai.\" (Coran 40:60)",
      "\"Annonce la bonne nouvelle aux endurants.\" (Coran 2:155)",
      "\"Quiconque fait le poids d'un atome de bien le verra.\" (Coran 99:7)",
      "\"Il t'a trouvé égaré, alors Il t'a guidé.\" (Coran 93:7)",
      "\"Ma miséricorde embrasse toute chose.\" (Coran 7:156)",
      "\"Ne désespérez pas de la miséricorde d'Allah.\" (Coran 39:53)",
      "\"Il connaît parfaitement le contenu des poitrines.\" (Coran 67:13)",
      "\"Allah est avec les bienfaisants.\" (Coran 29:69)",
      "\"Et place ta confiance en Allah. Allah suffit comme Protecteur.\" (Coran 33:3)"
    ],
    dhikr: [
      "SubhanAllah (Gloire à Allah) × 3",
      "Alhamdulillah (Louange à Allah) × 3",
      "Allahu Akbar (Allah est le Plus Grand) × 3",
      "Astaghfirullah (Je demande pardon à Allah) × 3",
      "La ilaha illallah (Il n'y a de dieu qu'Allah) × 3",
      "La hawla wa la quwwata illa billah × 3",
      "SubhanAllahi wa bihamdih × 3",
      "SubhanAllahi-l-'Azim × 3",
      "Hasbiyallahu la ilaha illa Huwa × 3",
      "Allahumma salli ‘ala Muhammad wa ‘ala ali Muhammad × 3"
    ],
    reflections: [
      "Chaque souffle est un cadeau d’Allah. Utilisez-le pour Vous rapprocher de Lui.",
      "Tes épreuves d’aujourd’hui construisent ta foi de demain.",
      "Un petit acte de bonté peut illuminer le cœur de quelqu’un.",
      "La miséricorde d’Allah est plus grande que toutes tes erreurs.",
      "Cette minute peut être le début d’un nouveau toi.",
      "Lorsque ton cœur est lourd, parles-en à Allah dans la prière.",
      "Aucun acte sincère pour Allah n’est insignifiant.",
      "Les bonnes actions secrètes sont parmi les plus aimées d’Allah.",
      "Transforme une habitude quotidienne en adoration par la bonne intention.",
      "Lis un verset aujourd’hui comme si c’était un message personnel d’Allah pour toi.",
      "Même un simple \"SubhanAllah\" peut apaiser une journée difficile.",
      "Plus tu te souviens d’Allah, plus ton cœur trouve la paix.",
      "Tant que tu vis, la porte du repentir est ouverte.",
      "Penser à l’au-delà donne un sens à chaque instant.",
      "La meilleure compagnie est celle qui te rapproche d’Allah."
    ]
  }
};

const goodDeeds = {
  en: [
    { text: "Send a kind message to someone you haven't spoken to in a while", category: "Kindness" },
    { text: "Make sincere dua for your parents", category: "Du'a" },
    { text: "Give charity, even if it's just a small amount", category: "Charity" },
    { text: "Smile at three people today", category: "Kindness" },
    { text: "Say Astaghfirullah 10 times before sleeping", category: "Dhikr" },
    { text: "Forgive someone who wronged you", category: "Forgiveness" },
    { text: "Call a family member just to check on them", category: "Kindness" },
    { text: "Read one page of Quran with reflection", category: "Quran" },
    { text: "Help someone without expecting anything in return", category: "Kindness" },
    { text: "Make dua for someone struggling", category: "Du'a" },

    { text: "Put your phone away for 5 minutes and remember Allah in silence", category: "Mindfulness" },
    { text: "Send a voice note of encouragement to a friend who may feel alone", category: "Support" },
    { text: "Share one beneficial Islamic reminder on your social media with a sincere intention", category: "Da'wah" },
    { text: "Make istighfar for all the times you delayed your prayer", category: "Repentance" },
    { text: "Thank Allah specifically for three blessings you usually forget", category: "Gratitude" },
    { text: "Read the meaning of one short surah and try to live one lesson from it today", category: "Quran" },
    { text: "Make dua for the Ummah, especially those suffering in war or poverty", category: "Du'a" },
    { text: "Give a sincere compliment to someone in your family", category: "Family" },
    { text: "Help with a household chore without being asked", category: "Service" },
    { text: "Send salawat upon the Prophet ﷺ 10 times", category: "Dhikr" },
    { text: "Visit or call someone who is sick or feeling down", category: "Compassion" },
    { text: "Delete or avoid one sinful thing from your phone or habits today", category: "Purification" },
    { text: "Make dua of forgiveness for every person who has hurt you", category: "Forgiveness" },
    { text: "Give a small amount in charity with the intention of sadaqah jariyah", category: "Charity" },
    { text: "Teach one child or friend a simple dua or dhikr", category: "Da'wah" }
  ],
  ar: [
    { text: "أرسل رسالة لطيفة لشخص لم تتحدث معه منذ فترة", category: "لطف" },
    { text: "ادع دعاءً صادقاً لوالديك", category: "دعاء" },
    { text: "تصدق حتى لو كان مبلغاً صغيراً", category: "صدقة" },
    { text: "ابتسم لثلاثة أشخاص اليوم", category: "لطف" },
    { text: "قل أستغفر الله 10 مرات قبل النوم", category: "ذكر" },
    { text: "اسمح لمن أساء إليك", category: "مغفرة" },
    { text: "اتصل بأحد أفراد العائلة للاطمئنان عليه", category: "لطف" },
    { text: "اقرأ صفحة واحدة من القرآن بتدبر", category: "قرآن" },
    { text: "ساعد شخصاً دون توقع شيء في المقابل", category: "لطف" },
    { text: "ادع لشخص يعاني", category: "دعاء" },

    { text: "أغلق هاتفك خمس دقائق وتفرغ لذكر الله بقلب حاضر", category: "خشوع" },
    { text: "أرسل رسالة صوتية تشجيعية لصديق قد يشعر بالوحدة", category: "دعم" },
    { text: "انشر تذكرة إيمانية نافعة في وسائل التواصل بنية صادقة", category: "دعوة" },
    { text: "استغفر عن كل صلاة أخرتها بلا عذر", category: "توبة" },
    { text: "اذكر ثلاث نِعم تنساها غالباً واشكر الله عليها", category: "شكر" },
    { text: "اقرأ تفسير آية قصيرة وحاول تطبيق معناها اليوم", category: "قرآن" },
    { text: "ادع للأمة الإسلامية عامة ولأهل المناطق المنكوبة خاصة", category: "دعاء" },
    { text: "قل كلمة طيبة لأحد والديك أو إخوتك", category: "أسرة" },
    { text: "شارك في عمل منزلي دون أن يُطلب منك", category: "خدمة" },
    { text: "أكثر من الصلاة على النبي ﷺ عشر مرات", category: "ذكر" },
    { text: "اتصل أو زر مريضاً أو شخصاً مهموماً", category: "رحمة" },
    { text: "احذف محتوى لا يرضي الله من هاتفك أو جهازك", category: "تزكية" },
    { text: "ادع بالمغفرة لكل من أخطأ في حقك", category: "مغفرة" },
    { text: "ضع صدقة بنية أن تكون جارية لك ولوالديك", category: "صدقة" },
    { text: "علّم طفلاً أو صديقاً دعاءً قصيراً أو ذكراً سهلاً", category: "دعوة" }
  ],
  fr: [
    { text: "Envoyez un message gentil à quelqu'un à qui vous n'avez pas parlé depuis un moment", category: "Gentillesse" },
    { text: "Faites des invocations sincères pour vos parents", category: "Du'a" },
    { text: "Donnez la charité, même si c'est un petit montant", category: "Charité" },
    { text: "Souriez à trois personnes aujourd'hui", category: "Gentillesse" },
    { text: "Dites Astaghfirullah 10 fois avant de dormir", category: "Dhikr" },
    { text: "Pardonnez à quelqu'un qui vous a fait du tort", category: "Pardon" },
    { text: "Appelez un membre de la famille juste pour prendre des nouvelles", category: "Gentillesse" },
    { text: "Lisez une page du Coran avec réflexion", category: "Coran" },
    { text: "Aidez quelqu'un sans rien attendre en retour", category: "Gentillesse" },
    { text: "Faites des invocations pour quelqu'un qui souffre", category: "Du'a" },

    { text: "Mettez votre téléphone de côté pendant 5 minutes et rappelez-vous d’Allah en silence", category: "Présence" },
    { text: "Envoyez un message vocal d’encouragement à un ami qui pourrait se sentir seul", category: "Soutien" },
    { text: "Partagez un rappel islamique bénéfique sur vos réseaux avec une intention sincère", category: "Da'wah" },
    { text: "Demandez pardon pour toutes les prières que vous avez retardées sans raison valable", category: "Repentir" },
    { text: "Remerciez Allah pour trois bienfaits que vous oubliez d’habitude", category: "Gratitude" },
    { text: "Lisez l’explication d’un verset et appliquez un enseignement aujourd’hui", category: "Coran" },
    { text: "Invoquez pour la communauté musulmane, en particulier pour ceux qui souffrent", category: "Du'a" },
    { text: "Offrez un compliment sincère à quelqu’un de votre famille", category: "Famille" },
    { text: "Aidez à une tâche ménagère sans qu’on vous le demande", category: "Service" },
    { text: "Envoyez des salutations au Prophète ﷺ 10 fois", category: "Dhikr" },
    { text: "Appelez ou visitez une personne malade ou triste", category: "Compassion" },
    { text: "Supprimez un contenu illicite ou inutile de votre téléphone aujourd’hui", category: "Purification" },
    { text: "Demandez sincèrement pardon pour tous ceux qui vous ont blessé", category: "Pardon" },
    { text: "Donnez une petite somme en aumône avec l’intention de sadaqa jariya", category: "Charité" },
    { text: "Apprenez à un enfant ou un ami un petit dhikr ou une courte invocation", category: "Da'wah" }
  ]
};
const duaMessages = {
  en: [
    "May Allah fill your heart with peace and your days with light.",
    "May Allah grant you health, barakah, and a heart that remembers Him.",
    "May Allah make this minute a reason for ease in your life.",
    "May Allah accept your intentions and guide you to what He loves.",
  ],
  fr: [
    "Qu’Allah remplisse ton cœur de paix et ta vie de lumière.",
    "Qu’Allah t’accorde la santé, la baraka et un cœur qui se souvient de Lui.",
    "Qu’Allah fasse de cette minute une cause de sérénité pour toi.",
    "Qu’Allah accepte tes intentions et te guide vers ce qu’Il aime.",
  ],
  ar: [
    "أسألُ اللهَ أن يملأ قلبَك طمأنينةً ونورًا.",
    "أسألُ اللهَ أن يرزقكَ صحةً وعافيةً وبركةً في عمرك وأيامك.",
    "أسألُ اللهَ أن يجعل هذه الدقيقة سببًا لراحةِ بالك وسعادةِ قلبك.",
    "أسألُ اللهَ أن يتقبّل نيتكَ ويهديكَ إلى ما يحبّه ويرضاه.",
  ],
};

const getRandomDua = (lang) => {
  const list = duaMessages[lang] || duaMessages.en;
  return list[Math.floor(Math.random() * list.length)];
};





const App = () => {
  const [language, setLanguage] = useState('ar');
  const [screen, setScreen] = useState('landing');
  const [timeLeft, setTimeLeft] = useState(60);
  const [phase, setPhase] = useState(1);
  const [currentDeed, setCurrentDeed] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  const [soundType, setSoundType] = useState('adhan');
  const [soundSrc, setSoundSrc] = useState('/sounds/fiya-hubbun.mp3');
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);

  const [steps, setSteps] = useState([]); // 10 steps

  const t = translations[language];
  const isRTL = language === 'ar';
  const [chatResetKey, setChatResetKey] = useState(0);
  const [heartDua, setHeartDua] = useState(null);
  const [showHeartDua, setShowHeartDua] = useState(false);
  const soundMenuRef = useRef(null); // 👈 AJOUTÉ


  const triggerHeartDua = () => {
  setHeartDua(getRandomDua(language));
  setShowHeartDua(true);

  // Masquer automatiquement après 3s
  setTimeout(() => setShowHeartDua(false), 3000);
};



  

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (soundMenuRef.current && !soundMenuRef.current.contains(event.target)) {
        setIsSoundMenuOpen(false);
      }
    };

    if (isSoundMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSoundMenuOpen]);


  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio control
  useEffect(() => {
    if (!audioRef.current) return;

    if (isSoundEnabled) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isSoundEnabled, soundSrc]);

  // Timer with 10 phases (6 seconds each)
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;

          const newPhase = Math.min(10, Math.max(1, Math.ceil(newTime / 6)));
          setPhase(newPhase);

          if (newTime === 0) {
            setIsTimerActive(false);
            setScreen('deed');
          }

          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startMinute = () => {
    const langContent = content[language];
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // 10 steps mixing ayah, dhikr, reflection
    const newSteps = [
      { type: 'ayah', text: rand(langContent.ayahs) },
      { type: 'ayah', text: rand(langContent.ayahs) },
      { type: 'dhikr', text: rand(langContent.dhikr) },
      { type: 'dhikr', text: rand(langContent.dhikr) },
      { type: 'reflection', text: rand(langContent.reflections) },
      { type: 'ayah', text: rand(langContent.ayahs) },
      { type: 'dhikr', text: rand(langContent.dhikr) },
      { type: 'reflection', text: rand(langContent.reflections) },
      { type: 'ayah', text: rand(langContent.ayahs) },
      { type: 'reflection', text: rand(langContent.reflections) },
    ];

    setSteps(newSteps);
    setTimeLeft(60);
    setPhase(10); // start at 10 so first tick goes to 9..1; adjust for ceil
    setScreen('timer');
    setIsTimerActive(true);
  };

  
  const togglePause = () => {
  setIsTimerActive((prev) => !prev);
};
const stopMinute = () => {
  setIsTimerActive(false);   // stop countdown
  setTimeLeft(60);           // reset time
  setPhase(1);               // reset phase indicator
  setScreen("landing");
  setChatResetKey((k) => k + 1);   // 🔁 forcer le chat à revenir
  //   // go back to landing page
};




  const generateDeed = () => {
    const deeds = goodDeeds[language];
    setCurrentDeed(deeds[Math.floor(Math.random() * deeds.length)]);
  };

  const shareMessage = () => {
    const shareText = language === 'en'
      ? "I just spent a minute with Allah. Join me: One Minute With Allah"
      : language === 'ar'
      ? "لقد قضيت دقيقة مع الله. انضم إلي: دقيقة واحدة مع الله"
      : "Je viens de passer une minute avec Allah. Rejoignez-moi : One Minute With Allah";

    if (navigator.share) {
      navigator.share({ text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert(language === 'en' ? 'Copied to clipboard!' : language === 'ar' ? 'تم النسخ!' : 'Copié!');
    }
  };

  const renderPhaseContent = () => {
    const step = steps[phase - 1];
    if (!step) return null;

    if (step.type === 'ayah') {
      return (
        <div className="text-center animate-fade-in">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-300" />
          <p className="text-sm text-purple-200 mb-2">{t.phase1}</p>
          <p className="text-xl leading-relaxed">{step.text}</p>
        </div>
      );
    }

    if (step.type === 'dhikr') {
      return (
        <div className="text-center animate-fade-in">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-pink-300 animate-pulse" />
          <p className="text-sm text-pink-200 mb-2">{t.phase2}</p>
          <p className="text-2xl font-semibold">{step.text}</p>
        </div>
      );
    }

    return (
      <div className="text-center animate-fade-in">
        <Heart className="w-12 h-12 mx-auto mb-4 text-blue-300" />
        <p className="text-sm text-blue-200 mb-2">{t.phase3}</p>
        <p className="text-xl leading-relaxed italic">{step.text}</p>
      </div>
    );
  };

  return (
  <div
    className={`min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 text-gray-800 overflow-hidden relative ${
      isRTL ? "font-arabic" : "font-latin"
    }`}
  >
      {/* Cute pastel floating particles (blobs + twinkles) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={`blob-${i}`}
            className="absolute rounded-full blur-3xl opacity-40 animate-blob-slow mix-blend-screen"
            style={{
              width: `${160 + Math.random() * 160}px`,
              height: `${160 + Math.random() * 160}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: [
                'rgba(244, 191, 255, 0.9)',
                'rgba(191, 219, 254, 0.9)',
                'rgba(221, 214, 254, 0.9)',
                'rgba(252, 231, 243, 0.9)',
                'rgba(187, 247, 208, 0.9)',
              ][i % 5],
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 14}s`,
            }}
          />
        ))}

        {[...Array(45)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    


      {/* Soft moving wind background */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
  <div
    className="
      absolute inset-0
      bg-[url('/images/background1.png')]
      bg-cover bg-center
    "
  />
    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
</div>




      {/* Interactive gradient cursor effect */}
      <div
        style={{
          background: 'radial-gradient(circle, rgba(216,180,254,1) 0%, rgba(249,168,212,1) 100%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
      />

      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src={soundSrc} type="audio/mpeg" />
      </audio>

      {/* Sound Toggle + menu + hint */}
      {/* Sound Toggle + menu */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <div className="flex gap-2">
          {/* Bouton Mute/Unmute */}
          <button
            onClick={() => {
              setIsSoundEnabled(prev => !prev);
            }}
            className="bg-white/70 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all hover:bg-white/90 group relative"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Bouton Menu */}
          <div className="relative" ref={soundMenuRef}>
            <button
              onClick={() => {
                setIsSoundMenuOpen(prev => !prev);
              }}
              className="bg-white/70 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all hover:bg-white/90 group relative"
            >
              <span className="text-sm">🎵</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping-slow" />
            </button>

            {isSoundMenuOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-2 flex flex-col text-sm min-w-[120px]">
                <button
                  onClick={() => {
                    setSoundType('quran');
                    setSoundSrc('/sounds/quran.mp3');
                    setIsSoundEnabled(true);
                    setIsSoundMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-xl text-left hover:bg-purple-100 ${
                    soundType === 'quran' ? 'bg-purple-200 text-purple-800 font-semibold' : ''
                  }`}
                >
                  Quran
                </button>
                <button
                  onClick={() => {
                    setSoundType('nasheed');
                    setSoundSrc('/sounds/fiya-hubbun.mp3');
                    setIsSoundEnabled(true);
                    setIsSoundMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-xl text-left hover:bg-purple-100 ${
                    soundType === 'nasheed' ? 'bg-purple-200 text-purple-800 font-semibold' : ''
                  }`}
                >
                  Nasheed
                </button>
                <button
                  onClick={() => {
                    setSoundType('adhan');
                    setSoundSrc('/sounds/adhan.mp3');
                    setIsSoundEnabled(true);
                    setIsSoundMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-xl text-left hover:bg-purple-100 ${
                    soundType === 'adhan' ? 'bg-purple-200 text-purple-800 font-semibold' : ''
                  }`}
                >
                  Adhan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm transition-all hover:scale-110 ${language === 'en' ? 'bg-purple-300 text-white shadow-md' : 'hover:bg-purple-100'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 rounded-full text-sm transition-all hover:scale-110 ${language === 'ar' ? 'bg-purple-300 text-white shadow-md' : 'hover:bg-purple-100'}`}
        >
          ع
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-3 py-1 rounded-full text-sm transition-all hover:scale-110 ${language === 'fr' ? 'bg-purple-300 text-white shadow-md' : 'hover:bg-purple-100'}`}
        >
          FR
        </button>
      </div>

{/* Landing Screen */}
{screen === "landing" && (
  <div
    className={`min-h-screen flex flex-col items-center justify-center px-4 py-6
                relative z-10 ${language === "ar" ? "font-arabic-aref" : "font-latin"}`}
  >
    <div className="w-full max-w-md text-center space-y-6 md:space-y-8 animate-fade-in">
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide text-purple-800 animate-bounce-slow">
          {t.welcome}
        </h1>
        <p className="text-lg md:text-2xl text-pink-600 font-light animate-pulse-slow">
          {t.subtitle}
        </p>

        <p
          className={`leading-relaxed mt-2 md:mt-4 text-purple-700 ${
            language === "ar" ? "text-sm md:text-2xl" : "text-sm md:text-xl"
          }`}
        >
          {t.concept}
        </p>

        <p
          className={`mt-1 md:mt-2 text-pink-600 ${
            language === "ar" ? "text-xs md:text-lg" : "text-xs md:text-base"
          }`}
        >
          {t.stopHint}
        </p>
      </div>

     <div className="relative flex flex-col items-center justify-center">
  {/* Popup directement au-dessus */}
  {showHeartDua && heartDua && (
    <div
      className="absolute
                 bottom-full mb-4        /* colle la bulle juste au-dessus */
                 left-1/2 -translate-x-1/2
                 bg-white/95 backdrop-blur-sm
                 text-purple-800 text-sm md:text-base
                 px-5 py-3 rounded-3xl shadow-xl max-w-sm
                 animate-fade-in z-20"
    >
      {heartDua}
    </div>
  )}

  {/* Cœur principal */}
  <button
    type="button"
    onClick={triggerHeartDua}
    className="w-24 h-24 rounded-full bg-gradient-to-br
               from-purple-200 to-pink-200 flex items-center justify-center
               shadow-lg hover:shadow-2xl transition-all hover:scale-110
               relative group z-10"
  >
    <Heart className="w-12 h-12 text-purple-600 group-hover:animate-ping absolute" />
    <Heart className="w-12 h-12 text-purple-600" />
  </button>

  {/* Emoji 👋 */}
  <div className="absolute -top-2 -right-2 text-4xl animate-wave z-10">👋</div>
</div>


      <button
        onClick={startMinute}
        className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:from-pink-500 hover:to-pink-700 relative overflow-hidden group"
      >
        <span className="relative z-10">{t.start}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
      </button>

      <button
        onClick={() => setScreen("about")}
        className="flex items-center gap-2 mx-auto text-purple-600 hover:text-purple-800 transition-all hover:scale-110"
      >
        <Globe className="w-4 h-4 animate-spin-slow" />
        {t.about}
      </button>
    </div>
  </div>
)}

{/* Timer Screen */}
{screen === "timer" && (
  <div
    className={`min-h-screen flex flex-col items-center justify-center p-6 relative z-10 ${
      language === "ar" ? "font-arabic-amiri" : "font-latin"
    }`}
  >
    <div className="max-w-2xl w-full space-y-8">
      <div className="relative w-32 h-32 mx-auto group">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(216, 180, 254, 0.3)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - timeLeft / 60)}`}
            className="transition-all duration-1000"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-light text-purple-800 group-hover:scale-110 transition-transform">
            {timeLeft}
          </span>
        </div>
        <div className="absolute inset-0 rounded-full bg-purple-300/20 animate-ping-slow" />
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl min-h-[220px] flex items-center justify-center hover:shadow-2xl transition-all hover:scale-[1.02]">
        {renderPhaseContent()}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {/* Pause / Resume */}
        <button
          onClick={togglePause}
          className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-purple-700 shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          {isTimerActive
            ? language === "fr"
              ? "Mettre en pause"
              : language === "ar"
              ? "إيقاف مؤقت"
              : "Pause"
            : language === "fr"
            ? "Reprendre"
            : language === "ar"
            ? "متابعة"
            : "Resume"}
        </button>

        {/* Repeat */}
        <button
          onClick={startMinute}
          className="px-4 py-2 rounded-full bg-purple-300 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          {language === "fr"
            ? "Répéter la minute"
            : language === "ar"
            ? "إعادة الدقيقة"
            : "Repeat minute"}
        </button>

        {/* Stop completely */}
        <button
          onClick={stopMinute}
          className="px-4 py-2 rounded-full bg-red-400 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          {language === "fr"
            ? "Arrêter"
            : language === "ar"
            ? "إيقاف"
            : "Stop"}
        </button>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              phase === i + 1
                ? "bg-purple-500 scale-125 animate-pulse"
                : "bg-purple-200 hover:bg-purple-300 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
)}

      {/* Good Deed Screen */}
      {screen === 'deed' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <Sparkles className="w-16 h-16 mx-auto text-purple-400 animate-bounce" />
              <h2 className="text-2xl font-light text-purple-800">{t.takeAction}</h2>
              <div className="text-4xl animate-bounce-slow">🙌</div>
            </div>

            {!currentDeed ? (
              <button
                onClick={generateDeed}
                className="w-full py-4 bg-gradient-to-r from-purple-300 to-pink-300 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:from-purple-400 hover:to-pink-400 relative overflow-hidden group"
              >
                <span className="relative z-10">{t.generateDeed}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                  <p className="text-sm text-purple-600 mb-2 font-semibold">{currentDeed.category}</p>
                  <p className="text-lg leading-relaxed">{currentDeed.text}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={generateDeed}
                    className="flex-1 py-3 bg-white/70 backdrop-blur-sm rounded-full font-medium text-purple-700 shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    {t.anotherDeed}
                  </button>
                  <button
                    onClick={shareMessage}
                    className="flex-1 py-3 bg-white/70 backdrop-blur-sm rounded-full font-medium text-purple-700 shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <Share2 className="w-4 h-4 group-hover:scale-125 transition-transform" />
                    {t.share}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setScreen('landing');
                setCurrentDeed(null);
                setChatResetKey((k) => k + 1);   // 🔁 réveiller le chat

              }}
              className="w-full py-3 text-purple-600 hover:text-purple-800 transition-all hover:scale-105"
            >
              {t.replay}
            </button>
          </div>
        </div>
      )}

      {/* About Screen */}
{screen === "about" && (
  <div
    className={`min-h-screen flex flex-col items-center justify-center p-6 relative z-10 ${
      language === "ar" ? "font-arabic-aref" : "font-latin"
    }`}
  >
    <div className="max-w-3xl w-full space-y-8 animate-fade-in">
      <button
        onClick={() => setScreen("landing")}
        className="text-purple-600 hover:text-purple-800 transition-all mb-4 hover:scale-105 inline-flex items-center gap-2"
      >
        <span className="text-2xl">←</span>
        <span className="text-lg">
          {language === "ar" ? "عودة" : language === "fr" ? "Retour" : "Back"}
        </span>
      </button>

      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-xl space-y-8 hover:shadow-2xl transition-all hover:scale-[1.01]">
        <h2 className="text-4xl font-light text-purple-800 flex items-center gap-3">
          <Heart className="w-7 h-7 text-pink-400 animate-pulse" />
          {t.aboutTitle}
        </h2>

        <p className="text-xl leading-relaxed text-gray-700">
          {t.aboutText}
        </p>

        <div className="border-t border-purple-200 pt-6 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.niyyah}
          </p>
          <p className="text-sm md:text-base text-purple-600">
            {t.privacy}
          </p>
        </div>
      </div>
    </div>
  </div>
)}


      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');

.font-arabic-amiri {
  font-family: 'Amiri', serif;
}

.font-arabic-aref {
  font-family: 'Aref Ruqaa', serif;
}

.font-latin {
  font-family: 'Caveat Brush', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}




        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          40% { transform: rotate(14deg); }
          50% { transform: rotate(-4deg); }
          60% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          transform-origin: 70% 70%;
          animation: wave 2.5s infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          75%,100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite;
        }

        @keyframes pulse-slow {
          0%,100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 2.2s ease-in-out infinite; }

        .animate-spin-slow { animation: spin 8s linear infinite; }

        @keyframes wind-slow {
          0% { transform: translateX(-40px) translateY(0px); }
          50% { transform: translateX(40px) translateY(10px); }
          100% { transform: translateX(-40px) translateY(0px); }
        }
        .animate-wind-slow {
          animation: wind-slow 18s ease-in-out infinite alternate;
        }

        @keyframes blob-slow {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(-40px,-20px,0) scale(1.05); }
          66% { transform: translate3d(30px,30px,0) scale(0.98); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        .animate-blob-slow { animation: blob-slow linear infinite; }

        @keyframes twinkle {
          0%,100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.8); }
        }
        .animate-twinkle { animation: twinkle ease-in-out infinite; }
      `}</style>

      <ShyCat language={language} resetKey={chatResetKey} />

    </div>
  );
};

export default App;
