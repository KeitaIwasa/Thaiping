export type Phrase = {
  id: string;
  thai: string;
  romanization: string;
  japanese: string;
  english: string;
  memorizedUntil: {
    practice: number | null;
    memorization: number | null;
  };
};

const DEFAULT_PHRASES: Phrase[] = [
  { id: '1', thai: 'สวัสดี', romanization: 'sà-wàt-dii', japanese: 'こんにちは', english: 'Hello', memorizedUntil: { practice: null, memorization: null } },
  { id: '2', thai: 'ขอบคุณ', romanization: 'khɔ̀ɔp-khun', japanese: 'ありがとう', english: 'Thank you', memorizedUntil: { practice: null, memorization: null } },
  { id: '3', thai: 'ขอโทษ', romanization: 'khɔ̌ɔ-thôot', japanese: 'ごめんなさい', english: 'Sorry', memorizedUntil: { practice: null, memorization: null } },
  { id: '4', thai: 'ใช่', romanization: 'châi', japanese: 'はい', english: 'Yes', memorizedUntil: { practice: null, memorization: null } },
  { id: '5', thai: 'ไม่', romanization: 'mâi', japanese: 'いいえ', english: 'No', memorizedUntil: { practice: null, memorization: null } },
  { id: '6', thai: 'สบายดีไหม', romanization: 'sà-baai-dii-mǎi', japanese: '元気ですか？', english: 'How are you?', memorizedUntil: { practice: null, memorization: null } },
  { id: '7', thai: 'สบายดี', romanization: 'sà-baai-dii', japanese: '元気です', english: 'I am fine', memorizedUntil: { practice: null, memorization: null } },
  { id: '8', thai: 'ไม่เป็นไร', romanization: 'mâi-pen-rai', japanese: '大丈夫です', english: 'Never mind', memorizedUntil: { practice: null, memorization: null } },
  { id: '9', thai: 'ลาก่อน', romanization: 'laa-kɔ̀ɔn', japanese: 'さようなら', english: 'Goodbye', memorizedUntil: { practice: null, memorization: null } },
  { id: '10', thai: 'พบกันใหม่', romanization: 'phóp-kan-mài', japanese: 'また会いましょう', english: 'See you again', memorizedUntil: { practice: null, memorization: null } },
  { id: '11', thai: 'เข้าใจไหม', romanization: 'khâo-jai-mǎi', japanese: 'わかりますか？', english: 'Do you understand?', memorizedUntil: { practice: null, memorization: null } },
  { id: '12', thai: 'เข้าใจ', romanization: 'khâo-jai', japanese: 'わかります', english: 'I understand', memorizedUntil: { practice: null, memorization: null } },
  { id: '13', thai: 'ไม่เข้าใจ', romanization: 'mâi-khâo-jai', japanese: 'わかりません', english: 'I do not understand', memorizedUntil: { practice: null, memorization: null } },
  { id: '14', thai: 'นิดหน่อย', romanization: 'nít-nɔ̀ɔi', japanese: '少し', english: 'A little', memorizedUntil: { practice: null, memorization: null } },
  { id: '15', thai: 'หิว', romanization: 'hǐu', japanese: 'お腹が空きました', english: 'I am hungry', memorizedUntil: { practice: null, memorization: null } },
  { id: '16', thai: 'อิ่ม', romanization: 'ìm', japanese: 'お腹がいっぱいです', english: 'I am full', memorizedUntil: { practice: null, memorization: null } },
  { id: '17', thai: 'อร่อย', romanization: 'à-rɔ̀ɔi', japanese: '美味しい', english: 'Delicious', memorizedUntil: { practice: null, memorization: null } },
  { id: '18', thai: 'เผ็ด', romanization: 'phèt', japanese: '辛い', english: 'Spicy', memorizedUntil: { practice: null, memorization: null } },
  { id: '19', thai: 'ไม่เผ็ด', romanization: 'mâi-phèt', japanese: '辛くない', english: 'Not spicy', memorizedUntil: { practice: null, memorization: null } },
  { id: '20', thai: 'ชอบ', romanization: 'chɔ̂ɔp', japanese: '好き', english: 'Like', memorizedUntil: { practice: null, memorization: null } },
  { id: '21', thai: 'ไม่ชอบ', romanization: 'mâi-chɔ̂ɔp', japanese: '嫌い', english: 'Dislike', memorizedUntil: { practice: null, memorization: null } },
  { id: '22', thai: 'เท่าไหร่', romanization: 'thâo-rài', japanese: 'いくらですか？', english: 'How much?', memorizedUntil: { practice: null, memorization: null } },
  { id: '23', thai: 'แพง', romanization: 'phɛɛng', japanese: '高い', english: 'Expensive', memorizedUntil: { practice: null, memorization: null } },
  { id: '24', thai: 'ถูก', romanization: 'thùuk', japanese: '安い', english: 'Cheap', memorizedUntil: { practice: null, memorization: null } },
  { id: '25', thai: 'เอาอันนี้', romanization: 'ao-an-níi', japanese: 'これをください', english: 'I will take this', memorizedUntil: { practice: null, memorization: null } },
  { id: '26', thai: 'ห้องน้ำอยู่ที่ไหน', romanization: 'hɔ̂ng-náam-yùu-thîi-nǎi', japanese: 'トイレはどこですか？', english: 'Where is the restroom?', memorizedUntil: { practice: null, memorization: null } },
  { id: '27', thai: 'ไปที่ไหน', romanization: 'pai-thîi-nǎi', japanese: 'どこに行きますか？', english: 'Where are you going?', memorizedUntil: { practice: null, memorization: null } },
  { id: '28', thai: 'เลี้ยวซ้าย', romanization: 'líao-sáai', japanese: '左に曲がる', english: 'Turn left', memorizedUntil: { practice: null, memorization: null } },
  { id: '29', thai: 'เลี้ยวขวา', romanization: 'líao-khwǎa', japanese: '右に曲がる', english: 'Turn right', memorizedUntil: { practice: null, memorization: null } },
  { id: '30', thai: 'ตรงไป', romanization: 'trong-pai', japanese: 'まっすぐ行く', english: 'Go straight', memorizedUntil: { practice: null, memorization: null } },
  { id: '31', thai: 'หยุด', romanization: 'yùt', japanese: '止まる', english: 'Stop', memorizedUntil: { practice: null, memorization: null } },
  { id: '32', thai: 'ที่นี่', romanization: 'thîi-nîi', japanese: 'ここ', english: 'Here', memorizedUntil: { practice: null, memorization: null } },
  { id: '33', thai: 'ที่นั่น', romanization: 'thîi-nân', japanese: 'あそこ', english: 'There', memorizedUntil: { practice: null, memorization: null } },
  { id: '34', thai: 'ร้อน', romanization: 'rɔ́ɔn', japanese: '暑い', english: 'Hot', memorizedUntil: { practice: null, memorization: null } },
  { id: '35', thai: 'หนาว', romanization: 'nǎao', japanese: '寒い', english: 'Cold', memorizedUntil: { practice: null, memorization: null } },
  { id: '36', thai: 'สวย', romanization: 'sǔai', japanese: '美しい', english: 'Beautiful', memorizedUntil: { practice: null, memorization: null } },
  { id: '37', thai: 'น่ารัก', romanization: 'nâa-rák', japanese: 'かわいい', english: 'Cute', memorizedUntil: { practice: null, memorization: null } },
  { id: '38', thai: 'ดี', romanization: 'dii', japanese: '良い', english: 'Good', memorizedUntil: { practice: null, memorization: null } },
  { id: '39', thai: 'ไม่ดี', romanization: 'mâi-dii', japanese: '良くない', english: 'Bad', memorizedUntil: { practice: null, memorization: null } },
  { id: '40', thai: 'ใหญ่', romanization: 'yài', japanese: '大きい', english: 'Big', memorizedUntil: { practice: null, memorization: null } },
  { id: '41', thai: 'เล็ก', romanization: 'lék', japanese: '小さい', english: 'Small', memorizedUntil: { practice: null, memorization: null } },
  { id: '42', thai: 'เร็ว', romanization: 'reo', japanese: '速い', english: 'Fast', memorizedUntil: { practice: null, memorization: null } },
  { id: '43', thai: 'ช้า', romanization: 'cháa', japanese: '遅い', english: 'Slow', memorizedUntil: { practice: null, memorization: null } },
  { id: '44', thai: 'วันนี้', romanization: 'wan-níi', japanese: '今日', english: 'Today', memorizedUntil: { practice: null, memorization: null } },
  { id: '45', thai: 'พรุ่งนี้', romanization: 'phrûng-níi', japanese: '明日', english: 'Tomorrow', memorizedUntil: { practice: null, memorization: null } },
  { id: '46', thai: 'เมื่อวาน', romanization: 'mʉ̂a-waan', japanese: '昨日', english: 'Yesterday', memorizedUntil: { practice: null, memorization: null } },
  { id: '47', thai: 'น้ำ', romanization: 'náam', japanese: '水', english: 'Water', memorizedUntil: { practice: null, memorization: null } },
  { id: '48', thai: 'ข้าว', romanization: 'khâao', japanese: 'ご飯', english: 'Rice', memorizedUntil: { practice: null, memorization: null } },
  { id: '49', thai: 'กิน', romanization: 'kin', japanese: '食べる', english: 'Eat', memorizedUntil: { practice: null, memorization: null } },
  { id: '50', thai: 'ดื่ม', romanization: 'dʉ̀ʉm', japanese: '飲む', english: 'Drink', memorizedUntil: { practice: null, memorization: null } }
];

export const loadPhrases = (): Phrase[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('thai_phrases');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored phrases', e);
    }
  }
  // Initialize with default phrases if empty
  savePhrases(DEFAULT_PHRASES);
  return DEFAULT_PHRASES;
};

export const savePhrases = (phrases: Phrase[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('thai_phrases', JSON.stringify(phrases));
};
