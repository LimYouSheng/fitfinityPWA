/* v0.50 — client fixed weekly schedule edit/request/approval workflow */
(function(){
  const $=id=>document.getElementById(id);
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');
  let editing=false;
  let editingClient='';

  function to24(value){
    const raw=String(value||'').trim();
    if(/^\d{1,2}:\d{2}$/.test(raw)){
      const [h,m]=raw.split(':').map(Number);
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    }
    const match=raw.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
    if(!match)return '';
    let h=Number(match[1])%12;if(match[3].toLowerCase()==='pm')h+=12;
    return `${String(h).padStart(2,'0')}:${match[2]}`;
  }
  function addHour(value){
    const t=to24(value);if(!t)return '';
    const [h,m]=t.split(':').map(Number),n=(h*60+m+60)%(24*60);
    return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
  }
  function pretty(value){
    const t=to24(value);if(!t)return String(value||'—');
    if(typeof prettyTime==='function')return prettyTime(t);
    let [h,m]=t.split(':').map(Number);const suffix=h>=12?'PM':'AM';h=h%12||12;
    return `${h}:${String(m).padStart(2,'0')} ${suffix}`;
  }
  function dateDay(iso){
    const d=new Date(`${iso}T12:00:00`);
    return Number.isNaN(d.getTime())?'':days[d.getDay()];
  }
  function shiftDate(iso,n){
    if(typeof isoShiftDaysV35==='function')return isoShiftDaysV35(iso,n);
    const d=new Date(`${iso}T12:00:00`);d.setDate(d.getDate()+n);
    return d.toISOString().slice(0,10);
  }
  function activeClient(){
    const name=$('ownerClientName')?.textContent.trim()||'';
    return typeof clients!=='undefined'?clients.find(c=>c.name===name):null;
  }
  function normalizeSchedule(list){
    return (Array.isArray(list)?list:[]).map(s=>({
      day:days.includes(s.day)?s.day:'Monday',
      start:to24(s.start)||'19:00',
      end:to24(s.end)||addHour(s.start||'19:00')
    }));
  }
  function currentSchedule(c){
    if(!c)return [];
    const saved=normalizeSchedule(c.fixedSchedule);
    if(saved.length)return saved;
    const need=(c.frequency===2||c.frequency==='double')?2:1;
    const rows=typeof upcomingRowsV35==='function'?upcomingRowsV35(c.name):[];
    const seen=new Set(),out=[];
    for(const row of rows){
      const day=dateDay(row.date),start=to24(row.time);
      if(!day||!start||seen.has(day))continue;
      seen.add(day);out.push({day,start,end:addHour(start)});
      if(out.length>=need)break;
    }
    if(!out.length)out.push({day:'Monday',start:'19:00',end:'20:00'});
    c.fixedSchedule=out.map(x=>({...x}));
    return out;
  }
  function scheduleText(list){
    return normalizeSchedule(list).map(s=>`${s.day} • ${pretty(s.start)}–${pretty(s.end)}`).join(' | ');
  }
  function schedulesEqual(a,b){
    const clean=x=>normalizeSchedule(x).map(s=>`${s.day}|${s.start}|${s.end}`).join('||');
    return clean(a)===clean(b);
  }

  function renderSchedule(name){
    const host=$('clientFixedWeeklyScheduleRows');if(!host)return;
    const c=typeof clients!=='undefined'?clients.find(x=>x.name===name):null;
    if(!c){host.innerHTML='<div class="muted">No fixed weekly schedule recorded.</div>';return}
    const slots=currentSchedule(c);
    host.innerHTML=slots.map((s,i)=>`<div class="fixed-weekly-schedule-row-v49"><span>${slots.length>1?`Day ${i+1}`:'Weekly slot'}</span><strong>${esc(s.day)} • ${esc(pretty(s.start))}–${esc(pretty(s.end))}</strong></div>`).join('');
  }

  function renderEditor(c){
    const editor=$('clientFixedWeeklyScheduleEditorV50');if(!editor)return;
    const slots=currentSchedule(c);
    editor.innerHTML=slots.map((s,i)=>`<div class="fixed-weekly-schedule-edit-row-v50" data-schedule-index="${i}"><div class="field"><label>DAY ${slots.length>1?i+1:''}</label><select class="fixed-schedule-day-v50">${days.map(day=>`<option value="${day}"${day===s.day?' selected':''}>${day}</option>`).join('')}</select></div><div class="field"><label>SESSION START</label><input class="fixed-schedule-start-v50" type="time" step="1800" value="${esc(s.start)}"></div></div>`).join('')+'<div class="fixed-weekly-schedule-request-note-v50">Saving creates a schedule-change request. The current schedule stays unchanged until the request is approved.</div>';
  }

  function setEditState(on){
    editing=on;
    $('clientFixedWeeklyScheduleRows')?.classList.toggle('hidden',on);
    $('clientFixedWeeklyScheduleEditorV50')?.classList.toggle('hidden',!on);
    const edit=$('clientFixedScheduleEditBtn'),cancel=$('clientFixedScheduleCancelBtn');
    if(edit)edit.textContent=on?'Save':'Edit';
    cancel?.classList.toggle('hidden',!on);
  }

  window.toggleClientFixedScheduleEditV50=function(){
    const c=activeClient();if(!c)return;
    if(!editing){
      editingClient=c.name;
      renderEditor(c);
      setEditState(true);
      return;
    }
    const rows=[...document.querySelectorAll('#clientFixedWeeklyScheduleEditorV50 .fixed-weekly-schedule-edit-row-v50')];
    const proposed=rows.map(row=>{
      const day=row.querySelector('.fixed-schedule-day-v50')?.value||'Monday';
      const start=to24(row.querySelector('.fixed-schedule-start-v50')?.value)||'';
      return {day,start,end:addHour(start)};
    });
    if(proposed.some(s=>!s.start))return typeof toast==='function'&&toast('Choose a session start time for every weekly slot.');
    if(new Set(proposed.map(s=>s.day)).size!==proposed.length)return typeof toast==='function'&&toast('Each weekly slot must use a different day.');
    const old=currentSchedule(c).map(s=>({...s}));
    if(schedulesEqual(old,proposed)){
      setEditState(false);renderSchedule(c.name);return typeof toast==='function'&&toast('No schedule changes to submit.');
    }
    const pending=typeof portalRequestsV29!=='undefined'&&portalRequestsV29.some(r=>r.type==='Schedule Change'&&r.client===c.name&&r.status==='Pending');
    if(pending)return typeof toast==='function'&&toast('A fixed weekly schedule change is already pending approval for this client.');
    const ok=window.confirm('Submit this fixed weekly schedule change? Once approved, all upcoming sessions for this client will be updated to the new weekly schedule.');
    if(!ok)return;
    if(typeof addOwnerRequestV29==='function'){
      addOwnerRequestV29({
        type:'Schedule Change',
        trainer:c.trainer||CURRENT_TRAINER||'—',
        client:c.name,
        summary:'Fixed weekly schedule change',
        reason:'Update recurring client schedule',
        oldSchedule:old,
        newSchedule:proposed,
        requestedBy:currentRole==='trainer'?(CURRENT_TRAINER||c.trainer):'Owner'
      });
    }
    setEditState(false);
    renderSchedule(c.name);
    if(typeof toast==='function')toast('Schedule change submitted for approval.');
  };

  window.cancelClientFixedScheduleEditV50=function(){
    const c=activeClient();
    editingClient='';
    setEditState(false);
    if(c)renderSchedule(c.name);
  };

  function scheduleCompareMarkup(list){
    const slots=normalizeSchedule(list);
    return slots.length?slots.map((s,i)=>`<div class="schedule-compare-row-v50"><span>${slots.length>1?`Day ${i+1}`:'Weekly slot'}</span><strong>${esc(s.day)} • ${esc(pretty(s.start))}–${esc(pretty(s.end))}</strong></div>`).join(''):'<div class="muted">No schedule recorded.</div>';
  }

  const previousTypePill=window.requestTypePillV29;
  if(typeof previousTypePill==='function'){
    window.requestTypePillV29=function(type){
      if(type==='Schedule Change')return `<span class="pill blue request-type">${esc(type)}</span>`;
      return previousTypePill(type);
    };
  }

  const previousDetail=window.requestDetailCardsV29;
  if(typeof previousDetail==='function'){
    window.requestDetailCardsV29=function(r){
      if(r?.type!=='Schedule Change')return previousDetail(r);
      const base=`<div class="request-detail-grid"><div class="request-detail-card"><small>TYPE</small><strong>Schedule Change</strong></div><div class="request-detail-card"><small>TRAINER</small><strong>${esc(r.trainer||'—')}</strong></div><div class="request-detail-card"><small>CLIENT</small><strong>${esc(r.client||'—')}</strong></div><div class="request-detail-card"><small>SUBMITTED</small><strong>${esc(r.submitted||'—')}</strong></div></div>`;
      return base+`<div class="schedule-compare-v50"><div class="schedule-compare-card-v50"><h4>Old Schedule</h4>${scheduleCompareMarkup(r.oldSchedule)}</div><div class="schedule-compare-card-v50"><h4>New Schedule</h4>${scheduleCompareMarkup(r.newSchedule)}</div></div>`+(r.reason?`<div class="request-detail-card" style="margin-top:10px"><small>NOTE</small><strong>${esc(r.reason)}</strong></div>`:'');
    };
  }

  function rescheduleUpcoming(clientName,newSchedule){
    if(typeof upcomingRowsV35!=='function')return;
    const rows=upcomingRowsV35(clientName).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const slots=normalizeSchedule(newSchedule);
    if(!rows.length||!slots.length)return;
    const first=rows[0].date||new Date().toISOString().slice(0,10);
    const slotMap=new Map(slots.map(s=>[s.day,s]));
    const occurrences=[];
    for(let offset=0;occurrences.length<rows.length&&offset<370;offset++){
      const date=shiftDate(first,offset),day=dateDay(date),slot=slotMap.get(day);
      if(slot)occurrences.push({date,slot});
    }
    rows.forEach((row,i)=>{
      const next=occurrences[i];if(!next)return;
      row.date=next.date;row.time=next.slot.start;
      if(typeof sessionScheduleOverrides!=='undefined'){
        sessionScheduleOverrides[row.id]={...(sessionScheduleOverrides[row.id]||{}),date:next.date,time:next.slot.start,endTime:next.slot.end};
      }
    });
  }

  function applyScheduleRequest(r){
    const c=typeof clients!=='undefined'?clients.find(x=>x.name===r.client):null;
    if(!c)return;
    const next=normalizeSchedule(r.newSchedule);
    c.fixedSchedule=next.map(s=>({...s}));
    rescheduleUpcoming(c.name,next);
  }

  const previousResolve=window.resolveOwnerRequestV29;
  if(typeof previousResolve==='function'){
    window.resolveOwnerRequestV29=function(status){
      const r=typeof portalRequestsV29!=='undefined'?portalRequestsV29.find(x=>x.id===activeRequestIdV29):null;
      if(!r||r.type!=='Schedule Change')return previousResolve(status);
      if(status==='Approved')applyScheduleRequest(r);
      r.status=status;
      if(typeof closeModal==='function')closeModal('ownerRequestDetailModalV29');
      if(typeof renderOwnerRequestsV29==='function')renderOwnerRequestsV29();
      if(typeof renderOwnerDashboardRequestsV29==='function')renderOwnerDashboardRequestsV29();
      try{
        if(status==='Approved'&&$('ownerClientName')?.textContent.trim()===r.client){
          if(typeof renderSelectedClientV35==='function')renderSelectedClientV35(r.client);
          renderSchedule(r.client);
        }
        if(typeof setDashboardCalendar==='function'){
          setDashboardCalendar('owner',calendarNavState.owner.view);
          setDashboardCalendar('trainer',calendarNavState.trainer.view);
        }
        if(typeof renderOwnerAllSessions==='function')renderOwnerAllSessions();
        if(typeof renderTrainerAllSessions==='function')renderTrainerAllSessions();
      }catch(e){}
      if(typeof toast==='function')toast(`Schedule change ${status.toLowerCase()}.`);
    };
  }

  /* Keep the v0.50 schedule renderer active after every client profile refresh. */
  const previousDisplay=window.displayClientExtendedDataV25;
  if(typeof previousDisplay==='function'){
    window.displayClientExtendedDataV25=function(name){
      const out=previousDisplay(name);
      editing=false;editingClient='';setEditState(false);renderSchedule(name);
      return out;
    };
  }
  const previousOpen=window.openSharedClientProfile;
  if(typeof previousOpen==='function'){
    window.openSharedClientProfile=function(name){
      const out=previousOpen(name);
      editing=false;editingClient='';setEditState(false);renderSchedule(name);
      return out;
    };
    window.openOwnerClient=function(name){return window.openSharedClientProfile(name)};
    window.openTrainerClient=function(name){return window.openSharedClientProfile(name)};
  }

  /* Seed one pending demo request so the old/new approval comparison is visible immediately. */
  if(typeof portalRequestsV29!=='undefined'&&!portalRequestsV29.some(r=>r.id==='RQ-1004')){
    const c=typeof clients!=='undefined'?clients.find(x=>x.name==='Daniel Koh'):null;
    if(c){
      const old=currentSchedule(c).map(s=>({...s}));
      const newSchedule=old.map((s,i)=>{
        const idx=days.indexOf(s.day),nextDay=days[(idx+1+i)%7];
        return {day:nextDay,start:s.start,end:s.end};
      });
      portalRequestsV29.push({id:'RQ-1004',type:'Schedule Change',trainer:c.trainer||'Marcus Tan',client:c.name,summary:'Fixed weekly schedule change',submitted:'30 Aug 2026',status:'Pending',reason:'Client requested a new recurring weekly slot',oldSchedule:old,newSchedule,requestedBy:'Marcus Tan'});
    }
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const name=$('ownerClientName')?.textContent.trim()||'Amanda Lim';
    renderSchedule(name);
    setEditState(false);
    if(typeof renderOwnerRequestsV29==='function')renderOwnerRequestsV29();
    if(typeof renderOwnerDashboardRequestsV29==='function')renderOwnerDashboardRequestsV29();
  });
})();
