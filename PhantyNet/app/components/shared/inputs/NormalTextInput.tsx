import React from "react";
import { Text, View, TextInput, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface TextInputProps {
    viewStyle: ViewStyle;
    inputTitleStyle: TextStyle;
    inputTitle: string;
    icon?: React.ReactNode;
    inputName: string;
    textInputStyle: TextStyle;
    placeholder?: string;
    setState: (value: string) => void;
    value: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    secureTextEntry?: boolean;
}

/**
 * Input normal de texto.
 * @estado TERMINADO.
 */
export default function NormalTextInput({ viewStyle, inputTitleStyle, inputTitle, icon, inputName, textInputStyle, placeholder, setState, value, keyboardType = "default", secureTextEntry=false }: TextInputProps) {
    return (
        <View style={viewStyle}>
            <Text style={inputTitleStyle}>{inputTitle}</Text>
            {icon}
            <TextInput
                key={inputName}
                style={textInputStyle}
                placeholder={placeholder}
                onChangeText={setState}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}