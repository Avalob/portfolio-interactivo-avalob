/**
 * ============================================
 * FRAMER MOTION - Helpers y configuraciones
 * Transiciones pixel-art suaves
 * ============================================
 */

/**
 * Variantes de animación para modales
 */
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.6, 0, 0.4, 1] // --ease-in-out del design system
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.15,
      ease: [0.6, 0, 1, 1] // --ease-in
    }
  }
};

/**
 * Variantes para overlays (backgrounds de modales)
 */
export const overlayVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
};

/**
 * Variantes para paneles laterales (slide from side)
 */
export const slidePanelVariants = {
  hidden: {
    x: '100%',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0, 0, 0.4, 1] // --ease-out
    }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.6, 0, 1, 1]
    }
  }
};

/**
 * Variantes para notificaciones (toast)
 */
export const notificationVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.4, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Variantes para botones con hover/tap
 */
export const buttonVariants = {
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.1
    }
  },
  tap: {
    scale: 0.98,
    y: 1,
    transition: {
      duration: 0.05
    }
  }
};

/**
 * Variantes para cards con hover
 */
export const cardVariants = {
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.4, 1]
    }
  },
  tap: {
    scale: 0.98
  }
};

/**
 * Stagger para listas de elementos
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Variantes para fade in simple
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

/**
 * Configuración global de transiciones
 */
export const transitions = {
  instant: { duration: 0.05 },
  fast: { duration: 0.1 },
  base: { duration: 0.2 },
  slow: { duration: 0.3 }
};

/**
 * Easing curves pixel-art
 */
export const easings = {
  easeIn: [0.6, 0, 1, 1],
  easeOut: [0, 0, 0.4, 1],
  easeInOut: [0.6, 0, 0.4, 1]
};
