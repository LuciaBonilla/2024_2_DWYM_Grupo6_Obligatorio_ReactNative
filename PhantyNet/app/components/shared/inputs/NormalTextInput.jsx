import { Text, View, TextInput } from "react-native";

/**
 * Input normal de texto para reutilizado.
 * @estado TERMINADO.
 */
export default function NormalTextInput({
    viewStyle,
    inputTitleStyle,
    inputTitle,
    icon,
    numberOfLines = 1,
    inputName,
    textInputStyle,
    placeholder,
    setState,
    value,
    keyboardType = "default",
    secureTextEntry = false
}) {
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
                numberOfLines={numberOfLines}
            />
        </View>
    );
}