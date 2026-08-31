/* v0.53 — client package start date + elapsed validity progress */
(function(){
  const DAY_MS = 24 * 60 * 60 * 1000;

  function packageValidityDaysV53(meta){
    const label = String(meta?.label || '').toLowerCase();
    return label.includes('24') ? 180 : 90;
  }

  function localMidnightV53(value){
    if(!value) return null;
    const parts = String(value).split('-').map(Number);
    if(parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return null;
    return new Date(parts[0], parts[1]-1, parts[2]);
  }

  function elapsedPackageDaysV53(startDate, validityDays){
    const start = localMidnightV53(startDate);
    if(!start) return 0;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const elapsed = Math.floor((today - start) / DAY_MS);
    return Math.max(0, Math.min(validityDays, elapsed));
  }

  const previousRenderClientPackageSummaryV53 = window.renderClientPackageSummaryV35;
  window.renderClientPackageSummaryV35 = function(name){
    previousRenderClientPackageSummaryV53?.(name);

    const client = (typeof clients !== 'undefined') ? clients.find(c => c.name === name) : null;
    if(!client) return;

    const profile = typeof extendedClientData === 'function' ? extendedClientData(name) : (window.clientExtendedData?.[name] || {});
    const meta = typeof packageMetaForClientV35 === 'function' ? packageMetaForClientV35(client) : {label: clientPackageName?.(client) || ''};
    const startDate = profile?.startDate || client.startDate || '';
    const validityDays = packageValidityDaysV53(meta);
    const elapsedDays = elapsedPackageDaysV53(startDate, validityDays);

    const startHost = document.getElementById('ownerPackageStartDateDetail');
    if(startHost){
      startHost.textContent = startDate && typeof isoToDisplayDate === 'function' ? isoToDisplayDate(startDate) : (startDate || '—');
    }

    const progressHost = document.getElementById('ownerPackageDayProgressDetail');
    if(progressHost){
      progressHost.textContent = `${elapsedDays} / ${validityDays} days`;
    }
  };

  // Refresh the currently open client package immediately if the page is already initialised.
  try{
    const currentName = document.getElementById('ownerClientName')?.textContent?.trim();
    if(currentName) window.renderClientPackageSummaryV35(currentName);
  }catch(_e){}
})();
