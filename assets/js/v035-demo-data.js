/* v0.35 — coherent, fully populated prototype demo data */

const clientDemoProfilesV35={
  'Amanda Lim':{phone:'+65 9123 4567',email:'amanda.lim@example.com',age:'32',gender:'Female',emergencyName:'Jason Lim',emergencyPhone:'+65 9000 1122',startDate:'2026-08-15',purchaseDate:'2026-08-15',paid:true,gymMembership:true,remarks:'Prefers evening sessions. Keep progression gradual and review goals at renewal.',health:'Previous right-knee discomfort. Check current symptoms before lower-body loading and avoid sudden high-impact volume increases.'},
  'Mei & Aaron':{phone:'+65 9134 5678',email:'mei.aaron@example.com',age:'34',gender:'Female',emergencyName:'Aaron Lee',emergencyPhone:'+65 9011 2233',startDate:'2026-07-30',purchaseDate:'2026-07-29',paid:true,gymMembership:true,partnerPhone:'+65 9245 6789',remarks:'Couple sessions preferred on weekday evenings. Keep both clients on the same session time with individual loading.',health:'Mei: mild shoulder tightness after desk work. Aaron: no current limitations reported.'},
  'Daniel Koh':{phone:'+65 9145 6789',email:'daniel.koh@example.com',age:'41',gender:'Male',emergencyName:'Melissa Koh',emergencyPhone:'+65 9022 3344',startDate:'2026-06-12',purchaseDate:'2026-06-10',paid:true,gymMembership:true,remarks:'Prefers one consistent weekday slot. Mobility work should remain part of every warm-up.',health:'History of lower-back stiffness after prolonged sitting. No acute pain reported.'},
  'Farah Noor':{phone:'+65 9156 7890',email:'farah.noor@example.com',age:'29',gender:'Female',emergencyName:'Nadia Noor',emergencyPhone:'+65 9033 4455',startDate:'2026-06-18',purchaseDate:'2026-06-16',paid:true,gymMembership:true,remarks:'Two sessions weekly. Track consistency and waist/strength measures rather than scale weight alone.',health:'No current injuries. Build impact volume progressively.'},
  'Cheryl Tan':{phone:'+65 9167 8901',email:'cheryl.tan@example.com',age:'36',gender:'Female',emergencyName:'Marcus Tan',emergencyPhone:'+65 9044 5566',startDate:'2026-06-10',purchaseDate:'2026-06-08',paid:true,gymMembership:true,remarks:'Morning sessions work best. Renewal discussion is due after the 10-session progress checkpoint.',health:'Occasional left-wrist sensitivity in extended positions. Neutral-grip pressing is preferred when symptomatic.'},
  'Ryan Lee':{phone:'+65 9178 9012',email:'ryan.lee@example.com',age:'27',gender:'Male',emergencyName:'Elaine Lee',emergencyPhone:'+65 9055 6677',startDate:'2026-07-01',purchaseDate:'2026-06-29',paid:true,gymMembership:false,remarks:'Sports-conditioning focus. Keep sessions concise with clear performance targets.',health:'Previous right-ankle sprain, fully returned to sport. Continue ankle stability work.'},
  'Siti & Hakim':{phone:'+65 9189 0123',email:'siti.hakim@example.com',age:'33',gender:'Female',emergencyName:'Hakim Rahman',emergencyPhone:'+65 9066 7788',startDate:'2026-07-18',purchaseDate:'2026-07-16',paid:true,gymMembership:true,partnerPhone:'+65 9290 1234',remarks:'Weekend or late-evening couple sessions preferred. Keep exercise stations easy to alternate.',health:'Siti: no limitations. Hakim: monitor knee comfort during deeper squat ranges.'},
  'Gerald Wong':{phone:'+65 9190 1234',email:'gerald.wong@example.com',age:'44',gender:'Male',emergencyName:'Jasmine Wong',emergencyPhone:'+65 9077 8899',startDate:'2026-06-16',purchaseDate:'2026-06-14',paid:true,gymMembership:true,remarks:'One session weekly with additional independent cardio. Renewal due after current progress review.',health:'Blood-pressure readings reported as controlled by client; keep normal rest intervals and avoid rushed transitions.'},
  'Nicole Ng':{phone:'+65 9201 2345',email:'nicole.ng@example.com',age:'31',gender:'Female',emergencyName:'Eugene Ng',emergencyPhone:'+65 9088 9900',startDate:'2026-06-20',purchaseDate:'2026-06-18',paid:true,gymMembership:false,remarks:'Posture and upper-back strength are the main priorities. Works best with lunchtime or early-evening slots.',health:'Frequent neck/upper-trap tightness from desk work. No diagnosed injury reported.'},
  'Wei Ming':{phone:'+65 9212 3456',email:'wei.ming@example.com',age:'38',gender:'Male',emergencyName:'Li Xuan',emergencyPhone:'+65 9099 0011',startDate:'2026-07-28',purchaseDate:'2026-07-26',paid:true,gymMembership:true,remarks:'Two strength sessions weekly. Likes measurable load progression and consistent exercise selection.',health:'No current limitations reported.'},
  'Hannah Lim':{phone:'+65 9223 4567',email:'hannah.lim@example.com',age:'35',gender:'Female',emergencyName:'Rachel Lim',emergencyPhone:'+65 9100 1122',startDate:'2026-07-25',purchaseDate:'2026-07-23',paid:true,gymMembership:false,remarks:'Mobility-first programme. Morning and early-evening sessions are preferred.',health:'Previous tightness around hips after running. Emphasise controlled range and glute activation.'},
  'Jason & Claire':{phone:'+65 9234 5678',email:'jason.claire@example.com',age:'37',gender:'Male',emergencyName:'Claire Goh',emergencyPhone:'+65 9111 2233',startDate:'2026-08-01',purchaseDate:'2026-07-30',paid:true,gymMembership:true,partnerPhone:'+65 9345 6789',remarks:'Couple strength sessions. Prefer Saturday mornings and one weekday evening.',health:'Jason: no current limitations. Claire: avoid aggressive overhead range when shoulder feels tight.'}
};

