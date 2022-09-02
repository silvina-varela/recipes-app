/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'A title', summary: 'A summary'
};



describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async () =>{
      const recipe = await agent.get('/recipes')
      expect(recipe.statusCode).to.equal(200);
      
  });

    it('should get 404', async () =>{
      const recipe2 = await agent.get('/undefinedroute')
      expect(recipe2.statusCode).to.equal(404);
  })
  });
});

// Validaciones de create
describe('Create', () => {
const badHealth = {title: 'A title', summary: 'A summary', healthScore: 1000}
const badImage = {title: 'A title', summary: 'A summary', healthScore: 100, readyInMinutes: 45, instructions: [{}], image: 'http:/notaurl'}
const goodHealth = {title: 'A title', summary: 'A summary', healthScore: 10}
const goodImage = {title: 'A title', summary: 'A summary', healthScore: 100, readyInMinutes: 45, instructions: [{}], image: 'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg'}
  
describe('POST /create', () => {
    it('should get 200 when healthScore is correct', async () =>{
      const recipe = await agent.post('/create').send(goodHealth)
      expect(recipe.statusCode).to.equal(200);
    });    
  });
    it('should get 200 when image is a valid url', async () =>{
      const recipe2 = await agent.post('/create').send(goodImage)
      expect(recipe2.statusCode).to.equal(200);
    });
  
 describe('POST /create ERROR', () => {
      it('should get 400 when healthScore is incorrect', async () =>{
        const recipe = await agent.post('/create').send(badHealth)
        expect(recipe.statusCode).to.equal(400);
      });    
    });
      it('should get 400 when image is an invalid url', async () =>{
        const recipe2 = await agent.post('/create').send(badImage)
        expect(recipe2.statusCode).to.equal(400);
      });
  
  });
 