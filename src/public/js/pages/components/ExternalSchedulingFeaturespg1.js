export default function Features() {
  const features = [
    'Barbeiros qualificados',
    'Cortes estilizados',
    'Agendamento rápido e simples'
  ];

  const featuresList = features
    .map(feature => `
      <li class="external-scheduling-feature-item">
        <span class="external-scheduling-feature-icon">✦</span>
        ${feature}
      </li>
    `).join('');

  return `
    <ul class="external-scheduling-features">
      ${featuresList}
    </ul>
  `;
}