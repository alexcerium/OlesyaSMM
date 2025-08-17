// Theme Configuration - Centralized design system
const theme = {
    // Color Palette
    colors: {
        // Primary Colors
        primary: {
            gradient: 'linear-gradient(135deg, #FAEBD7 0%, #F4C9A4 100%)',
            gradientStart: '#FAEBD7',
            gradientEnd: '#F4C9A4',
            solid: '#F5F5DC' // Fallback for older browsers
        },
        
        // Background Colors
        background: {
            primary: '#FAFAFA', // Cool white
            secondary: 'linear-gradient(135deg, #FAEBD7 0%, #F4C9A4 100%)',
            dark: '#2C2C2C',
            overlay: 'rgba(0,0,0,0.8)'
        },
        
        // Text Colors
        text: {
            primary: '#2C2C2C', // Dark brown
            secondary: '#666666', // Gray
            light: '#F5F5DC',
            muted: '#CCCCCC'
        },
        
        // Accent Colors
        accent: {
            gold: '#D4AF37',
            goldDark: '#B8860B',
            success: '#4CAF50',
            info: '#2196F3',
            warning: '#FF9800',
            error: '#F44336'
        },
        
        // UI Colors
        ui: {
            border: '#EEEEEE',
            shadow: 'rgba(0,0,0,0.1)',
            shadowDark: 'rgba(0,0,0,0.15)',
            overlay: 'rgba(0,0,0,0.8)'
        },
        
        // Navigation Colors
        navbar: {
            background: 'rgba(250, 235, 215, 0.95)',
            backgroundScrolled: 'rgba(250, 235, 215, 0.98)',
            shadow: '0 2px 20px rgba(0,0,0,0.1)'
        }
    },

    // Typography
    typography: {
        // Font Families
        fonts: {
            heading: "'Playfair Display', serif",
            body: "'Inter', sans-serif",
            fallback: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        
        // Font Weights
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            black: 900
        },
        
        // Font Sizes
        sizes: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem',    // 48px
            '6xl': '3.75rem', // 60px
            '7xl': '4.5rem'   // 72px
        },
        
        // Line Heights
        lineHeights: {
            tight: 1.2,
            normal: 1.6,
            relaxed: 1.8
        },
        
        // Letter Spacing
        letterSpacing: {
            tight: '1px',
            normal: '2px',
            wide: '3px'
        }
    },

    // Spacing
    spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
        '4xl': '6rem',   // 96px
        '5xl': '8rem'    // 128px
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.25rem',   // 4px
        md: '0.5rem',    // 8px
        lg: '0.75rem',   // 12px
        xl: '1rem',      // 16px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem',   // 32px
        full: '9999px'
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },

    // Transitions
    transitions: {
        fast: '0.15s ease',
        normal: '0.3s ease',
        slow: '0.5s ease',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },

    // Breakpoints
    breakpoints: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1536px'
    },

    // Z-Index
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modalBackdrop: 1040,
        modal: 1050,
        popover: 1060,
        tooltip: 1070
    }
};

// CSS Custom Properties Generator
function generateCSSVariables() {
    let css = ':root {\n';
    
    // Colors
    Object.entries(theme.colors).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([name, value]) => {
            css += `  --color-${category}-${name}: ${value};\n`;
        });
    });
    
    // Typography
    Object.entries(theme.typography.fonts).forEach(([name, value]) => {
        css += `  --font-${name}: ${value};\n`;
    });
    
    Object.entries(theme.typography.weights).forEach(([name, value]) => {
        css += `  --font-weight-${name}: ${value};\n`;
    });
    
    Object.entries(theme.typography.sizes).forEach(([name, value]) => {
        css += `  --font-size-${name}: ${value};\n`;
    });
    
    Object.entries(theme.typography.lineHeights).forEach(([name, value]) => {
        css += `  --line-height-${name}: ${value};\n`;
    });
    
    Object.entries(theme.typography.letterSpacing).forEach(([name, value]) => {
        css += `  --letter-spacing-${name}: ${value};\n`;
    });
    
    // Spacing
    Object.entries(theme.spacing).forEach(([name, value]) => {
        css += `  --spacing-${name}: ${value};\n`;
    });
    
    // Border Radius
    Object.entries(theme.borderRadius).forEach(([name, value]) => {
        css += `  --border-radius-${name}: ${value};\n`;
    });
    
    // Shadows
    Object.entries(theme.shadows).forEach(([name, value]) => {
        css += `  --shadow-${name}: ${value};\n`;
    });
    
    // Transitions
    Object.entries(theme.transitions).forEach(([name, value]) => {
        css += `  --transition-${name}: ${value};\n`;
    });
    
    // Z-Index
    Object.entries(theme.zIndex).forEach(([name, value]) => {
        css += `  --z-${name}: ${value};\n`;
    });
    
    css += '}';
    return css;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { theme, generateCSSVariables };
}
