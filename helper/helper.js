import { StyleSheet } from "react-native"

// the color set
export const colors = {
    bluishViolet: '#363678',
    yellow: '#f7bc0c',
    light: '#aaa9c9',
    dark: '#565287',
    black: '#000',
    white: '#fff',
    grey: '#ddd',
}

export const commonStyles = StyleSheet.create({
    navigatorBackground: {
        backgroundColor: colors.bluishViolet,
    },
    content: {
        paddingHorizontal: 28,
    },
    item: {
        width: '100%',
        marginVertical: 12,
    },
    formItemText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    formItem: {
        backgroundColor: colors.grey,
    },
    input: {
        height: 32,
        borderRadius: 5,
        borderColor: colors.bluishViolet,
        borderWidth: 1,
        paddingHorizontal: 10,
        color: colors.bluishViolet,
        fontSize: 16,
    },
    buttonGroup: {
        position: 'absolute',
        bottom: 120,
        flexDirection: 'row',
        gap: 80,
    },
    light: {
        backgroundColor: colors.light,
    },
    lightText: {
        color: colors.bluishViolet,
        fontSize: 16,
    },
    dark: {
        backgroundColor: colors.dark,
    },
    darkText: {
        color: colors.white,
        fontSize: 16,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 360,
        height: 60,
        backgroundColor: colors.bluishViolet,
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    itemText: {
        color: colors.bluishViolet,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    textContainer: {
        backgroundColor: colors.white,
        alignItems: 'center',
        padding: 5,
        height: 30,
        minWidth: 80,
        borderRadius: 5,
    },
    itemLeft: {
        color: colors.white,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        gap: 10,
    },
    description: {
        height: 100,
    },
    dateTimePicker: {
        height: 200,
    },
    activity: {
        zIndex: 1000,
    },
})