export default DropDown;
declare class DropDown {
    /**
     * Checks whether nav menu is expanded
     * @param {HTMLElement} item - the nav menu
     * @return {boolean} - whether the nav menu is expanded
     */
    static isExpanded(item: HTMLElement): boolean;
    /**
     * Expands closed nav menu
     * @param {HTMLElement} item - the nav menu
     * @return {void}
     */
    static expand(item: HTMLElement): void;
    /**
     * Changes nav menu position relative to the window
     * @param {HTMLElement} item - the nav menu
     * @return {void}
     */
    static position(item: HTMLElement): void;
    /**
     * Collapses open nav menu
     * @param {HTMLElement} item - the nav menu
     * @return {void}
     */
    static collapse(item: HTMLElement): void;
    /**
     * Collapses all open nav menus
     * @param {Array<HTMLElement>} items - the menu items to collapse
     * @return {void}
     */
    static collapseAll(items: Array<HTMLElement>): void;
    /**
     * Expands all open nav menus
     * @param {Array<HTMLElement>} items - the menu items to expand
     * @return {void}
     */
    static expandAll(items: Array<HTMLElement>): void;
    /**
     * Returns items which contain an anchor
     * with the attribute `aria-current` set to true or "page".
     * @param {Array<HTMLElement>} items - the menu items to check
     * @return {HTMLElement} - The current menu item
     */
    static getCurrent(items: Array<HTMLElement>): HTMLElement;
    /**
     * Class constructor
     * @param {HTMLElement} headerEl - The component element in the DOM
     * @param {Drawer|null} drawer [null] - The drawer that this drop down belongs to if any.
     */
    constructor(headerEl: HTMLElement, drawer?: any | null);
    primaryNav: Element;
    drawer: any;
    headerEl: HTMLElement;
    navItems: any[];
    /**
     * Event Handler
     * @param {Object} event - The event emitted by element/window interactions
     * @return {void}
     */
    handleEvent(event: any): void;
    /**
     * Checks if primary nav is in a drawer
     * This boolean will change the drop down behaviour.
     * @return {boolean} - whether the drawer is enabled or not
     */
    isDrawer(): boolean;
    /**
     * Returns nav items to their original collapsed state,
     * items which contain links with the attribute `aria-current`
     * set to true remain expanded.
     * @return {void}
     */
    reset(): void;
}
