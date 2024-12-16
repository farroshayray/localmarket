

const useStyles = () => {
    return {
        // box login
        effectMotion: "bg-white rounded-lg",
        boxLogin: "bg-white rounded-2xl shadow-xl p-8 space-y-0",
        boxCenter: "text-center space-y-2",
        boxTitle: "text-3xl font-bold tracking-tighter text-black",
        boxSubtitle: "text-muted-foreground",

        //email
        emailText: "text-black",
        placeHolderEmail: "text-black",
        loginForm: "space-y-4",
        loginFormLine: "space-y-2",

        // password button
        passwordText: "text-black",
        placeHolderPassword: "text-black",
        passwordRelative: "relative",
        passwordLine: "space-y-2",
        buttonEye: "absolute right-3 top-1/2 transform -translate-y-1/2 text-black",

        // remember me
        rememberText: "text-black",
        rememberItem: "flex items-center justify-between",
        rememberLabel: "flex items-center space-x-2",
        rememberCheckbox: "h-4 w-4 bg-white border border-gray-300 rounded-sm flex items-center justify-center",
        forgotPassword: "text-sm text-primary hover:underline",

        //login button
        loginSpace: "space-y-4",
        loginButton: "w-full block bg-neutral-950 text-white hover:bg-gray-400",
        
        //garis
        lineRelative: "relative",
        lineAbsolute: "absolute inset-0 flex items-center",
        lineBorder: "w-full border-t",
        lineUperCase: "relative flex justify-center text-xs uppercase",
        lineBackground: "bg-background px-2 text-muted-foreground",

        //posisi
        positionText: "text-black",
        placeHolderLine: "space-y-4",
        positionSelect: "text-black w-[180px]",
        
        //icon email
        iconGaris: "grid grid-cols-2 gap-4",
        iconEmailText: "text-black w-full",
        iconEmail: "mr-2 h-4 w-4",

        //icon facebook
        iconFacebookText: "text-black w-full ",
        iconFacebook: "mr-2 h-4 w-4",

        //daftar
        footerText: "text-center text-sm text-black",
        footerHover: "text-primary hover:underline",
    }
}

export default useStyles;