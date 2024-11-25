import login from "./page";

const useStyles = () => {
    return {
        // box login
        effectMotion: "bg-white rounded-lg",
        boxLogin: "bg-white rounded-2xl shadow-xl p-8 space-y-0",
        boxCenter: "text-center space-y-2",
        boxTitle: "text-3xl font-bold tracking-tighter",
        boxSubtitle: "text-muted-foreground",

        // password button
        buttonEye: "absolute right-3 top-1/2 transform -translate-y-1/2",

        // remember me
        rememberItem: "flex items-center justify-between",
        rememberLabel: "flex items-center space-x-2",
        rememberCheckbox: "h-4 w-4 bg-white border border-gray-300 rounded-sm",
        forgotPassword: "text-sm text-primary hover:underline",

        //login button
        loginButton: "w-full block",
        
    }
}

export default useStyles;