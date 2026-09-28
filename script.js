const panels=[...document.querySelectorAll('.panel')],tabs=[...document.querySelectorAll('[data-tab]')],nav=document.getElementById('nav');
function go(id){panels.forEach(p=>p.classList.toggle('active',p.id===id));tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));nav.classList.remove('open');document.getElementById('menu').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'smooth'});}
tabs.forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();go(b.dataset.go)}));
document.getElementById('menu').addEventListener('click',()=>{const open=nav.classList.toggle('open');document.getElementById('menu').setAttribute('aria-expanded',String(open));});

document.getElementById('habitForm').addEventListener('submit',e=>{
 e.preventDefault();const hours=Number(document.getElementById('screen').value),breaks=Number(document.getElementById('breaks').value),sleep=Number(document.getElementById('sleep').value),offline=Number(document.getElementById('offline').value);
 if(!Number.isFinite(hours)||hours<0||hours>24){alert('Ingresa un número de horas entre 0 y 24.');return;}
 let points=(hours<=2?2:hours<=4?1:0)+breaks+sleep+offline;
 let title,text,tip,width;
 if(points>=6){title='Tu rutina incluye varios hábitos protectores';text='Tus respuestas indican que ya incorporas algunas pausas, descanso y actividades fuera de pantalla. Mantén lo que te funciona.';tip='🌿 Elige una práctica que disfrutes y sigue cuidando el equilibrio.';width=90}
 else if(points>=3){title='Puedes reforzar algunos hábitos';text='Parece que hay hábitos que ya practicas y otros que podrías ajustar poco a poco. No necesitas cambiar todo de una vez.';tip='💡 Prueba elegir un momento del día sin notificaciones o crear una rutina antes de dormir.';width=58}
 else{title='Empieza con un cambio pequeño';text='Tus respuestas sugieren que podrías experimentar con más pausas o tiempo sin pantalla. Es una reflexión, no una evaluación médica.';tip='🌱 Escoge una pausa breve, una actividad que disfrutes o un horario para dejar el teléfono.';width=30}
 document.getElementById('resultTitle').textContent=title;document.getElementById('resultText').textContent=text;document.getElementById('resultTip').textContent=tip;document.getElementById('meter').style.width=width+'%';
});

const filterBtns=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-kind]')];
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.toggle('chosen',b===btn));let n=0;cards.forEach(card=>{const show=btn.dataset.filter==='todos'||card.dataset.kind===btn.dataset.filter;card.hidden=!show;if(show)n++});document.getElementById('count').textContent=`${n} ${n===1?'idea':'ideas'}`;}));

const qs=[
{q:'¿Qué puede ayudar a reducir interrupciones mientras estudias?',a:['Activar todas las notificaciones','Silenciar avisos no urgentes','Abrir muchas aplicaciones'],c:1,why:'Silenciar avisos no urgentes puede reducir interrupciones.'},
{q:'¿Qué hábito puede apoyar una rutina de descanso?',a:['Usar el teléfono en la cama toda la noche','Dejar un rato tranquilo antes de dormir','Tomar bebidas energéticas tarde'],c:1,why:'Una rutina tranquila y consistente puede favorecer el descanso.'},
{q:'¿Qué significa usar redes con intención?',a:['Revisarlas automáticamente cada minuto','Elegir cuándo y para qué entrar','No hablar nunca con nadie'],c:1,why:'Usarlas con intención implica decidir cuándo y para qué conectarte.'},
{q:'¿Cuál es una buena pausa de pantalla?',a:['Cambiar de una red a otra','Levantarte, estirarte o mirar a lo lejos','Seguir mirando videos sin parar'],c:1,why:'Cambiar de postura y descansar la vista puede ser una pausa útil.'},
{q:'¿La autoevaluación de esta página diagnostica deterioro cognitivo?',a:['Sí, da un diagnóstico médico','No, solo invita a reflexionar sobre hábitos','Sí, mide la memoria con precisión'],c:1,why:'Es una herramienta educativa, no un examen ni diagnóstico médico.'}
];
let qi=0,score=0,answered=false;
function render(){const q=qs[qi];answered=false;document.getElementById('progress').textContent=`Pregunta ${qi+1} de ${qs.length}`;document.getElementById('progressbar').style.width=((qi+1)/qs.length*100)+'%';document.getElementById('question').textContent=q.q;document.getElementById('feedback').textContent='';const area=document.getElementById('answers');area.replaceChildren();q.a.forEach((txt,i)=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<b>${String.fromCharCode(65+i)}</b>${txt}`;b.addEventListener('click',()=>choose(i,b));area.appendChild(b)});const next=document.getElementById('next');next.disabled=true;next.textContent=qi===qs.length-1?'Ver resultado →':'Siguiente →';}
function choose(i,btn){if(answered)return;answered=true;const q=qs[qi];[...document.querySelectorAll('.answer')].forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add('correct')});if(i===q.c){score++;document.getElementById('feedback').textContent='¡Correcto! '+q.why}else{btn.classList.add('wrong');document.getElementById('feedback').textContent='No exactamente. '+q.why}document.getElementById('next').disabled=false;}
document.getElementById('next').addEventListener('click',()=>{if(!answered)return;if(qi<qs.length-1){qi++;render();return}document.getElementById('quizbody').hidden=true;document.getElementById('quizend').hidden=false;document.getElementById('score').textContent=`¡Obtuviste ${score} de ${qs.length}!`;document.getElementById('scoretext').textContent=score===5?'¡Excelente! Reconoces varias prácticas de bienestar digital.':score>=3?'¡Buen trabajo! Lee las explicaciones y sigue aprendiendo.':'¡Sigue explorando! Revisa las ideas saludables e inténtalo de nuevo.';});
document.getElementById('restart').addEventListener('click',()=>{qi=0;score=0;document.getElementById('quizbody').hidden=false;document.getElementById('quizend').hidden=true;render();});
render();