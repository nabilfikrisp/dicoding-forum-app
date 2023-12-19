describe('Threads spec', () => {
  it('should display threads feed correctly', () => {
    cy.login('nabil123@gmail.com', '123456');

    cy.get('h2').contains('Threads');
  });

  it('should display thread detail if thread tittle clicked', () => {
    cy.login('nabil123@gmail.com', '123456');
    cy.get('h2').contains('Threads');
    cy.get('a').first().click();

    cy.url().should('include', '/threads/thread-');
  });

  it('should show like +1 if like button clicked', () => {
    cy.login('nabil123@gmail.com', '123456');
    cy.get('h2').contains('Threads');
    cy.get('a').first().click();

    cy.get('#like-icon').then(($icon) => {
      const numLike1 = parseInt($icon.text());

      cy.get('#like-icon')
        .click()
        .wait(1000)
        .then(() => {
          const numLike2 = parseInt($icon.text());
          if (numLike2 > numLike1) {
            expect(numLike2).to.equal(numLike1 + 1);
          } else {
            expect(numLike2).to.equal(numLike1 - 1);
          }
        });
    });
  });

  it('should show unike +1 if unlike button clicked', () => {
    cy.login('nabil123@gmail.com', '123456');
    cy.get('h2').contains('Threads');
    cy.get('a').first().click();

    cy.get('#unlike-icon').then(($icon) => {
      const numUnlike1 = parseInt($icon.text());

      cy.get('#unlike-icon')
        .click()
        .wait(1000)
        .then(() => {
          const numUnlike2 = parseInt($icon.text());
          if (numUnlike2 > numUnlike1) {
            expect(numUnlike2).to.equal(numUnlike1 + 1);
          } else {
            expect(numUnlike2).to.equal(numUnlike1 - 1);
          }
        });
    });
  });

  it('should successfully post a comment in thread', () => {
    cy.login('nabil123@gmail.com', '123456');
    cy.get('h2').contains('Threads');
    cy.get('a').first().click().wait(1000);

    cy.get('#total-comment').then(($totalComment) => {
      const totalComment = parseInt($totalComment.text());

      const newComment = `New comment ${new Date()}`;
      cy.get(
        'textarea[placeholder="Tell us what you think about the thread..."]',
      ).type(newComment);
      cy.get('button')
        .contains(/^Comment$/)
        .click()
        .wait(1000);

      cy.get('#total-comment').then(($newTotalComment) => {
        const newTotalComment = parseInt($newTotalComment.text());

        expect(newTotalComment).to.equal(totalComment + 1);
      });
    });
  });
});
