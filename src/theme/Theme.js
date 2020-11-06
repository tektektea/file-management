import { createMuiTheme, colors } from '@material-ui/core';
import shadow from './shadow';
import typography from './typography';

const Theme = createMuiTheme({
    palette: {
        background: {
            dark: '#F4F6F8',
            default: colors.common.white,
            paper: colors.common.white
        },
        primary: {
            main: colors.indigo[500]
        },
        secondary: {
            main: colors.indigo[500]
        },
        text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600]
        }
    },
    shadow,
    typography
});

export default Theme;
