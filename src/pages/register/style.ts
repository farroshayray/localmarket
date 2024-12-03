const useStyles = () => {
    return {
        // register
        boxRegister: "min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4",

        // box login
        boxLogin: "bg-white rounded-2xl shadow-xl p-8 space-y-0",
        boxCenter: "text-center space-y-2",
        boxTitle: "text-3xl font-bold tracking-tighter text-black",
        boxSubtitle: "text-muted-foreground",

        //Motion
        effectMotion: "bg-white rounded-lg",

        //nama lengkap
        namaSpace: "space-y-4",
        namaEnter: "space-y-2",
        namaText: "text-black",
        namaInput: "text-black",

        //email
        emailSpace: "space-y-4",
        emailEnter: "space-y-2",
        emailText: "text-black",
        emailInput: "text-black",

         // password button
         passwordText: "text-black",
         placeHolderPassword: "text-black",
         passwordRelative: "relative",
         passwordEnter: "space-y-2",
         passwordLine: "space-y-4",

         //button Eyes
         buttonEye: "absolute right-1 top-1/2 transform -translate-y-1/2 text-black",

         //posisi
         positionText: "text-black",
         placeHolderLine: "space-y-4",
         positionSelect: "text-black w-[180px]",

         //button submit
         submitButton: "",
         buttonSubmit: "",

         //pin
         pinEnter: "space-y-2",
         pinText: "text-black text-sm font-medium",
         pinInput: "text-black border border-gray-300 rounded-md w-full px-4 py-2 placeholder:text-gray-500",

         //phone number
         phoneEnter: "space-y-2",
         phoneText: "text-black text-sm font-medium",
         phoneInput: "text-black border border-gray-300 rounded-md w-full px-4 py-2 placeholder:text-gray-500",

         /* styles.module.css atau styles.module.scss */
         //masuk
        footerText: "text-center text-sm text-black",
        footerHover: "text-primary hover:underline",
         
    }
}

export default useStyles;