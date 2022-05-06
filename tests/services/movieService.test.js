/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');

const MoviesModel = require('../../models/movieModel');
const MoviesService = require('../../services/movieService');

describe('Insere um novo filme no BD', () => {
	describe('quando o payload informado não é válido', async () => {
		const payloadMovie = {};

		it('retorna um boolean', async () => {
			const response = await MoviesService.create(payloadMovie);

			expect(response).to.be.a('boolean');
		});

		it('o boolean contém "false"', async () => {
			const response = await MoviesService.create(payloadMovie);

			expect(response).to.be.equal(false);
		});
	});

	describe('quando é inserido com sucesso', async () => {
		const payloadMovie = {
			title: 'Example Movie',
			directedBy: 'Jane Dow',
			releaseYear: 1999,
		};

		before(() => {
			const ID_EXAMPLE = 1;

			sinon.stub(MoviesModel, 'create')
				.resolves({ id: ID_EXAMPLE });
		});

		after(() => {
			MoviesModel.create.restore();
		});

		it('retorna um objeto', async () => {
			const response = await MoviesService.create(payloadMovie);

			expect(response).to.be.a('object');
		});

		it('tal objeto possui o "id" do novo filme inserido', async () => {
			const response = await MoviesService.create(payloadMovie);

			expect(response).to.have.a.property('id');
		});
	});
});

describe('Quando um filme é buscado', () => {

	describe('e ele não é encontrado,', () => {

		const expectedError = { error: true, message: 'Filme não encontrado' };

		before(() => {
			sinon.stub(MoviesModel, 'getById')
				.resolves(expectedError);
		});

		after(() => {
			MoviesModel.getById.restore();
		});

		it('o retorno é um objeto', async () => {
	
			const response = await MoviesService.getById();
	
			expect(response).to.be.an('object');
		});
	
		it('com um atributo de erro sendo true', async () => {

			const response = await MoviesService.getById();
	
			expect(response).to.have.property('error', true);
		});
	});
	describe('e ele é encontrado', () => {

		const payloadMovie = {
			id: 1,
			title: 'Example Movie',
			directedBy: 'Jane Dow',
			releaseYear: 1999,
		};

		before(() => {
			sinon.stub(MoviesModel, 'getById')
				.resolves(payloadMovie);
		});

		after(() => {
			MoviesModel.getById.restore();
		});

		it('a resposta é um objeto', async () => {
			const response = await MoviesService.getById();
			
			expect(response).to.be.an('object');
		});

		it('com os atributos "id", "title", "directedBy" e "releaseYear"', async () => {
			const response = await MoviesService.getById();

			expect(response).to.have.all.keys('id', 'title', 'directedBy', 'releaseYear');
		});
	});
});