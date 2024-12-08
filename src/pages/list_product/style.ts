import { CardDescription } from "@/components/ui/card";

const useStyles = () => {
    return {
        // judul
        containerTittle: "container mx-auto py-10",
        tittle: "text-2xl font-bold mb-6",

        //list space
        listSpace: "space-y-6",

        //card
        card: "flex items-center gap-4 p-4 shadow-md border rounded-lg",
        cardImage: "w-24 h-24 object-cover rounded-md",
        cardContent: "flex-1",
        cardTitle: "text-lg font-semibold",
        cardDescription: "text-gray-500 text-sm mb-2",
        cardPrice: "text-gray-700 mb-2",
        cardFont: "font-medium",

    }
}

export default useStyles;