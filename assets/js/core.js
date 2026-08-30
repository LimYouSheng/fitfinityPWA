const assets={gym1:'assets/images/equipment-squat-racks.jpg',gym2:'assets/images/equipment-dumbbells.jpg',gym3:'assets/images/equipment-cardio-zone.jpg',gym4:'assets/images/equipment-functional-area.jpg',gym5:'assets/images/equipment-adjustable-benches.jpg',gym6:'assets/images/equipment-recovery-stretch.jpg'};
const testimonials=[
 [{n:'JASON T.',t:'Fitfinity has completely changed the way I train. The coaches are knowledgeable and push me to be better every session!'},{n:'MEI LING K.',t:'I love the supportive environment here. The personal attention and structured programs keep me motivated.'},{n:'DARREN W.',t:'From feeling unfit to lifting heavier and moving better—Fitfinity is the best decision I made for my health.'}],
 [{n:'SOPHIA L.',t:'The personal coaching helped me move with confidence and stay consistent.'},{n:'MARCUS T.',t:'Clear plans, real tracking and a supportive team.'},{n:'JESSICA R.',t:'The gym feels personal rather than intimidating.'}],
 [{n:'AMANDA L.',t:'I can see my strength improve from session to session.'},{n:'MEI & AARON',t:'Couple training stays organised while still being individualised.'},{n:'DANIEL K.',t:'My trainer explains every exercise and adapts when needed.'}]
];
const clients=[
{name:'Amanda Lim',completedSessions:3,type:'Individual',goal:'Strength / 12 sessions',trainer:'Marcus Tan',last:'21 Aug',renew:'22 Sep'},
{name:'Mei & Aaron',completedSessions:6,type:'Couple',goal:'General strength / 12 sessions',trainer:'Rachel Ong',last:'22 Aug',renew:'10 Oct'},
{name:'Daniel Koh',completedSessions:10,type:'Individual',goal:'Mobility / 24 weeks',trainer:'Marcus Tan',last:'21 Aug',renew:'18 Oct'},
{name:'Farah Noor',completedSessions:10,type:'Individual',goal:'Weight loss / 24 weeks',trainer:'Rachel Ong',last:'20 Aug',renew:'12 Nov'},
{name:'Cheryl Tan',completedSessions:10,type:'Individual',goal:'Strength / 24 weeks',trainer:'Priya Nair',last:'22 Aug',renew:'28 Oct'},
{name:'Ryan Lee',completedSessions:7,type:'Individual',goal:'Sports conditioning / 12 sessions',trainer:'Daniel Lee',last:'19 Aug',renew:'05 Oct'},
{name:'Siti & Hakim',completedSessions:8,type:'Couple',goal:'General fitness / 12 sessions',trainer:'Aisha Rahman',last:'21 Aug',renew:'14 Oct'},
{name:'Gerald Wong',completedSessions:10,type:'Individual',goal:'Fat loss / 24 weeks',trainer:'Jerome Goh',last:'22 Aug',renew:'30 Nov'},
{name:'Nicole Ng',completedSessions:9,type:'Individual',goal:'Posture / 12 sessions',trainer:'Priya Nair',last:'18 Aug',renew:'08 Oct'},
{name:'Wei Ming',completedSessions:5,type:'Individual',goal:'Strength / 24 weeks',trainer:'Kelvin Chua',last:'20 Aug',renew:'26 Oct'},
{name:'Hannah Lim',completedSessions:4,type:'Individual',goal:'Mobility / 12 sessions',trainer:'Aisha Rahman',last:'19 Aug',renew:'16 Oct'},
{name:'Jason & Claire',completedSessions:6,type:'Couple',goal:'Strength / 12 sessions',trainer:'Rachel Ong',last:'22 Aug',renew:'20 Oct'}
];
let CURRENT_TRAINER='Marcus Tan';
const faqs=[['What are your gym operating hours?','The exact operating and staffed hours will be confirmed with the owner before launch.'],['Is there a contract or lock-in period?','Membership terms are shown in Glofox and should be confirmed before purchase.'],['Do I need to book a slot to train?','General access and booking rules depend on the selected membership.'],['What payment methods do you accept?','Payment and booking are handled through Glofox.'],['Can I freeze or pause my membership?','The owner should confirm the applicable pause policy.'],['Can I bring a friend to try the gym?','Use the free-tour/contact flow to check availability.']];
let currentRole='owner';
function goPublic(id,anchor){document.querySelectorAll('.public-page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===id));document.querySelector('.nav-links').classList.remove('open');window.scrollTo(0,0);if(anchor)setTimeout(()=>scrollToId(anchor),80)}
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
function renderTestimonials(i=0){document.getElementById('homeTestimonials').innerHTML=testimonials[i].map(x=>`<article class="quote"><div class="avatar">${x.n.split(' ')[0][0]}</div><div><strong>${x.n}</strong><div class="stars">★★★★★</div><p>${x.t}</p></div></article>`).join('')}
function rotateTestimonials(i){renderTestimonials(i);document.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',i===j))}
function renderFaq(){document.getElementById('faqGrid').innerHTML=faqs.map((x,i)=>`<div class="faq"><button class="faq-q" onclick="toggleFaq(this)"><span>${x[0]}</span><span>⌄</span></button><div class="faq-a">${x[1]}</div></div>`).join('')}
function toggleFaq(btn){const f=btn.parentElement;document.querySelectorAll('.faq').forEach(x=>{if(x!==f)x.classList.remove('open')});f.classList.toggle('open')}
function openModal(id){
  const modal=document.getElementById(id);
  if(!modal)return;
  modal.classList.add('show');
  document.body.classList.add('modal-open')
}function closeModal(id){
  const modal=document.getElementById(id);
  if(!modal)return;
  modal.classList.remove('show');
  if(!document.querySelector('.modal-bg.show')){
    document.body.classList.remove('modal-open')
  }
}
function openVideo(t){document.getElementById('videoTitle').textContent=t;openModal('videoModal')}
function openGallery(i){document.getElementById('galleryLarge').style.backgroundImage=`url('${assets['gym'+i]}')`;openModal('galleryModal')}
function openGlofox(p){document.getElementById('glofoxPlan').textContent=p+' membership';openModal('glofoxModal')}
function openWhatsapp(m){document.getElementById('whatsappMessage').textContent=`Hi Fitfinity, I would like to enquire about ${m}.`;openModal('whatsappModal')}
function openCall(){toast('Production behaviour: opens device dialler for 9772 3345.')}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2600)}
function login(e){e.preventDefault();const email=document.getElementById('loginEmail').value.toLowerCase();currentRole=email.includes('trainer')?'trainer':'owner';document.getElementById('publicShell').classList.add('hidden');document.getElementById('portal').classList.remove('hidden');document.getElementById('ownerMenu').classList.toggle('hidden',currentRole!=='owner');document.getElementById('trainerMenu').classList.toggle('hidden',currentRole!=='trainer');document.getElementById('roleChip').textContent=currentRole==='owner'?'OWNER / SITE ADMIN':'PERSONAL TRAINER';document.getElementById('userAvatar').textContent=currentRole==='owner'?'CH':'MT';document.getElementById('portalUserName').textContent=currentRole==='owner'?'Chau':'Marcus Tan';resetPortalNavigation();const root=currentRole==='owner'?'owner-dashboard':'trainer-dashboard';portalRootPage=root;history.replaceState({fitfinityPortal:true,page:root,role:currentRole},'',portalRouteHash(root));showPortal(root,{skipHistory:true,fromBrowser:true})}
const titles={'owner-dashboard':['Dashboard',''],'owner-requests':['Requests',''],'owner-clients':['Clients',''],'owner-client':['Client',''],'owner-trainers':['Trainers',''],'owner-trainer':['Trainer Profile','Trainer details'],'owner-trainer-clients':['Assigned Clients',''],'owner-sessions':['Sessions',''],'owner-finance':['Remuneration','Monthly trainer remuneration'],'owner-exercises':['Exercise Library',''],'owner-content':['Website Content',''],'owner-profile':['My Account','Owner account details'],'trainer-dashboard':['Dashboard',''],'trainer-clients':['Clients',''],'trainer-client':['Client',''],'trainer-sessions':['Sessions',''],'trainer-remuneration':['Remuneration','Monthly remuneration'],'trainer-plan':['Session Plan','Exercises and training details'],'trainer-complete':['Session Details',''],'trainer-profile':['My Account','Profile and availability']};
function togglePortalDrawer(){const side=document.querySelector('#portal .side'),scrim=document.getElementById('portalDrawerScrim');if(!side)return;const open=!side.classList.contains('mobile-open');side.classList.toggle('mobile-open',open);scrim?.classList.toggle('show',open)}
function closePortalDrawer(){document.querySelector('#portal .side')?.classList.remove('mobile-open');document.getElementById('portalDrawerScrim')?.classList.remove('show')}
let portalHistory=[];
let currentPortalPage=null;
let portalRootPage=null;

/*
 * Android/Chrome standalone PWAs are more reliable when each internal screen
 * creates a real fragment navigation entry.  The earlier prototype used only
 * history.pushState(), which some Android standalone sessions can treat like
 * there is no native Back destination.  Every portal screen now has a hash
 * route (#portal/<screen>) so Android Back/gesture traverses the same stack as
 * the visible in-app Back button.
 */
function portalRouteHash(id){return `#portal/${id}`}
function portalRouteFromLocation(){
  const match=(window.location.hash||'').match(/^#portal\/([a-z0-9-]+)$/i);
  return match?match[1]:null;
}

function updatePortalBackButton(){
  const btn=document.getElementById('portalBackBtn');
  if(!btn)return;
  const canGoBack=portalHistory.length>0;
  btn.disabled=!canGoBack;
  btn.title=canGoBack?'Return to the page you were just viewing':'No previous portal page';
}

function portalNavAlias(id){
  if(id==='owner-client')return currentRole==='trainer'?'trainer-clients':'owner-clients';
  if(id==='trainer-complete'||id==='trainer-plan')return currentRole==='trainer'?'trainer-sessions':'owner-sessions';
  if(id==='owner-trainer')return 'owner-trainers';
  return id;
}

function showPortal(id,options={}){
  const page=document.getElementById(id);
  if(!page)return false;
  if(!options.force&&currentPortalPage&&currentPortalPage!==id&&typeof hasUnsavedPortalEdits==='function'&&hasUnsavedPortalEdits()){
    if(!confirm('You have unsaved changes. Are you sure you want to leave this page?'))return false;
    if(typeof discardAllEditModes==='function')discardAllEditModes();
  }
  const skipHistory=!!options.skipHistory;
  const resetHistory=!!options.resetHistory;

  if(resetHistory){
    portalHistory=[];
    currentPortalPage=null;
  }

  const previous=currentPortalPage;
  if(!skipHistory&&previous&&previous!==id){
    portalHistory.push(previous);
  }

  currentPortalPage=id;

  document.querySelectorAll('.portal-page').forEach(p=>p.classList.remove('active'));
  page.classList.add('active');

  const activeNav=portalNavAlias(id);
  document.querySelectorAll('.side-menu button[data-portal]').forEach(
    b=>b.classList.toggle('active',b.dataset.portal===activeNav)
  );

  const t=titles[id]||['Staff Portal','Internal operations'];
  document.getElementById('portalTitle').textContent=t[0];
  document.getElementById('portalSubtitle').textContent=t[1];
  updatePortalBackButton();
  closePortalDrawer();
  window.scrollTo(0,0);

  if(!options.fromBrowser){
    const targetHash=portalRouteHash(id);
    if(options.replaceBrowser){
      history.replaceState({fitfinityPortal:true,page:id,role:currentRole},'',targetHash);
    }else if(!skipHistory&&window.location.hash!==targetHash){
      /* location.hash creates a genuine same-document browser-history entry. */
      window.location.hash=`portal/${id}`;
    }
  }
}

function portalBack(){
  if(portalHistory.length){
    history.back();
    return;
  }
  /* At the root screen, Android's next Back is allowed to leave the PWA. */
}

function resetPortalNavigation(){
  portalHistory=[];
  currentPortalPage=null;
  portalRootPage=null;
  updatePortalBackButton();
}

function syncPortalFromBrowser(){
  const portal=document.getElementById('portal');
  if(!portal||portal.classList.contains('hidden'))return;
  const target=portalRouteFromLocation();
  if(!target||!document.getElementById(target)||target===currentPortalPage)return;
  if(typeof hasUnsavedPortalEdits==='function'&&hasUnsavedPortalEdits()){
    if(!confirm('You have unsaved changes. Are you sure you want to leave this page?')){
      history.forward();
      return;
    }
    if(typeof discardAllEditModes==='function')discardAllEditModes();
  }

  /* A normal Back traversal should match the top of our logical stack. */
  if(portalHistory.length&&portalHistory[portalHistory.length-1]===target){
    portalHistory.pop();
  }else if(currentPortalPage&&currentPortalPage!==target){
    /* Forward/history traversal: retain a logical return destination. */
    portalHistory.push(currentPortalPage);
  }
  showPortal(target,{skipHistory:true,fromBrowser:true,force:true});
}

window.addEventListener('hashchange',syncPortalFromBrowser);
window.addEventListener('popstate',syncPortalFromBrowser);

function goPortalHome(){
  showPortal(currentRole==='owner'?'owner-dashboard':'trainer-dashboard');
}

function exitPortal(){
  resetPortalNavigation();
  document.getElementById('portal').classList.add('hidden');
  document.getElementById('publicShell').classList.remove('hidden');
  goPublic('home');
}

function openAccountProfile(){showPortal(currentRole==='owner'?'owner-profile':'trainer-profile')}
function toggleTrainerRate(id,btn){const el=document.getElementById(id);if(!el)return;const hidden=el.dataset.hidden!=='false';el.textContent=hidden?el.dataset.value:'••••••';el.dataset.hidden=hidden?'false':'true';if(btn){btn.textContent='👁';btn.classList.toggle('revealed',hidden);btn.setAttribute('aria-label',hidden?'Hide session rate':'Show session rate')}}
function openChangePasswordModal(){['currentPasswordInput','newPasswordInput','confirmPasswordInput'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});openModal('changePasswordModal')}
function savePasswordChange(){const current=document.getElementById('currentPasswordInput')?.value||'',next=document.getElementById('newPasswordInput')?.value||'',confirm=document.getElementById('confirmPasswordInput')?.value||'';if(!current||!next||!confirm)return toast('Complete all password fields.');if(next.length<8)return toast('New password must be at least 8 characters.');if(next!==confirm)return toast('New password confirmation does not match.');closeModal('changePasswordModal');toast('Password changed.')}
function openTrainerAvailabilityRequest(){
  const list=document.getElementById('trainerAvailabilityRequestBlocks');if(!list)return;
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  list.innerHTML=days.flatMap(day=>(trainerAvailabilityBlocks[CURRENT_TRAINER]?.[day]||[]).map(([a,b])=>`<div class="block-row" data-days="${day.slice(0,3)}" data-from="${a}" data-to="${b}"><div><strong>${day.slice(0,3)}</strong><br><small>${prettyTime(a)}–${prettyTime(b)}</small></div><button class="btn btn-sm btn-danger" onclick="this.closest('.block-row').remove()">Remove</button></div>`)).join('');
  const reason=document.getElementById('trainerAvailabilityRequestReason');if(reason)reason.value='';openModal('availabilityRequestModal')
}
function submitTrainerAvailabilityRequest(){
  const rows=[...document.querySelectorAll('#trainerAvailabilityRequestBlocks .block-row')];if(!rows.length)return toast('Add at least one availability block.');
  const proposed=availabilityRowsToMap('#trainerAvailabilityRequestBlocks');
  pendingAvailabilityRequest={proposed,reason:document.getElementById('trainerAvailabilityRequestReason')?.value.trim()||''};
  closeModal('availabilityRequestModal');renderOwnerTrainerAvailability(CURRENT_TRAINER);toast('Availability change sent to the owner for approval.')
}
function logout(){
  resetPortalNavigation();
  document.getElementById('portal').classList.add('hidden');
  document.getElementById('publicShell').classList.remove('hidden');
  goPublic('login');
  toast('Signed out.');
}
function renderClients(){
  const q=(document.getElementById('clientSearch')?.value||'').toLowerCase();
  const ty=document.getElementById('clientType')?.value||'';
  const trainer=document.getElementById('clientTrainerFilter')?.value||'';
  const rows=document.getElementById('clientRows');
  if(!rows)return;
  const filtered=clients.filter(c=>
    c.name.toLowerCase().includes(q)&&
    (!ty||c.type===ty)&&
    (!trainer||c.trainer===trainer)
  );
  rows.innerHTML=filtered.length
    ? filtered.map(c=>`<tr><td><strong>${c.name}</strong><small class="mobile-only">${c.type}</small></td><td><span class="pill ${c.type==='Couple'?'pink':'blue'}">${c.type}</span></td><td>${c.goal}<small class="mobile-only">Trainer: ${c.trainer}</small></td><td>${c.trainer}</td><td>${c.last}</td><td>${c.renew}</td><td><button class="btn btn-sm" onclick="openOwnerClient('${c.name}')">View</button></td></tr>`).join('')
    : '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">No clients match these filters.</td></tr>'
}



function clientPackageName(c){
  const parts=(c.goal||'').split('/');
  return (parts[1]||parts[0]||'PT package').trim()
}

function renderOwnerMilestones(){
  const host=document.getElementById('ownerMilestoneRows');
  const count=document.getElementById('ownerMilestoneCount');
  if(!host)return;

  const due=clients
    .filter(c=>Number(c.completedSessions||0)===10)
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(count)count.textContent=`${due.length} ${due.length===1?'client':'clients'}`;

  host.innerHTML=due.length
    ? due.slice(0,5).map(c=>`
      <div class="milestone-row">
        <div class="milestone-client">
          <strong>${c.name}</strong>
          <small>${clientPackageName(c)} • ${c.trainer}</small>
        </div>
        <div class="milestone-session-count">
          <span class="metric-label">COMPLETED</span>
          <strong>10 sessions</strong>
        </div>
        <div class="milestone-followup">
          <span class="pill amber">Renewal due</span>
        </div>
        <button class="btn btn-sm" onclick="openOwnerClient('${c.name.replace(/'/g,"\\'")}')">View Client</button>
      </div>
    `).join('')
    : '<div class="muted" style="padding:10px 2px">No upcoming renewals.</div>'
}

function populateTrainerControls(){
  const names=Object.keys(ownerTrainerData);

  const clientFilter=document.getElementById('clientTrainerFilter');
  if(clientFilter){
    const current=clientFilter.value;
    clientFilter.innerHTML='<option value="">All trainers</option>'+names.map(name=>`<option value="${name}">${name}</option>`).join('');
    clientFilter.value=names.includes(current)?current:''
  }

  const primary=document.getElementById('permanentTrainerSelect');
  if(primary){
    const current=document.getElementById('primaryTrainerName')?.textContent||CURRENT_TRAINER;
    primary.innerHTML=names.filter(name=>name!==current).map(name=>`<option>${name}</option>`).join('')
  }
}

function assignedClientsForTrainer(name){
  return clients.filter(c=>c.trainer===name)
}

function refreshTrainerAssignmentViews(){
  document.querySelectorAll('[data-trainer-client-count]').forEach(el=>{
    const name=el.dataset.trainerClientCount;
    el.textContent=assignedClientsForTrainer(name).length;
  });

  const marcus=assignedClientsForTrainer(CURRENT_TRAINER);
  const count=document.getElementById('trainerProfileAssignedCount');
  if(count)count.textContent=marcus.length;

  const list=document.getElementById('trainerProfileAssignedClients');
  if(list){
    list.innerHTML=marcus.length
      ? marcus.map(c=>`<div class="quick-row">
          <div><strong>${c.name}</strong><br><small class="muted">${c.goal}</small></div>
          <button class="btn btn-sm" onclick="openTrainerClient('${c.name}')">View</button>
        </div>`).join('')
      : '<div class="muted">No clients currently assigned.</div>'
  }
}

function updateTrainerPageStats(){
  const assigned=clients.filter(c=>c.trainer===CURRENT_TRAINER).length;
  const events=calendarEvents('trainer');
  const today=events.filter(e=>e.date===FITFINITY_TODAY).length;
  const notPlanned=events.filter(e=>e.status==='Not planned').length;
  const currentKey=Object.keys(financeMonthlyData)[0];
  const hours=currentKey&&financeMonthlyData[currentKey]?.trainers?.[CURRENT_TRAINER]?.hours;
  const set=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val};
  set('trainerAssignedClientsStat',assigned);set('trainerTodaySessionsStat',today);set('trainerNotPlannedStat',notPlanned);set('trainerCompletedHoursStat',Number(hours||0).toFixed(1));
}
function renderTrainerClients(){
  updateTrainerPageStats();
  const q=(document.getElementById('trainerClientSearch')?.value||'').toLowerCase();
  const ty=document.getElementById('trainerClientType')?.value||'';
  const rows=document.getElementById('trainerClientRows');
  if(!rows)return;
  rows.innerHTML=clients
    .filter(c=>c.trainer===CURRENT_TRAINER&&c.name.toLowerCase().includes(q)&&(!ty||c.type===ty))
    .map(c=>`<tr>
      <td><strong>${c.name}</strong><small class="mobile-only">${c.type}</small></td>
      <td><span class="pill ${c.type==='Couple'?'pink':'blue'}">${c.type}</span></td>
      <td>${c.goal}<small class="mobile-only">Trainer: ${c.trainer}</small></td>
      <td>${c.trainer}</td>
      <td>${c.last}</td>
      <td>${c.renew}</td>
      <td><button class="btn btn-sm" onclick="openTrainerClient('${c.name}')">View</button></td>
    </tr>`).join('');
}
function openSharedClientProfile(n){
  document.getElementById('ownerClientName').textContent=n;
  document.getElementById('sharedClientDisplayName').textContent=n;
  const isAmanda=n==='Amanda Lim';
  if(!isAmanda)toast('Wireframe note: detailed current-package dummy data is populated for Amanda Lim. The same profile layout applies to every client.');
  configureSharedClientProfile();
  renderClientPackageSessions();
  const first=document.querySelector('#owner-client .tabs button');
  if(first)clientTab(first,'owner-overview');
  showPortal('owner-client')
}
function openOwnerClient(n){openSharedClientProfile(n)}
function openTrainerClient(n){openSharedClientProfile(n)}
function clientProfileBack(){portalBack()}
function openSharedClientAllSessions(){showPortal(currentRole==='trainer'?'trainer-sessions':'owner-sessions')}
function openClientPackageSession(id){currentRole==='trainer'?openTrainerSessionPage(id):openOwnerSessionPage(id)}
function configureSharedClientProfile(){
  const trainer=currentRole==='trainer';
  document.getElementById('sharedClientEditBtn')?.classList.toggle('hidden',trainer);

  const assignmentTab=document.getElementById('sharedTrainerAssignmentTab');
  if(assignmentTab)assignmentTab.classList.toggle('hidden',trainer);

  const assignmentPanel=document.getElementById('owner-access');
  if(assignmentPanel&&trainer)assignmentPanel.classList.add('hidden');

  populateTrainerControls();
  const sel=document.getElementById('permanentTrainerSelect');
  const btn=document.getElementById('permanentReassignBtn');
  if(sel)sel.disabled=trainer;
  if(btn)btn.disabled=trainer;
}

