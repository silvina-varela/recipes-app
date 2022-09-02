const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should work when its a valid title', () => {
        Recipe.create({ title: 'This is a title' });
      
      it('should throw error if it is not a string', (done) => {
        Recipe.create({title: 12})
        .then(() => done(new Error('It requires a valid title')))
        .catch(() => done());

      })
      });      
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({ title: 'This is a title' })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a string', () => {
        Recipe.create({ summary: 'This is a summary of a recipe' });
        
      });      
    });

    describe('HealthScore', () => {
      it('should throw an error if it is not a number', (done) => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 'Not a healthScore'})
        .then(() => done(new Error('It requires a valid healthScore')))
        .catch(() => done());
      })
      it('should throw an error if it is a string', (done) => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: '1.2'})
        .then(() => done(new Error('It requires a valid healthScore')))
        .catch(() => done());
      })
      it('should work when its a number', () => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 1})
        
      });
    })
    describe('instructions', () => {
      it('should throw an error if it is not an array with an object', (done) => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 100, readyInMinutes: 45, instructions: 'A string'})
        .then(() => done(new Error('It requires valid instructions')))
        .catch(() => done());
      })
      it('should work when its the correct data type', () => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 100, readyInMinutes: 45, instructions: [{number: 1, step: 'Do something'}]})
        
      });
    })
    describe('image', () => {
      it('should throw an error if it is not a string', (done) => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 100, readyInMinutes: 45, instructions: [{number: 1, step: 'Do something'}], image: []})
        .then(() => done(new Error('It requires a valid image')))
        .catch(() => done());
      })
      it('should work when its the correct data type', () => {
        Recipe.create({ title: 'This is a title', summary: 'This is a summary of a recipe', healthScore: 100, readyInMinutes: 45, instructions: [{number: 1, step: 'Do something'}], image: 'https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg'})
        
      });
    })
  
  });
});
