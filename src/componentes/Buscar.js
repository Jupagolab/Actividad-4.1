//Elaborado por Juan Gonzalez

import React, { useState, useEffect } from 'react';
import Lista from './Lista';

const Buscar = () => {

  const API = "https://api.dictionaryapi.dev/api/v2/entries/en/"

  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const manejarInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const manejarBuscar = async () => {
    try {
      const response = await fetch(`${API}${inputValue}`);
      const data = await response.json();

      if (data.length === 0) {
        setErrorMessage(`No se encontraron resultados para "${inputValue}"`);
        setSearchResult(null);
      } else {
        const definitions = data[0].meanings.map(meaning => meaning.definitions[0].definition);
        const synonyms = data[0].meanings.flatMap(meaning => meaning.synonyms);
        const phonetics = data[0].phonetics.filter(texto => texto.text);
        const sourceUrls = data[0].sourceUrls.filter(links => links.length > 0);
        const audioUrl = data[0].phonetics.filter(pronunciation => pronunciation.audio);

        let phoneticText = '';

        if (phonetics.length === 0) {
          phoneticText = 'No hay fonética disponible en la API';
        } else {
          for (let i = 0; i < phonetics.length; i++) {
            if (i === 1) {
              phoneticText = `${phoneticText}\n
              También:`;
            }
            phoneticText = phoneticText + ' ' + phonetics[i].text;
          }
        }

        setSearchResult({
          word: data[0].word,
          definitions: definitions,
          synonyms: synonyms,
          phoneticText: phoneticText,
          sourceUrls: sourceUrls,
          audioUrl: audioUrl.length === 0 ? null : audioUrl[0].audio,
        });

        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      setErrorMessage(`Error al obtener datos de la API para "${inputValue}"`);
      setSearchResult(null);
    }
  };

  useEffect(() => {
    if (inputValue !== '') {
      manejarBuscar();
    }
  }, [inputValue]);

  return (
    <div>
      <label>Palabra en inglés</label>
      <input
        type="text"
        value={inputValue}
        onChange={manejarInputChange}
        placeholder="Ingresa tu búsqueda"
      />
      
      <input type="button" id="boton" value={"Buscar"} onClick={manejarBuscar}/>
      <Lista />

      {errorMessage && <p>{errorMessage}</p>}
      {searchResult && (
        <div id="resultado">
          <h2>{searchResult.word}</h2>
          <ul>
            {searchResult.definitions.map((definition, index) => (
              <li key={index}>{definition}</li>
            ))}
            <h3>Sinónimos:</h3>
            {searchResult.synonyms.length ? (
              <ul>{searchResult.synonyms.map((synonym, index) => <li key={index}>{synonym}</li>)}</ul>
            ) : (
              <p>No hay sinónimos disponibles.</p>
            )}
            <h3>Fonética:</h3>
            <p>{searchResult.phoneticText}</p>
          </ul>
          {searchResult.audioUrl && (
            <div>
              <button onClick={() => new Audio(searchResult.audioUrl).play()}>Reproducir Audio</button>
            </div>
          )}
          <h3>Enlaces fuente:</h3>
          {searchResult.sourceUrls.length ? (
            <ul>
              {searchResult.sourceUrls.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay enlaces disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Buscar;
