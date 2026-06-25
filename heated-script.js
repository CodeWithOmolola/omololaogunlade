/* ── 
  
  HEATED INTERFACE SCRIPT

    ── */
    (function(){

  const moods={
    focus:{icon:'✣',lbl:'focus mode',
      bg:'url("https://images.pexels.com/photos/3778077/pexels-photo-3778077.jpeg") center/cover no-repeat',
      temp:57,light:70,scent:60,sw:2},
    relax:{icon:'𓆰',lbl:'relax mode',
      bg:'url("https://images.pexels.com/photos/35913477/pexels-photo-35913477.jpeg") center/cover no-repeat',
      temp:50,light:40,scent:30,sw:0},
    creative:{icon:'⚉',lbl:'creative mode',
      bg:'url("https://images.pexels.com/photos/11775862/pexels-photo-11775862.jpeg") center/cover no-repeat',
      temp:53,light:75,scent:45,sw:3},
    sleep:{icon:'☾',lbl:'sleep mode',
      bg:'url("https://images.pexels.com/photos/19935822/pexels-photo-19935822.jpeg") center/cover no-repeat',
      temp:35,light:10,scent:20,sw:1},
  };
  const TEMP_MIN=33,TEMP_MAX=66;
  const swLbls=['Candlelight','Warm White','Cool Daylight','Creative'];
  const dayNames=['M','T','W','T','F','S','S'];

  const routines=[
    {id:'focus',name:'Morning Focus',time:'7:00 AM · 90 min',icon:'𖤓',days:[1,1,1,1,1,0,0],on:true,
    pl:[
      {name:'Deep Work Vol.1',artist:'Lo-fi Beats',dur:'3:22',art:'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96'},
      {name:'Arena',artist:'Ember Nova',dur:'2:45',art:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwo1lEMV4x8eCSsBJ6w13UjURMF9ccXfD1-Q&s'},
      {name:'Clocks',artist:'Coldplay',dur:'5:07',art:'https://i.scdn.co/image/ab67616d0000b273de09e02aa7febf30b7c02d82'},
      {name:'Retrograde',artist:'James Blake',dur:'4:24',art:'https://i.scdn.co/image/ab67616d0000b273d134dbb0fad78dda23d777ff'},
    ]},
    {id:'relax',name:'Evening Relax',time:'7:00 PM · 2 hrs',icon:'✩',days:[1,1,1,1,1,1,1],on:true,
    pl:[
      {name:'Golden Hour',artist:'JVKE',dur:'2:53',art:'https://i1.sndcdn.com/artworks-VphCeigNiaWQ-0-t500x500.jpg'},
      {name:'All Night',artist:'Beyoncé',dur:'5:22',art:'https://i.scdn.co/image/ab67616d0000b2738db37bc9a58543471bee78c5'},
      {name:'Dedicated to You',artist:'Freddie Hubbard',dur:'3:22',art:'https://images.genius.com/20f22cdede73444d67507564827a65a2.525x525x1.jpg'},
      {name:'Posthumous Forgiveness',artist:'Tame Impala',dur:'6:06',art:'https://i.scdn.co/image/ab67616d0000b27358267bd34420a00d5cf83a49'},
      {name:'Sticky',artist:'Ravyn Lenae',dur:'3:16',art:'https://i.scdn.co/image/ab67616d0000b273fb297f4796af1cc7d27d94a4'},
    ]},
    {id:'creative',name:'Weekend Create',time:'10:00 AM · 3 hrs',icon:'⧂',days:[0,0,0,0,0,1,1],on:false,
    pl:[
      {name:'Diddy Bop',artist:'Noname',dur:'3:28',art:'https://upload.wikimedia.org/wikipedia/en/5/53/Noname_-_Telefone.jpg'},
      {name:'Anita (Remix)',artist:'Smino, T-Pain',dur:'3:37',art:'https://i1.sndcdn.com/artworks-F6Irds4JetqT-0-t500x500.jpg'},
      {name:'Nakamarra',artist:'Hiatus Kaiyote',dur:'4:34',art:'https://f4.bcbits.com/img/a3761351106_16.jpg'},
      {name:'The Bird',artist:'Anderson.Paak',dur:'3:37',art:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOrU42o-coSDxjv3bSk82TGpxRbvvkTGnZJw&s'},
      {name:'Selfish',artist:'Little Simz, Cleo Sol',dur:'3:46',art:'https://upload.wikimedia.org/wikipedia/en/f/f7/Little_Simz_%E2%80%93_Grey_Area.png'},
      {name:'DtMF',artist:'Bad Bunny',dur:'3:57',art:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4sFUwnfURSh6gsAJCKYy1Hz4G3m3rhw7Xw&s'},
    ]},
    {id:'sleep',name:'Wind Down',time:'10:00 PM · 45 min',icon:'◯',days:[1,1,1,1,1,1,1],on:true,
    pl:[
      {name:'Know That You Are Loved',artist:'Cleo Sol',dur:'3:22',art:'https://i.scdn.co/image/ab67616d0000b2733335e63f35e6cd4d0e8f8aa8'},
      {name:'My Way',artist:'Venna',dur:'3:33',art:'https://i.scdn.co/image/ab67616d00001e024eae6e0335f23494e01e807a'},
      {name:'My World (Beyond)',artist:'anaiis',dur:'4:05',art:'https://f4.bcbits.com/img/a2559101069_10.jpg'},
      {name:'Distance',artist:'Yebba',dur:'4:15',art:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81JeeD9xlBBWaNrFX14eSzraY546uBnHieQ&s'},
      {name:'Sound & Color',artist:'Alabama Shakes',dur:'3:04',art:'https://upload.wikimedia.org/wikipedia/en/2/2d/Alabama_Shakes_-_Sound_%26_Color_album_cover.jpg'},
    ]},
  ];

  const sampleSongs=[
    {name:'Die With A Smile',artist:'Lady Gaga, Bruno Mars',dur:'4:11',art:'https://m.media-amazon.com/images/I/51fMCyTaaIL._UF1000,1000_QL80_.jpg'},
    {name:'Sound & Color',artist:'Alabama Shakes',dur:'3:04',art:'https://upload.wikimedia.org/wikipedia/en/2/2d/Alabama_Shakes_-_Sound_%26_Color_album_cover.jpg'},
    {name:'DtMF',artist:'Bad Bunny',dur:'3:57',art:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4sFUwnfURSh6gsAJCKYy1Hz4G3m3rhw7Xw&s'},
    {name:'Know That You Are Loved',artist:'Cleo Sol',dur:'3:22',art:'https://i.scdn.co/image/ab67616d0000b2733335e63f35e6cd4d0e8f8aa8'},
    {name:'Anita (Remix)',artist:'Smino, T-Pain',dur:'3:37',art:'https://i1.sndcdn.com/artworks-F6Irds4JetqT-0-t500x500.jpg'},
    {name:'Sticky',artist:'Ravyn Lenae',dur:'3:16',art:'https://i.scdn.co/image/ab67616d0000b273fb297f4796af1cc7d27d94a4'},
    {name:'Retrograde',artist:'James Blake',dur:'4:24',art:'https://i.scdn.co/image/ab67616d0000b273d134dbb0fad78dda23d777ff'},
    {name:'My Way',artist:'Venna',dur:'3:33',art:'https://i.scdn.co/image/ab67616d00001e024eae6e0335f23494e01e807a'},
  ];

  let cdS=5040,cdRun=false,cdPaused=false,cdInt=null;
  let playing=false,progSecs=0,totalSecs=238,progInt=null;
  let currentTrackIdx=0;
  let scentPct=68;

  /* ── TIME ── */
  function updateTime(){
    const n=new Date();let h=n.getHours(),m=n.getMinutes();
    const ap=h>=12?'PM':'AM';h=h%12||12;
    document.getElementById('hTime').textContent=h+':'+(m<10?'0':'')+m+' '+ap;
  }
  updateTime();setInterval(updateTime,30000);

  /* ── EMBERS ── */
  (function(){
    const container=document.getElementById('lEmbers');if(!container)return;
    const colors=['rgba(220,100,18,0.8)','rgba(200,80,12,0.6)','rgba(240,140,30,0.5)','rgba(180,60,8,0.5)'];
    for(let i=0;i<14;i++){
      const e=document.createElement('div');e.className='ember';
      const size=Math.random()*2+0.8;
      e.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:${Math.random()*25}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};--dx:${(Math.random()-0.5)*50}px;
        animation-duration:${Math.random()*7+6}s;animation-delay:${Math.random()*10}s;
        box-shadow:0 0 ${size*3}px ${colors[0]};`;
      container.appendChild(e);
    }
  })();

  document.querySelectorAll('.l-opt').forEach(opt=>{
    opt.addEventListener('click',()=>{
      document.querySelectorAll('.l-opt').forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');
      setTimeout(()=>{
        applyMood(opt.dataset.mood,true);
        const l=document.getElementById('landing');
        l.classList.add('out');
        setTimeout(()=>l.style.display='none',750);
      },320);
    });
  });

  /* ── TAB NAV ── */
  document.querySelectorAll('.bb').forEach(b=>{
    b.addEventListener('click',()=>{
      const t=b.dataset.t;
      document.querySelectorAll('.bb').forEach(x=>x.classList.remove('on'));
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      document.getElementById('s-'+t).classList.add('on');
      if(t==='activity')setTimeout(animateScentRing,150);
    });
  });

  /* ── MOOD ── */
  function applyMood(mood,instant=false){
    const m=moods[mood];
    const bg=document.getElementById('bgLayer');
    const ring=document.getElementById('ringCore');
    const lbl=document.getElementById('moodLbl');
    const ctrls=document.querySelector('.ctrls');
    if(!instant){ctrls.classList.add('mood-flash');setTimeout(()=>ctrls.classList.remove('mood-flash'),650);}
    bg.style.background=m.bg;
    ring.textContent=m.icon;
    lbl.textContent=m.lbl;
    setSlAnimated('t',m.temp,TEMP_MIN,TEMP_MAX,'temp');
    setSlAnimated('l',m.light,0,100,'light');
    setSlAnimated('s',m.scent,0,120,'scent');
    updSw(m.sw);
    document.querySelectorAll('.mp').forEach(c=>c.classList.toggle('on',c.dataset.mood===mood));
    buildHomePl(mood);
  }
  document.querySelectorAll('.mp').forEach(c=>c.addEventListener('click',()=>applyMood(c.dataset.mood)));

  // init bg
  document.getElementById('bgLayer').style.background=moods.relax.bg;

  /* ── SLIDERS ── */
  function setSlAnimated(id,val,min,max,type){
    const pct=((val-min)/(max-min))*100;
    document.getElementById(id+'F').style.width=pct+'%';
    document.getElementById(id+'Th').style.left=pct+'%';
    updLbl(type,val,pct);
  }
  function updLbl(type,val,pct){
    if(type==='temp'){document.getElementById('tVal').textContent=Math.round(val);updTd(pct);}
    if(type==='light'){const i=Math.round((pct/100)*3);document.getElementById('lVal').textContent=['Dim','Warm','Bright','Vivid'][Math.min(i,3)];}
    if(type==='scent'){document.getElementById('sVal').textContent=Math.round(val);}
  }
  function updTd(pct){
    const dots=[...document.querySelectorAll('.tdot')];
    const hot=Math.round((pct/100)*5);
    dots.forEach((d,i)=>d.classList.toggle('hot',i<hot));
  }
  function updSw(idx){
    document.querySelectorAll('.sw').forEach((s,i)=>s.classList.toggle('on',i===idx));
    document.getElementById('swLbl').textContent=swLbls[idx];
  }
  function mkSl(tId,fId,thId,min,max,type){
    const tr=document.getElementById(tId);let drag=false;
    function upd(x){
      const r=tr.getBoundingClientRect();
      const pct=Math.max(0,Math.min(1,(x-r.left)/r.width));
      const val=min+pct*(max-min);
      document.getElementById(fId).style.width=(pct*100)+'%';
      document.getElementById(thId).style.left=(pct*100)+'%';
      updLbl(type,val,pct*100);
    }
    tr.addEventListener('mousedown',e=>{drag=true;upd(e.clientX);e.preventDefault();});
    tr.addEventListener('touchstart',e=>{drag=true;upd(e.touches[0].clientX);},{passive:true});
    document.addEventListener('mousemove',e=>{if(drag)upd(e.clientX);});
    document.addEventListener('touchmove',e=>{if(drag)upd(e.touches[0].clientX);},{passive:true});
    document.addEventListener('mouseup',()=>drag=false);
    document.addEventListener('touchend',()=>drag=false);
  }
  mkSl('tT','tF','tTh',TEMP_MIN,TEMP_MAX,'temp');
  mkSl('lT','lF','lTh',0,100,'light');
  mkSl('sT','sF','sTh',0,120,'scent');
  document.querySelectorAll('.sw').forEach((s,i)=>s.addEventListener('click',()=>updSw(i)));
  document.querySelectorAll('.tbtn').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.tbtn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      const mVal=parseInt(b.dataset.m);
      const pct=(mVal/120)*100;
      document.getElementById('sF').style.width=pct+'%';
      document.getElementById('sTh').style.left=pct+'%';
      document.getElementById('sVal').textContent=mVal;
    });
  });
  setSlAnimated('t',50,TEMP_MIN,TEMP_MAX,'temp');
  setSlAnimated('l',40,0,100,'light');
  setSlAnimated('s',30,0,120,'scent');

  /* ── SCHEDULE ── */
  function fmt(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return(h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(sc<10?'0':'')+sc;}
  function updSessUI(){
    document.getElementById('cdV').textContent=fmt(cdS);
    const btns=document.getElementById('ssBtns');
    const lbl=document.getElementById('ssLbl');
    const sub=document.getElementById('cdSub');
    const banner=document.getElementById('sessBanner');
    if(!cdRun&&!cdPaused){
      lbl.textContent='Next Session';sub.textContent='until session begins';
      banner.classList.remove('on');
      btns.innerHTML='<button class="sbtn" id="bSkip">Skip</button><button class="sbtn sbtn-p" id="bStart">Start Now</button>';
      document.getElementById('bStart').onclick=startSess;
      document.getElementById('bSkip').onclick=()=>{cdS=86400;document.getElementById('cdV').textContent=fmt(cdS);};
    }else if(cdRun){
      lbl.textContent='Session Active';sub.textContent='Evening Relax · running';
      banner.classList.add('on');
      btns.innerHTML='<button class="sbtn sbtn-stop" id="bStop">Stop</button><button class="sbtn sbtn-pause" id="bPause">Pause</button>';
      document.getElementById('bStop').onclick=stopSess;
      document.getElementById('bPause').onclick=pauseSess;
    }else{
      lbl.textContent='Session Paused';sub.textContent='tap resume to continue';
      banner.classList.add('on');
      btns.innerHTML='<button class="sbtn sbtn-stop" id="bStop">Stop</button><button class="sbtn sbtn-p" id="bRes">Resume</button>';
      document.getElementById('bStop').onclick=stopSess;
      document.getElementById('bRes').onclick=resumeSess;
    }
  }
  function startSess(){
    cdS=5400;cdRun=true;cdPaused=false;
    cdInt=setInterval(()=>{
      if(cdS>0){
        cdS--;document.getElementById('cdV').textContent=fmt(cdS);
        if(cdS%30===0&&scentPct>5){scentPct=Math.max(0,scentPct-1);document.getElementById('scentFill').style.width=scentPct+'%';document.getElementById('scentHrs').textContent=(scentPct*0.5).toFixed(1)+' hrs';}
      }else stopSess();
    },1000);
    updSessUI();
  }
  function pauseSess(){cdRun=false;cdPaused=true;clearInterval(cdInt);updSessUI();}
  function resumeSess(){cdRun=true;cdPaused=false;cdInt=setInterval(()=>{if(cdS>0){cdS--;document.getElementById('cdV').textContent=fmt(cdS);}else stopSess();},1000);updSessUI();}
  function stopSess(){cdRun=false;cdPaused=false;clearInterval(cdInt);cdS=5040;updSessUI();}
  updSessUI();

  /* ── SCHEDULE LIST ── */
  function buildSched(){
    const list=document.getElementById('schedList');list.innerHTML='';
    routines.forEach((r,ri)=>{
      const el=document.createElement('div');el.className='si';
      el.innerHTML=`<div class="si-ico">${r.icon}</div>
      <div class="si-info">
        <div class="si-name">${r.name}</div>
        <div class="si-time">${r.time}</div>
        <div class="si-pl" data-ri="${ri}">Playlist · ${r.pl.length} tracks ›</div>
        <div class="si-days">${dayNames.map((d,i)=>`<div class="dp${r.days[i]?' on':''}">${d}</div>`).join('')}</div>
      </div>
      <div class="tog${r.on?' on':''}" data-ri="${ri}"><div class="togdot"></div></div>`;
      el.querySelector('.si-pl').addEventListener('click',()=>openPl(ri));
      el.querySelector('.tog').addEventListener('click',function(){this.classList.toggle('on');routines[ri].on=this.classList.contains('on');});
      list.appendChild(el);
    });
  }
  buildSched();

  /* ── PLAYLIST SLIDE ── */
  const heroImages={
    focus:'url("https://images.pexels.com/photos/10267183/pexels-photo-10267183.jpeg")',
    relax:'url("https://images.pexels.com/photos/33971617/pexels-photo-33971617.jpeg")',
    creative:'url("https://images.pexels.com/photos/6384887/pexels-photo-6384887.jpeg")',
    sleep:'url("https://images.pexels.com/photos/2986368/pexels-photo-2986368.jpeg")',
  };
  let plShuffled=false,plCurrentRi=1,plPlaying=false,plTrackIdx=0;

  function openPl(ri){
    plCurrentRi=ri;
    const r=routines[ri];
    document.getElementById('plHeroImg').style.backgroundImage=heroImages[r.id]||heroImages.relax;
    document.getElementById('plHeroName').textContent=r.name;
    document.getElementById('plHeroMeta').textContent=r.pl.length+' TRACKS · HEATED SESSION';
    buildPlTracks(ri);
    syncPlNowBar();
    document.getElementById('plSlide').classList.add('open');
  }

  document.getElementById('plBack').addEventListener('click',()=>{
    document.getElementById('plSlide').classList.remove('open');
    buildSched();buildMiniPl();buildHomePl();
  });
  document.getElementById('seeAllBtn').addEventListener('click',()=>openPl(1));
  document.getElementById('plShuffle').addEventListener('click',function(){plShuffled=!plShuffled;this.classList.toggle('on',plShuffled);});
  document.getElementById('plPlayAll').addEventListener('click',()=>{
    plTrackIdx=0;plPlaying=true;playing=true;progSecs=0;currentTrackIdx=0;
    const t=routines[plCurrentRi].pl[0];
    if(t){document.getElementById('nowTrack').textContent=t.name;document.getElementById('nowArtist').textContent=t.artist;}
    document.getElementById('vinylDisc').classList.add('playing');
    document.getElementById('playIco').innerHTML='<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>';
    document.getElementById('pFill').style.width='0%';document.getElementById('progCur').textContent='0:00';
    document.getElementById('miniVinylHome').classList.add('on');
    startPlayer();syncPlNowBar();buildPlTracks(plCurrentRi);buildMiniPl();
  });
  document.getElementById('plNowBtn').addEventListener('click',()=>{
    plPlaying=!plPlaying;playing=plPlaying;
    const ico=document.getElementById('plNowIco');
    const disc=document.getElementById('vinylDisc');
    if(plPlaying){
      ico.innerHTML='<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>';
      document.getElementById('playIco').innerHTML='<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>';
      disc.classList.add('playing');document.getElementById('miniVinylHome').classList.add('on');startPlayer();
    }else{
      ico.innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';
      document.getElementById('playIco').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';
      disc.classList.remove('playing');document.getElementById('miniVinylHome').classList.remove('on');clearInterval(progInt);
    }
    buildPlTracks(plCurrentRi);
  });

  function syncPlNowBar(){
    const r=routines[plCurrentRi];const t=r.pl[plTrackIdx]||r.pl[0];if(!t)return;
    const nameEl=document.getElementById('plNowName');const artEl=document.getElementById('plNowArt');
    if(nameEl)nameEl.textContent=t.name;
    if(artEl)artEl.innerHTML=t.art?`<img src="${t.art}" onerror="this.parentNode.textContent='♬'">`:'♬';
    const ico=document.getElementById('plNowIco');
    if(ico)ico.innerHTML=plPlaying?'<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>':'<polygon points="5 3 19 12 5 21 5 3"/>';
  }

  setInterval(()=>{
    if(plPlaying&&document.getElementById('plSlide').classList.contains('open')){
      const fill=document.getElementById('plNowFill');
      if(fill)fill.style.width=((progSecs/totalSecs)*100).toFixed(1)+'%';
    }
  },1000);

  function buildPlTracks(ri){
    const r=routines[ri];
    const wrap=document.getElementById('plTracks');if(!wrap)return;
    wrap.innerHTML='';
    r.pl.forEach((t,ti)=>{
      const isPlaying=(plPlaying&&ti===plTrackIdx);
      const el=document.createElement('div');el.className='tr'+(isPlaying?' playing':'');
      el.innerHTML=`
        <div class="tr-num">${isPlaying?'<div class="eq"><div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div></div>':(ti+1)}</div>
        <div class="tr-art">${t.art?`<img src="${t.art}" onerror="this.parentNode.textContent='♬'">`:'♬'}</div>
        <div class="tr-info"><div class="tr-name">${t.name}</div><div class="tr-artist">${t.artist}</div></div>
        <div class="tr-dur">${t.dur}</div>
        <div class="tr-more">···</div>`;
      el.addEventListener('click',()=>{
        plTrackIdx=ti;plPlaying=true;playing=true;currentTrackIdx=ti;progSecs=0;
        document.getElementById('nowTrack').textContent=t.name;document.getElementById('nowArtist').textContent=t.artist;
        document.getElementById('vinylDisc').classList.add('playing');
        document.getElementById('playIco').innerHTML='<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>';
        document.getElementById('pFill').style.width='0%';document.getElementById('progCur').textContent='0:00';
        document.getElementById('miniVinylHome').classList.add('on');
        startPlayer();syncPlNowBar();buildPlTracks(ri);buildMiniPl();
      });
      wrap.appendChild(el);
    });
    sampleSongs.filter(s=>!r.pl.find(p=>p.name===s.name)).slice(0,3).forEach(s=>{
      const addEl=document.createElement('div');addEl.className='add-tr';
      addEl.innerHTML=`
        <div class="add-tr-ico">+</div>
        <div class="add-tr-info"><div class="add-tr-name">${s.name}</div><div class="add-tr-artist">${s.artist}</div></div>
        <div class="add-tr-btn">Add</div>`;
      addEl.addEventListener('click',()=>{
        r.pl.push(s);
        document.getElementById('plHeroMeta').textContent=r.pl.length+' TRACKS · HEATED SESSION';
        buildPlTracks(ri);buildMiniPl();buildHomePl();
      });
      wrap.appendChild(addEl);
    });
  }

  /* ── MINI PLAYLIST ── */
  function syncVinyl(){
    const t=routines[1].pl[currentTrackIdx];
    const lbl=document.getElementById('vinylLbl');
    const def=document.getElementById('vinylDef');
    if(t&&t.art){
      lbl.innerHTML=`<img src="${t.art}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentNode.innerHTML='<div class=\\'vinyl-lbl-def\\'>♬</div>'">`;
    }else{
      lbl.innerHTML='<div class="vinyl-lbl-def">♬</div>';
    }
  }

  function syncVinyl(){
    const t=routines[1].pl[currentTrackIdx];
    const lbl=document.getElementById('vinylLbl');
    if(t&&t.art){
      lbl.innerHTML=`<img src="${t.art}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentNode.innerHTML='<div class=\'vinyl-lbl-def\'>♬</div>'">`;
    }else{
      lbl.innerHTML='<div class="vinyl-lbl-def">♬</div>';
    }
  }

  function buildMiniPl(){
    const wrap=document.getElementById('miniPl');wrap.innerHTML='';
    routines[1].pl.slice(0,3).forEach((t,i)=>{
      const el=document.createElement('div');el.className='mini-tr';
      const isPlaying=(i===currentTrackIdx&&playing);
      el.innerHTML=`<div class="mini-num" style="color:${isPlaying?'rgba(255,220,140,0.9)':'rgba(255,235,200,0.3)'}">${isPlaying?'➤':(i+1)}</div>
      <div class="mini-info"><div class="mini-name">${t.name}</div><div class="mini-artist">${t.artist}</div></div>
      <div class="mini-dur">${t.dur}</div>`;
      el.addEventListener('click',()=>{
        currentTrackIdx=i;
        document.getElementById('nowTrack').textContent=t.name;document.getElementById('nowArtist').textContent=t.artist;
        progSecs=0;document.getElementById('pFill').style.width='0%';document.getElementById('progCur').textContent='0:00';
        if(playing)startPlayer();buildMiniPl();
      });
      wrap.appendChild(el);
    });
  }
  buildMiniPl();

  /* ── HOME PLAYLIST BUILDER ── */
  let currentBuilderMood='relax';
  function buildHomePl(mood){
    currentBuilderMood=mood||currentBuilderMood;
    const ri=routines.findIndex(r=>r.id===currentBuilderMood);
    const playlist=ri>=0?routines[ri].pl:routines[1].pl;
    const wrap=document.getElementById('plBuilderTracks');
    const count=document.getElementById('plBuilderCount');
    if(!wrap)return;
    wrap.innerHTML='';
    count.textContent=playlist.length+' tracks';
    playlist.forEach((t,i)=>{
      const el=document.createElement('div');
      el.className='pl-home-tr'+(i===currentTrackIdx?' playing':'');
      el.innerHTML=`
        <div class="pl-home-num">${i===currentTrackIdx?'➤':(i+1)}</div>
        <div class="pl-home-art">${t.art?`<img src="${t.art}" onerror="this.parentNode.textContent='♬'">`:'♬'}</div>
        <div class="pl-home-info"><div class="pl-home-name">${t.name}</div><div class="pl-home-artist">${t.artist}</div></div>
        <div class="pl-home-dur">${t.dur}</div>`;
      el.addEventListener('click',()=>{
        currentTrackIdx=i;
        const nowT=document.getElementById('nowTrack');const nowA=document.getElementById('nowArtist');
        if(nowT)nowT.textContent=t.name;if(nowA)nowA.textContent=t.artist;
        progSecs=0;
        const pf=document.getElementById('pFill');const pc=document.getElementById('progCur');
        if(pf)pf.style.width='0%';if(pc)pc.textContent='0:00';
        if(playing)startPlayer();buildHomePl();buildMiniPl();
      });
      wrap.appendChild(el);
    });
  }
  buildHomePl('relax');

  document.getElementById('plBuilderAdd').addEventListener('click',()=>{
    const ri=routines.findIndex(r=>r.id===currentBuilderMood);
    const playlist=ri>=0?routines[ri].pl:routines[1].pl;
    const available=sampleSongs.filter(s=>!playlist.find(p=>p.name===s.name));
    if(available.length>0){playlist.push(available[0]);buildHomePl();buildMiniPl();}
  });

  /* ── NOTIFICATION TOGGLES ── */
  document.querySelectorAll('.ntog').forEach(t=>{
    t.addEventListener('click',()=>{
      const on=t.classList.contains('on');t.classList.toggle('on');
      const dot=t.querySelector('.ndot');
      dot.style.left=on?'1px':'15px';
      dot.style.background=on?'rgba(255,255,255,0.5)':'rgba(130,220,130,0.95)';
    });
  });

  /* ── MUSIC PLAYER ── */
  const disc=document.getElementById('vinylDisc');
  const pFill=document.getElementById('pFill');
  const progCur=document.getElementById('progCur');
  function fmtTime(s){const m=Math.floor(s/60),sc=s%60;return m+':'+(sc<10?'0':'')+sc;}

  function syncVinyl(){
    const t=routines[1].pl[currentTrackIdx];
    const lbl=document.getElementById('vinylLbl');
    if(t&&t.art){
      lbl.innerHTML=`<img src="${t.art}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentNode.innerHTML='<div class=\\'vinyl-lbl-def\\'>♬</div>'">`;
    }else{
      lbl.innerHTML='<div class="vinyl-lbl-def">♬</div>';
    }
  }
  syncVinyl();

  function startPlayer(){
    if(progInt)clearInterval(progInt);
    progInt=setInterval(()=>{
      if(progSecs<totalSecs){
        progSecs++;pFill.style.width=((progSecs/totalSecs)*100)+'%';progCur.textContent=fmtTime(progSecs);
      }else{
        clearInterval(progInt);playing=false;disc.classList.remove('playing');
        document.getElementById('playIco').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';
      }
    },1000);
  }
  document.getElementById('playBtn').addEventListener('click',()=>{
    playing=!playing;
    const ico=document.getElementById('playIco');
    const miniWrap=document.getElementById('miniVinylHome');
    if(playing){
      ico.innerHTML='<line x1="6" y1="19" x2="6" y2="5"/><line x1="18" y1="19" x2="18" y2="5"/>';
      disc.classList.add('playing');if(miniWrap)miniWrap.classList.add('on');startPlayer();
    }else{
      ico.innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';
      disc.classList.remove('playing');if(miniWrap)miniWrap.classList.remove('on');clearInterval(progInt);
    }
    buildMiniPl();
  });
  document.getElementById('miniVinylHome').addEventListener('click',()=>{
    document.querySelectorAll('.bb').forEach(x=>x.classList.remove('on'));
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    document.querySelector('.bb[data-t="profile"]').classList.add('on');
    document.getElementById('s-profile').classList.add('on');
  });
  document.getElementById('prevBtn').addEventListener('click',()=>{
    if(currentTrackIdx>0){currentTrackIdx--;const t=routines[1].pl[currentTrackIdx];if(t){document.getElementById('nowTrack').textContent=t.name;document.getElementById('nowArtist').textContent=t.artist;}}
    progSecs=0;pFill.style.width='0%';progCur.textContent='0:00';if(playing)startPlayer();buildMiniPl();syncVinyl();
  });
  document.getElementById('nextBtn').addEventListener('click',()=>{
    if(currentTrackIdx<routines[1].pl.length-1){currentTrackIdx++;const t=routines[1].pl[currentTrackIdx];if(t){document.getElementById('nowTrack').textContent=t.name;document.getElementById('nowArtist').textContent=t.artist;}}
    progSecs=0;pFill.style.width='0%';progCur.textContent='0:00';if(playing)startPlayer();buildMiniPl();syncVinyl();
  });
  document.getElementById('progBar').addEventListener('click',function(e){
    const r=this.getBoundingClientRect();const pct=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    progSecs=Math.round(pct*totalSecs);pFill.style.width=(pct*100)+'%';progCur.textContent=fmtTime(progSecs);
    if(playing)startPlayer();
  });

  /* ── MOOD MAP ── */
  const weekData=[
    {day:'Mon',mood:'relax',hrs:3.2,scent:'Cedarwood'},
    {day:'Tue',mood:'focus',hrs:2.8,scent:'Pine'},
    {day:'Wed',mood:'relax',hrs:4.0,scent:'Cedarwood'},
    {day:'Thu',mood:'creative',hrs:1.5,scent:'Jasmine'},
    {day:'Fri',mood:'relax',hrs:3.8,scent:'Cedarwood'},
    {day:'Sat',mood:null,hrs:0,scent:null},
    {day:'Sun',mood:'sleep',hrs:3.1,scent:'Lavender'},
  ];
  const moodColors={
    relax:{bg:'radial-gradient(circle at 35% 35%, rgba(240,170,50,0.9), rgba(160,80,10,0.85))',glow:'rgba(215,155,45,0.5)'},
    focus:{bg:'radial-gradient(circle at 35% 35%, rgba(120,150,240,0.9), rgba(40,60,160,0.85))',glow:'rgba(95,125,215,0.5)'},
    creative:{bg:'radial-gradient(circle at 35% 35%, rgba(220,90,160,0.9), rgba(130,30,90,0.85))',glow:'rgba(195,75,155,0.5)'},
    sleep:{bg:'radial-gradient(circle at 35% 35%, rgba(100,120,200,0.9), rgba(40,55,130,0.85))',glow:'rgba(85,105,175,0.5)'},
  };
  function buildMoodMap(){
    const row=document.getElementById('moodMapRow');if(!row)return;row.innerHTML='';
    weekData.forEach(d=>{
      const day=document.createElement('div');day.className='mm-day';
      const mc=d.mood?moodColors[d.mood]:null;
      day.innerHTML=`<div class="mm-orb-wrap">
        ${d.mood?`<div class="mm-orb" style="background:${mc.bg};box-shadow:0 0 12px ${mc.glow},0 2px 8px rgba(0,0,0,0.4);">
          <div class="mm-tooltip">${d.hrs}h · ${d.mood}<br>${d.scent}</div></div>`
        :`<div class="mm-empty"><div class="mm-tooltip">No session</div></div>`}
      </div><div class="mm-lbl">${d.day}</div>`;
      row.appendChild(day);
    });
  }
  buildMoodMap();

  /* ── SCENT RING ANIMATION ── */
  function animateScentRing(){
    const ring=document.getElementById('scentRingFill');const pctEl=document.getElementById('scentRingPct');if(!ring)return;
    ring.style.strokeDashoffset='301.6';pctEl.textContent='0%';
    let start=null;
    function step(ts){
      if(!start)start=ts;const prog=Math.min((ts-start)/1200,1);const ease=1-Math.pow(1-prog,3);
      ring.style.strokeDashoffset=(301.6-(301.6-96.5)*ease).toFixed(1);pctEl.textContent=Math.round(68*ease)+'%';
      if(prog<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  })();