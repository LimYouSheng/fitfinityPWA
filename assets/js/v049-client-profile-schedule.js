/* v0.49 — client profile assignment clarity + fixed weekly schedule */
(function(){
  const $=id=>document.getElementById(id);
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function to24V49(value){
    const raw=String(value||'').trim();
    if(/^\d{1,2}:\d{2}$/.test(raw)){
      const [h,m]=raw.split(':').map(Number);
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    }
    const m=raw.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
    if(!m)return '';
    let h=Number(m[1])%12;if(m[3].toLowerCase()==='pm')h+=12;
    return `${String(h).padStart(2,'0')}:${m[2]}`;
  }
  function addHourV49(value){
    const t=to24V49(value);if(!t)return '';
    const [h,m]=t.split(':').map(Number),mins=(h*60+m+60)%(24*60);
    return `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`;
  }
  function prettyV49(value){
    const t=to24V49(value);if(!t)return String(value||'—');
    if(typeof prettyTime==='function')return prettyTime(t);
    let [h,m]=t.split(':').map(Number);const ap=h>=12?'PM':'AM';h=h%12||12;
    return `${h}:${String(m).padStart(2,'0')} ${ap}`;
  }
  function dayFromIsoV49(iso){
    if(!iso)return '';
    const d=new Date(`${iso}T12:00:00`);
    return Number.isNaN(d.getTime())?'':dayNames[d.getDay()];
  }
  function neededSlotsV49(c){return c?.frequency===2||c?.frequency==='double'?2:1}

  function deriveFixedScheduleV49(c){
    if(Array.isArray(c?.fixedSchedule)&&c.fixedSchedule.length){
      return c.fixedSchedule.map(s=>({day:s.day,start:to24V49(s.start),end:to24V49(s.end)||addHourV49(s.start)}));
    }
    const rows=typeof upcomingRowsV35==='function'?upcomingRowsV35(c?.name||''):[];
    const need=neededSlotsV49(c),seen=new Set(),slots=[];
    for(const row of rows){
      const day=dayFromIsoV49(row.date);if(!day||seen.has(day))continue;
      const start=to24V49(row.time);if(!start)continue;
      seen.add(day);slots.push({day,start,end:addHourV49(start)});
      if(slots.length>=need)break;
    }
    if(!slots.length){
      const start=to24V49(typeof clientPreferredTimesV35!=='undefined'?clientPreferredTimesV35[c?.name]:'')||'19:00';
      slots.push({day:'Monday',start,end:addHourV49(start)});
    }
    c.fixedSchedule=slots;
    return slots;
  }

  function renderFixedWeeklyScheduleV49(name){
    const host=$('clientFixedWeeklyScheduleRows');if(!host)return;
    const c=typeof clients!=='undefined'?clients.find(x=>x.name===name):null;
    if(!c){host.innerHTML='<div class="muted">No fixed weekly schedule recorded.</div>';return}
    const slots=deriveFixedScheduleV49(c);
    host.innerHTML=slots.map((s,i)=>`<div class="fixed-weekly-schedule-row-v49"><span>${slots.length>1?`Day ${i+1}`:'Weekly slot'}</span><strong>${esc(s.day)} • ${esc(prettyV49(s.start))}–${esc(prettyV49(s.end))}</strong></div>`).join('');
  }

  function normalizeTrainerLabelsV49(){
    const info=$('clientInformationPanel');
    if(info){
      info.querySelectorAll('.info-row > span').forEach(label=>{
        if(label.textContent.trim().toLowerCase()==='primary trainer')label.textContent='Trainer';
      });
    }
  }

  const previousDisplayV49=window.displayClientExtendedDataV25;
  if(typeof previousDisplayV49==='function'){
    window.displayClientExtendedDataV25=function(name){
      const out=previousDisplayV49(name);
      normalizeTrainerLabelsV49();
      renderFixedWeeklyScheduleV49(name);
      return out;
    };
  }

  const previousOpenV49=window.openSharedClientProfile;
  if(typeof previousOpenV49==='function'){
    window.openSharedClientProfile=function(name){
      const out=previousOpenV49(name);
      normalizeTrainerLabelsV49();
      renderFixedWeeklyScheduleV49(name);
      return out;
    };
    window.openOwnerClient=function(name){return window.openSharedClientProfile(name)};
    window.openTrainerClient=function(name){return window.openSharedClientProfile(name)};
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const name=$('ownerClientName')?.textContent.trim()||'Amanda Lim';
    normalizeTrainerLabelsV49();
    renderFixedWeeklyScheduleV49(name);
  });
})();
