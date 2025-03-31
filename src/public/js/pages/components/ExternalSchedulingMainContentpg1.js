import Features from './ExternalSchedulingFeaturespg1.js';

export default function MainContent() {
  return `
    <main class="external-scheduling-content">
      <div class="external-scheduling-text-content">
        <h2>Procurando por uma barbearia diferenciada?</h2>
        ${Features()}
        <a href="#agendar" class="external-scheduling-cta-button">Agendar um corte</a>
      </div>
      
      <div class="external-scheduling-image-container">
        <img alt="Barbeiro profissional cortando cabelo" 
             class="external-scheduling-barber-image">
      </div>
    </main>
  `;
}