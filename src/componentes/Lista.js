import React, { useState } from 'react'

const Lista = () => {

  // Nuevo estado para el tipo de fuente seleccionado
  const [selectedFont, setSelectedFont] = useState('Open Sans');

  // Función para cambiar la fuente
  const handleChangeFont = (e) => {
    const selectedValue = e.target.value;
    setSelectedFont(selectedValue);
    // Aplica el estilo al body o a cualquier otro elemento que desees
    document.body.classList.add(selectedValue);
  };

  return (
    <>
      <select id="Fuentes" value={selectedFont} onChange={handleChangeFont}>
        <option value={"fuente1"}>Open Sans</option>
        <option value={"fuente2"}>Roboto</option>
        <option value={"fuente3"}>Lato</option>
        <option value={"fuente4"}>Montserrat</option>
        <option value={"fuente5"}>Poppins</option>
        <option value={"fuente6"}>Source Sans Pro</option>
      </select>
    </>
  )
}

export default Lista;