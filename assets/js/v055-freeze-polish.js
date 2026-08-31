/* v0.55 — final freeze polish: weekday context + client link */
(function(){
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');
  function weekdayV55(iso){
    try{return localDate(iso).toLocaleDateString('en-SG',{weekday:'long'})}catch(e){
      const d=new Date(String(iso||'')+'T00:00:00');return Number.isNaN(d.getTime())?'':d.toLocaleDateString('en-SG',{weekday:'long'});
    }
  }
  function dateWithWeekdayV55(iso,includeYear=true){
    const base=typeof formatDateShort==='function'?formatDateShort(iso):String(iso||'');
    const date=includeYear?base:base.replace(' 2026','');
    const day=weekdayV55(iso);
    return day?`${day}, ${date}`:date;
  }
  window.formatSessionDateWithWeekdayV55=dateWithWeekdayV55;

  /* All Sessions — preserve existing renderer/filtering and only enrich the date column. */
  const previousOwnerSessionsV55=window.renderOwnerAllSessions;
  if(typeof previousOwnerSessionsV55==='function'){
    window.renderOwnerAllSessions=function(){
      const out=previousOwnerSessionsV55();
      document.querySelectorAll('#ownerSessionRows tr[data-session-id]').forEach(row=>{
        const id=row.dataset.sessionId,e=typeof getTrainerSessionEvent==='function'?getTrainerSessionEvent(id):null;
        const cell=row.querySelector('.session-date-cell');
        if(e&&cell)cell.textContent=`${dateWithWeekdayV55(e.date,false)}, ${e.time}`;
      });
      return out;
    };
  }
  const previousTrainerSessionsV55=window.renderTrainerAllSessions;
  if(typeof previousTrainerSessionsV55==='function'){
    window.renderTrainerAllSessions=function(){
      const out=previousTrainerSessionsV55();
      document.querySelectorAll('#trainerSessionRows tr[id^="trainerSession"]').forEach(row=>{
        const id=row.id.replace(/^trainerSession/,''),e=typeof getTrainerSessionEvent==='function'?getTrainerSessionEvent(id):null;
        const cell=row.querySelector('td');
        if(e&&cell)cell.textContent=`${dateWithWeekdayV55(e.date,false)}, ${e.time}`;
      });
      return out;
    };
  }

  /* Client Profile — Upcoming Sessions with weekday + existing status pill treatment. */
  window.renderClientUpcomingSessionsV27=function(){
    const host=document.getElementById('clientUpcomingSessionsRows');if(!host)return;
    const name=typeof activeClientNameV35==='function'?activeClientNameV35():(document.getElementById('ownerClientName')?.textContent.trim()||'');
    const rows=typeof upcomingRowsV35==='function'?upcomingRowsV35(name):[];
    const client=typeof activeClientV35==='function'?activeClientV35():clients.find(c=>c.name===name);
    const meta=typeof packageMetaForClientV35==='function'?packageMetaForClientV35(client):{total:12};
    const completed=typeof completedRowsV35==='function'?completedRowsV35(name).length:0;
    host.innerHTML=rows.length?rows.map((e,i)=>{
      const status=sessionStatusMap[e.id]||e.status||'Planned';
      const time=typeof sessionTimeRangeV25==='function'?sessionTimeRangeV25(e):(e.time||'');
      return `<div class="client-upcoming-row"><div class="client-upcoming-main"><strong>${esc(dateWithWeekdayV55(e.date,true))} • ${esc(time)}</strong><div class="client-upcoming-meta-v48"><span>${esc(e.trainer)} • Session ${completed+i+1}/${meta.total}</span>${statusPill(status)}</div></div><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></div>`;
    }).join(''):'<div class="muted" style="padding:10px 2px">No upcoming sessions.</div>';
  };

  /* Client Profile — Session History with weekday + trainer/session/status. */
  window.renderClientHistoryV35=function(name){
    const table=document.querySelector('#owner-history .session-history-table'),tbody=table?.querySelector('tbody');if(!table||!tbody)return;
    const all=packageRowsV35(name),rows=completedRowsV35(name).slice().reverse(),meta=packageMetaForClientV35(clients.find(x=>x.name===name));
    const head=table.querySelector('thead tr');
    if(head)head.innerHTML='<th>Date</th><th>Trainer / Session</th><th>Status</th><th></th>';
    tbody.innerHTML=rows.length?rows.map(e=>{
      const seq=Math.max(1,all.findIndex(x=>x.id===e.id)+1),status=sessionStatusMap[e.id]||e.status||'Completed';
      return `<tr><td><strong>${esc(dateWithWeekdayV55(e.date,true))}</strong></td><td class="history-trainer-session-v37"><strong>${esc(e.trainer)}</strong><span>Session ${seq}/${meta.total}</span></td><td>${statusPill(status)}</td><td><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></td></tr>`;
    }).join(''):'<tr><td colspan="4" class="muted" style="text-align:center;padding:18px">No completed sessions yet.</td></tr>';
  };

  /* Session Details — weekday and clickable client name for owner/trainer. */
  const previousRefreshV55=window.refreshTrainerSessionPage;
  if(typeof previousRefreshV55==='function'){
    window.refreshTrainerSessionPage=function(){
      const out=previousRefreshV55();
      const e=typeof getTrainerSessionEvent==='function'?getTrainerSessionEvent(activeSessionId):null;if(!e)return out;
      const dateTime=document.getElementById('trainerSessionDateTime');
      const range=typeof sessionTimeRangeV25==='function'?sessionTimeRangeV25(e):(e.time||'');
      if(dateTime)dateTime.textContent=`${dateWithWeekdayV55(e.date,true)} • ${range}`;
      const meta=document.getElementById('trainerSessionMeta');
      if(meta)meta.textContent=`${e.client} • ${dateWithWeekdayV55(e.date,true)} • ${range} • Session ${e.id}`;
      const client=document.getElementById('trainerSessionClient');
      if(client){
        client.textContent='';
        const btn=document.createElement('button');btn.type='button';btn.className='session-client-link-v55';btn.textContent=e.client;
        btn.setAttribute('aria-label',`Open ${e.client} client profile`);
        btn.addEventListener('click',()=>{if(typeof openSharedClientProfile==='function')openSharedClientProfile(e.client)});
        client.appendChild(btn);
      }
      return out;
    };
  }

  document.addEventListener('DOMContentLoaded',()=>{
    /* Reflect approval-required semantics immediately for a freshly opened Add Trainer form. */
    ['newTrainerAutonomyAvailabilityV52','newTrainerAutonomySessionTimeV52','newTrainerAutonomyTrainerChangeV52','newTrainerAutonomyFixedScheduleV52'].forEach(id=>{
      const el=document.getElementById(id);if(el&&!el.dataset.v55Initialized){el.checked=true;el.dataset.v55Initialized='1'}
    });
    /* Refresh initially seeded demo lists with weekday-enriched renderers too. */
    try{if(typeof renderOwnerAllSessions==='function')renderOwnerAllSessions()}catch(e){}
    try{if(typeof renderTrainerAllSessions==='function')renderTrainerAllSessions()}catch(e){}
    try{const name=document.getElementById('ownerClientName')?.textContent.trim();if(name){renderClientHistoryV35(name);renderClientUpcomingSessionsV27()}}catch(e){}
  });
})();