const clientPackageMetaV35={
  'Amanda Lim':{label:'12 sessions',total:12,frequency:2},
  'Mei & Aaron':{label:'12 sessions',total:12,frequency:2},
  'Daniel Koh':{label:'24 weeks',total:24,frequency:1},
  'Farah Noor':{label:'24 weeks',total:48,frequency:2},
  'Cheryl Tan':{label:'24 weeks',total:24,frequency:1},
  'Ryan Lee':{label:'12 sessions',total:12,frequency:1},
  'Siti & Hakim':{label:'12 sessions',total:12,frequency:2},
  'Gerald Wong':{label:'24 weeks',total:24,frequency:1},
  'Nicole Ng':{label:'12 sessions',total:12,frequency:1},
  'Wei Ming':{label:'24 weeks',total:48,frequency:2},
  'Hannah Lim':{label:'12 sessions',total:12,frequency:1},
  'Jason & Claire':{label:'12 sessions',total:12,frequency:2}
};

const clientPreferredTimesV35={
  'Amanda Lim':'7:00pm','Mei & Aaron':'7:30pm','Daniel Koh':'8:00pm','Farah Noor':'10:00am',
  'Cheryl Tan':'8:00am','Ryan Lee':'6:00pm','Siti & Hakim':'8:00pm','Gerald Wong':'7:00pm',
  'Nicole Ng':'6:30pm','Wei Ming':'7:00pm','Hannah Lim':'6:00pm','Jason & Claire':'10:00am'
};

Object.entries(clientDemoProfilesV35).forEach(([name,seed])=>{
  clientExtendedData[name]={...(clientExtendedData[name]||{}),...seed};
  const c=clients.find(x=>x.name===name);
  const pkg=clientPackageMetaV35[name];
  if(c&&pkg){
    c.frequency=pkg.frequency;
    c.startDate=seed.startDate;
    c.paid=seed.paid;
    c.gymMembership=seed.gymMembership;
  }
});

