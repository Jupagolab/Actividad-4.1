import './App.css';
import './styles/modo-oscuro.css';
import './styles/resultado.css';
import './styles/fuentes.css';
import Boton from './componentes/Boton';
import Buscar from './componentes/Buscar';
import TemaSistema from './componentes/TemaSistema'

function App() {
  
  const body = document.body;

  const Tema = () => {
    body.classList.toggle('Darkmode');
  }  

  return (
    <div className="App">
      <TemaSistema />
      <header>
        <div className="titulo">
          <h1>Diccionario en Inglés</h1>
        </div>
        <div className="modoOscuro">
          <Boton 
            tipoBoton={ Tema }
          />
        </div>
      </header>
      <main>
        <Buscar />
      </main>


    </div>
  );
}

export default App;
