export const DRAWER_WIDTH = 280;

// Shared styles that can be reused across components
export const SHARED_STYLES = {
    pageContainer: {
        maxWidth: '100%',
        mb: 2,
    },
    pageTitle: {
        fontWeight: 600,
        color: 'grey.800',
    },
    gradientHeader: {
        p: 2,
        mb: 2,
        background: (theme: any) =>
            `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
        color: 'white',
        borderRadius: 1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
    },
    cardActions: {
        mt: 'auto',
        pt: 0,
        px: 2,
        pb: 2,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
    },
    icon: {
        color: 'primary.main',
        fontSize: '1.5rem',
    },
    smallIcon: {
        color: 'grey.500',
        fontSize: '1rem',
    },
    title: {
        fontWeight: 600,
        fontSize: '1.1rem',
        color: 'grey.800',
    },
    chip: {
        backgroundColor: 'primary.lighter',
        color: 'primary.main',
        fontWeight: 500,
    },
    avatar: {
        bgcolor: 'primary.lighter',
        color: 'primary.main',
        width: 48,
        height: 48,
    },
};

export const LAYOUT_STYLES = {
    mainContent: {
        flexGrow: 1,
        p: 3,
        mt: '64px',
        backgroundColor: 'background.default',
        minHeight: '100vh',
    },
    appBar: {
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    },
    navContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
    },
    navItem: {
        color: 'grey.700',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: 1,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        '&.active': {
            backgroundColor: 'primary.lighter',
            color: 'primary.main',
        },
    },
    navIcon: {
        color: 'inherit',
        fontSize: '1.3rem',
    },
    navText: {
        fontWeight: 500,
        fontSize: '0.875rem',
    },
};

export const NAVBAR_STYLES = {
    item: {
        my: 0.5,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
    },
    activeItem: {
        backgroundColor: 'primary.lighter',
        '&:hover': {
            backgroundColor: 'primary.lighter',
        },
    },
    iconWrapper: {
        minWidth: 36,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        minWidth: 'auto',
        color: 'grey.600',
        '& .MuiSvgIcon-root': {
            fontSize: '1.3rem',
        },
    },
    itemText: {
        fontWeight: 500,
        fontSize: '0.875rem',
        color: 'grey.700',
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 3,
        height: '60%',
        borderRadius: '0 4px 4px 0',
        backgroundColor: 'primary.main',
    },
};

export const GRADE_STYLES = {
    categoryCard: {
        header: {
            p: 2,
            backgroundColor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiCardHeader-title': {
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'primary.main',
            },
            '& .MuiCardHeader-subheader': {
                fontSize: '0.9rem',
            },
        },
        content: {
            p: 2,
        },
    },
    subtopicItem: {
        display: 'flex',
        alignItems: 'center',
        py: 0.75,
        px: 1,
        '&:hover': {
            backgroundColor: 'grey.50',
            borderRadius: 1,
        },
    },
};

export const STUDENT_STYLES = {
    studentInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
    },
};

export const NAVIGATION_STYLES = {
    backButton: {
        mr: 1,
        backgroundColor: 'grey.100',
        '&:hover': {
            backgroundColor: 'grey.200',
        },
    },
    breadcrumbs: {
        color: 'text.secondary',
    },
};