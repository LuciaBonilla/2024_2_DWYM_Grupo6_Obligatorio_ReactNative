import React from "react";
import { Text, View, TextInput, TextStyle, ViewStyle } from "react-native";

interface TextAreaInputProps {
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

export default function TextAreaInput({ viewStyle, inputTitleStyle, inputTitle, icon, inputName, textInputStyle, placeholder, setState, value, keyboardType = "default", secureTextEntry=false }: TextAreaInputProps) {
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
                multiline={true}
                numberOfLines={15}
            />
        </View>
    );
}