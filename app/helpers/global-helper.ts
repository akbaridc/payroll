/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "@/lib/axios";

const extractUrls = (
    items: { url: string; items?: any[] }[],
    baseUrl: string = "",
): string[] => {
    const urls: string[] = [];

    items.forEach((item) => {
        const currentUrl = baseUrl + item.url;
        urls.push(currentUrl);

        // If there are nested items, recurse into them
        item.items?.forEach((nestedItem) => {
            urls.push(...extractUrls([nestedItem], currentUrl)); // Recursively process nested items
        });
    });

    return urls;
};

const generateRandomString = (length: number) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
    }
    return result;
};

const directiveRawDate = (value: string) => {
    // Sisipkan '/' setelah setiap dua angka
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, "$1/");
    const splitFormat = formattedValue.split("/");
    let newFormat = "";
    if (splitFormat.length === 4) {
        newFormat = `${splitFormat[0]}/${splitFormat[1]}/${splitFormat[2]}${splitFormat[3]}`;
    }

    // Pastikan formatnya menjadi dd/mm/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(newFormat)) {
        const [day, month, year] = newFormat.split("/").map(Number);

        // Buat objek Date
        const date = new Date(year, month - 1, day);

        // Periksa apakah tanggal valid
        if (!isNaN(date.getTime())) {
            return date;
        }
    }

    // Jika tidak valid, kembalikan null
    return null;
};

const generateNewID = async () => {
    let result = null;
    await axios.get("/api/GetNewId").then(async (response) => {
        if(response.status == 200) result = response.data.data[0].newid;
    });

    return result;
}

const setErrorRequest = (errors: any, schema: any, fields: any) => {
    if (errors) {
        Object.keys(errors).forEach((key) => {
            const convertFieldName = fields[key] || key;
            schema.setError(convertFieldName, {type: "manual",message: errors[key][0]});
        });
    }
}

const user = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

const formatCurrency = (values: any) => {
    // Pastikan values adalah angka
    const numericValue = typeof values === "number" ? values : parseInt(values.toString().replace(/\D/g, ""), 10);

    // Format angka ke format IDR (Indonesia) dengan titik sebagai pemisah ribuan
    return numericValue.toLocaleString("id-ID");
};

const unformatCurrency = (values: any) => {
    return values.replace(/\D/g, '');
}
export { extractUrls, generateRandomString, directiveRawDate, generateNewID, setErrorRequest, user, formatCurrency, unformatCurrency };
