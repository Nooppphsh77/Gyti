import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs, { promises } from 'fs';
import { join } from 'path';
import moment from 'moment-timezone';

const time = moment.tz('Egypt').format('HH');
let wib = moment.tz('Egypt').format('HH:mm:ss');

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date() + 3600000);
    let locale = 'en';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي`;

    let videoUrl = 'https://telegra.ph/file/09e09b9e0376dcff65ccc.mp4';
    let user = global.db.data.users[who];
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = user;
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    let readMore = more.repeat(850);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    
    let str = ` 
*┓━ ╼━━━╃⌬〔 𝐸𝐿-𝐷𝐸𝑺𝑂𝐾𝐸𝐼𝑌 𝐵𝑂𝑌 〕⌬╄━━━╾ ━┏*
👑┇❯ مـرحــبـا بــك یــا  ${taguser}

*≼👤≽ مـعـلــومـات الـبــوت╿↶*
━ ── • ⟐ • ── ━
❐┇❯ *اســم الـبــوت ❰ 𝐸𝐿-𝐷𝐸𝑺𝑂𝐾𝐸𝐼𝑌 ❱*
❐┇❯ *وقــت الـتشـغـيــل* : ⌊  ${uptime}  ⌉╎
❐┇❯ *الـمـطـور : ⌊https://wa.me/+201203024198╎*
❐┇❯ *الـمـطـور : ⌊ 𝑌𝑂𝑈𝑺𝑺𝐸𝐹 𝐸𝐿-𝐷𝐸𝑺𝑂𝐾𝐸𝐼𝑌 ⌉*╎
❐┇❯ *يمكنك دعم البوت عن طريق كتابه .الدعم* ⌉╎
❐┇❯ *حط قبل كل امر : ⌊ . ⌉*
            ━ ── • 〄 • ── ━

  *≼🏰≽ قـسـم المجموعات╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎📰❯ .جروبي⌉
❐╎📧❯ .منشن⌉
❐╎👽❯ .مخفي⌉
❐╎🚸❯ .طرد⌉
❐╎↗️❯ .رفع⌉
❐╎↘️❯ .خفض⌉
❐╎🗑️❯ .حذف⌉
❐╎🛋️❯ .جروب⌉
❐╎📸❯ .تغيير_الصورة⌉
❐╎🗒️❯ .تغيير_الوصف⌉
❐╎📝❯ .تغيير_الاسم⌉
❐╎🪀❯ .لينك⌉
❐╎♻️❯ .تغيير_اللينك⌉
❐╎👨🏽‍✈️❯ .المشرفين⌉
   ────── • 〄 • ──────
  *≼☪️≽  قـسـم الدين ╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🕋❯ .ايه-الكرسي⌉
❐╎🧎🏽‍♂️❯ .الله⌉
❐╎🕋❯ .قران⌉
❐╎📄❯ .سوره⌉
❐╎📙❯ .سور⌉
❐╎📖❯ .حديث⌉
❐╎📿❯ .ذكر⌉
   ────── • 〄 • ──────
  *≼🏛≽ قـسـم البنك╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🏦❯ .البنك⌉
❐╎💰❯ .راتب⌉
❐╎💸❯ .هجوم⌉
❐╎📅❯ .يومي⌉
❐╎💎❯ .الماس⌉
❐╎🧾❯ .ترتيب⌉
❐╎💳❯ .ايدي⌉
❐╎🔖❯ .لفل⌉
❐╎📝❯ .تسجيل⌉
❐╎📃❯ .الغاء_التسجيل⌉
❐╎🎒❯ .حقيبه⌉
❐╎🏭❯ .صناعة⌉
   ────── • 〄 • ──────
  *≼📥≽ قـسـم التحميل+البحث╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🎥❯ .فيديو⌉