const strengthProgressData={
  'Smith back squat':[
    {date:'10 Jul 2026',sets:3,reps:8,load:12.5},
    {date:'18 Jul 2026',sets:3,reps:8,load:15},
    {date:'28 Jul 2026',sets:3,reps:8,load:17.5},
    {date:'04 Aug 2026',sets:3,reps:8,load:20},
    {date:'17 Aug 2026',sets:3,reps:8,load:22.5},
    {date:'21 Aug 2026',sets:3,reps:8,load:25}
  ],
  'Leg press':[
    {date:'08 Jul 2026',sets:3,reps:10,load:50},
    {date:'20 Jul 2026',sets:3,reps:10,load:55},
    {date:'30 Jul 2026',sets:3,reps:10,load:60},
    {date:'07 Aug 2026',sets:3,reps:10,load:66},
    {date:'19 Aug 2026',sets:3,reps:10,load:72}
  ],
  'Smith chest press':[
    {date:'12 Jul 2026',sets:3,reps:10,load:10},
    {date:'24 Jul 2026',sets:3,reps:10,load:12.5},
    {date:'04 Aug 2026',sets:3,reps:10,load:12.5},
    {date:'14 Aug 2026',sets:3,reps:10,load:15},
    {date:'17 Aug 2026',sets:3,reps:10,load:15}
  ],
  'Seated row':[
    {date:'09 Jul 2026',sets:3,reps:10,load:14},
    {date:'21 Jul 2026',sets:3,reps:10,load:16},
    {date:'02 Aug 2026',sets:3,reps:10,load:18},
    {date:'11 Aug 2026',sets:3,reps:10,load:18},
    {date:'17 Aug 2026',sets:3,reps:10,load:20}
  ],
  'DB shoulder press (incline bench and flat bench)':[
    {date:'15 Jul 2026',sets:3,reps:8,load:6},
    {date:'27 Jul 2026',sets:3,reps:8,load:7.5},
    {date:'04 Aug 2026',sets:3,reps:8,load:7.5},
    {date:'14 Aug 2026',sets:3,reps:8,load:8},
    {date:'21 Aug 2026',sets:3,reps:8,load:10}
  ],
  'Smith deadlift':[
    {date:'11 Jul 2026',sets:3,reps:8,load:15},
    {date:'23 Jul 2026',sets:3,reps:8,load:17.5},
    {date:'07 Aug 2026',sets:3,reps:8,load:17.5},
    {date:'11 Aug 2026',sets:3,reps:8,load:20},
    {date:'21 Aug 2026',sets:3,reps:8,load:20}
  ]
};

function strengthExerciseShortName(name){
  if(name.startsWith('DB shoulder press'))return 'DB shoulder press';
  return name
}

function initStrengthProgress(){
  const select=document.getElementById('strengthProgressExercise');
  if(!select)return;
  select.innerHTML=Object.keys(strengthProgressData).map(name=>`<option value="${name}">${strengthExerciseShortName(name)}</option>`).join('');
  renderStrengthProgress()
}

function selectStrengthExercise(name){
  const select=document.getElementById('strengthProgressExercise');
  if(!select)return;
  select.value=name;
  renderStrengthProgress()
}

function strengthChangeText(points){
  if(!points.length)return '—';
  const diff=points[points.length-1].load-points[0].load;
  const sign=diff>0?'+':'';
  return `${sign}${Number(diff.toFixed(1))} kg`
}

function renderStrengthProgressCards(activeName){
  const wrap=document.getElementById('strengthProgressCards');
  if(!wrap)return;
  wrap.innerHTML=Object.entries(strengthProgressData).map(([name,points])=>{
    const latest=points[points.length-1];
    return `<button class="strength-progress-card ${name===activeName?'active':''}" onclick="selectStrengthExercise('${name.replace(/'/g,"\\'")}')">
      <div class="exercise-name">${strengthExerciseShortName(name)}</div>
      <div class="latest-load">${latest.load}<small>kg</small></div>
      <div class="change">${strengthChangeText(points)}</div>
    </button>`
  }).join('')
}

function renderStrengthProgress(){
  const select=document.getElementById('strengthProgressExercise');
  if(!select)return;
  const name=select.value||Object.keys(strengthProgressData)[0];
  const points=strengthProgressData[name]||[];
  if(!points.length)return;

  const latest=points[points.length-1];
  document.getElementById('strengthChartExercise').textContent=strengthExerciseShortName(name);
  document.getElementById('strengthLatestLoad').textContent=latest.load;
  document.getElementById('strengthLoadChange').textContent=strengthChangeText(points);
  document.getElementById('strengthCompletedCount').textContent=`${points.length} sessions`;

  renderStrengthProgressCards(name);
  renderStrengthProgressChart(points);

  const rows=document.getElementById('strengthProgressRows');
  if(rows)rows.innerHTML=[...points].reverse().map(p=>`<tr>
    <td>${p.date}</td>
    <td>${p.sets}</td>
    <td>${p.reps}</td>
    <td><strong>${p.load} kg</strong></td>
  </tr>`).join('')
}

function renderStrengthProgressChart(points){
  const svg=document.getElementById('strengthProgressChart');
  if(!svg||!points.length)return;

  const W=900,H=280,left=58,right=28,top=28,bottom=48;
  const chartW=W-left-right,chartH=H-top-bottom;
  let min=Math.min(...points.map(p=>p.load)),max=Math.max(...points.map(p=>p.load));
  const pad=Math.max(2,(max-min)*0.25);
  min=Math.max(0,min-pad);
  max=max+pad;
  if(max===min)max=min+1;

  const x=i=>left+(points.length===1?chartW/2:(i/(points.length-1))*chartW);
  const y=v=>top+((max-v)/(max-min))*chartH;
  const coords=points.map((p,i)=>[x(i),y(p.load)]);
  const line=coords.map((c,i)=>(i?'L':'M')+c[0].toFixed(1)+' '+c[1].toFixed(1)).join(' ');
  const area=line+` L ${coords[coords.length-1][0].toFixed(1)} ${top+chartH} L ${coords[0][0].toFixed(1)} ${top+chartH} Z`;

  const grid=[0,.25,.5,.75,1].map(frac=>{
    const gy=top+chartH*frac;
    const val=max-(max-min)*frac;
    return `<line class="strength-grid-line" x1="${left}" y1="${gy}" x2="${W-right}" y2="${gy}"/>
      <text class="strength-axis-text" x="${left-10}" y="${gy+4}" text-anchor="end">${Number(val.toFixed(1))}</text>`
  }).join('');

  const labels=points.map((p,i)=>{
    const date=p.date.replace(' 2026','');
    return `<text class="strength-axis-text" x="${x(i)}" y="${H-18}" text-anchor="middle">${date}</text>`
  }).join('');

  const dots=points.map((p,i)=>{
    const latest=i===points.length-1;
    return `<circle class="${latest?'strength-dot-latest':'strength-dot'}" cx="${x(i)}" cy="${y(p.load)}" r="${latest?6:5}"/>
      <text class="strength-value-text" x="${x(i)}" y="${y(p.load)-13}" text-anchor="middle">${p.load}</text>`
  }).join('');

  svg.innerHTML=`
    <defs>
      <linearGradient id="strengthLineGradient" x1="0" x2="1"><stop offset="0%" stop-color="#ff4f8b"/><stop offset="100%" stop-color="#6476ff"/></linearGradient>
      <linearGradient id="strengthAreaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6676ff" stop-opacity=".24"/><stop offset="100%" stop-color="#6676ff" stop-opacity="0"/></linearGradient>
    </defs>
    ${grid}
    <path class="strength-area" d="${area}"/>
    <path class="strength-line" d="${line}"/>
    ${dots}
    ${labels}
    <text class="strength-axis-text" x="16" y="${top+chartH/2}" transform="rotate(-90 16 ${top+chartH/2})" text-anchor="middle">Load (kg)</text>
  `
}

function clientTab(btn,id){document.querySelectorAll('.client-tab').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(id==='owner-progress')renderStrengthProgress()}
function exerciseTab(btn,id){document.querySelectorAll('.exercise-tab').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}
function openPlanner(n,t){document.getElementById('planClient').textContent=n;document.getElementById('planType').textContent=t;document.getElementById('coupleNotice').classList.toggle('hidden',t!=='Couple');showPortal('trainer-plan')}
const EXERCISE_LIBRARY={
  'Full Body':['Dumbbell renegade row','Dumbbell Push and Press or a handle grips ball and Vipr','RDL to bent over row with dumbbell and barbell and Vipr','Cable wood chop','Alternating back lunges to bicep curl with dumbbell or Vipr or barbell'],
  'Upper Body':['Smith chest press','Smith incline shoulder press','Smith bent over row','LPD','Seated row','Assisted pull up','DB chest press (incline bench and flat bench)','DB shoulder press (incline bench and flat bench)','DB or cable bicep curls both or single arm','DB or cable lateral raise both or single arm','Single arm LPD','Single arm row','Alternating DB chest press both or single arm','Alternating DB shoulder press both or single arm','Single arm DB row','DB or Cable alternating front raise'],
  'Core':['Upper core','Lower core','Obliques','Lower back'],
  'Lower Body':['Leg press','Smith back squat','Smith deadlift','Smith RDL','Barbell RDL and Barbell conventional DL','DB or KB Sumo Squat','Leg extension','DB Goblet squat'],
  'Single Leg':['Static lunge with DB and with Smith','Single leg extension','Alternating back lunge with dumbbell and with smith','Side lunges with DB or KB','Step up alternating with DB','Walking lunges','Curtsey lunges'],
  'Cardio':['Wall Ball','Alternating slam ball','Miniband side walk to star jump','Bench jump or Box jump','Fanbike interval','KB swing','TRX Mountain climber','Bodyweight cardio','Battle Ropes']
};

function filterOwnerExercises(){
  const q=(document.getElementById('ownerExerciseSearch')?.value||'').trim().toLowerCase();
  const cat=document.getElementById('ownerExerciseCategory')?.value||'';
  let shown=0;
  document.querySelectorAll('#owner-exercises .owner-exercise-row').forEach(row=>{
    const okName=!q || (row.dataset.name||'').includes(q);
    const okCat=!cat || row.dataset.category===cat;
    const show=okName&&okCat;
    row.style.display=show?'':'none';
    if(show) shown++;
  });
  const count=document.getElementById('ownerExerciseCount');
  if(count) count.textContent=shown+' shown';
  const active=[...document.querySelectorAll('#owner-exercises .owner-exercise-row')].filter(row=>row.querySelector('.pill')?.textContent.trim()==='Active').length;
  const stat=document.getElementById('activeExerciseCountStat');if(stat)stat.textContent=active;
}

const inactiveExerciseNames=new Set();
let activeExerciseLibraryRow=null;
function exerciseLibraryOptions(selected){
  const known=Object.values(EXERCISE_LIBRARY).flat();
  const customSelected=selected&&!known.includes(selected);
  return Object.entries(EXERCISE_LIBRARY).map(([group,items])=>{
    const activeItems=items.filter(x=>!inactiveExerciseNames.has(x));
    return activeItems.length?`<optgroup label="${group}">${activeItems.map(x=>`<option value="${x}" ${x===selected?'selected':''}>${x}</option>`).join('')}</optgroup>`:''
  }).join('')+`<option value="__custom__" ${customSelected?'selected':''}>Custom exercise…</option>`
}
function addExerciseLibraryItem(){
  const name=document.getElementById('newLibraryExerciseName')?.value.trim();
  const category=document.getElementById('newLibraryExerciseCategory')?.value||'Full Body';
  const description=document.getElementById('newLibraryExerciseDescription')?.value.trim()||'';
  const mediaInput=document.getElementById('newLibraryExerciseMedia');
  if(!name){toast('Enter an exercise name.');return}
  if(Object.values(EXERCISE_LIBRARY).flat().some(x=>x.toLowerCase()===name.toLowerCase())){toast('That exercise already exists in the library.');return}
  EXERCISE_LIBRARY[category]??=[];EXERCISE_LIBRARY[category].push(name);
  const media=mediaInput?.files?.length?'Uploaded media':'No media';
  const row=document.createElement('tr');
  row.className='owner-exercise-row';row.dataset.category=category;row.dataset.name=name.toLowerCase();row.dataset.description=description;
  row.innerHTML=`<td><strong>${escapeHtml(name)}</strong></td><td>${escapeHtml(category)}</td><td>${media}</td><td><span class="pill green">Active</span></td><td><button class="btn btn-sm" onclick="openExerciseLibraryEdit(this)">Edit</button></td>`;
  document.querySelector('#approvedExercises tbody')?.prepend(row);
  if(mediaInput)mediaInput.value='';document.getElementById('newLibraryExerciseName').value='';document.getElementById('newLibraryExerciseDescription').value='';
  closeModal('exerciseModal');filterOwnerExercises();toast('Exercise added to the library.')
}
function openExerciseLibraryEdit(btn){
  const row=btn.closest('.owner-exercise-row');if(!row)return;activeExerciseLibraryRow=row;
  document.getElementById('editLibraryExerciseName').value=row.querySelector('td strong')?.textContent.trim()||'';
  document.getElementById('editLibraryExerciseCategory').value=row.dataset.category||'Full Body';
  document.getElementById('editLibraryExerciseDescription').value=row.dataset.description||'';
  document.getElementById('editLibraryExerciseStatus').value=row.querySelector('.pill')?.textContent.trim()==='Inactive'?'Inactive':'Active';
  document.getElementById('editLibraryExerciseMediaState').textContent='Current media: '+(row.children[2]?.textContent.trim()||'No media');
  document.getElementById('editLibraryRemoveMedia').checked=false;document.getElementById('editLibraryExerciseMedia').value='';
  openModal('exerciseEditModal')
}
function saveExerciseLibraryEdit(){
  const row=activeExerciseLibraryRow;if(!row)return;
  const oldName=row.querySelector('td strong')?.textContent.trim()||'';const oldCat=row.dataset.category||'Full Body';
  const name=document.getElementById('editLibraryExerciseName').value.trim();const cat=document.getElementById('editLibraryExerciseCategory').value;
  const desc=document.getElementById('editLibraryExerciseDescription').value.trim();const status=document.getElementById('editLibraryExerciseStatus').value;
  if(!name){toast('Exercise name cannot be blank.');return}
  const oldArr=EXERCISE_LIBRARY[oldCat]||[];const idx=oldArr.indexOf(oldName);if(idx>=0)oldArr.splice(idx,1);
  EXERCISE_LIBRARY[cat]??=[];if(!EXERCISE_LIBRARY[cat].includes(name))EXERCISE_LIBRARY[cat].push(name);
  inactiveExerciseNames.delete(oldName);if(status==='Inactive')inactiveExerciseNames.add(name);else inactiveExerciseNames.delete(name);
  row.dataset.name=name.toLowerCase();row.dataset.category=cat;row.dataset.description=desc;
  row.children[0].innerHTML=`<strong>${escapeHtml(name)}</strong>`;row.children[1].textContent=cat;
  const replacement=document.getElementById('editLibraryExerciseMedia');const remove=document.getElementById('editLibraryRemoveMedia').checked;
  if(remove)row.children[2].textContent='No media';else if(replacement?.files?.length)row.children[2].textContent='Uploaded media';
  row.children[3].innerHTML=`<span class="pill ${status==='Active'?'green':'amber'}">${status}</span>`;
  closeModal('exerciseEditModal');activeExerciseLibraryRow=null;filterOwnerExercises();toast('Exercise library entry updated.')
}
function addExercise(name='Smith back squat'){const r=document.createElement('div');r.className='planner-row';r.innerHTML=`<select>${exerciseLibraryOptions(name)}</select><input value="3"><input value="8"><input value="20kg"><input value="60 sec"><div class="exercise-actions"><button class="camera-btn" title="Record exercise" onclick="openExerciseCapture(this.closest('.planner-row').querySelector('select').value,this)">📷</button><button class="btn btn-sm btn-danger" onclick="this.closest('.planner-row').remove()">Remove</button></div>`;document.getElementById('exerciseRows').appendChild(r)}
function addCustomExercise(){const r=document.createElement('div');r.className='planner-row';r.innerHTML=`<input placeholder="Manual exercise name"><input value="2"><input value="8"><input placeholder="Load"><input value="60 sec"><div class="exercise-actions"><button class="camera-btn" title="Record exercise" onclick="openExerciseCapture(this.closest('.planner-row').querySelector('input').value||'Custom exercise',this)">📷</button><button class="btn btn-sm btn-danger" onclick="this.closest('.planner-row').remove()">Remove</button></div>`;document.getElementById('exerciseRows').appendChild(r);toast('Custom exercise added to this session only.')}

const ownerTrainerData={
  'Marcus Tan':{initials:'MT',specialty:'Strength & Conditioning',email:'marcus@fitfinity.sg',qualifications:'NSCA, CPR/AED',clients:2,public:'Visible',status:'Active',peakRate:80,offpeakRate:55,peak:40,offpeak:22,sessions:62,hours:'62.0',payout:4410,samples:['Amanda Lim','Daniel Koh']},
  'Rachel Ong':{initials:'RO',specialty:'Strength & General Fitness',email:'rachel@fitfinity.sg',qualifications:'ACE-CPT, CPR/AED',clients:3,public:'Visible',status:'Active',peakRate:80,offpeakRate:55,peak:36,offpeak:19,sessions:55,hours:'55.0',payout:3925,samples:['Mei & Aaron','Farah Noor','Jason & Claire']},
  'Daniel Lee':{initials:'DL',specialty:'Sports Conditioning',email:'daniel@fitfinity.sg',qualifications:'NSCA-CPT, CPR/AED',clients:1,public:'Hidden',status:'Active',peakRate:80,offpeakRate:55,peak:30,offpeak:17,sessions:47,hours:'47.0',payout:3335,samples:['Ryan Lee']},
  'Priya Nair':{initials:'PN',specialty:'Strength & Mobility',email:'priya@fitfinity.sg',qualifications:'ACE-CPT, Mobility Specialist',clients:2,public:'Visible',status:'Active',peakRate:80,offpeakRate:55,peak:28,offpeak:16,sessions:44,hours:'44.0',payout:3120,samples:['Cheryl Tan','Nicole Ng']},
  'Jerome Goh':{initials:'JG',specialty:'Fat Loss & Conditioning',email:'jerome@fitfinity.sg',qualifications:'ACE-CPT, CPR/AED',clients:1,public:'Visible',status:'Active',peakRate:80,offpeakRate:55,peak:24,offpeak:15,sessions:39,hours:'39.0',payout:2745,samples:['Gerald Wong']},
  'Aisha Rahman':{initials:'AR',specialty:'Mobility & General Fitness',email:'aisha@fitfinity.sg',qualifications:'ACE-CPT, CPR/AED',clients:2,public:'Visible',status:'Active',peakRate:80,offpeakRate:55,peak:22,offpeak:14,sessions:36,hours:'36.0',payout:2530,samples:['Siti & Hakim','Hannah Lim']},
  'Kelvin Chua':{initials:'KC',specialty:'Strength',email:'kelvin@fitfinity.sg',qualifications:'FISAF CPT, CPR/AED',clients:1,public:'Hidden',status:'Password reset',peakRate:80,offpeakRate:55,peak:19,offpeak:12,sessions:31,hours:'31.0',payout:2180,samples:['Wei Ming']}
};

let activeOwnerTrainer='Marcus Tan';
let pendingAvailabilityRequest=null;

