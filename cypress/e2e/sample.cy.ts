describe('Home page', () => {
    it('loads', () => {
      cy.visit('/')
      cy.contains('Template Vue 3 + Tailwind + TypeScript')
    })
})