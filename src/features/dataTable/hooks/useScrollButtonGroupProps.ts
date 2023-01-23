import useElementOnScreen from './useElementOnScreen';

interface IUseScrollOptions {
	refs: {
		containerRef: React.RefObject<HTMLDivElement>;
		searchRef: React.RefObject<HTMLInputElement>;
		allButtonRef: React.RefObject<HTMLDivElement>;
		viewportRef: React.RefObject<HTMLDivElement>;
	};
	scrollStep?: number;
}

const useScrollButtonGroupProps = ({ refs, scrollStep = 100 }: IUseScrollOptions) => {
	const firstElementIsVisible = useElementOnScreen(
		{
			root: null,
			rootMargin: '0px',
			threshold: 1,
		},
		refs.allButtonRef
	);
	const fullViewport = useElementOnScreen(
		{
			root: null,
			rootMargin: '0px',
			threshold: 1,
		},
		refs.viewportRef
	);

	const lastElementIsVisible = useElementOnScreen(
		{
			root: null,
			rootMargin: '0px',
			threshold: 1,
		},
		refs.searchRef
	);

	const scrollForwardHandler = (): void => {
		refs.containerRef.current?.scrollBy({
			behavior: 'smooth',
			left: scrollStep,
			top: 0,
		});
	};

	const scrollBackHandler = (): void => {
		refs.containerRef.current?.scrollBy({
			behavior: 'smooth',
			left: -scrollStep,
			top: 0,
		});
	};

	return {
		scrollForwardHandler,
		scrollBackHandler,
		firstElementIsVisible,
		lastElementIsVisible,
		fullViewport,
	};
};

export default useScrollButtonGroupProps;
