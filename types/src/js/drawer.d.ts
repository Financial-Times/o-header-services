export default Drawer;
declare class Drawer {
    /**
     * Class constructor.
     * @param {HTMLElement} [headerEl] - The component element in the DOM
     */
    constructor(headerEl?: HTMLElement);
    headerEl: HTMLElement;
    class: {
        drawer: string;
        open: string;
    };
    relatedContent: Element;
    nav: Element;
    navList: Element;
    drawerCloseButton: HTMLButtonElement;
    debouncedRender: any;
    burger: Element;
    /**
     * Event Handler
     * @param {Object} event - The event emitted by element/window interactions
     * @return {void}
     */
    handleEvent(event: any): void;
    /**
     * Check if the drawer is currently enabled.
     * If the burger element is visible, the drawer is enabled.
     */
    get enabled(): boolean;
    /**
     * Drawer rendering
     * @return {void}
     */
    render(): void;
    /**
     * Drawer hide/show functionality
     * @return {void}
     */
    toggleDrawer(): void;
}
