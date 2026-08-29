'use client'
import { useTheme } from 'next-themes';

// The icon is driven by the `dark` class next-themes sets on <html> before
// first paint, not by React state. That keeps the markup identical on server
// and client, so the button can render immediately instead of being gated on a
// mount effect (which shifted layout by ~44px on every cold load).
const ThemeSwitch = () => {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<button
			aria-label='Toggle dark mode'
			type='button'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className='inline-flex items-center justify-center w-11 h-11 p-2.5 border-2 border-ink bg-surface text-fg shadow-retro-sm transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 20 20'
				fill='currentColor'
				aria-hidden='true'
				className='hidden dark:block w-full h-full'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
				/>
			</svg>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 20 20'
				fill='currentColor'
				aria-hidden='true'
				className='block dark:hidden w-full h-full'
			>
				<path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
			</svg>
		</button>
	)
}

export default ThemeSwitch;
