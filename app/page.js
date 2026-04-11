"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const INVITE_CODE = "LOVE";
const GIFT_CODE = "GIFT4U";

// ─── TRANSLATIONS ───────────────────────────────────────────────────
const T = {
  en: {
    tagline: 'Find Comfort',
    taglineHebrew: 'נֶחָמָה',
    blurbIntro: 'Life moves fast. Nehama means comfort. The deep kind.',
    blurbBody: '<em>How are you?</em> Not "good." Not "fine." The real answer. The one you don\'t say out loud. This is where Nehama begins. Nehama sits with you in the honest, complicated truth of your life, helps you see a way forward, and then shows you where you are in a story much older than your own.',
    whatIsTitle: 'What is Nehama?',
    whatIs1: '<strong>Your therapist knows your emotions but not your bank account. Your financial advisor knows your numbers but not your marriage. Your pastor or rabbi knows your spirit but not what keeps you up at night.</strong> Nehama holds the complete picture.',
    whatIs2: 'It is the first experience of its kind: a guided life architecture session that asks real questions, builds a real plan, and then reflects your story through biblical scripture paired with practices for your body. All of it connected. All of it personal. All of it private; no one sees what you share here but you.',
    whatIs3: 'And unlike anyone else in your life, Nehama is available at 2am on a Tuesday when the weight hits. It remembers what you said last week, knows what you committed to, and will call you on it with warmth if you have been avoiding the hard thing. Part coach, part mirror, part guide. Always honest. Always on your side.',
    whatIs4: 'Nehama was born from a real experience. A couple, married 25 years, carrying financial pressure, a daughter\'s medical crisis, career uncertainty, and a relationship they loved but had not had time to nurture in two decades, sat down and answered honest questions about every area of their lives. What came back changed everything: a clear plan, hard truths delivered with kindness, and their entire story reflected through scripture with such precision that it left them both in tears.',
    whatIs5: 'They built Nehama so anyone could have that experience.',
    freeTitle: 'Free Reflection',
    freeTag: 'No account needed',
    freeDesc: 'Five honest questions, then your life reflected through scripture. About 10 minutes.',
    fullTitle: 'Full Journey',
    fullTag: 'Beta access',
    fullDesc: 'Deep discovery across every area of your life. A concrete plan to move forward. Scripture with body practices. Ongoing guidance that remembers you and holds you accountable.',
    fullDesc2: 'Come back weekly, or as often as you like. The life-plan adjusts. The accountability holds. The scripture deepens as your story moves.',
    namePlaceholder: 'Your first name',
    partnerPlaceholder: "Partner's first name",
    scriptureLabel: 'Scripture preference',
    modeLabel: 'Journey mode',
    langLabel: 'Language',
    otLabel: 'Old Testament',
    bothLabel: 'Both',
    ntLabel: 'New Testament',
    justMe: 'Just Me',
    withPartner: 'With Partner',
    startFree: 'Start Your Reflection',
    startFull: 'Begin Your Journey',
    invitePrompt: 'Private beta. Enter your invitation code.',
    invitePlaceholder: 'INVITE CODE',
    codeError: 'Code not recognized.',
    enter: 'Enter',
    privacyNote: 'Your conversations are private. We never see them.',
    inputPlaceholder: 'Share what is on your heart...',
    footerBuilt: 'Nehama is built by a family who believes in this work. Your subscription keeps it running and lets us offer free reflections to anyone who needs one.',
    footerPrivacy: 'Your conversations are private. We never see them. Sessions are stored on your device.',
    footerCrisis: 'This is a guided reflection, not therapy or medical advice. If you are in crisis, please call or text 988.',
    contactUs: 'Contact us',
    getInTouch: 'Get in touch',
    emailLabel: 'Your email',
    msgLabel: 'What is on your mind?',
    send: 'Send',
    thankYou: 'Thank you. We will be in touch.',
    settings: 'Settings',
    session: 'Session',
    readyFull: 'Ready for the full journey?',
    readyFullDesc: 'Deep discovery, a concrete life plan, scripture with body practices, and ongoing guidance.',
    startFullJourney: 'Start Full Journey',
    newSession: 'Start New Session',
    newSessionConfirm: 'Start a new session? Your current conversation will be cleared.',
    emailCapture: 'Want to know when the full journey is available?',
    emailCaptureDesc: 'Leave your email. Nothing else.',
    messages: 'messages',
    save: 'Save',
  },
  es: {
    tagline: 'Encuentra Consuelo',
    taglineHebrew: 'נֶחָמָה',
    blurbIntro: 'La vida va rápido. Nehama significa consuelo. Del tipo profundo.',
    blurbBody: '<em>¿Cómo estás?</em> No "bien." No "todo bien." La respuesta real. La que no dices en voz alta. Aquí es donde comienza Nehama. Nehama se sienta contigo en la verdad honesta y complicada de tu vida, te ayuda a ver un camino hacia adelante, y luego te muestra dónde estás en una historia mucho más antigua que la tuya.',
    whatIsTitle: '¿Qué es Nehama?',
    whatIs1: '<strong>Tu terapeuta conoce tus emociones pero no tu cuenta bancaria. Tu asesor financiero conoce tus números pero no tu matrimonio. Tu pastor o rabino conoce tu espíritu pero no lo que te mantiene despierto por la noche.</strong> Nehama tiene la imagen completa.',
    whatIs2: 'Es la primera experiencia de su tipo: una sesión guiada de arquitectura de vida que hace preguntas reales, construye un plan real, y luego refleja tu historia a través de las escrituras bíblicas combinadas con prácticas para tu cuerpo. Todo conectado. Todo personal. Todo privado; nadie ve lo que compartes aquí excepto tú.',
    whatIs3: 'Y a diferencia de cualquier otra persona en tu vida, Nehama está disponible a las 2am un martes cuando el peso te golpea. Recuerda lo que dijiste la semana pasada, sabe a qué te comprometiste, y te lo recordará con calidez si has estado evitando lo difícil. Parte coach, parte espejo, parte guía. Siempre honesto. Siempre de tu lado.',
    whatIs4: 'Nehama nació de una experiencia real. Una pareja, casados por 25 años, cargando presión financiera, la crisis médica de una hija, incertidumbre profesional, y una relación que amaban pero no habían tenido tiempo de nutrir en dos décadas, se sentaron y respondieron preguntas honestas sobre cada área de sus vidas. Lo que volvió lo cambió todo: un plan claro, verdades difíciles entregadas con amabilidad, y toda su historia reflejada a través de las escrituras con tal precisión que los dejó a ambos en lágrimas.',
    whatIs5: 'Construyeron Nehama para que cualquiera pudiera tener esa experiencia.',
    freeTitle: 'Reflexión Gratuita',
    freeTag: 'Sin cuenta necesaria',
    freeDesc: 'Cinco preguntas honestas, luego tu vida reflejada a través de las escrituras. Aproximadamente 10 minutos.',
    fullTitle: 'Viaje Completo',
    fullTag: 'Acceso beta',
    fullDesc: 'Descubrimiento profundo en cada área de tu vida. Un plan concreto para avanzar. Escrituras con prácticas corporales. Guía continua que te recuerda y te mantiene responsable.',
    fullDesc2: 'Regresa semanalmente, o tan seguido como quieras. El plan de vida se ajusta. La responsabilidad se mantiene. Las escrituras se profundizan a medida que tu historia avanza.',
    namePlaceholder: 'Tu nombre',
    partnerPlaceholder: 'Nombre de tu pareja',
    scriptureLabel: 'Preferencia de escritura',
    modeLabel: 'Modo de viaje',
    langLabel: 'Idioma',
    otLabel: 'Antiguo Testamento',
    bothLabel: 'Ambos',
    ntLabel: 'Nuevo Testamento',
    justMe: 'Solo Yo',
    withPartner: 'Con Pareja',
    startFree: 'Comienza Tu Reflexión',
    startFull: 'Comienza Tu Viaje',
    invitePrompt: 'Beta privada. Ingresa tu código de invitación.',
    invitePlaceholder: 'CÓDIGO DE INVITACIÓN',
    codeError: 'Código no reconocido.',
    enter: 'Entrar',
    privacyNote: 'Tus conversaciones son privadas. Nunca las vemos.',
    inputPlaceholder: 'Comparte lo que hay en tu corazón...',
    footerBuilt: 'Nehama está construida por una familia que cree en este trabajo. Tu suscripción la mantiene funcionando y nos permite ofrecer reflexiones gratuitas a cualquiera que las necesite.',
    footerPrivacy: 'Tus conversaciones son privadas. Nunca las vemos. Las sesiones se almacenan en tu dispositivo.',
    footerCrisis: 'Esta es una reflexión guiada, no terapia ni consejo médico. Si estás en crisis, por favor llama o envía un mensaje al 988.',
    contactUs: 'Contáctanos',
    getInTouch: 'Ponte en contacto',
    emailLabel: 'Tu correo electrónico',
    msgLabel: '¿Qué tienes en mente?',
    send: 'Enviar',
    thankYou: 'Gracias. Estaremos en contacto.',
    settings: 'Ajustes',
    session: 'Sesión',
    readyFull: '¿Listo para el viaje completo?',
    readyFullDesc: 'Descubrimiento profundo, un plan de vida concreto, escrituras con prácticas corporales, y guía continua.',
    startFullJourney: 'Comenzar Viaje Completo',
    newSession: 'Nueva Sesión',
    newSessionConfirm: '¿Comenzar una nueva sesión? Tu conversación actual será borrada.',
    emailCapture: '¿Quieres saber cuándo el viaje completo esté disponible?',
    emailCaptureDesc: 'Deja tu correo. Nada más.',
    messages: 'mensajes',
    save: 'Guardar',
  }
};

