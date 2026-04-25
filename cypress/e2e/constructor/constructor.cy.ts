describe('конструктор', () => {
  beforeEach(() => {
    cy.setupBurgerApiMocks();
    cy.visitConstructorWithAuth();
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage();
  });

  it('по клику на ингредиент открывается модальное окно', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('420').should('exist');
      cy.contains('80').should('exist');
      cy.contains('24').should('exist');
      cy.contains('53').should('exist');
    });
  });

  it('модальное окно закрывается по клику на крестик', () => {
    cy.openFirstIngredientModal();
    cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('модальное окно закрывается по клику на оверлей', () => {
    cy.openFirstIngredientModal();
    cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.addIngredient('Краторная булка N-200i');
    cy.addIngredient('Биокотлета из марсианской Магнолии');

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
    cy.addIngredient('Краторная булка N-200i');
    cy.addIngredient('Биокотлета из марсианской Магнолии');
    cy.addIngredient('Соус Spicy-X');

    cy.get('[data-cy="constructor-order"]').contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-cy="order-number"]').should('contain.text', '104470');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="order-number"]').should('not.exist');

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