// Trainer records are already feature-complete; normalise all profile fields so no owner view can fall back to placeholders.
const trainerCompleteDetailsV35={
  'Marcus Tan':{phone:'+65 9123 8877',gender:'Male',qualifications:'NSCA-CPT • CPR/AED • Strength & Conditioning'},
  'Rachel Ong':{phone:'+65 9234 1188',gender:'Female',qualifications:'ACE-CPT • CPR/AED • Functional Strength'},
  'Daniel Lee':{phone:'+65 9345 2299',gender:'Male',qualifications:'NSCA-CPT • CPR/AED • Sports Conditioning'},
  'Priya Nair':{phone:'+65 9456 3300',gender:'Female',qualifications:'ACE-CPT • Mobility Specialist • CPR/AED'},
  'Jerome Goh':{phone:'+65 9567 4411',gender:'Male',qualifications:'ACE-CPT • CPR/AED • Conditioning Coach'},
  'Aisha Rahman':{phone:'+65 9678 5522',gender:'Female',qualifications:'ACE-CPT • CPR/AED • Mobility & General Fitness'},
  'Kelvin Chua':{phone:'+65 9789 6633',gender:'Male',qualifications:'FISAF CPT • CPR/AED • Strength Training'}
};
Object.entries(trainerCompleteDetailsV35).forEach(([name,seed])=>Object.assign(ownerTrainerData[name],seed));

function parseClientLastDateV35(c){
  const m=String(c.last||'').match(/(\d{1,2})\s+([A-Za-z]{3})/);
  if(!m)return '2026-08-20';
  const months={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};
  return `2026-${months[m[2]]||'08'}-${String(Number(m[1])).padStart(2,'0')}`;
}
function isoShiftDaysV35(dateStr,days){const d=localDate(dateStr);d.setDate(d.getDate()+days);return isoDate(d)}
function safeIdV35(name){return name.replace(/[^A-Za-z0-9]+/g,'').slice(0,12).toUpperCase()}
function sessionPlanSeedV35(i,status){
  const plans=[
    [{exercise:'Smith back squat',weight:'25kg',reps:'8',rounds:'3',rest:'60 sec'}, {exercise:'Seated row',weight:'20kg',reps:'10',rounds:'3',rest:'60 sec'}],
    [{exercise:'Leg press',weight:'70kg',reps:'10',rounds:'3',rest:'75 sec'}, {exercise:'DB chest press (incline bench and flat bench)',weight:'10kg',reps:'10',rounds:'3',rest:'60 sec'}],
    [{exercise:'Smith deadlift',weight:'30kg',reps:'8',rounds:'3',rest:'75 sec'}, {exercise:'Cable wood chop',weight:'12.5kg',reps:'10',rounds:'3',rest:'45 sec'}]
  ];
  return plans[i%plans.length].map(x=>({...x,details:'',extraDetails:[],result:status==='Completed'?'Completed':'Planned'}));
}

const clientPackageSessionsV35={};

// Keep Amanda's established session IDs because requests and detailed exercise examples refer to them, but move future bookings beyond the prototype date.
const amandaFutureDatesV35={S101:'2026-08-31',S105:'2026-09-03',S106:'2026-09-07',S107:'2026-09-10',S108:'2026-09-14',S109:'2026-09-17',S110:'2026-09-21',S111:'2026-09-24',S112:'2026-09-28'};
amandaCurrentPackageSessions.forEach((e,i)=>{
  if(amandaFutureDatesV35[e.id])e.date=amandaFutureDatesV35[e.id];
  sessionStatusMap[e.id]=i<3?'Completed':(i===5||i===9?'Not planned':'Planned');
});
clientPackageSessionsV35['Amanda Lim']=amandaCurrentPackageSessions;

// Rebuild the non-Amanda package sessions so completed counts, history, renewal checkpoints and upcoming bookings all agree.
ownerOtherSessions.splice(0,ownerOtherSessions.length);
clients.filter(c=>c.name!=='Amanda Lim').forEach((c,clientIndex)=>{
  const meta=clientPackageMetaV35[c.name];
  const total=meta.total;
  const completed=Math.min(Number(c.completedSessions||0),total);
  const step=Math.max(3,Math.round(7/meta.frequency));
  const last=parseClientLastDateV35(c);
  const rows=[];
  const code=safeIdV35(c.name);
  const time=clientPreferredTimesV35[c.name]||'7:00pm';

  for(let i=0;i<completed;i++){
    const sequence=i+1;
    const id=`D35${code}${String(sequence).padStart(2,'0')}`;
    const date=isoShiftDaysV35(last,-step*(completed-1-i));
    const e={date,time,client:c.name,trainer:c.trainer,id,status:'Completed'};
    rows.push(e);ownerOtherSessions.push(e);sessionStatusMap[id]='Completed';
    sessionExercisePlans[id]=sessionPlanSeedV35(i,'Completed');
  }

  // Start future appointments after 30 Aug 2026, using the client's weekly frequency.
  let futureDate=isoShiftDaysV35('2026-08-30',1+(clientIndex%5));
  for(let i=completed;i<total;i++){
    const sequence=i+1;
    const id=`D35${code}${String(sequence).padStart(2,'0')}`;
    if(i>completed)futureDate=isoShiftDaysV35(futureDate,step);
    const status=((i-completed)%6===4)?'Not planned':'Planned';
    const e={date:futureDate,time,client:c.name,trainer:c.trainer,id,status};
    rows.push(e);ownerOtherSessions.push(e);sessionStatusMap[id]=status;
    sessionExercisePlans[id]=sessionPlanSeedV35(i,status);
  }
  clientPackageSessionsV35[c.name]=rows;
  c.renew=rows.length?formatDateShort(rows[rows.length-1].date).replace(' 2026',''):'—';
});