❐╎💾❯ .فيديو2⌉   ༺الرابط༻
❐╎🎵❯ .اغنيه⌉
❐╎🎶❯ .اغاني⌉  ༺الرابط༻
❐╎📻❯ .شغل⌉
❐╎🎞❯ .شغل1⌉
❐╎📸❯ .صورة ⌉
❐╎📷❯ .صوره2⌉
❐╎💻❯ .يوب⌉
❐╎🔍❯ .البحث⌉
❐╎📑❯ .ويكيبيديا⌉
❐╎📥❯ .تيك⌉  ༺الرابط༻
❐╎🤳❯ .تيك_صور⌉   ༺الرابط༻
❐╎🎬❯ .يوتيوب⌉
❐╎🎐❯ .بينترست⌉
❐╎📱❯ .فيسبوك⌉  ༺الرابط༻
❐╎👾❯ .تطبيق⌉
❐╎📲❯ .انستا⌉  ༺الرابط༻
❐╎💿❯ .ميديافاير⌉  ༺الرابط༻
❐╎📚❯ .مانجا⌉
❐╎📼❯ .فريبيك⌉
❐╎🪄❯ .جيف⌉
❐╎🌐❯ .جوجل⌉
❐╎🚘❯ .سياره⌉
❐╎🌐❯ .جيثوب⌉
❐╎✖️❯ .تويتر⌉  ༺الرابط༻
❐╎📽❯ .فيلم⌉
❐╎📂❯ .ملف⌉
❐╎🎫❯ .انستغرام⌉
❐╎📖❯ .كتاب⌉
❐╎⚽❯ .كرة-القدم⌉
❐╎📚❯ .تحميل-كتاب⌉
   ────── • 〄 • ──────
  *≼🎞≽ قـسـم الاديت+الصور≤🖼≥╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🎎❯ .طقم⌉
❐╎👨🏻‍💼❯ .طقم_اولاد⌉
❐╎👯‍♀️❯ .طقم_بنات⌉
❐╎🍷❯ .كابلز⌉
❐╎🖼❯ .خلفيه⌉
❐╎🎁❯ .خلفيات⌉
❐╎🤣❯ .ميمز⌉
❐╎🧝🏻‍♀️❯ .بنت⌉
❐╎📹❯ .ايديت⌉
❐╎💃🏻❯ .ايديت1⌉
❐╎🚘❯ .ايديت2⌉
❐╎⚽❯ .ايديت3⌉
❐╎🪞❯ .ايديت4⌉
❐╎🗼❯ .ايديت5⌉
❐╎🫗❯ .ماء⌉
❐╎😂❯ .لصديق⌉
❐╎🎞❯ .ايديت-مختلط⌉
❐╎🎧❯ .ايديت-اغنيه⌉
❐╎😎❯ .دراغون-بول⌉
❐╎🎐❯ .بليتش⌉
   ────── • 〄 • ──────
  *≼🎮≽ قـسـم الترفيه╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎❌❯ .اكس_او⌉
❐╎📛❯ .كنسل⌉
❐╎🎯❯ .تحدي⌉
❐╎⚔️❯ .حرب⌉
❐╎❔❯ .احزر⌉
❐╎🎰❯ .حظ⌉
❐╎🧔🏻❯ .جميل⌉
❐╎👋🏻❯ .صفع⌉
❐╎🙌🏻❯ .طبطبه⌉
❐╎👦🏻❯ .ورع⌉
❐╎🤪❯ .اهبل⌉
❐╎🐑❯ .خروف⌉
❐╎🗣❯ .انطق⌉
❐╎📊❯ .نسبه⌉
❐╎👥❯ .لو⌉
❐╎🍀❯ .تويت⌉
❐╎👑❯ .تاج⌉
❐╎❓❯ .سؤال⌉
❐╎🎤❯ .اسئلني⌉
❐╎📃❯  كت⌉
❐╎♟️❯ .شطرنج⌉
❐╎🗡❯ .سلاحي
❐╎🏁❯ .علم⌉
❐╎🧺❯ .نصايح⌉
❐╎👁❯ .عين⌉
❐╎🙃❯ .عكس⌉
❐╎✨❯ .تويت⌉
❐╎👰🏻❯ .مراتي⌉
❐╎🧩❯ .فزوره⌉
❐╎🔠❯ .حروف⌉
❐╎💁🏻‍♂️❯ .شخصيه⌉
❐╎😕❯ .احرجني⌉
❐╎👤❯ .خمن⌉
❐╎🏳️‍🌈❯ .شاذ⌉
❐╎🔧❯ .فكك⌉
❐╎🧞‍♂️❯ .المار⌉
❐╎🕋❯ .دين⌉
❐╎🍁❯ .ايمو⌉
❐╎⚽❯ .كوره⌉
❐╎🧮❯ .رياضيات⌉
❐╎🎧❯ .تخمين⌉
❐╎🎮❯ .العاب⌉
❐╎😁❯ .اموجي⌉
❐╎🤹‍♂️❯ .تحداني⌉
❐╎⛹️‍♂️❯ .رياضه⌉
❐╎🧨❯ .فعاليه⌉
❐╎🌍❯ .ثقافه⌉
❐╎🧧❯ .مانغا⌉
❐╎❓❯ .لغز⌉
❐╎💣❯ .متفجرات⌉
   ────── • 〄 • ──────
  *≼♻️≽ قـسـم التحويل╿↶*
