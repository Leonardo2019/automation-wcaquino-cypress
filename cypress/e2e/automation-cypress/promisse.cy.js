/// <reference types='cypress'/>

it('Sem teste ainda', () => {})
// Cypress ._. times(5, () => {

const getSomething = (callback) => {
    setTimeout(()=> {
        callback(12);
        
    }, 1000)
}
const system = () => {
    console.log('init');

    getSomething(some => {
        console.log(`Something is ${some}`)
        console.log('end');
    })

}
system();


