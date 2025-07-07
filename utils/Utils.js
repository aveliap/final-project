import { Failed } from "./AlertUtil";

export const limitText = (text, limit) => {
    const words = text.split("");
    if (words.length > limit) {
        return words.slice(0, limit).join("") + "....";
    } else {
        return text;
    }
};

export const capitalizeFirstLetter = (data) => {
    if (typeof data !== "string") return data;
    return data
        .toLowerCase()
        .split(/[\s_]+/) // Memisahkan berdasarkan spasi dan underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const validateEmail = (str) => {
    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return regex.test(str);
};

export const validatePassword = (str) => {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(str);
};

export const validateFile = (files, type) => {
    const maxSize = 1 * 1024 * 1024;
    if (!files[0]?.type.includes(type)) {
        return Failed(`The file format is ${type} only`);
    }

    if (files[0]?.size >= maxSize) return Failed("Maximum files is 1MB");

    return true;
};

export const formatDate = (isoDateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", options);
};
