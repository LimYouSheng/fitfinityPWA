/* v0.54 — trainer late/no-show acknowledgement and package email simulation */
(function(){
  window.sessionAcknowledgementMetaV54 = window.sessionAcknowledgementMetaV54 || {};
  window.sessionCreditEmailLogV54 = window.sessionCreditEmailLogV54 || [];

  function activeLateNoShowV54(){
    return !!document.getElementById('trainerLateNoShowAckV54')?.checked;
  }

  function packageSnapshotV54(clientName){
    try{
      const client = (typeof clients !== 'undefined') ? clients.find(c => c.name === clientName) : null;
      if(client && typeof packageMetaForClientV35 === 'function' && typeof packageRowsV35 === 'function'){
        const meta = packageMetaForClientV35(client);
        const rows = packageRowsV35(clientName);
        const completed = rows.filter(e => (sessionStatusMap[e.id] || e.status) === 'Completed').length;
        return {
          label: meta.label || 'PT package',
          total: Number(meta.total || rows.length || 0),
          completed,
          remaining: Math.max(0, Number(meta.total || rows.length || 0) - completed)
        };
      }
    }catch(_e){}
    if(clientName === 'Amanda Lim'){
      return {label:'PT package', total:Number(packageUsed||0)+Number(packageBalance||0), completed:Number(packageUsed||0), remaining:Number(packageBalance||0)};
    }
    return {label:'PT package', total:0, completed:0, remaining:0};
  }

  function queueCreditEmailV54(event, lateNoShow){
    const profile = (typeof extendedClientData === 'function') ? extendedClientData(event.client) : (window.clientExtendedData?.[event.client] || {});
    const snapshot = packageSnapshotV54(event.client);
    const emailRecord = {
      sessionId:event.id,
      client:event.client,
      email:profile?.email || '',
      reason:lateNoShow ? 'Trainer acknowledged: client more than 15 minutes late or no show' : 'Session completed and acknowledged',
      creditUsed:1,
      package:snapshot.label,
      completed:snapshot.completed,
      remaining:snapshot.remaining,
      total:snapshot.total,
      queuedAt:new Date().toISOString()
    };
    window.sessionCreditEmailLogV54.push(emailRecord);
    return emailRecord;
  }

  const previousOpenSignatureModalV54 = window.openSignatureModal;
  window.openSignatureModal = function(){
    previousOpenSignatureModalV54?.();
    const checkbox = document.getElementById('trainerLateNoShowAckV54');
    const note = document.getElementById('trainerLateNoShowNoteV54');
    if(checkbox){
      checkbox.checked=false;
      checkbox.onchange=function(){
        note?.classList.toggle('hidden', !checkbox.checked);
        const normalConfirm=document.getElementById('ackConfirm');
        if(normalConfirm && checkbox.checked) normalConfirm.checked=false;
      };
    }
    note?.classList.add('hidden');
  };

  window.confirmClientSignature = function(){
    const lateNoShow = activeLateNoShowV54();
    const normalConfirm = !!document.getElementById('ackConfirm')?.checked;

    if(!lateNoShow && !normalConfirm){
      toast('Client confirmation checkbox is required, or acknowledge the client as more than 15 minutes late / no show.');
      return;
    }
    if(!lateNoShow && !signatureHasInk){
      toast('Please capture the client signature first.');
      return;
    }

    const e=getTrainerSessionEvent(activeSessionId);
    if(!e)return toast('Session details not found.');
    if(sessionStatusMap[activeSessionId]==='Completed'){
      closeModal('signatureModal');
      return toast('This session is already completed.');
    }

    if(e.client==='Amanda Lim' && packageBalance>0){
      packageBalance--;
      packageUsed++;
      updatePackageUI();
    }

    markSessionCompleted(activeSessionId);

    // Re-render coherent client package/session views after the status change so the email snapshot is post-credit-use.
    try{
      if(typeof renderClientPackageSessions === 'function') renderClientPackageSessions();
      if(typeof renderClientPackageSummaryV35 === 'function') renderClientPackageSummaryV35(e.client);
      if(typeof renderClientUpcomingSessionsV27 === 'function' && document.getElementById('ownerClientName')?.textContent.trim()===e.client) renderClientUpcomingSessionsV27();
      if(typeof renderClientHistoryV35 === 'function' && document.getElementById('ownerClientName')?.textContent.trim()===e.client) renderClientHistoryV35(e.client);
    }catch(_e){}

    const email = queueCreditEmailV54(e, lateNoShow);
    window.sessionAcknowledgementMetaV54[e.id] = {
      type:lateNoShow ? 'trainer_late_no_show' : 'client_signature',
      acknowledgedBy:lateNoShow ? 'Trainer' : 'Client',
      creditUsed:true,
      emailQueued:true
    };

    const trainer=document.getElementById('trainerAckLog');
    if(trainer){
      const row=document.createElement('tr');
      const ackLabel=lateNoShow?'Trainer • Late / No show':'Signed';
      const balanceLabel=email.remaining || email.total ? `${email.remaining} remaining` : (e.client==='Amanda Lim'?packageBalance:'Updated');
      row.innerHTML=`<td>${formatDateShort(e.date).replace(' 2026','')}</td><td>${e.trainer}</td><td>60 min</td><td>Strength</td><td><span class="pill ${lateNoShow?'orange':'green'}">${ackLabel}</span></td><td>${balanceLabel}</td>`;
      trainer.prepend(row);
    }

    closeModal('signatureModal');
    refreshTrainerSessionPage();
    toast(lateNoShow
      ? 'Session credit used for client late / no show. Package update email queued to client.'
      : 'Session completed after client acknowledgement. Package update email queued to client.');
  };
})();
