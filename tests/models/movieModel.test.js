/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const MoviesModel = require('../../models/movieModel');

describe('Insere um novo filme no BD', () => {
	const payloadMovie = {
		title: 'Example Movie',
		directedBy: 'Jane Dow',
		releaseYear: 1999,
	};

	before(async () => {
		const execute = [{ insertId: 1 }];

		sinon.stub(connection, 'execute').resolves(execute);
	});

	after(async () => {
		connection.execute.restore();
	});

	describe('quando é inserido com sucesso', async () => {

		it('retorna um objeto', async () => {
			const response = await MoviesModel.create(payloadMovie);

			expect(response).to.be.a('object');
		});

		it('tal objeto possui o "id" do novo filme inserido', async () => {
			const response = await MoviesModel.create(payloadMovie);

			expect(response).to.have.a.property('id');
		});
	});
});

describe('Busca um filme pelo ID no BD', () => {

	describe('Quando não é buscado com sucesso', () => {

		before(async () => {
			const execute = [[]];
  
			sinon.stub(connection, 'execute').resolves(execute);
		});
  
		after(async () => {
			connection.execute.restore();
		});

		it('retorna um array', async () => {
			const response = await MoviesModel.getById();

			expect(response).to.be.an('array');
		});

		it('que está vazio', async () => {
			const response = await MoviesModel.getById();

			expect(response).to.be.empty;
		});
	});
  
	describe('Quando é buscado com sucesso', () => {

		const payloadMovie = {
			id: 1,
			title: 'Example Movie',
			directedBy: 'Jane Dow',
			releaseYear: 1999,
		};

		before(async () => {
			const execute = [[payloadMovie]];
  
			sinon.stub(connection, 'execute').resolves(execute);
		});
  
		after(async () => {
			connection.execute.restore();
		});

		it('retorna um array', async () => {
			const response = await MoviesModel.getById();

			expect(response).to.be.an('array');
		});

		it('que não está vazio', async () => {
			const response = await MoviesModel.getById();

			expect(response).not.to.be.empty;
		});

		it('que contém um objeto', async () => {
			const [response] = await MoviesModel.getById();

			expect(response).to.be.an('object');
		});

		it('com os atributos "id", "title", "directedBy" e "releaseYear"', async () => {
			const [response] = await MoviesModel.getById();

			expect(response).to.have.all.keys('id', 'title', 'directedBy', 'releaseYear');
		});
	});
});