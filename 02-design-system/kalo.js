/* Kalo design system runtime: turns tokens.js into CSS custom properties,
   handles the light/dark theme, and renders every component as HTML.
   Exposed as window.Kalo = { tokens, components, icons, theme, ... }. */
(function(){
  'use strict';
  var T = tokens;
  var root = document.documentElement;

  /* ---------- 1. Tokens to CSS custom properties ---------- */
  function shadowCss(s){
    var r=parseInt(s.color.slice(1,3),16), g=parseInt(s.color.slice(3,5),16), b=parseInt(s.color.slice(5,7),16);
    return '0 '+s.offsetY+'px '+s.blur+'px rgba('+r+','+g+','+b+','+s.opacity+')';
  }
  function hexToRgba(hex,a){
    var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return 'rgba('+r+','+g+','+b+','+a+')';
  }
  function applyTheme(theme){
    var c=T.color[theme], s=root.style, k;
    for(k in c) s.setProperty('--c-'+k, c[k]);
    s.setProperty('--c-pressOverlay', hexToRgba(c.ink, T.opacity.pressedOverlay));
    for(k in T.shadow[theme]) s.setProperty('--sh-'+k, shadowCss(T.shadow[theme][k]));
    s.setProperty('color-scheme', theme);
  }
  (function staticVars(){
    var s=root.style, k;
    for(k in T.spacing) s.setProperty('--sp-'+k, T.spacing[k]+'px');
    for(k in T.radius) s.setProperty('--r-'+k, T.radius[k]+'px');
    for(k in T.typography.size) s.setProperty('--fs-'+k, T.typography.size[k]+'px');
    for(k in T.typography.lineHeight) s.setProperty('--lh-'+k, T.typography.lineHeight[k]+'px');
    for(k in T.typography.letterSpacing) s.setProperty('--ls-'+k, T.typography.letterSpacing[k]+'px');
    for(k in T.typography.weight) s.setProperty('--fw-'+k, T.typography.weight[k]);
    s.setProperty('--ff-display', '"'+T.typography.family.display+'"');
    s.setProperty('--ff-body', '"'+T.typography.family.body+'"');
    s.setProperty('--ff-fallback', T.typography.family.fallback);
    for(k in T.motion.duration) s.setProperty('--dur-'+k, T.motion.duration[k]+'ms');
    for(k in T.motion.easing) s.setProperty('--ease-'+k, T.motion.easing[k]);
    s.setProperty('--press-scale', T.motion.pressScale);
    for(k in T.size){ if(typeof T.size[k]==='number') s.setProperty('--sz-'+k, T.size[k]+'px'); }
    s.setProperty('--sz-handleW', T.size.sheetHandle.width+'px');
    s.setProperty('--sz-handleH', T.size.sheetHandle.height+'px');
    s.setProperty('--op-disabled', T.opacity.disabled);
  })();

  /* ---------- 2. Theme: follows the OS, overridable by a toggle ---------- */
  var mq=window.matchMedia('(prefers-color-scheme: dark)'), override=null, listeners=[];
  try{ override=localStorage.getItem('kalo-theme'); }catch(e){}
  function current(){ return override || (mq.matches?'dark':'light'); }
  function refresh(){ applyTheme(current()); listeners.forEach(function(fn){ fn(current()); }); }
  function initTheme(btn){
    function label(){ btn.textContent = current()==='dark' ? 'Light mode' : 'Dark mode'; }
    btn.addEventListener('click', function(){
      override = current()==='dark' ? 'light' : 'dark';
      try{ localStorage.setItem('kalo-theme', override); }catch(e){}
      refresh();
    });
    listeners.push(label); label();
  }
  if(mq.addEventListener) mq.addEventListener('change', refresh);
  refresh();

  /* ---------- 3. Helpers ---------- */
  var STATES=['default','pressed','disabled','error','loading'];
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function cls(){ return Array.prototype.filter.call(arguments,Boolean).join(' '); }
  function stateCls(state){ return state==='default' ? '' : 'is-'+state; }
  var spinner='<svg class="k-spin" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42"/></svg>';
  var I={
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>',
    camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    barcode:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6v12M8 6v12M11 6v12M15 6v12M20 6v12"/></svg>',
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>',
    recipes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M8 4v13h11"/></svg>',
    history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>'
  };

  /* ---------- 4. Components ---------- */
  var C = {};

  C.Button = function(p){
    var s=p.state||'default', label=p.label||'Save to diary';
    if(s==='error') label = p.errorLabel || 'Not saved. Retry';
    var icon = s==='error' ? I.alert : (p.icon ? I[p.icon] : '');
    return '<button type="button" class="'+cls('k-btn','k-btn--'+(p.variant||'primary'),'pressable',stateCls(s))+'"'+
      (s==='disabled'?' disabled':'')+(s==='loading'?' aria-busy="true"':'')+'>'+
      (icon?'<span class="k-btn__icon">'+icon+'</span>':'')+'<span class="k-btn__label">'+esc(label)+'</span>'+(s==='loading'?spinner+'<span class="sr-only">, loading</span>':'')+'</button>';
  };

  C.Input = function(p){
    var s=p.state||'default';
    var help = s==='error' ? (p.error||'Enter a number between 1 and 5,000') : (p.help||'');
    var value = p.value||'';
    if(s==='loading') value = p.loadingValue || value;
    return '<div class="'+cls('k-field',stateCls(s))+'">'+
      '<label class="k-field__label">'+esc(p.label||'Portion')+'</label>'+
      '<div class="'+cls('k-input',s==='pressed'||s==='error'?stateCls(s):'')+'">'+
        (p.icon?'<span class="k-input__icon">'+I[p.icon]+'</span>':'')+
        '<input type="text" placeholder="'+esc(p.placeholder||'320')+'" value="'+esc(value)+'"'+(s==='disabled'?' disabled':'')+(s==='error'?' aria-invalid="true"':'')+'>'+
        (s==='loading'?'<span class="k-input__icon">'+spinner.replace('k-spin','k-spin k-spin--sm')+'</span>':(p.unit?'<span class="k-input__unit">'+esc(p.unit)+'</span>':''))+
      '</div>'+
      (help?'<div class="k-field__help">'+esc(help)+'</div>':'')+
    '</div>';
  };

  C.Card = function(p){
    var s=p.state||'default';
    var body;
    if(s==='loading'){
      body='<span class="sr-only">Loading entry</span><div class="k-skel" style="width:55%;height:16px"></div><div class="k-skel" style="width:85%;margin-top:10px"></div><div class="k-skel" style="width:40%;margin-top:8px"></div>';
    } else {
      body=(p.title===''?'':'<div class="k-card__row"><div class="k-card__title">'+esc(p.title||'Chicken burrito bowl')+'</div>'+(p.aside||'')+'</div>')+
           (p.text===''?'':'<div class="k-card__text">'+esc(p.text||'Lunch · 12:40 · 540 kcal')+'</div>')+
           (p.children||'')+
           (s==='error'?'<div class="k-msg">'+I.alert+esc(p.error||'Could not load this entry.')+'<button type="button" class="k-link">Retry</button></div>':'');
    }
    var tag = p.static ? 'div' : 'button';
    return '<'+tag+(p.static?'':' type="button"')+' class="'+cls('k-card',!p.static&&'pressable',stateCls(s))+'"'+(s==='disabled'?' disabled':'')+(s==='loading'?' aria-busy="true"':'')+'>'+body+'</'+tag+'>';
  };

  C.Chip = function(p){
    var s=p.state||'default';
    var tail='';
    if(p.removable){
      tail = s==='loading' ? spinner.replace('k-spin','k-spin k-spin--sm')
           : '<button type="button" class="k-chip__x" aria-label="Remove '+esc(p.label)+'">'+I.x+'</button>';
    }
    var label = p.label;
    var dis = s==='disabled'?' disabled':'';
    if(p.removable){
      tail = s==='loading' ? spinner.replace('k-spin','k-spin k-spin--sm')+'<span class="sr-only">Removing</span>'
           : '<button type="button" class="k-chip__x" aria-label="Remove '+esc(p.label)+'"'+dis+'>'+I.x+'</button>';
    }
    return '<span class="'+cls('k-chip','pressable',p.selected&&'k-chip--selected',p.removable&&'k-chip--removable',stateCls(s))+'">'+
      '<button type="button" class="k-chip__label"'+dis+(p.selected?' aria-pressed="true"':'')+'>'+
      (s==='error'?'<span class="k-chip__icon" aria-hidden="true">'+I.alert+'</span>':'')+esc(label)+'</button>'+tail+'</span>';
  };

  C.ProgressRing = function(p){
    var s=p.state||'default';
    var sizeKey=p.size||'md', px=T.size['ring'+sizeKey.charAt(0).toUpperCase()+sizeKey.slice(1)];
    var strokePx = sizeKey==='xs' ? T.size.ringStrokeXs : T.size.ringStroke;
    var stroke=strokePx*100/px;        /* keep the physical stroke equal to the token at any size */
    var r=50-stroke/2, c=2*Math.PI*r;
    var value = s==='disabled' ? 0 : (p.value==null?72:p.value);
    var offset = c*(1-Math.min(Math.max(value,0),1e9)/100);
    var center;
    if(s==='loading') center='<span class="k-ring__label">Syncing</span>';
    else if(s==='error') center='<span class="k-ring__value">!</span><span class="k-ring__label">'+esc(p.errorLabel||'Not synced')+'</span>';
    else if(s==='disabled') center='<span class="k-ring__value num">–</span><span class="k-ring__label">'+esc(p.label||'kcal left')+'</span>';
    else center='<span class="k-ring__value num">'+esc(p.text!=null?p.text:'640')+'</span>'+(p.label===''?'':'<span class="k-ring__label">'+esc(p.label||'kcal left')+'</span>');
    return '<span class="'+cls('k-ring','k-ring--'+sizeKey,p.color&&'k-ring--'+p.color,s==='loading'&&'k-ring--loading',stateCls(s))+'" style="width:'+px+'px;height:'+px+'px;--k-c:'+c.toFixed(2)+'" role="img" aria-label="'+value+' percent">'+
      '<svg viewBox="0 0 100 100"><circle class="k-ring__track" cx="50" cy="50" r="'+r.toFixed(2)+'" stroke-width="'+stroke.toFixed(2)+'"/>'+
      '<circle class="k-ring__fill" cx="50" cy="50" r="'+r.toFixed(2)+'" stroke-width="'+stroke.toFixed(2)+'" stroke-dasharray="'+(s==='error'?(stroke*0.6).toFixed(2)+' '+(stroke*0.6).toFixed(2):c.toFixed(2))+'" stroke-dashoffset="'+(s==='loading'?c:offset).toFixed(2)+'"/></svg>'+
      '<span class="k-ring__center">'+center+'</span></span>';
  };

  C.StatCard = function(p){
    var s=p.state||'default';
    var body;
    if(s==='loading'){
      body='<span class="sr-only">Loading '+esc(p.name)+'</span><div class="k-skel" style="width:40%;height:10px"></div><div class="k-skel" style="width:60%;height:18px;margin:6px 0 10px"></div><div class="k-bar"></div>';
    } else {
      var pct = s==='disabled' ? 0 : Math.round((p.value/p.target)*100);
      body='<div class="k-stat__name">'+esc(p.name)+'</div>'+
        '<div class="k-stat__value">'+(s==='error'?'—':(s==='disabled'?'–':p.value))+' <small>/ '+p.target+' '+esc(p.unit||'g')+'</small></div>'+
        '<div class="k-bar"><i style="width:'+Math.min(pct,100)+'%"></i></div>'+
        (s==='error'?'<div class="k-field__help" style="color:var(--c-coralText);margin-top:6px">'+esc(p.error||'No data yet')+'</div>':'');
    }
    return '<button type="button" class="'+cls('k-stat','pressable',p.color&&'k-stat--'+p.color,stateCls(s))+'"'+(s==='disabled'?' disabled':'')+(s==='loading'?' aria-busy="true"':'')+'>'+body+'</button>';
  };

  var sheetSeq=0;
  C.BottomSheet = function(p){
    var s=p.state||'default', sid='k-sheet-title-'+(++sheetSeq);
    var opts=[['camera','Photo'],['mic','Voice'],['barcode','Barcode'],['search','Search']];
    var content;
    if(s==='loading'){
      content='<div class="k-sheet__status">'+spinner+'<div><b>Analyzing photo</b><small>Usually under two seconds</small></div></div>';
    } else if(s==='error'){
      content='<div class="k-sheet__status">'+I.alert+'<div><b>Could not recognize the photo</b><small>Try better light, or search for the dish instead.</small></div></div>'+
              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-s2);margin-top:var(--sp-s3)">'+C.Button({variant:'secondary',label:'Retake'})+C.Button({variant:'primary',label:'Search'})+'</div>';
    } else if(p.children){
      content=p.children;
    } else {
      content='<div class="k-sheet__grid">'+opts.map(function(o,i){
        var st = s==='pressed'&&i===0 ? 'is-pressed' : '';
        return '<button type="button" class="'+cls('k-opt','pressable',st)+'"'+(s==='disabled'?' disabled':'')+'>'+I[o[0]]+esc(o[1])+'</button>';
      }).join('')+'</div>';
    }
    var sheet='<div class="'+cls('k-sheet',s!=='pressed'?stateCls(s):'')+'" role="dialog" aria-modal="true" aria-labelledby="'+sid+'"><div class="k-sheet__handle" aria-hidden="true"></div><div class="k-sheet__title" id="'+sid+'">'+esc(p.title||'Log a meal')+'</div>'+content+'</div>';
    if(p.bare) return sheet;
    return '<div class="k-sheet-frame" aria-label="Bottom sheet">'+
      '<div class="k-sheet-frame__bg"><div class="t-headline">Good morning, Lena</div><div class="t-caption" style="color:var(--c-muted)">640 kcal left today</div></div>'+
      '<div class="k-sheet-frame__scrim"></div>'+sheet+'</div>';
  };

  C.Badge = function(p){
    var s=p.state||'default', lvl=p.level||'high';
    var text = {high:'High · 92%', medium:'Check portion · 71%', low:'Low · 44%'}[lvl];
    if(p.text) text=p.text;
    if(s==='error') text = p.errorText || 'Could not recognize';
    if(s==='loading') return '<span class="'+cls('k-badge','is-loading')+'">'+spinner+'Analyzing</span>';
    /* A badge is a status label. It becomes a button only when it opens an explanation (interactive:true),
       and never inside another control. */
    if(!p.interactive) return '<span class="'+cls('k-badge','k-badge--'+lvl,stateCls(s))+'">'+esc(text)+'</span>';
    return '<button type="button" class="'+cls('k-badge','k-badge--'+lvl,'pressable',stateCls(s))+'"'+(s==='disabled'?' disabled':'')+' aria-label="AI confidence '+esc(text)+'">'+esc(text)+'</button>';
  };

  C.TabBar = function(p){
    var s=p.state||'default', active=p.active||'Home';
    var tabs=[['home','Home'],['recipes','Recipes'],['plus','Log'],['history','History'],['settings','Settings']];
    var inner = tabs.map(function(t,i){
      if(s==='loading') return '<div class="k-tab"><div class="k-skel" style="width:22px;height:22px;border-radius:var(--r-pill)"></div><div class="k-skel" style="width:32px;height:8px"></div></div>';
      var isFab=t[0]==='plus';
      var c=cls('k-tab','pressable',isFab&&'k-tab--fab',t[1]===active&&!isFab&&'k-tab--active',s==='pressed'&&t[1]==='Recipes'&&'is-pressed',s==='error'&&t[1]==='History'&&'k-tab--error');
      var icon = isFab ? '<span class="k-fab" aria-hidden="true">'+I.plus+'</span>' : I[t[0]];
      return '<button type="button" class="'+c+'"'+(s==='disabled'?' disabled':'')+(t[1]===active?' aria-current="page"':'')+(isFab?' aria-label="Log a meal"':'')+'>'+icon+(isFab?'':'<span>'+esc(t[1])+'</span>')+(s==='error'&&t[1]==='History'?'<span class="k-tab__dot" aria-label="Sync failed"></span>':'')+'</button>';
    }).join('');
    var nav='<nav class="'+cls('k-tabbar',stateCls(s))+'" aria-label="'+esc(p.label||'Main')+'">'+inner+'</nav>';
    if(p.bare) return nav;
    return '<div class="k-tabbar__frame"><div class="fake">'+(s==='error'?'<span style="color:var(--c-coralText)">Sync failed. Showing cached data.</span>':(s==='disabled'?'Offline':'Screen content'))+'</div>'+
      nav+'</div>';
  };
  /* ---------- 5. Public API ---------- */
  window.Kalo={ tokens:T, components:C, icons:I, esc:esc, cls:cls, spinner:spinner, STATES:STATES,
    applyTheme:applyTheme, theme:{ current:current, onChange:function(fn){ listeners.push(fn); }, init:initTheme } };
})();