// Fix the preloaded trainer-change request so its session really belongs to Amanda / Marcus.
const trainerChangeRequestV35=portalRequestsV29.find(r=>r.id==='RQ-1003');
if(trainerChangeRequestV35){
  Object.assign(trainerChangeRequestV35,{trainer:'Marcus Tan',client:'Amanda Lim',sessionId:'S105',requestedTrainer:'Rachel Ong'});
}

function activeClientNameV35(){return document.getElementById('ownerClientName')?.textContent.trim()||'Amanda Lim'}
function activeClientV35(){return clients.find(c=>c.name===activeClientNameV35())||clients[0]}
function packageRowsV35(name){return clientPackageSessionsV35[name]||[]}
function packageMetaForClientV35(c){return clientPackageMetaV35[c.name]||{label:clientPackageName(c),total:12,frequency:1}}
function completedRowsV35(name){return packageRowsV35(name).filter(e=>(sessionStatusMap[e.id]||e.status)==='Completed')}
function upcomingRowsV35(name){return packageRowsV35(name).filter(e=>(sessionStatusMap[e.id]||e.status)!=='Completed')}
function clientInitialsV35(name){return name.split(/\s+|\s*&\s*/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}

function setInfoValueByLabelV35(panel,label,value){
  const rows=[...panel.querySelectorAll('.info-row')];
  const row=rows.find(r=>r.querySelector('span')?.textContent.trim()===label);
  const strong=row?.querySelector('strong');if(strong)strong.textContent=value;
}

function renderClientPackageSummaryV35(name){
  const c=clients.find(x=>x.name===name);if(!c)return;
  const meta=packageMetaForClientV35(c),profile=extendedClientData(name),rows=packageRowsV35(name);
  const completed=completedRowsV35(name).length,upcoming=rows.length-completed;
  const end=rows.length?rows[rows.length-1].date:'';
  const packagePanel=document.getElementById('owner-package')?.querySelector('.panel');
  const packageHead=packagePanel?.querySelector('.page-head');
  const packageSubtitle=packageHead?.querySelector('p');if(packageSubtitle)packageSubtitle.textContent=meta.label;
  if(packagePanel){
    setInfoValueByLabelV35(packagePanel,'Purchase date',profile.purchaseDate?isoToDisplayDate(profile.purchaseDate):'—');
    setInfoValueByLabelV35(packagePanel,'Total sessions',String(meta.total));
    setInfoValueByLabelV35(packagePanel,'Completed',String(completed));
    setInfoValueByLabelV35(packagePanel,'Remaining',`${Math.max(0,meta.total-completed)} sessions`);
    setInfoValueByLabelV35(packagePanel,'Upcoming bookings',`${upcoming} scheduled`);
    setInfoValueByLabelV35(packagePanel,'Package end',end?isoToDisplayDate(end):'—');
  }
  const endDisplay=document.getElementById('clientPackageEndDisplay');if(endDisplay)endDisplay.textContent=end?`${isoToDisplayDate(end)} • Session ${meta.total}`:'—';
  const used=document.getElementById('ownerPackageUsedDetail');if(used)used.textContent=completed;
  const balance=document.getElementById('ownerPackageBalanceDetail');if(balance)balance.textContent=`${Math.max(0,meta.total-completed)} sessions`;

  const pastBody=document.querySelector('#owner-package table tbody');
  if(pastBody){
    const hasPast=completed>=8;
    pastBody.innerHTML=hasPast?`<tr><td><strong>${meta.label}</strong><small class="muted" style="display:block;margin-top:3px">${meta.frequency} ${meta.frequency===1?'day':'days'}/week</small></td><td>${isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-42))}</td><td>${meta.total}</td><td>${isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-2))}</td><td><span class="pill green">Completed</span></td></tr>`:`<tr><td colspan="5" class="muted" style="text-align:center;padding:18px">No previous package on record.</td></tr>`;
  }
}

function renderClientHistoryV35(name){
  const tbody=document.querySelector('#owner-history tbody');if(!tbody)return;
  const rows=completedRowsV35(name).slice().reverse();
  tbody.innerHTML=rows.length?rows.map(e=>`<tr><td><strong>${formatDateShort(e.date)}</strong></td><td>${escapeHtml(e.trainer)}</td><td><span class="pill green">Completed</span></td><td><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></td></tr>`).join(''):'<tr><td colspan="4" class="muted" style="text-align:center;padding:18px">No completed sessions yet.</td></tr>';
}

renderClientPackageSessions=function(){
  const wrap=document.getElementById('sharedClientPackageSessions');if(!wrap)return;
  const name=activeClientNameV35(),c=clients.find(x=>x.name===name),meta=packageMetaForClientV35(c),rows=packageRowsV35(name);
  let completed=0,upcoming=0;
  wrap.innerHTML=rows.map((e,i)=>{const status=sessionStatusMap[e.id]||e.status||'Planned';if(status==='Completed')completed++;else upcoming++;const upcomingAttr=status==='Completed'?'':` data-upcoming-session="${e.id}"`;return `<div class="schedule-row"${upcomingAttr}><div><strong>Session ${i+1} of ${meta.total}</strong><small>${escapeHtml(name)} • ${escapeHtml(c?.type||'Individual')} PT</small></div><div class="schedule-time">${formatDateShort(e.date)} • ${e.time}</div><div><div class="schedule-trainer">${escapeHtml(e.trainer)}</div><div class="schedule-status" style="margin-top:5px">${statusPill(status)}</div></div><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></div>`}).join('');
  const badge=document.getElementById('currentPackageSummaryBadge');if(badge)badge.textContent=`${completed} completed • ${upcoming} upcoming`;
};

renderClientUpcomingSessionsV27=function(){
  const host=document.getElementById('clientUpcomingSessionsRows');if(!host)return;
  const name=activeClientNameV35(),rows=upcomingRowsV35(name),meta=packageMetaForClientV35(activeClientV35());
  host.innerHTML=rows.length?rows.map((e,i)=>{const seq=completedRowsV35(name).length+i+1;return `<div class="client-upcoming-row"><div class="client-upcoming-main"><strong>${formatDateShort(e.date)} • ${sessionTimeRangeV25(e)}</strong><small>${escapeHtml(e.trainer)} • Session ${seq}/${meta.total} • ${escapeHtml(sessionStatusMap[e.id]||e.status||'Planned')}</small></div><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></div>`}).join(''):'<div class="muted" style="padding:10px 2px">No upcoming sessions.</div>';
};

function renderClientAssignmentV35(name){
  const c=clients.find(x=>x.name===name);if(!c)return;
  const primary=document.getElementById('primaryTrainerName');if(primary)primary.textContent=c.trainer;
  const sel=document.getElementById('permanentTrainerSelect');
  if(sel){
    sel.innerHTML=Object.keys(ownerTrainerData).filter(t=>t!==c.trainer).map(t=>`<option>${escapeHtml(t)}</option>`).join('');
    if(typeof enhanceInAppSelect==='function')enhanceInAppSelect(sel);
  }
}

function renderSelectedClientV35(name){
  const c=clients.find(x=>x.name===name);if(!c)return;
  const avatar=document.querySelector('#owner-client .client-identity-card .portal-avatar');if(avatar)avatar.textContent=clientInitialsV35(name);
  displayClientExtendedDataV25(name);
  renderClientPackageSummaryV35(name);
  renderClientHistoryV35(name);
  renderClientUpcomingSessionsV27();
  renderClientAssignmentV35(name);
  renderClientPackageSessions();
}

openSharedClientProfile=function(name){
  clientMainEditing=false;
  document.getElementById('ownerClientName').textContent=name;
  document.getElementById('sharedClientDisplayName').textContent=name;
  configureSharedClientProfile();
  renderSelectedClientV35(name);
  const first=document.querySelector('#owner-client .tabs button');
  if(first)clientTab(first,'owner-overview');
  showPortal('owner-client');
  const cancel=document.getElementById('sharedClientCancelBtn');
  cancel?.classList.add('hidden');if(cancel)cancel.style.display='none';
  if(typeof enforceClientEditVisibilityV30Final==='function')setTimeout(enforceClientEditVisibilityV30Final,0);
};
openOwnerClient=function(name){openSharedClientProfile(name)};
openTrainerClient=function(name){openSharedClientProfile(name)};

// Use client-specific load variations so Progress does not show Amanda's exact numbers for every profile.
function activeClientStrengthDataV35(){
  const name=activeClientNameV35();
  const idx=Math.max(0,clients.findIndex(c=>c.name===name));
  const factor=0.78+(idx%7)*0.055;
  const dateOffset=(idx%5)-2;
  return Object.fromEntries(Object.entries(strengthProgressData).map(([exercise,points])=>[exercise,points.map(p=>({...p,date:(()=>{const m=p.date.match(/(\d{2}) ([A-Za-z]{3}) 2026/);if(!m)return p.date;const months={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};const iso=`2026-${months[m[2]]}-${m[1]}`;return formatDateShort(isoShiftDaysV35(iso,dateOffset))})(),load:Number((p.load*factor).toFixed(1))}))]));
}
renderStrengthProgressCards=function(activeName){
  const wrap=document.getElementById('strengthProgressCards');if(!wrap)return;const data=activeClientStrengthDataV35();
  wrap.innerHTML=Object.entries(data).map(([name,points])=>{const latest=points[points.length-1];return `<button class="strength-progress-card ${name===activeName?'active':''}" onclick="selectStrengthExercise('${name.replace(/'/g,"\\'")}')"><div class="exercise-name">${strengthExerciseShortName(name)}</div><div class="latest-load">${latest.load}<small>kg</small></div><div class="change">${strengthChangeText(points)}</div></button>`}).join('');
};
renderStrengthProgress=function(){
  const select=document.getElementById('strengthProgressExercise');if(!select)return;const data=activeClientStrengthDataV35();const name=select.value||Object.keys(data)[0],points=data[name]||[];if(!points.length)return;const latest=points[points.length-1];document.getElementById('strengthChartExercise').textContent=strengthExerciseShortName(name);document.getElementById('strengthLatestLoad').textContent=latest.load;document.getElementById('strengthLoadChange').textContent=strengthChangeText(points);document.getElementById('strengthCompletedCount').textContent=`${points.length} sessions`;renderStrengthProgressCards(name);renderStrengthProgressChart(points);const rows=document.getElementById('strengthProgressRows');if(rows)rows.innerHTML=[...points].reverse().map(p=>`<tr><td>${p.date}</td><td>${p.sets}</td><td>${p.reps}</td><td><strong>${p.load} kg</strong></td></tr>`).join('');
};

// Make package sequence resolution use the coherent per-client package rows.
sessionPackageSequenceV25=function(e){
  const rows=packageRowsV35(e.client);const idx=rows.findIndex(x=>x.id===e.id);const c=clients.find(x=>x.name===e.client);const total=packageMetaForClientV35(c).total;return `${idx>=0?idx+1:1}/${total}`;
};

// Keep list data and profile data in sync after permanent reassignment.
const _confirmPermanentReassignmentV35=confirmPermanentReassignment;
confirmPermanentReassignment=function(){
  const name=activeClientNameV35();
  _confirmPermanentReassignmentV35();
  setTimeout(()=>{const c=clients.find(x=>x.name===name);if(c){packageRowsV35(name).forEach(e=>e.trainer=c.trainer);renderSelectedClientV35(name)}},0);
};

document.addEventListener('DOMContentLoaded',()=>{
  renderClients();renderTrainerClients();renderOwnerMilestones();renderOwnerDashboardRequestsV29();renderOwnerRequestsV29();
  if(activeClientNameV35())renderSelectedClientV35(activeClientNameV35());
});
