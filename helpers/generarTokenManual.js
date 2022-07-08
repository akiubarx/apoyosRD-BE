const generarTokenM = () =>{
  const random = Math.random().toString(32).substring(2)//Cadena String aleatoria eliminando los primeros 2 caracteres
  const fecha = Date.now().toString(32);//Toma fecha y la convierte en cadena aleatoria
  return random+fecha;
}
export default generarTokenM;