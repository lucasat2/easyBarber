export default class ExternalSchedulingPg2 {
    constructor() {
        this.services = [
            {
                title: 'Corte básico',
                duration: '30 min',
                price: 'R$ 35',
                description: 'Corte simples na tesoura usando técnicas afiadas e bem laminadas'
            },
            {
                title: 'Corte básico',
                duration: '30 min',
                price: 'R$ 35',
                description: 'Corte simples na tesoura usando técnicas afiadas e bem laminadas'
            },
            {
                title: 'Corte básico',
                duration: '30 min',
                price: 'R$ 35',
                description: 'Corte simples na tesoura usando técnicas afiadas e bem laminadas'
            }
        ];
    }

    createServiceCard(service) {
        return `
            <div class="externalScheduling_Pg2__card">
                <div class="externalScheduling_Pg2__card-content">
                    <h3 class="externalScheduling_Pg2__title">${service.title}</h3>
                    <div class="externalScheduling_Pg2__info">
                        <span class="externalScheduling_Pg2__duration">${service.duration}</span>
                        <span class="externalScheduling_Pg2__price">${service.price}</span>
                    </div>
                    <p class="externalScheduling_Pg2__description">${service.description}</p>
                </div>
            </div>
        `;
    }

    render() {
        const header = `
            <header class="externalScheduling_Pg2__header">
                <img src="../assets/externalSchedulingPage/—Pngtree—barbershop\ logo_7966220\ 1.png" alt="" class="externalScheduling_Pg2__logo">
                <h1 class="externalScheduling_Pg2__title">Barbearia Urbana</h1>
            </header>
        `;

        const servicesGrid = `
            <div class="externalScheduling_Pg2__grid">
                ${this.services.map(service => this.createServiceCard(service)).join('')}
                ${this.services.map(service => this.createServiceCard(service)).join('')}
            </div>
        `;

        return `
            <div class="externalScheduling_Pg2">
                ${header}
                ${servicesGrid}
            </div>
        `;
    }
}