import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        color: "#252525",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 12,
    },
    infoSection: {
        marginTop: 40,
        marginBottom: 20,
        paddingBottom: 10,
    },
    invoiceDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        fontSize: 12,
    },
    title: {
        fontWeight: "bold",
    },
    summary: {
        display: "flex",
        flexDirection: "column",
        padding: 12,
        borderTop: "1px solid #ccc",
        fontSize: 12,
    },
    footer: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 12,
    },
});

const Invoice = ({ item, partner }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <Text style={styles.header}>CareMate</Text>
                        <Text style={styles.subHeader}>
                            {formatDate(new Date().toISOString())}
                        </Text>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 40,
                            gap: 6,
                        }}
                    >
                        <Text style={styles.subHeader}>
                            {item?.partnerName || "Enigma Camp"}
                        </Text>
                        <Text style={styles.subHeader}>
                            {partner?.address || ""}
                        </Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.invoiceDetails}>
                            <Text>{item?.title}</Text>
                        </View>

                        <View style={styles.invoiceDetails}>
                            <Text>{item?.category}</Text>
                        </View>

                        <View style={styles.invoiceDetails}>
                            <Text>
                                {formatDate(item?.startDate)} -{" "}
                                {formatDate(item?.endDate)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.summary}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                marginBottom: 6,
                            }}
                        >
                            <Text style={styles.title}>Raised Amount</Text>
                            <Text>
                                <FormatRupiah value={item?.currentAmount} />
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Text style={styles.title}>Tax</Text>
                            <Text>
                                <FormatRupiah
                                    value={item?.currentAmount * (3 / 100)}
                                />
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summary}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Text style={styles.title}>Total Amount</Text>
                            <Text>
                                <FormatRupiah
                                    value={
                                        item?.currentAmount -
                                        item?.currentAmount * (3 / 100)
                                    }
                                />
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.footer}>Copyright © 2024</Text>
            </Page>
        </Document>
    );
};

export default Invoice;
