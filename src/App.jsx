import { useState } from "react";
import { preguntas } from "./preguntas";
import "./App.css";

export default function App() {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const preguntaActual = preguntas[indice];

  const manejarRespuesta = (opcion) => {
    setRespuestaSeleccionada(opcion);
    setMostrarResultado(true);

    if (opcion === preguntaActual.correcta) {
      setPuntos(puntos + 1);
    }
  };

  const siguientePregunta = () => {
    const siguiente = indice + 1;
    if (siguiente < preguntas.length) {
      setIndice(siguiente);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setTerminado(true);
    }
  };

  return (
    <body>
    <div className="p-6 max-w-md mx-auto text-center fondo">
      {!terminado ? (
        <div>
          <h2 className="text-xl font-bold mb-4">{preguntaActual.pregunta}</h2>
          <div className="flex flex-col gap-2">
            {preguntaActual.opciones.map((op, i) => (
              <button
                key={i}
                onClick={() => manejarRespuesta(op)}
                disabled={mostrarResultado} // Bloquea más clics después de elegir
                className={`py-2 btn-1 rounded-lg ${
                  mostrarResultado
                    ? op === preguntaActual.correcta
                      ? "bg-green-500 text-white"
                      : op === respuestaSeleccionada
                      ? "bg-red-500 text-white"
                      : "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          {mostrarResultado && (
            <div className="mt-4">
              {respuestaSeleccionada === preguntaActual.correcta ? (
                <p className="text-green-600 font-bold">✅ ¡Correcto!</p>
              ) : (
                <p className="letra">
                  ❌ Incorrecto. La respuesta era:{" "}
                  <span className="underline">
                    {preguntaActual.correcta}
                  </span>
                </p>
              )}
              <button
                onClick={siguientePregunta}
                className="mt.4 btn-1"
              >
                Siguiente ➡️
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">🎉 Resultado Final 🎉</h2>
          <p className="mt-4">
            Tu puntaje: {puntos} / {preguntas.length}
          </p>
          <p className="mt-2">
            {puntos === preguntas.length
              ? "¡Eres un genio del humor absurdo! 🤯"
              : "Buen intento, pero todavía no eres el meme supremo 😂"}
          </p>
        </div>
      )}
    </div>
    </body>
  );
}
