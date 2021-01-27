export interface IButtonProps {
    /**
     * The identify value of the button
     */
    id?: string;
    /**
     * The name of the button
     */
    name?: string;
    /**
     * Checks the text of the button
     */
    text?: string;
    /**
     * Checks the style class of the button
     */
    className?: string;
    /**
     * Checks the read of the button
     */
    readOnly?: boolean;
    /**
     * Checks the loading icon view of the button
     */
    loading?: boolean;
    /**
     * Checks just icon style of the button
     */
    iconButton?: boolean;
    /**
     * Checks the reference event of the button
     */
    onRef?: (val: any) => void;
    /**
     * Checks if the button should be disabled
     */
    disabled?: boolean;
    /**
     * Checks the focus animation view of the button
     */
    disableFocusRipple?: boolean;
    /**
     * Checks the animation view of the button
     */
    disableRipple?: boolean;
    /**
     * Checks the full width view of the button
     */
    fullWidth?: boolean;
    /**
     * If true, the ripples will be centered. They won't start at the cursor interaction position.
     */
    centerRipple?: boolean;
    /**
     * Checks the click event of the button
     */
    onClick?: (e?: any) => void;
    /**
     * Checks the custom icon view to the left of the button
     */
    startAdornment?: React.ReactNode;
    /**
     * Checks the custom icon view to the right of the button
     */
    endAdornment?: React.ReactNode;
    /**
     * Checks the redirect link of the button
     */
    href?: string;
    /**
     * Checks the type of the button
     */
    type?: 'submit' | 'reset' | 'button';
    /**
     * The component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: any;
    /**
     * The tab index number of the button
     */
    tabIndex?: number;
    /**
     * The reference of the button
     */
    buttonRef?: any;
    /**
     * Checks the outline border view of the button
     */
    outlined?: boolean;
    /**
     * Checks the size of the button
     */
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    /**
     * Checks the color of the button
     */
    color?: 'default' | 'error' | 'info' | 'success' | 'warning' | 'danger';
}
