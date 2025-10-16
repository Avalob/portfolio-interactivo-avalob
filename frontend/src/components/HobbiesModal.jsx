// ============================================================
// 1. IMPORTACIONES Y DEPENDENCIAS
// ============================================================
import BuildingModal from './BuildingModal';
import './BuildingModal.css';

// ============================================================
// 2. COMPONENTE: HobbiesModal
// Modal para mostrar hobbies y pasiones personales
// ============================================================
function HobbiesModal({ isOpen, onClose }) {
  // Lista de hobbies y pasiones, cada uno con icono, título y descripción
  const hobbies = [
    {
      icon: '🎭',
      title: 'Arte Dramático',
      description: 'Me formé en Estudio Corazza para el Actor, una experiencia que me ayudó a entender mejor a las personas y también a conocerme a mí misma. Descubrí cómo la interpretación puede conectar emociones, comunicación y empatía de una forma única.'
    },
    {
      icon: '👗',
      title: 'Moda & Diseño',
      description: 'Crecí viendo a mi madre patronar y confeccionar prendas en su escuela de alta costura. Junto a ella aprendí el arte del diseño, la precisión y el gusto estético, creando mis propios bocetos digitales y desarrollando una visión similar a la arquitectura.'
    },
    {
      icon: '💃',
      title: 'Baile',
      description: 'Comencé en el hip hop y más tarde exploré el clásico, contemporáneo y los bailes latinos como bachata, salsa y kizomba. El baile es mi forma de liberar energía, mantenerme activa y expresarme con ritmo y emoción.'
    },
    {
      icon: '🏔️',
      title: 'Naturaleza & Submarinismo',
      description: 'Me apasiona la naturaleza y el deporte al aire libre. Disfruto del senderismo, los viajes y el submarinismo, actividad en la que tengo certificación. Siempre busco aventuras nuevas para seguir descubriendo el mundo y desconectando de la rutina.'
    },
    {
      icon: '🎨',
      title: 'Arte & Pintura',
      description: 'De mi padre heredé la pasión por el arte y la pintura al óleo. Me gusta explorar colores, formas y texturas como una manera de expresar emociones y transformar ideas en algo visual y tangible.'
    },
    {
      icon: '🎸',
      title: 'Música & Guitarra',
      description: 'Toco la guitarra eléctrica y tengo nociones de piano. La música combina arte, técnica y disciplina, y me inspira tanto para crear como para concentrarme en cualquier proyecto que emprendo.'
    },
    {
      icon: '⛸️',
      title: 'Patinaje Artístico',
      description: 'Desde pequeña practico patinaje sobre ruedas, llegando a competir en varias ocasiones. Es una disciplina que une música, movimiento y libertad, y me permite mantener el equilibrio físico y mental.'
    },
    {
      icon: '🎬',
      title: 'Cine & Teatro',
      description: 'Soy una gran amante del cine y las sagas. Me gusta sumergirme en las historias de forma inmersiva, disfrutando de su capacidad para inspirar, emocionar y hacerte viajar sin moverte del sitio.'
    }
  ];

  // ============================================================
  // 3. RENDER DEL MODAL Y LISTADO DE HOBBIES
  // ============================================================
  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mis Hobbies & Pasiones"
      icon="✨"
      maxWidth="90%"
      maxHeight="90%"
    >
      <div className="building-section">
        <div>
          {/* Renderiza cada hobby como una tarjeta visual */}
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="experience-card"
              style={{
                cursor: 'default',
                pointerEvents: 'none',
                padding: '1rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '0.75rem',
                width: '100%'
              }}>
                {/* Icono visual del hobby */}
                <div style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                  flexShrink: 0
                }}>
                  {hobby.icon}
                </div>
                {/* Título del hobby */}
                <h3 style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.01em'
                }}>
                  {hobby.title}
                </h3>
              </div>
              {/* Descripción del hobby */}
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                paddingLeft: '0.5rem',
                width: '100%'
              }}>
                {hobby.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BuildingModal>
  );
}

// ============================================================
// 4. EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default HobbiesModal;
