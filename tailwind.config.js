/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
          fall: {
            '0%': { 
              transform: 'translateY(-10vh) rotate(0deg)',
              opacity: '1'
            },
            '100%': { 
              transform: 'translateY(100vh) rotate(360deg)',
              opacity: '0'
            }
          },
          'sway-1': {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(20px)' }
          },
          'sway-2': {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(-20px)' }
          },
          writeText: {
            'from': {
              opacity: '0',
              transform: 'translateY(20px)'
            },
            'to': {
              opacity: '1',
              transform: 'translateY(0)'
            }
          }
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fall": "fall 10s linear infinite",
          "sway-1": "sway-1 3s ease-in-out infinite",
          "sway-2": "sway-2 3s ease-in-out infinite",
          'write-first': 'writeText 1s forwards ease-out',
          'write-second': 'writeText 1s forwards ease-out 0.5s'
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }