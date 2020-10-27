export default Scroll;
declare class Scroll {
    /**
     * Class constructor
     * @param {HTMLElement} [headerEl] - The component element in the DOM
     */
    constructor(headerEl?: HTMLElement);
    headerEl: HTMLElement;
    container: Element;
    list: Element;
    buttons: any;
    width: {};
    /**
     * Scroll functionality rendering
     * @return {void}
     */
    render(): void;
    /**
     * Hide/show scroll buttons
     * @return {void}
     */
    toggleScrollButtons(): void;
    /**
     * Scrolling functionality
     * @param {Object} event - A scroll event
     * @return {void}
     */
    scroll(event: any): void;
    _remaining(): number;
    _getWidths(): void;
    /**
     * Scroll secondary nav to 'current selection'
     * @return {void}
     */
    showCurrentSelection(): void;
}
