export default HeaderServices;
declare class HeaderServices {
    /**
     * Initialise header component
     * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
     * @param {Object} [options={}] - An options object for configuring the component
     * @return {Array<HTMLElement>|HTMLElement} - The header(s) initalised.
     */
    static init(rootElement: (HTMLElement | string), options?: any): Array<HTMLElement> | HTMLElement;
    /**
     * Class constructor
     * @param {HTMLElement} [headerEl] - The component element in the DOM
     */
    constructor(headerEl?: HTMLElement);
}
