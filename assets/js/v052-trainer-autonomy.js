/* v0.52 — trainer-specific autonomy + approval routing */
(function(){
  const AUTONOMY_KEYS_V52=['availability','sessionTime','trainerChange','fixedSchedule'];
  const AUTONOMY_DEFAULT_V52={availability:false,sessionTime:false,trainerChange:false,fixedSchedule:false};
  const AUTONOMY_LABELS_V52={
    availability:'Availability changes',
    sessionTime:'Session time changes',
    trainerChange:'Session trainer changes',
    fixedSchedule:'Fixed weekly schedule changes'
  };

  /* Existing demo trainers intentionally show a mix of trusted and supervised configurations.
     New trainers always start with all four permissions off. */
  const demoAutonomyV52={
    'Marcus Tan':{availability:false,sessionTime:false,trainerChange:false,fixedSchedule:false},
    'Rachel Ong':{availability:true,sessionTime:true,trainerChange:true,fixedSchedule:true},
    'Daniel Lee':{availability:true,sessionTime:true,trainerChange:false,fixedSchedule:false},
    'Priya Nair':{availability:false,sessionTime:true,trainerChange:false,fixedSchedule:true},
    'Jerome Goh':{availability:false,sessionTime:false,trainerChange:false,fixedSchedule:false},
    'Aisha Rahman':{availability:true,sessionTime:true,trainerChange:true,fixedSchedule:true},
    'Kelvin Chua':{availability:false,sessionTime:false,trainerChange:false,fixedSchedule:false}
  };

  function cloneAutonomyV52(value){
    const src=value||{};
    return AUTONOMY_KEYS_V52.reduce((out,key)=>{out[key]=src[key]===true;return out},{});
  }
  function ensureTrainerAutonomyV52(name){
    const trainer=typeof ownerTrainerData!=='undefined'?ownerTrainerData[name]:null;
    if(!trainer)return cloneAutonomyV52(AUTONOMY_DEFAULT_V52);
    if(!trainer.autonomy)trainer.autonomy=cloneAutonomyV52(demoAutonomyV52[name]||AUTONOMY_DEFAULT_V52);
    else trainer.autonomy=cloneAutonomyV52(trainer.autonomy);
    return trainer.autonomy;
  }
  function canTrainerDirectV52(key,name){
    const trainerName=name||(typeof CURRENT_TRAINER!=='undefined'?CURRENT_TRAINER:'Marcus Tan');
    return ensureTrainerAutonomyV52(trainerName)[key]===true;
  }
  window.getTrainerAutonomyV52=name=>cloneAutonomyV52(ensureTrainerAutonomyV52(name));
  window.canTrainerDirectV52=canTrainerDirectV52;

  if(typeof ownerTrainerData!=='undefined')Object.keys(ownerTrainerData).forEach(ensureTrainerAutonomyV52);

  function statusPillV52(allowed){
    return allowed
      ? '<span class="pill green">Direct change allowed</span>'
      : '<span class="pill amber">Owner approval required</span>';
  }
  function statusRowsV52(name){
    const a=ensureTrainerAutonomyV52(name);
    return AUTONOMY_KEYS_V52.map(key=>`<div class="info-row"><span>${AUTONOMY_LABELS_V52[key]}</span><strong>${statusPillV52(a[key])}</strong></div>`).join('');
  }

  /* -------- Owner trainer profile: editable autonomy -------- */
  let ownerAutonomyEditingV52=false;
  function renderOwnerTrainerAutonomyV52(name){
    const rows=document.getElementById('ownerTrainerAutonomyRowsV52');
    if(rows)rows.innerHTML=statusRowsV52(name||activeOwnerTrainer);
  }
  window.renderOwnerTrainerAutonomyV52=renderOwnerTrainerAutonomyV52;

  function setOwnerAutonomyEditorV52(on){
    ownerAutonomyEditingV52=on;
    document.getElementById('ownerTrainerAutonomyRowsV52')?.classList.toggle('hidden',on);
    document.getElementById('ownerTrainerAutonomyEditorV52')?.classList.toggle('hidden',!on);
    const edit=document.getElementById('ownerTrainerAutonomyEditBtnV52');
    const cancel=document.getElementById('ownerTrainerAutonomyCancelBtnV52');
    if(edit)edit.textContent=on?'Save':'Edit';
    cancel?.classList.toggle('hidden',!on);
  }
  function populateOwnerAutonomyEditorV52(){
    const a=ensureTrainerAutonomyV52(activeOwnerTrainer);
    const map={
      availability:'ownerAutonomyAvailabilityV52',
      sessionTime:'ownerAutonomySessionTimeV52',
      trainerChange:'ownerAutonomyTrainerChangeV52',
      fixedSchedule:'ownerAutonomyFixedScheduleV52'
    };
    Object.entries(map).forEach(([key,id])=>{const el=document.getElementById(id);if(el)el.checked=!a[key]});
  }
  function readOwnerAutonomyEditorV52(){
    return {
      availability:!document.getElementById('ownerAutonomyAvailabilityV52')?.checked,
      sessionTime:!document.getElementById('ownerAutonomySessionTimeV52')?.checked,
      trainerChange:!document.getElementById('ownerAutonomyTrainerChangeV52')?.checked,
      fixedSchedule:!document.getElementById('ownerAutonomyFixedScheduleV52')?.checked
    };
  }
  window.toggleOwnerTrainerAutonomyEditV52=function(){
    const trainer=ownerTrainerData?.[activeOwnerTrainer];if(!trainer)return;
    if(!ownerAutonomyEditingV52){populateOwnerAutonomyEditorV52();setOwnerAutonomyEditorV52(true);return}
    if(!window.confirm('Save these trainer autonomy settings?'))return;
    trainer.autonomy=readOwnerAutonomyEditorV52();
    setOwnerAutonomyEditorV52(false);
    renderOwnerTrainerAutonomyV52(activeOwnerTrainer);
    if(activeOwnerTrainer===CURRENT_TRAINER){renderTrainerSelfAutonomyV52();refreshAutonomyActionLabelsV52()}
    if(typeof toast==='function')toast('Trainer autonomy settings saved.');
  };
  window.cancelOwnerTrainerAutonomyEditV52=function(){
    setOwnerAutonomyEditorV52(false);
    renderOwnerTrainerAutonomyV52(activeOwnerTrainer);
  };

  const previousOpenOwnerTrainerV52=window.openOwnerTrainer;
  if(typeof previousOpenOwnerTrainerV52==='function'){
    window.openOwnerTrainer=function(name){
      const out=previousOpenOwnerTrainerV52(name);
      ownerAutonomyEditingV52=false;setOwnerAutonomyEditorV52(false);renderOwnerTrainerAutonomyV52(name);
      return out;
    };
  }

  /* -------- Trainer self profile: read-only autonomy -------- */
  function renderTrainerSelfAutonomyV52(){
    const host=document.getElementById('trainerSelfAutonomyRowsV52');
    if(host)host.innerHTML=statusRowsV52(typeof CURRENT_TRAINER!=='undefined'?CURRENT_TRAINER:'Marcus Tan');
  }
  window.renderTrainerSelfAutonomyV52=renderTrainerSelfAutonomyV52;

  /* -------- Add Trainer: approval-needed UI defaults ON; stored direct permissions remain OFF -------- */
  function readNewTrainerAutonomyV52(){
    return {
      availability:!document.getElementById('newTrainerAutonomyAvailabilityV52')?.checked,
      sessionTime:!document.getElementById('newTrainerAutonomySessionTimeV52')?.checked,
      trainerChange:!document.getElementById('newTrainerAutonomyTrainerChangeV52')?.checked,
      fixedSchedule:!document.getElementById('newTrainerAutonomyFixedScheduleV52')?.checked
    };
  }
  function resetNewTrainerAutonomyV52(){
    ['newTrainerAutonomyAvailabilityV52','newTrainerAutonomySessionTimeV52','newTrainerAutonomyTrainerChangeV52','newTrainerAutonomyFixedScheduleV52'].forEach(id=>{
      const el=document.getElementById(id);if(el)el.checked=true;
    });
  }
  const previousResetTrainerModalV52=window.resetTrainerModal;
  if(typeof previousResetTrainerModalV52==='function'){
    window.resetTrainerModal=function(){const out=previousResetTrainerModalV52();resetNewTrainerAutonomyV52();return out};
  }
  const previousCreateTrainerV52=window.createTrainerFromModal;
  if(typeof previousCreateTrainerV52==='function'){
    window.createTrainerFromModal=function(){
      const name=document.getElementById('newTrainerName')?.value.trim()||'';
      const before=name?ownerTrainerData?.[name]:null;
      const autonomy=readNewTrainerAutonomyV52();
      const out=previousCreateTrainerV52();
      if(name&&!before&&ownerTrainerData?.[name])ownerTrainerData[name].autonomy=cloneAutonomyV52(autonomy);
      return out;
    };
  }

  /* -------- Shared view refresh -------- */
  function refreshOperationalViewsV52(){
    try{if(typeof renderTrainerSelfAvailability==='function')renderTrainerSelfAvailability()}catch(e){}
    try{if(typeof renderOwnerTrainerAvailability==='function')renderOwnerTrainerAvailability(activeOwnerTrainer)}catch(e){}
    try{if(typeof populateTrainerControls==='function')populateTrainerControls()}catch(e){}
    try{if(typeof setDashboardCalendar==='function'){setDashboardCalendar('owner',calendarNavState.owner.view);setDashboardCalendar('trainer',calendarNavState.trainer.view)}}catch(e){}
    try{if(typeof renderOwnerAllSessions==='function')renderOwnerAllSessions()}catch(e){}
    try{if(typeof renderTrainerAllSessions==='function')renderTrainerAllSessions()}catch(e){}
    try{if(typeof refreshTrainerSessionPage==='function'&&activeSessionId)refreshTrainerSessionPage()}catch(e){}
  }

  /* -------- Availability: direct save or request -------- */
  function refreshAvailabilityModalCopyV52(){
    const direct=canTrainerDirectV52('availability');
    const modal=document.getElementById('availabilityRequestModal');if(!modal)return;
    const title=modal.querySelector('.modal-head h3'),subtitle=modal.querySelector('.modal-head p'),submit=modal.querySelector('.actions .btn-blue');
    if(title)title.textContent=direct?'Edit Availability':'Request Availability Change';
    if(subtitle)subtitle.textContent=direct?'Update your approved weekly availability.':'Submit your proposed weekly availability for owner approval.';
    if(submit)submit.textContent=direct?'Save Availability':'Submit To Owner';
  }
  const previousOpenAvailabilityV52=window.openTrainerAvailabilityRequest;
  if(typeof previousOpenAvailabilityV52==='function'){
    window.openTrainerAvailabilityRequest=function(){const out=previousOpenAvailabilityV52();refreshAvailabilityModalCopyV52();return out};
  }
  const previousSubmitAvailabilityV52=window.submitTrainerAvailabilityRequest;
  if(typeof previousSubmitAvailabilityV52==='function'){
    window.submitTrainerAvailabilityRequest=function(){
      if(!canTrainerDirectV52('availability'))return previousSubmitAvailabilityV52();
      const rows=[...document.querySelectorAll('#trainerAvailabilityRequestBlocks .block-row')];
      if(!rows.length)return typeof toast==='function'&&toast('Add at least one availability block.');
      const proposed=availabilityRowsToMap('#trainerAvailabilityRequestBlocks');
      trainerAvailabilityBlocks[CURRENT_TRAINER]=typeof cloneAvailabilityV30==='function'?cloneAvailabilityV30(proposed):proposed;
      if(typeof pendingAvailabilityRequest!=='undefined')pendingAvailabilityRequest=null;
      if(typeof closeModal==='function')closeModal('availabilityRequestModal');
      refreshOperationalViewsV52();
      if(typeof toast==='function')toast('Availability updated.');
    };
  }

  /* -------- Session time: direct save or request -------- */
  function updateSessionTimeModalCopyV52(){
    const direct=canTrainerDirectV52('sessionTime');
    const modal=document.getElementById('sessionTimeRequestModalV29');if(!modal)return;
    const title=modal.querySelector('.modal-head h3'),submit=modal.querySelector('.actions .btn-blue');
    if(title)title.textContent=direct?'Change Session Time':'Request Time Change';
    if(submit)submit.textContent=direct?'Save Change':'Submit Request';
  }
  const previousOpenSessionTimeV52=window.openSessionTimeRequestV29;
  if(typeof previousOpenSessionTimeV52==='function'){
    window.openSessionTimeRequestV29=function(){const out=previousOpenSessionTimeV52();updateSessionTimeModalCopyV52();return out};
  }
  const previousSubmitSessionTimeV52=window.submitSessionTimeRequestV29;
  if(typeof previousSubmitSessionTimeV52==='function'){
    window.submitSessionTimeRequestV29=function(){
      if(!canTrainerDirectV52('sessionTime'))return previousSubmitSessionTimeV52();
      const e=typeof getTrainerSessionEvent==='function'?getTrainerSessionEvent(activeSessionId):null;
      if(!e||activeSessionRole!=='trainer')return typeof toast==='function'&&toast('Open a trainer session first.');
      const date=document.getElementById('requestSessionDateV29')?.value||'',from=document.getElementById('requestSessionFromV29')?.value||'',to=document.getElementById('requestSessionToV29')?.value||'';
      if(!date||!from||!to)return typeof toast==='function'&&toast('Date, From and To are required.');
      if(to<=from)return typeof toast==='function'&&toast('Session end time must be after the start time.');
      sessionScheduleOverrides[e.id]={...(sessionScheduleOverrides[e.id]||{}),date,time:from,endTime:to};
      if(typeof closeModal==='function')closeModal('sessionTimeRequestModalV29');
      refreshOperationalViewsV52();
      if(typeof toast==='function')toast('Session time updated.');
    };
  }

  /* -------- Session trainer: direct save or request -------- */
  function updateTrainerChangeModalCopyV52(){
    const direct=canTrainerDirectV52('trainerChange');
    const modal=document.getElementById('sessionTrainerRequestModalV29');if(!modal)return;
    const title=modal.querySelector('.modal-head h3'),label=modal.querySelector('.field label'),submit=modal.querySelector('.actions .btn-blue');
    if(title)title.textContent=direct?'Change Session Trainer':'Request Trainer Change';
    if(label)label.textContent=direct?'NEW TRAINER':'REQUESTED TRAINER';
    if(submit)submit.textContent=direct?'Save Change':'Submit Request';
  }
  const previousOpenTrainerChangeV52=window.openSessionTrainerRequestV29;
  if(typeof previousOpenTrainerChangeV52==='function'){
    window.openSessionTrainerRequestV29=function(){const out=previousOpenTrainerChangeV52();updateTrainerChangeModalCopyV52();return out};
  }
  const previousSubmitTrainerChangeV52=window.submitSessionTrainerRequestV29;
  if(typeof previousSubmitTrainerChangeV52==='function'){
    window.submitSessionTrainerRequestV29=function(){
      if(!canTrainerDirectV52('trainerChange'))return previousSubmitTrainerChangeV52();
      const e=typeof getTrainerSessionEvent==='function'?getTrainerSessionEvent(activeSessionId):null;
      if(!e||activeSessionRole!=='trainer')return typeof toast==='function'&&toast('Open a trainer session first.');
      const trainer=document.getElementById('requestReplacementTrainerV29')?.value||'';
      if(!trainer)return typeof toast==='function'&&toast('Choose a trainer.');
      sessionTrainerOverrides[e.id]=trainer;
      if(typeof closeModal==='function')closeModal('sessionTrainerRequestModalV29');
      refreshOperationalViewsV52();
      if(typeof toast==='function')toast('Session trainer updated.');
    };
  }

  /* -------- Fixed weekly schedule: owner direct; trainer direct only when allowed -------- */
  function to24V52(value){
    const raw=String(value||'').trim();if(/^\d{2}:\d{2}$/.test(raw))return raw;
    if(typeof to24Hour==='function')return to24Hour(raw);
    return raw;
  }
  function addHourV52(start){
    const [h,m]=String(start||'00:00').split(':').map(Number);const total=(h*60+m+60)%(24*60);
    return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
  }
  function activeClientV52(){
    const name=typeof activeClientNameV35==='function'?activeClientNameV35():(document.getElementById('ownerClientName')?.textContent.trim()||'');
    return typeof clients!=='undefined'?clients.find(c=>c.name===name):null;
  }
  function normalizeScheduleV52(list){
    return (Array.isArray(list)?list:[]).map(s=>({day:String(s.day||''),start:to24V52(s.start||s.time||''),end:to24V52(s.end||'')||addHourV52(to24V52(s.start||s.time||''))})).filter(s=>s.day&&s.start);
  }
  function sameScheduleV52(a,b){return JSON.stringify(normalizeScheduleV52(a))===JSON.stringify(normalizeScheduleV52(b))}
  function dateAtNoonV52(iso){const d=new Date(`${iso}T12:00:00`);return Number.isNaN(d.getTime())?new Date():d}
  function isoV52(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
  function shiftDateV52(iso,days){const d=dateAtNoonV52(iso);d.setDate(d.getDate()+days);return isoV52(d)}
  function dayNameV52(iso){return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dateAtNoonV52(iso).getDay()]}
  function rescheduleUpcomingV52(clientName,schedule){
    if(typeof upcomingRowsV35!=='function')return;
    const rows=upcomingRowsV35(clientName).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const slots=normalizeScheduleV52(schedule);if(!rows.length||!slots.length)return;
    const first=rows[0].date||isoV52(new Date());
    const slotMap=new Map(slots.map(s=>[s.day,s]));const occurrences=[];
    for(let offset=0;occurrences.length<rows.length&&offset<370;offset++){
      const date=shiftDateV52(first,offset),slot=slotMap.get(dayNameV52(date));if(slot)occurrences.push({date,slot});
    }
    rows.forEach((row,i)=>{
      const next=occurrences[i];if(!next)return;
      row.date=next.date;row.time=next.slot.start;
      if(typeof sessionScheduleOverrides!=='undefined')sessionScheduleOverrides[row.id]={...(sessionScheduleOverrides[row.id]||{}),date:next.date,time:next.slot.start,endTime:next.slot.end};
    });
  }
  function directFixedScheduleAllowedV52(){
    if(typeof currentRole!=='undefined'&&currentRole==='owner')return true;
    return canTrainerDirectV52('fixedSchedule');
  }
  function updateFixedScheduleNoteV52(){
    const note=document.querySelector('#clientFixedWeeklyScheduleEditorV50 .fixed-weekly-schedule-request-note-v50');if(!note)return;
    note.textContent=directFixedScheduleAllowedV52()
      ? 'Saving updates the fixed weekly schedule and all upcoming sessions immediately.'
      : 'Saving creates a schedule-change request. The current schedule stays unchanged until the request is approved.';
  }
  const previousFixedScheduleToggleV52=window.toggleClientFixedScheduleEditV50;
  if(typeof previousFixedScheduleToggleV52==='function'){
    window.toggleClientFixedScheduleEditV50=function(){
      const editBtn=document.getElementById('clientFixedScheduleEditBtn');
      const isSaving=(editBtn?.textContent||'').trim()==='Save';
      if(!isSaving){const out=previousFixedScheduleToggleV52();requestAnimationFrame(updateFixedScheduleNoteV52);return out}
      if(!directFixedScheduleAllowedV52())return previousFixedScheduleToggleV52();
      const c=activeClientV52();if(!c)return;
      const rows=[...document.querySelectorAll('#clientFixedWeeklyScheduleEditorV50 .fixed-weekly-schedule-edit-row-v50')];
      const proposed=rows.map(row=>{
        const day=row.querySelector('.fixed-schedule-day-v50')?.value||'Monday';
        const start=to24V52(row.querySelector('.fixed-schedule-start-v50')?.value||'');
        return {day,start,end:addHourV52(start)};
      });
      if(proposed.some(s=>!s.start))return typeof toast==='function'&&toast('Choose a session start time for every weekly slot.');
      if(new Set(proposed.map(s=>s.day)).size!==proposed.length)return typeof toast==='function'&&toast('Each weekly slot must use a different day.');
      const old=normalizeScheduleV52(c.fixedSchedule||[]);
      if(sameScheduleV52(old,proposed)){
        if(typeof cancelClientFixedScheduleEditV50==='function')cancelClientFixedScheduleEditV50();
        return typeof toast==='function'&&toast('No schedule changes to save.');
      }
      const message=(typeof currentRole!=='undefined'&&currentRole==='trainer')
        ? 'Update this fixed weekly schedule now? All upcoming sessions for this client will also be rescheduled immediately.'
        : 'Save this fixed weekly schedule? All upcoming sessions for this client will also be rescheduled.';
      if(!window.confirm(message))return;
      c.fixedSchedule=normalizeScheduleV52(proposed);
      rescheduleUpcomingV52(c.name,c.fixedSchedule);
      if(typeof cancelClientFixedScheduleEditV50==='function')cancelClientFixedScheduleEditV50();
      refreshOperationalViewsV52();
      if(typeof renderClientUpcomingSessionsV27==='function')renderClientUpcomingSessionsV27();
      if(typeof toast==='function')toast('Fixed weekly schedule and upcoming sessions updated.');
    };
  }

  /* -------- Dynamic action labels -------- */
  function refreshAutonomyActionLabelsV52(){
    const availabilityBtn=document.querySelector('#trainerSelfAvailability .account-availability-head .btn');
    if(availabilityBtn)availabilityBtn.textContent=canTrainerDirectV52('availability')?'Edit Availability':'Request Change';
    const actions=document.getElementById('trainerSessionRequestActions');
    if(actions){
      const buttons=actions.querySelectorAll('button');
      if(buttons[0])buttons[0].textContent=canTrainerDirectV52('sessionTime')?'Change Time':'Request Time Change';
      if(buttons[1])buttons[1].textContent=canTrainerDirectV52('trainerChange')?'Change Trainer':'Request Trainer Change';
    }
    updateFixedScheduleNoteV52();
  }
  window.refreshAutonomyActionLabelsV52=refreshAutonomyActionLabelsV52;

  const previousRefreshTrainerSessionV52=window.refreshTrainerSessionPage;
  if(typeof previousRefreshTrainerSessionV52==='function'){
    window.refreshTrainerSessionPage=function(){const out=previousRefreshTrainerSessionV52();refreshAutonomyActionLabelsV52();return out};
  }

  const previousShowPortalV52=window.showPortal;
  if(typeof previousShowPortalV52==='function'){
    window.showPortal=function(id,options={}){
      const out=previousShowPortalV52(id,options);
      if(id==='trainer-profile'){renderTrainerSelfAutonomyV52();refreshAutonomyActionLabelsV52()}
      if(id==='owner-trainer'){renderOwnerTrainerAutonomyV52(activeOwnerTrainer)}
      return out;
    };
  }

  document.addEventListener('DOMContentLoaded',()=>{
    resetNewTrainerAutonomyV52();
    renderOwnerTrainerAutonomyV52(typeof activeOwnerTrainer!=='undefined'?activeOwnerTrainer:'Marcus Tan');
    renderTrainerSelfAutonomyV52();
    refreshAutonomyActionLabelsV52();
  });
})();
