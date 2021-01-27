export interface IHeaderProps {
    /**
     * The identify value of the header
     */
    id?: string;
    /**
     * The title of the header
     */
    title?: React.ReactNode;
    /**
     * The logo source url path of the header
     */
    logo?: string;
    /**
     * The mini logo source url path of the header for responsive view.
     */
    miniLogo?: string;
    /**
     * Checks the style class of the header
     */
    className?: string;
    /**
     * Checks position class of the header
     */
    position?: 'static' | 'sticky' | 'fixed';
    /**
     * Checks child elements of the header
     */
    children?: React.ReactNode;
}
