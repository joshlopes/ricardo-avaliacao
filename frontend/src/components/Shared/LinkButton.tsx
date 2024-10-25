import React from 'react';
import {Button} from "@mui/material";
import {useUserStore} from "../../stores/useUserStore";
import {Link} from "react-router-dom";

interface LinkButtonProps {
    variant?: "contained" | "outlined" | "text"
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    href?: string
    label?: string
    onClick?: () => void
    to?: string
    data?: any
}

const LinkButton: React.FC<LinkButtonProps> = (
    {
        variant,
        color,
        href,
        label,
        onClick,
        to,
        data,
    }) => {
    const {user} = useUserStore();

    const buttonProps: any = {}
    if (variant) {
        buttonProps['variant'] = variant
    }
    if (color) {
        buttonProps['color'] = color
    }
    if (href) {
        buttonProps['href'] = href
    }
    if (to) {
        buttonProps['component'] = Link
        buttonProps['to'] = to
    }
    if (onClick) {
        buttonProps['onClick'] = onClick
    }
    if (data) {
        buttonProps['state'] = data
    }

    return (<>
        {user && <Button
            {...buttonProps}
        >
            {label}
        </Button>}
    </>)
}

export default LinkButton;