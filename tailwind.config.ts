
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				hacen: ['"Hacen Maghreb Bd"', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ali: {
					blue: '#0A84FF',
					'light-blue': '#5AC8FA',
					'dark-blue': '#147EFB',
					purple: '#5E5CE6',
					indigo: '#5856D6',
					gray: '#8E8E93',
					'light-gray': '#D1D1D6',
					black: '#1D1D1F',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'blur-in': {
					'0%': { opacity: '0', filter: 'blur(10px)' },
					'100%': { opacity: '1', filter: 'blur(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'blur-in': 'blur-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
			},
			backdropFilter: {
				'blur-sm': 'blur(4px)',
				'blur': 'blur(8px)',
				'blur-md': 'blur(12px)',
				'blur-lg': 'blur(16px)',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
				'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
