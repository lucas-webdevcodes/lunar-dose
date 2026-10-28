const admin=require('firebase-admin'),M=require('./moon.js');
admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))});
(async()=>{
const now=new Date(),day=M.day(now),test=process.env.TEST==='1',h=now.getUTCHours();
if(!test&&!M.isFullMoonDay(now))return console.log('Hoje não é lua cheia:',day);
const slot=h<14?0:h<20?1:2;
const snap=await admin.firestore().collection('devices').get();
for(const d of snap.docs){const v=d.data();
if(!test&&((v.taken||[]).includes(day)||(v.doses==2&&slot==1)))continue;
const msg={token:d.id,notification:{title:'🌕 Lunar Dose',body:test?'Teste: está funcionando!':'Hoje é lua cheia. Hora do seu lembrete.'}};
if(process.env.APP_URL)msg.webpush={fcmOptions:{link:process.env.APP_URL}};
try{await admin.messaging().send(msg);console.log('enviado')}
catch(e){console.log(e.code);if(/not-registered|invalid/.test(e.code))await d.ref.delete()}}
})();
