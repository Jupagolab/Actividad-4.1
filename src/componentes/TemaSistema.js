import React, { useState, useEffect } from 'react';

const TemaSistema = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;

    const handleDarkMode = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('Darkmode');
        setIsDarkMode(true);
      } else {
        body.classList.remove('Darkmode');
        setIsDarkMode(false);
      }
    };

    handleDarkMode(); // Llamada inicial para establecer el modo oscuro al cargar la página

    // Suscríbete a cambios en el tema del sistema
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', handleDarkMode);

    // Limpia la suscripción al desmontar el componente
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkMode);
    };
  }, []);

};

export default TemaSistema;
