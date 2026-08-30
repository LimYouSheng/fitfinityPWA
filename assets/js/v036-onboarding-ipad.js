/* v0.36 — Couple onboarding + couple profile data + edit-state consistency */
(function(){
  const COUNTRY_DEFAULT_V36='+65';

  function el(id){return document.getElementById(id)}
  function val(id){return el(id)?.value?.trim?.()||''}
  function escapeV36(v){return typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'')}
  function splitPhoneV36(phone){
    const m=String(phone||'').trim().match(/^(\+\d{1,3})\s*(.*)$/);
    return m?{country:m[1],number:m[2]}:{country:COUNTRY_DEFAULT_V36,number:String(phone||'')};
  }
  function composePhoneV36(countryId,numberId){
    const country=el(countryId)?.value||COUNTRY_DEFAULT_V36;
    const number=val(numberId).replace(/^\+\d{1,3}\s*/,'');
    return number?`${country} ${number}`:'';
  }
  function syncSelectV36(id){const node=el(id);if(node&&typeof syncInAppSelect==='function')syncInAppSelect(node)}
  function setCancelStateV36(id,on){const node=el(id);if(!node)return;node.classList.toggle('hidden',!on);node.style.setProperty('display',on?'inline-flex':'none','important')}

  /* Existing Couple demo records now carry two genuine people records instead of one combined placeholder. */
  const couplePeopleSeedV36={
    'Mei & Aaron':[
      {name:'Mei',phone:'+65 9134 5678',email:'mei@example.com',birthday:'1992-06-18',gender:'Female',emergencyName:'Aaron Lee',emergencyPhone:'+65 9011 2233',health:'Mild shoulder tightness after desk work. Keep pressing pain-free and include upper-back mobility.'},
      {name:'Aaron',phone:'+65 9245 6789',email:'aaron@example.com',birthday:'1991-11-03',gender:'Male',emergencyName:'Mei Lee',emergencyPhone:'+65 9134 5678',health:'No current injuries or movement limitations reported.'}
    ],
    'Siti & Hakim':[
      {name:'Siti',phone:'+65 9189 0123',email:'siti@example.com',birthday:'1993-02-14',gender:'Female',emergencyName:'Hakim Rahman',emergencyPhone:'+65 9066 7788',health:'No current injuries or movement limitations reported.'},
      {name:'Hakim',phone:'+65 9290 1234',email:'hakim@example.com',birthday:'1991-08-22',gender:'Male',emergencyName:'Siti Rahman',emergencyPhone:'+65 9189 0123',health:'Monitor knee comfort during deeper squat ranges; reduce depth if symptoms appear.'}
    ],
    'Jason & Claire':[
      {name:'Jason',phone:'+65 9234 5678',email:'jason@example.com',birthday:'1989-09-07',gender:'Male',emergencyName:'Claire Goh',emergencyPhone:'+65 9111 2233',health:'No current injuries or movement limitations reported.'},
      {name:'Claire',phone:'+65 9345 6789',email:'claire@example.com',birthday:'1991-12-12',gender:'Female',emergencyName:'Jason Goh',emergencyPhone:'+65 9234 5678',health:'Avoid aggressive overhead range when the shoulder feels tight; use a comfortable pressing path.'}
    ]
  };
  Object.entries(couplePeopleSeedV36).forEach(([name,people])=>{
    if(typeof clientExtendedData==='undefined')return;
    const d=clientExtendedData[name]||{};
    d.people=people.map(x=>({...x}));
    d.phone=people[0].phone;d.email=people[0].email;d.birthday=people[0].birthday;d.gender=people[0].gender;
    d.emergencyName=people[0].emergencyName;d.emergencyPhone=people[0].emergencyPhone;
    d.partnerPhone=people[1].phone;
    d.health=people.map((p,i)=>`Client ${i+1} — ${p.name}: ${p.health}`).join('\n');
    clientExtendedData[name]=d;
  });

  function isCoupleNameV36(name){return clients?.find?.(c=>c.name===name)?.type==='Couple'||!!clientExtendedData?.[name]?.people?.[1]}
  function peopleForClientV36(name){
    const d=typeof extendedClientData==='function'?extendedClientData(name):(clientExtendedData[name]||{});
    if(Array.isArray(d.people)&&d.people.length)return d.people;
    const first=String(name||'').split('&')[0].trim();
    return [{name:first||name,phone:d.phone||'—',email:d.email||'—',birthday:d.birthday||'',gender:d.gender||'—',emergencyName:d.emergencyName||'—',emergencyPhone:d.emergencyPhone||'—',health:d.health||'No health / limitation notes recorded.'}];
  }
  window.peopleForClientV36=peopleForClientV36;

  function personFieldsV36(i){
    if(i===1)return {name:'newClientName',phoneCountry:'newClientPhoneCountry',phone:'newClientPhone',email:'newClientEmail',birthday:'newClientAge',gender:'newClientGender',emergencyName:'newClientEmergencyName',emergencyCountry:'newClientEmergencyPhoneCountry',emergencyPhone:'newClientEmergencyPhone',health:'newClientHealthV36'};
    return {name:'newClient2NameV36',phoneCountry:'newClient2PhoneCountryV36',phone:'newClient2PhoneV36',email:'newClient2EmailV36',birthday:'newClient2AgeV36',gender:'newClient2GenderV36',emergencyName:'newClient2EmergencyNameV36',emergencyCountry:'newClient2EmergencyPhoneCountryV36',emergencyPhone:'newClient2EmergencyPhoneV36',health:'newClient2HealthV36'};
  }
  function readOnboardPersonV36(i){
    const f=personFieldsV36(i);
    return {name:val(f.name),phone:composePhoneV36(f.phoneCountry,f.phone),email:val(f.email),birthday:val(f.birthday),gender:el(f.gender)?.value||'',emergencyName:val(f.emergencyName),emergencyPhone:composePhoneV36(f.emergencyCountry,f.emergencyPhone),health:val(f.health)};
  }
  function personCompleteV36(i){const p=readOnboardPersonV36(i);return !!(p.name&&p.phone&&p.email&&p.birthday&&p.gender&&p.emergencyName&&p.emergencyPhone&&p.health)}

  window.setCoupleClientTabV36=function(index){
    const one=el('clientOneGeneralPanelV36'),two=el('clientTwoGeneralPanelV36'),t1=el('coupleClient1TabV36'),t2=el('coupleClient2TabV36');
    if(!one||!two)return;
    one.classList.toggle('hidden',index!==1);two.classList.toggle('hidden',index!==2);
    t1?.classList.toggle('active',index===1);t2?.classList.toggle('active',index===2);
    if(index===2)t2?.classList.remove('attention');
  };
  window.updateCoupleTabCueV36=function(){
    const couple=el('newClientType')?.value==='Couple',done1=personCompleteV36(1),done2=personCompleteV36(2);
    const t1=el('coupleClient1TabV36'),t2=el('coupleClient2TabV36'),s1=el('coupleClient1TabStatusV36'),s2=el('coupleClient2TabStatusV36');
    t1?.classList.toggle('complete',done1);t2?.classList.toggle('complete',done2);
    if(s1)s1.textContent=done1?'Complete':'Complete first';
    if(s2)s2.textContent=done2?'Complete':done1?'Client 1 done — complete Client 2':'Then complete Client 2';
    t2?.classList.toggle('attention',!!couple&&done1&&!done2&&!t2.classList.contains('active'));
  };
  window.handleClientTypeChangeV36=function(type){
    const couple=type==='Couple';
    el('coupleGeneralTabsV36')?.classList.toggle('hidden',!couple);
    const label=el('clientOnePanelLabelV36');if(label)label.textContent=couple?'Client 1 Information':'Client Information';
    if(couple)setCoupleClientTabV36(1);else{setCoupleClientTabV36(1);el('clientTwoGeneralPanelV36')?.classList.add('hidden')}
    updateCoupleTabCueV36();
  };

  const baseOpenClientOnboardingV36=window.openClientOnboarding;
  window.openClientOnboarding=function(){
    baseOpenClientOnboardingV36?.();
    ['newClientHealthV36','newClient2NameV36','newClient2PhoneV36','newClient2EmailV36','newClient2AgeV36','newClient2EmergencyNameV36','newClient2EmergencyPhoneV36','newClient2HealthV36','newClientRemarksV36'].forEach(id=>{if(el(id))el(id).value=''});
    ['newClient2PhoneCountryV36','newClient2EmergencyPhoneCountryV36'].forEach(id=>{if(el(id)){el(id).value=COUNTRY_DEFAULT_V36;syncSelectV36(id)}});
    if(el('newClient2GenderV36')){el('newClient2GenderV36').value='';syncSelectV36('newClient2GenderV36')}
    handleClientTypeChangeV36('Individual');
  };

  /* Create stores both members independently while preserving the combined package name for list/session routing. */
  window.createClientFromModal=function(){
    if(!clientAssignmentLocked||!clientFinalAssignment)return toast('Save the trainer and fixed weekly schedule before creating the client.');
    const type=el('newClientType')?.value||'Individual',p1=readOnboardPersonV36(1),p2=type==='Couple'?readOnboardPersonV36(2):null;
    if(!personCompleteV36(1))return toast('Complete all General Information for Client 1, including health / limitation notes.');
    if(type==='Couple'&&!personCompleteV36(2)){setCoupleClientTabV36(2);return toast('Complete all General Information for Client 2 before creating the Couple package.');}
    const startDate=el('newClientStartDate')?.value||'',pkg=el('newClientPackage')?.value||'12';
    if(!startDate)return toast('Choose the PT package start date.');
    const displayName=type==='Couple'?`${p1.name} & ${p2.name}`:p1.name;
    if(clients.some(c=>c.name.toLowerCase()===displayName.toLowerCase()))return toast('A client with this name already exists.');
    const pkgLabel=pkg==='24'?'24 weeks':'12 sessions',goal=val('newClientGoals').split('\n')[0]||'PT onboarding',remarks=val('newClientRemarksV36')||'No remarks recorded.';
    const gym=!!el('clientIncludeGymMembership')?.checked,paid=!!el('newClientPaid')?.checked,freq=clientFinalAssignment.frequency;
    clients.push({name:displayName,completedSessions:0,type,goal:`${goal} / ${pkgLabel}`,trainer:clientFinalAssignment.trainer,last:'—',renew:'New',frequency:freq,fixedSchedule:clientFinalAssignment.slots,gymMembership:gym,startDate,paid});
    clientExtendedData[displayName]={...p1,startDate,purchaseDate:startDate,paid,gymMembership:gym,remarks,health:p1.health,femaleTrainerPreferred:!!el('clientFemaleTrainerPreferred')?.checked,people:type==='Couple'?[p1,p2]:[p1]};
    if(type==='Couple'){clientExtendedData[displayName].partnerPhone=p2.phone;clientExtendedData[displayName].health=`Client 1 — ${p1.name}: ${p1.health}\nClient 2 — ${p2.name}: ${p2.health}`}
    if(typeof clientPackageMetaV35!=='undefined')clientPackageMetaV35[displayName]={label:pkgLabel,total:pkg==='24'?(freq==='double'?48:24):12,frequency:freq==='double'?2:1};
    closeModal('clientModal');renderClients();renderOwnerMilestones();refreshTrainerAssignmentViews();populateTrainerControls();showPortal('owner-clients');toast(`${displayName} created.`);
  };

  function sharedMetaMarkupV36(){
    return `<div class="couple-shared-meta-v36 info"><div class="info-row"><span>Start date</span><strong>${escapeV36(el('clientStartDateDisplay')?.textContent||'—')}</strong></div><div class="info-row"><span>Primary trainer</span><strong>${escapeV36(el('clientPrimaryTrainerDisplay')?.textContent||'—')}</strong></div><div class="info-row"><span>Current package ends</span><strong>${escapeV36(el('clientPackageEndDisplay')?.textContent||'—')}</strong></div></div>`;
  }
  function personDisplayCardV36(p,i){
    return `<div class="couple-person-card-v36"><h4>Client ${i+1} • ${escapeV36(p.name)}</h4><div class="info"><div class="info-row"><span>Phone</span><strong>${escapeV36(p.phone||'—')}</strong></div><div class="info-row"><span>Email</span><strong>${escapeV36(p.email||'—')}</strong></div><div class="info-row"><span>Birthday</span><strong>${escapeV36(p.birthday?(typeof isoToDisplayDate==='function'?isoToDisplayDate(p.birthday):p.birthday):'—')}</strong></div><div class="info-row"><span>Gender</span><strong>${escapeV36(p.gender||'—')}</strong></div><div class="info-row"><span>Emergency</span><strong>${escapeV36((p.emergencyName&&p.emergencyPhone)?`${p.emergencyName} • ${p.emergencyPhone}`:'—')}</strong></div></div></div>`;
  }
  function countryOptionsV36(selected){return ['+65','+60','+62','+63','+66','+61','+44','+1'].map(v=>`<option value="${v}" ${v===selected?'selected':''}>${v}</option>`).join('')}
  function personEditCardV36(p,i){const ph=splitPhoneV36(p.phone),eh=splitPhoneV36(p.emergencyPhone),n=i+1;return `<div class="couple-person-card-v36 couple-edit-grid-v36"><h4>Client ${n}</h4><div class="field"><label>NAME</label><input id="coupleEditName${n}V36" value="${escapeV36(p.name)}" readonly></div><div class="field"><label>PHONE</label><div class="phone-input-group"><select id="coupleEditPhoneCountry${n}V36" class="phone-country">${countryOptionsV36(ph.country)}</select><input id="coupleEditPhone${n}V36" value="${escapeV36(ph.number)}"></div></div><div class="field"><label>EMAIL</label><input id="coupleEditEmail${n}V36" type="email" value="${escapeV36(p.email||'')}"></div><div class="form-grid"><div class="field"><label>BIRTHDAY</label><input id="coupleEditAge${n}V36" type="date" value="${escapeV36(p.birthday||'')}"></div><div class="field"><label>GENDER</label><select id="coupleEditGender${n}V36"><option ${p.gender==='Female'?'selected':''}>Female</option><option ${p.gender==='Male'?'selected':''}>Male</option><option ${p.gender==='Prefer not to say'?'selected':''}>Prefer not to say</option></select></div></div><div class="field"><label>EMERGENCY CONTACT NAME</label><input id="coupleEditEmergencyName${n}V36" value="${escapeV36(p.emergencyName||'')}"></div><div class="field"><label>EMERGENCY CONTACT PHONE</label><div class="phone-input-group"><select id="coupleEditEmergencyCountry${n}V36" class="phone-country">${countryOptionsV36(eh.country)}</select><input id="coupleEditEmergencyPhone${n}V36" value="${escapeV36(eh.number)}"></div></div></div>`}

  function renderCoupleOverviewV36(name,editing=false){
    const couple=isCoupleNameV36(name),single=el('singleClientInfoRows'),host=el('coupleClientInfoRows'),healthSingle=el('clientHealthNotice'),healthInput=el('clientHealthInline'),healthHost=el('coupleHealthNotes');
    single?.classList.toggle('hidden',couple);host?.classList.toggle('hidden',!couple);healthSingle?.classList.toggle('hidden',couple);healthInput?.classList.add('hidden');healthHost?.classList.toggle('hidden',!couple);
    if(!couple)return;
    const people=peopleForClientV36(name).slice(0,2);
    if(host){host.innerHTML=editing?`<div class="couple-name-rows-v36"><div class="couple-name-row-v36"><span>CLIENT 1 NAME</span><strong>${escapeV36(people[0]?.name||'—')}</strong></div><div class="couple-name-row-v36"><span>CLIENT 2 NAME</span><strong>${escapeV36(people[1]?.name||'—')}</strong></div></div><div class="couple-person-grid-v36">${people.map(personEditCardV36).join('')}</div>${sharedMetaMarkupV36()}`:`<div class="couple-name-rows-v36"><div class="couple-name-row-v36"><span>CLIENT 1 NAME</span><strong>${escapeV36(people[0]?.name||'—')}</strong></div><div class="couple-name-row-v36"><span>CLIENT 2 NAME</span><strong>${escapeV36(people[1]?.name||'—')}</strong></div></div><div class="couple-person-grid-v36">${people.map(personDisplayCardV36).join('')}</div>${sharedMetaMarkupV36()}`;}
    renderCoupleHealthV36(name,false);
  }
  window.renderCoupleOverviewV36=renderCoupleOverviewV36;

  function renderCoupleHealthV36(name,editing){
    if(!isCoupleNameV36(name))return;
    const host=el('coupleHealthNotes'),people=peopleForClientV36(name).slice(0,2);if(!host)return;
    host.innerHTML=people.map((p,i)=>editing?`<div class="couple-health-card-v36"><strong>Client ${i+1} • ${escapeV36(p.name)}</strong><textarea id="coupleHealthEdit${i+1}V36">${escapeV36(p.health||'')}</textarea></div>`:`<div class="couple-health-card-v36"><strong>Client ${i+1} • ${escapeV36(p.name)}</strong><p>${escapeV36(p.health||'No health / limitation notes recorded.')}</p></div>`).join('');
  }

  const baseDisplayClientV36=window.displayClientExtendedDataV25;
  window.displayClientExtendedDataV25=function(name){baseDisplayClientV36?.(name);renderCoupleOverviewV36(name,false)};

  function readCoupleEditPersonV36(i){const n=i+1;return {name:val(`coupleEditName${n}V36`),phone:composePhoneV36(`coupleEditPhoneCountry${n}V36`,`coupleEditPhone${n}V36`),email:val(`coupleEditEmail${n}V36`),birthday:val(`coupleEditAge${n}V36`),gender:el(`coupleEditGender${n}V36`)?.value||'',emergencyName:val(`coupleEditEmergencyName${n}V36`),emergencyPhone:composePhoneV36(`coupleEditEmergencyCountry${n}V36`,`coupleEditEmergencyPhone${n}V36`),health:peopleForClientV36(el('ownerClientName')?.textContent.trim()||'')[i]?.health||''}}
  function completePersonObjV36(p){return !!(p?.name&&p.phone&&p.email&&p.birthday&&p.gender&&p.emergencyName&&p.emergencyPhone)}

  const baseToggleClientMainV36=window.toggleClientMainEdit,baseCancelClientMainV36=window.cancelClientMainEdit;
  window.toggleClientMainEdit=function(){
    const name=el('ownerClientName')?.textContent.trim()||'';
    if(!isCoupleNameV36(name)){const r=baseToggleClientMainV36?.();setCancelStateV36('sharedClientCancelBtn',!!clientMainEditing);return r}
    if(currentRole==='trainer')return;
    const btn=el('sharedClientEditBtn');
    if(!clientMainEditing){if(typeof canBeginEditV25==='function'&&!canBeginEditV25('client-main'))return;clientMainEditing=true;renderCoupleOverviewV36(name,true);if(typeof setHeaderActionState==='function')setHeaderActionState(btn,true);setCancelStateV36('sharedClientCancelBtn',true);return}
    const people=[readCoupleEditPersonV36(0),readCoupleEditPersonV36(1)];if(!people.every(completePersonObjV36))return toast('Complete all Client 1 and Client 2 information fields.');if(!confirm('Save both clients’ general information?'))return;
    const d=extendedClientData(name);d.people=people;Object.assign(d,{phone:people[0].phone,email:people[0].email,birthday:people[0].birthday,gender:people[0].gender,emergencyName:people[0].emergencyName,emergencyPhone:people[0].emergencyPhone,partnerPhone:people[1].phone});
    clientMainEditing=false;if(typeof setHeaderActionState==='function')setHeaderActionState(btn,false);setCancelStateV36('sharedClientCancelBtn',false);renderCoupleOverviewV36(name,false);toast('Both client records saved.');
  };
  window.cancelClientMainEdit=function(){const name=el('ownerClientName')?.textContent.trim()||'';if(!isCoupleNameV36(name)){const r=baseCancelClientMainV36?.();setCancelStateV36('sharedClientCancelBtn',false);return r}if(!clientMainEditing)return;clientMainEditing=false;if(typeof setHeaderActionState==='function')setHeaderActionState(el('sharedClientEditBtn'),false);setCancelStateV36('sharedClientCancelBtn',false);renderCoupleOverviewV36(name,false)};

  const baseToggleHealthV36=window.toggleClientHealthEdit,baseCancelHealthV36=window.cancelClientHealthEdit;
  window.toggleClientHealthEdit=function(){
    const name=el('ownerClientName')?.textContent.trim()||'';
    if(!isCoupleNameV36(name)){const r=baseToggleHealthV36?.();setCancelStateV36('clientHealthCancelBtn',!!clientHealthEditing);return r}
    if(currentRole==='trainer')return;
    if(!clientHealthEditing){if(typeof canBeginEditV25==='function'&&!canBeginEditV25('client-health'))return;clientHealthEditing=true;renderCoupleHealthV36(name,true);if(typeof setHeaderActionState==='function')setHeaderActionState(el('clientHealthEditBtn'),true);setCancelStateV36('clientHealthCancelBtn',true);return}
    const p=peopleForClientV36(name),h1=val('coupleHealthEdit1V36'),h2=val('coupleHealthEdit2V36');if(!h1||!h2)return toast('Enter health / limitation notes for both clients. Use “None” when there are no limitations.');if(!confirm('Save both clients’ Health / Limitation Notes?'))return;
    p[0].health=h1;p[1].health=h2;const d=extendedClientData(name);d.people=p;d.health=`Client 1 — ${p[0].name}: ${h1}\nClient 2 — ${p[1].name}: ${h2}`;clientHealthEditing=false;if(typeof setHeaderActionState==='function')setHeaderActionState(el('clientHealthEditBtn'),false);setCancelStateV36('clientHealthCancelBtn',false);renderCoupleHealthV36(name,false);toast('Health / limitation notes saved for both clients.');
  };
  window.cancelClientHealthEdit=function(){const name=el('ownerClientName')?.textContent.trim()||'';if(!isCoupleNameV36(name)){const r=baseCancelHealthV36?.();setCancelStateV36('clientHealthCancelBtn',false);return r}if(!clientHealthEditing)return;clientHealthEditing=false;if(typeof setHeaderActionState==='function')setHeaderActionState(el('clientHealthEditBtn'),false);setCancelStateV36('clientHealthCancelBtn',false);renderCoupleHealthV36(name,false)};

  /* Keep all section Cancel buttons state-driven. */
  const baseRemarksV36=window.toggleClientRemarksEdit,baseCancelRemarksV36=window.cancelClientRemarksEdit;
  if(baseRemarksV36)window.toggleClientRemarksEdit=function(){const r=baseRemarksV36();setCancelStateV36('clientRemarksCancelBtn',!!clientRemarksEditing);return r};
  if(baseCancelRemarksV36)window.cancelClientRemarksEdit=function(){const r=baseCancelRemarksV36();setCancelStateV36('clientRemarksCancelBtn',false);return r};
  const baseRatesV36=window.toggleOwnerTrainerRatesEdit,baseCancelRatesV36=window.cancelOwnerTrainerRatesEdit;
  if(baseRatesV36)window.toggleOwnerTrainerRatesEdit=function(){const r=baseRatesV36();setCancelStateV36('ownerTrainerRatesCancelBtn',!!ownerTrainerRatesEditing);return r};
  if(baseCancelRatesV36)window.cancelOwnerTrainerRatesEdit=function(){const r=baseCancelRatesV36();setCancelStateV36('ownerTrainerRatesCancelBtn',false);return r};

  const baseOpenSharedV36=window.openSharedClientProfile;
  window.openSharedClientProfile=function(name){clientMainEditing=false;clientHealthEditing=false;if(typeof clientRemarksEditing!=='undefined')clientRemarksEditing=false;const r=baseOpenSharedV36?.(name);setCancelStateV36('sharedClientCancelBtn',false);setCancelStateV36('clientHealthCancelBtn',false);setCancelStateV36('clientRemarksCancelBtn',false);renderCoupleOverviewV36(name,false);return r};
  window.openOwnerClient=function(name){return openSharedClientProfile(name)};
  window.openTrainerClient=function(name){return openSharedClientProfile(name)};

  const baseOpenTrainerV36=window.openOwnerTrainer;
  if(baseOpenTrainerV36)window.openOwnerTrainer=function(name){if(typeof ownerTrainerRatesEditing!=='undefined')ownerTrainerRatesEditing=false;const r=baseOpenTrainerV36(name);setCancelStateV36('ownerTrainerRatesCancelBtn',false);return r};


  /* Dashboard previews: every iPad record keeps all information on one physical row. */
  function dashboardRequestRowMarkupV36(r){
    const context=r.type==='Availability'?'Availability change':(typeof requestSessionLineV30==='function'?(requestSessionLineV30(r)||r.summary||'Request'):(r.summary||'Request'));
    const who=r.client?`${r.trainer} • ${r.client}`:r.trainer;
    const status=typeof requestStatusPillV29==='function'?requestStatusPillV29(r.status):`<span class="pill">${escapeV36(r.status)}</span>`;
    return `<div class="dashboard-request-row-v30f dashboard-request-row-v36">${requestTypePillV29(r.type)}<strong class="dashboard-request-who-v36">${escapeV36(who)}</strong><span class="dashboard-request-context-v36">${escapeV36(context)}</span>${status.replace('class="pill','class="pill request-status-v32')}<button class="btn btn-sm" onclick="openOwnerRequestV29('${r.id}')">View</button></div>`;
  }
  window.dashboardRequestRowMarkupV30Final=dashboardRequestRowMarkupV36;
  window.renderOwnerDashboardRequestsV29=function(){
    const host=el('ownerDashboardRequestRows');if(!host)return;
    const pending=portalRequestsV29.filter(r=>r.status==='Pending').slice(0,3);
    host.innerHTML=pending.length?pending.map(dashboardRequestRowMarkupV36).join(''):'<div class="muted" style="font-size:10px;padding:4px 0">No pending requests.</div>';
  };
  window.renderOwnerMilestones=function(){
    const host=el('ownerMilestoneRows'),count=el('ownerMilestoneCount');if(!host)return;
    const due=clients.filter(c=>Number(c.completedSessions||0)===10).sort((a,b)=>a.name.localeCompare(b.name));
    if(count)count.textContent=`${due.length} ${due.length===1?'client':'clients'}`;
    host.innerHTML=due.length?due.slice(0,5).map(c=>`<div class="milestone-row milestone-row-v36"><div class="milestone-client"><strong>${escapeV36(c.name)}</strong></div><span class="renewal-context-v36">${escapeV36(clientPackageName(c))} • ${escapeV36(c.trainer)}</span><div class="milestone-session-count"><strong>10 sessions</strong></div><div class="milestone-followup"><span class="pill amber">Renewal due</span></div><button class="btn btn-sm" onclick="openOwnerClient('${String(c.name).replace(/'/g,"\\'")}')">View Client</button></div>`).join(''):'<div class="muted" style="padding:10px 2px">No upcoming renewals.</div>';
  };

  document.addEventListener('DOMContentLoaded',()=>{
    ['newClient2PhoneCountryV36','newClient2EmergencyPhoneCountryV36','newClient2GenderV36'].forEach(id=>{const node=el(id);if(node&&typeof enhanceInAppSelect==='function'){enhanceInAppSelect(node);syncSelectV36(id)}});
    handleClientTypeChangeV36(el('newClientType')?.value||'Individual');
    renderOwnerDashboardRequestsV29();renderOwnerMilestones();
    ['sharedClientCancelBtn','clientHealthCancelBtn','clientRemarksCancelBtn','ownerTrainerRatesCancelBtn'].forEach(id=>setCancelStateV36(id,false));
  });
})();