*⋄━───═◞⬪⋇⬪◟═───━⋄*
❐╎🎈❯ .ملصق⌉
❐╎⚜️❯ .حقوق⌉
❐╎🏞️❯ .لصورة⌉
❐╎🎞️❯ .لفيديو⌉
❐╎⭕❯ .دائري⌉
❐╎🎭❯ .دمج⌉
❐╎🖇❯ .تليجراف⌉
❐╎🔊❯ .لصوت⌉
❐╎🔗❯ .لريك⌉
❐╎✉️❯ .تيلجرام⌉
❐╎🦁❯ .حيوان⌉
❐╎🐈❯ .قط⌉
❐╎🐕‍🦺❯ .كلب⌉
❐╎📦❯ .ستك⌉
❐╎🗂❯ .لملف⌉
❐╎🎲❯ .نرد⌉
❐╎🦸🏻‍♂️❯ .لانمي⌉
❐╎🖌❯ .ارسم⌉
❐╎⚽❯ .كريستيانو⌉
❐╎🐏❯ .ميسي⌉
❐╎⛰️❯ .جبل⌉
❐╎🥷🏻❯ .ببجي⌉
❐╎🛰❯ .تكنولوجيا⌉
❐╎👨🏻‍💻❯ .هكر⌉
❐╎🎼❯ .انميز⌉
❐╎🪐❯ .كوكب⌉
❐╎🦸🏻‍♂️❯ .كرتون⌉
❐╎🎮❯ .جيمينج⌉
❐╎🚙❯ .سيارة⌉
   ────── • 〄 • ──────
  *≼⚙️≽ قـسـم الادوات╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎®️❯ .لرابط⌉
❐╎©️❯ .باركود⌉
❐╎🗨❯ .ترجمه⌉
❐╎💭❯ .فضح⌉
❐╎📭❯ .تفريغ⌉
❐╎📇❯ .فحص⌉
❐╎🔎❯ .فحص-رابط⌉
❐╎🔂❯ .تكرار⌉
❐╎📬❯ .بريد⌉
❐╎✂️❯ .قص⌉
❐╎📟❯ .احسب⌉
❐╎📷❯ .جوده⌉
❐╎📩❯ .واتس⌉
❐╎🪧❯ .مطلوب⌉
❐╎📌❯ .انسخ⌉
❐╎⚙️❯ .بينغ⌉
   ────── • 〄 • ──────
  *≼🔊≽ قـسـم الصوتيات╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🔊❯ .عميق⌉
❐╎🔊❯ .منفوخ⌉
❐╎🔊❯ .تخين⌉
❐╎🔊❯ .صاخب⌉
❐╎🔊❯ .سريع⌉
❐╎🔊❯ .رفيع⌉
❐╎🔊❯ .روبوت⌉
❐╎🔊❯ .بطئ⌉
❐╎🔊❯ .ناعم⌉
❐╎🔊❯ .سنجاب⌉
❐╎🔊❯ .مكس⌉
   ────── • 〄 • ──────
  *≼👥≽ قـسـم الاعضاء╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🔦❯ .اختفاء⌉
