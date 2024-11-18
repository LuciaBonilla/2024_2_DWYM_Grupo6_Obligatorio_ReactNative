import React from "react";
import { Text, View, TextInput, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface TextInputProps {
    viewStyle: ViewStyle;
    inputTitle: string;
    inputName: string;
    inputStyle: TextStyle;
    value: string;
    placeholder?: string;
    setState: (value: string) => void;
    icon?: React.ReactNode;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

/**
 * Input normal de texto.
 * @param viewStyle 
 * @param inputTitle 
 * @param inputName 
 * @param inputStyle
 * @param placeholder 
 * @param setState
 * @param value
 * @param icon
 * @param keyboardType
 * @estado componente terminado.
 */
export default function NormalTextInput({ viewStyle, inputTitle, inputName, inputStyle, placeholder, setState, value, icon, keyboardType = "default" }: TextInputProps) {
    return (
        <View style={viewStyle}>
            <Text>{inputTitle}</Text>
            {icon}
            <TextInput
                key={inputName}
                style={inputStyle}
                placeholder={placeholder}
                onChangeText={setState}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    );
}