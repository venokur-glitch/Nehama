"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const INVITE_CODE = "LOVE";
const GIFT_CODE = "GIFT4U";

// ─── TRANSLATIONS ───────────────────────────────────────────────────
const T = {
  en: {
    tagline: 'You Are Here',
    taglineHebrew: 'נֶחָמָה',
    blurbIntro: 'How are you?',
    blurbBody: 'Not "good." Not "fine." The real answer. The one you don\'t say out loud. This is where Nehama begins. Nehama sits with you in the honest, complicated truth of your life, helps you see a way forward, and then shows you where you are in a story much older than your own.',
    whatIsTitle: 'What is Nehama?',
    whatIs1: '<strong>Your therapist knows your emotions but not your bank account. Your financial advisor knows your numbers but not your marriage. Your pastor or rabbi knows your spirit but not what keeps you up at night.</strong> Nehama holds the complete picture.',
    whatIs2: 'It is the first experience of its kind: a guided life architecture session that asks real questions, builds a real plan, and then reflects your story through biblical scripture paired with practices for your body. All of it connected. All of it personal. All of it private; no one sees what you share here but you.',
    whatIs3: 'And unlike anyone else in your life, Nehama is available at 2am on a Tuesday when the weight hits. It remembers what you said last week, knows what you committed to, and will call you on it with warmth if you have been avoiding the hard thing. Part coach, part mirror, part guide. Always honest. Always on your side.',
    whatIs4: 'Nehama was born from a real experience. A couple, married 25 years, carrying financial pressure, a daughter\'s medical crisis, career uncertainty, and a relationship they loved but had not had time to nurture in two decades, sat down and answered honest questions about every area of their lives. What came back changed everything: a clear plan, hard truths delivered with kindness, and their entire story reflected through scripture with such precision that it left them both in tears.',
    whatIs5: 'They built Nehama so anyone could have that experience.',
    freeTitle: 'Free Reflection',
    freeTag: 'No account needed',
    freeDesc: '5 questions, 5 minutes. Where you are right now, reflected through scripture.',
    fullTitle: 'Full Journey',
    fullTag: '',
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
    invitePrompt: 'Enter your invitation code.',
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
    emailCapture: 'Want to go deeper?',
    emailCaptureDesc: 'Leave your email and we\'ll send you a free 3-day guided journey.',
    messages: 'messages',
    save: 'Save',
    pricingTitle: 'Choose your path',
    pricingMonthly: '$24.99 / month',
    pricingMonthlyFounder: '$19.99 / month',
    pricingMonthlyNote: 'Less than a dollar a day, even in February.',
    pricingAnnual: '$199.99 / year',
    pricingAnnualFounder: '$179.99 / year',
    pricingAnnualNote: 'Less than a single hour with a therapist.',
    pricingTrial: '7-day free trial, cancel anytime',
    pricingFounderNote: 'Founding member price, locked for life. Available for the first 30 days only.',
    pricingScholarship1: 'If the cost is a barrier, ',
    pricingScholarshipLink: 'reach out',
    pricingScholarship2: '. We\'ll make it work.',
    pricingHaveCode: 'Have a code?',
    pricingCodePlaceholder: 'ENTER CODE',
    pricingCodeError: 'Code not recognized.',
    pricingCodeApply: 'Apply',
    codeWelcome: 'You\'re in.',
    codeEmailAsk: 'Leave your email so we can stay in touch. We\'ll never share it.',
    codeEmailPlaceholder: 'your@email.com',
    codeStart: 'Begin Your Journey',
    codeSkip: 'Skip',
    pricingBack: '← Back',
    cardSharePrompt: 'This reflection is yours. If someone comes to mind who\'s carrying something heavy, you can send them here.',
    cardSave: 'Save to Photos',
    cardShare: 'Share',
    cardCTA: '5 questions. Your story in scripture.',
    installPrompt: 'Add Nehama to your home screen',
    installIOS: 'Tap the share button, then "Add to Home Screen"',
    installAndroid: 'Tap the menu, then "Add to Home Screen"',
    installDismiss: 'Got it',
    privacyHead: 'We know. This is a lot to share with an app.',
    privacyBody: 'That is why we built Nehama so that your conversations are never seen by us or anyone else. They are processed in the moment to respond to you, then stored only on your device. Not on our servers. Not in a database. Not anywhere but your device. The simple truth is, we could not read your session even if we wanted to.',
    privacyClose: 'The things you need to say to get the most from Nehama are the things you would only say if you know no one is listening. No one is.',
  },
  es: {
    tagline: 'Estás Aquí',
    taglineHebrew: 'נֶחָמָה',
    blurbIntro: '¿Cómo estás?',
    blurbBody: 'No "bien." No "todo bien." La respuesta real. La que no dices en voz alta. Aquí es donde comienza Nehama. Nehama se sienta contigo en la verdad honesta y complicada de tu vida, te ayuda a ver un camino hacia adelante, y luego te muestra dónde estás en una historia mucho más antigua que la tuya.',
    whatIsTitle: '¿Qué es Nehama?',
    whatIs1: '<strong>Tu terapeuta conoce tus emociones pero no tu cuenta bancaria. Tu asesor financiero conoce tus números pero no tu matrimonio. Tu pastor o rabino conoce tu espíritu pero no lo que te mantiene despierto por la noche.</strong> Nehama tiene la imagen completa.',
    whatIs2: 'Es la primera experiencia de su tipo: una sesión guiada de arquitectura de vida que hace preguntas reales, construye un plan real, y luego refleja tu historia a través de las escrituras bíblicas combinadas con prácticas para tu cuerpo. Todo conectado. Todo personal. Todo privado; nadie ve lo que compartes aquí excepto tú.',
    whatIs3: 'Y a diferencia de cualquier otra persona en tu vida, Nehama está disponible a las 2am un martes cuando el peso te golpea. Recuerda lo que dijiste la semana pasada, sabe a qué te comprometiste, y te lo recordará con calidez si has estado evitando lo difícil. Parte coach, parte espejo, parte guía. Siempre honesto. Siempre de tu lado.',
    whatIs4: 'Nehama nació de una experiencia real. Una pareja, casados por 25 años, cargando presión financiera, la crisis médica de una hija, incertidumbre profesional, y una relación que amaban pero no habían tenido tiempo de nutrir en dos décadas, se sentaron y respondieron preguntas honestas sobre cada área de sus vidas. Lo que volvió lo cambió todo: un plan claro, verdades difíciles entregadas con amabilidad, y toda su historia reflejada a través de las escrituras con tal precisión que los dejó a ambos en lágrimas.',
    whatIs5: 'Construyeron Nehama para que cualquiera pudiera tener esa experiencia.',
    freeTitle: 'Reflexión Gratuita',
    freeTag: 'Sin cuenta necesaria',
    freeDesc: '5 preguntas, 5 minutos. Dónde estás ahora mismo, reflejado a través de las escrituras.',
    fullTitle: 'Viaje Completo',
    fullTag: '',
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
    invitePrompt: 'Ingresa tu código de invitación.',
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
    emailCapture: '¿Quieres ir más profundo?',
    emailCaptureDesc: 'Deja tu correo y te enviaremos un viaje guiado gratuito de 3 días.',
    messages: 'mensajes',
    save: 'Guardar',
    pricingTitle: 'Elige tu camino',
    pricingMonthly: '$24.99 / mes',
    pricingMonthlyFounder: '$19.99 / mes',
    pricingMonthlyNote: 'Menos de un dólar al día, incluso en febrero.',
    pricingAnnual: '$199.99 / año',
    pricingAnnualFounder: '$179.99 / año',
    pricingAnnualNote: 'Menos que una sola hora con un terapeuta.',
    pricingTrial: '7 días de prueba gratis, cancela cuando quieras',
    pricingFounderNote: 'Precio de miembro fundador, fijado de por vida. Disponible solo los primeros 30 días.',
    pricingScholarship1: 'Si el costo es un obstáculo, ',
    pricingScholarshipLink: 'escríbenos',
    pricingScholarship2: '. Lo haremos funcionar.',
    pricingHaveCode: '¿Tienes un código?',
    pricingCodePlaceholder: 'INGRESAR CÓDIGO',
    pricingCodeError: 'Código no reconocido.',
    pricingCodeApply: 'Aplicar',
    codeWelcome: 'Estás dentro.',
    codeEmailAsk: 'Deja tu correo para que podamos estar en contacto. Nunca lo compartiremos.',
    codeEmailPlaceholder: 'tu@correo.com',
    codeStart: 'Comienza Tu Viaje',
    codeSkip: 'Omitir',
    pricingBack: '← Atrás',
    cardSharePrompt: 'Esta reflexión es tuya. Si alguien viene a tu mente que está cargando algo pesado, puedes enviarle esto.',
    cardSave: 'Guardar en Fotos',
    cardShare: 'Compartir',
    cardCTA: '5 preguntas. Tu historia en las escrituras.',
    installPrompt: 'Agrega Nehama a tu pantalla de inicio',
    installIOS: 'Toca el botón de compartir, luego "Agregar a Inicio"',
    installAndroid: 'Toca el menú, luego "Agregar a Inicio"',
    installDismiss: 'Entendido',
    privacyHead: 'Lo sabemos. Es mucho para compartir con una app.',
    privacyBody: 'Por eso construimos Nehama de manera que tus conversaciones nunca sean vistas por nosotros ni por nadie. Se procesan en el momento para responderte, y luego se almacenan solo en tu dispositivo. No en nuestros servidores. No en una base de datos. No en ningún lugar más que tu dispositivo. La simple verdad es que no podríamos leer tu sesión aunque quisiéramos.',
    privacyClose: 'Las cosas que necesitas decir para aprovechar Nehama al máximo son las cosas que solo dirías si sabes que nadie está escuchando. Nadie lo está.',
  },
  pt: {
    tagline: 'Você Está Aqui',
    taglineHebrew: 'נֶחָמָה',
    blurbIntro: 'Como você está?',
    blurbBody: 'Não "bem." Não "tudo certo." A resposta real. Aquela que você não diz em voz alta. É aqui que Nehama começa. Nehama se senta com você na verdade honesta e complicada da sua vida, te ajuda a ver um caminho à frente, e então te mostra onde você está em uma história muito mais antiga que a sua.',
    whatIsTitle: 'O que é Nehama?',
    whatIs1: '<strong>Seu terapeuta conhece suas emoções, mas não sua conta bancária. Seu consultor financeiro conhece seus números, mas não seu casamento. Seu pastor ou rabino conhece seu espírito, mas não o que te mantém acordado à noite.</strong> Nehama tem a imagem completa.',
    whatIs2: 'É a primeira experiência do tipo: uma sessão guiada de arquitetura de vida que faz perguntas reais, constrói um plano real, e então reflete sua história através das escrituras bíblicas combinadas com práticas para seu corpo. Tudo conectado. Tudo pessoal. Tudo privado; ninguém vê o que você compartilha aqui além de você.',
    whatIs3: 'E diferente de qualquer outra pessoa na sua vida, Nehama está disponível às 2h da manhã numa terça quando o peso bate. Lembra o que você disse semana passada, sabe com o que você se comprometeu, e vai te cobrar com carinho se você estiver evitando o difícil. Parte coach, parte espelho, parte guia. Sempre honesto. Sempre do seu lado.',
    whatIs4: 'Nehama nasceu de uma experiência real. Um casal, casados há 25 anos, carregando pressão financeira, a crise médica de uma filha, incerteza profissional, e um relacionamento que amavam mas não tinham tido tempo de nutrir em duas décadas, sentaram e responderam perguntas honestas sobre cada área de suas vidas. O que voltou mudou tudo: um plano claro, verdades difíceis entregues com gentileza, e toda a história deles refletida através das escrituras com tal precisão que deixou ambos em lágrimas.',
    whatIs5: 'Eles construíram Nehama para que qualquer pessoa pudesse ter essa experiência.',
    freeTitle: 'Reflexão Gratuita',
    freeTag: 'Sem conta necessária',
    freeDesc: '5 perguntas, 5 minutos. Onde você está agora, refletido através das escrituras.',
    fullTitle: 'Jornada Completa',
    fullTag: '',
    fullDesc: 'Descoberta profunda em cada área da sua vida. Um plano concreto para seguir em frente. Escrituras com práticas corporais. Orientação contínua que lembra de você e te mantém responsável.',
    fullDesc2: 'Volte semanalmente, ou quantas vezes quiser. O plano de vida se ajusta. A responsabilidade se mantém. As escrituras se aprofundam conforme sua história avança.',
    namePlaceholder: 'Seu primeiro nome',
    partnerPlaceholder: 'Nome do(a) parceiro(a)',
    scriptureLabel: 'Preferência de escritura',
    modeLabel: 'Modo de jornada',
    langLabel: 'Idioma',
    otLabel: 'Antigo Testamento',
    bothLabel: 'Ambos',
    ntLabel: 'Novo Testamento',
    justMe: 'Só Eu',
    withPartner: 'Com Parceiro(a)',
    startFree: 'Comece Sua Reflexão',
    startFull: 'Comece Sua Jornada',
    invitePrompt: 'Digite seu código de convite.',
    invitePlaceholder: 'CÓDIGO DE CONVITE',
    codeError: 'Código não reconhecido.',
    enter: 'Entrar',
    privacyNote: 'Suas conversas são privadas. Nós nunca as vemos.',
    inputPlaceholder: 'Compartilhe o que está no seu coração...',
    footerBuilt: 'Nehama é construída por uma família que acredita neste trabalho. Sua assinatura mantém tudo funcionando e nos permite oferecer reflexões gratuitas a quem precisar.',
    footerPrivacy: 'Suas conversas são privadas. Nós nunca as vemos. As sessões são armazenadas no seu dispositivo.',
    footerCrisis: 'Esta é uma reflexão guiada, não terapia nem conselho médico. Se você está em crise, ligue para o CVV: 188.',
    contactUs: 'Fale conosco',
    getInTouch: 'Entre em contato',
    emailLabel: 'Seu email',
    msgLabel: 'O que está na sua mente?',
    send: 'Enviar',
    thankYou: 'Obrigado. Entraremos em contato.',
    settings: 'Configurações',
    session: 'Sessão',
    readyFull: 'Pronto para a jornada completa?',
    readyFullDesc: 'Descoberta profunda, um plano de vida concreto, escrituras com práticas corporais, e orientação contínua.',
    startFullJourney: 'Começar Jornada Completa',
    newSession: 'Nova Sessão',
    newSessionConfirm: 'Começar uma nova sessão? Sua conversa atual será apagada.',
    emailCapture: 'Quer ir mais fundo?',
    emailCaptureDesc: 'Deixe seu email e enviaremos uma jornada guiada gratuita de 3 dias.',
    messages: 'mensagens',
    save: 'Salvar',
    pricingTitle: 'Escolha seu caminho',
    pricingMonthly: '$24.99 / mês',
    pricingMonthlyFounder: '$19.99 / mês',
    pricingMonthlyNote: 'Menos de um dólar por dia, mesmo em fevereiro.',
    pricingAnnual: '$199.99 / ano',
    pricingAnnualFounder: '$179.99 / ano',
    pricingAnnualNote: 'Menos que uma única hora com um terapeuta.',
    pricingTrial: '7 dias de teste grátis, cancele quando quiser',
    pricingFounderNote: 'Preço de membro fundador, fixado para sempre. Disponível apenas nos primeiros 30 dias.',
    pricingScholarship1: 'Se o custo é uma barreira, ',
    pricingScholarshipLink: 'fale conosco',
    pricingScholarship2: '. Vamos encontrar um jeito.',
    pricingHaveCode: 'Tem um código?',
    pricingCodePlaceholder: 'INSERIR CÓDIGO',
    pricingCodeError: 'Código não reconhecido.',
    pricingCodeApply: 'Aplicar',
    codeWelcome: 'Você está dentro.',
    codeEmailAsk: 'Deixe seu email para ficarmos em contato. Nunca o compartilharemos.',
    codeEmailPlaceholder: 'seu@email.com',
    codeStart: 'Comece Sua Jornada',
    codeSkip: 'Pular',
    pricingBack: '← Voltar',
    cardSharePrompt: 'Esta reflexão é sua. Se alguém vem à mente que está carregando algo pesado, você pode enviar isso.',
    cardSave: 'Salvar nas Fotos',
    cardShare: 'Compartilhar',
    cardCTA: '5 perguntas. Sua história nas escrituras.',
    installPrompt: 'Adicione Nehama à sua tela inicial',
    installIOS: 'Toque no botão compartilhar, depois "Adicionar à Tela Inicial"',
    installAndroid: 'Toque no menu, depois "Adicionar à Tela Inicial"',
    installDismiss: 'Entendi',
    privacyHead: 'Sabemos. É muita coisa para compartilhar com um app.',
    privacyBody: 'Por isso construímos Nehama de forma que suas conversas nunca sejam vistas por nós ou por qualquer outra pessoa. Elas são processadas no momento para responder a você, e depois armazenadas apenas no seu dispositivo. Não nos nossos servidores. Não em um banco de dados. Em nenhum lugar além do seu dispositivo. A simples verdade é que não poderíamos ler sua sessão mesmo se quiséssemos.',
    privacyClose: 'As coisas que você precisa dizer para aproveitar Nehama ao máximo são as coisas que você só diria se sabe que ninguém está ouvindo. Ninguém está.',
  }
};

