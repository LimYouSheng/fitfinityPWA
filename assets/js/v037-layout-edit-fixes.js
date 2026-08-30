/* v0.37 — client edit permissions + coherent history/past-package rendering */
(function(){
  const $=id=>document.getElementById(id);
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');

  function setVisibleV37(id,visible){
    const node=$(id);if(!node)return;
    node.classList.toggle('hidden',!visible);
    if(visible)node.style.removeProperty('display');
    else node.style.setProperty('display','none','important');
  }
  function setCancelV37(id,visible){
    const node=$(id);if(!node)return;
    node.classList.toggle('hidden',!visible);
    node.style.setProperty('display',visible?'inline-flex':'none','important');
  }
  function activeClientNameV37(){return $('ownerClientName')?.textContent.trim()||''}
  function isCoupleV37(name){return clients?.find?.(c=>c.name===name)?.type==='Couple'||!!clientExtendedData?.[name]?.people?.[1]}
  function peopleV37(name){return typeof peopleForClientV36==='function'?peopleForClientV36(name):(extendedClientData(name)?.people||[])}

  /* Owner can edit all three sections. Trainer can edit only Health / Limitations + Remarks. */
  function enforceClientEditPermissionsV37(){
    const trainer=currentRole==='trainer';
    setVisibleV37('sharedClientEditBtn',!trainer);
    setCancelV37('sharedClientCancelBtn',!trainer&&!!clientMainEditing);
    setVisibleV37('clientHealthEditBtn',true);
    setCancelV37('clientHealthCancelBtn',!!clientHealthEditing);
    setVisibleV37('clientRemarksEditBtn',true);
    setCancelV37('clientRemarksCancelBtn',typeof clientRemarksEditing!=='undefined'&&!!clientRemarksEditing);
    const assignmentTab=$('sharedTrainerAssignmentTab');if(assignmentTab)assignmentTab.classList.toggle('hidden',trainer);
    const assignmentPanel=$('owner-access');if(assignmentPanel&&trainer)assignmentPanel.classList.add('hidden');
  }
  window.enforceClientEditVisibilityV30Final=enforceClientEditPermissionsV37;

  const previousConfigureV37=window.configureSharedClientProfile;
  window.configureSharedClientProfile=function(){const out=previousConfigureV37?.();enforceClientEditPermissionsV37();return out};
  const previousOpenSharedV37=window.openSharedClientProfile;
  window.openSharedClientProfile=function(name){const out=previousOpenSharedV37?.(name);setTimeout(enforceClientEditPermissionsV37,0);return out};
  window.openOwnerClient=function(name){return openSharedClientProfile(name)};
  window.openTrainerClient=function(name){return openSharedClientProfile(name)};

  function renderCoupleHealthV37(name,editing){
    const host=$('coupleHealthNotes'),people=peopleV37(name).slice(0,2);if(!host)return;
    host.innerHTML=people.map((p,i)=>editing
      ?`<div class="couple-health-card-v36"><strong>Client ${i+1} • ${esc(p.name)}</strong><textarea id="coupleHealthEdit${i+1}V36">${esc(p.health||'')}</textarea></div>`
      :`<div class="couple-health-card-v36"><strong>Client ${i+1} • ${esc(p.name)}</strong><p>${esc(p.health||'No health / limitation notes recorded.')}</p></div>`
    ).join('');
  }

  window.toggleClientHealthEdit=function(){
    const name=activeClientNameV37(),btn=$('clientHealthEditBtn');if(!name||!btn)return;
    if(!clientHealthEditing){
      if(typeof canBeginEditV25==='function'&&!canBeginEditV25('client-health'))return;
      clientHealthEditing=true;setHeaderActionState?.(btn,true);setCancelV37('clientHealthCancelBtn',true);
      if(isCoupleV37(name)){renderCoupleHealthV37(name,true)}
      else{
        const notice=$('clientHealthNotice'),input=$('clientHealthInline');if(!notice||!input)return;
        input.value=notice.textContent.trim();notice.classList.add('hidden');input.classList.remove('hidden');input.focus();
      }
      return;
    }
    if(!confirm('Save changes to Health / Limitation Notes?'))return;
    const d=extendedClientData(name);
    if(isCoupleV37(name)){
      const people=peopleV37(name).slice(0,2),h1=$('coupleHealthEdit1V36')?.value.trim()||'',h2=$('coupleHealthEdit2V36')?.value.trim()||'';
      if(!h1||!h2)return toast('Enter health / limitation notes for both clients. Use “None” when there are no limitations.');
      people[0].health=h1;people[1].health=h2;d.people=people;d.health=`Client 1 — ${people[0].name}: ${h1}\nClient 2 — ${people[1].name}: ${h2}`;renderCoupleHealthV37(name,false);
    }else{
      const notice=$('clientHealthNotice'),input=$('clientHealthInline');const text=input?.value.trim()||'No health / limitation notes recorded.';
      if(notice)notice.textContent=text;if(input)input.classList.add('hidden');notice?.classList.remove('hidden');d.health=text;
    }
    clientHealthEditing=false;setHeaderActionState?.(btn,false);setCancelV37('clientHealthCancelBtn',false);toast('Health / limitation notes saved.');
  };
  window.cancelClientHealthEdit=function(){
    if(!clientHealthEditing)return;const name=activeClientNameV37();clientHealthEditing=false;setHeaderActionState?.($('clientHealthEditBtn'),false);setCancelV37('clientHealthCancelBtn',false);
    if(isCoupleV37(name))renderCoupleHealthV37(name,false);else{$('clientHealthInline')?.classList.add('hidden');$('clientHealthNotice')?.classList.remove('hidden')}
  };

  window.toggleClientRemarksEdit=function(){
    const name=activeClientNameV37(),btn=$('clientRemarksEditBtn'),display=$('clientRemarksDisplay'),input=$('clientRemarksInline');if(!name||!btn||!display||!input)return;
    if(!clientRemarksEditing){
      if(typeof canBeginEditV25==='function'&&!canBeginEditV25('client-remarks'))return;
      clientRemarksEditing=true;input.value=display.textContent.trim();display.classList.add('hidden');input.classList.remove('hidden');setHeaderActionState?.(btn,true);setCancelV37('clientRemarksCancelBtn',true);input.focus();return;
    }
    if(!confirm('Save these client remarks?'))return;
    const text=input.value.trim()||'No remarks recorded.';display.textContent=text;extendedClientData(name).remarks=text;clientRemarksEditing=false;input.classList.add('hidden');display.classList.remove('hidden');setHeaderActionState?.(btn,false);setCancelV37('clientRemarksCancelBtn',false);toast('Remarks saved.');
  };
  window.cancelClientRemarksEdit=function(){
    if(!clientRemarksEditing)return;clientRemarksEditing=false;$('clientRemarksInline')?.classList.add('hidden');$('clientRemarksDisplay')?.classList.remove('hidden');setHeaderActionState?.($('clientRemarksEditBtn'),false);setCancelV37('clientRemarksCancelBtn',false);
  };

  /* Session History mirrors Upcoming Sessions: trainer + package sequence/total. */
  window.renderClientHistoryV35=function(name){
    const tbody=document.querySelector('#owner-history tbody');if(!tbody)return;
    const all=packageRowsV35(name),rows=completedRowsV35(name).slice().reverse(),meta=packageMetaForClientV35(clients.find(x=>x.name===name));
    const head=document.querySelector('#owner-history thead th:nth-child(2)');if(head)head.textContent='Trainer / Session';
    tbody.innerHTML=rows.length?rows.map(e=>{
      const seq=Math.max(1,all.findIndex(x=>x.id===e.id)+1);
      return `<tr><td><strong>${formatDateShort(e.date)}</strong></td><td class="history-trainer-session-v37"><strong>${esc(e.trainer)}</strong><span>Session ${seq}/${meta.total}</span></td><td><span class="pill green">Completed</span></td><td><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></td></tr>`;
    }).join(''):'<tr><td colspan="4" class="muted" style="text-align:center;padding:18px">No completed sessions yet.</td></tr>';
  };

  /* Past Package record is rendered as one true horizontal row. */
  const previousPackageSummaryV37=window.renderClientPackageSummaryV35;
  window.renderClientPackageSummaryV35=function(name){
    previousPackageSummaryV37?.(name);
    const c=clients.find(x=>x.name===name);if(!c)return;
    const meta=packageMetaForClientV35(c),profile=extendedClientData(name),completed=completedRowsV35(name).length;
    const table=document.querySelector('#owner-package table');const wrap=table?.closest('.table-wrap');const body=table?.querySelector('tbody');if(!table||!body)return;
    table.classList.add('past-package-table-v37');wrap?.classList.add('past-package-wrap-v37');
    if(completed<8){body.innerHTML='<tr><td colspan="5" class="muted" style="text-align:center;padding:18px">No previous package on record.</td></tr>';return}
    const purchase=isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-42));
    const finished=isoToDisplayDate(isoShiftDaysV35(profile.startDate||'2026-06-01',-2));
    body.innerHTML=`<tr class="past-package-row-v37"><td><span class="past-package-inline-v37"><strong>${esc(meta.label)}</strong><small class="muted">• ${meta.frequency} ${meta.frequency===1?'day':'days'}/week</small></span></td><td>${purchase}</td><td>${meta.total}</td><td>${finished}</td><td><span class="pill green">Completed</span></td></tr>`;
  };

  /* Ensure v0.37 renderers run whenever a profile is selected. */
  const previousRenderSelectedV37=window.renderSelectedClientV35;
  window.renderSelectedClientV35=function(name){const out=previousRenderSelectedV37?.(name);renderClientPackageSummaryV35(name);renderClientHistoryV35(name);enforceClientEditPermissionsV37();return out};

  document.addEventListener('DOMContentLoaded',()=>{enforceClientEditPermissionsV37();const name=activeClientNameV37();if(name){renderClientPackageSummaryV35(name);renderClientHistoryV35(name)}});
})();