❐╎⛔❯ .ابلاغ⌉
❐╎👀❯ .شوف⌉
❐╎🧊❯ .بارد⌉
❐╎😶‍🌫️❯ .سيري⌉
❐╎🗣❯ .تحدث⌉
❐╎🤖❯ .بوت⌉
❐╎👥❯ .بينغ⌉
❐╎🔖❯ .بروفايل⌉
❐╎🏃‍♂️❯ .سرعه⌉
❐╎✍🏻❯ .خط⌉
❐╎⁉️❯ .هل⌉
❐╎📧❯ .منشني⌉
❐╎🖥❯ .توب⌉
❐╎✒️❯ .تصاميم⌉
❐╎🖋❯ .تصميم⌉
❐╎👨🏻‍💻❯ .المطور⌉
❐╎🇾🇪❯ .المنشى⌉
❐╎💬❯ .تعليق⌉
❐╎📹❯ .ايديت⌉
❐╎📃❯ .الاستماره⌉
❐╎🪙❯ .الدعم⌉
❐╎🌏❯ .الطقس⌉
❐╎☘️❯ .بوست⌉
❐╎🌿❯ .عبارات⌉
❐╎📎❯ .رابطي⌉
❐╎📄❯ .السورس⌉
❐╎📜❯ .قوانين⌉
❐╎🫂❯ .المعرف⌉
❐╎👥❯ .المستخدمين⌉
❐╎💬❯ .بايدن⌉
❐╎🤳❯ .سيلفي⌉
❐╎💪🏻❯ .غوكو⌉
❐╎✒️❯ .خط-عربي⌉
❐╎💘❯ .الحب⌉
❐╎🥱❯ .تست⌉
❐╎👨🏻‍💻❯ .مطور⌉
❐╎💻❯ .الصانع⌉
❐╎👫🏻❯ .توام⌉
❐╎😚❯ .بوسه⌉
❐╎🥱❯ .نوعيه⌉
❐╎🗣❯ .سوالف⌉
   ────── • 〄 • ──────
  *≼🛡️≽ قـسـم المطور╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❏..🔕╎❯ .بان⌉
❏..🔔╎❯ .بانفك⌉
❏..🚫╎❯ .بانشات⌉
❏..⭕╎❯ .بانشاتفك⌉
❏..🔖╎❯ .حطهابروفايل⌉
❏..💎╎❯ .ضيفالماس⌉
❏..💱╎❯ .ضيفاكسبي⌉
❏..🔄╎❯ .اعاده⌉
❏..📤╎❯ .اخرج⌉
❏..📥╎❯ .ادخل⌉
❏..👨🏻‍💻╎❯ .تهكير⌉
❏..🧹╎❯ .تنظيف⌉
❏..🪄╎❯ .الامردا⌉
❏..⛔╎❯ .البلوكات⌉
❏..🔰╎❯ .فكالبلوك⌉
❏..📵╎❯ .بلوك⌉
❏..🖱╎❯ .بريم⌉
❏..🖲╎❯ .حذف_بريم⌉
❏..🎖╎❯ .المميزين⌉
❏..🏃‍♂️╎❯ .تسريع⌉
❏..🗞╎❯ .نشر⌉
❐..💀╎❯ .اعدام⌉
⋄━───═◞⬪*قوانين*⬪◟═───━⋄
🚩╎❯ *ممنوع سب البوت لانك سبيت البوت = سبيت المطور*
🚩╎❯ *تمتع بالبوت ولا تكتر اسبام للبوت اذا كان لديك مشكله او تريد اضافه اوامر اخري جديده تواصل مع المطور*
🚩╎❯  المطور wa.me/+201203024198
🚩╎❯ *تذكير فلسطين حرة 🇾🇪🫀🇵🇸*
*┛━ ╼━━━╃⌬〔 𝐸𝐿-𝐷𝐸𝑺𝑂𝐾𝐸𝐼𝑌 𝐵𝑂𝑇 〕⌬╄━━━╾ ━┗*
   `.trim()
       conn.sendMessage(m.chat, {
           video: { url: videoUrl }, caption: str,
     mentions: [m.sender,global.conn.user.jid],
     gifPlayback: true,gifAttribution: 0
       }, { quoted: m });
       await conn.sendMessage(m.chat, { react: { text: '🗃️', key: m.key } });
   };
   handler.help = ['main']
   handler.command = ['الاوامر','اوامر','منيو','menu']

   export default handler
   function clockString(ms) {
       let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
       let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
       let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
       return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

       function ucapan() {
         const time = moment.tz('Egypt').format('HH')
         let res = "بداية يوم سعيده ☀️"
         if (time >= 4) {
           res = "صباح الخير 🌄"
         }
         if (time >= 10) {
           res = "مساء الخير ☀️"
         }
         if (time >= 15) {
           res = "مساء الخير 🌇"
         }
         if (time >= 18) {
           res = "مساء الخير 🌙"
         }
         return res
       }
