'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;

	// CLOSE MENU WHEN CLICK OUTSIDE OF IT
	const navRef = useRef<HTMLDivElement | null>(null);
	useOnClickOutside(navRef, () => setActiveIndex(null));

	// CLOSE MENU WHEN PRESS ESC BUTTON
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setActiveIndex(null);
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	return (
		<div
			className='flex gap-4 h-full'
			ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, i) => {
				const handleOpen = () => {
					if (activeIndex === i) {
						setActiveIndex(null);
					} else {
						setActiveIndex(i);
					}
				};

				const isOpen = i === activeIndex;

				return (
					<NavItem
						key={i}
						category={category}
						handleOpen={handleOpen}
						isOpen={isOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
};

export default NavItems;
