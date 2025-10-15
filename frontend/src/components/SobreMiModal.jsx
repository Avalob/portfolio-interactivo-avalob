
import BuildingModal from './BuildingModal';
import './BuildingModal.css';


function SobreMiModal({ isOpen, onClose }) {
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Sobre Mí"
      icon="👩‍💻"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div style={{width: '100%', height: '100%'}}>
        <div className="sobremi-columns-container">
                  <div className="building-section sobremi-foto-section">
          <img 
            src="/Mi_foto.jpg" 
            alt="Foto personal" 
            className="sobremi-foto-img"
          />
        </div>
          <div className="building-section">
            <h2>💡 ¿Quién Soy?</h2>
            <p>
              Soy <strong>Desarrolladora Full Stack</strong> con una mente lógica y creativa a partes iguales. 
              Me apasiona transformar ideas en experiencias digitales reales y hacer que la tecnología funcione 
              de forma fluida, estética y eficiente.
            </p>
          </div>

          <div className="building-section">
            <h2>🎨 De la Moda al Código</h2>
            <p>
              Durante años trabajé en el mundo de la <strong>moda</strong>, donde desarrollé un marcado sentido <strong>artístico y estético</strong>.  
              Esa experiencia me enseñó a cuidar los detalles, entender la armonía visual y valorar la creatividad como parte esencial 
              de cualquier proyecto.
            </p>
            <p>
              Desde pequeña me interesó la <strong>tecnología</strong>. Empecé a crear <strong>webs de forma autodidacta</strong> y descubrí una fascinación por la lógica, 
              la estructura y el desafío de hacer que las cosas funcionen.  
              Ese interés natural fue el inicio de mi camino como desarrolladora.
            </p>
          </div>

          <div className="building-section">
            <h2>⚙️ Lógica, Creatividad y Perseverancia</h2>
            <p>
              Tengo un gran don para la <strong>comunicación</strong> y una fuerte afinidad por la <strong>lógica y las matemáticas</strong>.  
              Cuando un proyecto me motiva, <strong>no descanso hasta conseguir el resultado que busco</strong>.
            </p>
            <p>
              Soy una persona <strong>muy proactiva</strong>, con una gran capacidad para <strong>aprender de forma autónoma</strong>.  
              Investigo, pruebo, experimento y estoy en constante aprendizaje, siempre buscando nuevas metas y retos.
            </p>
          </div>

          <div className="building-section">
            <h2>💻 Mi Mundo Tech</h2>
            <p>
              Disfruto especialmente del <strong>frontend</strong>, donde puedo combinar mi parte técnica con la creatividad.  
              Me encanta trabajar con <strong>React</strong> y construir interfaces intuitivas, dinámicas y bien estructuradas.  
              Me motiva lograr que cada detalle tenga sentido, tanto en funcionalidad como en experiencia de usuario.
            </p>
          </div>

          <div className="building-section">
            <h2>🤝 Cómo Trabajo</h2>
            <p>
              Soy una profesional <strong>organizada, entusiasta y colaborativa</strong>.  
              Me encanta trabajar en equipo, compartir conocimientos y aprender de las personas que me rodean.  
              Creo firmemente que la <strong>colaboración y la comunicación</strong> son la base de los mejores resultados.
            </p>
          </div>

          <div className="building-section">
            <h2>📍 Información Personal</h2>
            <p>
              Actualmente vivo en <strong>Madrid</strong>.  
              Cuento con <strong>vehículo propio y carnet de conducir</strong>, lo que me permite adaptarme fácilmente 
              a entornos <strong>presenciales, híbridos o en remoto</strong>.
            </p>
          </div>

          <div className="building-section">
            <h2>🚀 En Resumen</h2>
            <p>
              Soy una <strong>desarrolladora apasionada y en constante evolución</strong>, con un perfil que combina <strong>lógica, arte y curiosidad</strong>.  
              Mi objetivo es seguir participando en proyectos que unan <strong>tecnología, creatividad y propósito</strong>, 
              aportando valor y dejando una huella positiva en cada desarrollo.
            </p>
          </div>
        </div>
      </div>
    </BuildingModal>
  );
}

export default SobreMiModal;
