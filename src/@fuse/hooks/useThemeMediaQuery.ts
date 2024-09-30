'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/system/createTheme/createTheme';

/**
 * The useThemeMediaQuery function is a custom hook that returns a boolean indicating whether the current screen matches the specified media query.
 * It takes in a themeCallbackFunc as a parameter, which is a function that returns a string representing the media query to match.
 * It returns a boolean indicating whether the current screen matches the specified media query.
 */
function useThemeMediaQuery(themeCallbackFunc: (theme: Theme) => string) {
	const theme = useTheme();

	const query = themeCallbackFunc(theme).replace('@media ', '');

	/**
	 * The getMatches function checks if the current screen matches the specified media query.
	 * It takes in a media query string as a parameter and returns a boolean indicating whether the screen matches the query.
	 * This function will return `false` when rendering on the server (no access to window object).
	 */
	function getMatches(q: string) {
		if (typeof window !== 'undefined') {
			return window.matchMedia(q).matches;
		}

		return false; // Default to false when no window object (SSR)
	}

	const [matches, setMatches] = useState(getMatches(query));

	useEffect(() => {
		if (typeof window === 'undefined') {
			return undefined;
		}

		const mediaQuery = window.matchMedia(query);

		// Update the state with the current value
		setMatches(mediaQuery.matches);

		// Create an event listener
		const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

		// Attach the event listener to know when the matches value changes
		mediaQuery.addEventListener('change', handler);

		// Remove the event listener on cleanup
		return () => {
			mediaQuery.removeEventListener('change', handler);
		};
	}, [query]);

	return matches;
}

export default useThemeMediaQuery;
