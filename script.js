// Precio cargado desde el servidor
let precioLanzamientoARS = null;

function formatPrecioARS(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n);
}

async function loadPrice() {
  try {
    const res = await fetch('/.netlify/functions/get-price');
    if (!res.ok) return;
    const { launch, regular } = await res.json();
    precioLanzamientoARS = launch;

    const launchStr = formatPrecioARS(launch);
    const regularStr = formatPrecioARS(regular);

    document.querySelectorAll('.js-price-launch').forEach(el => { el.textContent = launchStr; });
    document.querySelectorAll('.js-price-regular').forEach(el => { el.textContent = regularStr; });
  } catch (e) {
    // silently fail — los placeholders quedan visibles
  }
}

document.addEventListener('DOMContentLoaded', loadPrice);

// Tracking de clicks en botones CTA
function trackCTAClick(location) {
  // Meta Pixel — InitiateCheckout (click en botón de compra)
  if (typeof fbq === 'function') {
    fbq('track', 'InitiateCheckout', {
      value: precioLanzamientoARS || 7000,
      currency: 'ARS',
      content_name: 'Odontología desde la panza',
      content_type: 'product',
    });
  }

  console.log('[CTA click]', location);
}

// Checkout MercadoPago — crea la preferencia de pago y redirige
async function handleCTAClick(event, location) {
  event.preventDefault();

  const btn = event.currentTarget;
  const originalText = btn.textContent.trim();

  trackCTAClick(location);

  btn.textContent = 'Redirigiendo...';
  btn.style.opacity = '0.7';
  btn.style.pointerEvents = 'none';

  try {
    const res = await fetch('/.netlify/functions/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('Error del servidor');

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No se recibió URL de pago');
    }
  } catch (err) {
    console.error('[MP Error]', err);
    btn.textContent = originalText;
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    alert('Hubo un problema al iniciar el pago. Por favor, intentá de nuevo.');
  }
}

// Meta Pixel — Lead (cuando alguien descarga una guía gratuita)
// Llamar esta función desde el botón/form de descarga de guía:
// fbq('track', 'Lead');
function trackLeadDownload() {
  if (typeof fbq === 'function') {
    fbq('track', 'Lead');
  }
}

// Meta Pixel — Purchase (confirmación de compra exitosa)
// Llamar esta función desde la página de thank-you o webhook de pago:
// trackPurchase();
function trackPurchase() {
  if (typeof fbq === 'function') {
    fbq('track', 'Purchase', {
      value: precioLanzamientoARS || 7000,
      currency: 'ARS',
      content_name: 'Odontología desde la panza',
      content_type: 'product',
    });
  }
}

// Smooth reveal al hacer scroll (opcional, mejora la experiencia)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .learn-block, .problem-item, .testimonio-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});