function renderOwnerTrainerAvailability(name=activeOwnerTrainer){
  const grid=document.getElementById('ownerTrainerAvailabilityGrid');
  if(grid)grid.innerHTML=availabilityGridMarkup(name);
  const pending=document.getElementById('ownerTrainerPendingAvailability');
  if(pending){
    if(name===CURRENT_TRAINER&&pendingAvailabilityRequest){
      const r=pendingAvailabilityRequest;
      const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const proposedRows=days.flatMap(day=>(r.proposed?.[day]||[]).map(([a,b])=>`<div class="availability-review-row"><strong>${day}</strong><span>${prettyTime(a)}–${prettyTime(b)}</span></div>`)).join('');
      pending.classList.remove('hidden');
      pending.innerHTML=`<div class="page-head" style="margin-bottom:10px"><div><h3>Pending Availability Change</h3><p>${escapeHtml(r.reason||'Trainer submitted a revised weekly availability.')}</p></div><span class="pill amber">Review</span></div><div class="availability-review-list">${proposedRows}</div><div class="actions" style="margin-top:12px"><button class="btn btn-sm btn-danger" onclick="rejectAvailabilityRequest()">Reject</button><button class="btn btn-sm btn-blue" onclick="approveAvailabilityRequest()">Approve New Availability</button></div>`
    }else{pending.classList.add('hidden');pending.innerHTML=''}
  }
}

function renderTrainerSelfAvailability(){
  const grid=document.getElementById('trainerSelfAvailabilityGrid');
  if(grid)grid.innerHTML=availabilityGridMarkup(CURRENT_TRAINER)
}

function openOwnerAvailabilityEditor(){
  const title=document.getElementById('ownerAvailabilityModalTitle');
  if(title)title.textContent=activeOwnerTrainer+' Availability';
  const list=document.getElementById('ownerAvailabilityCurrentBlocks');
  if(list){
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    list.innerHTML=days.flatMap(day=>(trainerAvailabilityBlocks[activeOwnerTrainer]?.[day]||[]).map(([a,b])=>
      `<div class="block-row" data-days="${day.slice(0,3)}" data-from="${a}" data-to="${b}"><div><strong>${day.slice(0,3)}</strong><br><small>${prettyTime(a)}–${prettyTime(b)}</small></div><button class="btn btn-sm btn-danger" onclick="this.closest('.block-row').remove()">Remove</button></div>`
    )).join('')
  }
  openModal('ownerAvailabilityModal')
}

function ownerTrainerTab(btn,id){document.querySelectorAll('.owner-trainer-tab').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}
function openOwnerTrainer(name){
  activeOwnerTrainer=name;
  const d=ownerTrainerData[name]||ownerTrainerData[CURRENT_TRAINER];
  const assigned=assignedClientsForTrainer(name);

  document.getElementById('ownerTrainerName').textContent=name;
  document.getElementById('ownerTrainerProfileName').textContent=name;
  document.getElementById('ownerTrainerAvatar').textContent=d.initials;
  document.getElementById('ownerTrainerSpecialty').textContent=d.specialty;
  document.getElementById('ownerTrainerEmail').textContent=d.email;
  document.getElementById('ownerTrainerQualifications').textContent=d.qualifications;
  document.getElementById('ownerTrainerPublic').textContent=d.public;
  document.getElementById('ownerTrainerSessions').textContent=d.sessions;
  document.getElementById('ownerTrainerHours').textContent=d.hours;
  document.getElementById('ownerTrainerPeakSessions').textContent=d.peak;
  document.getElementById('ownerTrainerOffpeakSessions').textContent=d.offpeak;
  document.getElementById('ownerTrainerPayout').textContent='$'+d.payout.toLocaleString();
  document.getElementById('ownerTrainerPeakRateDisplay').textContent='$'+(d.peakRate??80)+' / session';
  document.getElementById('ownerTrainerOffpeakRateDisplay').textContent='$'+(d.offpeakRate??55)+' / session';
  document.getElementById('ownerTrainerStatusText').textContent=d.status||'Active';
  document.getElementById('ownerTrainerRateEffectiveDisplay').textContent=isoToDisplayDate(d.rateEffectiveFrom||'2026-08-29');
  if(!ownerTrainerEditing)populateOwnerTrainerInlineFields(name);

  const st=document.getElementById('ownerTrainerStatus');
  st.className='pill '+(d.status==='Active'?'green':'amber');
  st.textContent=d.status==='Active'?'ACTIVE ACCOUNT':d.status.toUpperCase();

  renderOwnerTrainerAvailability(name);

  document.querySelectorAll('.owner-trainer-tab').forEach((x,i)=>x.classList.toggle('hidden',i!==0));
  document.querySelector('#owner-trainer .tabs button')?.click();
  showPortal('owner-trainer')
}
function openTrainerAssignedClientsModal(){
  const search=document.getElementById('trainerAssignedClientSearch');if(search)search.value='';
  const type=document.getElementById('trainerAssignedClientType');if(type)type.value='';
  document.getElementById('trainerAssignedClientsModalTitle').textContent=`${activeOwnerTrainer} — Clients`;
  renderTrainerAssignedClientsModal();openModal('trainerAssignedClientsModal')
}
function renderTrainerAssignedClientsModal(){
  const q=(document.getElementById('trainerAssignedClientSearch')?.value||'').trim().toLowerCase();
  const type=document.getElementById('trainerAssignedClientType')?.value||'';
  const rows=assignedClientsForTrainer(activeOwnerTrainer).filter(c=>(!q||c.name.toLowerCase().includes(q)||c.goal.toLowerCase().includes(q))&&(!type||c.type===type));
  const sub=document.getElementById('trainerAssignedClientsModalSubtitle');if(sub)sub.textContent=`${rows.length} ${rows.length===1?'client':'clients'}`;
  const host=document.getElementById('trainerAssignedClientsModalRows');if(!host)return;
  host.innerHTML=rows.length?rows.map(c=>`<div class="quick-row modal-client-row"><div><strong>${c.name}</strong><div class="compact-row-meta"><span class="pill ${c.type==='Couple'?'pink':'blue'}">${c.type}</span><span>${c.goal}</span></div></div><button class="btn btn-sm" onclick="openAssignedClientFromModal('${c.name.replace(/'/g,"\\'")}')">View</button></div>`).join(''):'<div class="muted empty-modal-result">No clients match these filters.</div>'
}
function openAssignedClientFromModal(name){closeModal('trainerAssignedClientsModal');openOwnerClient(name)}
function upcomingRenewalClients(){return clients.filter(c=>Number(c.completedSessions||0)===10).sort((a,b)=>a.name.localeCompare(b.name))}
function openUpcomingRenewalsModal(){const s=document.getElementById('upcomingRenewalsSearch');if(s)s.value='';const t=document.getElementById('upcomingRenewalsType');if(t)t.value='';renderUpcomingRenewalsModal();openModal('upcomingRenewalsModal')}
function renderUpcomingRenewalsModal(){
  const q=(document.getElementById('upcomingRenewalsSearch')?.value||'').trim().toLowerCase();
  const type=document.getElementById('upcomingRenewalsType')?.value||'';
  const rows=upcomingRenewalClients().filter(c=>(!q||c.name.toLowerCase().includes(q)||c.trainer.toLowerCase().includes(q)||c.goal.toLowerCase().includes(q))&&(!type||c.type===type));
  const sub=document.getElementById('upcomingRenewalsModalSubtitle');if(sub)sub.textContent=`${rows.length} ${rows.length===1?'client':'clients'}`;
  const host=document.getElementById('upcomingRenewalsModalRows');if(!host)return;
  host.innerHTML=rows.length?rows.map(c=>`<div class="milestone-row modal-renewal-row"><div class="milestone-client"><strong>${c.name}</strong><small>${clientPackageName(c)} • ${c.trainer}</small></div><div class="milestone-session-count"><span class="metric-label">COMPLETED</span><strong>${c.completedSessions} sessions</strong></div><div class="milestone-followup"><span class="pill amber">Renewal due</span></div><button class="btn btn-sm" onclick="openRenewalClientFromModal('${c.name.replace(/'/g,"\\'")}')">View</button></div>`).join(''):'<div class="muted empty-modal-result">No upcoming renewals match these filters.</div>'
}
function openRenewalClientFromModal(name){closeModal('upcomingRenewalsModal');openOwnerClient(name)}

