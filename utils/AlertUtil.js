import Swal from "sweetalert2";

export const Success = (prompt) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    Toast.fire({
        icon: "success",
        title: prompt,
    });
};

export const Failed = (prompt) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: prompt,
    });
};

export const Logout = (cb) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                text: "You already logout",
            });
            cb();
        }
    });
};

export const Update = (cb) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Update your profile!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update!",
    }).then((result) => {
        if (result.isConfirmed) {
            cb();
        }
    });
};

export const Confirm = (prompt, cb) => {
    Swal.fire({
        title: "Are you sure?",
        text: prompt,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes !",
    }).then((result) => {
        if (result.isConfirmed) {
            cb();
        }
    });
};

export const SuccessUpdate = () => {
    Swal.fire({
        icon: "success",
        text: "You already update profile",
    });
};

export const InputMessage = async (cb) => {
    const { value: message } = await Swal.fire({
        title: "Enter the message",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        },
    });
    if (message) {
        cb(message);
    }
};

export const Message = (prompt, type = "warning") => {
    Swal.fire({
        icon: type,
        text: prompt,
    });
};
