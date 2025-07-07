import React from "react";
import Modal from "react-modal";

const CustomModal = ({ children, isOpen }) => {
    const customStyles = {
        content: {
            width: "50%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            borderRadius: "12px",
            transform: "translate(-40%, -50%)",
            transition: "width 0.3s ease",
            overflowY: "auto",
            maxHeight: "80vh",
            padding: "20px",
        },
    };

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
        customStyles.content.width = "90%";
        customStyles.content.maxHeight = "90vh";
    }

    return (
        <Modal
            style={customStyles}
            isOpen={isOpen}
            appElement={document.getElementById("root")}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
