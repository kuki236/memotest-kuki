const URL = "http://127.0.0.1:8080"
const numero_cartas = 16

context('memotest',()=>{
  before(() => {
    cy.viewport(1920, 1080)
    cy.visit(URL)
  });
  describe('juega al memotest', () => {
    it ('Verifica que todas las cartas se hayan creado', ()=>{
       cy.get('.todas-cartas').find('.carta').should('have.length',numero_cartas)
    });  
    let listaNames =[];
   it('Debería hacer clic en el botón "Empezar"', () => {
    cy.visit(URL)
    cy.viewport(1920, 1080)
    cy.get('.boton-empezar').click();
    cy.get('.pokemon').then((pokemon) => {
          pokemon.each(function (i,pokemon)  {
          listaNames.push(pokemon.getAttribute('name'))
        })
      })
    cy.visit(URL);
    cy.get('.boton-empezar').click();
    let listaNamesNueva =[]
    cy.get('.pokemon').then((pokemon) => {
      pokemon.each(function (i,pokemon)  {
        listaNamesNueva.push(pokemon.getAttribute('name'))
      })
      cy.wrap(listaNames).should('not.deep.equal',listaNamesNueva)
    });
  });
  });
  describe('Resuelve el juego', () =>{

    it ('Elige uno incorrecto',()=>{
      cy.visit(URL)
      cy.viewport(1920, 1080)
      cy.get('.boton-empezar').click();
      cy.get('.pokemon').then(pokemon=>{
        let mapaDePares = obtenerParesdeCuadros(pokemon)
        let listaDePares = Object.values(mapaDePares);
        console.log(listaDePares)
        cy.get(listaDePares[0][0]).closest('.carta').click();
        cy.wait(1000)
        cy.get(listaDePares[1][0]).closest('.carta').click();
      })
    })
    it('Resuelve el juego',()=>{
      cy.visit(URL)
      cy.viewport(1920, 1080)
      cy.get('.boton-empezar').click();
      cy.get('.pokemon').then(pokemon=>{
        let mapaDePares = obtenerParesdeCuadros(pokemon)
        let listaDePares = Object.values(mapaDePares);
        listaDePares.forEach((par) => {
          cy.get(par[0].closest('.carta')).click();
          cy.get(par[1].closest('.carta')).click();
          cy.wait(1000)
        });
      })
      cy.get('#estado').should('have.class', 'alert alert-danger')
    })
  })
});
function obtenerParesdeCuadros(cuadro){
  const pares = {}
  cuadro.each((i,cuadro) => {
    const nombrePokemon = cuadro.getAttribute('name')
    if (pares[nombrePokemon]){
      pares[nombrePokemon].push(cuadro)
    }else{
      pares[nombrePokemon] = [cuadro]
    }
    })
  console.log(pares)  
  return pares
}