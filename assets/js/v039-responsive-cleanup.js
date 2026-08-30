/* v0.39 — canonical Past Packages columns and Session History metadata */
(function(){
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');

  function normalizePastPackageHeaderV39(){
    const table=document.querySelector('#owner-package table');
    if(!table)return;
    table.classList.add('past-package-table-v37');
    table.closest('.table-wrap')?.classList.add('past-package-wrap-v37');
    const row=table.querySelector('thead tr');
    if(row)row.innerHTML='<th>Package</th><th>Purchase Date</th><th>Completed Date</th>';
  }

  /* Replace the previous five-column renderer with the requested three-column record. */
  const previousPackageSummaryV39=window.renderClientPackageSummaryV35;
  window.renderClientPackageSummaryV35=function(name){
    previousPackageSummaryV39?.(name);
    normalizePastPackageHeaderV39();
    const c=clients.find(x=>x.name===name);if(!c)return;
    const meta=packageMetaForClientV35(c),profile=extendedClientData(name),completed=completedRowsV35(name).length;
    const body=document.querySelector('#owner-package table tbody');if(!body)return;
    if(completed<8){
      body.innerHTML='<tr><td colspan="3" class="muted" style="text-align:center;padding:18px">No previous package on record.</td></tr>';
      return;
    }
    const purchase=isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-42));
    const finished=isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-2));
    body.innerHTML=`<tr class="past-package-row-v37"><td><strong>${esc(meta.label)}</strong></td><td>${purchase}</td><td>${finished}</td></tr>`;
  };

  /* Keep history consistent with Upcoming Sessions: date, trainer, session X/total, status. */
  window.renderClientHistoryV35=function(name){
    const table=document.querySelector('#owner-history .session-history-table'),tbody=table?.querySelector('tbody');if(!table||!tbody)return;
    const all=packageRowsV35(name),rows=completedRowsV35(name).slice().reverse(),meta=packageMetaForClientV35(clients.find(x=>x.name===name));
    const head=table.querySelector('thead tr');
    if(head)head.innerHTML='<th>Date</th><th>Trainer / Session</th><th>Status</th><th></th>';
    tbody.innerHTML=rows.length?rows.map(e=>{
      const seq=Math.max(1,all.findIndex(x=>x.id===e.id)+1);
      const status=sessionStatusMap[e.id]||e.status||'Completed';
      const cls=status==='Completed'?'green':status==='Planned'?'blue':'amber';
      return `<tr><td><strong>${formatDateShort(e.date)}</strong></td><td class="history-trainer-session-v37"><strong>${esc(e.trainer)}</strong><span>Session ${seq}/${meta.total}</span></td><td><span class="pill ${cls}">${esc(status)}</span></td><td><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></td></tr>`;
    }).join(''):'<tr><td colspan="4" class="muted" style="text-align:center;padding:18px">No completed sessions yet.</td></tr>';
  };

  const previousRenderSelectedV39=window.renderSelectedClientV35;
  window.renderSelectedClientV35=function(name){
    const out=previousRenderSelectedV39?.(name);
    renderClientPackageSummaryV35(name);
    renderClientHistoryV35(name);
    return out;
  };

  document.addEventListener('DOMContentLoaded',()=>{
    normalizePastPackageHeaderV39();
    const name=document.getElementById('ownerClientName')?.textContent.trim();
    if(name){renderClientPackageSummaryV35(name);renderClientHistoryV35(name)}
  });
})();
