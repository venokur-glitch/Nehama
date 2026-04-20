"use client";
import { useState, useEffect } from "react";

const content = {
  en: {
    back: '← Nehama',
    title: 'Privacy Policy',
    updated: 'Last updated: April 2026',
    sections: [
      { h: 'The Short Version', p: 'Your conversations are private. We never see them. Your session data is stored on your own device, not on our servers. We take your privacy seriously because we know how personal the things you share with Nehama can be.' },
      { h: 'What Data We Collect', items: [
        { label: 'Conversation data:', text: 'Your conversations with Nehama are stored locally on your device using your browser\'s storage. We do not have access to this data. We cannot read, review, or retrieve your conversations. If you clear your browser data or switch devices, your conversation history will be lost.' },
        { label: 'Email address:', text: 'If you voluntarily provide your email address (through the contact form or the email signup after a free reflection), we collect and store it solely for the purpose of communicating with you about Nehama. We will never sell, share, or distribute your email address to third parties.' },
        { label: 'Payment information:', text: 'If you subscribe to a paid plan, your payment is processed by Stripe. We do not store your credit card number or banking details. Stripe\'s privacy policy governs the handling of your payment data.' },
      ] },
      { h: 'How Your Conversations Are Processed', p: 'When you interact with Nehama, your messages are sent to Anthropic\'s API (the AI service that powers Nehama) to generate responses. This means your conversation content passes through Anthropic\'s servers in order to function.', p2: 'Anthropic\'s API data policy states that they do not use API inputs or outputs to train their models. Anthropic may retain API data temporarily for safety, abuse prevention, and debugging purposes in accordance with their own privacy policy, which you can review at anthropic.com/privacy.', p3: 'We do not store, log, or retain any copy of your conversations on our own servers.' },
      { h: 'Cookies and Tracking', p: 'Nehama does not use advertising cookies or third-party tracking. We may use basic analytics to understand how many people visit the site and general usage patterns. We do not track individual user behavior or conversation content.' },
      { h: 'Your Rights', p: 'You can delete your conversation data at any time by clearing your browser\'s local storage or by using the "Start New Session" option in the app\'s settings. If you have provided your email address and would like it removed from our records, please contact us and we will delete it promptly.' },
      { h: 'Children\'s Privacy', p: 'Nehama is not intended for use by individuals under the age of 18. We do not knowingly collect data from minors.' },
      { h: 'Changes to This Policy', p: 'We may update this privacy policy from time to time. Continued use of Nehama after changes are posted constitutes acceptance of the updated policy.' },
      { h: 'Contact', p: 'If you have questions about your privacy or this policy, please contact us through the Contact form in the app.' },
    ]
  },
  es: {
    back: '← Nehama',
    title: 'Política de Privacidad',
    updated: 'Última actualización: Abril 2026',
    sections: [
      { h: 'La Versión Corta', p: 'Tus conversaciones son privadas. Nunca las vemos. Los datos de tu sesión se almacenan en tu propio dispositivo, no en nuestros servidores. Nos tomamos tu privacidad en serio porque sabemos lo personales que son las cosas que compartes con Nehama.' },
      { h: 'Qué Datos Recopilamos', items: [
        { label: 'Datos de conversación:', text: 'Tus conversaciones con Nehama se almacenan localmente en tu dispositivo usando el almacenamiento de tu navegador. No tenemos acceso a estos datos. No podemos leer, revisar ni recuperar tus conversaciones. Si borras los datos de tu navegador o cambias de dispositivo, tu historial de conversación se perderá.' },
        { label: 'Correo electrónico:', text: 'Si proporcionas voluntariamente tu dirección de correo electrónico (a través del formulario de contacto o el registro de correo después de una reflexión gratuita), lo recopilamos y almacenamos únicamente con el propósito de comunicarnos contigo sobre Nehama. Nunca venderemos, compartiremos ni distribuiremos tu dirección de correo electrónico a terceros.' },
        { label: 'Información de pago:', text: 'Si te suscribes a un plan de pago, tu pago es procesado por Stripe. No almacenamos el número de tu tarjeta de crédito ni los datos bancarios. La política de privacidad de Stripe rige el manejo de tus datos de pago.' },
      ] },
      { h: 'Cómo Se Procesan Tus Conversaciones', p: 'Cuando interactúas con Nehama, tus mensajes se envían a la API de Anthropic (el servicio de IA que alimenta a Nehama) para generar respuestas. Esto significa que el contenido de tu conversación pasa por los servidores de Anthropic para funcionar.', p2: 'La política de datos de la API de Anthropic establece que no utilizan las entradas ni salidas de la API para entrenar sus modelos. Anthropic puede retener datos de la API temporalmente por seguridad, prevención de abuso y depuración de acuerdo con su propia política de privacidad, que puedes revisar en anthropic.com/privacy.', p3: 'No almacenamos, registramos ni retenemos ninguna copia de tus conversaciones en nuestros propios servidores.' },
      { h: 'Cookies y Rastreo', p: 'Nehama no utiliza cookies publicitarias ni rastreo de terceros. Podemos usar análisis básicos para comprender cuántas personas visitan el sitio y los patrones generales de uso. No rastreamos el comportamiento individual del usuario ni el contenido de las conversaciones.' },
      { h: 'Tus Derechos', p: 'Puedes eliminar los datos de tu conversación en cualquier momento borrando el almacenamiento local de tu navegador o usando la opción "Nueva Sesión" en los ajustes de la aplicación. Si has proporcionado tu dirección de correo electrónico y deseas que la eliminemos de nuestros registros, por favor contáctanos y la eliminaremos de inmediato.' },
      { h: 'Privacidad de Menores', p: 'Nehama no está destinada para el uso de personas menores de 18 años. No recopilamos datos de menores a sabiendas.' },
      { h: 'Cambios a Esta Política', p: 'Podemos actualizar esta política de privacidad de vez en cuando. El uso continuado de Nehama después de que se publiquen los cambios constituye la aceptación de la política actualizada.' },
      { h: 'Contacto', p: 'Si tienes preguntas sobre tu privacidad o esta política, por favor contáctanos a través del formulario de contacto en la aplicación.' },
    ]
  }
};

export default function Privacy() {
  const [lang, setLang] = useState('en');
  useEffect(() => { const saved = localStorage.getItem('nehama-lang'); if (saved) setLang(saved); }, []);
  const c = content[lang];
  const hStyle = { fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#5C3D30', margin: '36px 0 12px 0', letterSpacing: '0.3px' };
  return (
    <div style={{ minHeight: '100vh', padding: '64px 24px 48px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <a href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, color: '#AE655B', textDecoration: 'none', letterSpacing: '2px' }}>{c.back}</a>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#5C3D30', margin: '40px 0 8px 0', letterSpacing: '1px' }}>{c.title}</h1>
        <p style={{ fontSize: '12px', color: '#B8A498', marginBottom: '40px', letterSpacing: '0.5px' }}>{c.updated}</p>
        <div style={{ fontSize: '15px', color: '#5C3D30', lineHeight: 1.9 }}>
          {c.sections.map((s, i) => (
            <div key={i}>
              <h2 style={hStyle}>{s.h}</h2>
              {s.p && <p>{s.p}</p>}
              {s.p2 && <p style={{ marginTop: '14px' }}>{s.p2}</p>}
              {s.p3 && <p style={{ marginTop: '14px' }}>{s.p3}</p>}
              {s.items && s.items.map((item, j) => (
                <p key={j} style={{ marginTop: '14px' }}><strong style={{ fontWeight: 500 }}>{item.label}</strong> {item.text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