// ─── SYSTEM PROMPTS ─────────────────────────────────────────────────
const buildFullPrompt = ({ name, partnerName, mode, testament, lang }) => {
const langInstruction = lang === 'es' ? '\n\nCRITICAL: You MUST respond entirely in Spanish. Every word, every question, every reflection must be in Spanish. Do not use English at all.\n' : lang === 'pt' ? '\n\nCRITICAL: You MUST respond entirely in Brazilian Portuguese. Every word, every question, every reflection must be in Portuguese. Do not use English at all.\n' : '';
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
season_statement: [A vivid, personal narrative mapping in one sentence. This is the HERO of the card and the reason people will share it. Example: "You are Ruth, gleaning in a field that isn't yours yet, trusting that the harvest is coming." It must connect the scripture to THIS person's specific situation so deeply that they feel seen. Generic spiritual platitudes will not be shared. Make it feel like a declaration, not a label. Max 120 characters ideal, never more than 180.]
verse_quote: [A short pull quote from the scripture, 4-10 words only. Example: "I will restore the years"]
scripture: [The reference. Example: Ruth 2:11-12]
mantra: [A personal declaration that could ONLY belong to this person based on what they shared. NOT a generic affirmation. NOT bullet points. It should read like the thing they would write on their mirror. Example: "The years I spent carrying everyone else were not wasted. They were training." Bad example: "Present over productive, faithful with little" because it means nothing personal. Under 20 words.]
theme: [One of: wilderness, growth, grief, breakthrough, default. Choose based on the dominant emotional season.]
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
const langInstruction = lang === 'es' ? '\n\nCRITICAL: You MUST respond entirely in Spanish. Every word, every question, every reflection must be in Spanish. Do not use English at all.\n' : lang === 'pt' ? '\n\nCRITICAL: You MUST respond entirely in Brazilian Portuguese. Every word, every question, every reflection must be in Portuguese. Do not use English at all.\n' : '';
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
- Include ONE specific body or wellness practice paired with the scriptural reflection. It must be free, require no equipment, and be doable immediately. Be specific about technique (breathing counts, duration, body position). Explain briefly why it works physiologically and how it connects to the spiritual reality. This gives the free user a taste of what the full journey offers.

At the end: "${name}, what you just shared matters, and where you are in the story is not where it ends. If you ever want to go deeper, the full Nehama journey builds a complete plan from everything you are carrying, and walks with you as things change. But what I shared with you today is yours to keep."

AFTER your closing line, output a hidden reflection card block in EXACTLY this format (the user will not see this, the app uses it to generate a beautiful keepsake image):

[REFLECTION_CARD]
season_statement: [A vivid, personal narrative mapping in one sentence. This is the HERO of the card and the reason people will share it. Example: "You are Ruth, gleaning in a field that isn't yours yet, trusting that the harvest is coming." It must connect the scripture to THIS person's specific situation so deeply that they feel seen. Generic spiritual platitudes will not be shared. Make it feel like a declaration, not a label. Max 120 characters ideal, never more than 180.]
verse_quote: [A short pull quote from the scripture, 4-10 words only. Example: "I will restore the years"]
scripture: [The reference. Example: Psalm 126:5]
mantra: [A personal declaration that could ONLY belong to this person based on what they shared. NOT a generic affirmation. NOT bullet points. It should read like the thing they would write on their mirror. Example: "The years I spent carrying everyone else were not wasted. They were training." Bad example: "Present over productive, faithful with little" because it means nothing personal. Under 20 words.]
theme: [One of: wilderness, growth, grief, breakthrough, default. Choose based on the dominant emotional season.]
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
  },
  pt: {
    first: ["Preparando seu espaço..."],
    discovery: ["Ouvindo com atenção...", "Sentando com o que você compartilhou...", "Absorvendo isso...", "Segurando espaço para isso...", "Deixando assentar..."],
    heavy: ["Isso exigiu coragem para compartilhar...", "Honrando o que você disse..."],
    synthesis: ["Conectando os fios...", "Vendo a imagem completa...", "Construindo algo para você..."],
    scripture: ["Buscando na história...", "Encontrando você na narrativa..."],
    free: ["Ouvindo com atenção...", "Sentando com o que você compartilhou...", "Absorvendo isso...", "Segurando espaço para isso..."]
  }
};

// ─── GEO PRICING ────────────────────────────────────────────────────
const PRICING = {
  us: {
    monthly: '9.99', annual: '79.99', foundingMonthly: '7.99', foundingAnnual: '63.99',
    symbol: '$', code: 'USD', format: (s, a) => `${s}${a}`,
    dailyMonthly: '33 cents a day.', dailyAnnual: '22 cents a day.',
    monthlyId: 'price_1TMyct39LzIoC52o75ibSopy',
    annualId: 'price_1TMygD39LzIoC52oUDz4fQDh',
  },
  uk: {
    monthly: '7.99', annual: '64.99', foundingMonthly: '6.39', foundingAnnual: '51.99',
    symbol: '£', code: 'GBP', format: (s, a) => `${s}${a}`,
    dailyMonthly: '27 pence a day.', dailyAnnual: '18 pence a day.',
    monthlyId: 'price_1TMyhe39LzIoC52ozfJFLtSq',
    annualId: 'price_1TMyiA39LzIoC52obTRN97DF',
  },
  eu: {
    monthly: '8.99', annual: '72.99', foundingMonthly: '7.19', foundingAnnual: '58.39',
    symbol: '\u20AC', code: 'EUR', format: (s, a) => `${s}${a}`,
    dailyMonthly: '30 cents a day.', dailyAnnual: '20 cents a day.',
    monthlyId: 'price_1TMyiV39LzIoC52oXJV9Micx',
    annualId: 'price_1TMyik39LzIoC52oezLovAXL',
  },
  ca: {
    monthly: '12.99', annual: '104.99', foundingMonthly: '10.39', foundingAnnual: '83.99',
    symbol: 'CA$', code: 'CAD', format: (s, a) => `${s}${a}`,
    dailyMonthly: '43 cents a day.', dailyAnnual: '29 cents a day.',
    monthlyId: 'price_1TMyiy39LzIoC52oMGcU62ZH',
    annualId: 'price_1TMyjB39LzIoC52ooDY9Ehab',
  },
  au: {
    monthly: '14.99', annual: '119.99', foundingMonthly: '11.99', foundingAnnual: '95.99',
    symbol: 'A$', code: 'AUD', format: (s, a) => `${s}${a}`,
    dailyMonthly: '50 cents a day.', dailyAnnual: '33 cents a day.',
    monthlyId: 'price_1TMyjO39LzIoC52oxiLwMuu5',
    annualId: 'price_1TMyjd39LzIoC52owyF3uDLp',
  },
  mx: {
    monthly: '89', annual: '699', foundingMonthly: '71', foundingAnnual: '559',
    symbol: 'MXN $', code: 'MXN', format: (s, a) => `${s}${a}`,
    dailyMonthly: 'Menos de 3 pesos al d\u00EDa.', dailyAnnual: 'Menos de 2 pesos al d\u00EDa.',
    monthlyId: 'price_1TMyjv39LzIoC52oL39TZuQy',
    annualId: 'price_1TMyk839LzIoC52o2w8AlLJ9',
  },
  br: {
    monthly: '14.90', annual: '119.90', foundingMonthly: '11.90', foundingAnnual: '95.90',
    symbol: 'R$', code: 'BRL', format: (s, a) => `R$${a}`,
    dailyMonthly: '50 centavos por dia.', dailyAnnual: '33 centavos por dia.',
    monthlyId: 'price_1TMykQ39LzIoC52ogpsMk6ya',
    annualId: 'price_1TMykd39LzIoC52op3SD59zs',
  },
  latam: {
    monthly: '3.99', annual: '29.99', foundingMonthly: '3.19', foundingAnnual: '23.99',
    symbol: '$', code: 'USD', format: (s, a) => `$${a}`,
    dailyMonthly: '13 centavos al d\u00EDa.', dailyAnnual: '8 centavos al d\u00EDa.',
    monthlyId: 'price_1TMym439LzIoC52oiLQN1f0m',
    annualId: 'price_1TMymF39LzIoC52oy1nMNRZb',
  },
};

const COUNTRY_TIER = {
  US: 'us', GB: 'uk', CA: 'ca', AU: 'au', NZ: 'au', MX: 'mx', BR: 'br',
  // EU countries
  DE: 'eu', FR: 'eu', IT: 'eu', ES: 'eu', NL: 'eu', BE: 'eu', AT: 'eu', PT: 'eu',
  IE: 'eu', FI: 'eu', GR: 'eu', LU: 'eu', MT: 'eu', SK: 'eu', SI: 'eu', EE: 'eu',
  LV: 'eu', LT: 'eu', CY: 'eu', HR: 'eu', BG: 'eu', RO: 'eu', CZ: 'eu', DK: 'eu',
  HU: 'eu', PL: 'eu', SE: 'eu', NO: 'eu', CH: 'eu', IS: 'eu',
  // Tier 1 non-US (use US pricing)
  JP: 'us', KR: 'us', SG: 'us', IL: 'us', HK: 'us', TW: 'us',
  // LATAM Spanish-speaking
  CO: 'latam', AR: 'latam', CL: 'latam', PE: 'latam', EC: 'latam', GT: 'latam',
  DO: 'latam', VE: 'latam', CR: 'latam', PA: 'latam', UY: 'latam', PY: 'latam',
  BO: 'latam', HN: 'latam', SV: 'latam', NI: 'latam', CU: 'latam',
};

function getTier(countryCode) {
  return COUNTRY_TIER[countryCode] || 'us';
}

// ─── LOGO SVG COMPONENT ─────────────────────────────────────────────
function LogoLines({ width = 160 }) {
  const h = width * 0.08;
  return (
    <svg width={width} height={h + 4} viewBox={`0 0 ${width} ${h + 4}`} style={{ display: 'block', margin: '0 auto' }}>
      <path d={`M0 ${h*0.35} C${width*0.2} 0, ${width*0.4} ${h*0.8}, ${width*0.5} ${h*0.35} C${width*0.6} 0, ${width*0.8} ${h*0.7}, ${width} ${h*0.35}`} stroke="#AE655B" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d={`M0 ${h*0.65} C${width*0.2} ${h}, ${width*0.4} ${h*0.2}, ${width*0.5} ${h*0.65} C${width*0.6} ${h}, ${width*0.8} ${h*0.3}, ${width} ${h*0.65}`} stroke="#AE655B" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.35"/>
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
  const flushTable = () => { if (tableRows.length > 0) { const h = tableRows[0], d = tableRows.slice(2); elements.push(<div key={key++} style={{ overflowX: 'auto', margin: '20px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}><thead><tr>{h.map((c, i) => <th key={i} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid rgba(74,46,34,0.1)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '15px', color: '#5C3D30' }}>{inl(c.trim())}</th>)}</tr></thead><tbody>{d.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{ padding: '8px 14px', borderBottom: '1px solid rgba(74,46,34,0.05)', color: '#5C3D30' }}>{inl(c.trim())}</td>)}</tr>)}</tbody></table></div>); tableRows = []; } };
  const inl = (t) => { const p = []; const rx = /\*\*(.+?)\*\*/g; let m, li = 0, ix = 0; while ((m = rx.exec(t)) !== null) { if (m.index > li) p.push(t.slice(li, m.index)); p.push(<strong key={`b${ix++}`} style={{ fontWeight: 500 }}>{m[1]}</strong>); li = rx.lastIndex; } if (li < t.length) p.push(t.slice(li)); return p.length > 0 ? p : t; };
  for (const line of lines) { const t = line.trim(); if (t.startsWith('|') && t.endsWith('|')) { if (!inTable) { flush(); inTable = true; } tableRows.push(t.split('|').filter((_, i) => i > 0 && i < t.split('|').length - 1)); continue; } else if (inTable) { inTable = false; flushTable(); } if (t.startsWith('### ')) { flush(); elements.push(<h4 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, color: '#5C3D30', margin: '24px 0 8px 0', letterSpacing: '0.3px' }}>{inl(t.slice(4))}</h4>); } else if (t.startsWith('## ')) { flush(); elements.push(<h3 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#5C3D30', margin: '28px 0 10px 0', letterSpacing: '0.3px' }}>{inl(t.slice(3))}</h3>); } else if (t.startsWith('# ')) { flush(); elements.push(<h2 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#5C3D30', margin: '32px 0 12px 0' }}>{inl(t.slice(2))}</h2>); } else if (t.startsWith('- ') || t.startsWith('• ')) { flush(); elements.push(<div key={key++} style={{ display: 'flex', gap: '10px', margin: '4px 0 4px 4px', lineHeight: '1.8' }}><span style={{ color: '#AE655B', flexShrink: 0, fontSize: '10px', marginTop: '8px' }}>●</span><span>{inl(t.slice(2))}</span></div>); } else if (/^\d+\.\s/.test(t)) { flush(); const n = t.match(/^(\d+)\.\s/)[1]; elements.push(<div key={key++} style={{ display: 'flex', gap: '10px', margin: '4px 0 4px 4px', lineHeight: '1.8' }}><span style={{ color: '#AE655B', flexShrink: 0, fontWeight: 500, minWidth: '20px', fontFamily: "'Cormorant Garamond', serif" }}>{n}.</span><span>{inl(t.replace(/^\d+\.\s/, ''))}</span></div>); } else if (t.startsWith('> ')) { flush(); elements.push(<blockquote key={key++} style={{ borderLeft: '2px solid #AE655B', paddingLeft: '20px', margin: '16px 0', color: '#5C3D30', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16px', lineHeight: '1.8' }}>{inl(t.slice(2))}</blockquote>); } else if (t === '') { flush(); } else { para.push(line); } }
  if (inTable) flushTable(); flush(); return elements;
}

// ─── REFLECTION CARD ────────────────────────────────────────────────
function parseReflectionCard(text) {
  const match = text.match(/\[REFLECTION_CARD\]([\s\S]*?)\[\/REFLECTION_CARD\]/);
  if (!match) return null;
  const block = match[1];
  const get = (key) => { const m = block.match(new RegExp(key + ':\\s*(.+)')); return m ? m[1].trim() : ''; };
  return { seasonStatement: get('season_statement'), verseQuote: get('verse_quote'), scripture: get('scripture'), mantra: get('mantra'), theme: get('theme') || 'default' };
}

function stripReflectionCard(text) {
  return text.replace(/\[REFLECTION_CARD\][\s\S]*?\[\/REFLECTION_CARD\]/, '').trim();
}

const CARD_THEMES = {
  wilderness: { bg: '#FBF5F0', accent: '#C4A593' },
  growth: { bg: '#FAF3EC', accent: '#AE655B' },
  grief: { bg: '#F5F0EC', accent: '#9C7E72' },
  breakthrough: { bg: '#FDF6EE', accent: '#C4986E' },
  default: { bg: '#FFFFFF', accent: '#AE655B' },
};

function ReflectionCard({ card, onSave, cta }) {
  const theme = CARD_THEMES[card.theme] || CARD_THEMES.default;
  return (
    <div style={{ background: theme.bg, border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', width: 260, height: 462, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 22px 28px', position: 'relative', boxShadow: '0 1px 12px rgba(0,0,0,0.05)' }}>
      <button onClick={onSave} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#B8A498', fontSize: '14px', padding: '4px', lineHeight: 1 }} title="Save">↓</button>
      <svg width="52" height="72" viewBox="-26 0 52 72" style={{ marginBottom: '16px', flexShrink: 0 }}>
        <path d="M0,68 C-19,46 -24,36 -24,25 A24,24 0 1,1 24,25 C24,36 19,46 0,68 Z" fill="#AE655B"/>
        <text x="0" y="21" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="7" fontWeight="600" fill="#FFFFFF" letterSpacing="1">YOU ARE</text>
        <text x="0" y="32" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="8.5" fontWeight="600" fill="#FFFFFF" letterSpacing="3">HERE</text>
      </svg>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#5C3D30', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', lineHeight: 1.45, marginBottom: '14px' }}>{card.seasonStatement}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', justifyContent: 'center', width: '60%' }}>
        <div style={{ flex: 1, height: '1px', background: '#AE655B', opacity: 0.5 }} />
        <div style={{ flex: '0 0 4px' }} />
        <div style={{ flex: 1, height: '1px', background: '#AE655B', opacity: 0.5 }} />
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#9C7E72', fontWeight: 400, textAlign: 'center', lineHeight: 1.5, marginBottom: '4px', padding: '0 8px' }}>{card.verseQuote}</div>
      <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', color: '#AE655B', textAlign: 'center', letterSpacing: '1.5px', marginBottom: '16px', flexShrink: 0 }}>{card.scripture}</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '12px', color: '#5C3D30', fontWeight: 500, textAlign: 'center', lineHeight: 1.5, marginBottom: '20px' }}>{card.mantra}</div>
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', color: '#AE655B', letterSpacing: '3px' }}>nehama</div>
        <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '8px', color: '#B8A498', marginTop: '3px' }}>findnehama.com</div>
        <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '8px', color: '#B8A498', fontStyle: 'italic', marginTop: '2px' }}>{cta}</div>
      </div>
    </div>
  );
}

function saveCardAsPNG(card, cta) {
  const w = 1080, h = 1920;
  const themes = {
    wilderness: { bg: '#FBF5F0' },
    growth: { bg: '#FAF3EC' },
    grief: { bg: '#F5F0EC' },
    breakthrough: { bg: '#FDF6EE' },
    default: { bg: '#FFFFFF' },
  };
  const th = themes[card.theme] || themes.default;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#F0EAE4'; ctx.fillRect(0, 0, w, h);
  const m = 36, cr = 16;
  ctx.shadowColor = 'rgba(74,46,34,0.1)'; ctx.shadowBlur = 36; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 6;
  ctx.fillStyle = th.bg;
  ctx.beginPath();
  ctx.moveTo(m + cr, m); ctx.lineTo(w - m - cr, m); ctx.quadraticCurveTo(w - m, m, w - m, m + cr);
  ctx.lineTo(w - m, h - m - cr); ctx.quadraticCurveTo(w - m, h - m, w - m - cr, h - m);
  ctx.lineTo(m + cr, h - m); ctx.quadraticCurveTo(m, h - m, m, h - m - cr);
  ctx.lineTo(m, m + cr); ctx.quadraticCurveTo(m, m, m + cr, m);
  ctx.closePath(); ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.textAlign = 'center';
  // Everything scaled from in-app card (260x462) to PNG card area (~1008x1848)
  const s = (1080 - 2 * m) / 260;
  const cx = w / 2;
  let y = m + 28 * s;
  // Pin: in-app SVG viewBox -26..26 x 0..72, path M0,68 C-19,46 -24,36 -24,25 A24,24
  const ps = s;
  const pinTopY = y;
  const pinCX = cx;
  const pinCY = pinTopY + 25 * ps;
  ctx.fillStyle = '#AE655B';
  ctx.beginPath();
  ctx.moveTo(pinCX, pinTopY + 68 * ps);
  ctx.bezierCurveTo(pinCX - 19*ps, pinTopY + 46*ps, pinCX - 24*ps, pinTopY + 36*ps, pinCX - 24*ps, pinTopY + 25*ps);
  ctx.arc(pinCX, pinCY, 24 * ps, Math.PI, 0, false);
  ctx.bezierCurveTo(pinCX + 24*ps, pinTopY + 36*ps, pinCX + 19*ps, pinTopY + 46*ps, pinCX, pinTopY + 68*ps);
  ctx.closePath(); ctx.fill();
  // Pin text: YOU ARE 7*s, HERE 8.5*s letterspaced
  ctx.fillStyle = '#FFFFFF'; ctx.font = '600 ' + Math.round(7*s) + 'px "Cormorant Garamond", serif';
  const yaW = ctx.measureText('YOU ARE').width;
  ctx.fillText('YOU ARE', pinCX, pinCY - 3*s);
  ctx.font = '600 ' + Math.round(8.5*s) + 'px "Cormorant Garamond", serif';
  const hc = ['H','E','R','E'];
  const hn = hc.reduce((a,c) => a + ctx.measureText(c).width, 0);
  const hg = (yaW - hn) / 3;
  let hx = pinCX - yaW / 2;
  hc.forEach(c => { ctx.fillText(c, hx + ctx.measureText(c).width/2, pinCY + 7*s); hx += ctx.measureText(c).width + hg; });
  // Season statement: in-app 16px italic
  y = pinTopY + 68*ps + 16*s;
  const ssLen = card.seasonStatement.length;
  const ssFs = Math.round((ssLen > 180 ? 14 : ssLen > 120 ? 15 : 16) * s);
  ctx.fillStyle = '#5C3D30'; ctx.font = 'italic 400 ' + ssFs + 'px "Cormorant Garamond", serif';
  const ssL = wrapText(ctx, card.seasonStatement, w * 0.82);
  ssL.forEach(l => { ctx.fillText(l, cx, y); y += Math.round(ssFs * 1.45); });
  // Verse dividers + quote: in-app 12px
  y += 14*s;
  const vqFs = Math.round(12*s);
  ctx.font = '400 ' + vqFs + 'px "Cormorant Garamond", serif';
  const vqW = ctx.measureText(card.verseQuote).width;
  ctx.strokeStyle = '#AE655B'; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
  const ll = Math.min(20*s, (w*0.82 - vqW)/2 - 8*s);
  if (ll > 4) {
    ctx.beginPath(); ctx.moveTo(cx - vqW/2 - ll - 8*s, y); ctx.lineTo(cx - vqW/2 - 8*s, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + vqW/2 + 8*s, y); ctx.lineTo(cx + vqW/2 + ll + 8*s, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#9C7E72';
  ctx.fillText(card.verseQuote, cx, y + 4);
  // Scripture ref: in-app 10px Work Sans
  y += 4*s + vqFs*0.3;
  ctx.fillStyle = '#AE655B'; ctx.font = '400 ' + Math.round(10*s) + 'px "Work Sans", sans-serif';
  ctx.fillText(card.scripture, cx, y);
  // Mantra: in-app 12px Work Sans 500, centered in remaining space
  y += 16*s;
  const mFs = Math.round(12*s);
  ctx.font = '500 ' + mFs + 'px "Work Sans", sans-serif';
  const mL = wrapText(ctx, card.mantra, w * 0.78);
  const mH = mL.length * Math.round(mFs * 1.5);
  // Footer: in-app ~28px from bottom
  const fY = h - m - 28*s;
  const fH = Math.round(10*s) + Math.round(8*s)*2 + 10*s;
  const fTop = fY - fH;
  // Center mantra between content and footer
  const mZoneTop = y;
  const mZoneBot = fTop - 20*s;
  const mY = mZoneTop + (mZoneBot - mZoneTop - mH) / 2;
  ctx.fillStyle = '#5C3D30'; ctx.font = '500 ' + mFs + 'px "Work Sans", sans-serif';
  let my = mY;
  mL.forEach(l => { ctx.fillText(l, cx, my); my += Math.round(mFs * 1.5); });
  // Footer
  ctx.fillStyle = '#AE655B'; ctx.font = '400 ' + Math.round(10*s) + 'px "Cormorant Garamond", serif';
  ctx.fillText('nehama', cx, fTop);
  ctx.fillStyle = '#B8A498'; ctx.font = '400 ' + Math.round(8*s) + 'px "Work Sans", sans-serif';
  ctx.fillText('findnehama.com', cx, fTop + 3*s + Math.round(8*s));
  ctx.font = 'italic 400 ' + Math.round(8*s) + 'px "Work Sans", sans-serif';
  ctx.fillText(cta || '5 questions. Your story in scripture.', cx, fTop + 5*s + Math.round(16*s));
  canvas.toBlob(async (blob) => {
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], 'nehama-reflection.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file] });
          return;
        }
      } catch (e) { /* fall through to download */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'nehama-reflection.png';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, 'image/png');
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
      <span style={{ fontSize: '10px', fontWeight: 500, color: '#AE655B', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{phase.label}</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {Array.from({ length: dots }).map((_, i) => (
          <div key={i} style={{ width: i <= phase.index ? '12px' : '6px', height: '3px', borderRadius: '2px', background: i <= phase.index ? '#AE655B' : 'rgba(74,46,34,0.08)', transition: 'all 0.4s ease' }} />
        ))}
      </div>
    </div>
  );
}

// ─── TOGGLE BUTTON ──────────────────────────────────────────────────
function Tog({ active, children, onClick, small }) {
  return <button onClick={onClick} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: small ? '8px 6px' : '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: active ? '#fff' : '#AE655B', background: active ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{children}</button>;
}

function LangSwitch({ lang, setLang }) {
  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '2px', fontSize: '12px', fontFamily: "'Work Sans', sans-serif" }}>
      <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'en' ? '#5C3D30' : '#B8A498', fontWeight: lang === 'en' ? 500 : 400, fontSize: '12px', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.5px' }}>EN</button>
      <span style={{ color: '#B8A498', fontSize: '12px', lineHeight: '28px' }}>|</span>
      <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'es' ? '#5C3D30' : '#B8A498', fontWeight: lang === 'es' ? 500 : 400, fontSize: '12px', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.5px' }}>ES</button>
      <span style={{ color: '#B8A498', fontSize: '12px', lineHeight: '28px' }}>|</span>
      <button onClick={() => setLang('pt')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'pt' ? '#5C3D30' : '#B8A498', fontWeight: lang === 'pt' ? 500 : 400, fontSize: '12px', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.5px' }}>PT</button>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function NehamaApp() {
  const [authorized, setAuthorized] = useState(true);
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
  const [showInstall, setShowInstall] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeAccepted, setCodeAccepted] = useState(false);
  const [codeEmail, setCodeEmail] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [anim, setAnim] = useState({ text: false, paths: false });
  const [pricingTier, setPricingTier] = useState('us');
  const messagesEndRef = useRef(null);
  const lastMsgRef = useRef(null);
  const loadingMsgIndexRef = useRef(0);
  const t = T[lang] || T.en;
  const prices = PRICING[pricingTier] || PRICING.us;

  useEffect(() => { if (typeof window !== 'undefined') { const s = localStorage.getItem('nehama-authorized'); if (s === 'true') setAuthorized(true); const savedLang = localStorage.getItem('nehama-lang'); if (savedLang) setLang(savedLang); const params = new URLSearchParams(window.location.search); if (params.get('paid') === 'true') { localStorage.setItem('nehama-access', 'paid'); window.history.replaceState({}, '', window.location.pathname); } } }, []);

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('nehama-lang', lang); }, [lang]);

  // Geo-detect pricing tier
  useEffect(() => {
    fetch('/api/geo').then(r => r.json()).then(d => {
      if (d.country) setPricingTier(getTier(d.country));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const dismissed = localStorage.getItem('nehama-install-dismissed');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && !isStandalone && !dismissed && authorized) setShowInstall(true);
  }, [authorized]);

  useEffect(() => {
    if (!authorized) return;
    try { const s = localStorage.getItem('nehama-session'); if (s) { const d = JSON.parse(s); if (d.messages && d.messages.length > 0) { setTier(d.tier); setMode(d.mode || 'individual'); setTestament(d.testament || 'both'); setLang(d.lang || 'en'); setUserName(d.userName || ''); setPartnerName(d.partnerName || ''); setMessages(d.messages); setScreen('chat'); return; } } } catch (e) {}
    setScreen('welcome'); setTimeout(() => setAnim(a => ({ ...a, text: true })), 200); setTimeout(() => setAnim(a => ({ ...a, paths: true })), 600);
  }, [authorized]);

  useEffect(() => {
    const lastAi = [...messages].reverse().find(m => m.role === 'assistant');
    if (lastAi && lastAi.content.includes('[/REFLECTION_CARD]') && lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

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
      const text = data.content ? data.content.map(c => c.text || '').filter(Boolean).join('\n') : (lang === 'es' ? 'Tuve un problema de conexión. Por favor intenta de nuevo.' : lang === 'pt' ? 'Tive um problema de conexão. Por favor, tente novamente.' : 'I encountered an issue. Please try again.');
      const final = [...updated, { role: 'assistant', content: text }];
      setMessages(final); saveSession(final);
    } catch (err) { setMessages([...updated, { role: 'assistant', content: (lang === 'es' ? 'Tengo problemas de conexión. Por favor intenta de nuevo.' : lang === 'pt' ? 'Estou com problemas de conexão. Por favor, tente novamente.' : 'I am having trouble connecting. Please try again.') + '\n\n*' + err.message + '*' }]); }
    setIsLoading(false);
  }, [messages, tier, userName, partnerName, mode, testament, lang, saveSession]);

  const handleCodeSubmit = () => { const code = codeInput.trim().toUpperCase(); const accept = (access) => { setAuthorized(true); localStorage.setItem('nehama-authorized', 'true'); localStorage.setItem('nehama-access', access); setCodeError(false); setCodeInput(''); setShowCodeInput(false); setCodeAccepted(true); }; if (code === INVITE_CODE.toUpperCase()) accept('beta'); else if (code === GIFT_CODE.toUpperCase()) accept('lifetime'); else setCodeError(true); };
  const handleCodeEmailSubmit = () => { if (codeEmail.includes('@')) { fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: codeEmail, _subject: 'Nehama Code User Signup', access: localStorage.getItem('nehama-access') }) }); } setCodeAccepted(false); setCodeEmail(''); launchFullJourney(); };
  const handleStartFree = () => { if (!userName.trim()) return; setTier('free'); setScreen('chat'); const intro = lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + '. Estoy aquí para la reflexión gratuita.' : lang === 'pt' ? 'Olá. Meu nome é ' + userName.trim() + '. Estou aqui para a reflexão gratuita.' : 'Hello. My name is ' + userName.trim() + '. I am here for the free reflection.'; setTimeout(() => sendMessage(intro, true), 300); };
  const hasFullAccess = () => { const access = localStorage.getItem('nehama-access'); return ['beta', 'lifetime', 'scholarship', 'paid'].includes(access); };
  const launchFullJourney = () => { setTier('full'); setScreen('chat'); const intro = mode === 'couple' ? (lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + ' y estoy aquí con mi pareja, ' + partnerName.trim() + '. Nos gustaría comenzar el viaje completo juntos.' : lang === 'pt' ? 'Olá. Meu nome é ' + userName.trim() + ' e estou aqui com meu(minha) parceiro(a), ' + partnerName.trim() + '. Gostaríamos de começar a jornada completa juntos.' : 'Hello. My name is ' + userName.trim() + ' and I am here with my partner, ' + partnerName.trim() + '. We would like to begin the full journey together.') : (lang === 'es' ? 'Hola. Mi nombre es ' + userName.trim() + '. Estoy listo para comenzar el viaje completo.' : lang === 'pt' ? 'Olá. Meu nome é ' + userName.trim() + '. Estou pronto para começar a jornada completa.' : 'Hello. My name is ' + userName.trim() + '. I am ready to begin the full journey.'); setTimeout(() => sendMessage(intro, true), 300); };
  const handleStartFull = () => { if (!userName.trim()) return; if (mode === 'couple' && !partnerName.trim()) return; if (hasFullAccess()) { launchFullJourney(); } else { setScreen('pricing'); } };
  const handleCheckout = async (priceId, founding = true) => { try { const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId, founding }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch (e) { console.error('Checkout error:', e); } };
  const handleReset = () => { try { localStorage.removeItem('nehama-session'); } catch (e) {} setMessages([]); setUserName(''); setPartnerName(''); setTier(null); setMode('individual'); setTestament('both'); setShowSettings(false); setEmailSubmitted(false); setFeedbackEmail(''); setScreen('welcome'); setTimeout(() => setAnim(a => ({ ...a, text: true })), 200); setTimeout(() => setAnim(a => ({ ...a, paths: true })), 600); };
  const handleDownload = () => { const convo = messages.filter(m => !m.hidden).map(m => (m.role === 'user' ? 'You: ' : 'Nehama: ') + stripReflectionCard(m.content)).join('\n\n'); const d = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); const ttl = tier === 'free' ? 'Your Scriptural Reflection' : 'Your Life Architecture Session'; const doc = 'NEHAMA: YOU ARE HERE\n' + ttl + '\n' + d + '\n' + userName + (mode === 'couple' ? ' & ' + partnerName : '') + '\n\n' + '='.repeat(48) + '\n\n' + convo + '\n\n' + '='.repeat(48) + '\n\nThis is yours to keep.\n'; const b = new Blob([doc], { type: 'text/plain' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'nehama-' + (tier === 'free' ? 'reflection' : 'session') + '.txt'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u); };
  const handleSend = () => { if (!input.trim() || isLoading) return; sendMessage(input.trim()); };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const freeSessionComplete = tier === 'free' && messages.filter(m => m.role === 'assistant').length >= 3 && messages.some(m => m.role === 'assistant' && (m.content.toLowerCase().includes('what you just shared matters') || m.content.toLowerCase().includes('lo que acabas de compartir importa') || m.content.includes('[/REFLECTION_CARD]')));

  const inputStyle = { width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(74,46,34,0.07)', padding: '10px 0 12px', fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: 'calc(15px * 0.96)', color: '#5C3D30', outline: 'none', transition: 'border-color 0.2s', borderRadius: 0 };
  const toggleGroupStyle = { display: 'flex', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', padding: '0', gap: '0', overflow: 'hidden' };
  const labelStyle = { display: 'block', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AE655B', marginBottom: '10px' };

  // ─── CONTACT MODAL ─────
  const contactModalJSX = showContact ? (<>
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(74,46,34,0.12)', zIndex: 200, backdropFilter: 'blur(4px)' }} onClick={() => { setShowContact(false); setContactSent(false); }} />
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#FFFFFF', borderRadius: '12px', padding: '36px', width: '90%', maxWidth: '380px', zIndex: 201, boxShadow: '0 24px 48px rgba(74,46,34,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#5C3D30' }}>{t.getInTouch}</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#B8A498', padding: '4px' }} onClick={() => { setShowContact(false); setContactSent(false); }}>×</button>
      </div>
      {contactSent ? (
        <p style={{ fontSize: '15px', color: '#5C3D30', lineHeight: 1.6 }}>{t.thankYou}</p>
      ) : (<>
        <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.emailLabel} type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} />
        <textarea style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', padding: '12px', fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: '14px', color: '#5C3D30', outline: 'none', transition: 'border-color 0.2s', minHeight: '100px', resize: 'vertical', lineHeight: '1.6', marginBottom: '16px' }} placeholder={t.msgLabel} value={contactMsg} onChange={e => setContactMsg(e.target.value)} onFocus={e => e.target.style.borderColor = 'rgba(74,46,34,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(74,46,34,0.07)'} />
        <button onClick={() => { if (contactEmail.includes('@') && contactMsg.trim()) { fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: contactEmail, message: contactMsg, _subject: 'Nehama Contact Form' }) }); setContactSent(true); setContactEmail(''); setContactMsg(''); } }} style={{ width: '100%', padding: '13px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF', letterSpacing: '0.5px', opacity: contactEmail.includes('@') && contactMsg.trim() ? 1 : 0.4 }}>{t.send}</button>
      </>)}
    </div>
  </>) : null;

  // ─── PRICING ─────
  const perMonth = lang === 'es' ? '/ mes' : lang === 'pt' ? '/ mês' : '/ month';
  const perYear = lang === 'es' ? '/ año' : lang === 'pt' ? '/ ano' : '/ year';
  if (screen === 'pricing') return (
    <div className="neh-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
      <LangSwitch lang={lang} setLang={setLang} />
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: '#5C3D30', letterSpacing: '3px', marginBottom: '8px' }}>Nehama</div>
        <LogoLines width={100} />
      </div>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        {codeAccepted ? (<>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#5C3D30', marginBottom: '12px', fontWeight: 400 }}>{t.codeWelcome}</p>
            <p style={{ fontSize: '14px', color: '#5C3D30', lineHeight: 1.7 }}>{t.codeEmailAsk}</p>
          </div>
          <input style={{ ...inputStyle, marginBottom: '12px' }} placeholder={t.codeEmailPlaceholder} type="email" value={codeEmail} onChange={e => setCodeEmail(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} onKeyDown={e => e.key === 'Enter' && handleCodeEmailSubmit()} />
          <button onClick={handleCodeEmailSubmit} style={{ width: '100%', padding: '14px', fontSize: '15px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF', letterSpacing: '0.5px', marginBottom: '12px' }}>{t.codeStart}</button>
          <button onClick={() => { setCodeAccepted(false); setCodeEmail(''); launchFullJourney(); }} style={{ display: 'block', margin: '0 auto', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontSize: '13px', color: '#B8A498' }}>{t.codeSkip}</button>
        </>) : (<>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#5C3D30', textAlign: 'center', marginBottom: '32px', fontWeight: 400 }}>{t.pricingTitle}</p>
        <button onClick={() => handleCheckout(prices.monthlyId, true)} style={{ width: '100%', padding: '18px', fontSize: '16px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF', letterSpacing: '0.5px', marginBottom: '4px' }}><span style={{ textDecoration: 'line-through', opacity: 0.6, marginRight: '10px', fontSize: '14px' }}>{prices.format(prices.symbol, prices.monthly)} {perMonth}</span>{prices.format(prices.symbol, prices.foundingMonthly)} {perMonth}</button>
        <p style={{ fontSize: '12px', color: '#AE655B', textAlign: 'center', marginBottom: '20px', fontStyle: 'italic' }}>{prices.dailyMonthly}</p>
        <button onClick={() => handleCheckout(prices.annualId, true)} style={{ width: '100%', padding: '18px', fontSize: '16px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: '1px solid #5C3D30', borderRadius: '8px', cursor: 'pointer', background: 'transparent', color: '#5C3D30', letterSpacing: '0.5px', marginBottom: '4px' }}><span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: '10px', fontSize: '14px' }}>{prices.format(prices.symbol, prices.annual)} {perYear}</span>{prices.format(prices.symbol, prices.foundingAnnual)} {perYear}</button>
        <p style={{ fontSize: '12px', color: '#AE655B', textAlign: 'center', marginBottom: '8px', fontStyle: 'italic' }}>{prices.dailyAnnual}</p>
        <p style={{ fontSize: '13px', color: '#B8A498', textAlign: 'center', marginTop: '12px', marginBottom: '8px' }}>{t.pricingTrial}</p>
        <p style={{ fontSize: '12px', color: '#AE655B', textAlign: 'center', marginBottom: '28px', fontStyle: 'italic', lineHeight: 1.5 }}>{t.pricingFounderNote}</p>
        <div style={{ borderTop: '1px solid rgba(74,46,34,0.07)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#AE655B', lineHeight: 1.6 }}>{t.pricingScholarship1}<span style={{ color: '#5C3D30', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }} onClick={() => setShowContact(true)}>{t.pricingScholarshipLink}</span>{t.pricingScholarship2}</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {!showCodeInput ? (
            <button onClick={() => setShowCodeInput(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontSize: '13px', color: '#B8A498', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{t.pricingHaveCode}</button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', maxWidth: '280px', margin: '0 auto' }}>
              <input style={{ ...inputStyle, flex: 1, textAlign: 'center', fontSize: '16px', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '3px', textTransform: 'uppercase' }} placeholder={t.pricingCodePlaceholder} value={codeInput} onChange={e => { setCodeInput(e.target.value); setCodeError(false); }} onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()} />
              <button onClick={handleCodeSubmit} style={{ padding: '12px 20px', fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF', flexShrink: 0 }}>{t.pricingCodeApply}</button>
            </div>
          )}
          {codeError && <p style={{ fontSize: '12px', color: '#C48282', marginTop: '8px' }}>{t.pricingCodeError}</p>}
        </div>
        <button onClick={() => { setScreen('welcome'); setShowCodeInput(false); setCodeError(false); setCodeInput(''); setCodeAccepted(false); setCodeEmail(''); setTimeout(() => setAnim(a => ({ ...a, text: true, paths: true })), 100); }} style={{ display: 'block', margin: '20px auto 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#B8A498' }}>{t.pricingBack}</button>
        </>)}
      </div>
      {contactModalJSX}
    </div>
  );

  // ─── WELCOME ─────
  if (screen === 'welcome') return (
    <div className="neh-shell" style={{ minHeight: '100vh', position: 'relative', background: '#FFFFFF' }}>
      <LangSwitch lang={lang} setLang={setLang} />

 {/* Header */}
<div style={{ background: '#AE655B', padding: '56px 24px 36px', textAlign: 'center', opacity: anim.text ? 1 : 0, transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
  <div style={{ position: 'relative', maxWidth: '440px', margin: '0 auto' }}>
    <img
      src="/nehama-logo.png"
      alt="Nehama"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '58%',
      transform: 'translate(-50%, -50%)',
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 'calc(10px * 0.96)',
      color: 'rgba(255,255,255,0.75)',
      letterSpacing: '0.6em',
      textTransform: 'uppercase',
      fontWeight: 400,
      paddingLeft: '0.6em',
      whiteSpace: 'nowrap',
    }}>YOU ARE HERE</div>
  </div>
</div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px 40px' }}>

        {/* Opening */}
        <div style={{ maxWidth: '480px', width: '100%', padding: '28px 32px', textAlign: 'center', opacity: anim.text ? 1 : 0, transform: anim.text ? 'translateY(0)' : 'translateY(12px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(18px * 0.96)', color: '#5C3D30', lineHeight: 1.3, margin: '0 0 16px 0', fontWeight: 400, letterSpacing: '0.01em' }}>{t.blurbIntro}</p>
          <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: 0, fontWeight: 300, textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t.blurbBody }} />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(74,46,34,0.07)', maxWidth: 'calc(480px - 64px)', width: '100%' }} />

        {/* What is Nehama */}
        <div style={{ width: '100%', maxWidth: '480px', padding: '20px 32px', opacity: anim.paths ? 1 : 0, transition: 'opacity 0.6s' }}>
          <button onClick={() => setShowAbout(!showAbout)} style={{ all: 'unset', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', cursor: 'pointer', padding: '6px 0', color: '#AE655B', textAlign: 'center' }}>
            <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AE655B' }}>{t.whatIsTitle}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)', transform: showAbout ? 'rotate(180deg)' : 'rotate(0deg)', color: '#AE655B' }}><path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {showAbout && (
            <div style={{ paddingTop: '28px', animation: 'fadeIn 0.4s ease' }}>
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '0 0 1.15em 0', fontWeight: 300, textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t.whatIs1 }} />
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '0 0 1.15em 0', fontWeight: 300, textAlign: 'left' }}>{t.whatIs2}</p>
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '0 0 1.15em 0', fontWeight: 300, textAlign: 'left' }}>{t.whatIs3}</p>
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '0 0 1.15em 0', fontWeight: 300, textAlign: 'left' }}>{t.whatIs4}</p>
              <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '0 0 0 0', fontWeight: 500, textAlign: 'left' }}>{t.whatIs5}</p>
              <div style={{ height: '1px', background: 'rgba(74,46,34,0.07)', margin: '28px 0 24px' }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(14px * 0.96)', color: '#5C3D30', lineHeight: 1.75, margin: '0 0 12px 0', fontStyle: 'italic', fontWeight: 400, textAlign: 'left' }}>{t.privacyHead}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(14px * 0.96)', color: '#5C3D30', lineHeight: 1.75, margin: '0 0 12px 0', fontStyle: 'italic', fontWeight: 400, textAlign: 'left' }}>{t.privacyBody}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(14px * 0.96)', color: '#5C3D30', lineHeight: 1.75, margin: 0, fontStyle: 'italic', fontWeight: 400, textAlign: 'left' }}>{t.privacyClose}</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(74,46,34,0.07)', maxWidth: 'calc(480px - 64px)', width: '100%' }} />

        {/* Two paths */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', opacity: anim.paths ? 1 : 0, transform: anim.paths ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>

          {/* FREE */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(26px * 0.96)', fontWeight: 400, color: '#5C3D30', lineHeight: 1.2 }}>{t.freeTitle}</div>
              <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#AE655B', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '999px', padding: '5px 10px', display: 'inline-block', marginTop: '10px' }}>{t.freeTag}</div>
            </div>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '10px 0 22px 0', fontWeight: 300, textAlign: 'left' }}>{t.freeDesc}</p>
            <div style={{ marginTop: '22px' }}>
              <input style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(74,46,34,0.07)', padding: '10px 0 12px', fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: 'calc(15px * 0.96)', color: '#5C3D30', outline: 'none', transition: 'border-color 0.2s', borderRadius: 0 }} placeholder={t.namePlaceholder} value={userName} onChange={e => setUserName(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} />
            </div>
            <div style={{ marginTop: '22px' }}>
              <label style={{ display: 'block', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AE655B', marginBottom: '10px' }}>{t.scriptureLabel}</label>
              <div style={{ display: 'flex', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', padding: '0', gap: '0', overflow: 'hidden' }}>
                <button onClick={() => setTestament('old')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'old' ? '#fff' : '#AE655B', background: testament === 'old' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.otLabel}</button>
                <button onClick={() => setTestament('both')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'both' ? '#fff' : '#AE655B', background: testament === 'both' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.bothLabel}</button>
                <button onClick={() => setTestament('new')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'new' ? '#fff' : '#AE655B', background: testament === 'new' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.ntLabel}</button>
              </div>
            </div>
            <button onClick={handleStartFree} style={{ all: 'unset', display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', padding: '15px 20px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '36px', background: '#5C3D30', color: '#fff', border: 'none', borderRadius: '8px', opacity: userName.trim() ? 1 : 0.4 }}>{t.startFree}</button>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(74,46,34,0.07)', maxWidth: 'calc(480px - 64px)', width: '100%', margin: '0 auto' }} />

          {/* FULL */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(26px * 0.96)', fontWeight: 400, color: '#5C3D30', lineHeight: 1.2 }}>{t.fullTitle}</div>
            </div>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#5C3D30', lineHeight: 1.9, margin: '10px 0 4px 0', fontWeight: 300, textAlign: 'left' }}>{t.fullDesc}</p>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(13px * 0.96)', color: '#AE655B', lineHeight: 1.9, margin: '0 0 22px 0', fontWeight: 300, textAlign: 'left' }}>{t.fullDesc2}</p>
            <div style={{ marginTop: '22px' }}>
              <input style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(74,46,34,0.07)', padding: '10px 0 12px', fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: 'calc(15px * 0.96)', color: '#5C3D30', outline: 'none', transition: 'border-color 0.2s', borderRadius: 0 }} placeholder={t.namePlaceholder} value={userName} onChange={e => setUserName(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} />
            </div>
            <div style={{ marginTop: '22px' }}>
              <label style={{ display: 'block', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AE655B', marginBottom: '10px' }}>{t.modeLabel}</label>
              <div style={{ display: 'flex', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', padding: '0', gap: '0', overflow: 'hidden' }}>
                <button onClick={() => setMode('individual')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: mode === 'individual' ? '#fff' : '#AE655B', background: mode === 'individual' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.justMe}</button>
                <button onClick={() => setMode('couple')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: mode === 'couple' ? '#fff' : '#AE655B', background: mode === 'couple' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.withPartner}</button>
              </div>
            </div>
            {mode === 'couple' && <div style={{ marginTop: '22px' }}><input style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(74,46,34,0.07)', padding: '10px 0 12px', fontFamily: "'Work Sans', sans-serif", fontWeight: 300, fontSize: 'calc(15px * 0.96)', color: '#5C3D30', outline: 'none', transition: 'border-color 0.2s', borderRadius: 0 }} placeholder={t.partnerPlaceholder} value={partnerName} onChange={e => setPartnerName(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} /></div>}
            <div style={{ marginTop: '22px' }}>
              <label style={{ display: 'block', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(10px * 0.96)', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AE655B', marginBottom: '10px' }}>{t.scriptureLabel}</label>
              <div style={{ display: 'flex', border: '1px solid rgba(74,46,34,0.07)', borderRadius: '8px', padding: '0', gap: '0', overflow: 'hidden' }}>
                <button onClick={() => setTestament('old')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'old' ? '#fff' : '#AE655B', background: testament === 'old' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.otLabel}</button>
                <button onClick={() => setTestament('both')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'both' ? '#fff' : '#AE655B', background: testament === 'both' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.bothLabel}</button>
                <button onClick={() => setTestament('new')} style={{ all: 'unset', flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 400, letterSpacing: '0.08em', color: testament === 'new' ? '#fff' : '#AE655B', background: testament === 'new' ? '#5C3D30' : 'transparent', borderRadius: '0', transition: 'background 0.25s, color 0.25s', lineHeight: 1 }}>{t.ntLabel}</button>
              </div>
            </div>
            <button onClick={handleStartFull} style={{ all: 'unset', display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', padding: '16px 20px', fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '36px', background: '#5C3D30', color: '#fff', borderRadius: '8px', opacity: userName.trim() && (mode === 'individual' || partnerName.trim()) ? 1 : 0.4 }}>{t.startFull}</button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(74,46,34,0.07)', maxWidth: 'calc(480px - 64px)', width: '100%' }} />

        {/* Footer */}
        <div style={{ maxWidth: '480px', width: '100%', padding: '28px 32px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'calc(12px * 0.96)', color: '#AE655B', lineHeight: 1.85, margin: '0 0 24px 0', fontStyle: 'italic', fontWeight: 400 }}>{t.footerBuilt}</p>
          <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', color: '#B8A498', lineHeight: 1.85, margin: '0 0 16px 0', fontWeight: 300 }}>{t.footerPrivacy}</p>
          <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 'calc(11px * 0.96)', color: '#B8A498', lineHeight: 1.85, margin: '0 0 16px 0', fontWeight: 300 }}>{t.footerCrisis}</p>
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', fontSize: 'calc(10px * 0.96)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            <span style={{ cursor: 'pointer', color: '#AE655B', borderBottom: '1px solid transparent', paddingBottom: '2px' }} onClick={() => setShowContact(true)}>{t.contactUs}</span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <a href="/terms" style={{ color: '#AE655B', textDecoration: 'none', borderBottom: '1px solid transparent', paddingBottom: '2px' }}>Terms</a>
              <span style={{ color: '#B8A498' }}>·</span>
              <a href="/privacy" style={{ color: '#AE655B', textDecoration: 'none', borderBottom: '1px solid transparent', paddingBottom: '2px' }}>Privacy</a>
            </div>
          </div>
        </div>
      </div>
      {contactModalJSX}
      {showInstall && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#5C3D30', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100, animation: 'fadeIn 0.5s ease 2s both' }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#FFFFFF', margin: '0 0 4px 0', fontWeight: 500 }}>{t.installPrompt}</p>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{/iPhone|iPad|iPod/i.test(navigator.userAgent) ? t.installIOS : t.installAndroid}</p>
          </div>
          <button onClick={() => { setShowInstall(false); localStorage.setItem('nehama-install-dismissed', 'true'); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", fontSize: '12px', color: '#FFFFFF', flexShrink: 0 }}>{t.installDismiss}</button>
        </div>
      )}
    </div>
  );

  // ─── CHAT ─────
  const phase = getPhaseInfo(messages, tier);
  return (
    <div className="neh-shell" style={{ minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(74,46,34,0.07)', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 300, color: '#5C3D30', letterSpacing: '2px' }}>Nehama</span>
            <PhaseIndicator phase={phase} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {messages.filter(m => m.role === 'assistant').length > 0 && <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#B8A498', fontSize: '15px' }} onClick={handleDownload} title={t.save}>↓</button>}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#B8A498', fontSize: '18px' }} onClick={() => setShowSettings(true)}>⚙</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {(() => { const visible = messages.filter(m => !m.hidden); const lastAiIdx = visible.map((m, i) => m.role === 'assistant' ? i : -1).filter(i => i >= 0).pop(); return visible.map((msg, i) => (
            <div key={i} ref={i === lastAiIdx ? lastMsgRef : null} style={msg.role === 'user' ? { maxWidth: '80%', alignSelf: 'flex-end', background: '#5C3D30', color: '#FFFFFF', padding: '14px 20px', borderRadius: '16px 16px 4px 16px', fontSize: '15px', lineHeight: '1.7' } : { maxWidth: '100%', alignSelf: 'flex-start', padding: '4px 0', fontSize: '15px', lineHeight: '1.8', color: '#5C3D30' }}>
              {msg.role === 'user' ? <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div> : <div>{renderMarkdown(stripReflectionCard(msg.content))}</div>}
            </div>
          )); })()}

          {(() => {
            const lastAi = [...messages].reverse().find(m => m.role === 'assistant');
            const card = lastAi ? parseReflectionCard(lastAi.content) : null;
            if (!card) return null;
            return (
              <div style={{ alignSelf: 'center', paddingTop: '16px', animation: 'fadeIn 1s ease 0.5s both' }}>
                <ReflectionCard card={card} onSave={() => saveCardAsPNG(card, t.cardCTA)} cta={t.cardCTA} />
                <div style={{ animation: 'fadeIn 0.8s ease 1.5s both' }}>
                  <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '13px', color: '#AE655B', textAlign: 'center', lineHeight: 1.6, margin: '16px 0 14px', maxWidth: '260px' }}>{t.cardSharePrompt}</p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={() => saveCardAsPNG(card, t.cardCTA)} style={{ flex: 1, padding: '10px', fontSize: '13px', fontFamily: "'Work Sans', sans-serif", fontWeight: 500, border: 'none', borderRadius: '6px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF' }}>{t.cardSave}</button>
                    <button onClick={() => { if (navigator.share) { navigator.share({ title: 'Nehama', text: 'Someone who cares about you wanted you to have this.', url: 'https://findnehama.com' }).catch(() => {}); } else { window.open('https://findnehama.com', '_blank'); } }} style={{ flex: 1, padding: '10px', fontSize: '13px', fontFamily: "'Work Sans', sans-serif", fontWeight: 500, border: '1px solid #5C3D30', borderRadius: '6px', cursor: 'pointer', background: 'transparent', color: '#5C3D30' }}>{t.cardShare}</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {isLoading && (
            <div style={{ alignSelf: 'flex-start', padding: '12px 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '5px' }}>{[0,1,2].map(i => <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#AE655B', animation: `pulse 1.4s ease-in-out ${i*0.2}s infinite` }} />)}</div>
              <span style={{ fontSize: '13px', color: '#B8A498', fontStyle: 'italic', letterSpacing: '0.3px' }}>{loadingMsg}</span>
            </div>
          )}

          {freeSessionComplete && !emailSubmitted && (
            <div style={{ alignSelf: 'flex-start', borderTop: '1px solid rgba(74,46,34,0.05)', paddingTop: '24px', width: '100%', maxWidth: '400px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#5C3D30', margin: '0 0 6px 0' }}>{t.emailCapture}</p>
              <p style={{ fontSize: '13px', color: '#AE655B', margin: '0 0 14px 0' }}>{t.emailCaptureDesc}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="your@email.com" type="email" value={feedbackEmail} onChange={e => setFeedbackEmail(e.target.value)} onFocus={e => e.target.style.borderBottomColor = '#AE655B'} onBlur={e => e.target.style.borderBottomColor = 'rgba(74,46,34,0.07)'} />
                <button onClick={() => { if (feedbackEmail.includes('@')) { fetch('https://formspree.io/f/mdapqwqb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: feedbackEmail, _subject: 'Nehama Email Signup' }) }); setEmailSubmitted(true); } }} style={{ padding: '12px 24px', fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF', flexShrink: 0 }}>{t.send}</button>
              </div>
            </div>
          )}
          {emailSubmitted && <p style={{ fontSize: '14px', color: '#5C3D30', padding: '12px 0' }}>{t.thankYou}</p>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(74,46,34,0.07)', background: 'rgba(255,255,255,0.95)' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <textarea style={{ flex: 1, padding: '13px 16px', fontSize: '15px', fontFamily: "'Work Sans', sans-serif", border: '1px solid rgba(74,46,34,0.08)', borderRadius: '12px', background: '#fff', color: '#5C3D30', outline: 'none', resize: 'none', minHeight: '46px', maxHeight: '120px', lineHeight: '1.6', transition: 'border-color 0.2s' }} placeholder={t.inputPlaceholder} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} onFocus={e => e.target.style.borderColor = 'rgba(74,46,34,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(74,46,34,0.08)'} rows={1} />
            <button style={{ width: '46px', height: '46px', borderRadius: '10px', border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'default', background: input.trim() && !isLoading ? '#5C3D30' : 'rgba(74,46,34,0.07)', color: input.trim() && !isLoading ? '#FFFFFF' : '#B8A498', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }} onClick={handleSend}>↑</button>
          </div>
        </div>
      </div>

      {/* Settings drawer */}
      {showSettings && <>
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(74,46,34,0.08)', zIndex: 100, backdropFilter: 'blur(4px)' }} onClick={() => setShowSettings(false)} />
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '300px', maxWidth: '85vw', background: '#FFFFFF', zIndex: 101, padding: '36px 28px', boxShadow: '-8px 0 32px rgba(74,46,34,0.07)', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#5C3D30' }}>{t.settings}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#9C7E72', fontSize: '22px' }} onClick={() => setShowSettings(false)}>×</button>
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
            <p style={{ fontSize: '14px', color: '#5C3D30' }}>{userName}{mode === 'couple' ? ' & ' + partnerName : ''} · {tier === 'free' ? t.freeTitle : t.fullTitle} · {messages.filter(m => !m.hidden).length} {t.messages}</p>
          </div>
          {tier === 'free' && (
            <div style={{ borderTop: '1px solid rgba(74,46,34,0.05)', paddingTop: '20px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#5C3D30', margin: '0 0 6px 0' }}>{t.readyFull}</p>
              <p style={{ fontSize: '13px', color: '#5C3D30', margin: '0 0 14px 0', lineHeight: 1.6 }}>{t.readyFullDesc}</p>
              <button style={{ width: '100%', padding: '11px', fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#5C3D30', color: '#FFFFFF' }} onClick={() => { setShowSettings(false); handleReset(); }}>{t.startFullJourney}</button>
            </div>
          )}
          <div>
            <span style={{ fontSize: '12px', cursor: 'pointer', color: '#B8A498' }} onClick={() => { setShowSettings(false); setShowContact(true); }}>{t.contactUs}</span>
          </div>
          <button style={{ padding: '11px', fontSize: '13px', fontFamily: "'Work Sans', sans-serif", fontWeight: 400, border: '1px solid rgba(74,46,34,0.1)', borderRadius: '8px', cursor: 'pointer', background: 'transparent', color: '#AE655B', marginTop: 'auto' }} onClick={() => { if (confirm(t.newSessionConfirm)) handleReset(); }}>{t.newSession}</button>
        </div>
      </>}
      {contactModalJSX}
    </div>
  );
}
