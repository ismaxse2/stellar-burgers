describe('конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('по клику на ингредиент открывается модальное окно', () => {
    cy.get('[data-cy^="ingredient-"]').first().click();

    cy.contains('Детали ингредиента').should('exist');
  });

  it('модальное окно закрывается по клику на крестик', () => {
    cy.get('[data-cy^="ingredient-"]').first().click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy="modal-close"]').click();

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('модальное окно закрывается по клику на оверлей', () => {
    cy.get('[data-cy^="ingredient-"]').first().click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="constructor-bun-bottom"]').should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="constructor-ingredient"]').should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('создает заказ, открывает модальное окно с номером заказа, закрывает его и проверяет конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .contains('Добавить')
      .click();

    cy.contains('Соус Spicy-X').parents('li').contains('Добавить').click();

    cy.get('[data-cy="constructor-order"]').contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-cy="order-number"]').should('contain.text', '104470');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="order-number"]').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
