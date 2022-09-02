/* eslint-disable */
// el comentario de arriba evita que me salga un warning en la consola por todos los escaped characters que hay en las reg exps.
const validate = (data) => {
  let error = {}
  let { title, summary, healthScore, readyInMinutes, image, instructions } = data

/* TITLE */
  let onlyLetters = /^[A-zÀ-ÿ'&\s,]+$/ig // letras de A-Z, con acentos (´ ` ^), comas, espacios y ñ, case insensitive (i), y también apóstrofe (')
  if(title?.length){
    if(!onlyLetters.test(title))  error.title = 'Your title can\'t have any special characters or numbers'
    else if(title?.length < 5 && title?.length <= 60) error.title = 'Your title must have between 5 and 60 characters'
  }

/* SUMMARY */
  let mostCharacters = /^[A-zÀ-ÿ'\(\)<>%"¡!¿\?,;:&\$\-\d\.\s]+$/ig  // Letras, números, puntuación y algunos caracteres extra
  if(summary?.length){
    if(!mostCharacters.test(summary)) error.summary = 'Only letters, numbers and some special characters are accepted'
    else if(summary?.length < 10  && summary?.length <= 1500) error.summary = 'Your summary must have between 10 and 1500 characters'
  } 
   
/* HEALTH SCORE */
  // No necesito validar si son números porque el input no permite escribir otra cosa
  // Quiero que 0 sea aceptado como valor (como indicación de que el usuario no quiere completar ese campo)
  // por más que html no permite hacer submit cuando está fuera del range, lo defino para que salga el mensaje
  if(healthScore < 0 || healthScore > 100) error.healthScore = 'The Health Score must be a number between 0 and 100' 
  if(healthScore.toString().length > 1 && healthScore.toString()[0] === '0') error.healthScore = 'The Health Score can\'t start with zero'
  if(healthScore.toString().includes('.') || healthScore.toString().includes('e')) error.healthScore = 'The Health Score must be an integer'
  if(Number.isNaN(healthScore)) error.healthScore = 'The Health Score must be a number'

/* READY IN MINUTES */
  // Establezco que el máximo sea 4 horas 
  if(readyInMinutes < 0 || readyInMinutes > 240) error.readyInMinutes = 'The cooking time must be a number between 0 and 240'
  if(readyInMinutes.toString().length > 1 && readyInMinutes.toString()[0] === '0') error.readyInMinutes = 'The cooking time can\'t start with zero'
  if(readyInMinutes.toString().includes('.') || readyInMinutes.toString().includes('e')) error.readyInMinutes = 'The cooking time must be an integer'
  if(Number.isNaN(readyInMinutes)) error.readyInMinutes = 'The cooking time must be a number'

/* IMAGE */
  let isLink = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig 
  // html tiene una validación al ponerle type url, pero no chequea que no queden espacios entre letras
  // en el back configuré para que borre espacios al principio y al final del string como medida extra
  if(image?.length) if(!isLink.test(image)) error.image = 'Please write a valid link'
   
/* INSTRUCTIONS y STEPS */
if(instructions?.length){
  for(let i = 0; i < instructions.length; i++){
    let testInstructions = /^[A-zÀ-ÿ'\(\)<>%"¡!¿\?,;:+\*&\$\-\d\.\s]+$/ig
    let step = instructions[i]["step"]
    console.log('step: '+step)
    if(i !== 0 && !instructions[i-1]["step"]) error.instructions = 'You need to fill in the previous instruction'
    else{
      if(!testInstructions.test(step)) error.instructions = 'Only letters, numbers and some special characters are accepted'
      else if(step.length > 150) error.step = 'Each step should have less than 150 characters'
    }
  }}
  
return error
}



module.exports = {validate}