let swipeBackStart=null;
function portalSwipeEnabled(){return !document.getElementById('portal')?.classList.contains('hidden')&&!document.querySelector('.modal-bg.show')}
document.addEventListener('touchstart',e=>{if(!portalSwipeEnabled()||e.touches.length!==1)return;const t=e.touches[0];if(t.clientX>56)return;swipeBackStart={x:t.clientX,y:t.clientY,time:Date.now()};void 0},{passive:true});
document.addEventListener('touchmove',e=>{if(!swipeBackStart||e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-swipeBackStart.x,dy=Math.abs(t.clientY-swipeBackStart.y);void 0},{passive:true});
document.addEventListener('touchend',e=>{if(!swipeBackStart)return;const t=e.changedTouches[0],dx=t.clientX-swipeBackStart.x,dy=Math.abs(t.clientY-swipeBackStart.y),dt=Date.now()-swipeBackStart.time;swipeBackStart=null;if(dx>=85&&dy<=70&&dt<=900&&portalHistory.length)portalBack()},{passive:true});

const financeMonthlyData={"2026-08":{"label":"16 Jul – 15 Aug 2026 • Payout 16 Aug","trainers":{"Marcus Tan":{"peak":40,"offpeak":22,"sessions":62,"hours":62.0,"payout":4410},"Rachel Ong":{"peak":36,"offpeak":19,"sessions":55,"hours":55.0,"payout":3925},"Daniel Lee":{"peak":30,"offpeak":17,"sessions":47,"hours":47.0,"payout":3335},"Priya Nair":{"peak":28,"offpeak":16,"sessions":44,"hours":44.0,"payout":3120},"Jerome Goh":{"peak":24,"offpeak":15,"sessions":39,"hours":39.0,"payout":2745},"Aisha Rahman":{"peak":22,"offpeak":14,"sessions":36,"hours":36.0,"payout":2530},"Kelvin Chua":{"peak":19,"offpeak":12,"sessions":31,"hours":31.0,"payout":2180}},"status":{"Marcus Tan":"Approved","Rachel Ong":"Approved","Daniel Lee":"Approved","Priya Nair":"Approved","Jerome Goh":"Pending","Aisha Rahman":"Approved","Kelvin Chua":"Pending"}},"2026-07":{"label":"16 Jun – 15 Jul 2026 • Payout 16 Jul","trainers":{"Marcus Tan":{"peak":38,"offpeak":20,"sessions":58,"hours":58.0,"payout":4140},"Rachel Ong":{"peak":34,"offpeak":18,"sessions":52,"hours":52.0,"payout":3710},"Daniel Lee":{"peak":28,"offpeak":16,"sessions":44,"hours":44.0,"payout":3120},"Priya Nair":{"peak":27,"offpeak":15,"sessions":42,"hours":42.0,"payout":2985},"Jerome Goh":{"peak":23,"offpeak":14,"sessions":37,"hours":37.0,"payout":2610},"Aisha Rahman":{"peak":21,"offpeak":13,"sessions":34,"hours":34.0,"payout":2395},"Kelvin Chua":{"peak":18,"offpeak":11,"sessions":29,"hours":29.0,"payout":2045}},"status":{"Marcus Tan":"Approved","Rachel Ong":"Approved","Daniel Lee":"Approved","Priya Nair":"Approved","Jerome Goh":"Approved","Aisha Rahman":"Approved","Kelvin Chua":"Approved"}},"2026-06":{"label":"16 May – 15 Jun 2026 • Payout 16 Jun","trainers":{"Marcus Tan":{"peak":37,"offpeak":19,"sessions":56,"hours":56.0,"payout":4005},"Rachel Ong":{"peak":33,"offpeak":17,"sessions":50,"hours":50.0,"payout":3575},"Daniel Lee":{"peak":27,"offpeak":15,"sessions":42,"hours":42.0,"payout":2985},"Priya Nair":{"peak":26,"offpeak":14,"sessions":40,"hours":40.0,"payout":2850},"Jerome Goh":{"peak":22,"offpeak":13,"sessions":35,"hours":35.0,"payout":2475},"Aisha Rahman":{"peak":20,"offpeak":12,"sessions":32,"hours":32.0,"payout":2260},"Kelvin Chua":{"peak":17,"offpeak":10,"sessions":27,"hours":27.0,"payout":1910}},"status":{"Marcus Tan":"Approved","Rachel Ong":"Approved","Daniel Lee":"Approved","Priya Nair":"Approved","Jerome Goh":"Approved","Aisha Rahman":"Approved","Kelvin Chua":"Approved"}},"2026-05":{"label":"16 Apr – 15 May 2026 • Payout 16 May","trainers":{"Marcus Tan":{"peak":36,"offpeak":18,"sessions":54,"hours":54.0,"payout":3870},"Rachel Ong":{"peak":31,"offpeak":17,"sessions":48,"hours":48.0,"payout":3415},"Daniel Lee":{"peak":26,"offpeak":14,"sessions":40,"hours":40.0,"payout":2850},"Priya Nair":{"peak":24,"offpeak":14,"sessions":38,"hours":38.0,"payout":2690},"Jerome Goh":{"peak":21,"offpeak":12,"sessions":33,"hours":33.0,"payout":2340},"Aisha Rahman":{"peak":19,"offpeak":11,"sessions":30,"hours":30.0,"payout":2125},"Kelvin Chua":{"peak":16,"offpeak":10,"sessions":26,"hours":26.0,"payout":1830}},"status":{"Marcus Tan":"Approved","Rachel Ong":"Approved","Daniel Lee":"Approved","Priya Nair":"Approved","Jerome Goh":"Approved","Aisha Rahman":"Approved","Kelvin Chua":"Approved"}},"2026-04":{"label":"16 Mar – 15 Apr 2026 • Payout 16 Apr","trainers":{"Marcus Tan":{"peak":34,"offpeak":18,"sessions":52,"hours":52.0,"payout":3710},"Rachel Ong":{"peak":30,"offpeak":16,"sessions":46,"hours":46.0,"payout":3280},"Daniel Lee":{"peak":25,"offpeak":14,"sessions":39,"hours":39.0,"payout":2770},"Priya Nair":{"peak":23,"offpeak":13,"sessions":36,"hours":36.0,"payout":2555},"Jerome Goh":{"peak":20,"offpeak":12,"sessions":32,"hours":32.0,"payout":2260},"Aisha Rahman":{"peak":18,"offpeak":11,"sessions":29,"hours":29.0,"payout":2045},"Kelvin Chua":{"peak":15,"offpeak":9,"sessions":24,"hours":24.0,"payout":1695}},"status":{"Marcus Tan":"Approved","Rachel Ong":"Approved","Daniel Lee":"Approved","Priya Nair":"Approved","Jerome Goh":"Approved","Aisha Rahman":"Approved","Kelvin Chua":"Approved"}}};

function money(n){return '$'+Number(n).toLocaleString()}

function financeMonthTotals(monthKey,trainerName=''){
  const month=financeMonthlyData[monthKey];
  const rows=trainerName?[month.trainers[trainerName]]:Object.values(month.trainers);
  const sessions=rows.reduce((s,d)=>s+d.sessions,0);
  const hours=rows.reduce((s,d)=>s+d.hours,0);
  const payout=rows.reduce((s,d)=>s+d.payout,0);
  return {sessions,hours,payout}
}

function financeMonthStatus(monthKey,trainerName=''){
  const month=financeMonthlyData[monthKey];
  if(trainerName)return month.status[trainerName]||'Pending';
  const values=Object.values(month.status);
  const approved=values.filter(x=>x==='Approved').length;
  return approved===values.length?'Approved':`${approved} / ${values.length} Approved`
}

function renderOwnerRemunerationMonths(){
  const body=document.getElementById('ownerRemunerationMonthRows');
  if(!body)return;
  body.innerHTML=Object.keys(financeMonthlyData).map(key=>{
    const m=financeMonthlyData[key],t=financeMonthTotals(key),status=financeMonthStatus(key);
    const approved=status==='Approved';
    return `<tr>
      <td><strong>${m.label}</strong></td>
      <td>${t.sessions}</td>
      <td>${t.hours.toFixed(1)}</td>
      <td><strong>${money(t.payout)}</strong></td>
      <td><span class="pill ${approved?'green':'amber'}">${status}</span></td>
      <td><button class="btn btn-sm" onclick="openRemunerationBreakdown('${key}','owner')">View</button></td>
    </tr>`
  }).join('')
}

function renderTrainerRemunerationMonths(){
  updateTrainerPageStats();
  const body=document.getElementById('trainerRemunerationMonthRows');
  if(!body)return;
  body.innerHTML=Object.keys(financeMonthlyData).map(key=>{
    const m=financeMonthlyData[key],d=m.trainers[CURRENT_TRAINER],status=m.status[CURRENT_TRAINER]||'Pending';
    return `<tr>
      <td><strong>${m.label}</strong></td>
      <td>${d.sessions}</td>
      <td>${d.hours.toFixed(1)}</td>
      <td><strong>${money(d.payout)}</strong></td>
      <td><span class="pill ${status==='Approved'?'green':'amber'}">${status}</span></td>
      <td><button class="btn btn-sm" onclick="openRemunerationBreakdown('${key}','trainer')">View</button></td>
    </tr>`
  }).join('')
}

function financeClientsForTrainer(trainer){
  const assigned=clients.filter(c=>c.trainer===trainer);
  return assigned.length?assigned:[{name:'Client',type:'Individual'}]
}

function remunerationCycleDates(monthKey){
  const [year,month]=monthKey.split('-').map(Number);
  return {
    start:new Date(year,month-2,16),
    end:new Date(year,month-1,15),
    payout:new Date(year,month-1,16)
  }
}

function remunerationWorkingDates(monthKey){
  const {start,end}=remunerationCycleDates(monthKey);
  const out=[];
  const d=new Date(start);
  while(d<=end){
    if(d.getDay()!==0)out.push(new Date(d));
    d.setDate(d.getDate()+1)
  }
  return out
}

function formatFinanceDate(date){
  return date.toLocaleDateString('en-SG',{day:'2-digit',month:'short',year:'numeric'})
}

function generateFinanceSessions(monthKey,trainerFilter=''){
  const month=financeMonthlyData[monthKey];
  const working=remunerationWorkingDates(monthKey);
  const peakTimes=['6:00pm','7:00pm','8:00pm'];
  const offTimes=['9:00am','10:00am','11:00am','2:00pm','3:00pm'];
  const trainerNames=trainerFilter?[trainerFilter]:Object.keys(month.trainers);
  const rows=[];

  trainerNames.forEach((trainer,trainerIndex)=>{
    const d=month.trainers[trainer];
    const assigned=financeClientsForTrainer(trainer);
    const approval=month.status[trainer]||'Pending';

    const addBand=(count,band,rate,times,offset)=>{
      for(let i=0;i<count;i++){
        const day=working[(i*2+trainerIndex*3+offset)%working.length];
        const cycle=Math.floor(i/working.length);
        const time=times[(i+cycle+trainerIndex)%times.length];
        const client=assigned[(i+offset)%assigned.length];
        rows.push({
          date:formatFinanceDate(day),
          day:day.getTime(),
          time,
          trainer,
          client:client.name,
          clientType:client.type,
          band,
          duration:'60 min',
          remuneration:rate,
          acknowledgement:'Signed',
          approval
        })
      }
    };

    addBand(d.peak,'Peak',80,peakTimes,0);
    addBand(d.offpeak,'Off-peak',55,offTimes,1);
  });

  const timeOrder={'9:00am':9,'10:00am':10,'11:00am':11,'2:00pm':14,'3:00pm':15,'6:00pm':18,'7:00pm':19,'8:00pm':20};
  return rows.sort((a,b)=>a.day-b.day||(timeOrder[a.time]||0)-(timeOrder[b.time]||0)||a.trainer.localeCompare(b.trainer))
}

function remunerationSessionCardMarkup(r){
  return `<div class="rem-session-card"><div class="rem-session-card-main"><strong>${r.client}</strong><small>${r.date} • ${r.time}</small></div><div class="rem-session-card-meta"><span>${r.clientType} • ${r.band}</span><span>${r.duration}</span></div><div class="rem-session-card-pay"><strong>${money(r.remuneration)}</strong><span class="pill green">${r.acknowledgement}</span></div></div>`
}

function ownerTrainerGroupMarkup(monthKey,trainer,detail,rows,status){
  const approved=status==='Approved';
  const safeId=trainer.replace(/\s+/g,'_');
  return `<div class="rem-trainer-group" id="remTrainerGroup_${safeId}">
    <div class="rem-trainer-summary">
      <div class="rem-trainer-name">
        <span class="metric-label">TRAINER</span>
        <strong>${trainer}</strong>
      </div>
      <div>
        <span class="metric-label">SESSIONS</span>
        <strong>${detail.sessions}</strong>
      </div>
      <div>
        <span class="metric-label">HOURS</span>
        <strong>${detail.hours.toFixed(1)}</strong>
      </div>
      <div>
        <span class="metric-label">REMUNERATION</span>
        <strong>${money(detail.payout)}</strong>
      </div>
      <div>
        <span class="metric-label">STATUS</span>
        <span class="pill ${approved?'green':'amber'}" id="remTrainerStatus_${safeId}">${status}</span>
      </div>
      <button class="btn btn-sm rem-trainer-expand" onclick="toggleRemunerationTrainer('${trainer.replace(/'/g,"\\'")}',this)">Expand</button>
      <button class="btn btn-sm ${approved?'':'btn-blue'}" id="remTrainerApprove_${safeId}" ${approved?'disabled':''} onclick="approveTrainerRemuneration('${monthKey}','${trainer.replace(/'/g,"\\'")}',this)">${approved?'Approved':'Approve'}</button>
    </div>
    <div class="rem-trainer-sessions hidden">
      <div class="rem-session-card-list">
        ${rows.map(r=>remunerationSessionCardMarkup(r)).join('')}
      </div>
    </div>
  </div>`
}


function approveTrainerRemuneration(monthKey,trainer,button){
  const month=financeMonthlyData[monthKey];
  if(!month||!month.status[trainer])return;

  month.status[trainer]='Approved';

  const safeId=trainer.replace(/\s+/g,'_');
  const statusEl=document.getElementById('remTrainerStatus_'+safeId);
  if(statusEl){
    statusEl.className='pill green';
    statusEl.textContent='Approved'
  }

  if(button){
    button.disabled=true;
    button.classList.remove('btn-blue');
    button.textContent='Approved'
  }

  const overall=financeMonthStatus(monthKey);
  const overallApproved=overall==='Approved';
  document.getElementById('remBreakdownStatus').innerHTML=
    `<span class="pill ${overallApproved?'green':'amber'}">${overall}</span>`;

  renderOwnerRemunerationMonths();
  renderTrainerRemunerationMonths();
  toast(`${trainer} remuneration approved for ${month.label}.`)
}

function toggleRemunerationTrainer(trainer,button){
  const group=document.getElementById('remTrainerGroup_'+trainer.replace(/\s+/g,'_'));
  if(!group)return;
  const sessions=group.querySelector('.rem-trainer-sessions');
  const opening=sessions.classList.contains('hidden');
  sessions.classList.toggle('hidden',!opening);
  group.classList.toggle('open',opening);
  button.textContent=opening?'Collapse':'Expand'
}

function openRemunerationBreakdown(monthKey,role){
  const month=financeMonthlyData[monthKey];
  const trainerName=role==='trainer'?CURRENT_TRAINER:'';
  const totals=financeMonthTotals(monthKey,trainerName);
  const status=financeMonthStatus(monthKey,trainerName);
  const approved=status==='Approved';

  document.getElementById('remunerationBreakdownTitle').textContent=month.label+' Remuneration';
  document.getElementById('remunerationBreakdownSubtitle').textContent=(role==='trainer'?CURRENT_TRAINER:'Trainer Remuneration')+' • 16th payout cycle';
  document.getElementById('remBreakdownSessions').textContent=totals.sessions;
  document.getElementById('remBreakdownHours').textContent=totals.hours.toFixed(1);
  document.getElementById('remBreakdownTotal').textContent=money(totals.payout);
  document.getElementById('remBreakdownStatus').innerHTML=`<span class="pill ${approved?'green':'amber'}">${status}</span>`;

  const ownerGroups=document.getElementById('remunerationOwnerGroups');
  const tableWrap=document.getElementById('remunerationSessionTableWrap');

  if(role==='owner'){
    ownerGroups.classList.remove('hidden');
    tableWrap.classList.add('hidden');

    ownerGroups.innerHTML=Object.entries(month.trainers).map(([trainer,detail])=>{
      const trainerRows=generateFinanceSessions(monthKey,trainer);
      const trainerStatus=month.status[trainer]||'Pending';
      return ownerTrainerGroupMarkup(monthKey,trainer,detail,trainerRows,trainerStatus)
    }).join('');
  }else{
    ownerGroups.classList.add('hidden');
    tableWrap.classList.remove('hidden');
    const rows=generateFinanceSessions(monthKey,CURRENT_TRAINER);
    tableWrap.innerHTML=rows.map(r=>remunerationSessionCardMarkup(r)).join('');
  }

  openModal('remunerationBreakdownModal')
}

function renderOwnerFinance(){renderOwnerRemunerationMonths()}
function renderTrainerRemuneration(){renderTrainerRemunerationMonths()}


let reassignSessionId=null, packageBalance=9, packageUsed=3, signatureHasInk=false, activeCaptureButton=null, whatsappSessionId=null, whatsappClientName='';
const sessionWhatsappLog={
S100:{count:1,last:'21 Aug 2026, 6:22pm'},
S118:{count:1,last:'21 Aug 2026, 8:05pm'}
};
const sessionTrainerOverrides={};
const trainerAvailabilityBlocks={
  'Marcus Tan':{
    Monday:[['18:00','21:00']],Tuesday:[['18:00','21:00']],Wednesday:[['18:00','21:00']],
    Thursday:[['18:00','21:00']],Friday:[['18:00','20:00']],Saturday:[['09:00','13:00']],Sunday:[]
  },
  'Rachel Ong':{
    Monday:[['18:00','21:00']],Tuesday:[['18:00','21:00']],Wednesday:[['18:00','21:00']],
    Thursday:[['19:00','21:00']],Friday:[['18:00','21:00']],Saturday:[['09:00','12:00']],Sunday:[]
  },
  'Daniel Lee':{
    Monday:[['17:00','20:00']],Tuesday:[['18:00','20:00']],Wednesday:[['17:00','20:00']],
    Thursday:[['18:00','20:00']],Friday:[['17:00','19:00']],Saturday:[['08:00','12:00']],Sunday:[]
  },
  'Priya Nair':{
    Monday:[['08:00','12:00']],Tuesday:[['18:00','21:00']],Wednesday:[['08:00','12:00']],
    Thursday:[['18:00','21:00']],Friday:[['08:00','12:00']],Saturday:[['09:00','13:00']],Sunday:[]
  },
  'Jerome Goh':{
    Monday:[['18:00','21:00']],Tuesday:[['18:00','21:00']],Wednesday:[['18:00','21:00']],
    Thursday:[['18:00','21:00']],Friday:[['18:00','20:00']],Saturday:[['10:00','14:00']],Sunday:[]
  },
  'Aisha Rahman':{
    Monday:[['09:00','13:00']],Tuesday:[['18:00','21:00']],Wednesday:[['09:00','13:00']],
    Thursday:[['18:00','21:00']],Friday:[['09:00','13:00']],Saturday:[['09:00','12:00']],Sunday:[]
  },
  'Kelvin Chua':{
    Monday:[['18:00','20:00']],Tuesday:[['18:00','20:00']],Wednesday:[['18:00','20:00']],
    Thursday:[['18:00','20:00']],Friday:[['18:00','20:00']],Saturday:[['08:00','11:00']],Sunday:[]
  }
};

function trainerAvailableForBlock(trainer,day,from,to){
  return (trainerAvailabilityBlocks[trainer]?.[day]||[]).some(([a,b])=>a<=from&&b>=to)
}

function trainerAvailableAt(trainer,date,time){
  const day=localDate(date).toLocaleDateString('en-US',{weekday:'long'});
  const start=to24Hour(time);
  const [h,m]=start.split(':').map(Number);
  const endMinutes=h*60+m+60;
  const end=`${String(Math.floor(endMinutes/60)).padStart(2,'0')}:${String(endMinutes%60).padStart(2,'0')}`;
  return trainerAvailableForBlock(trainer,day,start,end)
}

function availabilityGridMarkup(trainer){
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const short={Monday:'MON',Tuesday:'TUE',Wednesday:'WED',Thursday:'THU',Friday:'FRI',Saturday:'SAT',Sunday:'SUN'};
  const blocks=trainerAvailabilityBlocks[trainer]||{};
  return days.map(day=>{
    const slots=blocks[day]||[];
    return `<div class="availability-day"><strong>${short[day]}</strong>${
      slots.length
        ? slots.map(([a,b])=>`<div class="availability-block">${prettyTime(a)}–${prettyTime(b)}</div>`).join('')
        : '<span class="muted" style="font-size:10px">Unavailable</span>'
    }</div>`
  }).join('')
}
function iconEventButton(label,fn,cls=''){return `<button class="btn btn-sm ${cls}" onclick="event.stopPropagation();${fn}">${label}</button>`}
const sessionStatusMap={
S100:'Completed',S101:'Planned',S102:'Not planned',S103:'Planned',S104:'Planned',S105:'Planned',
S106:'Not planned',S107:'Planned',S108:'Planned',S109:'Planned',S110:'Not planned',S111:'Planned',S112:'Planned',
S116:'Completed',S117:'Completed',S118:'Completed',
S200:'Planned',S201:'Planned',S202:'Planned',S203:'Not planned',S204:'Planned',S205:'Planned'
};
function statusPill(status){const cls=status==='Completed'?'green':status==='Planned'?'blue':'amber';return `<span class="pill ${cls}">${status}</span>`}
const sessionScheduleOverrides={};
let activeCalendarEvent=null;
const FITFINITY_TODAY=(()=>{const d=new Date();const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`})();
const calendarNavState={owner:{view:'week',anchor:FITFINITY_TODAY},trainer:{view:'week',anchor:FITFINITY_TODAY}};
function localDate(dateStr){return new Date(dateStr+'T00:00:00')}
function isoDate(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`}
function addDays(dateStr,n){const d=localDate(dateStr);d.setDate(d.getDate()+n);return isoDate(d)}
function startOfWeek(dateStr){const d=localDate(dateStr),day=d.getDay(),diff=(day===0?-6:1-day);d.setDate(d.getDate()+diff);return isoDate(d)}
function formatTime12(t){if(!t)return '';if(/[ap]m$/i.test(t))return t;const [h0,m='00']=t.split(':');let h=Number(h0),ap=h>=12?'pm':'am';h=h%12||12;return `${h}:${m}${ap}`}
function formatDateShort(dateStr){const d=localDate(dateStr);return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
function formatWeekPeriod(startStr){const a=localDate(startStr),b=localDate(addDays(startStr,6));const aDay=a.getDate(),bDay=b.getDate(),aMon=a.toLocaleDateString('en-GB',{month:'short'}),bMon=b.toLocaleDateString('en-GB',{month:'short'}),yr=b.getFullYear();return a.getMonth()===b.getMonth()?`${aDay}–${bDay} ${bMon} ${yr}`:`${aDay} ${aMon}–${bDay} ${bMon} ${yr}`}
const amandaCurrentPackageSessions=[
{date:'2026-08-17',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S116',status:'Completed'},
{date:'2026-08-19',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S117',status:'Completed'},
{date:'2026-08-21',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S118',status:'Completed'},
{date:'2026-08-25',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S101',status:'Planned'},
{date:'2026-08-27',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S105',status:'Planned'},
{date:'2026-09-01',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S106',status:'Not planned'},
{date:'2026-09-03',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S107',status:'Planned'},
{date:'2026-09-08',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S108',status:'Planned'},
{date:'2026-09-10',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S109',status:'Planned'},
{date:'2026-09-15',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S110',status:'Not planned'},
{date:'2026-09-17',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S111',status:'Planned'},
{date:'2026-09-22',time:'7:00pm',client:'Amanda Lim',trainer:'Marcus Tan',id:'S112',status:'Planned'}
];
const ownerOtherSessions=[
{date:'2026-08-21',time:'6:00pm',client:'Daniel Koh',trainer:'Marcus Tan',id:'S100'},
{date:'2026-08-24',time:'8:00am',client:'Cheryl Tan',trainer:'Priya Nair',id:'S200'},
{date:'2026-08-24',time:'6:00pm',client:'Ryan Lee',trainer:'Daniel Lee',id:'S201'},
{date:'2026-08-25',time:'8:00pm',client:'Daniel Koh',trainer:'Marcus Tan',id:'S202'},
{date:'2026-08-26',time:'11:00am',client:'Mei & Aaron',trainer:'Rachel Ong',id:'S102'},
{date:'2026-08-26',time:'7:00pm',client:'Gerald Wong',trainer:'Jerome Goh',id:'S203'},
{date:'2026-08-27',time:'8:00pm',client:'Daniel Koh',trainer:'Marcus Tan',id:'S103'},
{date:'2026-08-28',time:'6:00pm',client:'Hannah Lim',trainer:'Aisha Rahman',id:'S204'},
{date:'2026-08-29',time:'10:00am',client:'Farah Noor',trainer:'Rachel Ong',id:'S104'},
{date:'2026-08-29',time:'11:00am',client:'Wei Ming',trainer:'Kelvin Chua',id:'S205'}
];
function calendarEvents(role){
  const all=[...ownerOtherSessions,...amandaCurrentPackageSessions];
  const resolved=all.map(e=>{
    const o=sessionScheduleOverrides[e.id]||{};
    const date=o.date||e.date;
    return {
      ...e,
      ...o,
      date,
      time:o.time?formatTime12(o.time):e.time,
      status:sessionStatusMap[e.id]||e.status||'Planned',
      ...(e.id&&sessionTrainerOverrides[e.id]?{trainer:sessionTrainerOverrides[e.id]}:{})
    }
  });
  return role==='trainer'?resolved.filter(e=>e.trainer===CURRENT_TRAINER):resolved
}
function renderOwnerAllSessions(){
  const body=document.getElementById('ownerSessionRows');
  if(!body)return;

  const q=(document.getElementById('ownerSessionSearch')?.value||'').trim().toLowerCase();
  const dateFilter=document.getElementById('ownerSessionDateFilter')?.value||'';
  const statusFilter=document.getElementById('ownerSessionStatusFilter')?.value||'';
  const typeFilter=document.getElementById('ownerSessionTypeFilter')?.value||'';
  const today=FITFINITY_TODAY;

  const events=calendarEvents('owner')
    .filter(e=>{
      const type=e.client.includes('&')?'Couple':'Individual';
      return (!q||(e.client+' '+e.trainer).toLowerCase().includes(q)) &&
        (!dateFilter||e.date===dateFilter) &&
        (!statusFilter||e.status===statusFilter) &&
        (!typeFilter||type===typeFilter)
    })
    .sort((a,b)=>{
      const af=a.date>=today,bf=b.date>=today;
      if(af!==bf)return af?-1:1;
      return af
        ?(a.date.localeCompare(b.date)||to24Hour(a.time).localeCompare(to24Hour(b.time)))
        :(b.date.localeCompare(a.date)||to24Hour(b.time).localeCompare(to24Hour(a.time)))
    });

  body.innerHTML=events.length
    ? events.map(e=>`<tr data-session-id="${e.id}">
        <td class="session-date-cell">${formatDateShort(e.date).replace(' 2026','')}, ${e.time}</td>
        <td data-session-trainer="${e.id}">${e.trainer}</td>
        <td>${e.client}<small class="mobile-only">Trainer: ${e.trainer}</small></td>
        <td>${e.client.includes('&')?'<span class="pill pink">Couple</span>':'Individual'}</td>
        <td>60 min</td>
        <td>${statusPill(e.status)}</td>
        <td><button class="btn btn-sm" onclick="openOwnerSessionPage('${e.id}')">View</button></td>
      </tr>`).join('')
    : '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">No sessions match these filters.</td></tr>'
}
function renderTrainerAllSessions(){
  updateTrainerPageStats();
  const body=document.getElementById('trainerSessionRows');
  if(!body)return;

  const q=(document.getElementById('trainerSessionSearch')?.value||'').trim().toLowerCase();
  const dateFilter=document.getElementById('trainerSessionDateFilter')?.value||'';
  const statusFilter=document.getElementById('trainerSessionStatusFilter')?.value||'';
  const today=FITFINITY_TODAY;

  const events=calendarEvents('trainer')
    .filter(e=>(!q||e.client.toLowerCase().includes(q))&&(!dateFilter||e.date===dateFilter)&&(!statusFilter||e.status===statusFilter))
    .sort((a,b)=>{
      const af=a.date>=today,bf=b.date>=today;
      if(af!==bf)return af?-1:1;
      return af
        ?(a.date.localeCompare(b.date)||to24Hour(a.time).localeCompare(to24Hour(b.time)))
        :(b.date.localeCompare(a.date)||to24Hour(b.time).localeCompare(to24Hour(a.time)));
    });

  body.innerHTML=events.map(e=>`<tr id="trainerSession${e.id}">
    <td>${formatDateShort(e.date).replace(' 2026','')}, ${e.time}</td>
    <td>${e.client}</td>
    <td>${e.client.includes('&')?'<span class="pill pink">Couple</span>':'Individual'}</td>
    <td class="session-state">${statusPill(e.status)}</td>
    <td class="session-actions"><button class="btn btn-sm" onclick="openTrainerSessionPage('${e.id}')">View</button></td>
  </tr>`).join('');

  if(!events.length){
    body.innerHTML='<tr><td colspan="5" class="muted" style="text-align:center;padding:24px">No sessions match these filters.</td></tr>'
  }
}

function renderClientPackageSessions(){
  const wrap=document.getElementById('sharedClientPackageSessions');if(!wrap)return;
  const resolved=new Map(calendarEvents('owner').filter(e=>amandaCurrentPackageSessions.some(s=>s.id===e.id)).map(e=>[e.id,e]));
  let completed=0,upcoming=0;
  wrap.innerHTML=amandaCurrentPackageSessions.map((base,i)=>{const e=resolved.get(base.id)||base;const status=sessionStatusMap[e.id]||e.status||'Planned';if(status==='Completed')completed++;else upcoming++;const upcomingAttr=status==='Completed'?'':` data-upcoming-session="${e.id}"`;return `<div class="schedule-row"${upcomingAttr}><div><strong>Session ${i+1} of 12</strong><small>Amanda Lim • Individual PT</small></div><div class="schedule-time">${formatDateShort(e.date)} • ${e.time}</div><div><div class="schedule-trainer">${e.trainer}</div><div class="schedule-status" style="margin-top:5px">${statusPill(status)}</div></div><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></div>`}).join('');
  document.getElementById('currentPackageSummaryBadge').textContent=`${completed} completed • ${upcoming} upcoming`;
}


function ownerDaySessions(dateStr){
  return calendarEvents('owner')
    .filter(e=>e.date===dateStr)
    .sort((a,b)=>to24Hour(a.time).localeCompare(to24Hour(b.time))||a.trainer.localeCompare(b.trainer))
}

function openOwnerDaySessions(dateStr){
  const rows=ownerDaySessions(dateStr);
  const d=localDate(dateStr);

  document.getElementById('ownerDaySessionsTitle').textContent=
    d.toLocaleDateString('en-SG',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  document.getElementById('ownerDaySessionsSubtitle').textContent=
    `${rows.length} ${rows.length===1?'session':'sessions'} across all trainers`;

  const grouped=rows.reduce((acc,e)=>{
    if(!acc[e.trainer])acc[e.trainer]=[];
    acc[e.trainer].push(e);
    return acc
  },{});

  const trainerOrder=Object.keys(grouped).sort((a,b)=>{
    const aFirst=grouped[a][0];
    const bFirst=grouped[b][0];
    return to24Hour(aFirst.time).localeCompare(to24Hour(bFirst.time)) || a.localeCompare(b)
  });

  const host=document.getElementById('ownerDaySessionsRows');
  host.innerHTML=rows.length
    ? trainerOrder.map(trainer=>`
      <section class="owner-day-trainer-group">
        <div class="owner-day-trainer-head">
          <div>
            <strong>${trainer}</strong>
            <small>${grouped[trainer].length} ${grouped[trainer].length===1?'session':'sessions'}</small>
          </div>
        </div>
        <div class="owner-day-trainer-sessions">
          ${grouped[trainer].map(e=>`
            <button class="owner-day-session-row" onclick="openOwnerDaySession('${e.id}')">
              <div class="owner-day-session-time">
                <strong>${e.time}</strong>
                <small>60 min</small>
              </div>
              <div class="owner-day-session-person">
                <strong>Client: ${e.client}</strong>
                <small>${e.client.includes('&')?'Couple':'Individual'} session</small>
              </div>
              <div class="owner-day-session-state">${statusPill(e.status)}</div>
              <span class="owner-day-session-open">View →</span>
            </button>
          `).join('')}
        </div>
      </section>
    `).join('')
    : '<div class="muted" style="padding:18px 0">No sessions scheduled for this day.</div>';

  openModal('ownerDaySessionsModal')
}

function openOwnerDaySession(id){
  closeModal('ownerDaySessionsModal');
  openOwnerSessionPage(id)
}

function ownerCalendarDayMarkup(dateStr,events,view){
  if(!events.length)return '';

  return `<button class="owner-day-expand owner-day-summary-card" onclick="openOwnerDaySessions('${dateStr}')">
    <strong>${events.length}</strong>
    <span>${events.length===1?'session':'sessions'}</span>
    <small>View day</small>
  </button>`
}

function trainerDaySessions(dateStr){
  return calendarEvents('trainer')
    .filter(e=>e.date===dateStr)
    .sort((a,b)=>to24Hour(a.time).localeCompare(to24Hour(b.time)))
}
function openTrainerDaySessions(dateStr){
  const rows=trainerDaySessions(dateStr);
  const d=localDate(dateStr);
  document.getElementById('ownerDaySessionsTitle').textContent=d.toLocaleDateString('en-SG',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  document.getElementById('ownerDaySessionsSubtitle').textContent=`${rows.length} ${rows.length===1?'session':'sessions'}`;
  const host=document.getElementById('ownerDaySessionsRows');
  host.innerHTML=rows.length?`<section class="owner-day-trainer-group"><div class="owner-day-trainer-sessions">${rows.map(e=>`
    <button class="owner-day-session-row" onclick="openTrainerDaySession('${e.id}')">
      <div class="owner-day-session-time"><strong>${e.time}</strong><small>60 min</small></div>
      <div class="owner-day-session-person"><strong>${e.client}</strong><small>${e.client.includes('&')?'Couple':'Individual'} session</small></div>
      <div class="owner-day-session-state">${statusPill(e.status)}</div>
      <span class="owner-day-session-open">View →</span>
    </button>`).join('')}</div></section>`:'<div class="muted" style="padding:18px 0">No sessions scheduled for this day.</div>';
  openModal('ownerDaySessionsModal')
}
function openTrainerDaySession(id){closeModal('ownerDaySessionsModal');openTrainerSessionPage(id)}
function trainerCalendarDayMarkup(dateStr,events,view){
  if(!events.length)return '';
  return `<button class="owner-day-expand owner-day-summary-card trainer-day-summary-card" onclick="openTrainerDaySessions('${dateStr}')">
    <strong>${events.length}</strong><span>${events.length===1?'session':'sessions'}</span><small>View day</small>
  </button>`
}

function calendarEventActions(role,e,dayLabel){
  return ''
}
function renderCalendarInto(role,view,gridId){
  const grid=document.getElementById(gridId);
  if(!grid)return;

  const state=calendarNavState[role];
  const events=calendarEvents(role);

  if(view==='week'){
    const start=startOfWeek(state.anchor);
    const dates=Array.from({length:7},(_,i)=>addDays(start,i));
    grid.className='calendar-grid';

    grid.innerHTML=dates.map(dateStr=>{
      const d=localDate(dateStr);
      const label=d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric'});
      const ev=events.filter(e=>e.date===dateStr)
        .sort((a,b)=>to24Hour(a.time).localeCompare(to24Hour(b.time)));
      const today=dateStr===FITFINITY_TODAY;

      const content=role==='owner'
        ? ownerCalendarDayMarkup(dateStr,ev,'week')
        : ev.map(e=>`<div class="calendar-event" role="button" tabindex="0"
            aria-label="${e.client}, ${e.time}, ${e.status}"
            onclick="openCalendarEventDetails('${role}','${e.id}','${dateStr}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCalendarEventDetails('${role}','${e.id}','${dateStr}')}">
            <strong>${e.time}</strong><br>
            <span class="calendar-client">${e.client}</span><br>
            ${statusPill(e.status)}${calendarEventActions(role,e,label)}
          </div>`).join('');

      return `<div class="calendar-day ${today?'today':''}">
        <div class="calendar-day-head">
          <span>${label}</span>
          <span>${today?'TODAY':''}</span>
        </div>
        ${content}
      </div>`
    }).join('')
  }else{
    const anchor=localDate(state.anchor);
    const year=anchor.getFullYear();
    const month=anchor.getMonth();
    const first=new Date(year,month,1);
    const offset=(first.getDay()+6)%7;
    const start=new Date(year,month,1-offset);
    const total=42;

    grid.className='calendar-grid month-grid '+(role==='owner'?'owner-month-grid':'trainer-month-grid');

    grid.innerHTML=Array.from({length:total},(_,i)=>{
      const d=new Date(start);
      d.setDate(start.getDate()+i);
      const dateStr=isoDate(d);
      const out=d.getMonth()!==month;
      const ev=events.filter(e=>e.date===dateStr)
        .sort((a,b)=>to24Hour(a.time).localeCompare(to24Hour(b.time)));
      const today=dateStr===FITFINITY_TODAY;

      const content=role==='owner'
        ? ownerCalendarDayMarkup(dateStr,ev,'month')
        : trainerCalendarDayMarkup(dateStr,ev,'month');

      return `<div class="calendar-day ${out?'outside':''} ${today?'today':''}">
        <div class="calendar-day-head"><span>${d.toLocaleDateString('en-SG',{weekday:'short'}).toUpperCase()} ${d.getDate()}</span></div>
        ${content}
      </div>`
    }).join('')
  }
}

function updateCalendarPeriod(role){
  const state=calendarNavState[role];
  const per=document.getElementById(role+'DashCalendarPeriod');
  if(!per)return;
  if(state.view==='week'){
    per.textContent=formatWeekPeriod(startOfWeek(state.anchor))
  }else{
    const d=localDate(state.anchor);
    per.textContent=d.toLocaleDateString('en-GB',{month:'long',year:'numeric'})
  }
}

function setDashboardCalendar(role,view){
  const state=calendarNavState[role];
  state.view=view;
  document.getElementById(role+'DashWeekBtn')?.classList.toggle('active',view==='week');
  document.getElementById(role+'DashMonthBtn')?.classList.toggle('active',view==='month');
  updateCalendarPeriod(role);
  renderCalendarInto(role,view,role+'DashCalendarGrid')
}

function moveDashboardCalendar(role,delta){
  const state=calendarNavState[role];
  const d=localDate(state.anchor);
  if(state.view==='week')d.setDate(d.getDate()+delta*7);
  else d.setMonth(d.getMonth()+delta);
  state.anchor=isoDate(d);
  updateCalendarPeriod(role);
  renderCalendarInto(role,state.view,role+'DashCalendarGrid')
}

function goDashboardCalendarToday(role){
  calendarNavState[role].anchor=FITFINITY_TODAY;
  updateCalendarPeriod(role);
  renderCalendarInto(role,calendarNavState[role].view,role+'DashCalendarGrid')
}


function whatsappStatusMarkup(id){
  const log=sessionWhatsappLog[id];
  return log&&log.count
    ? `<div class="session-whatsapp-text"><strong>Sent ${log.count===1?'once':log.count+' times'}</strong><br><span class="muted">Last ${log.last}</span></div>`
    : '<span class="muted">Not sent</span>'
}
function whatsappCompactStatusMarkup(id){
  const log=sessionWhatsappLog[id];
  return log&&log.count ? '<span class="pill green">Sent</span>' : '<span class="pill amber">Not sent</span>'
}

function openCalendarEventDetails(role,id,dateStr){
  const e=calendarEvents(role).find(x=>x.id===id);
  if(!e)return;
  if(role==='owner'){
    openOwnerSessionPage(id);
    return;
  }
  openTrainerSessionPage(id)
}
function calendarDetailEditSchedule(){const e=activeCalendarEvent;if(!e)return;closeModal('calendarEventModal');openScheduleEdit(e.id,e.client,e.date,to24Hour(e.time),e.trainer)}
function calendarDetailReassign(){const e=activeCalendarEvent;if(!e)return;closeModal('calendarEventModal');openReassignSession(e.id,`${formatDateShort(e.date)} ${e.time}`,e.client,e.trainer)}
function calendarDetailTrainerAction(){const e=activeCalendarEvent;if(!e)return;closeModal('calendarEventModal');if(e.status==='Not planned')openTrainerSessionPage(e.id);else if(e.status==='Planned')openTrainerSessionPage(e.id);else sendSessionWhatsapp(e.id,e.client)}
function to24Hour(t){if(/^\d{2}:\d{2}$/.test(t))return t;const m=t.match(/(\d+):(\d+)(am|pm)/i);if(!m)return '19:00';let h=Number(m[1]);if(m[3].toLowerCase()==='pm'&&h<12)h+=12;if(m[3].toLowerCase()==='am'&&h===12)h=0;return `${String(h).padStart(2,'0')}:${m[2]}`}
function openScheduleEdit(id,client,date,time,trainer){document.getElementById('scheduleEditId').value=id;document.getElementById('scheduleEditClient').value=client;document.getElementById('scheduleEditDate').value=date;document.getElementById('scheduleEditTime').value=to24Hour(time);openModal('scheduleEditModal')}
function saveScheduleEdit(){
  const id=document.getElementById('scheduleEditId').value;
  const date=document.getElementById('scheduleEditDate').value;
  const time=document.getElementById('scheduleEditTime').value;
  if(!id||!date||!time)return toast('Choose a date and time.');

  sessionScheduleOverrides[id]={date,time};
  closeModal('scheduleEditModal');

  if(activeSessionRole==='owner'&&activeSessionId===id)refreshTrainerSessionPage();
  setDashboardCalendar('owner',calendarNavState.owner.view);
  setDashboardCalendar('trainer',calendarNavState.trainer.view);
  renderOwnerAllSessions();
  renderTrainerAllSessions();
  renderClientPackageSessions();
  toast('Session schedule updated.')
}

let activeSessionId=null;
let activeSessionRole='trainer';
const sessionStartedMap={};


const sessionExercisePlans={
  S116:[
    {exercise:'Smith chest press',sets:'3',reps:'10',load:'15kg',rest:'60 sec',result:'Completed'},
    {exercise:'Seated row',sets:'3',reps:'10',load:'20kg',rest:'60 sec',result:'Completed'}
  ],
  S117:[
    {exercise:'Leg press',sets:'3',reps:'10',load:'72kg',rest:'75 sec',result:'Completed'},
    {exercise:'Static lunge with DB and with Smith',sets:'3',reps:'8',load:'7.5kg',rest:'60 sec',result:'Completed'}
  ],
  S118:[
    {exercise:'Smith back squat',sets:'3',reps:'8',load:'25kg',rest:'60 sec',result:'Completed'},
    {exercise:'Assisted pull up',sets:'3',reps:'8',load:'35kg support',rest:'60 sec',result:'Completed'},
    {exercise:'Lower core',sets:'2',reps:'10',load:'Bodyweight',rest:'45 sec',result:'Completed'}
  ],
  S101:[
    {exercise:'Smith back squat',sets:'3',reps:'8',load:'25kg',rest:'60 sec',result:'Planned'},
    {exercise:'Assisted pull up',sets:'3',reps:'8',load:'35kg support',rest:'60 sec',result:'Planned'},
    {exercise:'Lower core',sets:'2',reps:'10',load:'Bodyweight',rest:'45 sec',result:'Planned'}
  ],
  S105:[
    {exercise:'Leg press',sets:'3',reps:'10',load:'75kg',rest:'75 sec',result:'Planned'},
    {exercise:'DB shoulder press (incline bench and flat bench)',sets:'3',reps:'8',load:'10kg',rest:'60 sec',result:'Planned'}
  ],

  T101:[
    {exercise:'Smith back squat',sets:'3',reps:'8',load:'25kg',rest:'60 sec',result:'Planned'},
    {exercise:'Assisted pull up',sets:'3',reps:'8',load:'35kg support',rest:'60 sec',result:'Planned'},
    {exercise:'Lower core',sets:'2',reps:'10',load:'Bodyweight',rest:'45 sec',result:'Planned'}
  ],
  T102:[],
  T100:[
    {exercise:'Leg press',sets:'3',reps:'10',load:'80kg',rest:'75 sec',result:'Completed'},
    {exercise:'DB shoulder press (incline bench and flat bench)',sets:'3',reps:'8',load:'10kg',rest:'60 sec',result:'Completed'},
    {exercise:'Cable wood chop',sets:'2',reps:'12',load:'12kg',rest:'45 sec',result:'Completed'}
  ]
};

function defaultSessionPlanFor(status){
  if(status==='Not planned')return [];
  return [
    {exercise:'Smith back squat',sets:'3',reps:'8',load:'20kg',rest:'60 sec',result:status==='Completed'?'Completed':'Planned'},
    {exercise:'Seated row',sets:'3',reps:'10',load:'20kg',rest:'60 sec',result:status==='Completed'?'Completed':'Planned'}
  ]
}

function ensureSessionExercisePlan(id,status){
  if(!Object.prototype.hasOwnProperty.call(sessionExercisePlans,id)){
    sessionExercisePlans[id]=defaultSessionPlanFor(status)
  }
  return sessionExercisePlans[id]
}

function normalizeSessionExercise(item={}){
  const extras=Array.isArray(item.extraDetails)?item.extraDetails.filter(Boolean):[];
  return {
    exercise:item.exercise||'Smith back squat',
    weight:item.weight??item.load??'',
    details:item.details||'',
    extraDetails:extras,
    reps:item.reps??'',
    rounds:item.rounds??item.sets??'',
    rest:item.rest??'',
    interval:item.interval??''
  }
}

function escapeHtml(value=''){
  return String(value).replace(/[&<>\"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]))
}

function addSessionExerciseDetail(btn,value=''){
  const holder=btn.closest('.session-exercise-main')?.querySelector('.session-extra-details');
  if(!holder)return;
  if(holder.children.length>=4)return toast('Maximum of 4 additional detail fields for this exercise.');
  const input=document.createElement('input');
  input.className='session-exercise-extra-detail';
  input.placeholder='More details (optional)';
  input.value=value;
  input.setAttribute('aria-label','More exercise details');
  input.addEventListener('input',updateClientFacingSummary);
  holder.appendChild(input);
  input.focus();
}

function handleSessionExerciseSelect(select){
  const row=select.closest('.session-exercise-row');
  if(!row)return;
  const custom=row.querySelector('.session-custom-exercise');
  const isCustom=select.value==='__custom__';
  custom?.classList.toggle('hidden',!isCustom);
  if(isCustom)custom?.focus();
  updateClientFacingSummary();
}

function exerciseNameFromRow(row){
  const select=row.querySelector('.session-exercise-name');
  if(select?.value==='__custom__')return row.querySelector('.session-custom-exercise')?.value.trim()||'Custom exercise';
  return select?.value||'Custom exercise'
}

function buildSessionExerciseRow(rawItem={},locked=false){
  const item=normalizeSessionExercise(rawItem);
  const known=Object.values(EXERCISE_LIBRARY).flat().includes(item.exercise);
  const row=document.createElement('div');
  row.className='session-exercise-row'+(locked?' is-locked':'');
  row.innerHTML=`
    <div class="session-exercise-main">
      <span class="session-edit-label">Exercise</span>
      <div class="session-exercise-selectline"><select class="session-exercise-name" ${locked?'disabled':''} onchange="handleSessionExerciseSelect(this)">${exerciseLibraryOptions(item.exercise)}</select><button class="camera-btn" title="Record exercise" onclick="openExerciseCapture(exerciseNameFromRow(this.closest('.session-exercise-row')),this)">📷</button></div>
      <input class="session-custom-exercise ${known?'hidden':''}" value="${known?'':escapeHtml(item.exercise)}" placeholder="Custom exercise name" ${locked?'disabled':''} aria-label="Custom exercise name">
      <div class="session-exercise-details">
        <input class="session-exercise-detail" value="${escapeHtml(item.details)}" placeholder="Details (optional) — e.g. left leg, 30 sec hold, 100 m" ${locked?'disabled':''} aria-label="Exercise details">
        <div class="session-extra-details">${item.extraDetails.map(x=>`<input class="session-exercise-extra-detail" value="${escapeHtml(x)}" placeholder="More details (optional)" ${locked?'disabled':''} aria-label="More exercise details">`).join('')}</div>
        ${locked?'':'<button type="button" class="session-more-details-btn" onclick="addSessionExerciseDetail(this)">Add Detail</button>'}
      </div>
    </div>
    <div class="session-edit-field"><span class="session-edit-label">Weight</span><input class="session-exercise-weight" value="${escapeHtml(item.weight)}" placeholder="e.g. 20 kg" ${locked?'disabled':''} aria-label="Weight"></div>
    <div class="session-edit-field"><span class="session-edit-label">Reps</span><input class="session-exercise-reps" inputmode="numeric" value="${escapeHtml(item.reps)}" placeholder="—" ${locked?'disabled':''} aria-label="Reps"></div>
    <div class="session-edit-field"><span class="session-edit-label">Rounds</span><input class="session-exercise-rounds" inputmode="numeric" value="${escapeHtml(item.rounds)}" placeholder="—" ${locked?'disabled':''} aria-label="Rounds"></div>
    <div class="session-edit-field"><span class="session-edit-label">Rest</span><input class="session-exercise-rest" value="${escapeHtml(item.rest)}" placeholder="e.g. 60 sec" ${locked?'disabled':''} aria-label="Rest"></div>
    <div class="session-edit-field"><span class="session-edit-label">Interval</span><input class="session-exercise-interval" value="${escapeHtml(item.interval)}" placeholder="optional" ${locked?'disabled':''} aria-label="Interval"></div>
    <div class="exercise-actions">
      <button class="btn btn-sm btn-danger session-delete-exercise" ${locked?'disabled':''} onclick="removeSessionExerciseRow(this)">Delete</button>
    </div>`;
  row.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',updateClientFacingSummary));
  return row
}


let sessionPlanEditing=false;

function buildSessionExerciseDisplayRow(rawItem={},locked=false){
  const item=normalizeSessionExercise(rawItem);
  const row=document.createElement('div');
  row.className='session-exercise-display-row';
  const safe=v=>(v===undefined||v===null||v==='')?'—':escapeHtml(v);
  const details=[item.details,...item.extraDetails].filter(Boolean);
  row.innerHTML=`
    <div class="session-display-value session-display-exercise">
      <div class="session-exercise-titleline"><strong>${safe(item.exercise)}</strong><button class="camera-btn" title="Record exercise" onclick="openExerciseCapture('${String(item.exercise||'').replace(/'/g,"\\'")}',this)">📷</button></div>
      ${details.length?`<div class="session-display-details">${details.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div>`:''}
    </div>
    <div class="session-display-value"><span class="mobile-field-label">Weight</span>${safe(item.weight)}</div>
    <div class="session-display-value"><span class="mobile-field-label">Reps</span>${safe(item.reps)}</div>
    <div class="session-display-value"><span class="mobile-field-label">Rounds</span>${safe(item.rounds)}</div>
    <div class="session-display-value"><span class="mobile-field-label">Rest</span>${safe(item.rest)}</div>
    <div class="session-display-value"><span class="mobile-field-label">Interval</span>${safe(item.interval)}</div>
    <div class="exercise-actions"></div>`;
  return row
}

function startNewSessionExercisePlan(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return toast('Open a booked session first.');
  const status=sessionStatusMap[e.id]||e.status||'Not planned';
  if(status==='Completed')return toast('Completed session plans are locked.');
  sessionExercisePlans[e.id]=sessionExercisePlans[e.id]||[];
  sessionPlanEditing=true;
  renderSessionExerciseRows()
}

function editSessionExercisePlan(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  const status=sessionStatusMap[e.id]||e.status||'Planned';
  if(status==='Completed')return toast('Completed session plans are locked.');
  sessionPlanEditing=true;
  renderSessionExerciseRows()
}

function renderSessionExerciseRows(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;

  const status=sessionStatusMap[e.id]||e.status||'Planned';
  const locked=status==='Completed';
  const items=ensureSessionExercisePlan(e.id,status);

  const wrap=document.getElementById('sessionExerciseRows');
  const startState=document.getElementById('sessionPlanStartState');
  const viewActions=document.getElementById('sessionPlanViewActions');
  const editActions=document.getElementById('sessionPlanEditActions');
  const header=document.getElementById('sessionExerciseHeader');
  const empty=document.getElementById('sessionExerciseEmpty');
  const editBtn=document.getElementById('editSessionPlanBtn');

  if(!wrap)return;
  wrap.innerHTML='';

  const hasPlan=items.length>0;

  if(!hasPlan&&!sessionPlanEditing){
    startState?.classList.remove('hidden');
    viewActions?.classList.add('hidden');
    editActions?.classList.add('hidden');
    header?.classList.add('hidden');
    empty?.classList.add('hidden');
    updateClientFacingSummary();
    return
  }

  startState?.classList.add('hidden');
  header?.classList.toggle('hidden',!hasPlan&&!sessionPlanEditing);

  if(sessionPlanEditing&&!locked){
    viewActions?.classList.add('hidden');
    editActions?.classList.remove('hidden');

    items.forEach(item=>wrap.appendChild(buildSessionExerciseRow(item,false)));
    empty?.classList.toggle('hidden',items.length>0);
  }else{
    sessionPlanEditing=false;
    editActions?.classList.add('hidden');
    empty?.classList.add('hidden');

    items.forEach(item=>wrap.appendChild(buildSessionExerciseDisplayRow(item,locked)));

    if(hasPlan&&!locked){
      viewActions?.classList.remove('hidden');
      if(editBtn){
        editBtn.disabled=false;
        editBtn.textContent='Edit'
      }
    }else{
      viewActions?.classList.add('hidden')
    }
  }
  updateClientFacingSummary();
}

function addSessionExercise(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return toast('Open a booked session first.');
  const status=sessionStatusMap[e.id]||e.status;
  if(status==='Completed')return toast('Completed session plans are locked.');

  if(!sessionPlanEditing){
    sessionPlanEditing=true;
    renderSessionExerciseRows()
  }

  const wrap=document.getElementById('sessionExerciseRows');
  wrap.appendChild(buildSessionExerciseRow({
    exercise:'Smith back squat',weight:'',details:'',extraDetails:[],reps:'8',rounds:'3',rest:'60 sec',interval:''
  },false));
  document.getElementById('sessionExerciseEmpty')?.classList.add('hidden');
  document.getElementById('sessionExerciseHeader')?.classList.remove('hidden');
  wrap.lastElementChild?.querySelector('.session-exercise-name')?.focus();
  updateClientFacingSummary()
}

function removeSessionExerciseRow(btn){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  const status=sessionStatusMap[e.id]||e.status;
  if(status==='Completed')return toast('Completed session plans are locked.');
  btn.closest('.session-exercise-row')?.remove();
  const wrap=document.getElementById('sessionExerciseRows');
  document.getElementById('sessionExerciseEmpty')?.classList.toggle('hidden',!!wrap?.children.length);
  updateClientFacingSummary()
}

function readSessionExerciseRows(){
  return [...document.querySelectorAll('#sessionExerciseRows .session-exercise-row')].map(row=>({
    exercise:exerciseNameFromRow(row),
    weight:row.querySelector('.session-exercise-weight')?.value.trim()||'',
    details:row.querySelector('.session-exercise-detail')?.value.trim()||'',
    extraDetails:[...row.querySelectorAll('.session-exercise-extra-detail')].map(x=>x.value.trim()).filter(Boolean),
    reps:row.querySelector('.session-exercise-reps')?.value.trim()||'',
    rounds:row.querySelector('.session-exercise-rounds')?.value.trim()||'',
    rest:row.querySelector('.session-exercise-rest')?.value.trim()||'',
    interval:row.querySelector('.session-exercise-interval')?.value.trim()||''
  }))
}

function currentSessionPlanForSummary(){
  if(sessionPlanEditing&&document.querySelector('#sessionExerciseRows .session-exercise-row'))return readSessionExerciseRows();
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return [];
  return (sessionExercisePlans[e.id]||[]).map(normalizeSessionExercise)
}

function exerciseSummaryLine(rawItem){
  const item=normalizeSessionExercise(rawItem);
  const metrics=[];
  if(item.weight)metrics.push(item.weight);
  if(item.reps)metrics.push(`${item.reps} reps`);
  if(item.rounds)metrics.push(`${item.rounds} rounds`);
  if(item.rest)metrics.push(`${item.rest} rest`);
  if(item.interval)metrics.push(`${item.interval} interval`);
  const details=[item.details,...item.extraDetails].filter(Boolean);
  const suffix=[...details,...metrics].filter(Boolean).join(' • ');
  return `• ${item.exercise}${suffix?' — '+suffix:''}`
}

function updateClientFacingSummary(){
  const out=document.getElementById('clientOutcomeText');
  if(!out)return;
  const duration=(document.getElementById('sessionDurationInput')?.value||'60 minutes').trim()||'60 minutes';
  const plan=currentSessionPlanForSummary();
  out.value=plan.length
    ? `Session duration: ${duration}\nExercises completed (${plan.length}):\n${plan.map(exerciseSummaryLine).join('\n')}`
    : `Session duration: ${duration}\nNo exercises recorded yet.`
}

function saveSessionExercisePlan(showToast=true){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return toast('Open a booked session first.');

  const currentStatus=sessionStatusMap[e.id]||e.status||'Not planned';
  if(currentStatus==='Completed')return toast('Completed session plans are locked.');

  const plan=readSessionExerciseRows();
  if(!plan.length)return toast('Add at least one exercise before saving the plan.');

  sessionExercisePlans[e.id]=plan;
  updateClientFacingSummary();

  if(currentStatus==='Not planned'){
    sessionStatusMap[e.id]='Planned';
    sessionStartedMap[e.id]=false;
    const row=document.getElementById('trainerSession'+e.id);
    if(row){
      const st=row.querySelector('.session-state');
      if(st)st.innerHTML=statusPill('Planned')
    }
  }

  sessionPlanEditing=false;
  renderTrainerAllSessions();
  setDashboardCalendar('trainer',calendarNavState.trainer.view);
  setDashboardCalendar('owner',calendarNavState.owner.view);
  renderOwnerAllSessions();
  refreshTrainerSessionPage();

  if(showToast)toast(currentStatus==='Not planned'
    ?'Session plan saved. Status changed to Planned.'
    :'Session plan changes saved.')
}


function getTrainerSessionEvent(id){
  const primary=activeSessionRole==='owner'?'owner':'trainer';
  return calendarEvents(primary).find(x=>x.id===id)
    ||calendarEvents('owner').find(x=>x.id===id)
    ||calendarEvents('trainer').find(x=>x.id===id)
    ||null
}

function openTrainerSessionPage(id){
  sessionPlanEditing=false;
  activeSessionRole='trainer';
  activeSessionId=id;
  const e=getTrainerSessionEvent(id);
  if(!e)return toast('Session details not found.');
  activeCalendarEvent={role:'trainer',...e};
  refreshTrainerSessionPage();
  showPortal('trainer-complete')
}

function openOwnerSessionPage(id){
  sessionPlanEditing=false;
  activeSessionRole='owner';
  activeSessionId=id;
  const e=getTrainerSessionEvent(id);
  if(!e)return toast('Session details not found.');
  activeCalendarEvent={role:'owner',...e};
  refreshTrainerSessionPage();
  showPortal('trainer-complete')
}

function refreshTrainerSessionPage(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  const status=sessionStatusMap[e.id]||e.status||'Planned';

  document.getElementById('trainerSessionClient').textContent=e.client;
  document.getElementById('trainerSessionDateTime').textContent=`${formatDateShort(e.date)} • ${e.time}`;
  document.getElementById('trainerSessionTrainer').textContent=e.trainer;
  document.getElementById('trainerSessionType').textContent=e.client.includes('&')?'Couple':'Individual';
  document.getElementById('trainerSessionMeta').textContent=`${e.client} • ${formatDateShort(e.date)} • ${e.time} • Session ${e.id}`;
  document.getElementById('trainerSessionHeaderStatus').innerHTML=statusPill(status);

  const ack=document.getElementById('trainerSessionAckStatus');
  const wa=document.getElementById('trainerSessionWhatsappStatus');
  const completeBtn=document.getElementById('clientSignButton');
  const whatsappBtn=document.getElementById('sendWhatsAppBtn');

  const ownerHeaderEdit=document.getElementById('ownerSessionHeaderEditBtn');
  if(ownerHeaderEdit){ownerHeaderEdit.classList.toggle('hidden',activeSessionRole!=='owner'||status==='Completed');ownerHeaderEdit.textContent='Edit';ownerHeaderEdit.title='Edit session'}
  ownerSessionEditing=false;setOwnerSessionInlineEdit(false);

  if(status==='Not planned'){
    ack.innerHTML='<span class="pill amber">Not available</span>';
    completeBtn.disabled=true;
    completeBtn.textContent='Acknowledge Session';
    whatsappBtn.disabled=true;
  }else if(status==='Planned'){
    ack.innerHTML='<span class="pill amber">Pending</span>';
    completeBtn.disabled=false;
    completeBtn.textContent='Acknowledge Session';
    whatsappBtn.disabled=true;
  }else{
    ack.innerHTML='<span class="pill green">Signed</span>';
    completeBtn.disabled=true;
    completeBtn.textContent='Acknowledged';
    whatsappBtn.disabled=false;
  }

  if(wa)wa.innerHTML=whatsappCompactStatusMarkup(e.id);
  renderSessionExerciseRows();
  refreshCompletionWhatsappState(e.id);
}


function sessionDetailsBack(){
  portalBack()
}

function editCurrentOwnerSession(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  const status=sessionStatusMap[e.id]||e.status;
  if(status==='Completed')return toast('Completed sessions are locked.');
  openScheduleEdit(e.id,e.client,e.date,to24Hour(e.time),e.trainer)
}

function reassignCurrentOwnerSession(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  const status=sessionStatusMap[e.id]||e.status;
  if(status==='Completed')return toast('Completed sessions are locked.');
  openReassignSession(e.id,`${formatDateShort(e.date)} ${e.time}`,e.client,e.trainer)
}

function openSessionPlannerFromDetail(){
  document.getElementById('sessionExercisePlanPanel')?.scrollIntoView({behavior:'smooth',block:'start'})
}

function saveActiveSessionPlan(){saveSessionExercisePlan()}

function startCurrentSession(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return;
  if((sessionStatusMap[e.id]||e.status)==='Planned'){
    const current=readSessionExerciseRows();
    if(current.length)sessionExercisePlans[e.id]=current
  }
  startSession(e.id,e.client,'Individual')
}

function startSession(id,client,type){
  activeSessionId=id;
  if(sessionStatusMap[id]==='Not planned')return toast('Plan this session before starting it.');
  if(sessionStatusMap[id]==='Completed')return openTrainerSessionPage(id);
  openTrainerSessionPage(id);
  toast(`Session started for ${client}. Status remains Planned until client acknowledgement.`)
}

function openCompletion(id){
  activeSessionId=id;
  openTrainerSessionPage(id)
}

function refreshCompletionWhatsappState(id){
  const btn=document.getElementById('sendWhatsAppBtn');
  const topStatus=document.getElementById('trainerSessionWhatsappStatus');
  const completed=sessionStatusMap[id]==='Completed';
  if(btn)btn.disabled=!completed;
  if(topStatus)topStatus.innerHTML=whatsappCompactStatusMarkup(id)
}

function openCompletedSession(id){
  activeSessionId=id;
  openTrainerSessionPage(id)
}

function markSessionCompleted(id){
  if(!id)return;
  sessionStatusMap[id]='Completed';
  sessionStartedMap[id]=true;
  renderTrainerAllSessions();
  setDashboardCalendar('trainer',calendarNavState.trainer.view);
  setDashboardCalendar('owner',calendarNavState.owner.view);
  renderOwnerAllSessions();
  renderClientPackageSessions();
  refreshTrainerSessionPage()
}

function addAvailabilityBlock(btn){
  const builder=btn.closest('.availability-builder');if(!builder)return;
  const days=[...builder.querySelectorAll('.day-chip input:checked')].map(x=>x.parentElement.textContent.trim());const times=builder.querySelectorAll('input[type="time"]');
  if(!days.length||times.length<2){toast('Select at least one day and a time range.');return}
  const from=times[0].value,to=times[1].value;if(!from||!to||from>=to){toast('Choose a valid start and end time.');return}
  const list=builder.querySelector('.block-list');const row=document.createElement('div');row.className='block-row';row.dataset.days=days.join(',');row.dataset.from=from;row.dataset.to=to;
  row.innerHTML=`<div><strong>${days.join(', ')}</strong><br><small>${prettyTime(from)}–${prettyTime(to)}</small></div><button class="btn btn-sm btn-danger" onclick="this.closest('.block-row').remove()">Remove</button>`;list.appendChild(row);toast('Availability block added. Save when finished.')
}
function confirmPermanentReassignment(){
  const sel=document.getElementById('permanentTrainerSelect'),newTrainer=sel?.value;
  if(!newTrainer)return;

  document.getElementById('primaryTrainerName').textContent=newTrainer;

  const clientRecord=clients.find(c=>c.name==='Amanda Lim');
  if(clientRecord)clientRecord.trainer=newTrainer;

  document.querySelectorAll('[data-upcoming-session]').forEach(row=>{
    const id=row.dataset.upcomingSession,tr=row.querySelector('.schedule-trainer'),btn=row.querySelector('button[onclick*="openScheduleEdit"]');
    if(tr)tr.textContent=newTrainer;
    if(id)sessionTrainerOverrides[id]=newTrainer;
    if(btn){
      const oc=btn.getAttribute('onclick');
      btn.setAttribute('onclick',oc.replace(/,'[^']+'\)$/,`,'${newTrainer}')`))
    }
  });

  calendarEvents('owner').filter(e=>e.client==='Amanda Lim'&&e.status!=='Completed').forEach(e=>sessionTrainerOverrides[e.id]=newTrainer);

  renderClients();
  renderTrainerClients();
  refreshTrainerAssignmentViews();
  setDashboardCalendar('owner',calendarNavState.owner.view);
  setDashboardCalendar('trainer',calendarNavState.trainer.view);
  renderOwnerAllSessions();
  renderTrainerAllSessions();
  renderClientPackageSessions();

  toast(`Amanda Lim permanently reassigned to ${newTrainer}. Upcoming sessions and client assignment updated.`)
}
function openReassignSession(id,time,client,current){
  reassignSessionId=id;
  const e=calendarEvents('owner').find(x=>x.id===id);
  document.getElementById('reassignSessionTime').textContent=e?`${formatDateShort(e.date)} • ${e.time}`:time;
  document.getElementById('reassignClient').textContent=client;
  document.getElementById('reassignCurrentTrainer').textContent=current;

  const sel=document.getElementById('reassignTrainer');
  const available=Object.keys(ownerTrainerData)
    .filter(name=>name!==current && (!e || trainerAvailableAt(name,e.date,e.time)));

  const fallback=Object.keys(ownerTrainerData).filter(name=>name!==current);
  const choices=available.length?available:fallback;
  sel.innerHTML=choices.map(name=>`<option value="${name}">${name}${available.length?' — available':''}</option>`).join('');

  openModal('reassignModal')
}
function confirmReassignment(){const newTrainer=document.getElementById('reassignTrainer').value;sessionTrainerOverrides[reassignSessionId]=newTrainer;document.querySelectorAll(`[data-session-trainer="${reassignSessionId}"]`).forEach(x=>x.textContent=newTrainer);if(reassignSessionId==='S101'){const tr=document.getElementById('ownerUpcomingS101Trainer');if(tr)tr.textContent=newTrainer}closeModal('reassignModal');if(activeSessionRole==='owner'&&activeSessionId===reassignSessionId)refreshTrainerSessionPage();setDashboardCalendar('owner',document.getElementById('ownerDashMonthBtn')?.classList.contains('active')?'month':'week');setDashboardCalendar('trainer',calendarNavState.trainer.view);renderOwnerAllSessions();renderClientPackageSessions();toast('This session was reassigned ad-hoc. Client and replacement trainer notification queued.')}
function prettyTime(t){if(!t)return '';const [h,m]=t.split(':').map(Number),amp=h>=12?'pm':'am',hh=((h+11)%12)+1;return `${hh}:${String(m).padStart(2,'0')}${amp}`}
let clientAssignmentLocked=false;
let clientTrainerMatches={};
let clientFinalAssignment=null;
function clientWeeklyFrequency(){return document.querySelector('input[name="clientWeeklyFrequency"]:checked')?.value||'single'}
function setClientWeeklyFrequency(mode){
  if(clientAssignmentLocked)return;
  const gym=document.getElementById('clientIncludeGymMembership'),gymText=document.getElementById('clientGymMembershipText'),note=document.getElementById('clientGymMembershipNote');
  if(gym){
    if(mode==='double'){gym.checked=true;gym.disabled=true;if(gymText)gymText.textContent='Included — Free';if(note)note.textContent='Free gym membership is automatically included with Double Day.'}
    else{gym.disabled=false;if(gymText)gymText.textContent=gym.checked?'Yes':'Optional';if(note)note.textContent='Double Day automatically includes the free gym membership.'}
  }
  invalidateClientMatching();
}
function addClientAvailabilityBlock(btn){
  if(clientAssignmentLocked)return;
  const builder=btn.closest('.availability-builder');if(!builder)return;
  const days=[...builder.querySelectorAll('.day-chip input:checked')].map(x=>x.parentElement.textContent.trim());
  const from=document.getElementById('clientAvailabilityFrom')?.value||'',to=document.getElementById('clientAvailabilityTo')?.value||'';
  if(!days.length){toast('Select at least one possible day.');return}
  if(!from||!to||from>=to){toast('Choose a valid client availability time range.');return}
  const list=document.getElementById('clientAvailabilityBlocks');if(!list)return;
  const row=document.createElement('div');row.className='block-row client-availability-block';row.dataset.days=days.join(',');row.dataset.from=from;row.dataset.to=to;
  row.innerHTML=`<div><strong>${days.join(', ')}</strong><br><small>${prettyTime(from)}–${prettyTime(to)}</small></div><button class="btn btn-sm btn-danger" onclick="removeClientAvailabilityBlock(this)">Remove</button>`;
  list.appendChild(row);
  builder.querySelectorAll('.day-chip input').forEach(x=>x.checked=false);
  invalidateClientMatching();toast('Client availability block added.')
}
function removeClientAvailabilityBlock(btn){if(clientAssignmentLocked)return;btn.closest('.client-availability-block')?.remove();invalidateClientMatching()}
function clientAvailabilityOptions(){
  const expanded=[];
  [...document.querySelectorAll('#clientAvailabilityBlocks .client-availability-block')].forEach((row,blockIndex)=>{
    const days=(row.dataset.days||'').split(',').map(x=>x.trim()).filter(Boolean);
    days.forEach((day,dayIndex)=>{const fullDay=availabilityDayNames[day]||day;expanded.push({id:`${blockIndex}-${dayIndex}`,day:fullDay,from:row.dataset.from||'',to:row.dataset.to||''})})
  });
  return expanded
}
function validateClientAvailability(){
  const options=clientAvailabilityOptions();if(!options.length)return {ok:false,msg:'Add at least one possible day and time block.'};
  if(options.some(o=>!o.day||!o.from||!o.to||o.from>=o.to))return {ok:false,msg:'Choose a valid From and To time for every client availability block.'};
  return {ok:true,options}
}
function timeMinutes(t){const [h,m]=String(t).split(':').map(Number);return h*60+m}
function minutesTime(n){return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`}
function trainerOverlapForOption(trainer,opt){
  const candidates=(trainerAvailabilityBlocks[trainer]?.[opt.day]||[]).map(([a,b])=>{const start=Math.max(timeMinutes(a),timeMinutes(opt.from)),end=Math.min(timeMinutes(b),timeMinutes(opt.to));return {start,end}}).filter(x=>x.end-x.start>=60).sort((a,b)=>(b.end-b.start)-(a.end-a.start));
  if(!candidates.length)return null;const best=candidates[0];return {...opt,overlapFrom:minutesTime(best.start),overlapTo:minutesTime(best.end),latestStart:minutesTime(best.end-60)}
}
function invalidateClientMatching(){
  if(clientAssignmentLocked)return;
  clientTrainerMatches={};clientFinalAssignment=null;
  const sel=document.getElementById('availableTrainerSelect');if(sel){sel.disabled=true;sel.innerHTML='<option>Run trainer matching</option>'}
  const host=document.getElementById('clientMatchedSlots');if(host)host.innerHTML='';
  document.getElementById('saveClientAssignmentBtn')?.classList.add('hidden');document.getElementById('editClientAssignmentBtn')?.classList.add('hidden');
  document.getElementById('clientFinalAssignmentSummary')?.classList.remove('show');
  const msg=document.getElementById('trainerMatchText');if(msg)msg.textContent='Add every possible client availability block, then find matching trainers. The final fixed day(s) are chosen only after a trainer is selected.';
}
function findMatchingTrainers(){
  if(clientAssignmentLocked)return;
  const check=validateClientAvailability();const sel=document.getElementById('availableTrainerSelect'),msg=document.getElementById('trainerMatchText');if(!sel||!msg)return;
  if(!check.ok){toast(check.msg);return}
  const need=clientWeeklyFrequency()==='double'?2:1;clientTrainerMatches={};
  Object.keys(ownerTrainerData).forEach(trainer=>{
    if(ownerTrainerData[trainer].status==='Inactive')return;
    const overlaps=check.options.map(o=>trainerOverlapForOption(trainer,o)).filter(Boolean);
    const uniqueDays=new Set(overlaps.map(o=>o.day));
    if(uniqueDays.size>=need)clientTrainerMatches[trainer]=overlaps;
  });
  const names=Object.keys(clientTrainerMatches).sort((a,b)=>clientTrainerMatches[b].length-clientTrainerMatches[a].length||a.localeCompare(b));
  sel.disabled=!names.length;sel.innerHTML=names.length?names.map(n=>`<option value="${n}">${n} — ${clientTrainerMatches[n].length} matching option${clientTrainerMatches[n].length===1?'':'s'}</option>`).join(''):'<option>No matching trainer</option>';
  msg.textContent=names.length?`${names.length} trainer${names.length===1?'':'s'} can cover ${need===1?'at least one of the client’s options':'at least two different possible days'}. Select a trainer, then choose the final fixed ${need===1?'day':'two days'} and exact session time${need===1?'':'s'}.`:'No trainer currently has enough approved availability. Add another client availability block or change a time window.';
  renderMatchedSlotsForTrainer();
}
function renderMatchedSlotsForTrainer(){
  if(clientAssignmentLocked)return;
  const trainer=document.getElementById('availableTrainerSelect')?.value;const host=document.getElementById('clientMatchedSlots');if(!host)return;host.innerHTML='';
  const opts=clientTrainerMatches[trainer]||[];if(!opts.length){document.getElementById('saveClientAssignmentBtn')?.classList.add('hidden');return}
  const mode=clientWeeklyFrequency(),type=mode==='single'?'radio':'checkbox';
  host.innerHTML=`<div class="client-onboard-stage-title">Choose Final Fixed ${mode==='single'?'Day':'Days'}</div>`+opts.map((o,i)=>`<label class="client-matched-slot"><input type="${type}" name="clientFinalSlot" data-index="${i}" onchange="toggleClientFinalSlot(this)"><div class="slot-window"><strong>${o.day}</strong><small>Client + trainer overlap: ${prettyTime(o.overlapFrom)}–${prettyTime(o.overlapTo)}</small></div><div class="field"><label>SESSION START</label><input class="matched-session-start" type="time" step="1800" min="${o.overlapFrom}" max="${o.latestStart}" value="${o.overlapFrom}" onclick="event.stopPropagation()" onchange="validateMatchedTime(this)"></div></label>`).join('');
  document.getElementById('saveClientAssignmentBtn')?.classList.remove('hidden')
}
function toggleClientFinalSlot(input){
  const mode=clientWeeklyFrequency();if(mode==='double'&&input.checked){const checked=[...document.querySelectorAll('#clientMatchedSlots input[type="checkbox"]:checked')];if(checked.length>2){input.checked=false;toast('Double Day saves exactly two fixed days.');return}}
  document.querySelectorAll('.client-matched-slot').forEach(x=>x.classList.toggle('selected',!!x.querySelector('input[type="radio"],input[type="checkbox"]')?.checked))
}
function validateMatchedTime(input){
  if(input.value<input.min||input.value>input.max){input.value=input.min;toast('Session start must leave at least 60 minutes inside the matched availability window.')}
}
function selectedFinalSlots(){
  const trainer=document.getElementById('availableTrainerSelect')?.value;const opts=clientTrainerMatches[trainer]||[];
  return [...document.querySelectorAll('#clientMatchedSlots input[name="clientFinalSlot"]:checked')].map(ch=>{const box=ch.closest('.client-matched-slot'),o=opts[Number(ch.dataset.index)],start=box.querySelector('.matched-session-start')?.value||o.overlapFrom;return {...o,start,end:minutesTime(timeMinutes(start)+60)}})
}
function saveClientAssignment(){
  const trainer=document.getElementById('availableTrainerSelect')?.value;if(!trainer||!clientTrainerMatches[trainer]){toast('Choose a matching trainer.');return}
  const need=clientWeeklyFrequency()==='double'?2:1,slots=selectedFinalSlots();
  if(slots.length!==need){toast(`Select exactly ${need} fixed ${need===1?'day':'days'} for this client.`);return}
  if(need===2&&new Set(slots.map(s=>s.day)).size!==2){toast('Double Day must use two different days.');return}
  if(slots.some(s=>s.start<s.overlapFrom||s.start>s.latestStart)){toast('One selected session time is outside the trainer/client overlap.');return}
  clientFinalAssignment={trainer,frequency:clientWeeklyFrequency(),slots:slots.map(s=>({day:s.day,start:s.start,end:s.end}))};clientAssignmentLocked=true;
  document.getElementById('clientModal')?.classList.add('client-assignment-locked');
  document.querySelectorAll('#clientAvailabilityBuilder input,#clientAvailabilityBuilder button,#clientMatchPanel select,#clientMatchPanel input,#clientMatchPanel button:not(#editClientAssignmentBtn)').forEach(el=>el.disabled=true);
  document.getElementById('saveClientAssignmentBtn')?.classList.add('hidden');const edit=document.getElementById('editClientAssignmentBtn');if(edit){edit.classList.remove('hidden');edit.disabled=false}
  const sum=document.getElementById('clientFinalAssignmentSummary');if(sum){sum.classList.add('show');sum.innerHTML=`<strong>🔒 Saved recurring assignment</strong><br>Trainer: ${escapeHtml(trainer)}<br>${clientFinalAssignment.slots.map((s,i)=>`${need===2?'Day '+(i+1)+': ':''}${s.day} • ${prettyTime(s.start)}–${prettyTime(s.end)}`).join('<br>')}<br><span style="color:#a8dabc">This is the client's normal weekly schedule. Individual sessions can still be rescheduled ad-hoc later.</span>`}
  toast('Trainer and recurring schedule saved.')
}
function editClientAssignment(){
  clientAssignmentLocked=false;clientFinalAssignment=null;document.getElementById('clientModal')?.classList.remove('client-assignment-locked');
  document.querySelectorAll('#clientAvailabilityBuilder input,#clientAvailabilityBuilder button,#clientMatchPanel select,#clientMatchPanel input,#clientMatchPanel button').forEach(el=>el.disabled=false);
  document.getElementById('editClientAssignmentBtn')?.classList.add('hidden');document.getElementById('saveClientAssignmentBtn')?.classList.remove('hidden');document.getElementById('clientFinalAssignmentSummary')?.classList.remove('show');
  setClientWeeklyFrequency(clientWeeklyFrequency());findMatchingTrainers();toast('Saved assignment unlocked for editing.')
}
function resetClientOnboardingSchedule(){
  clientAssignmentLocked=false;clientTrainerMatches={};clientFinalAssignment=null;document.getElementById('clientModal')?.classList.remove('client-assignment-locked');
  const host=document.getElementById('clientAvailabilityBlocks');if(host)host.innerHTML='';
  document.querySelectorAll('#clientAvailabilityBuilder .day-chip input').forEach(x=>x.checked=false);
  const from=document.getElementById('clientAvailabilityFrom'),to=document.getElementById('clientAvailabilityTo');if(from)from.value='18:00';if(to)to.value='21:00';
  const single=document.querySelector('input[name="clientWeeklyFrequency"][value="single"]');if(single)single.checked=true;const dbl=document.querySelector('input[name="clientWeeklyFrequency"][value="double"]');if(dbl)dbl.checked=false;
  const gym=document.getElementById('clientIncludeGymMembership');if(gym){gym.disabled=false;gym.checked=false}setClientWeeklyFrequency('single');
}
function openClientOnboarding(){
  document.getElementById('newClientType').value='Individual';document.getElementById('partnerFields').classList.add('hidden');
  ['newClientName','newClientContact','newClientPartnerName','newClientPartnerContact','newClientGoals'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
  resetClientOnboardingSchedule();openModal('clientModal')
}
function createClientFromModal(){
  if(!clientAssignmentLocked||!clientFinalAssignment){toast('Save the trainer and fixed weekly schedule before creating the client.');return}
  const name=document.getElementById('newClientName')?.value.trim(),type=document.getElementById('newClientType')?.value||'Individual',partner=document.getElementById('newClientPartnerName')?.value.trim();
  if(!name){toast('Enter the client name.');return}if(type==='Couple'&&!partner){toast('Enter the second client name for Couple PT.');return}
  const displayName=type==='Couple'?`${name} & ${partner}`:name;const pkg=document.getElementById('newClientPackage')?.value||'12';const pkgLabel=pkg==='24'?'24 weeks':'12 sessions';
  const goal=document.getElementById('newClientGoals')?.value.trim().split('\n')[0]||'PT onboarding';const gym=!!document.getElementById('clientIncludeGymMembership')?.checked;
  clients.push({name:displayName,completedSessions:0,type,goal:`${goal} / ${pkgLabel}`,trainer:clientFinalAssignment.trainer,last:'—',renew:'New',frequency:clientFinalAssignment.frequency,fixedSchedule:clientFinalAssignment.slots,gymMembership:gym});
  closeModal('clientModal');renderClients();renderOwnerMilestones();refreshTrainerAssignmentViews();populateTrainerControls();showPortal('owner-clients');toast(`${displayName} created with ${clientFinalAssignment.trainer} and ${clientFinalAssignment.slots.length} fixed weekly ${clientFinalAssignment.slots.length===1?'slot':'slots'}.`)
}
function openExerciseCapture(exercise,btn){
  activeCaptureButton=btn;
  document.getElementById('captureExercise').textContent=exercise;
  let item=null;
  const editRow=btn?.closest('.session-exercise-row');
  if(editRow){
    item=readSessionExerciseRows().find(x=>x.exercise===exercise)||null;
  }else{
    const e=getTrainerSessionEvent(activeSessionId);
    item=(sessionExercisePlans[e?.id]||[]).map(normalizeSessionExercise).find(x=>x.exercise===exercise)||null;
  }
  const lines=[exercise];
  if(item){
    if(item.weight)lines.push(`Weight: ${item.weight}`);
    [item.details,...(item.extraDetails||[])].filter(Boolean).forEach(x=>lines.push(x));
    if(item.reps)lines.push(`Reps: ${item.reps}`);
    if(item.rounds)lines.push(`Rounds: ${item.rounds}`);
    if(item.rest)lines.push(`Rest: ${item.rest}`);
    if(item.interval)lines.push(`Interval: ${item.interval}`);
  }
  document.getElementById('autoCaptionText').value=lines.join('\n');
  openModal('videoCaptureModal')
}
function attachCaptionedClip(){if(activeCaptureButton){activeCaptureButton.textContent='✓';activeCaptureButton.classList.add('recording');activeCaptureButton.title='Captioned clip attached'}closeModal('videoCaptureModal');toast('Captioned exercise clip attached to this session.')}
function sendSessionWhatsapp(id=activeSessionId,clientName='Amanda'){whatsappSessionId=id||activeSessionId;whatsappClientName=clientName||activeCalendarEvent?.client||'Client';const outcome=document.getElementById('clientOutcomeText')?.value||'Session completed and acknowledged.';const msg=`Hi ${whatsappClientName}, here is your Fitfinity session summary: ${outcome} Exercise clips and captions are attached.`;document.getElementById('whatsappMessage').textContent=msg;openModal('whatsappModal')}
function confirmWhatsappSend(){const id=whatsappSessionId||activeSessionId;if(id){const prev=sessionWhatsappLog[id]||{count:0,last:''};sessionWhatsappLog[id]={count:prev.count+1,last:'23 Aug 2026, 12:32pm'};document.querySelectorAll(`[data-whatsapp-status="${id}"]`).forEach(el=>{el.style.display='inline-flex';el.className='pill green';el.textContent='Sent'});if(activeSessionId===id){refreshCompletionWhatsappState(id);if(document.getElementById('trainer-complete')?.classList.contains('active'))refreshTrainerSessionPage();}if(activeCalendarEvent?.id===id&&document.getElementById('calendarEventModal')?.classList.contains('show'))document.getElementById('calendarDetailWhatsapp').innerHTML=whatsappStatusMarkup(id)}closeModal('whatsappModal');toast('WhatsApp opened.')}
function setupSignaturePad(){const c=document.getElementById('signaturePad');if(!c||c.dataset.ready)return;c.dataset.ready='1';const resize=()=>{const r=c.getBoundingClientRect();c.width=Math.max(300,Math.floor(r.width*devicePixelRatio));c.height=Math.floor(190*devicePixelRatio);const ctx=c.getContext('2d');ctx.scale(devicePixelRatio,devicePixelRatio);ctx.lineWidth=2.2;ctx.lineCap='round';ctx.strokeStyle='#111'};resize();let drawing=false;const pos=e=>{const r=c.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return [p.clientX-r.left,p.clientY-r.top]};const start=e=>{drawing=true;signatureHasInk=true;const [x,y]=pos(e);const ctx=c.getContext('2d');ctx.beginPath();ctx.moveTo(x,y);e.preventDefault()};const move=e=>{if(!drawing)return;const [x,y]=pos(e);const ctx=c.getContext('2d');ctx.lineTo(x,y);ctx.stroke();e.preventDefault()};const end=()=>drawing=false;c.addEventListener('pointerdown',start);c.addEventListener('pointermove',move);window.addEventListener('pointerup',end)}
function openSignatureModal(){
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return toast('Open a booked session first.');
  if(sessionStatusMap[activeSessionId]==='Completed')return toast('This session has already been acknowledged.');
  document.getElementById('signatureClient').value=e.client;
  signatureHasInk=false;
  document.getElementById('ackConfirm').checked=false;
  openModal('signatureModal');
  setTimeout(setupSignaturePad,30);
  setTimeout(clearSignature,50)
}
function clearSignature(){const c=document.getElementById('signaturePad');if(!c)return;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);signatureHasInk=false}
function updatePackageUI(){[['ownerPackageBalance',packageBalance+' sessions'],['ownerPackageBalanceDetail',packageBalance+' sessions'],['trainerPackageBalance',packageBalance+' sessions'],['ownerPackageUsed',packageUsed],['ownerPackageUsedDetail',packageUsed],['trainerPackageUsed',packageUsed]].forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v})}
function confirmClientSignature(){
  if(!document.getElementById('ackConfirm').checked){toast('Client confirmation checkbox is required.');return}
  if(!signatureHasInk){toast('Please capture the client signature first.');return}
  const e=getTrainerSessionEvent(activeSessionId);
  if(!e)return toast('Session details not found.');
  if(sessionStatusMap[activeSessionId]==='Completed'){closeModal('signatureModal');return toast('This session is already completed.');}

  if(e.client==='Amanda Lim'&&packageBalance>0){
    packageBalance--;
    packageUsed++;
    updatePackageUI();renderClientPackageSessions()
  }


  const trainer=document.getElementById('trainerAckLog');
  if(trainer){
    const row=document.createElement('tr');
    row.innerHTML=`<td>${formatDateShort(e.date).replace(' 2026','')}</td><td>${e.trainer}</td><td>60 min</td><td>Strength</td><td><span class="pill green">Signed</span></td><td>${e.client==='Amanda Lim'?packageBalance:'Updated'}</td>`;
    trainer.prepend(row)
  }

  markSessionCompleted(activeSessionId);
  closeModal('signatureModal');
  refreshTrainerSessionPage();
  toast('Session completed after client acknowledgement. The acknowledgement is now locked.')
}



/* Review 47 — inline profile/session editing + progress export */
let clientMainEditing=false,clientHealthEditing=false,ownerTrainerEditing=false,ownerSessionEditing=false;
function setHidden(id,hidden){const e=document.getElementById(id);if(e)e.classList.toggle('hidden',hidden)}
function toggleClientMainEdit(){
  const btn=document.getElementById('sharedClientEditBtn');
  if(currentRole==='trainer')return;
  if(!clientMainEditing){
    clientMainEditing=true;
    document.getElementById('clientPhoneInline').value=document.getElementById('clientPhoneDisplay').textContent.trim();
    document.getElementById('clientEmailInline').value=document.getElementById('clientEmailDisplay').textContent.trim();
    setHidden('clientPhoneDisplay',true);setHidden('clientEmailDisplay',true);setHidden('clientPhoneInline',false);setHidden('clientEmailInline',false);
    if(btn){btn.textContent='💾';btn.title='Save client contact details'}
    return
  }
  if(!confirm('Save changes to this client’s email and phone?'))return;
  const phone=document.getElementById('clientPhoneInline').value.trim(),email=document.getElementById('clientEmailInline').value.trim();
  if(!phone||!email)return toast('Email and phone are required.');
  document.getElementById('clientPhoneDisplay').textContent=phone;document.getElementById('clientEmailDisplay').textContent=email;
  clientMainEditing=false;setHidden('clientPhoneDisplay',false);setHidden('clientEmailDisplay',false);setHidden('clientPhoneInline',true);setHidden('clientEmailInline',true);
  if(btn){btn.textContent='✎';btn.title='Edit client contact details'}
  toast('Client contact details saved.')
}
function toggleClientHealthEdit(){
  const btn=document.getElementById('clientHealthEditBtn'),notice=document.getElementById('clientHealthNotice'),input=document.getElementById('clientHealthInline');
  if(!clientHealthEditing){clientHealthEditing=true;input.value=notice.textContent.trim();notice.classList.add('hidden');input.classList.remove('hidden');btn.textContent='💾';btn.title='Save health notes';input.focus();return}
  if(!confirm('Save changes to Health / Limitation Notes?'))return;
  notice.textContent=input.value.trim()||'No health / limitation notes recorded.';clientHealthEditing=false;notice.classList.remove('hidden');input.classList.add('hidden');btn.textContent='✎';btn.title='Edit health notes';toast('Health / limitation notes saved.')
}
function isoToDisplayDate(v){if(!v)return '—';const d=new Date(v+'T00:00:00');return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
function populateOwnerTrainerInlineFields(name){
  const d=ownerTrainerData[name];if(!d)return;
  document.getElementById('ownerTrainerNameInput').value=name;document.getElementById('ownerTrainerSpecialtyInput').value=d.specialty||'';document.getElementById('ownerTrainerEmailInput').value=d.email||'';document.getElementById('ownerTrainerQualificationsInput').value=d.qualifications||'';document.getElementById('ownerTrainerPublicInput').value=d.public||'Visible';document.getElementById('ownerTrainerStatusInput').value=d.status||'Active';document.getElementById('ownerTrainerPeakRateInput').value=d.peakRate??80;document.getElementById('ownerTrainerOffpeakRateInput').value=d.offpeakRate??55;document.getElementById('ownerTrainerRateEffectiveInput').value=d.rateEffectiveFrom||'2026-08-29';
}
function setOwnerTrainerInlineEdit(on){
  const idsDisplay=['ownerTrainerName','ownerTrainerSpecialty','ownerTrainerEmail','ownerTrainerQualifications','ownerTrainerPublic','ownerTrainerStatusText','ownerTrainerPeakRateDisplay','ownerTrainerOffpeakRateDisplay','ownerTrainerRateEffectiveDisplay'];
  const idsEdit=['ownerTrainerNameInput','ownerTrainerSpecialtyInput','ownerTrainerEmailInput','ownerTrainerQualificationsInput','ownerTrainerPublicInput','ownerTrainerStatusInput','ownerTrainerPeakRateInput','ownerTrainerOffpeakRateInput','ownerTrainerRateEffectiveInput'];
  idsDisplay.forEach(id=>setHidden(id,on));idsEdit.forEach(id=>setHidden(id,!on));
}
function toggleOwnerTrainerEdit(){
  const btn=document.getElementById('ownerTrainerHeaderEditBtn');
  if(!ownerTrainerEditing){ownerTrainerEditing=true;populateOwnerTrainerInlineFields(activeOwnerTrainer);setOwnerTrainerInlineEdit(true);btn.textContent='💾';btn.title='Save trainer';return}
  if(!confirm('Save these trainer profile changes? New rates will take effect from the selected date and historical remuneration remains unchanged.'))return;
  const oldName=activeOwnerTrainer,d=ownerTrainerData[oldName];if(!d)return;
  const newName=document.getElementById('ownerTrainerNameInput').value.trim();if(!newName)return toast('Trainer name is required.');if(newName!==oldName&&ownerTrainerData[newName])return toast('Another trainer already uses this name.');
  const eff=document.getElementById('ownerTrainerRateEffectiveInput').value;if(!eff)return toast('Choose the date the new rates become active.');
  d.specialty=document.getElementById('ownerTrainerSpecialtyInput').value.trim();d.email=document.getElementById('ownerTrainerEmailInput').value.trim();d.qualifications=document.getElementById('ownerTrainerQualificationsInput').value.trim();d.public=document.getElementById('ownerTrainerPublicInput').value;d.status=document.getElementById('ownerTrainerStatusInput').value;d.peakRate=Number(document.getElementById('ownerTrainerPeakRateInput').value||0);d.offpeakRate=Number(document.getElementById('ownerTrainerOffpeakRateInput').value||0);d.rateEffectiveFrom=eff;
  if(newName!==oldName){ownerTrainerData[newName]=d;delete ownerTrainerData[oldName];trainerAvailabilityBlocks[newName]=trainerAvailabilityBlocks[oldName]||{};delete trainerAvailabilityBlocks[oldName];clients.forEach(c=>{if(c.trainer===oldName)c.trainer=newName});Object.keys(sessionTrainerOverrides).forEach(k=>{if(sessionTrainerOverrides[k]===oldName)sessionTrainerOverrides[k]=newName});if(CURRENT_TRAINER===oldName)CURRENT_TRAINER=newName;activeOwnerTrainer=newName}
  ownerTrainerEditing=false;setOwnerTrainerInlineEdit(false);btn.textContent='✎';btn.title='Edit trainer';renderTrainerDirectory();populateTrainerControls();refreshTrainerAssignmentViews();openOwnerTrainer(activeOwnerTrainer);toast('Trainer profile and effective-dated rates saved.')
}
function populateSessionTrainerInline(current){const sel=document.getElementById('sessionTrainerInline');if(!sel)return;sel.innerHTML=Object.keys(ownerTrainerData).filter(n=>ownerTrainerData[n].status==='Active'||n===current).map(n=>`<option value="${escapeHtml(n)}" ${n===current?'selected':''}>${escapeHtml(n)}</option>`).join('')}
function setOwnerSessionInlineEdit(on){
  setHidden('trainerSessionDateTime',on);setHidden('sessionDateTimeInline',!on);setHidden('trainerSessionTrainer',on);setHidden('sessionTrainerInline',!on)
}
function toggleOwnerSessionEdit(){
  const e=getTrainerSessionEvent(activeSessionId),btn=document.getElementById('ownerSessionHeaderEditBtn');if(!e||activeSessionRole!=='owner')return;
  const status=sessionStatusMap[e.id]||e.status;if(status==='Completed')return toast('Completed sessions are locked.');
  if(!ownerSessionEditing){ownerSessionEditing=true;document.getElementById('sessionDateInline').value=e.date;document.getElementById('sessionTimeInline').value=to24Hour(e.time);populateSessionTrainerInline(e.trainer);setOwnerSessionInlineEdit(true);btn.textContent='Save';btn.title='Save session changes';return}
  if(!confirm('Save this ad-hoc session date, time and trainer change? The client’s fixed weekly schedule will not change.'))return;
  const date=document.getElementById('sessionDateInline').value,time=document.getElementById('sessionTimeInline').value,trainer=document.getElementById('sessionTrainerInline').value;if(!date||!time||!trainer)return toast('Date, time and trainer are required.');
  sessionScheduleOverrides[e.id]={date,time};sessionTrainerOverrides[e.id]=trainer;ownerSessionEditing=false;setOwnerSessionInlineEdit(false);btn.textContent='Edit';btn.title='Edit session';setDashboardCalendar('owner',calendarNavState.owner.view);setDashboardCalendar('trainer',calendarNavState.trainer.view);renderOwnerAllSessions();renderTrainerAllSessions();refreshTrainerSessionPage();toast('Session changes saved. Fixed recurring schedule unchanged.')
}
function exportProgressReport(){
  const exercise=document.getElementById('strengthProgressExercise')?.value||Object.keys(strengthProgressData)[0],points=strengthProgressData[exercise]||[];if(!points.length)return toast('No progress data to export.');
  const rows=[...points].reverse().map(p=>`<tr><td>${p.date}</td><td>${p.sets}</td><td>${p.reps}</td><td>${p.load} kg</td></tr>`).join('');
  const latest=points[points.length-1],first=points[0],change=Number((latest.load-first.load).toFixed(1));
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Amanda Lim Progress Report</title><style>body{font-family:Arial,sans-serif;color:#111;padding:28px;max-width:820px;margin:auto}h1{margin-bottom:4px}.meta{color:#555;margin-bottom:24px}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.card{border:1px solid #ddd;border-radius:8px;padding:12px}.card small{display:block;color:#666}.card strong{font-size:22px}table{width:100%;border-collapse:collapse;margin-top:18px}th,td{padding:9px;border-bottom:1px solid #ddd;text-align:left}@media print{button{display:none}}

/* Review 47 — compact details, inline editing and right-side camera */
.editable-page-title,.panel-title-edit,.session-exercise-titleline{display:flex;align-items:center;gap:8px;min-width:0}.editable-page-title h1,.panel-title-edit h3{margin-right:2px}.header-edit-icon{width:36px;height:36px;border:1px solid #3c4350;border-radius:8px;background:#12151c;color:#dfe4ff;display:inline-grid;place-items:center;font-size:16px;cursor:pointer;flex:0 0 auto}.header-edit-icon:hover{border-color:#7284ff;background:#181c27}.header-edit-icon.small{width:30px;height:30px;font-size:13px}.header-inline-input{background:#0a0c10;color:#fff;border:1px solid #6676ff;border-radius:7px;padding:8px 10px;font-size:22px;font-weight:850;min-width:0;max-width:340px}.inline-edit-control{width:100%;min-width:0;background:#0a0c10;color:#fff;border:1px solid #6676ff;border-radius:6px;padding:8px}.info-row>.inline-edit-control{grid-column:2}.progress-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.progress-actions select{min-width:220px;background:#0a0c10;color:#fff;border:1px solid #3a3f4b;border-radius:6px;padding:9px}.session-inline-fields{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:5px}.session-inline-fields input,#sessionTrainerInline{width:100%;min-width:0;background:#0a0c10;color:#fff;border:1px solid #6676ff;border-radius:5px;padding:6px;font-size:10px}.session-exercise-titleline{justify-content:space-between;margin-bottom:4px}.session-exercise-titleline .camera-btn{width:32px;height:32px;flex:0 0 32px}.session-display-exercise .session-exercise-titleline{align-items:flex-start}.session-detail-summary .stat{min-width:0}
@media(max-width:780px){
  .editable-page-title{gap:6px}.header-edit-icon{width:30px;height:30px;font-size:13px}.header-inline-input{font-size:18px;padding:6px 8px;max-width:220px}
  #owner-client .grid-equal{gap:8px!important}#owner-client #owner-overview .panel{padding:10px!important}#owner-client #owner-overview .panel h3{font-size:16px!important;margin-bottom:7px!important}#owner-client #owner-overview .info-row{grid-template-columns:105px minmax(0,1fr)!important;padding:7px 0!important;gap:8px!important}#owner-client #owner-overview .notice{padding:9px 10px!important;margin-bottom:0!important}
  .progress-head{gap:8px!important}.progress-actions{width:100%;display:grid;grid-template-columns:minmax(0,1fr) auto}.progress-actions select{min-width:0!important;width:100%!important}.progress-actions .btn{padding:9px 8px;font-size:9px;white-space:nowrap}.strength-chart-panel{margin-top:0!important;padding:11px!important}.strength-progress-cards{display:none!important}
  .session-detail-summary{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:6px!important;margin-bottom:9px!important}.session-detail-summary .stat{padding:7px 8px!important;min-height:0!important}.session-detail-summary .stat-label{font-size:7px!important;margin-bottom:3px!important}.session-detail-summary .session-detail-value{font-size:11px!important;line-height:1.2!important;margin:0!important}.session-status-cluster{gap:5px!important}.session-status-item{padding:6px 7px!important;min-width:0!important}.session-status-label{font-size:7px!important;margin-bottom:3px!important}
  .session-exercise-row,.session-exercise-display-row{position:relative}.session-exercise-row .exercise-actions,.session-exercise-display-row .exercise-actions{grid-column:1/-1!important;justify-content:flex-end!important}.session-exercise-display-row .exercise-actions:empty{display:none!important}.session-exercise-titleline .camera-btn{width:30px;height:30px}
  #owner-trainer .info-row{grid-template-columns:115px minmax(0,1fr)!important}.owner-trainer-tab .inline-edit-control{font-size:11px!important}.panel-title-edit{justify-content:space-between}
}
@media(max-width:390px){.progress-actions{grid-template-columns:1fr}.session-detail-summary .session-detail-value{font-size:10px!important}.session-detail-summary .stat{padding:6px!important}}

@media(max-width:780px){.progress-history-table{table-layout:fixed!important}.progress-history-table th,.progress-history-table td{padding:8px 5px!important;font-size:9px!important}.progress-history-table th:nth-child(1),.progress-history-table td:nth-child(1){width:40%}.progress-history-table th:nth-child(n+2),.progress-history-table td:nth-child(n+2){width:20%}}
</style></head><body><h1>Fitfinity Progress Report</h1><div class="meta">Amanda Lim • ${new Date().toLocaleDateString('en-SG')}<br>Exercise: <strong>${escapeHtml(exercise)}</strong></div><div class="summary"><div class="card"><small>LATEST LOAD</small><strong>${latest.load} kg</strong></div><div class="card"><small>CHANGE</small><strong>${change>=0?'+':''}${change} kg</strong></div><div class="card"><small>COMPLETED</small><strong>${points.length}</strong></div></div><table><thead><tr><th>Date</th><th>Rounds</th><th>Reps</th><th>Load</th></tr></thead><tbody>${rows}</tbody></table><p style="margin-top:24px;color:#666;font-size:12px">Generated from completed Fitfinity training records.</p><script>window.onload=()=>setTimeout(()=>window.print(),250)<\/script>

<style>
/* v0.21 — zero-horizontal-scroll progress/assigned clients + chevron back cue */
.mobile-back-cue{font-size:0!important}
.mobile-back-cue svg{width:22px;height:22px;display:block;fill:none;stroke:currentColor;stroke-width:2.25;stroke-linecap:round;stroke-linejoin:round}
.swipe-back-indicator,#swipeBackIndicator{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}

/* Shared client progress must never widen the portal. */
#owner-progress{min-width:0!important;max-width:100%!important;overflow-x:hidden!important}
#owner-progress>*{min-width:0!important;max-width:100%!important}
#owner-progress .progress-head{min-width:0!important;max-width:100%!important}
#owner-progress .progress-heading-block{min-width:0!important}
#owner-progress .progress-exercise-select{max-width:100%!important;min-width:0!important}
#owner-progress .strength-chart-panel{min-width:0!important;max-width:100%!important;overflow:hidden!important}
#owner-progress .strength-chart-head{min-width:0!important;max-width:100%!important}
#owner-progress .strength-chart-summary{min-width:0!important;max-width:100%!important}
#owner-progress .strength-chart-summary>div{min-width:0!important}
#owner-progress .strength-chart-wrap{width:100%!important;max-width:100%!important;overflow:hidden!important}
#owner-progress #strengthProgressChart{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;height:auto!important}
#owner-progress .table-wrap{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
#owner-progress .progress-history-table{width:100%!important;max-width:100%!important;min-width:0!important;table-layout:fixed!important}
#owner-progress .progress-history-table th,#owner-progress .progress-history-table td{white-space:normal!important;overflow-wrap:anywhere!important;word-break:break-word!important}
#owner-progress .progress-export-btn{align-self:start!important;height:auto!important;min-height:32px!important;max-height:34px!important;padding:7px 9px!important;line-height:1!important}

/* Trainer-detail Assigned Clients stacks package under client on phone; View stays right. */
#ownerTrainerAssignedClients{min-width:0!important;max-width:100%!important;overflow-x:hidden!important}
#ownerTrainerAssignedClients .panel,#ownerTrainerAssignedClientsRows{min-width:0!important;max-width:100%!important;overflow-x:hidden!important}
.assigned-client-list{min-width:0!important;max-width:100%!important;overflow-x:hidden!important}
.assigned-client-row{min-width:0!important;max-width:100%!important}
@media(max-width:780px){
  #owner-progress .progress-head{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:7px!important;align-items:start!important}
  #owner-progress .progress-heading-block{width:100%!important}
  #owner-progress .progress-export-btn{width:auto!important;max-width:96px!important}
  #owner-progress .strength-main-metric{font-size:34px!important}
  #owner-progress .strength-chart-summary{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important;width:100%!important;text-align:left!important}
  #owner-progress .strength-chart-summary strong{font-size:14px!important}
  #owner-progress .strength-chart-wrap{margin-left:0!important;margin-right:0!important}
  #owner-progress .progress-history-table th,#owner-progress .progress-history-table td{padding:7px 4px!important;font-size:8.5px!important}

  #ownerTrainerAssignedClients .trainer-assigned-toolbar{grid-template-columns:minmax(0,1fr) minmax(96px,.55fr)!important}
  .assigned-client-row{grid-template-columns:minmax(0,1fr) auto!important;gap:5px 8px!important;padding:9px 10px!important}
  .assigned-client-main{grid-column:1;grid-row:1}
  .assigned-client-package{grid-column:1;grid-row:2}
  .assigned-client-package small{display:none!important}
  .assigned-client-package strong{font-size:9px!important;color:#9fa7b6!important;font-weight:700!important;white-space:normal!important;overflow-wrap:anywhere!important}
  .assigned-client-row>.btn{grid-column:2;grid-row:1/3;align-self:center!important;justify-self:end!important;min-width:46px!important}
}
</style>




</body></html>`;
  const w=window.open('','_blank');if(!w)return toast('Allow pop-ups to export the progress report.');w.document.open();w.document.write(html);w.document.close()
}

/* Review 44 — completed prototype wiring */
function saveClientEdit(){
  const email=document.getElementById('editClientEmail')?.value.trim(),phone=document.getElementById('editClientPhone')?.value.trim();
  if(email)document.getElementById('clientEmailDisplay').textContent=email;if(phone)document.getElementById('clientPhoneDisplay').textContent=phone;
  closeModal('editClientModal');toast('Client details saved.')
}

function renderTrainerDirectory(){
  const body=document.getElementById('ownerTrainerRows');if(!body)return;
  const q=(document.getElementById('trainerSearch')?.value||'').toLowerCase();
  const status=document.getElementById('trainerStatusFilter')?.value||'';
  const pub=document.getElementById('trainerPublicFilter')?.value||'';
  const rows=Object.entries(ownerTrainerData).filter(([name,d])=>name.toLowerCase().includes(q)&&(!status||d.status===status)&&(!pub||d.public===pub));
  body.innerHTML=rows.length?rows.map(([name,d])=>`<tr><td><strong>${escapeHtml(name)}</strong></td><td>${escapeHtml(d.specialty)}</td><td><span data-trainer-client-count="${escapeHtml(name)}">${assignedClientsForTrainer(name).length}</span></td><td>${escapeHtml(d.public)}</td><td><span class="pill ${d.status==='Active'?'green':'amber'}">${escapeHtml(d.status)}</span></td><td><button class="btn btn-sm" onclick="openOwnerTrainer('${String(name).replace(/'/g,"\\'")}')">View</button></td></tr>`).join(''):'<tr><td colspan="6" class="muted" style="text-align:center;padding:24px">No trainers match these filters.</td></tr>';
}

const availabilityDayNames={Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday',Sun:'Sunday'};
function availabilityRowsToMap(selector){
  const out={Monday:[],Tuesday:[],Wednesday:[],Thursday:[],Friday:[],Saturday:[],Sunday:[]};
  document.querySelectorAll(selector+' .block-row').forEach(row=>{
    let days=(row.dataset.days||'').split(',').map(x=>x.trim()).filter(Boolean);
    if(!days.length)days=(row.querySelector('strong')?.textContent||'').split(',').map(x=>x.trim()).filter(Boolean);
    const from=row.dataset.from||'18:00',to=row.dataset.to||'21:00';
    days.forEach(d=>{const full=availabilityDayNames[d]||d;if(out[full])out[full].push([from,to])})
  });
  return out
}
function resetTrainerModal(){
  ['newTrainerName','newTrainerEmail','newTrainerSpecialty','newTrainerQualifications'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=''});
  const list=document.getElementById('newTrainerAvailabilityBlocks');if(list)list.innerHTML='<div class="block-row" data-days="Mon,Tue,Wed,Thu,Fri" data-from="18:00" data-to="21:00"><div><strong>Mon, Tue, Wed, Thu, Fri</strong><br><small>6:00pm–9:00pm</small></div><button class="btn btn-sm btn-danger" onclick="this.closest(\'.block-row\').remove()">Remove</button></div>'
}
function createTrainerFromModal(){
  const name=document.getElementById('newTrainerName')?.value.trim(),email=document.getElementById('newTrainerEmail')?.value.trim();
  if(!name||!email){toast('Trainer name and email are required.');return}if(ownerTrainerData[name]){toast('A trainer with this name already exists.');return}
  const specialty=document.getElementById('newTrainerSpecialty')?.value.trim()||'Personal Training';const qualifications=document.getElementById('newTrainerQualifications')?.value.trim()||'To be updated';
  const pub=document.getElementById('newTrainerPublic')?.value||'Visible',peakRate=Number(document.getElementById('newTrainerPeakRate')?.value||80),offpeakRate=Number(document.getElementById('newTrainerOffpeakRate')?.value||55);
  const initials=name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  ownerTrainerData[name]={initials,specialty,email,qualifications,clients:0,public:pub,status:'Active',peakRate,offpeakRate,rateEffectiveFrom:'2026-08-29',peak:0,offpeak:0,sessions:0,hours:'0.0',payout:0,samples:[]};
  trainerAvailabilityBlocks[name]=availabilityRowsToMap('#newTrainerAvailabilityBlocks');
  closeModal('trainerModal');renderTrainerDirectory();populateTrainerControls();resetTrainerModal();toast(`${name} created with an active trainer account.`)
}
function openTrainerEditModal(){
  const d=ownerTrainerData[activeOwnerTrainer];if(!d)return;
  document.getElementById('editTrainerName').value=activeOwnerTrainer;document.getElementById('editTrainerEmail').value=d.email;document.getElementById('editTrainerSpecialty').value=d.specialty;document.getElementById('editTrainerStatus').value=d.status;document.getElementById('editTrainerQualifications').value=d.qualifications;document.getElementById('editTrainerPublic').value=d.public;document.getElementById('editTrainerPeakRate').value=d.peakRate??80;document.getElementById('editTrainerOffpeakRate').value=d.offpeakRate??55;if(document.getElementById('editTrainerRateEffective'))document.getElementById('editTrainerRateEffective').value=d.rateEffectiveFrom||'2026-08-29';openModal('trainerEditModal')
}
function saveTrainerEdit(){
  const oldName=activeOwnerTrainer,d=ownerTrainerData[oldName];if(!d)return;
  const newName=document.getElementById('editTrainerName').value.trim();if(!newName){toast('Trainer name cannot be blank.');return}if(newName!==oldName&&ownerTrainerData[newName]){toast('Another trainer already uses this name.');return}
  d.email=document.getElementById('editTrainerEmail').value.trim();d.specialty=document.getElementById('editTrainerSpecialty').value.trim();d.status=document.getElementById('editTrainerStatus').value;d.qualifications=document.getElementById('editTrainerQualifications').value.trim();d.public=document.getElementById('editTrainerPublic').value;d.peakRate=Number(document.getElementById('editTrainerPeakRate').value||80);d.offpeakRate=Number(document.getElementById('editTrainerOffpeakRate').value||55);d.rateEffectiveFrom=document.getElementById('editTrainerRateEffective')?.value||d.rateEffectiveFrom||'2026-08-29';
  if(newName!==oldName){ownerTrainerData[newName]=d;delete ownerTrainerData[oldName];trainerAvailabilityBlocks[newName]=trainerAvailabilityBlocks[oldName]||{};delete trainerAvailabilityBlocks[oldName];clients.forEach(c=>{if(c.trainer===oldName)c.trainer=newName});if(CURRENT_TRAINER===oldName)CURRENT_TRAINER=newName;activeOwnerTrainer=newName}
  closeModal('trainerEditModal');renderTrainerDirectory();populateTrainerControls();refreshTrainerAssignmentViews();openOwnerTrainer(activeOwnerTrainer);toast('Trainer profile updated.')
}

let activeContentPage='Homepage';const contentDrafts={};
function openContentEditor(page){activeContentPage=page;const title=document.getElementById('contentEditorTitle');if(title)title.textContent=page+' — Content Editor';const d=contentDrafts[page];if(d){document.getElementById('contentHeading').value=d.heading;document.getElementById('contentBody').value=d.body;document.getElementById('contentCta').value=d.cta}else{document.getElementById('contentHeading').value=page==='Homepage'?'Move Better. Get Stronger.':page;document.getElementById('contentBody').value='Editable fixed-layout content for '+page+'.';document.getElementById('contentCta').value=page==='Gym Membership'?'Join Gym Membership':'Learn More'}openModal('contentModal')}
function saveContentDraft(){contentDrafts[activeContentPage]={heading:document.getElementById('contentHeading').value,body:document.getElementById('contentBody').value,cta:document.getElementById('contentCta').value};toast(`${activeContentPage} draft saved.`)}
function publishContentPage(){saveContentDraft();delete contentDrafts[activeContentPage];closeModal('contentModal');toast(`${activeContentPage} published.`)}
function openContentPublishModal(){openModal('contentPublishModal')}
function confirmPublishDrafts(){const checked=[...document.querySelectorAll('#contentPublishChoices input:checked')].map(x=>x.closest('label')?.querySelector('span')?.textContent.trim()).filter(Boolean);if(!checked.length){toast('Select at least one area to publish.');return}checked.forEach(p=>delete contentDrafts[p]);closeModal('contentPublishModal');toast(`${checked.length} selected website area${checked.length===1?'':'s'} published.`)}

function openCopyPreviousPlanModal(){openModal('copyPreviousPlanModal')}
function confirmCopyPreviousPlan(){
  const host=document.getElementById('exerciseRows');if(host){host.innerHTML='';addExercise('Smith back squat');addExercise('Assisted pull up');addExercise('DB Romanian deadlift')}
  closeModal('copyPreviousPlanModal');toast('Previous plan copied into the current draft.')
}
function saveTrainerPlanDraft(){let badge=document.getElementById('trainerPlanDraftStatus');if(!badge){badge=document.createElement('span');badge.id='trainerPlanDraftStatus';badge.className='pill amber';badge.style.marginLeft='8px';document.querySelector('#trainer-plan .page-head h1')?.appendChild(badge)}if(badge)badge.textContent='Draft saved';toast('Draft saved.')}
function saveOwnerAvailability(){trainerAvailabilityBlocks[activeOwnerTrainer]=availabilityRowsToMap('#ownerAvailabilityCurrentBlocks');closeModal('ownerAvailabilityModal');renderOwnerTrainerAvailability(activeOwnerTrainer);if(activeOwnerTrainer===CURRENT_TRAINER)renderTrainerSelfAvailability();toast('Owner-approved availability saved.')}
function submitAvailabilityRequest(){submitTrainerAvailabilityRequest()}
function rejectAvailabilityRequest(){pendingAvailabilityRequest=null;renderOwnerTrainerAvailability(activeOwnerTrainer);toast('Availability request rejected.')}
function approveAvailabilityRequest(){
  const r=pendingAvailabilityRequest;if(!r?.proposed)return;
  trainerAvailabilityBlocks[CURRENT_TRAINER]=r.proposed;
  pendingAvailabilityRequest=null;renderOwnerTrainerAvailability(activeOwnerTrainer);renderTrainerSelfAvailability();toast('New weekly availability approved and applied.')
}
let captureRecording=false,captureRecordingStarted=0;
function toggleCaptureRecording(btn){
  const indicator=document.getElementById('captureRecordingIndicator');captureRecording=!captureRecording;
  if(captureRecording){captureRecordingStarted=Date.now();btn.textContent='Stop Recording';btn.classList.add('btn-danger');indicator?.classList.add('show');if(indicator)indicator.textContent='Recording'}
  else{const sec=Math.max(1,Math.round((Date.now()-captureRecordingStarted)/1000));btn.textContent='Record Again';btn.classList.remove('btn-danger');indicator?.classList.add('show');if(indicator)indicator.textContent=`Video ready • ${sec}s`}
}

document.addEventListener('click',e=>{
  if(e.target.classList.contains('modal-bg')){
    closeModal(e.target.id)
  }
});
goPublic('home');
renderTestimonials();
renderFaq();
populateTrainerControls();
renderTrainerDirectory();
renderClients();
renderOwnerMilestones();
renderTrainerClients();
refreshTrainerAssignmentViews();
renderTrainerSelfAvailability();
renderOwnerTrainerAvailability(CURRENT_TRAINER);
renderTrainerAllSessions();
renderOwnerAllSessions();
renderOwnerFinance();
renderTrainerRemuneration();
initStrengthProgress();
updatePortalBackButton();
addExercise('Smith back squat');
addExercise('Assisted pull up');
addExercise('Leg press');
resetClientOnboardingSchedule();
setDashboardCalendar('owner','week');
setDashboardCalendar('trainer','week');
renderOwnerAllSessions();
renderClientPackageSessions();
configureSharedClientProfile();
