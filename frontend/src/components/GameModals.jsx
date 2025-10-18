import React, { Suspense } from 'react';

export function GameModals({ 
  modals, 
  handleCloseModal,
  FixedMinimap,
  RecruiterPanel,
  ResetConfirmModal,
  handleTeleport,
  handleResetProgress,
  handleCancelReset,
  avatar,
  visitedBuildings,
  canWalk,
  isMobile,
  npc,
  obrero,
  fernando,
  pedro,
  setShowWelcome,
  setShowMinimapModal,
  setShowProyectos,
  setShowRecruiterPanel,
  setRecruiterMode,
  PUERTAS,
  // Lazy loaded modals
  EducacionModal,
  ExperienciaModal,
  SobreMiModal,
  SkillsBuildingModal,
  OtrosModal,
  ProyectosModal,
  ContactoModal,
  HobbiesModal,
  RRSSModal,
  HelpModal,
  WelcomeScreen,
  BuildingModal
}) {
  return (
    <Suspense fallback={<div style={{display: 'none'}} />}>
      <EducacionModal 
        isOpen={modals.educacion} 
        onClose={() => handleCloseModal('EDUCACION', 'educacion')} 
      />
      
      <ExperienciaModal 
        isOpen={modals.experiencia} 
        onClose={() => handleCloseModal('EXPERIENCIA', 'experiencia')} 
      />
      
      <SobreMiModal 
        isOpen={modals.skills}
        onClose={() => handleCloseModal('SOBRE_MI', 'skills')} 
      />
      
      <SkillsBuildingModal 
        isOpen={modals.skillsBuilding}
        onClose={() => handleCloseModal('SKILLS', 'skillsBuilding')} 
      />
      
      <OtrosModal 
        isOpen={modals.otros} 
        onClose={() => handleCloseModal('OTROS', 'otros')} 
      />
      
      <ProyectosModal 
        isOpen={modals.proyectos} 
        onClose={() => handleCloseModal('PROYECTOS', 'proyectos')} 
      />
      
      <ContactoModal 
        isOpen={modals.contacto} 
        onClose={() => handleCloseModal('CONTACTO', 'contacto')} 
      />
      
      <HobbiesModal 
        isOpen={modals.hobbies} 
        onClose={() => handleCloseModal('HOBBIES', 'hobbies')} 
      />
      
      <RRSSModal 
        isOpen={modals.rrss} 
        onClose={() => handleCloseModal('RRSS', 'rrss')} 
      />
      
      <HelpModal
        isOpen={modals.help}
        onClose={() => setShowHelp(false)}
      />
      
      <WelcomeScreen
        isOpen={modals.welcome}
        onEnter={() => setShowWelcome(false)}
      />
      
      <BuildingModal
        isOpen={modals.minimapModal}
        onClose={() => setShowMinimapModal(false)}
        title="Mapa del Mundo"
        icon="🗺️"
        maxWidth="95vw"
        maxHeight="90vh"
      >
        <div style={{ 
          width: '100%', 
          height: '70vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          overflow: 'auto'
        }}>
          <FixedMinimap 
            avatar={avatar}
            buildings={PUERTAS}
            visitedBuildings={visitedBuildings}
            npcs={[npc, obrero, fernando, pedro]}
            onTeleport={(x, y) => {
              handleTeleport(x, y);
              setShowMinimapModal(false);
            }}
            canWalkFunction={canWalk}
            isMobile={true}
          />
        </div>
      </BuildingModal>

      <RecruiterPanel 
        isOpen={modals.recruiterPanel} 
        onClose={() => {
          setShowRecruiterPanel(false);
          setRecruiterMode(false);
        }}
        onOpenProjects={() => setShowProyectos(true)}
      />

      <ResetConfirmModal
        isOpen={modals.resetConfirm}
        onConfirm={handleResetProgress}
        onCancel={handleCancelReset}
      />
    </Suspense>
  );
}
