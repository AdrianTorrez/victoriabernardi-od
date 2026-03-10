// Tracking de clicks en botones CTA
// Reemplazar 'GA_MEASUREMENT_ID' con el ID real de Google Analytics 4

function trackCTAClick(location) {
  // GA4 — descomentar cuando esté configurado el ID real
  // if (typeof gtag === 'function') {
  //   gtag('event', 'cta_click', {
  //     event_category: 'conversion',
  //     event_label: location,
  //   });
  // }

  // Log en desarrollo
  console.log('[CTA click]', location);
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
