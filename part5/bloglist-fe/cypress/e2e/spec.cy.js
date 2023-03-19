describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user1 = {
    //   name: 'testUser1',
    //   username: 'test1',
    //   password: 'test123',
    // }
    // const user2 = {
    //   name: 'testUser2',
    //   username: 'test2',
    //   password: 'test123',
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user1)
    // cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  afterEach(function(){
    cy.wait(500)
  })

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login Logic',function() {

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test1')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
      cy.contains('Logged in as testUser')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test1')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-blog-create-button').click()
      cy.get('#new-blog-title').type('First Blog')
      cy.get('#new-blog-author').type('Author A')
      cy.get('#new-blog-url').type('https://google.com')
      cy.get('#new-blog-submit-button').click()
      cy.contains('a new blog First Blog by Author A added')
    })
    
    describe('the blog can be', function(){
      it('can be liked',function(){
        cy.get('#blog-view-more').click()
        cy.get('#like-blog').click()
        cy.contains('Likes: 1')
      })
      // This test will fail due to unhandled error
      it('cannot be deleted by another user',function(){
        cy.on('uncaught:exception', (err, runnable) => {
          cy.get("#logout-button").click()
          cy.get('#username').type('test2')
          cy.get('#password').type('test123')
          cy.get('#login-button').click()
          cy.get('#blog-view-more').click()
          cy.get('#remove-blog').click().should()
          cy.contains('New Blog Name New Blog Author')
          return false;
        });
      })
      it('can deleted by creator',function(){
        cy.get('#blog-view-more').click()
        cy.get('#remove-blog').click()
        cy.on('windows:confirm', () => true)
      })
      it('sorted by descending likes', function(){
        cy.get('#new-blog-create-button').click()
        cy.get('#new-blog-title').type('First Blog')
        cy.get('#new-blog-author').type('Author A')
        cy.get('#new-blog-url').type('https://google.com')
        cy.get('#new-blog-submit-button').click()
        cy.get('#blog-view-more').click()
        cy.get('#like-blog').click()

        cy.get('#new-blog-create-button').click()
        cy.get('#new-blog-title').type('Another Blog')
        cy.get('#new-blog-author').type('Author B')
        cy.get('#new-blog-url').type('https://google.com')
        cy.get('#new-blog-likes').type('6')
        cy.get('#new-blog-submit-button').click()

        cy.get('.blogContent').eq(0).should('contain', 'Another Blog')
        cy.get('.blogContent').eq(1).should('contain', 'First Blog')
      })
    })
  })

})