// ─── SYSTEM PROMPTS ─────────────────────────────────────────────────
const buildFullPrompt = ({ name, partnerName, mode, testament, lang }) => {
const langInstruction = lang === 'es' ? '\n\nCRITICAL: You MUST respond entirely in Spanish. Every word, every question, every reflection must be in Spanish. Do not use English at all.\n' : '';
return `
You are Nehama, a deeply wise, warm, and direct life architecture guide who leads people through comprehensive personal discovery, builds actionable life plans, and reflects their journey through biblical scripture paired with body and wellness practices.

The name Nehama comes from the Hebrew word for comfort (נֶחָמָה), from the same root as Nehemiah ("God is my comfort") and the prophet Isaiah's call: "Nachamu, nachamu ami" ("Comfort, comfort my people"). You are that comfort made practical.

YOU ARE NOT a chatbot with a Christian skin. You are not a devotional app. You are not a Bible verse search engine. You are the wisest, most empathetic life coach someone has ever sat with. You understand money, relationships, health, work, family, the human body, and you know scripture deeply enough to show people their own lives inside it.

IMPORTANT STYLE RULE: Never use em-dashes (the long dash) in your responses. Use commas, periods, semicolons, colons, or restructure sentences instead. This is strict.
${langInstruction}
WHO YOU ARE SPEAKING WITH:
Name: ${name}
${mode === 'couple' ? `Partner's name: ${partnerName}\nMode: Couple. Address each person individually at times. Notice the dynamic between them. Honor both voices. Name where their visions align and diverge.` : 'Mode: Individual'}
Scripture preference: ${testament === 'old' ? 'Old Testament only' : testament === 'new' ? 'New Testament only' : 'Both Old and New Testament'}

YOUR PURPOSE:
You exist to help people reclaim their lives. Through deep, honest conversation, you will:
1. Help them see clearly what they actually want (not what they think they should want)
2. Show them where their life has drifted from that vision
3. Build a concrete, actionable plan to close the gap
4. Reflect their journey through biblical scripture so they can see where they are in a story much bigger than themselves
5. Pair every spiritual insight with a free, practical body/wellness practice

This is not a venting session. This is not spiritual comfort without direction. Everything you ask serves the goal of building something real: a plan, a path forward, a life that matches who they actually are.

YOUR PROCESS:
Guide them through five phases. Do NOT rush. Do NOT skip ahead.

PHASE 1: DISCOVERY (the majority of the conversation)
Ask deep questions across these twelve domains, ONE AT A TIME. Wait for each answer. Follow up before moving on.

1. The Perfect Ordinary Tuesday, 3 years from now. Make it sensory. Tell them not to filter for realism.
2. Lifestyle and daily reality. What does a typical day actually look like RIGHT NOW?
3. Financial situation. Income, expenses, debt, assets. Get REAL NUMBERS. Do the math immediately.
4. Family and relationships. Who is in the picture? What is the dynamic?
5. Health and energy. Physical, mental, emotional. For everyone in the household.
6. Work, purpose, and calling. What feeds their soul vs. what pays the bills?
7. Environment. Where do they live? How does it FEEL?
8. Freedom. Time, travel, flexibility.
9. Dreams and desires. The ones they say out loud AND the ones they have buried.
10. What they are tolerating. Low-grade friction they have absorbed.
11. What they are avoiding. The thing underneath the thing.
12. If money were completely handled, what would actually change?

TRANSITIONING BETWEEN DOMAINS (CRITICAL):
The shift from aspirational questions to practical ones is where people are most likely to disengage. Bridge these transitions with care.

Before moving into finances: "What I am about to ask gets more practical, and I know it can feel heavy. But here is why it matters: the vision you just described is real and reachable, and the only way I can help you get there is to understand where things stand right now. No one else will ever see what you share here. Take your time."

Before asking about what they are tolerating or avoiding: "These next questions ask you to look at the parts of your life that are hardest to face. Most people find this the most difficult part. That is not a sign you are doing it wrong. It is a sign you are being honest."

If someone seems stuck: "We can come back to this one later if you would rather keep going with something else first. There is no wrong order here."

LIGHT SCRIPTURE TOUCHES DURING DISCOVERY:
When someone shares something that strongly echoes a biblical narrative, offer a brief, gentle nod. Do not do a full mapping yet. Just plant a seed. Use sparingly, no more than 2-3 times during all of discovery.

PACING AND DEPTH RULES:
- Ask ONE question at a time. Never list multiple questions.
- When a user gives a rich answer, go deeper with 1-2 follow-ups before moving on.
- When a user gives a brief answer, gently probe once. If they stay brief, respect it and move on.
- After every 3-4 domains, name patterns you see across their answers.
- Do NOT number questions out loud. The conversation should feel organic.
- When you have covered all twelve areas: "I have a full picture now. Are you ready for me to show you what I see?"
- Periodically check in: "How are you doing with all of this? Are these questions feeling manageable, or would you like me to slow down?"

QUESTION TECHNIQUE:
- Follow up on what is UNSAID, not just what is said.
- Name patterns as they emerge.
- When someone shares real pain, STOP. Honor it. Do not rush past it.
- Hold two truths simultaneously.
- When numbers are shared, DO THE MATH immediately.
- Be willing to say "no" directly when someone is heading toward self-harm disguised as responsibility.
- If corrected, own it immediately.
- Name what is ABSENT from their answers. Absences reveal values.

${mode === 'couple' ? `
COUPLES PHILOSOPHY:
Your role is CLARITY, not resolution. Help both people see clearly.
- Address each person by name.
- When one speaks for both, gently check with the other.
- Notice bids for connection and name them.
- Notice destructive patterns but reflect, do not label.
- NEVER take sides on staying together or separating.
- NEVER tell someone what God wants for their relationship.
- NEVER minimize a fundamental disagreement.
- When divergence is deep, recommend a couples counselor directly.
- In your opening, add: "You may not agree on everything. That is normal. My job is not to make you agree. My job is to help you both see clearly."
` : ''}

PHASE 2: SYNTHESIS
True desires, core misalignments, five life systems gap analysis, hard truths with evidence from the conversation.

PHASE 3: ARCHITECTURE
Vision statement, 1-year trajectory, 90-day plan with weekly specificity, weekly rhythm, financial strategy with real numbers.

PHASE 4: SCRIPTURAL REFLECTION
NARRATIVE MAPPING, NOT VERSE MATCHING. Find their STORY inside scripture.
- Use the full narrative arc. Respect testament preference (${testament}).
- ONLY reference real, verified passages.
- The tone is "This is where I see you in the story."
- CRITICAL: If you draw a parallel to a dark season in scripture (Job's suffering, the wilderness, exile, the cross), you MUST also show the resolution. Every valley has an exit. Job was restored. The wilderness ended. The exile produced return. The cross led to resurrection. NEVER leave someone sitting in the darkness without showing them what came next and what is coming for them.
- For EACH mapping: a specific body/wellness practice (FREE, no equipment, specific technique), why it works physiologically, the connection to the spiritual reality, and a personal mantra.
- Close with: "This is where I see you right now. But stories move. As yours does, I will be here."
- AFTER your closing line, output a hidden reflection card block in EXACTLY this format (the user will not see this, the app uses it to generate a beautiful keepsake image):

[REFLECTION_CARD]
scripture: [The single most resonant scripture reference, e.g. Isaiah 43:1-3]
verse: [A short excerpt from that scripture, under 15 words]
season: [One sentence describing their current season, personal and specific]
mantra: [Their personal mantra, under 12 words]
[/REFLECTION_CARD]

PHASE 5: ONGOING CHECK-INS
Adjust the plan. Reference previous conversations. Celebrate progress. Call out avoidance with warmth.

CRISIS DETECTION:
If you detect suicidal ideation, self-harm, domestic violence, abuse, or severe crisis:
- 988 Suicide & Crisis Lifeline (call or text 988)
- Crisis Text Line (text HOME to 741741)
- National Domestic Violence Hotline (1-800-799-7233)
Do NOT continue normal flow until safety is addressed.

WHAT YOU NEVER DO:
- Never use em-dashes
- Never be preachy
- Never offer generic advice
- Never minimize pain
- Never claim to speak for God directly
- Never diagnose conditions
- Never promise outcomes
- Never judge financial decisions
- Never mention pricing, subscriptions, or tiers
- Never ask "what do you need help with" or "what would you like to focus on" or any variation. They are here because they do not know what they need. That is your job. Lead them.
- Never leave someone in the darkness of a scripture without showing them the light that follows

YOUR VOICE:
Warm but direct. You use their name. You connect threads across life areas. When something matters, you slow down. You speak like someone who finds each story sacred.

Your deepest purpose is to show evidence, ultimately through scripture, that this person is safe and held in God's light. You are a life coach, a best friend, a kind pastor or rabbi. You have awareness of mindfulness and health. You are a financial advisor, a cheerleader. Someone who reflects that it is not as messy as they think, and that everything can be all right if they just take some little steps. Lots of little steps can cover a tremendous amount of terrain.

The glass is always half full. You do not whitewash real pain and challenges. You reflect them back in scripture and hold a lantern to light the path out. Your message, always, is: everything is actually all right in your life, and a few adjustments and tweaks will make it exactly what you want.

Your tone should always leave someone feeling lighter, not heavier. You give hope. You give encouragement. You hold space. You give ideas. Even when you deliver hard truths, the person should feel held, not exposed. You are not a mirror that only shows what is broken. You are a mirror that shows what is broken AND what is beautiful AND what is possible.

BEGIN:
Welcome them warmly by name. Tell them what is about to happen in 2-3 sentences: you are going to ask real questions about the most important areas of their life, build a concrete plan, and then reflect their story through scripture with body practices. Let them know they can come back anytime. Do NOT ask what they need help with or what they want to focus on. You already know the path. Lead them.

Then ask: "Before we begin, roughly how much time do you have today? There is no wrong answer. We can go deep in one sitting or spread this across a few visits."

After they answer, acknowledge their time and then go directly into Question 1: The Perfect Ordinary Tuesday.
`;
};

const buildFreePrompt = ({ name, testament, lang }) => {
const langInstruction = lang === 'es' ? '\n\nCRITICAL: You MUST respond entirely in Spanish. Every word, every question, every reflection must be in Spanish. Do not use English at all.\n' : '';
return `
You are Nehama, a deeply wise, warm, and direct guide who helps people find where they are in the biblical story.

The name Nehama comes from the Hebrew word for comfort (נֶחָמָה). You are that comfort made personal.

IMPORTANT STYLE RULE: Never use em-dashes. Use commas, periods, semicolons, colons, or restructure sentences instead.
${langInstruction}
Name: ${name}
Scripture preference: ${testament === 'old' ? 'Old Testament only' : testament === 'new' ? 'New Testament only' : 'Both Old and New Testament'}

This is a free reflection session. Ask five meaningful questions, then reflect their current season through biblical scripture. This is a genuine gift.

Ask these five questions, ONE AT A TIME:

1. "Close your eyes for a moment. If three years from now, your life looked exactly the way you wanted it to, what does a regular Tuesday look like? Do not filter for realism."
2. "Now bring yourself back to today. What does your actual daily reality look like right now?"
3. "What is the heaviest thing you are carrying right now? The thing that, if someone took it off your shoulders, would change how you breathe?"
4. "What are you avoiding? Not the small stuff. The deeper thing you know you need to face."
5. "If money were completely handled tomorrow, what would actually change?"

After all five, deliver a scriptural reflection:
- Name 2-3 patterns across their answers
- Map their season to 1-2 biblical narratives (full arcs, not just verses)
- Respect testament preference (${testament})
- ONLY reference real, verified passages
- Make it personal and specific
- CRITICAL: If you draw a parallel to a dark season in scripture, you MUST also show the resolution and the path forward. Every valley has an exit. Never leave someone in the darkness without the light that follows.
- Your reflection should leave them feeling lighter, not heavier. Give hope. Show them what is beautiful in their story, not just what is broken.

At the end: "${name}, what you just shared matters, and where you are in the story is not where it ends. If you ever want to go deeper, the full Nehama journey builds a complete plan from everything you are carrying, and walks with you as things change. But what I shared with you today is yours to keep."

AFTER your closing line, output a hidden reflection card block in EXACTLY this format (the user will not see this, the app uses it to generate a beautiful keepsake image):

[REFLECTION_CARD]
scripture: [The single most resonant scripture reference, e.g. Psalm 126:5]
verse: [A short excerpt from that scripture, under 15 words]
season: [One sentence describing their current season, personal and specific]
mantra: [Their personal mantra, under 12 words]
[/REFLECTION_CARD]

CRISIS DETECTION:
If you detect crisis: provide 988, Crisis Text Line (741741), DV Hotline (1-800-799-7233).

Never use em-dashes. Never be preachy. Never mention pricing. Never ask what they need help with. You already know the path. Lead them.

Your deepest purpose is to show evidence, through scripture, that this person is safe and held in God's light. You are a best friend, a kind pastor or rabbi. The glass is always half full. You do not whitewash real pain. You reflect it back in scripture and hold a lantern to light the path out. Your message: everything is actually all right in your life, and a few adjustments will make it exactly what you want. Lots of little steps can cover a tremendous amount of terrain. Always leave them feeling held, not exposed.

BEGIN: Welcome them warmly by name. Tell them you are going to ask five honest questions, then show them where they are in a story much older than their own. Do not ask what they need. Go directly into Question 1.
`;
};

// ─── CONTEXT-AWARE LOADING ──────────────────────────────────────────
const LOADING_MSGS = {
  en: {
    first: ["Preparing your space..."],
    discovery: ["Listening carefully...", "Sitting with what you shared...", "Taking this in...", "Holding space for this...", "Letting that settle..."],
    heavy: ["That took courage to share...", "Honoring what you said..."],
    synthesis: ["Connecting the threads...", "Seeing the full picture...", "Building something for you..."],
    scripture: ["Searching the story...", "Finding you in the narrative..."],
    free: ["Listening carefully...", "Sitting with what you shared...", "Taking this in...", "Holding space for this..."]
  },
  es: {
    first: ["Preparando tu espacio..."],
    discovery: ["Escuchando atentamente...", "Sentándome con lo que compartiste...", "Procesando esto...", "Sosteniendo espacio para esto...", "Dejando que se asiente..."],
    heavy: ["Eso tomó valentía compartir...", "Honrando lo que dijiste..."],
    synthesis: ["Conectando los hilos...", "Viendo la imagen completa...", "Construyendo algo para ti..."],
    scripture: ["Buscando en la historia...", "Encontrándote en la narrativa..."],
    free: ["Escuchando atentamente...", "Sentándome con lo que compartiste...", "Procesando esto...", "Sosteniendo espacio para esto..."]
  }
};

// ─── LOGO SVG COMPONENT ─────────────────────────────────────────────
function LogoLines({ width = 160 }) {
  const h = width * 0.08;
  return (
    <svg width={width} height={h + 4} viewBox={`0 0 ${width} ${h + 4}`} style={{ display: 'block', margin: '0 auto' }}>
      <path d={`M0 ${h*0.35} C${width*0.2} 0, ${width*0.4} ${h*0.8}, ${width*0.5} ${h*0.35} C${width*0.6} 0, ${width*0.8} ${h*0.7}, ${width} ${h*0.35}`} stroke="#9BAA9F" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d={`M0 ${h*0.65} C${width*0.2} ${h}, ${width*0.4} ${h*0.2}, ${width*0.5} ${h*0.65} C${width*0.6} ${h}, ${width*0.8} ${h*0.3}, ${width} ${h*0.65}`} stroke="#9BAA9F" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

// ─── MARKDOWN RENDERER ──────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let para = [];
  let inTable = false;
  let tableRows = [];
  let key = 0;
  const flush = () => { if (para.length > 0) { const c = para.join('\n'); if (c.trim()) elements.push(<p key={key++} style={{ margin: '0 0 14px 0', lineHeight: '1.8' }}>{inl(c)}</p>); para = []; } };
  const flushTable = () => { if (tableRows.length > 0) { const h = tableRows[0], d = tableRows.slice(2); elements.push(<div key={key++} style={{ overflowX: 'auto', margin: '20px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}><thead><tr>{h.map((c, i) => <th key={i} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.1)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '15px', color: '#4A5D4F' }}>{inl(c.trim())}</th>)}</tr></thead><tbody>{d.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{ padding: '8px 14px', borderBottom: '1px solid rgba(0,0,0,0.04)', color: '#3D3D3D' }}>{inl(c.trim())}</td>)}</tr>)}</tbody></table></div>); tableRows = []; } };
  const inl = (t) => { const p = []; const rx = /\*\*(.+?)\*\*/g; let m, li = 0, ix = 0; while ((m = rx.exec(t)) !== null) { if (m.index > li) p.push(t.slice(li, m.index)); p.push(<strong key={`b${ix++}`} style={{ fontWeight: 500 }}>{m[1]}</strong>); li = rx.lastIndex; } if (li < t.length) p.push(t.slice(li)); return p.length > 0 ? p : t; };
  for (const line of lines) { const t = line.trim(); if (t.startsWith('|') && t.endsWith('|')) { if (!inTable) { flush(); inTable = true; } tableRows.push(t.split('|').filter((_, i) => i > 0 && i < t.split('|').length - 1)); continue; } else if (inTable) { inTable = false; flushTable(); } if (t.startsWith('### ')) { flush(); elements.push(<h4 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, color: '#4A5D4F', margin: '24px 0 8px 0', letterSpacing: '0.3px' }}>{inl(t.slice(4))}</h4>); } else if (t.startsWith('## ')) { flush(); elements.push(<h3 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#4A5D4F', margin: '28px 0 10px 0', letterSpacing: '0.3px' }}>{inl(t.slice(3))}</h3>); } else if (t.startsWith('# ')) { flush(); elements.push(<h2 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#2C2C2C', margin: '32px 0 12px 0' }}>{inl(t.slice(2))}</h2>); } else if (t.startsWith('- ') || t.startsWith('• ')) { flush(); elements.push(<div key={key++} style={{ display: 'flex', gap: '10px', margin: '4px 0 4px 4px', lineHeight: '1.8' }}><span style={{ color: '#8B9E8F', flexShrink: 0, fontSize: '10px', marginTop: '8px' }}>●</span><span>{inl(t.slice(2))}</span></div>); } else if (/^\d+\.\s/.test(t)) { flush(); const n = t.match(/^(\d+)\.\s/)[1]; elements.push(<div key={key++} style={{ display: 'flex', gap: '10px', margin: '4px 0 4px 4px', lineHeight: '1.8' }}><span style={{ color: '#8B9E8F', flexShrink: 0, fontWeight: 500, minWidth: '20px', fontFamily: "'Cormorant Garamond', serif" }}>{n}.</span><span>{inl(t.replace(/^\d+\.\s/, ''))}</span></div>); } else if (t.startsWith('> ')) { flush(); elements.push(<blockquote key={key++} style={{ borderLeft: '2px solid #8B9E8F', paddingLeft: '20px', margin: '16px 0', color: '#4A5D4F', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16px', lineHeight: '1.8' }}>{inl(t.slice(2))}</blockquote>); } else if (t === '') { flush(); } else { para.push(line); } }
  if (inTable) flushTable(); flush(); return elements;
}

// ─── REFLECTION CARD ────────────────────────────────────────────────
function parseReflectionCard(text) {
  const match = text.match(/\[REFLECTION_CARD\]([\s\S]*?)\[\/REFLECTION_CARD\]/);
  if (!match) return null;
  const block = match[1];
  const get = (key) => { const m = block.match(new RegExp(key + ':\\s*(.+)')); return m ? m[1].trim() : ''; };
  return { scripture: get('scripture'), verse: get('verse'), season: get('season'), mantra: get('mantra') };
}

function stripReflectionCard(text) {
  return text.replace(/\[REFLECTION_CARD\][\s\S]*?\[\/REFLECTION_CARD\]/, '').trim();
}

function ReflectionCard({ card, onSave }) {
  return (
    <div style={{ background: '#FEFCF9', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', width: 260, height: 462, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 26px', position: 'relative', boxShadow: '0 1px 12px rgba(0,0,0,0.05)' }}>
      <button onClick={onSave} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#C0C0C0', fontSize: '14px', padding: '4px', lineHeight: 1 }} title="Save">↓</button>
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width="72" height="100" viewBox="-36 0 72 100">
          <path d="M0,96 C-26,65 -34,50 -34,36 A34,34 0 1,1 34,36 C34,50 26,65 0,96 Z" fill="#9BAA9F"/>
          <text x="0" y="31" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fontWeight="600" fill="#FEFCF9" letterSpacing="1.5">YOU ARE</text>
          <text x="0" y="44" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fontWeight="600" fill="#FEFCF9" letterSpacing="1.5">HERE</text>
        </svg>
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#2C2C2C', fontWeight: 600, textAlign: 'center', marginBottom: '22px', letterSpacing: '0.3px' }}>{card.scripture}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#2C2C2C', fontWeight: 400, textAlign: 'center', lineHeight: 1.6, marginBottom: '22px' }}>{card.verse}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#7A7A7A', fontWeight: 400, textAlign: 'center', lineHeight: 1.6, marginBottom: '22px' }}>{card.season}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#2C2C2C', fontWeight: 600, textAlign: 'center', lineHeight: 1.5 }}>{card.mantra}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '9px', color: '#C0C0C0', letterSpacing: '3px', fontWeight: 400, position: 'absolute', bottom: '14px' }}>nehama</div>
    </div>
  );
}

function saveCardAsPNG(card) {
  const w = 1080, h = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  // Outer background
  ctx.fillStyle = '#F0EDE8'; ctx.fillRect(0, 0, w, h);
  // Card with shadow
  const m = 60, cr = 20;
  ctx.shadowColor = 'rgba(0,0,0,0.12)'; ctx.shadowBlur = 40; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#FEFCF9';
  ctx.beginPath();
  ctx.moveTo(m + cr, m); ctx.lineTo(w - m - cr, m); ctx.quadraticCurveTo(w - m, m, w - m, m + cr);
  ctx.lineTo(w - m, h - m - cr); ctx.quadraticCurveTo(w - m, h - m, w - m - cr, h - m);
  ctx.lineTo(m + cr, h - m); ctx.quadraticCurveTo(m, h - m, m, h - m - cr);
  ctx.lineTo(m, m + cr); ctx.quadraticCurveTo(m, m, m + cr, m);
  ctx.closePath(); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.textAlign = 'center';
  // Teardrop pin (cubic beziers matching SVG path)
  const px = w/2, py = 280, r = 78;
  ctx.fillStyle = '#9BAA9F';
  ctx.beginPath();
  ctx.moveTo(px, py + 138);
  ctx.bezierCurveTo(px - 60, py + 67, px - r, py + 32, px - r, py);
  ctx.arc(px, py, r, Math.PI, 0, false);
  ctx.bezierCurveTo(px + r, py + 32, px + 60, py + 67, px, py + 138);
  ctx.closePath();
  ctx.fill();
  // YOU ARE HERE inside pin
  ctx.fillStyle = '#FEFCF9'; ctx.font = '600 28px "Cormorant Garamond", serif';
  ctx.fillText('YOU ARE', px, py - 6);
  ctx.fillText('HERE', px, py + 26);
  // Scripture
  ctx.fillStyle = '#2C2C2C'; ctx.font = '600 52px "Cormorant Garamond", serif';
  ctx.fillText(card.scripture, w/2, 600);
  // Verse
  ctx.fillStyle = '#2C2C2C'; ctx.font = '400 46px "Cormorant Garamond", serif';
  const verseLines = wrapText(ctx, card.verse, w * 0.68);
  let vy = 710;
  verseLines.forEach(line => { ctx.fillText(line, w/2, vy); vy += 60; });
  // Season
  ctx.fillStyle = '#7A7A7A'; ctx.font = '400 44px "Cormorant Garamond", serif';
  const seasonLines = wrapText(ctx, card.season, w * 0.68);
  let sy = vy + 55;
  seasonLines.forEach(line => { ctx.fillText(line, w/2, sy); sy += 56; });
  // Mantra
  ctx.fillStyle = '#2C2C2C'; ctx.font = '600 48px "Cormorant Garamond", serif';
  const mantraLines = wrapText(ctx, card.mantra, w * 0.68);
  let my = Math.max(sy + 55, 1180);
  mantraLines.forEach(line => { ctx.fillText(line, w/2, my); my += 60; });
  // Branding
  ctx.fillStyle = '#C0C0C0'; ctx.font = '400 28px "Cormorant Garamond", serif';
  ctx.fillText('nehama', w/2, 1780);
  canvas.toBlob(blob => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'nehama-reflection.png'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); }, 'image/png');
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const word of words) { const test = line + (line ? ' ' : '') + word; if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else { line = test; } }
  if (line) lines.push(line); return lines;
}

// ─── PHASE INDICATOR ────────────────────────────────────────────────
function getPhaseInfo(messages, tier) {
  if (tier === 'free') return { label: 'Reflection', index: 0, total: 1 };
  const phases = ['Beginning', 'Discovery', 'Synthesis', 'Your Plan', 'Scripture'];
  const aiText = messages.filter(m => m.role === 'assistant').map(m => m.content.toLowerCase()).join(' ');
  let idx = 0;
  if (messages.filter(m => !m.hidden).length > 4) idx = 1;
  if (aiText.includes('i have a full picture') || aiText.includes('what i see') || aiText.includes('tengo una imagen completa')) idx = 2;
  if (aiText.includes('1-year') || aiText.includes('90-day') || aiText.includes('weekly rhythm') || aiText.includes('plan de 1 año') || aiText.includes('ritmo semanal')) idx = 3;
  if (aiText.includes('i see you in the story') || aiText.includes('scriptural reflection') || aiText.includes('te veo en la historia')) idx = 4;
  return { label: phases[idx], index: idx, total: 5 };
}

function PhaseIndicator({ phase }) {
  const dots = phase.total === 1 ? 1 : phase.total;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '10px', fontWeight: 500, color: '#9A9A9A', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{phase.label}</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {Array.from({ length: dots }).map((_, i) => (
          <div key={i} style={{ width: i <= phase.index ? '12px' : '6px', height: '3px', borderRadius: '2px', background: i <= phase.index ? '#9BAA9F' : 'rgba(0,0,0,0.08)', transition: 'all 0.4s ease' }} />
        ))}
      </div>
    </div>
  );
}

// ─── TOGGLE BUTTON ──────────────────────────────────────────────────
function Tog({ active, children, onClick, small }) {
  return <button onClick={onClick} style={{ flex: 1, padding: small ? '8px 6px' : '10px 14px', fontSize: small ? '13px' : '14px', fontFamily: "'DM Sans', sans-serif", fontWeight: active ? 500 : 400, border: 'none', cursor: 'pointer', background: active ? 'rgba(74,90,80,0.1)' : 'transparent', color: active ? '#4A5A50' : '#B0B0B0', transition: 'all 0.25s ease', letterSpacing: '0.2px' }}>{children}</button>;
}

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '2px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif" }}>
      <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'en' ? '#4A5A50' : '#C0C0C0', fontWeight: lang === 'en' ? 500 : 400, fontSize: '12px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.5px' }}>EN</button>
      <span style={{ color: '#D0D0D0', fontSize: '12px', lineHeight: '28px' }}>|</span>
      <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'es' ? '#4A5A50' : '#C0C0C0', fontWeight: lang === 'es' ? 500 : 400, fontSize: '12px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.5px' }}>ES</button>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function NehamaApp() {
  const [authorized, setAuthorized] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [screen, setScreen] = useState('welcome');
  const [tier, setTier] = useState(null);
  const [mode, setMode] = useState('individual');
  const [testament, setTestament] = useState('both');
  const [lang, setLang] = useState('en');
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [anim, setAnim] = useState({ text: false, paths: false });
  const messagesEndRef = useRef(null);
  const loadingMsgIndexRef = useRef(0);
  const t = T[lang];

  useEffect(() => { if (typeof window !== 'undefined') { const s = localStorage.getItem('nehama-authorized'); if (s === 'true') setAuthorized(true); const savedLang = localStorage.getItem('nehama-lang'); if (savedLang) setLang(savedLang); } }, []);

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('nehama-lang', lang); }, [lang]);

  useEffect(() => {
    if (!authorized) return;
    try { const s = localStorage.getItem('nehama-session'); if (s) { const d = JSON.parse(s); if (d.messages && d.messages.length > 0) { setTier(d.tier); setMode(d.mode || 'individual'); setTestament(d.testament || 'both'); setLang(d.lang || 'en'); setUserName(d.userName || ''); setPartnerName(d.partnerName || ''); setMessages(d.messages); setScreen('chat'); return; } } } catch (e) {}
    setScreen('welcome'); setTimeout(() => setAnim(a => ({ ...a, text: true })), 200); setTimeout(() => setAnim(a => ({ ...a, paths: true })), 600);
  }, [authorized]);

  useEffect(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  const saveSession = useCallback((msgs) => { try { localStorage.setItem('nehama-session', JSON.stringify({ tier, mode, testament, lang, userName, partnerName, messages: msgs })); } catch (e) {} }, [tier, mode, testament, lang, userName, partnerName]);

  const sendMessage = useCallback(async (userContent, hidden = false) => {
    const userMsg = { role: 'user', content: userContent, hidden };
    const updated = [...messages, userMsg];
    setMessages(updated); setInput(''); setIsLoading(true);
    const msgCount = updated.filter(m => !m.hidden).length;
    const lastAiText = messages.filter(m => m.role === 'assistant').slice(-1).map(m => m.content.toLowerCase()).join('');
    const hasHeavy = userContent.toLowerCase().match(/died|death|divorce|abuse|scared|hopeless|debt|owe|crisis|panic|er visit|emergency|broke|afraid|can't take|crying|overwhelm|murió|muerte|divorcio|abuso|miedo|deuda|crisis|pánico|emergencia/);
    const lm = LOADING_MSGS[lang] || LOADING_MSGS.en;
    let pool;
    if (msgCount <= 1) pool = lm.first;
    else if (tier === 'free') pool = lm.free;
    else if (lastAiText.includes('i have a full picture') || lastAiText.includes('what i see') || lastAiText.includes('tengo una imagen completa')) pool = lm.synthesis;
    else if (lastAiText.includes('scripture') || lastAiText.includes('narrative') || lastAiText.includes('escritura') || lastAiText.includes('narrativa')) pool = lm.scripture;
    else if (hasHeavy) pool = lm.heavy;
    else pool = lm.discovery;
    const idx = loadingMsgIndexRef.current % pool.length;
    setLoadingMsg(pool[idx]);
    loadingMsgIndexRef.current = idx + 1;
    try {
      const sysPrompt = tier === 'free' ? buildFreePrompt({ name: userName, testament, lang }) : buildFullPrompt({ name: userName, partnerName, mode, testament, lang });
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sysPrompt, messages: updated.map(m => ({ role: m.role, content: m.content })) }) });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message || 'API error');
      const text = data.content ? data.content.map(c => c.text || '').filter(Boolean).join('\n') : (lang === 'es' ? 'Tuve un problema de conexión. Por favor intenta de nuevo.' : 'I encountered an issue. Please try again.');
      const final = [...updated, { role: 'assistant', content: text }];
      setMessages(final); saveSession(final);
    } catch (err) { setMessages([...updated, { role: 'assistant', content: (lang === 'es' ? 'Tengo problemas de conexión. Por favor intenta de nuevo.' : 'I am having trouble connecting. Please try again.') + '\n\n*' + err.message + '*' }]); }
    setIsLoading(false);
  }, [messages, tier, userName, partnerName, mode, testament, lang, saveSession]);

  const handleCodeSubmit = () => { const code = codeInput.trim().toUpperCase(); const accept = (access) => { setAuthorized(true); localStorage.setItem('nehama-authorized', 'true'); localStorage.setItem('nehama-access', access); if (access === 'scholarship') localStorage.setItem('nehama-code', code); setCodeError(false); setTimeout(() => setAnim(a => ({ ...a, text: true })), 200); setTimeout(() => setAnim(a => ({ ...a, paths: true })), 600); }; if (code === INVITE_CODE.toUpperCase()) accept('beta'); else if (code === GIFT_CODE.toUpperCase()) accept('lifetime'); else if (code.startsWith('GRACE')) { accept('scholarship'); fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _subject: 'Nehama Scholarship Code Used', code: code }) }); } else setCodeError(true); };
  const handleStartFree = () => { if (!userName.trim()) return; setTier('free'); setScreen('chat'); const intro = lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + '. Estoy aquí para la reflexión gratuita.' : 'Hello. My name is ' + userName.trim() + '. I am here for the free reflection.'; setTimeout(() => sendMessage(intro, true), 300); };
  const handleStartFull = () => { if (!userName.trim()) return; if (mode === 'couple' && !partnerName.trim()) return; setTier('full'); setScreen('chat'); const intro = mode === 'couple' ? (lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + ' y estoy aquí con mi pareja, ' + partnerName.trim() + '. Nos gustaría comenzar el viaje completo juntos.' : 'Hello. My name is ' + userName.trim() + ' and I am here with my partner, ' + partnerName.trim() + '. We would like to begin the full journey together.') : (lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + '. Estoy listo para comenzar el viaje completo.' : 'Hello. My name is ' + userName.trim() + '. I am ready to begin the full journey.'); setTimeout(() => sendMessage(intro, true), 300); };
  const handleReset = () => { try { localStorage.removeItem('nehama-session'); } catch (e) {} setMessages([]); setUserName(''); setPartnerName(''); setTier(null); setMode('individual'); setTestament('both'); setShowSettings(false); setEmailSubmitted(false); setFeedbackEmail(''); setScreen('welcome'); setTimeout(() => setAnim(a => ({ ...a, text: true })), 200); setTimeout(() => setAnim(a => ({ ...a, paths: true })), 600); };
  const handleDownload = () => { const ai = messages.filter(m => m.role === 'assistant').map(m => m.content).join('\n\n---\n\n'); const d = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); const ttl = tier === 'free' ? 'Your Scriptural Reflection' : 'Your Life Architecture Session'; const doc = 'NEHAMA: FIND COMFORT\n' + ttl + '\n' + d + '\n' + userName + (mode === 'couple' ? ' & ' + partnerName : '') + '\n\n' + '='.repeat(48) + '\n\n' + ai + '\n\n' + '='.repeat(48) + '\n\nThis is yours to keep.\n'; const b = new Blob([doc], { type: 'text/plain' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'nehama-' + (tier === 'free' ? 'reflection' : 'session') + '.txt'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u); };
  const handleSend = () => { if (!input.trim() || isLoading) return; sendMessage(input.trim()); };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const freeSessionComplete = tier === 'free' && messages.some(m => m.role === 'assistant' && (m.content.toLowerCase().includes('yours to keep') || m.content.toLowerCase().includes('full nehama journey') || m.content.toLowerCase().includes('tuyo para guardar') || m.content.toLowerCase().includes('viaje completo')));

  const inputStyle = { width: '100%', padding: '13px 16px', fontSize: '15px', fontFamily: "'DM Sans', sans-serif", border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', background: '#fff', color: '#2C2C2C', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' };
  const toggleGroupStyle = { display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' };
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9A9A9A', marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" };

  // ─── CONTACT MODAL ─────
  const contactModalJSX = showContact ? (<>
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.12)', zIndex: 200, backdropFilter: 'blur(4px)' }} onClick={() => { setShowContact(false); setContactSent(false); }} />
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#FEFCF9', borderRadius: '12px', padding: '36px', width: '90%', maxWidth: '380px', zIndex: 201, boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#2C2C2C' }}>{t.getInTouch}</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#AAAAAA', padding: '4px' }} onClick={() => { setShowContact(false); setContactSent(false); }}>×</button>
      </div>
      {contactSent ? (
        <p style={{ fontSize: '15px', color: '#4A5D4F', lineHeight: 1.6 }}>{t.thankYou}</p>
      ) : (<>
        <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.emailLabel} type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />
        <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', lineHeight: '1.6', marginBottom: '16px' }} placeholder={t.msgLabel} value={contactMsg} onChange={e => setContactMsg(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />
        <button onClick={() => { if (contactEmail.includes('@') && contactMsg.trim()) { fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: contactEmail, message: contactMsg, _subject: 'Nehama Contact Form' }) }); setContactSent(true); setContactEmail(''); setContactMsg(''); } }} style={{ width: '100%', padding: '13px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#4A5D4F', color: '#FEFCF9', letterSpacing: '0.5px', opacity: contactEmail.includes('@') && contactMsg.trim() ? 1 : 0.4 }}>{t.send}</button>
      </>)}
    </div>
  </>) : null;

  // ─── INVITE CODE ─────
  if (!authorized) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
      <LangSwitch lang={lang} setLang={setLang} />
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: '#4A5A50', letterSpacing: '4px', marginBottom: '8px' }}>Nehama</div>
        <LogoLines width={140} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#9A9A9A', marginTop: '10px', letterSpacing: '3px', fontWeight: 300 }}>{t.tagline}</p>
      </div>
      <div style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#9A9A9A', marginBottom: '16px', lineHeight: 1.6, letterSpacing: '0.5px' }}>{t.invitePrompt}</p>
        <input style={{ ...inputStyle, textAlign: 'center', fontSize: '18px', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '4px', textTransform: 'uppercase', borderColor: codeError ? '#C48282' : 'rgba(0,0,0,0.08)' }} placeholder={t.invitePlaceholder} value={codeInput} onChange={e => { setCodeInput(e.target.value); setCodeError(false); }} onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()} />
        {codeError && <p style={{ fontSize: '13px', color: '#C48282', marginTop: '10px' }}>{t.codeError}</p>}
        <button onClick={handleCodeSubmit} style={{ width: '100%', marginTop: '16px', padding: '13px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#4A5D4F', color: '#FEFCF9', letterSpacing: '1px' }}>{t.enter}</button>
        <p style={{ fontSize: '11px', color: '#C0C0C0', marginTop: '20px' }}>{t.privacyNote}</p>
      </div>
    </div>
  );

  // ─── WELCOME ─────
  if (screen === 'welcome') return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <LangSwitch lang={lang} setLang={setLang} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px 40px', minHeight: '100vh' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px', opacity: anim.text ? 1 : 0, transform: anim.text ? 'translateY(0)' : 'translateY(16px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', fontWeight: 300, color: '#4A5A50', letterSpacing: '5px', marginBottom: '8px' }}>Nehama</div>
          <LogoLines width={180} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#9A9A9A', marginTop: '10px', letterSpacing: '3px', fontWeight: 300 }}>{t.tagline}</p>
        </div>

        {/* Blurb */}
        <div style={{ maxWidth: '440px', textAlign: 'center', marginBottom: '48px', opacity: anim.text ? 1 : 0, transform: anim.text ? 'translateY(0)' : 'translateY(12px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', color: '#2C2C2C', lineHeight: 1.7, margin: '0 0 14px 0', fontWeight: 400 }}>{t.blurbIntro}</p>
          <p style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: t.blurbBody }} />
        </div>

        {/* What is Nehama */}
        <div style={{ width: '100%', maxWidth: '480px', marginBottom: '20px', opacity: anim.paths ? 1 : 0, transition: 'opacity 0.6s' }}>
          <button onClick={() => setShowAbout(!showAbout)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#8B9E8F', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', letterSpacing: '1px' }}>
            {showAbout ? '▾' : '▸'} {t.whatIsTitle}
          </button>
          {showAbout && (
            <div style={{ padding: '28px 4px', marginTop: '8px', animation: 'fadeIn 0.4s ease', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '14px', color: '#2C2C2C', lineHeight: 1.8, margin: '0 0 16px 0' }} dangerouslySetInnerHTML={{ __html: t.whatIs1 }} />
              <p style={{ fontSize: '14px', color: '#5A5A5A', lineHeight: 1.8, margin: '0 0 16px 0' }}>{t.whatIs2}</p>
              <p style={{ fontSize: '14px', color: '#5A5A5A', lineHeight: 1.8, margin: '0 0 16px 0' }}>{t.whatIs3}</p>
              <p style={{ fontSize: '14px', color: '#5A5A5A', lineHeight: 1.8, margin: '0 0 16px 0' }}>{t.whatIs4}</p>
              <p style={{ fontSize: '14px', color: '#2C2C2C', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{t.whatIs5}</p>
            </div>
          )}
        </div>

        {/* Two paths */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '480px', opacity: anim.paths ? 1 : 0, transform: anim.paths ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>

          {/* FREE */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#2C2C2C' }}>{t.freeTitle}</span>
              <span style={{ fontSize: '10px', fontWeight: 500, color: '#8B9E8F', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t.freeTag}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.7, margin: '0 0 20px 0' }}>{t.freeDesc}</p>
            <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.namePlaceholder} value={userName} onChange={e => setUserName(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />
            <label style={labelStyle}>{t.scriptureLabel}</label>
            <div style={{ ...toggleGroupStyle, marginBottom: '16px' }}>
              <Tog active={testament === 'old'} onClick={() => setTestament('old')}>{t.otLabel}</Tog>
              <Tog active={testament === 'both'} onClick={() => setTestament('both')}>{t.bothLabel}</Tog>
              <Tog active={testament === 'new'} onClick={() => setTestament('new')}>{t.ntLabel}</Tog>
            </div>
            <button onClick={handleStartFree} style={{ width: '100%', padding: '13px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: '1px solid #4A5D4F', borderRadius: '8px', cursor: 'pointer', background: 'transparent', color: '#4A5D4F', transition: 'all 0.25s', letterSpacing: '0.5px', opacity: userName.trim() ? 1 : 0.4 }} onMouseEnter={e => { if (userName.trim()) { e.target.style.background = '#4A5D4F'; e.target.style.color = '#FEFCF9'; }}} onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#4A5D4F'; }}>{t.startFree}</button>
          </div>

          {/* FULL */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#2C2C2C' }}>{t.fullTitle}</span>
              <span style={{ fontSize: '10px', fontWeight: 500, color: '#FEFCF9', background: '#4A5D4F', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t.fullTag}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#5A5A5A', lineHeight: 1.7, margin: '0 0 4px 0' }}>{t.fullDesc}</p>
            <p style={{ fontSize: '13px', color: '#9A9A9A', lineHeight: 1.6, margin: '0 0 20px 0' }}>{t.fullDesc2}</p>
            <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.namePlaceholder} value={userName} onChange={e => setUserName(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />
            <label style={labelStyle}>{t.modeLabel}</label>
            <div style={{ ...toggleGroupStyle, marginBottom: '12px' }}>
              <Tog active={mode === 'individual'} onClick={() => setMode('individual')}>{t.justMe}</Tog>
              <Tog active={mode === 'couple'} onClick={() => setMode('couple')}>{t.withPartner}</Tog>
            </div>
            {mode === 'couple' && <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.partnerPlaceholder} value={partnerName} onChange={e => setPartnerName(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />}
            <label style={labelStyle}>{t.scriptureLabel}</label>
            <div style={{ ...toggleGroupStyle, marginBottom: '16px' }}>
              <Tog active={testament === 'old'} onClick={() => setTestament('old')}>{t.otLabel}</Tog>
              <Tog active={testament === 'both'} onClick={() => setTestament('both')}>{t.bothLabel}</Tog>
              <Tog active={testament === 'new'} onClick={() => setTestament('new')}>{t.ntLabel}</Tog>
            </div>
            <button onClick={handleStartFull} style={{ width: '100%', padding: '14px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#4A5D4F', color: '#FEFCF9', letterSpacing: '0.5px', opacity: userName.trim() && (mode === 'individual' || partnerName.trim()) ? 1 : 0.4 }}>{t.startFull}</button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', textAlign: 'center', maxWidth: '400px' }}>
          <p style={{ fontSize: '12px', color: '#B0B0B0', lineHeight: 1.7, margin: '0 0 8px 0', fontStyle: 'italic' }}>{t.footerBuilt}</p>
          <p style={{ fontSize: '11px', color: '#C8C8C8', lineHeight: 1.6, margin: '0 0 4px 0' }}>{t.footerPrivacy}</p>
          <p style={{ fontSize: '11px', color: '#C8C8C8', lineHeight: 1.6, margin: '0 0 8px 0' }}>{t.footerCrisis}</p>
          <p style={{ fontSize: '11px', color: '#D0D0D0', margin: '0 0 4px 0' }}><span style={{ cursor: 'pointer', color: '#B0B0B0' }} onClick={() => setShowContact(true)}>{t.contactUs}</span></p>
          <p style={{ fontSize: '11px', color: '#D0D0D0', margin: 0 }}><a href="/terms" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Terms</a><span style={{ margin: '0 10px' }}>·</span><a href="/privacy" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Privacy</a></p>
        </div>
      </div>
      {contactModalJSX}
    </div>
  );

  // ─── CHAT ─────
  const phase = getPhaseInfo(messages, tier);
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)', background: 'rgba(254,252,249,0.92)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 300, color: '#4A5A50', letterSpacing: '2px' }}>Nehama</span>
            <PhaseIndicator phase={phase} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {messages.filter(m => m.role === 'assistant').length > 0 && <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#B0B0B0', fontSize: '15px' }} onClick={handleDownload} title={t.save}>↓</button>}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#B0B0B0', fontSize: '18px' }} onClick={() => setShowSettings(true)}>⚙</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.filter(m => !m.hidden).map((msg, i) => (
            <div key={i} style={msg.role === 'user' ? { maxWidth: '80%', alignSelf: 'flex-end', background: '#4A5D4F', color: '#FEFCF9', padding: '14px 20px', borderRadius: '16px 16px 4px 16px', fontSize: '15px', lineHeight: '1.7' } : { maxWidth: '100%', alignSelf: 'flex-start', padding: '4px 0', fontSize: '15px', lineHeight: '1.8', color: '#2C2C2C' }}>
              {msg.role === 'user' ? <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div> : <div>{renderMarkdown(stripReflectionCard(msg.content))}</div>}
            </div>
          ))}

          {(() => {
            const lastAi = [...messages].reverse().find(m => m.role === 'assistant');
            const card = lastAi ? parseReflectionCard(lastAi.content) : null;
            if (!card) return null;
            return (
              <div style={{ alignSelf: 'center', paddingTop: '16px', animation: 'fadeIn 0.8s ease' }}>
                <ReflectionCard card={card} onSave={() => saveCardAsPNG(card)} />
              </div>
            );
          })()}

          {isLoading && (
            <div style={{ alignSelf: 'flex-start', padding: '12px 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(i => <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#8B9E8F', animation: `pulse 1.4s ease-in-out ${i*0.2}s infinite` }} />)}</div>
              <span style={{ fontSize: '13px', color: '#B0B0B0', fontStyle: 'italic', letterSpacing: '0.3px' }}>{loadingMsg}</span>
            </div>
          )}

          {freeSessionComplete && !emailSubmitted && (
            <div style={{ alignSelf: 'flex-start', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '24px', width: '100%', maxWidth: '400px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#2C2C2C', margin: '0 0 6px 0' }}>{t.emailCapture}</p>
              <p style={{ fontSize: '13px', color: '#9A9A9A', margin: '0 0 14px 0' }}>{t.emailCaptureDesc}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="your@email.com" type="email" value={feedbackEmail} onChange={e => setFeedbackEmail(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} />
                <button onClick={() => { if (feedbackEmail.includes('@')) { fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: feedbackEmail, _subject: 'Nehama Email Signup' }) }); setEmailSubmitted(true); } }} style={{ padding: '12px 24px', fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#4A5D4F', color: '#FEFCF9', flexShrink: 0 }}>{t.send}</button>
              </div>
            </div>
          )}
          {emailSubmitted && <p style={{ fontSize: '14px', color: '#4A5D4F', padding: '12px 0' }}>{t.thankYou}</p>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.04)', background: 'rgba(254,252,249,0.95)' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <textarea style={{ flex: 1, padding: '13px 16px', fontSize: '15px', fontFamily: "'DM Sans', sans-serif", border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', background: '#fff', color: '#2C2C2C', outline: 'none', resize: 'none', minHeight: '46px', maxHeight: '120px', lineHeight: '1.6', transition: 'border-color 0.2s' }} placeholder={t.inputPlaceholder} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} onFocus={e => e.target.style.borderColor = 'rgba(0,0,0,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'} rows={1} />
            <button style={{ width: '46px', height: '46px', borderRadius: '10px', border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'default', background: input.trim() && !isLoading ? '#4A5D4F' : 'rgba(0,0,0,0.06)', color: input.trim() && !isLoading ? '#FEFCF9' : '#C0C0C0', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }} onClick={handleSend}>↑</button>
          </div>
        </div>
      </div>

      {/* Settings drawer */}
      {showSettings && <>
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.08)', zIndex: 100, backdropFilter: 'blur(4px)' }} onClick={() => setShowSettings(false)} />
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '300px', maxWidth: '85vw', background: '#FEFCF9', zIndex: 101, padding: '36px 28px', boxShadow: '-8px 0 32px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#2C2C2C' }}>{t.settings}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#AAAAAA', fontSize: '22px' }} onClick={() => setShowSettings(false)}>×</button>
          </div>
          <div>
            <label style={labelStyle}>{t.langLabel}</label>
            <div style={toggleGroupStyle}>
              <Tog active={lang === 'en'} onClick={() => setLang('en')}>English</Tog>
              <Tog active={lang === 'es'} onClick={() => setLang('es')}>Español</Tog>
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t.scriptureLabel}</label>
            <div style={toggleGroupStyle}>
              <Tog active={testament === 'old'} onClick={() => setTestament('old')}>{t.otLabel}</Tog>
              <Tog active={testament === 'both'} onClick={() => setTestament('both')}>{t.bothLabel}</Tog>
              <Tog active={testament === 'new'} onClick={() => setTestament('new')}>{t.ntLabel}</Tog>
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t.session}</label>
            <p style={{ fontSize: '14px', color: '#5A5A5A' }}>{userName}{mode === 'couple' ? ' & ' + partnerName : ''} · {tier === 'free' ? t.freeTitle : t.fullTitle} · {messages.filter(m => !m.hidden).length} {t.messages}</p>
          </div>
          {tier === 'free' && (
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '20px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#2C2C2C', margin: '0 0 6px 0' }}>{t.readyFull}</p>
              <p style={{ fontSize: '13px', color: '#8A8A8A', margin: '0 0 14px 0', lineHeight: 1.6 }}>{t.readyFullDesc}</p>
              <button style={{ width: '100%', padding: '11px', fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#4A5D4F', color: '#FEFCF9' }} onClick={() => { setShowSettings(false); handleReset(); }}>{t.startFullJourney}</button>
            </div>
          )}
          <div>
            <span style={{ fontSize: '12px', cursor: 'pointer', color: '#B0B0B0' }} onClick={() => { setShowSettings(false); setShowContact(true); }}>{t.contactUs}</span>
          </div>
          <button style={{ padding: '11px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', cursor: 'pointer', background: 'transparent', color: '#9A9A9A', marginTop: 'auto' }} onClick={() => { if (confirm(t.newSessionConfirm)) handleReset(); }}>{t.newSession}</button>
        </div>
      </>}
      {contactModalJSX}
    </div>
  );
}
