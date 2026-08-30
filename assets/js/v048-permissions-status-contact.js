/* v0.48 — trainer availability permissions, client preference visibility, upcoming status pills */
(function(){
  const $=id=>document.getElementById(id);
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');

  /* Existing demo clients did not all carry the preference flag. Seed coherent prototype values
     so the profile demonstrates the field instead of silently falling back to undefined. */
  const femalePreferredDemoV48=new Set([
    'Mei & Aaron','Farah Noor','Cheryl Tan','Siti & Hakim','Nicole Ng','Hannah Lim','Jason & Claire'
  ]);
  if(typeof clientExtendedData!=='undefined'){
    Object.keys(clientExtendedData).forEach(name=>{
      if(typeof clientExtendedData[name].femaleTrainerPreferred!=='boolean'){
        clientExtendedData[name].femaleTrainerPreferred=femalePreferredDemoV48.has(name);
      }
    });
  }

  function renderTrainerPreferenceV48(name){
    const node=$('clientTrainerPreferenceDisplay');
    if(!node)return;
    const d=typeof extendedClientData==='function'?extendedClientData(name):(clientExtendedData?.[name]||{});
    const female=!!d?.femaleTrainerPreferred;
    node.innerHTML=female
      ? '<span class="pill pink">Female trainer preferred</span>'
      : '<span class="pill blue">No gender preference</span>';
  }

  const previousDisplayClientV48=window.displayClientExtendedDataV25;
  if(typeof previousDisplayClientV48==='function'){
    window.displayClientExtendedDataV25=function(name){
      const out=previousDisplayClientV48(name);
      renderTrainerPreferenceV48(name);
      return out;
    };
  }

  const previousOpenSharedV48=window.openSharedClientProfile;
  if(typeof previousOpenSharedV48==='function'){
    window.openSharedClientProfile=function(name){
      const out=previousOpenSharedV48(name);
      renderTrainerPreferenceV48(name);
      return out;
    };
    window.openOwnerClient=function(name){return window.openSharedClientProfile(name)};
    window.openTrainerClient=function(name){return window.openSharedClientProfile(name)};
  }

  /* Upcoming Sessions uses exactly the same status pill utility as Session Details. */
  window.renderClientUpcomingSessionsV27=function(){
    const host=$('clientUpcomingSessionsRows');if(!host)return;
    const name=typeof activeClientNameV35==='function'?activeClientNameV35():($('ownerClientName')?.textContent.trim()||'');
    const rows=typeof upcomingRowsV35==='function'?upcomingRowsV35(name):[];
    const client=typeof activeClientV35==='function'?activeClientV35():clients.find(c=>c.name===name);
    const meta=typeof packageMetaForClientV35==='function'?packageMetaForClientV35(client):{total:12};
    const completed=typeof completedRowsV35==='function'?completedRowsV35(name).length:0;
    host.innerHTML=rows.length?rows.map((e,i)=>{
      const status=sessionStatusMap[e.id]||e.status||'Planned';
      const time=typeof sessionTimeRangeV25==='function'?sessionTimeRangeV25(e):(e.time||'');
      return `<div class="client-upcoming-row"><div class="client-upcoming-main"><strong>${formatDateShort(e.date)} • ${time}</strong><div class="client-upcoming-meta-v48"><span>${esc(e.trainer)} • Session ${completed+i+1}/${meta.total}</span>${statusPill(status)}</div></div><button class="btn btn-sm" onclick="openClientPackageSession('${e.id}')">View</button></div>`;
    }).join(''):'<div class="muted" style="padding:10px 2px">No upcoming sessions.</div>';
  };

  /* Owner can approve/reject trainer availability requests, but cannot directly rewrite availability. */
  window.openOwnerAvailabilityEditor=function(){
    if(typeof toast==='function')toast('Trainer availability can only be changed through an approved trainer request.');
  };
  window.saveOwnerAvailability=function(){
    if(typeof toast==='function')toast('Direct owner editing of trainer availability is disabled.');
  };

  document.addEventListener('DOMContentLoaded',()=>{
    const active=$('ownerClientName')?.textContent.trim();
    if(active)renderTrainerPreferenceV48(active);
  });
})();
