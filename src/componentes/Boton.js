import React from "react"; 
 
function Boton({ tipoBoton }) { 
  console.log(tipoBoton); 
  return ( 
      <input  
        type="button"  
        value={ "Cambiar Tema" }  
        id={ "Darkmode" }  
        onClick={ tipoBoton } 
      /> 
  ); 
} 
 
export default Boton;
